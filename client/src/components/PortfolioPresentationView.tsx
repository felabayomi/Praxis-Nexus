import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2,
  Loader2
} from "lucide-react";
import { portfolioData, type PortfolioStrand } from "@/lib/portfolioData";

interface PortfolioPresentationViewProps {
  open: boolean;
  onClose: () => void;
  strand?: PortfolioStrand;
}

const TEMPLATES = [
  { id: "academic", name: "Academic Navy", bg: "from-slate-900 via-blue-900 to-slate-800", text: "text-white" },
  { id: "forest", name: "Forest Scholar", bg: "from-slate-900 via-emerald-900 to-slate-800", text: "text-white" },
  { id: "violet", name: "Violet Wisdom", bg: "from-slate-900 via-violet-900 to-slate-800", text: "text-white" },
  { id: "minimal", name: "Clean Minimal", bg: "from-slate-100 via-white to-slate-50", text: "text-slate-900" },
  { id: "sunset", name: "Warm Sunset", bg: "from-slate-900 via-amber-900 to-slate-800", text: "text-white" },
];

interface Slide {
  title: string;
  content: string;
  type: "title" | "strand" | "artifact" | "outcomes";
  strandColor?: string;
}

export function PortfolioPresentationView({ open, onClose, strand }: PortfolioPresentationViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [generatingHeading, setGeneratingHeading] = useState<number | null>(null);
  const [aiHeadings, setAiHeadings] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!open) return;

    const generatedSlides: Slide[] = [];

    if (strand) {
      generatedSlides.push({
        title: strand.title,
        content: strand.description,
        type: "title",
        strandColor: strand.color
      });

      generatedSlides.push({
        title: "Strand Reflection",
        content: strand.strandReflection.substring(0, 800) + (strand.strandReflection.length > 800 ? "..." : ""),
        type: "strand",
        strandColor: strand.color
      });

      strand.artifacts.forEach(artifact => {
        generatedSlides.push({
          title: artifact.title,
          content: artifact.reflection,
          type: "artifact",
          strandColor: strand.color
        });
      });

      generatedSlides.push({
        title: "Learning Outcomes",
        content: strand.learningOutcomes.map(o => `• ${o}`).join("\n"),
        type: "outcomes",
        strandColor: strand.color
      });
    } else {
      generatedSlides.push({
        title: portfolioData.title,
        content: portfolioData.subtitle,
        type: "title"
      });

      portfolioData.strands.forEach(s => {
        generatedSlides.push({
          title: s.title,
          content: s.description + "\n\n" + s.purpose,
          type: "strand",
          strandColor: s.color
        });
      });

      generatedSlides.push({
        title: "Dissertation Connection",
        content: portfolioData.dissertationTitle,
        type: "title"
      });
    }

    setSlides(generatedSlides);
    setCurrentSlide(0);
  }, [open, strand]);

  const generateAIHeading = async (slideIndex: number) => {
    setGeneratingHeading(slideIndex);
    try {
      const response = await fetch("/api/presentation/generate-heading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: slides[slideIndex].content,
          slideNumber: slideIndex + 1,
          projectTitle: portfolioData.title
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiHeadings(prev => ({ ...prev, [slideIndex]: data.heading }));
      }
    } catch (error) {
      console.error("Failed to generate heading:", error);
    } finally {
      setGeneratingHeading(null);
    }
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, currentSlide, slides.length]);

  if (!open) return null;

  const currentSlideData = slides[currentSlide];
  const displayTitle = aiHeadings[currentSlide] || currentSlideData?.title;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className={`h-full w-full bg-gradient-to-br ${template.bg} ${template.text} flex flex-col`}>
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1 sm:gap-2 z-10">
          <select
            value={template.id}
            onChange={(e) => setTemplate(TEMPLATES.find(t => t.id === e.target.value) || TEMPLATES[0])}
            className={`text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded border ${
              template.id === 'minimal' 
                ? 'bg-white/80 backdrop-blur text-slate-700 border-slate-300' 
                : 'bg-black/30 backdrop-blur text-white border-white/20'
            }`}
            data-testid="select-template"
          >
            {TEMPLATES.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className={`hidden sm:flex ${template.id === 'minimal' ? 'text-slate-700' : 'text-white'}`}
            data-testid="button-fullscreen"
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className={template.id === 'minimal' ? 'text-slate-700' : 'text-white'}
            data-testid="button-close-presentation"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <Card className={`max-w-4xl w-full p-4 sm:p-8 md:p-12 bg-black/20 backdrop-blur-sm border-white/10 ${template.text}`}>
            <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
              {currentSlideData?.strandColor && (
                <Badge 
                  className={`
                    ${currentSlideData.strandColor === 'blue' ? 'bg-blue-500/20 text-blue-300' : ''}
                    ${currentSlideData.strandColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-300' : ''}
                    ${currentSlideData.strandColor === 'violet' ? 'bg-violet-500/20 text-violet-300' : ''}
                  `}
                >
                  {currentSlideData.type === 'artifact' ? 'Artifact' : 
                   currentSlideData.type === 'outcomes' ? 'Learning Outcomes' : 'Strand Overview'}
                </Badge>
              )}
              
              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-bold leading-tight ${template.text}`}>
                {displayTitle}
              </h1>
              
              <p className={`text-base sm:text-lg md:text-xl leading-relaxed opacity-90 whitespace-pre-line ${template.text}`}>
                {currentSlideData?.content}
              </p>

              {currentSlideData?.type !== 'title' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateAIHeading(currentSlide)}
                  disabled={generatingHeading === currentSlide}
                  className={`${template.id === 'minimal' ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-white/10 border-white/20 text-white'}`}
                  data-testid="button-generate-heading"
                >
                  {generatingHeading === currentSlide ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate AI Heading"
                  )}
                </Button>
              )}
            </div>
          </Card>
        </div>

        <div className={`flex items-center justify-between p-3 sm:p-4 border-t ${template.id === 'minimal' ? 'border-slate-200' : 'border-white/10'}`}>
          <Button
            variant="ghost"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`${template.id === 'minimal' ? 'text-slate-700 disabled:opacity-30' : 'text-white disabled:opacity-30'}`}
            data-testid="button-prev-slide"
          >
            <ChevronLeft className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center max-w-[50%]">
            {slides.length <= 10 ? slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentSlide 
                    ? (template.id === 'minimal' ? 'bg-slate-700 w-4' : 'bg-white w-4')
                    : (template.id === 'minimal' ? 'bg-slate-400' : 'bg-white/40')
                }`}
                data-testid={`button-slide-${i}`}
              />
            )) : (
              <span className={`text-sm ${template.id === 'minimal' ? 'text-slate-600' : 'text-white/70'}`}>
                {currentSlide + 1} / {slides.length}
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`${template.id === 'minimal' ? 'text-slate-700 disabled:opacity-30' : 'text-white disabled:opacity-30'}`}
            data-testid="button-next-slide"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-5 w-5 sm:ml-2" />
          </Button>
        </div>

        <div className={`absolute bottom-14 sm:bottom-4 left-4 text-sm ${template.id === 'minimal' ? 'text-slate-500' : 'text-white/50'}`}>
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>
    </div>
  );
}
