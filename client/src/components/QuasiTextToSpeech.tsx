import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Volume2, Play, Pause, Square, FastForward } from "lucide-react";
import { quasiData } from "@/lib/quasiData";

interface QuasiTextToSpeechProps {
  sectionId: string;
}

function getTextForSection(sectionId: string): string {
  if (sectionId === "research-question") {
    return `${quasiData.researchQuestion.main}. ${quasiData.researchQuestion.overview}`;
  }
  
  if (sectionId === "full") {
    let text = `${quasiData.title}. ${quasiData.subtitle}. By ${quasiData.author}. `;
    text += `Research Question: ${quasiData.researchQuestion.main}. ${quasiData.researchQuestion.overview}. `;
    
    for (const section of quasiData.sections) {
      text += `${section.title}. `;
      for (const block of section.content) {
        if (block.type === "question") {
          text += `Question: ${block.question}. Answer: ${block.content}. `;
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
        text += `Question: ${block.question}. Answer: ${block.content}. `;
      } else {
        text += `${block.content}. `;
      }
    }
    return text;
  }

  return "";
}

export function QuasiTextToSpeech({ sectionId }: QuasiTextToSpeechProps) {
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

    const text = getTextForSection(sectionId);
    if (!text) return;

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
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

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const cycleRate = useCallback(() => {
    const rates = [0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(rate);
    const nextIndex = (currentIndex + 1) % rates.length;
    setRate(rates[nextIndex]);
  }, [rate]);

  if (!isSupported) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          title="Text to Speech"
          className={isPlaying ? "text-violet-600 dark:text-violet-400" : ""}
          data-testid="button-tts"
        >
          <Volume2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="end">
        <div className="flex items-center gap-1">
          {!isPlaying ? (
            <Button variant="ghost" size="icon" onClick={speak} title="Play" data-testid="button-tts-play">
              <Play className="h-4 w-4" />
            </Button>
          ) : isPaused ? (
            <Button variant="ghost" size="icon" onClick={resume} title="Resume" data-testid="button-tts-resume">
              <Play className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={pause} title="Pause" data-testid="button-tts-pause">
              <Pause className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={stop} title="Stop" disabled={!isPlaying} data-testid="button-tts-stop">
            <Square className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={cycleRate} 
            title="Change speed"
            className="text-xs min-w-[3rem]"
            data-testid="button-tts-speed"
          >
            <FastForward className="h-3 w-3 mr-1" />
            {rate}x
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
