import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, BookCheck, AlertCircle, CheckCircle, Sparkles, Search, Database, Copy, BookOpen } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AUTHOR_MODE_KEY = "praxis-nexus-author-mode";

interface CitationSuggestion {
  statement: string;
  reason: string;
  suggestion: string;
  matchedReference?: string;
}

interface CitationAnalysis {
  suggestions: CitationSuggestion[];
  apaFormatTips: string[];
  overallFeedback: string;
  referenceCount?: number;
}

interface SearchResult {
  id: string;
  authors: string;
  year: string;
  title: string;
  inText: string;
  fullReference: string;
  abstract?: string;
}

export function CitationAssistant() {
  const [text, setText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [analysis, setAnalysis] = useState<CitationAnalysis | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorMode, setIsAuthorMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTHOR_MODE_KEY) === 'true';
    }
    return false;
  });
  const { toast } = useToast();

  const { data: refCount } = useQuery<{ count: number }>({
    queryKey: ['/api/references/count'],
    enabled: isAuthorMode,
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

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);

    try {
      const response = await apiRequest("POST", "/api/references/search", { query: searchQuery });
      const result = await response.json();
      
      if (result.references) {
        setSearchResults(result.references);
      }
    } catch (err) {
      console.error("Reference search error:", err);
      toast({ title: "Search failed", description: "Could not search references", variant: "destructive" });
    } finally {
      setIsSearching(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: `${type} copied to clipboard` });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" data-testid="button-citation-assistant">
          <BookCheck className="h-4 w-4" />
          <span className="hidden sm:inline">Citations</span>
          {refCount?.count && (
            <Badge variant="secondary" className="text-xs ml-1">
              {refCount.count}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-serif flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Citation Assistant
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Database className="h-3 w-3" />
            {refCount?.count ? `${refCount.count} references available` : 'Loading references...'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="analyze" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analyze" className="gap-2" data-testid="tab-analyze">
              <BookCheck className="h-4 w-4" />
              Analyze Text
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2" data-testid="tab-search">
              <Search className="h-4 w-4" />
              Search References
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-4 mt-4">
            <Textarea
              placeholder="Paste your academic text here to analyze for citation needs..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px] resize-none"
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
                  Analyzing with {refCount?.count || 0} references...
                </>
              ) : (
                <>
                  <BookCheck className="h-4 w-4" />
                  Check Citations & Match References
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
              <ScrollArea className="h-[280px]">
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
                            {suggestion.matchedReference && (
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="default" className="text-xs">Match</Badge>
                                <span className="text-xs font-medium">{suggestion.matchedReference}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-5 w-5"
                                  onClick={() => copyToClipboard(`(${suggestion.matchedReference})`, "Citation")}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
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
          </TabsContent>

          <TabsContent value="search" className="space-y-4 mt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search by author, title, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                data-testid="input-reference-search"
              />
              <Button 
                onClick={handleSearch} 
                disabled={!searchQuery.trim() || isSearching}
                data-testid="button-search-references"
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>

            <ScrollArea className="h-[320px]">
              <div className="space-y-3 pr-4">
                {searchResults.length === 0 && !isSearching && searchQuery && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No references found. Try different keywords.
                  </p>
                )}
                {searchResults.length === 0 && !searchQuery && (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Search your reference library</p>
                    <p className="text-xs mt-1">Find sources by author, title, or keywords</p>
                  </div>
                )}
                {searchResults.map((ref) => (
                  <Card key={ref.id} className="hover-elevate">
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-tight">{ref.title}</p>
                        <Badge variant="secondary" className="shrink-0">{ref.year}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{ref.authors}</p>
                      {ref.abstract && (
                        <p className="text-xs text-muted-foreground italic line-clamp-2">{ref.abstract}</p>
                      )}
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1 text-xs h-7"
                          onClick={() => copyToClipboard(`(${ref.inText})`, "In-text citation")}
                          data-testid={`button-copy-intext-${ref.id}`}
                        >
                          <Copy className="h-3 w-3" />
                          ({ref.inText})
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1 text-xs h-7"
                          onClick={() => copyToClipboard(ref.fullReference, "Full reference")}
                          data-testid={`button-copy-full-${ref.id}`}
                        >
                          <Copy className="h-3 w-3" />
                          Full Reference
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
