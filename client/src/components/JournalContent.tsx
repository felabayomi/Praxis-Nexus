import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Brain, 
  Search, 
  Leaf, 
  Sparkles, 
  AlertTriangle, 
  Compass, 
  BookOpen, 
  Target, 
  RefreshCw,
  Quote,
  ExternalLink,
  Presentation,
  Clock,
  FileText,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Headphones,
  Plus,
  Minus,
  Type
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { journalData } from "@/lib/journalData";
import { TextToSpeech } from "@/components/TextToSpeech";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CitationAssistant } from "@/components/CitationAssistant";
import { ShareExportControls } from "@/components/ShareExportControls";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  getIntroductionReadingTime, 
  getMonthReadingTime, 
  getReferencesReadingTime,
  formatReadingTime 
} from "@/lib/journalUtils";
import type { ContentSection, MonthSection, Reference } from "@shared/schema";

interface JournalContentProps {
  activeSection: string;
  onOpenPresentation?: () => void;
  onOpenInfoCenter?: () => void;
  onSectionChange?: (section: string) => void;
}

const FONT_SIZE_KEY = "praxis-nexus-font-size";
const FONT_SIZES = [
  { label: "Small", value: "text-sm", size: 14 },
  { label: "Medium", value: "text-base", size: 16 },
  { label: "Large", value: "text-lg", size: 18 },
  { label: "X-Large", value: "text-xl", size: 20 },
];

function FontSizeControl({ fontSize, onFontSizeChange }: { fontSize: number; onFontSizeChange: (size: number) => void }) {
  const currentIndex = FONT_SIZES.findIndex(f => f.size === fontSize);
  const canDecrease = currentIndex > 0;
  const canIncrease = currentIndex < FONT_SIZES.length - 1;
  const currentLabel = FONT_SIZES[currentIndex]?.label || "Medium";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" title="Adjust font size" data-testid="button-font-size">
          <Type className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground text-center font-medium">Text Size: {currentLabel}</p>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => canDecrease && onFontSizeChange(FONT_SIZES[currentIndex - 1].size)}
              disabled={!canDecrease}
              data-testid="button-font-decrease"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="w-16 text-center font-medium text-sm">
              {fontSize}px
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => canIncrease && onFontSizeChange(FONT_SIZES[currentIndex + 1].size)}
              disabled={!canIncrease}
              data-testid="button-font-increase"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  "brain": <Brain className="h-5 w-5" />,
  "search": <Search className="h-5 w-5" />,
  "leaf": <Leaf className="h-5 w-5" />,
  "sparkles": <Sparkles className="h-5 w-5" />,
  "alert-triangle": <AlertTriangle className="h-5 w-5" />,
  "compass": <Compass className="h-5 w-5" />,
  "book-open": <BookOpen className="h-5 w-5" />,
  "target": <Target className="h-5 w-5" />,
  "refresh-cw": <RefreshCw className="h-5 w-5" />,
};

