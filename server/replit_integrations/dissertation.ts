import OpenAI from "openai";
import type { Express, Request, Response } from "express";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const CHAPTER_PROMPTS: Record<string, string> = {
  abstract: `Write a 150-250 word academic abstract for this dissertation proposal. The abstract should:
- Concisely summarize the research problem and purpose
- State the methodology briefly
- Indicate the expected significance
- Use third person, academic tone
- Follow APA 7th edition style`,

  chapter1: `Write Chapter 1: Introduction for this dissertation. Structure it with these sections:
- Introduction to the Study (set context)
- Background of the Problem (what led to this inquiry)
- Statement of the Problem (specific gap or issue)
- Purpose of the Study (what this research aims to accomplish)
- Research Questions / Objectives (derived from the source content)
- Theoretical or Conceptual Framework (briefly introduce)
- Significance of the Study (why it matters)
- Assumptions, Limitations, and Delimitations
- Definitions of Key Terms
- Summary

Use academic prose, APA 7th edition style, and connect to the source content provided.`,

  chapter2: `Write Chapter 2: Literature Review for this dissertation. Structure it with:
- Introduction
- Overview of Major Theoretical and Conceptual Frameworks
- Review of Empirical Studies Related to the Topic
- Gaps and Synthesis Leading to the Study
- Conceptual Model or Integrative Framework (if applicable)
- Summary and Transition to Chapter 3

Draw from the theoretical framework content provided. Use scholarly language and APA 7th edition.`,

  chapter3: `Write Chapter 3: Research Design and Methodology for this dissertation. Structure it with:
- Introduction
- Research Design (explain and justify the approach)
- Research Context and Setting
- Participants or Expert Panel
- Data Collection Methods
- Data Analysis Procedures
- Validity, Reliability, and Trustworthiness
- Ethical Considerations and IRB
- Summary and Transition

Use the methodology content provided as the foundation. Write in academic prose, APA 7th edition.`,

  chapter4: `Write Chapter 4: Findings/Results for this dissertation. Structure it with:
- Introduction
- Data Preparation and Analysis Overview
- Presentation of Results (aligned to each research question)
- Summary of Key Findings

Note: Since this is a proposal, write this as projected findings or placeholder structure. Use academic prose, APA 7th edition.`,

  chapter5: `Write Chapter 5: Discussion and Interpretation for this dissertation. Structure it with:
- Introduction
- Interpretation of Key Findings
- Relationship to Theoretical Framework and Literature
- Implications for Practice, Policy, and Future Research
- Limitations of the Study
- Summary

Note: Since this is based on proposal content, discuss anticipated implications. Use academic prose, APA 7th edition.`,

  chapter6: `Write Chapter 6: Conclusions and Recommendations for this dissertation. Structure it with:
- Summary of the Study
- Conclusions Drawn from Findings
- Practical Recommendations
- Directions for Future Research
- Final Reflections

Use scholarly, reflective academic language. APA 7th edition style.`,
};

export function registerDissertationRoutes(app: Express): void {
  app.post("/api/dissertation/generate-chapter", async (req: Request, res: Response) => {
    try {
      const { chapterId, chapterTitle, chapterDescription, sourceContent, format } = req.body;

      if (!chapterId || !sourceContent) {
        return res.status(400).json({ error: "Chapter ID and source content are required" });
      }

      const chapterPrompt = CHAPTER_PROMPTS[chapterId];
      if (!chapterPrompt) {
        return res.status(400).json({ error: "Invalid chapter ID" });
      }

      const systemPrompt = `You are an expert academic writing assistant helping an EdD candidate format their research into a proper dissertation. 

Your task is to transform the provided research content into formal academic prose that follows dissertation conventions.

IMPORTANT GUIDELINES:
- Write in formal academic English
- Use third person perspective
- Follow APA 7th edition formatting conventions
- Maintain scholarly tone throughout
- Be thorough but concise
- Use proper transitions between sections
- Connect ideas logically
- The output should feel like authentic dissertation writing

${chapterPrompt}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { 
            role: "user", 
            content: `Transform this research content into ${chapterTitle}:\n\n${sourceContent.substring(0, 12000)}` 
          }
        ],
        max_tokens: 3000,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content || "";
      res.json({ content, chapterId, chapterTitle });
    } catch (error) {
      console.error("Error generating chapter:", error);
      res.status(500).json({ error: "Failed to generate chapter" });
    }
  });

  app.post("/api/presentation/insight", async (req: Request, res: Response) => {
    try {
      const { content, sectionTitle } = req.body;

      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const systemPrompt = `You are an academic advisor helping analyze research methodology content.

For this section "${sectionTitle}", provide:
1. KEY INSIGHT: A concise, memorable takeaway (1-2 sentences)
2. THEMATIC CONNECTION: How this connects to broader research methodology themes (1 sentence)
3. DISCUSSION QUESTION: A thought-provoking question for academic dialogue

Respond in JSON format with keys: keyInsight, thematicConnection, discussionQuestion.
Keep responses scholarly yet accessible.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: content.substring(0, 2000) }
        ],
        response_format: { type: "json_object" },
        max_tokens: 500,
      });

      const result = JSON.parse(response.choices[0]?.message?.content || "{}");
      res.json(result);
    } catch (error) {
      console.error("Error generating insight:", error);
      res.status(500).json({ error: "Failed to generate insight" });
    }
  });
}
