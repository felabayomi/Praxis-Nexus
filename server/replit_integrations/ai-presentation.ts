import OpenAI from "openai";
import type { Express, Request, Response } from "express";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

interface SlideInsight {
  keyInsight: string;
  thematicConnection: string;
  discussionQuestion: string;
  inquiryGuidance: string;
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

Respond in JSON format with keys: keyInsight, thematicConnection, discussionQuestion, inquiryGuidance.
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
