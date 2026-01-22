import OpenAI from "openai";
import type { Express, Request, Response } from "express";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

interface CitationSuggestion {
  statement: string;
  reason: string;
  suggestion: string;
}

interface CitationAnalysis {
  suggestions: CitationSuggestion[];
  apaFormatTips: string[];
  overallFeedback: string;
}

const MAX_TEXT_LENGTH = 15000; // Limit input to prevent API issues

export function registerCitationRoutes(app: Express): void {
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

      console.log(`Analyzing text for citations, length: ${text.length}`);

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an academic writing assistant specializing in APA 7th edition citations. Analyze the provided text and:

1. Identify statements that may need citations (claims, statistics, definitions, theories, research findings)
2. For each, explain why a citation is needed and suggest how to find an appropriate source
3. Check if existing in-text citations follow APA 7th format
4. Provide overall feedback on citation practices

Respond in JSON format:
{
  "suggestions": [
    {
      "statement": "The exact statement that needs a citation",
      "reason": "Why this needs a citation",
      "suggestion": "How to improve or where to find sources"
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

      const analysis: CitationAnalysis = JSON.parse(content);
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
}
