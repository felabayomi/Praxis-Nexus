import type { JournalEntry, MonthSection, ContentSection } from "@shared/schema";

const WORDS_PER_MINUTE = 200;

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function calculateReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / WORDS_PER_MINUTE);
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return "< 1 min read";
  if (minutes === 1) return "1 min read";
  return `${minutes} min read`;
}

export function getContentText(sections: ContentSection[]): string {
  return sections.map(section => {
    if (section.type === "paragraph" || section.type === "quote") {
      return section.content;
    }
    if (section.type === "list" && section.items) {
      return section.items.join(" ");
    }
    return "";
  }).join(" ");
}

export function getIntroductionReadingTime(journal: JournalEntry): number {
  const text = journal.introduction.map(s => s.content).join(" ");
  return calculateReadingTime(countWords(text));
}

export function getMonthReadingTime(month: { sections: MonthSection[] }): number {
  const text = month.sections.map(s => getContentText(s.content)).join(" ");
  return calculateReadingTime(countWords(text));
}

export function getReferencesReadingTime(journal: JournalEntry): number {
  const text = journal.references.map(r => 
    `${r.authors} ${r.year} ${r.title} ${r.source}`
  ).join(" ");
  return calculateReadingTime(countWords(text));
}

export function getInquiryQuestionsReadingTime(journal: JournalEntry): number {
  if (!journal.inquiryQuestions) return 0;
  const text = journal.inquiryQuestions.map(s => getContentText(s.content)).join(" ");
  return calculateReadingTime(countWords(text));
}

export function getMethodsPathwayReadingTime(journal: JournalEntry): number {
  if (!journal.methodsPathway) return 0;
  const text = journal.methodsPathway.map(s => getContentText(s.content)).join(" ");
  return calculateReadingTime(countWords(text));
}

export function getKeyInsightsReadingTime(journal: JournalEntry): number {
  if (!journal.keyInsights) return 0;
  const text = journal.keyInsights.map(s => getContentText(s.content)).join(" ");
  return calculateReadingTime(countWords(text));
}

export function getAiHubReadingTime(journal: JournalEntry): number {
  if (!journal.aiHubContributions) return 0;
  const text = journal.aiHubContributions.map(c =>
    c.title + " " + c.sections.map(s => getContentText(s.content)).join(" ")
  ).join(" ");
  return calculateReadingTime(countWords(text));
}

export function getTotalReadingTime(journal: JournalEntry): number {
  const introTime = getIntroductionReadingTime(journal);
  const inquiryTime = getInquiryQuestionsReadingTime(journal);
  const methodsTime = getMethodsPathwayReadingTime(journal);
  const insightsTime = getKeyInsightsReadingTime(journal);
  const aiHubTime = getAiHubReadingTime(journal);
  const monthsTime = journal.months.reduce((acc, month) => acc + getMonthReadingTime(month), 0);
  const refsTime = getReferencesReadingTime(journal);
  return introTime + inquiryTime + methodsTime + insightsTime + aiHubTime + monthsTime + refsTime;
}

export interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  matchText: string;
  matchType: "introduction" | "month" | "reference";
  monthNumber?: number;
}

export function searchJournal(journal: JournalEntry, query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return results;

  journal.introduction.forEach((section, index) => {
    if (section.content.toLowerCase().includes(lowerQuery)) {
      const matchIndex = section.content.toLowerCase().indexOf(lowerQuery);
      const start = Math.max(0, matchIndex - 40);
      const end = Math.min(section.content.length, matchIndex + query.length + 40);
      let matchText = section.content.substring(start, end);
      if (start > 0) matchText = "..." + matchText;
      if (end < section.content.length) matchText = matchText + "...";
      
      results.push({
        sectionId: "introduction",
        sectionTitle: `Introduction (Paragraph ${index + 1})`,
        matchText,
        matchType: "introduction"
      });
    }
  });

  journal.months.forEach(month => {
    month.sections.forEach(section => {
      const sectionText = getContentText(section.content);
      if (sectionText.toLowerCase().includes(lowerQuery)) {
        const matchIndex = sectionText.toLowerCase().indexOf(lowerQuery);
        const start = Math.max(0, matchIndex - 40);
        const end = Math.min(sectionText.length, matchIndex + query.length + 40);
        let matchText = sectionText.substring(start, end);
        if (start > 0) matchText = "..." + matchText;
        if (end < sectionText.length) matchText = matchText + "...";
        
        results.push({
          sectionId: month.id,
          sectionTitle: `Month ${month.monthNumber}: ${section.title}`,
          matchText,
          matchType: "month",
          monthNumber: month.monthNumber
        });
      }
    });
  });

  journal.references.forEach(ref => {
    const refText = `${ref.authors} ${ref.title} ${ref.source}`;
    if (refText.toLowerCase().includes(lowerQuery)) {
      results.push({
        sectionId: "references",
        sectionTitle: ref.authors,
        matchText: ref.title,
        matchType: "reference"
      });
    }
  });

  return results;
}

export function getAllTextForTTS(journal: JournalEntry, sectionId: string): string {
  if (sectionId === "introduction") {
    return journal.introduction.map(s => s.content).join(" ");
  }
  
  if (sectionId === "inquiry-questions" && journal.inquiryQuestions) {
    return journal.inquiryQuestions.map(section => {
      const content = getContentText(section.content);
      return `${section.title}. ${content}`;
    }).join(" ");
  }

  if (sectionId === "methods-pathway" && journal.methodsPathway) {
    return journal.methodsPathway.map(section => {
      const content = getContentText(section.content);
      return `${section.title}. ${content}`;
    }).join(" ");
  }

  if (sectionId === "key-insights" && journal.keyInsights) {
    return journal.keyInsights.map(section => {
      const content = getContentText(section.content);
      return `${section.title}. ${content}`;
    }).join(" ");
  }

  if (journal.aiHubContributions) {
    const contribution = journal.aiHubContributions.find(c => `contribution-${c.id}` === sectionId);
    if (contribution) {
      return contribution.sections.map(section => {
        const content = getContentText(section.content);
        return `${section.title}. ${content}`;
      }).join(" ");
    }
  }

  if (sectionId === "references") {
    return journal.references.map(r => 
      `${r.authors}, ${r.year}. ${r.title}. ${r.source}.`
    ).join(" ");
  }
  
  const month = journal.months.find(m => m.id === sectionId);
  if (month) {
    return month.sections.map(section => {
      const content = getContentText(section.content);
      return `${section.title}. ${content}`;
    }).join(" ");
  }
  
  return "";
}
