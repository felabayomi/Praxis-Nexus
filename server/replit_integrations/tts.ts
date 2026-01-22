import OpenAI from "openai";
import type { Express, Request, Response } from "express";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

// Split text into chunks at sentence boundaries for natural breaks
function splitTextIntoChunks(text: string, maxChunkSize: number = 4000): string[] {
  const chunks: string[] = [];
  let currentChunk = "";
  
  // Split by sentences (period followed by space or end)
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  for (const sentence of sentences) {
    if ((currentChunk + " " + sentence).length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk = currentChunk ? currentChunk + " " + sentence : sentence;
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

// Generate audio for a single chunk
async function generateAudioChunk(text: string, chunkIndex: number, totalChunks: number): Promise<string> {
  console.log(`Generating audio chunk ${chunkIndex + 1}/${totalChunks}, length: ${text.length}`);
  
  const response = await openai.chat.completions.create({
    model: "gpt-audio",
    modalities: ["text", "audio"],
    audio: { voice: "alloy", format: "mp3" },
    messages: [
      {
        role: "system",
        content: "You are a professional narrator. Read the following academic text clearly and naturally, as if narrating a scholarly journal article. Do not add any commentary or introduction, just read the text exactly as provided. Maintain consistent pacing."
      },
      {
        role: "user",
        content: text
      }
    ],
  });

  const audioData = response.choices[0]?.message?.audio?.data;
  if (!audioData) {
    throw new Error(`No audio data for chunk ${chunkIndex + 1}`);
  }
  
  return audioData;
}

// Combine multiple base64 MP3 chunks into one
function combineAudioChunks(chunks: string[]): string {
  // For MP3, we can concatenate the raw bytes (simplified approach)
  // This works because MP3 is a frame-based format
  const buffers = chunks.map(chunk => Buffer.from(chunk, 'base64'));
  const combined = Buffer.concat(buffers);
  return combined.toString('base64');
}

export function registerTTSRoutes(app: Express): void {
  // Generate audio for a section of the journal using gpt-audio model
  // Automatically handles long content by chunking and combining
  app.post("/api/tts/generate", async (req: Request, res: Response) => {
    try {
      const { text, sectionId } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      console.log(`Generating TTS for section: ${sectionId}, total text length: ${text.length}`);

      // Split long text into manageable chunks
      const chunks = splitTextIntoChunks(text, 4000);
      console.log(`Split into ${chunks.length} chunk(s)`);

      // Generate audio for each chunk
      const audioChunks: string[] = [];
      for (let i = 0; i < chunks.length; i++) {
        const audioData = await generateAudioChunk(chunks[i], i, chunks.length);
        audioChunks.push(audioData);
      }

      // Combine all audio chunks into one
      const combinedAudio = chunks.length === 1 
        ? audioChunks[0] 
        : combineAudioChunks(audioChunks);

      console.log(`Audio generation complete for ${sectionId}`);
      
      res.json({
        audio: combinedAudio,
        mimeType: "audio/mpeg",
        sectionId,
        chunks: chunks.length
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
