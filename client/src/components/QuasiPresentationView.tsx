import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2, 
  Minimize2,
  Sparkles,
  Loader2
} from "lucide-react";
import { quasiData } from "@/lib/quasiData";
import { apiRequest } from "@/lib/queryClient";
import { ShareExportControls } from "./ShareExportControls";

interface Slide {
  id: string;
  type: "title" | "content" | "question";
  title?: string;
  subtitle?: string;
  content?: string;
  question?: string;
  answer?: string;
  sectionTitle?: string;
  slideNumber: number;
}

interface SlideInsight {
  keyInsight: string;
  thematicConnection: string;
  discussionQuestion: string;
}

interface QuasiPresentationViewProps {
  onClose: () => void;
}

function createSlides(): Slide[] {
  const slides: Slide[] = [];
  let slideNumber = 1;

  slides.push({
    id: "title-slide",
    type: "title",
    title: quasiData.title,
    subtitle: quasiData.subtitle,
    slideNumber: slideNumber++,
  });

  slides.push({
    id: "research-question",
    type: "content",
    title: "Guiding Research Question",
    content: quasiData.researchQuestion.main,
    slideNumber: slideNumber++,
  });

  for (const section of quasiData.sections) {
    slides.push({
      id: `section-${section.id}`,
      type: "content",
      title: section.title,
      content: "",
      sectionTitle: section.title,
      slideNumber: slideNumber++,
    });

    for (const block of section.content) {
      if (block.type === "question") {
        slides.push({
          id: block.id,
          type: "question",
          question: block.question,
          answer: block.content,
          sectionTitle: section.title,
          slideNumber: slideNumber++,
        });
      }
    }
  }

  return slides;
}

export function QuasiPresentationView({ onClose }: QuasiPresentationViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [insight, setInsight] = useState<SlideInsight | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  const slides = createSlides();
  const slide = slides[currentSlide];
  const totalSlides = slides.length;

  const goToNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
      setInsight(null);
    }
  }, [currentSlide, totalSlides]);

  const goToPrevious = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setInsight(null);
    }
  }, [currentSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const fetchInsight = useCallback(async () => {
    if (slide.type === "title") return;
    
    setIsLoadingInsight(true);
    try {
      const content = slide.type === "question" 
        ? `Question: ${slide.question}\nAnswer: ${slide.answer}`
        : slide.content || slide.title;
      
      const response = await apiRequest("POST", "/api/presentation/insight", {
        content,
        sectionTitle: slide.sectionTitle || slide.title,
      });
      
      const data = await response.json();
      setInsight(data);
    } catch (error) {
      console.error("Failed to fetch insight:", error);
    } finally {
      setIsLoadingInsight(false);
    }
  }, [slide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === "f") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious, onClose, toggleFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 flex flex-col">
      <header className="flex items-center justify-between px-2 sm:px-4 h-12 sm:h-14 bg-black/20 backdrop-blur">
        <div className="flex items-center gap-2 sm:gap-4">
          <Badge variant="secondary" className="bg-violet-500/20 text-violet-200 text-xs sm:text-sm">
            {slide.slideNumber} / {totalSlides}
          </Badge>
          {slide.sectionTitle && (
            <span className="text-violet-200/60 text-xs sm:text-sm hidden md:inline truncate max-w-[150px]">
              {slide.sectionTitle}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowInsights(!showInsights);
              if (!showInsights && !insight && slide.type !== "title") {
                fetchInsight();
              }
            }}
            className="text-violet-200 hover:text-white hover:bg-violet-500/20 px-2 sm:px-3"
            disabled={slide.type === "title"}
            data-testid="button-ai-insights"
          >
            <Sparkles className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">AI Insights</span>
          </Button>
          <ShareExportControls
            type="presentation"
            project="quasi-qualitative"
            title={quasiData.title}
            content={slides}
            slides={slides}
            template="violet"
            className="text-violet-200"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-violet-200 hover:text-white hover:bg-violet-500/20 hidden sm:flex"
            data-testid="button-fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-violet-200 hover:text-white hover:bg-violet-500/20"
            data-testid="button-close-presentation"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-4xl w-full">
          {slide.type === "title" ? (
            <div className="text-center space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-violet-200">
                {slide.subtitle}
              </p>
              <p className="text-base sm:text-lg text-violet-300/80 mt-4 sm:mt-8">
                {quasiData.author}
              </p>
            </div>
          ) : slide.type === "question" ? (
            <div className="space-y-4 sm:space-y-8">
              <Card className="bg-white/10 backdrop-blur border-violet-400/30 p-4 sm:p-6 md:p-8">
                <p className="text-base sm:text-xl md:text-2xl text-violet-100 font-medium mb-4 sm:mb-6">
                  {slide.question}
                </p>
                <p className="text-sm sm:text-base md:text-lg text-violet-200/90 leading-relaxed">
                  {slide.answer}
                </p>
              </Card>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6 text-center">
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {slide.title}
              </h2>
              {slide.content && (
                <p className="text-base sm:text-lg md:text-xl text-violet-200 leading-relaxed max-w-3xl mx-auto">
                  {slide.content}
                </p>
              )}
            </div>
          )}

          {showInsights && slide.type !== "title" && (
            <Card className="mt-4 sm:mt-8 bg-violet-500/10 backdrop-blur border-violet-400/30 p-4 sm:p-6">
              {isLoadingInsight ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin text-violet-300" />
                  <span className="ml-2 text-violet-200 text-sm sm:text-base">Generating insights...</span>
                </div>
              ) : insight ? (
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-violet-300 mb-1">Key Insight</h4>
                    <p className="text-violet-100 text-sm sm:text-base">{insight.keyInsight}</p>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-violet-300 mb-1">Thematic Connection</h4>
                    <p className="text-violet-100 text-sm sm:text-base">{insight.thematicConnection}</p>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-violet-300 mb-1">Discussion Question</h4>
                    <p className="text-violet-100 text-sm sm:text-base">{insight.discussionQuestion}</p>
                  </div>
                </div>
              ) : (
                <p className="text-violet-200 text-center text-sm sm:text-base">Click to generate AI insights</p>
              )}
            </Card>
          )}
        </div>
      </main>

      <footer className="flex items-center justify-between px-4 sm:px-8 h-14 sm:h-16 bg-black/20 backdrop-blur">
        <Button
          variant="ghost"
          size="default"
          onClick={goToPrevious}
          disabled={currentSlide === 0}
          className="text-violet-200 hover:text-white hover:bg-violet-500/20"
          data-testid="button-prev-slide"
        >
          <ChevronLeft className="h-5 w-5 sm:mr-2" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        
        <div className="flex gap-1 items-center justify-center max-w-[40%] flex-wrap">
          {slides.length <= 12 ? slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setInsight(null);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide
                  ? "bg-violet-400 w-3"
                  : "bg-violet-600/50 hover:bg-violet-500/50"
              }`}
              data-testid={`slide-dot-${index}`}
            />
          )) : (
            <span className="text-violet-200 text-sm">
              {currentSlide + 1} / {totalSlides}
            </span>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="default"
          onClick={goToNext}
          disabled={currentSlide === totalSlides - 1}
          className="text-violet-200 hover:text-white hover:bg-violet-500/20"
          data-testid="button-next-slide"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-5 w-5 sm:ml-2" />
        </Button>
      </footer>
    </div>
  );
}
