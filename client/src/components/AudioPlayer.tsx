import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  Volume2, 
  Loader2, 
  Headphones,
  SkipBack,
  SkipForward
} from "lucide-react";
import { journalData } from "@/lib/journalData";
import { getAllTextForTTS } from "@/lib/journalUtils";
import { apiRequest } from "@/lib/queryClient";

interface AudioPlayerProps {
  sectionId: string;
  onClose?: () => void;
}

export function AudioPlayer({ sectionId, onClose }: AudioPlayerProps) {
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
      const text = getAllTextForTTS(journalData, sectionId);
      if (!text) {
        setError("No content to read");
        return;
      }

      const response = await apiRequest("POST", "/api/tts/generate", {
        text,
        sectionId
      });

      const result = await response.json();
      
      if (result.error) {
        setError(result.error);
        return;
      }

      // Convert base64 to blob URL
      const audioData = atob(result.audio);
      const audioArray = new Uint8Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) {
        audioArray[i] = audioData.charCodeAt(i);
      }
      const blob = new Blob([audioArray], { type: result.mimeType });
      const url = URL.createObjectURL(blob);
      
      setAudioSrc(url);
    } catch (err) {
      console.error("TTS error:", err);
      setError("Failed to generate audio");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = async () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      try {
        await audioRef.current.play();
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

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  if (!audioSrc) {
    return (
      <Card className="border shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Headphones className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-serif font-semibold">Audio Narration</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Listen to this section with AI-generated audio
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Works with CarPlay, Android Auto, and Bluetooth
              </p>
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button 
              onClick={generateAudio} 
              disabled={isLoading}
              className="gap-2"
              data-testid="button-generate-audio"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Audio...
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
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
    <Card className="border shadow-lg">
      <CardContent className="p-4">
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={skipBackward}
              title="Skip back 10 seconds"
              data-testid="button-skip-back"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              onClick={togglePlayPause}
              className="h-12 w-12 rounded-full"
              data-testid="button-play-pause"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={skipForward}
              title="Skip forward 10 seconds"
              data-testid="button-skip-forward"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="w-full"
              data-testid="slider-audio-progress"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Audio plays through your device's media output
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
