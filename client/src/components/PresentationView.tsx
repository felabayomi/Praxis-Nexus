import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  Leaf,
  Sparkles,
  Lightbulb,
  MessageCircleQuestion,
  Link2,
  Quote,
  TreeDeciduous,
  Mountain,
  Waves,
  Sun,
  Compass,
  X,
  Palette
} from "lucide-react";
import { journalData } from "@/lib/journalData";
import { apiRequest } from "@/lib/queryClient";
import { TemplateStyle, templates } from "./TemplateSelector";
import { ShareExportControls } from "./ShareExportControls";

interface PresentationViewProps {
  template: TemplateStyle;
  onClose: () => void;
  onChangeTemplate: () => void;
}

interface Slide {
  id: string;
  type: 'title' | 'content';
  title?: string;
  subtitle?: string;
  content?: string;
  author?: string;
  slideNumber: number;
  aiHeading?: string;
}

interface SlideInsight {
  keyInsight: string;
  thematicConnection: string;
  discussionQuestion: string;
  inquiryGuidance: string;
}

function createSlides(): Slide[] {
  const slides: Slide[] = [];
  
  slides.push({
    id: "title-slide",
    type: "title",
    title: journalData.cohortTheme,
    subtitle: journalData.projectTitle,
    author: journalData.author,
    slideNumber: 1
  });

  journalData.introduction.forEach((section, index) => {
    slides.push({
      id: section.id,
      type: "content",
      title: index === 0 ? "Introduction and Context" : undefined,
      content: section.content,
      slideNumber: index + 2
    });
  });

  return slides;
}

const templateIcons = {
  forest: TreeDeciduous,
  nature: Mountain,
  minimal: Sun,
  bold: Waves,
  elegant: Leaf
};

const templateStyles = {
  forest: {
    titleBg: "bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900",
    contentBg: "bg-gradient-to-br from-emerald-50/80 to-teal-50/30 dark:from-emerald-950/40 dark:to-teal-950/20",
    accentBar: "from-emerald-500 via-teal-400 to-emerald-600",
    pattern: "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.08) 0%, transparent 40%)",
    badgeBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    footerIcon: "bg-gradient-to-br from-emerald-600 to-emerald-700"
  },
  nature: {
    titleBg: "bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700",
    contentBg: "bg-gradient-to-br from-amber-50/80 to-orange-50/30 dark:from-amber-950/40 dark:to-orange-950/20",
    accentBar: "from-amber-500 via-sky-400 to-orange-500",
    pattern: "radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(14, 165, 233, 0.08) 0%, transparent 40%)",
    badgeBg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    footerIcon: "bg-gradient-to-br from-amber-600 to-orange-600"
  },
  minimal: {
    titleBg: "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950",
    contentBg: "bg-gradient-to-br from-slate-50/80 to-gray-50/30 dark:from-slate-950/40 dark:to-gray-950/20",
    accentBar: "from-slate-500 via-slate-400 to-slate-600",
    pattern: "radial-gradient(circle at 50% 50%, rgba(100, 116, 139, 0.06) 0%, transparent 70%)",
    badgeBg: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
    footerIcon: "bg-gradient-to-br from-slate-700 to-slate-800"
  },
  bold: {
    titleBg: "bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900",
    contentBg: "bg-gradient-to-br from-blue-50/80 to-cyan-50/30 dark:from-blue-950/40 dark:to-cyan-950/20",
    accentBar: "from-blue-500 via-cyan-400 to-indigo-500",
    pattern: "radial-gradient(circle at 90% 90%, rgba(6, 182, 212, 0.12) 0%, transparent 50%), radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 40%)",
    badgeBg: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    footerIcon: "bg-gradient-to-br from-blue-600 to-indigo-700"
  },
  elegant: {
    titleBg: "bg-gradient-to-br from-green-600 via-green-700 to-green-800",
    contentBg: "bg-gradient-to-br from-green-50/80 to-lime-50/30 dark:from-green-950/40 dark:to-lime-950/20",
    accentBar: "from-green-500 via-lime-400 to-green-600",
    pattern: "radial-gradient(circle at 10% 30%, rgba(132, 204, 22, 0.10) 0%, transparent 50%), radial-gradient(circle at 85% 70%, rgba(34, 197, 94, 0.08) 0%, transparent 40%)",
    badgeBg: "bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20",
    footerIcon: "bg-gradient-to-br from-green-600 to-green-700"
  }
};

