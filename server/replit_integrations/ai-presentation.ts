import OpenAI from "openai";
import type { Express, Request, Response } from "express";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SlideInsight {
  keyInsight: string;
  thematicConnection: string;
  discussionQuestion: string;
  inquiryGuidance: string;
  imageQuery: string;
}

export function registerPresentationRoutes(app: Express): void {
  app.post("/api/presentation/enhance-slide", async (req: Request, res: Response) => {
    try {
      const { content, slideNumber, totalSlides, projectTitle, cohortTheme } = req.body;

      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const systemPrompt = `You are an academic advisor helping an EdD student enhance their inquiry presentation on "${cohortTheme}" focusing on "${projectTitle}".

This is an inquiry journal designed to move from the unknown to the known through critical reflection and exploration.

For each slide, provide:
1. A KEY INSIGHT: A concise, memorable takeaway (1-2 sentences) that captures the essence of the content
2. A THEMATIC CONNECTION: How this connects to broader themes of AI, ecology, ethics, or conservation (1 sentence)
3. A DISCUSSION QUESTION: A thought-provoking question that could spark academic dialogue (1 question)
4. INQUIRY GUIDANCE: 2-3 pathways or approaches to explore the discussion question. These should guide the reader toward discovering answers through inquiry methods like examining literature, considering multiple perspectives, analyzing case studies, or reflecting on personal experience. Frame these as starting points for exploration, not definitive answers.
5. IMAGE QUERY: A 2-3 word Unsplash search keyword for a professional, relevant image that visually reinforces this slide's theme. Use concrete, searchable nouns (e.g., "collaborative learning", "wildlife technology", "data analytics", "community meeting", "forest ecosystem", "research library"). Avoid abstract words.

Respond in JSON format with keys: keyInsight, thematicConnection, discussionQuestion, inquiryGuidance, imageQuery.
Keep responses scholarly yet accessible. Be specific to the content provided.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Slide ${slideNumber} of ${totalSlides}:\n\n${content}` }
        ],
        response_format: { type: "json_object" },
        max_tokens: 700,
      });

      const result = JSON.parse(response.choices[0]?.message?.content || "{}");
      res.json(result);
    } catch (error) {
      console.error("Error enhancing slide:", error);
      res.status(500).json({ error: "Failed to enhance slide" });
    }
  });

  app.post("/api/presentation/generate-heading", async (req: Request, res: Response) => {
    try {
      const { content, slideNumber, projectTitle } = req.body;

      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const systemPrompt = `You are an academic advisor helping create concise slide headings for an EdD research presentation on "${projectTitle}".

Generate a short, impactful heading (2-5 words) that captures the essence of this slide's content. The heading should:
- Be academic but accessible
- Highlight the key concept or theme
- Be suitable for use as a slide title badge

Respond with just the heading text, no quotes or formatting.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Slide ${slideNumber}:\n\n${content.substring(0, 500)}` }
        ],
        max_tokens: 20,
      });

      const heading = response.choices[0]?.message?.content?.trim() || "";
      console.log(`Generated heading for slide ${slideNumber}: ${heading}`);
      res.json({ heading });
    } catch (error) {
      console.error("Error generating heading:", error);
      res.status(500).json({ error: "Failed to generate heading" });
    }
  });

  app.post("/api/presentation/generate-summary", async (req: Request, res: Response) => {
    try {
      const { content, projectTitle, cohortTheme } = req.body;

      const systemPrompt = `You are an academic advisor helping an EdD student summarize their inquiry on "${cohortTheme}" focusing on "${projectTitle}".

Create a compelling executive summary that:
1. Captures the core inquiry question
2. Highlights the key tensions being explored
3. Identifies the methodological approach
4. Suggests the significance of this work

Keep it to 3-4 impactful sentences suitable for an academic audience.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: content }
        ],
        max_tokens: 300,
      });

      res.json({ summary: response.choices[0]?.message?.content || "" });
    } catch (error) {
      console.error("Error generating summary:", error);
      res.status(500).json({ error: "Failed to generate summary" });
    }
  });
}
