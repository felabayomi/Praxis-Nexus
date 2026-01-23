import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  Download, 
  Loader2,
  Volume2
} from "lucide-react";
import { quasiData } from "@/lib/quasiData";

interface QuasiAudioPlayerProps {
  sectionId: string;
  onClose?: () => void;
}

function getTextForSection(sectionId: string): string {
  if (sectionId === "full") {
    let text = `${quasiData.title}. ${quasiData.subtitle}. By ${quasiData.author}. `;
    text += `Research Question: ${quasiData.researchQuestion.main}. ${quasiData.researchQuestion.overview}. `;
    
    for (const section of quasiData.sections) {
      text += `${section.title}. `;
      for (const block of section.content) {
        if (block.type === "question") {
          text += `${block.question}. ${block.content}. `;
        } else {
          text += `${block.content}. `;
        }
      }
    }
    return text;
  }

  const section = quasiData.sections.find(s => s.id === sectionId);
  if (section) {
    let text = `${section.title}. `;
    for (const block of section.content) {
      if (block.type === "question") {
        text += `${block.question}. ${block.content}. `;
      } else {
        text += `${block.content}. `;
      }
    }
    return text;
  }

  return quasiData.researchQuestion.main;
}

export function QuasiAudioPlayer({ sectionId, onClose }: QuasiAudioPlayerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    return () => {
      if (audioSrc) {
        URL.revokeObjectURL(audioSrc);
      }
    };
  }, [audioSrc]);

  const generateAudio = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const text = getTextForSection(sectionId);
      
      const response = await fetch("/api/tts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice: "nova" }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate audio");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioSrc(url);
    } catch (err) {
      setError("Failed to generate audio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleDownload = () => {
    if (audioSrc) {
      const a = document.createElement("a");
      a.href = audioSrc;
      a.download = `quasi-qualitative-${sectionId}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!audioSrc) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Generate AI-narrated audio for this content. Compatible with CarPlay, Android Auto, and Bluetooth audio.
        </p>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        <Button
          onClick={generateAudio}
          disabled={isLoading}
          className="w-full bg-violet-600"
          data-testid="button-generate-audio"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Audio...
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4 mr-2" />
              Generate AI Audio
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlayPause}
          data-testid="button-audio-play"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        
        <div className="flex-1 space-y-1">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            data-testid="slider-audio-progress"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDownload}
          title="Download MP3"
          data-testid="button-audio-download"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
