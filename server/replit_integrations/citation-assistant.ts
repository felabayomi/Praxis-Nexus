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

      const getSimpleId = (fullId: string) => {
        const match = fullId.match(/-([a-z]+\d+[a-z]*)/i);
        return match ? match[1] : fullId.replace(/[^a-z0-9]/gi, '').substring(0, 20);
      };
      
      const idMapping = new Map<string, typeof refDatabase[0]>();
      refDatabase.forEach(r => {
        const simpleId = getSimpleId(r.id);
        idMapping.set(simpleId.toLowerCase(), r);
      });
      
      const refSummaryForAI = refDatabase.slice(0, 200).map(r => {
        const simpleId = getSimpleId(r.id);
        return `[${simpleId}] ${r.inText}: "${r.title.substring(0, 70)}"`;
      }).join('\n');

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
4. IMPORTANT: Only use the exact citations from the database - use the exact "Author (Year)" format shown
5. Only use references that are actually relevant to the statement
6. If no suitable reference exists in the database, DO NOT invent citations - leave uncited
7. Preserve the original meaning and flow of the text
8. Return the modified text with citations inserted

CRITICAL: In citationsUsed, you MUST include the exact refId (the ID after "[ID:" in the database) for each citation you use. This is required to generate the reference list.

Respond in JSON format:
{
  "citedText": "The complete text with citations inserted where appropriate",
  "citationsUsed": [
    {
      "refId": "EXACT reference ID from database (e.g., 'smith2020' - the part after [ID:])",
      "inText": "Exact Author (Year) format used in the text",
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
      
      const usedRefIds = (result.citationsUsed?.map((c: any) => c.refId?.toLowerCase().trim()) || []).filter(Boolean);
      console.log(`AI returned refIds: ${JSON.stringify(usedRefIds)}`);
      
      let usedReferences: {id: string; inText: string; fullReference: string; authors: string; year: string; title: string}[] = [];
      
      for (const usedId of usedRefIds) {
        if (idMapping.has(usedId)) {
          const r = idMapping.get(usedId)!;
          console.log(`Matched ${usedId}: authors="${r.authors}", fullRef="${r.fullRef.substring(0, 100)}..."`);
          usedReferences.push({
            id: r.id,
            inText: r.inText,
            fullReference: r.fullRef,
            authors: r.authors,
            year: r.year,
            title: r.title
          });
        } else {
          console.log(`No direct match for ${usedId}, trying fuzzy match...`);
          const matchedRef = refDatabase.find(r => {
            const simpleId = getSimpleId(r.id).toLowerCase();
            return simpleId === usedId || 
                   simpleId.includes(usedId) || 
                   usedId.includes(simpleId) ||
                   r.id.toLowerCase().includes(usedId);
          });
          if (matchedRef && !usedReferences.find(u => u.id === matchedRef.id)) {
            usedReferences.push({
              id: matchedRef.id,
              inText: matchedRef.inText,
              fullReference: matchedRef.fullRef,
              authors: matchedRef.authors,
              year: matchedRef.year,
              title: matchedRef.title
            });
          }
        }
      }

      console.log(`First pass: found ${usedReferences.length} refs by ID mapping`);

      if (usedReferences.length < (result.citationsUsed?.length || 0)) {
        for (const citation of result.citationsUsed || []) {
          const inTextLower = (citation.inText || '').toLowerCase().replace(/[()]/g, '');
          const authorPart = inTextLower.split(',')[0].trim().split(' ')[0];
          const yearPart = inTextLower.match(/\d{4}/)?.[0] || '';
          
          if (!authorPart || !yearPart) continue;
          if (usedReferences.find(u => u.inText.toLowerCase().includes(authorPart) && u.year === yearPart)) continue;
          
          const matchingRef = refDatabase.find(r => {
            const refAuthor = r.authors.split(',')[0].toLowerCase();
            return refAuthor.includes(authorPart) && r.year === yearPart;
          });
          
          if (matchingRef && !usedReferences.find(u => u.id === matchingRef.id)) {
            usedReferences.push({
              id: matchingRef.id,
              inText: matchingRef.inText,
              fullReference: matchingRef.fullRef,
              authors: matchingRef.authors,
              year: matchingRef.year,
              title: matchingRef.title
            });
          }
        }
        console.log(`Second pass: found ${usedReferences.length} refs by author-year match`);
      }

      if (usedReferences.length === 0 && result.citedText) {
        const citationMatches = result.citedText.match(/\(([^)]+,\s*\d{4}[^)]*)\)/g) || [];
        for (const match of citationMatches) {
          const inner = match.replace(/[()]/g, '');
          const parts = inner.split(';').map((p: string) => p.trim());
          for (const part of parts) {
            const authorPart = part.split(',')[0].trim().toLowerCase();
            const yearMatch = part.match(/\d{4}/)?.[0] || '';
            if (authorPart && yearMatch) {
              const matchingRef = refDatabase.find(r => {
                const refAuthor = r.authors.split(',')[0].toLowerCase();
                return refAuthor.includes(authorPart) && r.year === yearMatch;
              });
              if (matchingRef && !usedReferences.find(u => u.id === matchingRef.id)) {
                usedReferences.push({
                  id: matchingRef.id,
                  inText: matchingRef.inText,
                  fullReference: matchingRef.fullRef,
                  authors: matchingRef.authors,
                  year: matchingRef.year,
                  title: matchingRef.title
                });
              }
            }
          }
        }
        console.log(`Third pass: found ${usedReferences.length} refs by parsing cited text`);
      }

      usedReferences = usedReferences.filter(r => r.authors && r.authors.trim() !== '');

      console.log(`Auto-cite complete: ${result.citationsUsed?.length || 0} citations, ${usedReferences.length} valid references matched`);

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
