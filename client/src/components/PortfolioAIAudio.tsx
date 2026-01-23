import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Headphones, Download, Loader2, Pause, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PortfolioAIAudioProps {
  getText: () => string;
  sectionId?: string;
}

export function PortfolioAIAudio({ getText, sectionId = "portfolio" }: PortfolioAIAudioProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const generateAudio = async () => {
    const text = getText();
    if (!text || text.length < 50) {
      toast({
        title: "Not enough content",
        description: "Please ensure there is enough text content to generate audio.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/tts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, sectionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate audio");
      }

      const data = await response.json();
      const audioBlob = new Blob(
        [Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))],
        { type: "audio/mpeg" }
      );
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      const audio = new Audio(url);
      audio.onended = () => setIsPlaying(false);
      setAudioElement(audio);

      toast({
        title: "Audio Generated",
        description: `AI narration ready (${data.chunks} segment${data.chunks > 1 ? 's' : ''})`,
      });
    } catch (error) {
      console.error("Audio generation error:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate audio narration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayback = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play();
      setIsPlaying(true);
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `portfolio-${sectionId}-narration.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!audioUrl) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={generateAudio}
        disabled={isGenerating}
        title="Generate AI Audio Narration"
        data-testid="button-ai-audio-generate"
      >
        {isGenerating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Headphones className="h-4 w-4" />
        )}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlayback}
        title={isPlaying ? "Pause" : "Play AI Audio"}
        data-testid="button-ai-audio-play"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={downloadAudio}
        title="Download Audio"
        data-testid="button-ai-audio-download"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}
