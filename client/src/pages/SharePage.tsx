import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  Presentation,
  Volume2,
  AlertCircle,
  BookOpen
} from "lucide-react";

interface ShareData {
  id: string;
  token: string;
  type: 'presentation' | 'audio';
  project: string;
  title: string;
  content: any;
  createdAt: string;
}

export default function SharePage() {
  const [, params] = useRoute("/share/:token");
  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchShareData() {
      if (!params?.token) return;
      
      try {
        const response = await fetch(`/api/share/${params.token}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("This share link is not found or has expired.");
          } else {
            setError("Failed to load shared content.");
          }
          return;
        }
        const data = await response.json();
        setShareData(data);
      } catch (err) {
        setError("Failed to load shared content.");
      } finally {
        setLoading(false);
      }
    }

    fetchShareData();
  }, [params?.token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading shared content...</p>
        </div>
      </div>
    );
  }

  if (error || !shareData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-semibold mb-2">Content Not Found</h2>
            <p className="text-muted-foreground">{error || "This share link is invalid."}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const projectNames: Record<string, string> = {
    'edd-inquiry': 'EdD Inquiry',
    'quasi-qualitative': 'Quasi-Qualitative',
    'portfolio': 'Doctoral Portfolio',
    'integrated-essay': 'Integrated Essay'
  };

  if (shareData.type === 'presentation') {
    const slides = shareData.content.slides || [];
    const template = shareData.content.template || 'forest-canopy';
    
    const templateStyles: Record<string, { bg: string; text: string; accent: string }> = {
      'forest-canopy': { bg: 'from-emerald-900 via-green-800 to-teal-900', text: 'text-white', accent: 'bg-emerald-500' },
      'earth-sky': { bg: 'from-amber-700 via-orange-600 to-rose-700', text: 'text-white', accent: 'bg-amber-400' },
      'clean-scholar': { bg: 'from-slate-100 via-gray-50 to-slate-200', text: 'text-slate-900', accent: 'bg-blue-600' },
      'ocean-deep': { bg: 'from-blue-900 via-indigo-800 to-slate-900', text: 'text-white', accent: 'bg-cyan-400' },
      'botanical-garden': { bg: 'from-lime-700 via-emerald-600 to-teal-700', text: 'text-white', accent: 'bg-lime-300' },
    };

    const style = templateStyles[template] || templateStyles['forest-canopy'];
    const currentSlideData = slides[currentSlide];

    return (
      <div className={`min-h-screen bg-gradient-to-br ${style.bg} ${style.text}`}>
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            <BookOpen className="h-3 w-3 mr-1" />
            {projectNames[shareData.project] || shareData.project}
          </Badge>
        </div>

        <div className="flex flex-col h-screen">
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-4xl w-full">
              {currentSlideData && (
                <div className="text-center">
                  <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                    {currentSlideData.heading || currentSlideData.title}
                  </h1>
                  <div 
                    className="text-lg md:text-xl opacity-90 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: currentSlideData.content?.replace(/\n/g, '<br/>') || '' }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="p-6 flex items-center justify-between">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="text-white hover:bg-white/20"
              data-testid="button-prev-slide"
            >
              <ChevronLeft className="h-6 w-6 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {slides.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentSlide ? style.accent : 'bg-white/40'
                  }`}
                  data-testid={`button-slide-dot-${i}`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="text-white hover:bg-white/20"
              data-testid="button-next-slide"
            >
              Next
              <ChevronRight className="h-6 w-6 ml-2" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 text-sm opacity-60">
          Shared from Praxis Nexus • {shareData.title}
        </div>
      </div>
    );
  }

  if (shareData.type === 'audio') {
    const audioUrl = shareData.content.audioUrl;
    const text = shareData.content.text;

    return (
      <div className="min-h-screen bg-background">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="h-3 w-3 mr-1" />
              {projectNames[shareData.project] || shareData.project}
            </Badge>
            <h1 className="text-2xl font-semibold mb-2">{shareData.title}</h1>
            <p className="text-muted-foreground">Audio Narration</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-6">
                <Volume2 className="h-16 w-16 text-primary opacity-60" />
              </div>
              
              {audioUrl ? (
                <audio 
                  controls 
                  className="w-full" 
                  src={audioUrl}
                  data-testid="audio-player"
                >
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p className="text-center text-muted-foreground">Audio not available</p>
              )}

              {text && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-2">Transcript</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Shared from Praxis Nexus
          </p>
        </div>
      </div>
    );
  }

  return null;
}
