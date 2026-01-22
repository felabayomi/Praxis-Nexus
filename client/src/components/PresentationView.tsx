import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  Circle,
  Leaf
} from "lucide-react";
import { journalData } from "@/lib/journalData";

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

  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div 
      className="fixed inset-0 z-50 bg-background flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-testid="presentation-view"
    >
      <header className="flex items-center justify-between px-6 py-3 border-b bg-card">
        <div className="flex items-center gap-3">
          <Leaf className="h-5 w-5 text-primary" />
          <span className="font-serif font-medium">Presentation Mode</span>
          <Badge variant="secondary">
            {currentSlide + 1} / {slides.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
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
            Exit Presentation
          </Button>
        </div>
      </header>

      <Progress value={progress} className="h-1 rounded-none" />

      <main className="flex-1 flex items-center justify-center p-8 overflow-hidden">
        <Card className="w-full max-w-5xl aspect-[16/9] p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-60" />
          
          {slide.type === "title" ? (
            <div className="text-center space-y-8">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {slide.title}
              </h1>
              <h2 className="font-serif text-xl md:text-2xl text-muted-foreground italic">
                {slide.subtitle}
              </h2>
              <div className="pt-8">
                <p className="text-lg text-muted-foreground">{slide.author}</p>
                <p className="text-sm text-muted-foreground/60 mt-2">EdD Cohort 2026</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {slide.title && (
                <Badge variant="secondary" className="mb-4">
                  {slide.title}
                </Badge>
              )}
              <p className="font-serif text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/90">
                {slide.content}
              </p>
            </div>
          )}

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {journalData.author}
            </span>
            <span className="text-xs text-muted-foreground">
              Slide {currentSlide + 1}
            </span>
          </div>
        </Card>
      </main>

      <footer className="px-6 py-4 border-t bg-card">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <Button
            variant="outline"
            onClick={goToPrev}
            disabled={currentSlide === 0}
            data-testid="button-prev-slide"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`p-1 rounded-full transition-colors ${
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
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
