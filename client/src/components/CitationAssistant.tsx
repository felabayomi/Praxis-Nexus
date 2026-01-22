import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, BookCheck, AlertCircle, CheckCircle, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const AUTHOR_MODE_KEY = "praxis-nexus-author-mode";

interface CitationSuggestion {
  statement: string;
  reason: string;
  suggestion: string;
}

interface CitationAnalysis {
  suggestions: CitationSuggestion[];
  apaFormatTips: string[];
  overallFeedback: string;
}

export function CitationAssistant() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CitationAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorMode, setIsAuthorMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTHOR_MODE_KEY) === 'true';
    }
    return false;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setIsAuthorMode(prev => {
          const newValue = !prev;
          localStorage.setItem(AUTHOR_MODE_KEY, String(newValue));
          return newValue;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isAuthorMode) {
    return null;
  }

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await apiRequest("POST", "/api/citation/analyze", { text });
      const result = await response.json();
      
      if (result.error) {
        setError(result.error);
      } else {
        setAnalysis(result);
      }
    } catch (err) {
      console.error("Citation analysis error:", err);
      setError("Failed to analyze text. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" data-testid="button-citation-assistant">
          <BookCheck className="h-4 w-4" />
          Citation Check
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-serif flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Citation Assistant
          </DialogTitle>
          <DialogDescription>
            Paste your text to check for statements that may need citations and verify APA 7th format
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Textarea
            placeholder="Paste your academic text here to analyze for citation needs..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px] resize-none"
            data-testid="textarea-citation-input"
          />
          
          <Button 
            onClick={handleAnalyze} 
            disabled={!text.trim() || isAnalyzing}
            className="w-full gap-2"
            data-testid="button-analyze-citations"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <BookCheck className="h-4 w-4" />
                Check Citations
              </>
            )}
          </Button>

          {error && (
            <Card className="border-destructive">
              <CardContent className="pt-4">
                <p className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </p>
              </CardContent>
            </Card>
          )}

          {analysis && (
            <ScrollArea className="h-[300px]">
              <div className="space-y-4 pr-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Overall Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{analysis.overallFeedback}</p>
                  </CardContent>
                </Card>

                {analysis.suggestions.length > 0 && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Statements That May Need Citations ({analysis.suggestions.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysis.suggestions.map((suggestion, index) => (
                        <div key={index} className="border-l-2 border-primary/30 pl-4 space-y-1">
                          <p className="text-sm font-medium text-foreground">
                            "{suggestion.statement}"
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <strong>Why:</strong> {suggestion.reason}
                          </p>
                          <p className="text-xs text-primary">
                            <strong>Suggestion:</strong> {suggestion.suggestion}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {analysis.apaFormatTips.length > 0 && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">APA 7th Format Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {analysis.apaFormatTips.map((tip, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <Badge variant="outline" className="mt-0.5 shrink-0">Tip</Badge>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {analysis.suggestions.length === 0 && analysis.apaFormatTips.length === 0 && (
                  <Card className="border-green-500/30 bg-green-500/5">
                    <CardContent className="pt-4">
                      <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Your text appears well-cited with proper APA formatting!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
