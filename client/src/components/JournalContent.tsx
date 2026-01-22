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
  Headphones
} from "lucide-react";
import { journalData } from "@/lib/journalData";
import { TextToSpeech } from "@/components/TextToSpeech";
import { AudioPlayer } from "@/components/AudioPlayer";
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

function ContentBlock({ section }: { section: ContentSection }) {
  if (section.type === "paragraph") {
    return (
      <p className="text-foreground/85 leading-relaxed mb-4" data-testid={`content-${section.id}`}>
        {section.content}
      </p>
    );
  }

  if (section.type === "quote") {
    return (
      <blockquote 
        className="border-l-4 border-primary/30 pl-4 py-2 my-4 italic text-muted-foreground"
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
            <span className="text-foreground/85 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return null;
}

function MonthSectionCard({ section }: { section: MonthSection }) {
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
          <ContentBlock key={block.id} section={block} />
        ))}
      </div>
    </Card>
  );
}

function ReferenceItem({ reference }: { reference: Reference }) {
  return (
    <div 
      className="py-4 border-b border-border/50 last:border-0"
      data-testid={`reference-${reference.id}`}
    >
      <p className="text-foreground/85 leading-relaxed">
        <span className="font-medium">{reference.authors}</span> ({reference.year}).{" "}
        <span className="italic">{reference.title}</span>.{" "}
        {reference.source}
        {reference.doi && (
          <a 
            href={`https://doi.org/${reference.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 ml-2 text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            <span className="text-sm">DOI</span>
          </a>
        )}
      </p>
    </div>
  );
}

export function JournalContent({ activeSection, onOpenPresentation, onOpenInfoCenter, onSectionChange }: JournalContentProps) {
  const month = journalData.months.find((m) => m.id === activeSection);
  const introTime = getIntroductionReadingTime(journalData);
  const refsTime = getReferencesReadingTime(journalData);

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

            <div className="grid gap-6 md:grid-cols-2">
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
                      Introduction, context, and references for this inquiry.
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
                Introduction, context, and references for this inquiry
              </p>
            </header>

            <Separator className="mb-10" />

            <div className="grid gap-6 md:grid-cols-2">
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
                      Academic sources and citations referenced in this inquiry.
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
                  className={`text-foreground/85 leading-relaxed mb-6 text-base md:text-lg ${index === 0 ? 'drop-cap' : ''}`}
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
                onClick={() => onSectionChange?.("overview")}
                className="gap-2"
                data-testid="button-back-to-overview"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Overview
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
              {journalData.references.map((ref) => (
                <ReferenceItem key={ref.id} reference={ref} />
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
                <MonthSectionCard key={section.id} section={section} />
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
