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
  Loader2
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
      className="fixed inset-0 z-50 bg-background flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-testid="presentation-view"
    >
      <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b bg-card">
        <div className="flex items-center gap-3">
          <Leaf className="h-5 w-5 text-primary" />
          <span className="font-serif font-medium hidden sm:inline">AI-Enhanced Presentation</span>
          <Badge variant="secondary">
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

      <Progress value={progress} className="h-1 rounded-none" />

      <main className="flex-1 flex items-stretch p-4 md:p-8 overflow-hidden gap-4">
        <div className={`flex-1 flex items-center justify-center ${showAI && slide.type === "content" ? "lg:flex-[2]" : ""}`}>
          <Card className="w-full max-w-4xl aspect-[16/9] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-60" />
            
            {slide.type === "title" ? (
              <div className="text-center space-y-6">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Leaf className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                  </div>
                </div>
                <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                  {slide.title}
                </h1>
                <h2 className="font-serif text-lg md:text-xl lg:text-2xl text-muted-foreground italic">
                  {slide.subtitle}
                </h2>
                <div className="pt-6">
                  <p className="text-lg text-muted-foreground">{slide.author}</p>
                  <p className="text-sm text-muted-foreground/60 mt-2">EdD Cohort 2026</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {slide.title && (
                  <Badge variant="secondary" className="mb-2">
                    {slide.title}
                  </Badge>
                )}
                <p className="font-serif text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90">
                  {slide.content}
                </p>
              </div>
            )}

            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {journalData.author}
              </span>
              <span className="text-xs text-muted-foreground">
                Slide {currentSlide + 1}
              </span>
            </div>
          </Card>
        </div>

        {showAI && slide.type === "content" && (
          <div className="hidden lg:flex flex-col flex-1 max-w-sm gap-4">
            <Card className="p-4 flex-1 flex flex-col gap-4 overflow-auto">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-serif font-semibold">AI Insights</h3>
              </div>

              {isLoadingInsight ? (
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              ) : insight ? (
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      Key Insight
                    </div>
                    <p className="text-sm text-foreground/85 leading-relaxed bg-amber-500/5 p-3 rounded-md border border-amber-500/20">
                      {insight.keyInsight}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Link2 className="h-4 w-4 text-primary" />
                      Thematic Connection
                    </div>
                    <p className="text-sm text-foreground/85 leading-relaxed bg-primary/5 p-3 rounded-md border border-primary/20">
                      {insight.thematicConnection}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <MessageCircleQuestion className="h-4 w-4 text-accent" />
                      Discussion Question
                    </div>
                    <p className="text-sm text-foreground/85 leading-relaxed italic bg-accent/5 p-3 rounded-md border border-accent/20">
                      {insight.discussionQuestion}
                    </p>
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

      <footer className="px-4 md:px-6 py-4 border-t bg-card">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <Button
            variant="outline"
            onClick={goToPrev}
            disabled={currentSlide === 0}
            data-testid="button-prev-slide"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`p-0.5 rounded-full transition-colors ${
                  index === currentSlide 
                    ? "text-primary" 
                    : "text-muted-foreground/40 hover:text-muted-foreground"
                }`}
                data-testid={`slide-indicator-${index}`}
              >
                <Circle 
                  className={`h-2 w-2 ${index === currentSlide ? "fill-current" : ""}`} 
                />
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={goToNext}
            disabled={currentSlide === slides.length - 1}
            data-testid="button-next-slide"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
