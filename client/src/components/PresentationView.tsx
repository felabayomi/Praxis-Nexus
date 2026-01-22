import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  Circle,
  Leaf,
  Sparkles,
  Lightbulb,
  MessageCircleQuestion,
  Link2,
  Quote,
  TreeDeciduous
} from "lucide-react";
import { journalData } from "@/lib/journalData";
import { apiRequest } from "@/lib/queryClient";

interface PresentationViewProps {
  onClose: () => void;
}

interface Slide {
  id: string;
  type: 'title' | 'content';
  title?: string;
  subtitle?: string;
  content?: string;
  author?: string;
  slideNumber: number;
}

interface SlideInsight {
  keyInsight: string;
  thematicConnection: string;
  discussionQuestion: string;
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

const decorativePatterns = [
  "radial-gradient(circle at 10% 20%, hsl(var(--primary) / 0.08) 0%, transparent 50%)",
  "radial-gradient(circle at 90% 80%, hsl(var(--accent) / 0.1) 0%, transparent 40%)",
  "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.05) 0%, transparent 30%)",
];

export function PresentationView({ onClose }: PresentationViewProps) {
  const slides = createSlides();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAI, setShowAI] = useState(true);
  const [insight, setInsight] = useState<SlideInsight | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [insightCache, setInsightCache] = useState<Record<number, SlideInsight>>({});

  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  useEffect(() => {
    if (slide.type === "content" && showAI) {
      if (insightCache[currentSlide]) {
        setInsight(insightCache[currentSlide]);
      } else {
        fetchInsight();
      }
    } else {
      setInsight(null);
    }
  }, [currentSlide, showAI]);

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
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Leaf className="h-4 w-4 text-primary" />
          </div>
          <span className="font-serif font-medium hidden sm:inline">AI-Enhanced Presentation</span>
          <Badge variant="outline" className="font-mono text-xs">
            {currentSlide + 1} / {slides.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm"
            variant={showAI ? "default" : "outline"}
            onClick={() => setShowAI(!showAI)}
            className="gap-2"
            data-testid="button-toggle-ai"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI Insights</span>
          </Button>
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
          className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex-1 flex items-stretch p-4 md:p-8 overflow-hidden gap-6">
        <div className={`flex-1 flex items-center justify-center ${showAI && slide.type === "content" ? "lg:flex-[2]" : ""}`}>
          {slide.type === "title" ? (
            <Card className="w-full max-w-5xl aspect-[16/9] relative overflow-hidden border-0 shadow-2xl">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/95"
              />
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
                <TreeDeciduous className="w-full h-full text-white" />
              </div>
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 md:p-16 text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center h-20 w-20 md:h-28 md:w-28 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                    <Leaf className="h-10 w-10 md:h-14 md:w-14 text-white" />
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
              className="w-full max-w-5xl aspect-[16/9] relative overflow-hidden border shadow-xl"
              style={{
                background: decorativePatterns.map(p => p).join(", ") + ", hsl(var(--card))"
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
              
              <div className="absolute top-6 right-6 opacity-5">
                <Leaf className="h-32 w-32 text-primary" />
              </div>
              
              <div className="relative z-10 h-full flex flex-col p-8 md:p-12 lg:p-16">
                {slide.title && (
                  <div className="mb-6">
                    <Badge className="bg-primary/10 text-primary border-primary/20 uppercase tracking-wider text-xs">
                      {slide.title}
                    </Badge>
                  </div>
                )}
                
                {!slide.title && (
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-primary/20" />
                  </div>
                )}
                
                <div className="flex-1 flex items-center">
                  <p className="font-serif text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/90 max-w-prose">
                    {slide.content}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      {journalData.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Slide
                    </span>
                    <span className="font-mono text-sm font-bold text-primary">
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
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
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

          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide 
                    ? "w-6 h-2 rounded-full bg-primary" 
                    : "w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                data-testid={`slide-indicator-${index}`}
              />
            ))}
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
    </div>
  );
}
