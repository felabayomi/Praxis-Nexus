import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Headphones, 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Download,
  Loader2,
  Volume2,
  VolumeX,
  AudioLines
} from "lucide-react";

interface EssayAIAudioProps {
  getEssayText: () => string;
  className?: string;
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

export function EssayAIAudio({ getEssayText, className = "" }: EssayAIAudioProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlobs, setAudioBlobs] = useState<Blob[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateAudio = useCallback(async () => {
    setIsGenerating(true);
    setAudioBlobs([]);
    setCurrentChunkIndex(0);
    setProgress(0);

    try {
      const text = getEssayText();
      if (!text || text.trim().length < 10) {
        throw new Error("No content available for narration");
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

        const blob = await response.blob();
        blobs.push(blob);
      }

      setAudioBlobs(blobs);
      if (blobs.length > 0) {
        loadAudioChunk(blobs, 0);
      }
    } catch (error) {
      console.error("Audio generation error:", error);
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  }, [getEssayText]);

  const loadAudioChunk = (blobs: Blob[], index: number) => {
    if (index >= blobs.length) return;

    const url = URL.createObjectURL(blobs[index]);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load();
    }
    setCurrentChunkIndex(index);
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
      setCurrentChunkIndex(0);
      if (audioBlobs.length > 0) {
        loadAudioChunk(audioBlobs, 0);
      }
    }
  };

  const handleSkipBack = () => {
    if (currentChunkIndex > 0 && audioBlobs.length > 0) {
      loadAudioChunk(audioBlobs, currentChunkIndex - 1);
      if (isPlaying) {
        setTimeout(() => audioRef.current?.play(), 100);
      }
    }
  };

  const handleSkipForward = () => {
    if (currentChunkIndex < audioBlobs.length - 1) {
      loadAudioChunk(audioBlobs, currentChunkIndex + 1);
      if (isPlaying) {
        setTimeout(() => audioRef.current?.play(), 100);
      }
    }
  };

  const handleDownload = async () => {
    if (audioBlobs.length === 0) return;

    const combinedBlob = new Blob(audioBlobs, { type: "audio/mpeg" });
    const url = URL.createObjectURL(combinedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "integrated-essay-narration.mp3";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.muted = false;
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (currentChunkIndex < audioBlobs.length - 1) {
        loadAudioChunk(audioBlobs, currentChunkIndex + 1);
        setTimeout(() => audio.play(), 100);
      } else {
        setIsPlaying(false);
        setProgress(0);
        setCurrentChunkIndex(0);
        if (audioBlobs.length > 0) {
          loadAudioChunk(audioBlobs, 0);
        }
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentChunkIndex, audioBlobs]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const hasAudio = audioBlobs.length > 0;

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <AudioLines className="h-5 w-5" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">AI Audio Narration</h4>
                <p className="text-xs text-muted-foreground">OpenAI TTS • CarPlay Compatible</p>
              </div>
              
              {!hasAudio ? (
                <Button
                  onClick={generateAudio}
                  disabled={isGenerating}
                  size="sm"
                  data-testid="button-generate-audio"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {totalChunks > 0 ? `${generationProgress}/${totalChunks}` : "Preparing..."}
                    </>
                  ) : (
                    <>
                      <Headphones className="mr-2 h-4 w-4" />
                      Generate Audio
                    </>
                  )}
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Part {currentChunkIndex + 1}/{audioBlobs.length}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownload}
                    title="Download MP3"
                    data-testid="button-download-audio"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {hasAudio && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkipBack}
                disabled={currentChunkIndex === 0}
                data-testid="button-skip-back"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              {isPlaying ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePause}
                  data-testid="button-pause"
                >
                  <Pause className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlay}
                  data-testid="button-play"
                >
                  <Play className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleStop}
                data-testid="button-stop"
              >
                <Square className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkipForward}
                disabled={currentChunkIndex >= audioBlobs.length - 1}
                data-testid="button-skip-forward"
              >
                <SkipForward className="h-4 w-4" />
              </Button>

              <div className="flex-1 flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-10">
                  {formatTime(progress)}
                </span>
                <Slider
                  value={[progress]}
                  max={duration || 100}
                  step={1}
                  onValueChange={(value) => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = value[0];
                    }
                  }}
                  className="flex-1"
                  data-testid="slider-progress"
                />
                <span className="text-xs text-muted-foreground w-10">
                  {formatTime(duration)}
                </span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                data-testid="button-mute"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-20"
                data-testid="slider-volume"
              />
            </div>
          </div>
        )}

        <audio ref={audioRef} className="hidden" />
      </CardContent>
    </Card>
  );
}