export function PresentationView({ template, onClose, onChangeTemplate }: PresentationViewProps) {
  const [slides, setSlides] = useState<Slide[]>(createSlides());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAI, setShowAI] = useState(true);
  const [showMobileAI, setShowMobileAI] = useState(false);
  const [insight, setInsight] = useState<SlideInsight | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [insightCache, setInsightCache] = useState<Record<number, SlideInsight>>({});
  const [headingCache, setHeadingCache] = useState<Record<number, string>>({});

  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;
  const style = templateStyles[template];
  const Icon = templateIcons[template];
  const templateInfo = templates.find(t => t.id === template)!;

  useEffect(() => {
    const slideIndex = currentSlide;
    const currentSlideData = slides[slideIndex];
    
    if (currentSlideData.type === "content" && showAI) {
      if (insightCache[slideIndex]) {
        setInsight(insightCache[slideIndex]);
      } else {
        fetchInsight();
      }
      // Also fetch AI heading if not cached
      if (!headingCache[slideIndex] && currentSlideData.content) {
        fetchHeadingForSlide(slideIndex, currentSlideData.content);
      }
    } else {
      setInsight(null);
    }
  }, [currentSlide, showAI]);

  const fetchHeadingForSlide = async (slideIndex: number, content: string) => {
    try {
      const response = await apiRequest("POST", "/api/presentation/generate-heading", {
        content: content,
        slideNumber: slideIndex + 1,
        projectTitle: journalData.projectTitle
      });
      const result = await response.json();
      if (result.heading) {
        setHeadingCache(prev => ({ ...prev, [slideIndex]: result.heading }));
        setSlides(prevSlides => 
          prevSlides.map((s, i) => 
            i === slideIndex ? { ...s, aiHeading: result.heading } : s
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch heading:", error);
    }
  };

  const fetchInsight = async () => {
    if (!slide.content) return;
    
    setIsLoadingInsight(true);
    try {
      const response = await apiRequest("POST", "/api/presentation/enhance-slide", {
        content: slide.content,
        slideNumber: currentSlide + 1,
        totalSlides: slides.length,
        projectTitle: journalData.projectTitle,
        cohortTheme: journalData.cohortTheme
      });
      const result: SlideInsight = await response.json();
      setInsight(result);
      setInsightCache(prev => ({ ...prev, [currentSlide]: result }));
    } catch (error) {
      console.error("Failed to fetch insight:", error);
    } finally {
      setIsLoadingInsight(false);
    }
  };

  const goToNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      goToNext();
    } else if (e.key === "ArrowLeft") {
      goToPrev();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-muted/50 flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-testid="presentation-view"
    >
      <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-full ${style.footerIcon} flex items-center justify-center`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <span className="font-serif font-medium hidden sm:inline">{templateInfo.name}</span>
          <Badge variant="outline" className="font-mono text-xs">
            {currentSlide + 1} / {slides.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm"
            variant={showAI ? "default" : "outline"}
            onClick={() => {
              if (window.innerWidth < 1024) {
                setShowMobileAI(true);
              } else {
                setShowAI(!showAI);
              }
            }}
            className="gap-2"
            data-testid="button-toggle-ai"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI Insights</span>
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={onChangeTemplate}
            title="Change template"
            data-testid="button-change-template"
          >
            <Palette className="h-4 w-4" />
          </Button>
          <ShareExportControls
            type="presentation"
            project="edd-inquiry"
            title={journalData.cohortTheme}
            content={slides}
            slides={slides}
            template={template}
          />
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={toggleFullscreen}
            data-testid="button-fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            data-testid="button-exit-presentation"
          >
            Exit
          </Button>
        </div>
      </header>

      <div className="h-1 bg-muted overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${style.accentBar} transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex-1 flex items-stretch p-4 md:p-8 overflow-hidden gap-6">
        <div className={`flex-1 flex items-center justify-center ${showAI && slide.type === "content" ? "lg:flex-[2]" : ""}`}>
          {slide.type === "title" ? (
            <Card className={`w-full max-w-5xl aspect-[16/9] relative overflow-hidden border-0 shadow-2xl ${style.titleBg}`}>
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <Icon className="w-full h-full text-white" />
              </div>
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 md:p-16 text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center h-20 w-20 md:h-28 md:w-28 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                    <Icon className="h-10 w-10 md:h-14 md:w-14 text-white" />
                  </div>
                </div>
                
                <Badge className="bg-white/20 text-white border-white/30 mb-6 text-xs uppercase tracking-widest">
                  EdD Cohort 2026
                </Badge>
                
                <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-4xl">
                  {slide.title}
                </h1>
                
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mb-6" />
                
                <h2 className="font-serif text-lg md:text-xl lg:text-2xl text-white/90 italic max-w-3xl">
                  {slide.subtitle}
                </h2>
                
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p className="text-white/70 font-medium">{slide.author}</p>
                </div>
              </div>
            </Card>
          ) : (
            <Card 
              className={`w-full max-w-5xl min-h-[400px] max-h-[80vh] relative overflow-hidden border shadow-xl flex flex-col`}
              style={{
                background: style.pattern + ", hsl(var(--card))"
              }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${style.accentBar} z-20`} />
              
              <div className="absolute top-6 right-6 opacity-5">
                <Icon className="h-32 w-32" />
              </div>
              
              <div className="relative z-10 flex-1 flex flex-col p-6 md:p-10 lg:p-12 overflow-hidden">
                {(slide.title || slide.aiHeading || headingCache[currentSlide]) && (
                  <div className="mb-4 shrink-0">
                    <Badge className={`${style.badgeBg} uppercase tracking-wider text-xs`}>
                      {slide.aiHeading || headingCache[currentSlide] || slide.title}
                    </Badge>
                  </div>
                )}
                
                {!slide.title && !slide.aiHeading && !headingCache[currentSlide] && (
                  <div className="mb-3 shrink-0">
                    <Quote className="h-6 w-6 opacity-20" />
                  </div>
                )}
                
                <div className="flex-1 overflow-y-auto pr-2">
                  <p className="font-serif text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90">
                    {slide.content}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-4 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full ${style.footerIcon} flex items-center justify-center`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      {journalData.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Slide
                    </span>
                    <span className="font-mono text-sm font-bold opacity-70">
                      {String(currentSlide + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {showAI && slide.type === "content" && (
          <div className="hidden lg:flex flex-col flex-1 max-w-sm gap-4">
            <Card className="p-5 flex-1 flex flex-col gap-5 overflow-auto border shadow-lg bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl ${style.footerIcon} flex items-center justify-center`}>
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-foreground">AI Insights</h3>
                  <p className="text-xs text-muted-foreground">Powered by intelligence</p>
                </div>
              </div>

              {isLoadingInsight ? (
                <div className="space-y-5 flex-1">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-20 w-full rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                  </div>
                </div>
              ) : insight ? (
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                      <div className="h-6 w-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Lightbulb className="h-3.5 w-3.5" />
                      </div>
                      Key Insight
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20 p-4 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {insight.keyInsight}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Link2 className="h-3.5 w-3.5" />
                      </div>
                      Thematic Connection
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/20 p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {insight.thematicConnection}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
                      <div className="h-6 w-6 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        <MessageCircleQuestion className="h-3.5 w-3.5" />
                      </div>
                      Discussion Question
                    </div>
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/20 p-4 rounded-xl border border-violet-200/50 dark:border-violet-800/30">
                      <p className="text-sm text-foreground/85 leading-relaxed italic">
                        {insight.discussionQuestion}
                      </p>
                    </div>
                  </div>

                  {insight.inquiryGuidance && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400">
                        <div className="h-6 w-6 rounded-lg bg-sky-500/10 flex items-center justify-center">
                          <Compass className="h-3.5 w-3.5" />
                        </div>
                        Inquiry Pathways
                      </div>
                      <div className="bg-gradient-to-br from-sky-50 to-cyan-50/50 dark:from-sky-950/30 dark:to-cyan-950/20 p-4 rounded-xl border border-sky-200/50 dark:border-sky-800/30">
                        <p className="text-sm text-foreground/85 leading-relaxed">
                          {insight.inquiryGuidance}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <Button onClick={fetchInsight} variant="outline" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate Insights
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}
      </main>

      <footer className="px-4 md:px-6 py-4 border-t bg-card/80 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <Button
            variant="outline"
            onClick={goToPrev}
            disabled={currentSlide === 0}
            className="gap-2"
            data-testid="button-prev-slide"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex items-center gap-1.5 sm:gap-2 max-w-[40%] flex-wrap justify-center">
            {slides.length <= 10 ? slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide 
                    ? `w-4 sm:w-6 h-2 rounded-full ${style.footerIcon}` 
                    : "w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                data-testid={`slide-indicator-${index}`}
              />
            )) : (
              <span className="text-sm text-muted-foreground font-medium">
                {currentSlide + 1} / {slides.length}
              </span>
            )}
          </div>

          <Button
            variant="outline"
            onClick={goToNext}
            disabled={currentSlide === slides.length - 1}
            className="gap-2"
            data-testid="button-next-slide"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </footer>

      <Sheet open={showMobileAI} onOpenChange={setShowMobileAI}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-xl overflow-hidden flex flex-col p-0">
          <SheetHeader className="px-4 py-3 border-b shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-lg ${style.footerIcon} flex items-center justify-center`}>
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <SheetTitle className="font-serif">AI Insights</SheetTitle>
              </div>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {isLoadingInsight ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-20 w-full rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-16 w-full rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-16 w-full rounded-xl" />
                </div>
              </div>
            ) : insight ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                    <div className="h-6 w-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <Lightbulb className="h-3.5 w-3.5" />
                    </div>
                    Key Insight
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20 p-4 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
                    <p className="text-sm text-foreground/85 leading-relaxed">
                      {insight.keyInsight}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Link2 className="h-3.5 w-3.5" />
                    </div>
                    Thematic Connection
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/20 p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
                    <p className="text-sm text-foreground/85 leading-relaxed">
                      {insight.thematicConnection}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
                    <div className="h-6 w-6 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <MessageCircleQuestion className="h-3.5 w-3.5" />
                    </div>
                    Discussion Question
                  </div>
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/20 p-4 rounded-xl border border-violet-200/50 dark:border-violet-800/30">
                    <p className="text-sm text-foreground/85 leading-relaxed italic">
                      {insight.discussionQuestion}
                    </p>
                  </div>
                </div>

                {insight.inquiryGuidance && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400">
                      <div className="h-6 w-6 rounded-lg bg-sky-500/10 flex items-center justify-center">
                        <Compass className="h-3.5 w-3.5" />
                      </div>
                      Inquiry Pathways
                    </div>
                    <div className="bg-gradient-to-br from-sky-50 to-cyan-50/50 dark:from-sky-950/30 dark:to-cyan-950/20 p-4 rounded-xl border border-sky-200/50 dark:border-sky-800/30">
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {insight.inquiryGuidance}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center py-12">
                <Button onClick={fetchInsight} variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Insights
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
