import OpenAI from "openai";
import type { Express, Request, Response } from "express";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

interface Reference {
  id: string;
  citation: string;
  authorYear?: string;
}

function extractAuthorYear(citation: string): string {
  const match = citation.match(/^([^(]+)\s*\((\d{4}[a-z]?)\)/);
  if (match) {
    const authors = match[1].trim();
    const year = match[2];
    const firstAuthor = authors.split(',')[0].trim();
    if (authors.includes('&') || authors.includes(',')) {
      const authorCount = (authors.match(/&/g) || []).length + 1;
      if (authorCount > 2) {
        return `${firstAuthor} et al., ${year}`;
      }
    }
    return `${firstAuthor}, ${year}`;
  }
  return "";
}

const CHAPTER_PROMPTS: Record<string, string> = {
  abstract: `Write a 150-250 word academic abstract for this dissertation proposal. The abstract should:
- Concisely summarize the research problem and purpose
- State the methodology briefly
- Indicate the expected significance
- Use third person, academic tone
- Follow APA 7th edition style
- Do NOT include citations in the abstract`,

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

CITATION REQUIREMENTS:
- Use in-text citations from the provided reference list where appropriate
- Format citations as (Author, Year) following APA 7th edition
- Include citations when discussing theories, concepts, or prior research
- Aim to cite at least 3-5 relevant sources from the reference list`,

  chapter2: `Write Chapter 2: Literature Review for this dissertation. Structure it with:
- Introduction
- Overview of Major Theoretical and Conceptual Frameworks
- Review of Empirical Studies Related to the Topic
- Gaps and Synthesis Leading to the Study
- Conceptual Model or Integrative Framework (if applicable)
- Summary and Transition to Chapter 3

CITATION REQUIREMENTS:
- This chapter requires extensive citations from the provided reference list
- Use in-text citations (Author, Year) throughout
- Cite sources when discussing theories, frameworks, and empirical studies
- Aim to cite at least 8-12 relevant sources from the reference list
- Synthesize multiple sources to show connections in the literature`,

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

CITATION REQUIREMENTS:
- Cite methodological sources from the reference list to justify design choices
- Use in-text citations (Author, Year) when discussing research methods
- Reference sources that support data collection and analysis approaches
- Aim to cite at least 5-8 relevant sources from the reference list`,

  chapter4: `Write Chapter 4: Findings/Results for this dissertation. Structure it with:
- Introduction
- Data Preparation and Analysis Overview
- Presentation of Results (aligned to each research question)
- Summary of Key Findings

Note: Since this is a proposal, write this as projected findings or placeholder structure.

CITATION REQUIREMENTS:
- Cite data analysis methods from the reference list
- Use minimal citations in this chapter (primarily methodology references)
- Aim to cite 2-3 relevant sources from the reference list`,

  chapter5: `Write Chapter 5: Discussion and Interpretation for this dissertation. Structure it with:
- Introduction
- Interpretation of Key Findings
- Relationship to Theoretical Framework and Literature
- Implications for Practice, Policy, and Future Research
- Limitations of the Study
- Summary

Note: Since this is based on proposal content, discuss anticipated implications.

CITATION REQUIREMENTS:
- Connect findings back to literature from the reference list
- Use in-text citations when comparing to prior research
- Aim to cite at least 5-8 relevant sources from the reference list`,

  chapter6: `Write Chapter 6: Conclusions and Recommendations for this dissertation. Structure it with:
- Summary of the Study
- Conclusions Drawn from Findings
- Practical Recommendations
- Directions for Future Research
- Final Reflections

CITATION REQUIREMENTS:
- Minimal citations in this chapter
- Reference key sources when discussing future directions
- Aim to cite 2-4 relevant sources from the reference list`,
};

function findUsedCitations(content: string, references: Reference[]): string[] {
  const usedIds: string[] = [];
  
  for (const ref of references) {
    const authorYear = ref.authorYear || extractAuthorYear(ref.citation);
    if (!authorYear) continue;
    
    const firstAuthor = authorYear.split(',')[0].trim();
    const year = authorYear.match(/\d{4}/)?.[0];
    
    if (year) {
      const patterns = [
        new RegExp(`\\(${firstAuthor}[^)]*${year}\\)`, 'i'),
        new RegExp(`${firstAuthor}[^(]*\\(${year}\\)`, 'i'),
        new RegExp(`\\(.*${year}.*\\)`, 'i'),
      ];
      
      for (const pattern of patterns) {
        if (pattern.test(content)) {
          if (!usedIds.includes(ref.id)) {
            usedIds.push(ref.id);
          }
          break;
        }
      }
    }
  }
  
  return usedIds;
}

export function registerDissertationRoutes(app: Express): void {
  app.post("/api/dissertation/generate-chapter", async (req: Request, res: Response) => {
    try {
      const { chapterId, chapterTitle, chapterDescription, sourceContent, format, references } = req.body;

      if (!chapterId || !sourceContent) {
        return res.status(400).json({ error: "Chapter ID and source content are required" });
      }

      const chapterPrompt = CHAPTER_PROMPTS[chapterId];
      if (!chapterPrompt) {
        return res.status(400).json({ error: "Invalid chapter ID" });
      }

      const refList = (references || []) as Reference[];
      const refListWithAuthorYear = refList.map(ref => ({
        ...ref,
        authorYear: extractAuthorYear(ref.citation)
      }));
      
      const availableCitations = refListWithAuthorYear
        .filter(r => r.authorYear)
        .map(r => `- ${r.authorYear}: "${r.citation.substring(0, 80)}..."`)
        .join('\n');

      const systemPrompt = `You are an expert academic writing assistant helping an EdD candidate format their research into a proper dissertation. 

Your task is to transform the provided research content into formal academic prose that follows dissertation conventions.

CRITICAL CITATION REQUIREMENT:
You MUST include in-text citations throughout the text using ONLY the sources listed below. This is mandatory - do not write content without citations. Format each citation as (Author, Year) in APA 7th edition style.

AVAILABLE SOURCES TO CITE (use these exact author-year formats):
${availableCitations}

EXAMPLES OF PROPER CITATION USE:
- "Human-wildlife conflict has intensified due to climate change (Abrahms et al., 2023)."
- "According to Bronfenbrenner (1979), ecological systems theory provides..."
- "Conservation efforts require digital technology integration (Arts et al., 2015)."

IMPORTANT GUIDELINES:
- Write in formal academic English
- Use third person perspective
- Follow APA 7th edition formatting conventions
- Maintain scholarly tone throughout
- INCLUDE CITATIONS from the list above in every major paragraph
- Connect ideas logically with proper transitions
- The output should feel like authentic dissertation writing

${chapterPrompt}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { 
            role: "user", 
            content: `Transform this research content into ${chapterTitle}:\n\n${sourceContent.substring(0, 10000)}` 
          }
        ],
        max_tokens: 3000,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content || "";
      const usedCitationIds = findUsedCitations(content, refListWithAuthorYear);
      
      res.json({ 
        content, 
        chapterId, 
        chapterTitle,
        usedCitationIds 
      });
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
        model: "gpt-4o",
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

  app.post("/api/essay/generate-section", async (req: Request, res: Response) => {
    try {
      const { sectionId, sectionTitle, sectionDescription, promptGuidance, dissertationTitle, references } = req.body;

      if (!sectionId || !sectionTitle) {
        return res.status(400).json({ error: "Section ID and title are required" });
      }

      const refList = (references || []) as Reference[];
      const refListWithAuthorYear = refList.map(ref => ({
        ...ref,
        authorYear: extractAuthorYear(ref.citation)
      }));
      
      const availableCitations = refListWithAuthorYear
        .filter(r => r.authorYear)
        .map(r => `- ${r.authorYear}: "${r.citation.substring(0, 80)}..."`)
        .join('\n');

      const systemPrompt = `You are an expert academic writing assistant helping an EdD candidate write their Integrated Essay - a 10-15 page synthesis that connects doctoral learning across Knowledge, Practice, and Self-in-Context strands.

The dissertation focus is: "${dissertationTitle}"

CRITICAL CITATION REQUIREMENT:
You MUST include in-text citations throughout the text using ONLY the sources listed below. This is mandatory. Format each citation as (Author, Year) in APA 7th edition style.

AVAILABLE SOURCES TO CITE:
${availableCitations}

WRITING GUIDELINES:
- Write in formal academic English with first-person scholarly voice
- Follow APA 7th edition formatting
- Be reflective yet rigorous
- Connect personal growth to theoretical frameworks
- INCLUDE CITATIONS from the list above where appropriate
- Write 2-4 substantive paragraphs for this section

SECTION: ${sectionTitle}
PURPOSE: ${sectionDescription}
GUIDANCE: ${promptGuidance}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { 
            role: "user", 
            content: `Write the "${sectionTitle}" section of the Integrated Essay. Follow the guidance provided and include appropriate citations.` 
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content || "";
      const usedCitationIds = findUsedCitations(content, refListWithAuthorYear);
      
      res.json({ 
        content, 
        sectionId, 
        sectionTitle,
        usedCitationIds 
      });
    } catch (error) {
      console.error("Error generating essay section:", error);
      res.status(500).json({ error: "Failed to generate essay section" });
    }
  });
}
