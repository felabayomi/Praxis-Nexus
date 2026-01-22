import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Volume2, Pause, Play, Square, Settings } from "lucide-react";
import { journalData } from "@/lib/journalData";
import { getAllTextForTTS } from "@/lib/journalUtils";

interface TextToSpeechProps {
  sectionId: string;
}

export function TextToSpeech({ sectionId }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setIsSupported(false);
    }
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, [sectionId]);

  const speak = useCallback(() => {
    if (!isSupported) return;
    
    const text = getAllTextForTTS(journalData, sectionId);
    if (!text) return;

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural"))
    ) || voices.find(v => v.lang.startsWith("en"));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  }, [sectionId, rate, isSupported]);

  const togglePlayPause = () => {
    if (!isPlaying) {
      speak();
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlayPause}
        title={isPlaying ? (isPaused ? "Resume" : "Pause") : "Listen to this section"}
        data-testid="button-tts-play"
      >
        {isPlaying && !isPaused ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
      
      {isPlaying && (
        <Button
          variant="ghost"
          size="icon"
          onClick={stop}
          title="Stop"
          data-testid="button-tts-stop"
        >
          <Square className="h-4 w-4" />
        </Button>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            title="Speech settings"
            data-testid="button-tts-settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="end">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Speed: {rate}x
              </label>
              <Slider
                value={[rate]}
                onValueChange={([value]) => setRate(value)}
                min={0.5}
                max={2}
                step={0.25}
                className="w-full"
                data-testid="slider-tts-rate"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Adjust playback speed for comfortable listening
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
