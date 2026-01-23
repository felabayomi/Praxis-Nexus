import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  BookOpen, Microscope, Users, Database, BarChart, Shield, FileText,
  ChevronDown, ChevronUp, ExternalLink, HelpCircle, Type, Plus, Minus,
  Headphones, Presentation, Search
} from "lucide-react";
import { quasiData, QuasiSection, QuasiContentBlock } from "@/lib/quasiData";
import { QuasiAudioPlayer } from "@/components/QuasiAudioPlayer";
import { QuasiTextToSpeech } from "@/components/QuasiTextToSpeech";

const FONT_SIZE_KEY = "praxis-nexus-quasi-font-size";
const FONT_SIZES = [
  { label: "Small", value: "text-sm", size: 14 },
  { label: "Medium", value: "text-base", size: 16 },
  { label: "Large", value: "text-lg", size: 18 },
  { label: "X-Large", value: "text-xl", size: 20 },
];

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="h-5 w-5" />,
  Microscope: <Microscope className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  BarChart: <BarChart className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
};

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

function ContentBlock({ block, fontSize }: { block: QuasiContentBlock; fontSize: number }) {
  const fontClass = fontSize === 14 ? "text-sm" : fontSize === 18 ? "text-lg" : fontSize === 20 ? "text-xl" : "text-base";
  
  if (block.type === "question") {
    return (
      <div className="mb-6 last:mb-0">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-violet-500/10 flex items-center justify-center mt-0.5">
            <HelpCircle className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
          </div>
          <p className="font-medium text-foreground">{block.question}</p>
        </div>
        <div className="pl-9">
          <p className={`text-muted-foreground leading-relaxed ${fontClass}`}>{block.content}</p>
        </div>
      </div>
    );
  }
  
  if (block.type === "paragraph") {
    return (
      <p className={`text-muted-foreground leading-relaxed mb-4 last:mb-0 ${fontClass}`}>
        {block.content}
      </p>
    );
  }

  return null;
}

function SectionCard({ section, isExpanded, onToggle, fontSize }: { 
  section: QuasiSection; 
  isExpanded: boolean;
  onToggle: () => void;
  fontSize: number;
}) {
  const icon = iconMap[section.icon];

  return (
    <Card 
      className="overflow-visible transition-all"
      data-testid={`section-${section.id}`}
    >
      <CardHeader 
        className="cursor-pointer hover-elevate"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
              {icon}
            </div>
            <CardTitle className="font-sans text-lg">{section.title}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <Separator className="mb-6" />
          {section.content.map((block) => (
            <ContentBlock key={block.id} block={block} fontSize={fontSize} />
          ))}
        </CardContent>
      )}
    </Card>
  );
}

interface QuasiReasoningViewProps {
  onOpenPresentation: () => void;
  onOpenSearch: () => void;
}

export function QuasiReasoningView({ onOpenPresentation, onOpenSearch }: QuasiReasoningViewProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["theoretical-framework"]));
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(FONT_SIZE_KEY);
      return saved ? parseInt(saved, 10) : 16;
    }
    return 16;
  });
  const contentRef = useRef<HTMLDivElement>(null);

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    localStorage.setItem(FONT_SIZE_KEY, String(size));
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSections(new Set(quasiData.sections.map(s => s.id)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  const fontClass = fontSize === 14 ? "text-sm" : fontSize === 18 ? "text-lg" : fontSize === 20 ? "text-xl" : "text-base";

  return (
    <ScrollArea className="flex-1">
      <div ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800">
            Research Methodology
          </Badge>
          <h1 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {quasiData.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            {quasiData.subtitle}
          </p>
          <p className="text-sm text-muted-foreground">
            {quasiData.author} · {quasiData.affiliation}
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <FontSizeControl fontSize={fontSize} onFontSizeChange={handleFontSizeChange} />
            <QuasiTextToSpeech sectionId="research-question" />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" title="AI Audio (CarPlay compatible)" data-testid="button-ai-audio">
                  <Headphones className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-sans">AI Audio Narration</DialogTitle>
                </DialogHeader>
                <QuasiAudioPlayer sectionId="full" />
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenPresentation}
              className="flex items-center gap-2"
              data-testid="button-presentation-mode"
            >
              <Presentation className="h-4 w-4" />
              <span className="hidden sm:inline">Presentation</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSearch}
              className="flex items-center gap-2"
              data-testid="button-search"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </header>

        <Card className="mb-8 border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/20">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/20 text-violet-600 dark:text-violet-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <CardTitle className="font-sans text-lg">Guiding Research Question</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className={`text-foreground font-medium leading-relaxed mb-4 text-lg`}>
              {quasiData.researchQuestion.main}
            </p>
            <Separator className="my-4" />
            <p className={`text-muted-foreground leading-relaxed ${fontClass}`}>
              {quasiData.researchQuestion.overview}
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h2 className="font-sans text-xl font-semibold text-foreground">
            Study Components
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={expandAll} data-testid="button-expand-all">
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll} data-testid="button-collapse-all">
              Collapse All
            </Button>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {quasiData.sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              isExpanded={expandedSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
              fontSize={fontSize}
            />
          ))}
        </div>

        <Card className="mb-10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <CardTitle className="font-sans text-lg">References</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quasiData.references.map((ref) => (
                <div key={ref.id} className="flex items-start gap-3">
                  <p className={`text-muted-foreground leading-relaxed flex-1 ${fontClass}`}>
                    {ref.citation}
                    {ref.url && (
                      <a 
                        href={ref.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 ml-2 text-violet-600 dark:text-violet-400 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <footer className="text-center py-8 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            © Felix Abayomi 2026
          </p>
        </footer>
      </div>
    </ScrollArea>
  );
}
