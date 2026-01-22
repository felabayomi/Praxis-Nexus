import OpenAI from "openai";
import type { Express, Request, Response } from "express";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export function registerTTSRoutes(app: Express): void {
  // Generate audio for a section of the journal using gpt-audio model
  app.post("/api/tts/generate", async (req: Request, res: Response) => {
    try {
      const { text, sectionId } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      // Truncate to reasonable length for audio generation
      const truncatedText = text.slice(0, 2000);

      console.log(`Generating TTS for section: ${sectionId}, text length: ${truncatedText.length}`);

      // Use gpt-audio model with audio output modality
      const response = await openai.chat.completions.create({
        model: "gpt-audio",
        modalities: ["text", "audio"],
        audio: { voice: "alloy", format: "mp3" },
        messages: [
          {
            role: "system",
            content: "You are a professional narrator. Read the following academic text clearly and naturally, as if narrating a scholarly journal article. Do not add any commentary, just read the text exactly as provided."
          },
          {
            role: "user",
            content: `Please read this text aloud:\n\n${truncatedText}`
          }
        ],
      });

      // Extract audio data from the response
      const audioData = response.choices[0]?.message?.audio?.data;
      
      if (!audioData) {
        console.error("No audio data in response");
        return res.status(500).json({ error: "No audio generated" });
      }
      
      // Audio data is already base64 encoded
      res.json({
        audio: audioData,
        mimeType: "audio/mpeg",
        sectionId
      });
    } catch (error) {
      console.error("TTS generation error:", error);
      res.status(500).json({ error: "Failed to generate audio" });
    }
  });

  // Generate AI heading for a slide based on its content
  app.post("/api/presentation/generate-heading", async (req: Request, res: Response) => {
    try {
      const { content, slideNumber, projectTitle } = req.body;

      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are helping create presentation slide headings for an academic EdD inquiry on "${projectTitle}". 
Generate a concise, engaging heading (5-8 words max) that captures the essence of the slide content. 
The heading should be scholarly yet accessible, and relevant to AI, conservation, or human-wildlife relations themes.
Return ONLY the heading text, nothing else.`
          },
          {
            role: "user",
            content: `Create a heading for slide ${slideNumber} with this content:\n\n${content.slice(0, 1000)}`
          }
        ],
        max_tokens: 50,
      });

      const heading = response.choices[0]?.message?.content?.trim() || "Key Insights";
      res.json({ heading });
    } catch (error) {
      console.error("Heading generation error:", error);
      res.status(500).json({ error: "Failed to generate heading" });
    }
  });
}
