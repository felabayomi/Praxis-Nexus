import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Play, 
  Pause, 
  Download, 
  Loader2,
  Volume2,
  Headphones
} from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";

interface PortfolioAudioPlayerProps {
  sectionId?: string;
  onClose?: () => void;
}

function getPortfolioTextForSection(sectionId?: string): string {
  let text = `${portfolioData.title}. ${portfolioData.subtitle}. By ${portfolioData.author}. `;
  
  for (const strand of portfolioData.strands) {
    text += `${strand.title}. ${strand.description}. `;
    
    for (const artifact of strand.artifacts) {
      text += `${artifact.title}. ${artifact.description}. `;
      if (artifact.reflection) {
        text += `Reflection: ${artifact.reflection}. `;
      }
    }
  }
  
  return text;
}

function splitTextIntoChunks(text: string, maxLength: number = 4000): string[] {
  const chunks: string[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  let currentChunk = "";

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxLength && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? " " : "") + sentence;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

export function PortfolioAudioPlayer({ sectionId = "portfolio", onClose }: PortfolioAudioPlayerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlobs, setAudioBlobs] = useState<Blob[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    return () => {
      if (currentAudioUrl) {
        URL.revokeObjectURL(currentAudioUrl);
      }
    };
  }, [currentAudioUrl]);

  const loadAudioChunk = (blobs: Blob[], index: number) => {
    if (audioRef.current && blobs[index]) {
      if (currentAudioUrl) {
        URL.revokeObjectURL(currentAudioUrl);
      }
      const url = URL.createObjectURL(blobs[index]);
      setCurrentAudioUrl(url);
      audioRef.current.src = url;
      setCurrentChunkIndex(index);
    }
  };

  const generateAudio = async () => {
    setIsLoading(true);
    setError(null);
    setAudioBlobs([]);
    
    try {
      const text = getPortfolioTextForSection(sectionId);
      if (!text || text.length < 50) {
        setError("Not enough content to generate audio");
        return;
      }

      const chunks = splitTextIntoChunks(text);
      setTotalChunks(chunks.length);
      const blobs: Blob[] = [];

      for (let i = 0; i < chunks.length; i++) {
        setGenerationProgress(i + 1);
        
        const response = await fetch("/api/tts/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: chunks[i],
            voice: "nova",
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to generate audio for chunk ${i + 1}`);
        }

        const data = await response.json();
        const audioData = atob(data.audio);
        const audioArray = new Uint8Array(audioData.length);
        for (let j = 0; j < audioData.length; j++) {
          audioArray[j] = audioData.charCodeAt(j);
        }
        const blob = new Blob([audioArray], { type: "audio/mpeg" });
        blobs.push(blob);
      }

      setAudioBlobs(blobs);
      if (blobs.length > 0) {
        loadAudioChunk(blobs, 0);
      }
    } catch (err) {
      console.error("TTS error:", err);
      setError("Failed to generate audio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = async () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Playback failed:", err);
        setError("Playback failed. Please try again.");
      }
    }
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

  const handleEnded = () => {
    if (currentChunkIndex < audioBlobs.length - 1) {
      loadAudioChunk(audioBlobs, currentChunkIndex + 1);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 100);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
      setCurrentChunkIndex(0);
      if (audioBlobs.length > 0) {
        loadAudioChunk(audioBlobs, 0);
      }
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleDownload = async () => {
    if (audioBlobs.length === 0) return;
    
    const combinedBlob = new Blob(audioBlobs, { type: "audio/mpeg" });
    const url = URL.createObjectURL(combinedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-${sectionId}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const hasAudio = audioBlobs.length > 0;

  if (!hasAudio) {
    return (
      <Card className="border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                <Headphones className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div>
              <h4 className="font-medium">Audio Narration</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Listen to this section with AI-generated audio
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Works with CarPlay, Android Auto, and Bluetooth
              </p>
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button
              onClick={generateAudio}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
              data-testid="button-generate-audio"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {totalChunks > 0 ? `Generating ${generationProgress}/${totalChunks}...` : "Preparing..."}
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 mr-2" />
                  Generate Audio
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 dark:border-blue-800">
      <CardContent className="pt-6">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-sm">AI Audio Ready</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Part {currentChunkIndex + 1} of {audioBlobs.length}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={togglePlayPause}
              className="border-blue-300 dark:border-blue-700"
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
                className="cursor-pointer"
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
      </CardContent>
    </Card>
  );
}