function ContentBlock({ section, fontSize }: { section: ContentSection; fontSize: number }) {
  const bodyStyle = { fontSize: `${fontSize}px` };
  
  if (section.type === "paragraph") {
    return (
      <p className="text-foreground/85 leading-relaxed mb-4" style={bodyStyle} data-testid={`content-${section.id}`}>
        {section.content}
      </p>
    );
  }

  if (section.type === "quote") {
    return (
      <blockquote 
        className="border-l-4 border-primary/30 pl-4 py-2 my-4 italic text-muted-foreground"
        style={bodyStyle}
        data-testid={`content-${section.id}`}
      >
        <Quote className="h-4 w-4 inline-block mr-2 opacity-50" />
        {section.content}
      </blockquote>
    );
  }

  if (section.type === "list" && section.items) {
    return (
      <ul className="space-y-3 mb-4" data-testid={`content-${section.id}`}>
        {section.items.map((item, index) => (
          <li key={index} className="flex gap-3">
            <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-primary mt-2.5" />
            <span className="text-foreground/85 leading-relaxed" style={bodyStyle}>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return null;
}

function MonthSectionCard({ section, fontSize }: { section: MonthSection; fontSize: number }) {
  const icon = section.icon ? iconMap[section.icon] : null;

  return (
    <Card className="p-6 mb-6" data-testid={`section-${section.id}`}>
      <div className="flex items-start gap-4 mb-4">
        {icon && (
          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        <h3 className="font-serif text-xl font-semibold text-foreground pt-1.5">
          {section.title}
        </h3>
      </div>
      <div className="pl-0 md:pl-14">
        {section.content.map((block) => (
          <ContentBlock key={block.id} section={block} fontSize={fontSize} />
        ))}
      </div>
    </Card>
  );
}

function ReferenceItem({ reference, fontSize }: { reference: Reference; fontSize: number }) {
  // Use explicit type field for proper APA 7th formatting
  // Journal articles: Title in regular text, source (journal name) in italics
  // Books: Title in italics, source (publisher) in regular text
  const isJournalArticle = reference.type === 'journal';
  const isBook = reference.type === 'book';
  const bodyStyle = { fontSize: `${fontSize}px` };
  
  return (
    <div 
      className="py-4 border-b border-border/50 last:border-0 pl-8 -indent-8"
      data-testid={`reference-${reference.id}`}
    >
      <p className="text-foreground/85 leading-relaxed" style={bodyStyle}>
        {reference.authors} ({reference.year}).{" "}
        {isJournalArticle ? (
          <>
            {reference.title}.{" "}
            <span className="italic">{reference.source}</span>
          </>
        ) : isBook ? (
          <>
            <span className="italic">{reference.title}</span>.{" "}
            {reference.source}
          </>
        ) : (
          <>
            <span className="italic">{reference.title}</span>.{" "}
            {reference.source}
          </>
        )}
        {reference.doi && (
          <>
            .{" "}
            <a 
              href={`https://doi.org/${reference.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline break-all"
            >
              https://doi.org/{reference.doi}
            </a>
          </>
        )}
      </p>
    </div>
  );
}

// Sort references alphabetically by first author's last name
function getSortedReferences(references: Reference[]): Reference[] {
  return [...references].sort((a, b) => {
    // Extract first author's last name for sorting
    const getLastName = (authors: string) => {
      const firstAuthor = authors.split(',')[0].trim();
      return firstAuthor.toLowerCase();
    };
    return getLastName(a.authors).localeCompare(getLastName(b.authors));
  });
}

export function JournalContent({ activeSection, onOpenPresentation, onOpenInfoCenter, onSectionChange }: JournalContentProps) {
  const month = journalData.months.find((m) => m.id === activeSection);
  const introTime = getIntroductionReadingTime(journalData);
  const refsTime = getReferencesReadingTime(journalData);
  
  // Font size state with localStorage persistence (with SSR safety check)
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(FONT_SIZE_KEY);
      return saved ? parseInt(saved, 10) : 16;
    }
    return 16;
  });

  useEffect(() => {
    localStorage.setItem(FONT_SIZE_KEY, fontSize.toString());
  }, [fontSize]);

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        {activeSection === "welcome" && (
          <article data-testid="section-welcome">
            <header className="mb-10 text-center">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                {journalData.cohortTheme}
              </h1>
              <h2 className="font-serif text-xl md:text-2xl text-muted-foreground mb-4">
                Personal Inquiry: {journalData.projectTitle}
              </h2>
              <p className="text-muted-foreground">{journalData.author}</p>
            </header>

            <Separator className="mb-10" />

            <div className="grid gap-6 md:grid-cols-3">
              <button
                type="button"
                className="w-full text-left p-6 rounded-lg border bg-card cursor-pointer hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => onSectionChange?.("overview")}
                data-testid="card-overview"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Overview</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Introduction and context for this inquiry.
                    </p>
                    <div className="flex items-center justify-end text-primary">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                className="w-full text-left p-6 rounded-lg border bg-card cursor-pointer hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => onSectionChange?.("monthly-inquiries")}
                data-testid="card-monthly-inquiries"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Monthly Inquiries</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Monthly reflections and explorations documenting the inquiry journey.
                    </p>
                    <div className="flex items-center justify-end text-primary">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                className="w-full text-left p-6 rounded-lg border bg-card cursor-pointer hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => onSectionChange?.("references")}
                data-testid="card-references"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">References</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Academic sources and citations from all content.
                    </p>
                    <div className="flex items-center justify-end text-primary">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground">
                Use the sidebar menu to navigate between sections
              </p>
            </div>
          </article>
        )}

        {activeSection === "overview" && (
          <article data-testid="section-overview">
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSectionChange?.("welcome")}
                className="gap-2"
                data-testid="button-back-to-welcome"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </div>
            <header className="mb-10 text-center">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                Overview
              </h1>
              <p className="text-muted-foreground">
                Introduction and context for this inquiry
              </p>
            </header>

            <Separator className="mb-10" />

            <div className="max-w-lg mx-auto">
              <button
                type="button"
                className="w-full text-left p-6 rounded-lg border bg-card cursor-pointer hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => onSectionChange?.("introduction")}
                data-testid="card-introduction"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Introduction</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Context and framing for this inquiry into AI's ecological and economic entanglements.
                    </p>
                    <div className="flex items-center justify-end text-primary">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </article>
        )}

        {activeSection === "monthly-inquiries" && (
          <article data-testid="section-monthly-inquiries">
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSectionChange?.("welcome")}
                className="gap-2"
                data-testid="button-back-to-welcome"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </div>
            <header className="mb-10 text-center">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                Monthly Inquiries
              </h1>
              <p className="text-muted-foreground">
                Monthly reflections and explorations documenting the inquiry journey
              </p>
            </header>

            <Separator className="mb-10" />

            <div className="grid gap-6 md:grid-cols-2">
              {journalData.months.map((month) => (
                <button
                  key={month.id}
                  type="button"
                  className="w-full text-left p-6 rounded-lg border bg-card cursor-pointer hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => onSectionChange?.(month.id)}
                  data-testid={`card-${month.id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                        Month {month.monthNumber}: {month.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {month.theme}
                      </p>
                      <div className="flex items-center justify-end text-primary">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </article>
        )}

        {activeSection === "introduction" && (
          <article data-testid="section-introduction">
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSectionChange?.("overview")}
                className="gap-2"
                data-testid="button-back-to-overview"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Overview
              </Button>
            </div>
            <header className="mb-10">
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">
                    Introduction
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatReadingTime(introTime)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FontSizeControl fontSize={fontSize} onFontSizeChange={setFontSize} />
                  <TextToSpeech sectionId="introduction" />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" title="AI Audio (CarPlay compatible)" data-testid="button-ai-audio-intro">
                        <Headphones className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-serif">AI Audio Narration</DialogTitle>
                      </DialogHeader>
                      <AudioPlayer sectionId="introduction" />
                    </DialogContent>
                  </Dialog>
                  {onOpenPresentation && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onOpenPresentation}
                      className="flex items-center gap-2"
                      data-testid="button-presentation-mode"
                    >
                      <Presentation className="h-4 w-4" />
                      <span className="hidden sm:inline">Presentation View</span>
                    </Button>
                  )}
                </div>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                {journalData.cohortTheme}
              </h1>
              <h2 className="font-serif text-xl md:text-2xl text-muted-foreground mb-4">
                Personal Inquiry: {journalData.projectTitle}
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{journalData.author}</span>
              </div>
            </header>

            <Separator className="mb-8" />

            <div className="prose-journal">
              {journalData.introduction.map((section, index) => (
                <p 
                  key={section.id}
                  className={`text-foreground/85 leading-relaxed mb-6 ${index === 0 ? 'drop-cap' : ''}`}
                  style={{ fontSize: `${fontSize}px` }}
                  data-testid={`intro-${section.id}`}
                >
                  {section.content}
                </p>
              ))}
            </div>
          </article>
        )}

        {activeSection === "references" && (
          <article data-testid="section-references">
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSectionChange?.("welcome")}
                className="gap-2"
                data-testid="button-back-to-welcome"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </div>
            <header className="mb-8">
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">
                    Bibliography
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatReadingTime(refsTime)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FontSizeControl fontSize={fontSize} onFontSizeChange={setFontSize} />
                  <TextToSpeech sectionId="references" />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" title="AI Audio (CarPlay compatible)" data-testid="button-ai-audio-refs">
                        <Headphones className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-serif">AI Audio Narration</DialogTitle>
                      </DialogHeader>
                      <AudioPlayer sectionId="references" />
                    </DialogContent>
                  </Dialog>
                  <ShareExportControls 
                    type="references"
                    project="edd-inquiry"
                    title="EdD Inquiry References"
                    content={journalData.references}
                    variant="icon"
                  />
                  <CitationAssistant />
                </div>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                References
              </h1>
              <p className="text-muted-foreground">
                {journalData.references.length} sources cited in this inquiry
              </p>
            </header>

            <Separator className="mb-6" />

            <Card className="p-6">
              {getSortedReferences(journalData.references).map((ref) => (
                <ReferenceItem key={ref.id} reference={ref} fontSize={fontSize} />
              ))}
            </Card>
          </article>
        )}

        {month && (
          <article data-testid={`section-${month.id}`}>
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSectionChange?.("monthly-inquiries")}
                className="gap-2"
                data-testid="button-back-to-monthly"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Monthly Inquiries
              </Button>
            </div>
            <header className="mb-8">
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="default" className="bg-primary">
                    Month {month.monthNumber}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatReadingTime(getMonthReadingTime(month))}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FontSizeControl fontSize={fontSize} onFontSizeChange={setFontSize} />
                  <TextToSpeech sectionId={month.id} />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" title="AI Audio (CarPlay compatible)" data-testid="button-ai-audio-month">
                        <Headphones className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-serif">AI Audio Narration</DialogTitle>
                      </DialogHeader>
                      <AudioPlayer sectionId={month.id} />
                    </DialogContent>
                  </Dialog>
                  {onOpenPresentation && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onOpenPresentation}
                      className="flex items-center gap-2"
                      data-testid="button-presentation-mode"
                    >
                      <Presentation className="h-4 w-4" />
                      <span className="hidden sm:inline">Present</span>
                    </Button>
                  )}
                </div>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                {month.title}
              </h1>
              <p className="text-xl text-muted-foreground italic">
                Theme: {month.theme}
              </p>
            </header>

            <Separator className="mb-8" />

            <div className="space-y-2">
              {month.sections.map((section) => (
                <MonthSectionCard key={section.id} section={section} fontSize={fontSize} />
              ))}
            </div>
          </article>
        )}

        <footer className="mt-16 pt-8 border-t border-border/50 text-center print:mt-8">
          <p className="text-xs text-muted-foreground">
            © Felix Abayomi 2026. All rights reserved.
          </p>
        </footer>
      </div>
    </ScrollArea>
  );
}
