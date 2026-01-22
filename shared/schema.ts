export interface Reference {
  id: string;
  authors: string;
  year: string;
  title: string;
  source: string;
  doi?: string;
  type?: 'journal' | 'book' | 'chapter' | 'report' | 'website';
}

export interface ContentSection {
  id: string;
  type: 'paragraph' | 'heading' | 'quote' | 'list' | 'references';
  content: string;
  items?: string[];
  icon?: string;
  label?: string;
}

export interface JournalMonth {
  id: string;
  monthNumber: number;
  title: string;
  theme: string;
  sections: MonthSection[];
}

export interface MonthSection {
  id: string;
  title: string;
  icon?: string;
  content: ContentSection[];
}

export interface JournalEntry {
  id: string;
  projectTitle: string;
  cohortTheme: string;
  author: string;
  introduction: ContentSection[];
  months: JournalMonth[];
  references: Reference[];
}
