import OpenAI from "openai";
import type { Express, Request, Response } from "express";
import { loadDefaultReferences, searchReferences, formatReferenceAPA, formatInTextCitation, parseBibTeX, ParsedReference } from "../utils/bibtexParser";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

interface CitationSuggestion {
  statement: string;
  reason: string;
  suggestion: string;
  matchedReferences?: {
    inText: string;
    fullReference: string;
    authors: string;
    year: string;
    title: string;
  }[];
}

interface CitationAnalysis {
  suggestions: CitationSuggestion[];
  apaFormatTips: string[];
  overallFeedback: string;
  referenceCount?: number;
}

const MAX_TEXT_LENGTH = 15000;

export function registerCitationRoutes(app: Express): void {
  app.get("/api/references", async (_req: Request, res: Response) => {
    try {
      const references = loadDefaultReferences();
      res.json({ 
        count: references.length,
        references: references.slice(0, 50).map(ref => ({
          id: ref.id,
          authors: ref.authors,
          year: ref.year,
          title: ref.title,
          inText: formatInTextCitation(ref),
          fullReference: formatReferenceAPA(ref)
        }))
      });
    } catch (error) {
      console.error("Error loading references:", error);
      res.status(500).json({ error: "Failed to load references" });
    }
  });

  app.get("/api/references/count", async (_req: Request, res: Response) => {
    try {
      const references = loadDefaultReferences();
      res.json({ count: references.length });
    } catch (error) {
      res.status(500).json({ error: "Failed to count references", count: 0 });
    }
  });

  app.post("/api/references/search", async (req: Request, res: Response) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ error: "Query is required" });
      }
      
      const references = loadDefaultReferences();
      const results = searchReferences(query, references);
      
      res.json({
        query,
        count: results.length,
        references: results.map(ref => ({
          id: ref.id,
          authors: ref.authors,
          year: ref.year,
          title: ref.title,
          inText: formatInTextCitation(ref),
          fullReference: formatReferenceAPA(ref),
          abstract: ref.abstract?.substring(0, 200) + (ref.abstract && ref.abstract.length > 200 ? '...' : '')
        }))
      });
    } catch (error) {
      console.error("Reference search error:", error);
      res.status(500).json({ error: "Failed to search references" });
    }
  });

  app.post("/api/citation/analyze", async (req: Request, res: Response) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      if (text.length > MAX_TEXT_LENGTH) {
        return res.status(400).json({ 
          error: `Text too long. Maximum ${MAX_TEXT_LENGTH} characters allowed. Your text has ${text.length} characters.` 
        });
      }

      const references = loadDefaultReferences();
      const refSummary = references.slice(0, 100).map(r => 
        `- ${formatInTextCitation(r)}: ${r.title.substring(0, 80)}`
      ).join('\n');

      console.log(`Analyzing text for citations, length: ${text.length}, refs: ${references.length}`);

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an academic writing assistant specializing in APA 7th edition citations. You have access to a reference database with ${references.length} sources.

Here are some available references you can suggest:
${refSummary}

Analyze the provided text and:
1. Identify statements that may need citations (claims, statistics, definitions, theories, research findings)
2. For each, explain why a citation is needed
3. If a relevant source from the database matches, include its in-text citation format
4. Check if existing in-text citations follow APA 7th format
5. Provide overall feedback on citation practices

Respond in JSON format:
{
  "suggestions": [
    {
      "statement": "The exact statement that needs a citation",
      "reason": "Why this needs a citation",
      "suggestion": "How to improve or which specific source from the database to use",
      "matchedReference": "If applicable: Author (Year) format from the database"
    }
  ],
  "apaFormatTips": ["Any APA 7th formatting issues found"],
  "overallFeedback": "Brief overall assessment of citation practices"
}`
          },
          {
            role: "user",
            content: `Please analyze this academic text for citation needs:\n\n${text}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        return res.status(500).json({ error: "No response from AI" });
      }

      const analysis = JSON.parse(content) as CitationAnalysis;
      analysis.referenceCount = references.length;
      res.json(analysis);
    } catch (error) {
      console.error("Citation analysis error:", error);
      res.status(500).json({ error: "Failed to analyze citations" });
    }
  });

  app.post("/api/citation/format-apa", async (req: Request, res: Response) => {
    try {
      const { sourceInfo } = req.body;

      if (!sourceInfo) {
        return res.status(400).json({ error: "Source information is required" });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an APA 7th edition citation expert. Format the provided source information into a proper APA 7th edition reference entry. Include:
1. The properly formatted reference entry
2. The in-text citation format (both parenthetical and narrative)
3. Any notes about special formatting rules applied

Respond in JSON format:
{
  "referenceEntry": "The complete APA 7th reference entry",
  "inTextParenthetical": "(Author, Year)",
  "inTextNarrative": "Author (Year)",
  "notes": ["Any special formatting notes"]
}`
          },
          {
            role: "user",
            content: `Please format this source in APA 7th edition:\n\n${sourceInfo}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        return res.status(500).json({ error: "No response from AI" });
      }

      res.json(JSON.parse(content));
    } catch (error) {
      console.error("APA formatting error:", error);
      res.status(500).json({ error: "Failed to format citation" });
    }
  });

  app.post("/api/citation/auto-cite", async (req: Request, res: Response) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      if (text.length > MAX_TEXT_LENGTH) {
        return res.status(400).json({ 
          error: `Text too long. Maximum ${MAX_TEXT_LENGTH} characters allowed.` 
        });
      }

      const references = loadDefaultReferences();
      
      const refDatabase = references.map(r => ({
        id: r.id,
        inText: formatInTextCitation(r),
        fullRef: formatReferenceAPA(r),
        keywords: `${r.authors} ${r.title} ${r.keywords || ''} ${r.abstract?.substring(0, 200) || ''}`.toLowerCase(),
        title: r.title,
        authors: r.authors,
        year: r.year
      }));

      const refSummaryForAI = refDatabase.slice(0, 150).map(r => 
        `[${r.id}] ${r.inText}: "${r.title.substring(0, 60)}..."`
      ).join('\n');

      console.log(`Auto-citing text, length: ${text.length}, available refs: ${references.length}`);

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an academic writing assistant. Your task is to insert appropriate in-text citations from the user's reference database into their text.

REFERENCE DATABASE (${references.length} sources):
${refSummaryForAI}

INSTRUCTIONS:
1. Read the text carefully and identify statements that need citations
2. For each statement that needs a citation, find the BEST matching reference from the database above
3. Insert the citation in APA 7th edition format: (Author, Year) or Author (Year) as appropriate
4. Only use references that are actually relevant to the statement
5. If no suitable reference exists in the database, leave that statement uncited
6. Preserve the original meaning and flow of the text
7. Return the modified text with citations inserted

Respond in JSON format:
{
  "citedText": "The complete text with citations inserted where appropriate",
  "citationsUsed": [
    {
      "refId": "The reference ID from the database",
      "inText": "Author (Year) format used",
      "context": "Brief note on why this citation was placed here"
    }
  ],
  "unchangedStatements": ["Any statements that needed citations but no matching reference was found"],
  "summary": "Brief summary of changes made"
}`
          },
          {
            role: "user",
            content: `Please add citations from my reference database to this text:\n\n${text}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        return res.status(500).json({ error: "No response from AI" });
      }

      const result = JSON.parse(content);
      
      const usedRefIds = new Set(result.citationsUsed?.map((c: any) => c.refId) || []);
      const usedReferences = refDatabase
        .filter(r => usedRefIds.has(r.id))
        .map(r => ({
          id: r.id,
          inText: r.inText,
          fullReference: r.fullRef,
          authors: r.authors,
          year: r.year,
          title: r.title
        }));

      res.json({
        originalText: text,
        citedText: result.citedText,
        citationsUsed: result.citationsUsed || [],
        references: usedReferences,
        unchangedStatements: result.unchangedStatements || [],
        summary: result.summary,
        totalReferencesAvailable: references.length
      });
    } catch (error) {
      console.error("Auto-citation error:", error);
      res.status(500).json({ error: "Failed to auto-cite text" });
    }
  });
}
