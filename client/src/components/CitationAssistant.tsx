import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, BookCheck, AlertCircle, CheckCircle, Sparkles, Search, Database, Copy, BookOpen, FileText, List } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";

const AUTHOR_MODE_KEY = "praxis-nexus-author-mode";

interface SearchResult {
  id: string;
  authors: string;
  year: string;
  title: string;
  inText: string;
  fullReference: string;
  abstract?: string;
}

interface CitationUsed {
  refId: string;
  inText: string;
  context: string;
}

interface AutoCiteResult {
  originalText: string;
  citedText: string;
  citationsUsed: CitationUsed[];
  references: SearchResult[];
  unchangedStatements: string[];
  summary: string;
  totalReferencesAvailable: number;
}

export function CitationAssistant() {
  const [text, setText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [autoCiteResult, setAutoCiteResult] = useState<AutoCiteResult | null>(null);
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
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'y') {
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

  const handleAutoCite = async () => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    setAutoCiteResult(null);

    try {
      const response = await apiRequest("POST", "/api/citation/auto-cite", { text });
      const result = await response.json();
      
      if (result.error) {
        setError(result.error);
      } else {
        setAutoCiteResult(result);
      }
    } catch (err) {
      console.error("Auto-cite error:", err);
      setError("Failed to process text. Please try again.");
    } finally {
      setIsProcessing(false);
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

  const copyToClipboard = (textToCopy: string, type: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({ title: "Copied!", description: `${type} copied to clipboard` });
  };

  const copyAllResults = () => {
    if (!autoCiteResult) return;
    
    const refList = autoCiteResult.references
      .map(r => r.fullReference)
      .join('\n\n');
    
    const fullOutput = `${autoCiteResult.citedText}\n\n---\n\nReferences\n\n${refList}`;
    copyToClipboard(fullOutput, "Cited text and references");
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
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-serif flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Citation Assistant
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Database className="h-3 w-3" />
            {refCount?.count ? `${refCount.count} references available for auto-citation` : 'Loading references...'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="autocite" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="autocite" className="gap-2" data-testid="tab-autocite">
              <FileText className="h-4 w-4" />
              Auto-Cite Text
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2" data-testid="tab-search">
              <Search className="h-4 w-4" />
              Search References
            </TabsTrigger>
          </TabsList>

          <TabsContent value="autocite" className="space-y-4 mt-4">
            {!autoCiteResult ? (
              <>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Paste your text below. The AI will identify statements needing citations and automatically insert them from your reference database.
                  </p>
                  <Textarea
                    placeholder="Paste your academic text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[180px] resize-none"
                    data-testid="textarea-citation-input"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {text.length} / 15,000 characters
                  </p>
                </div>
                
                <Button 
                  onClick={handleAutoCite} 
                  disabled={!text.trim() || isProcessing}
                  className="w-full gap-2"
                  data-testid="button-auto-cite"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding citations from {refCount?.count || 0} references...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Auto-Cite My Text
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
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">
                      {autoCiteResult.citationsUsed.length} citations added
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAutoCiteResult(null)}
                      data-testid="button-edit-text"
                    >
                      Edit Original
                    </Button>
                    <Button 
                      size="sm"
                      className="gap-1"
                      onClick={copyAllResults}
                      data-testid="button-copy-all"
                    >
                      <Copy className="h-3 w-3" />
                      Copy All
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground italic">
                  {autoCiteResult.summary}
                </p>

                <Separator />

                <ScrollArea className="h-[300px]">
                  <div className="space-y-4 pr-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Cited Text
                          </CardTitle>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="gap-1 h-7 text-xs"
                            onClick={() => copyToClipboard(autoCiteResult.citedText, "Cited text")}
                            data-testid="button-copy-cited-text"
                          >
                            <Copy className="h-3 w-3" />
                            Copy
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap bg-muted/50 p-3 rounded-md">
                          {autoCiteResult.citedText}
                        </div>
                      </CardContent>
                    </Card>

                    {autoCiteResult.references.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                              <List className="h-4 w-4" />
                              References ({autoCiteResult.references.length})
                            </CardTitle>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="gap-1 h-7 text-xs"
                              onClick={() => {
                                const refs = autoCiteResult.references.map(r => r.fullReference).join('\n\n');
                                copyToClipboard(refs, "References list");
                              }}
                              data-testid="button-copy-references"
                            >
                              <Copy className="h-3 w-3" />
                              Copy All
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {autoCiteResult.references.map((ref, index) => (
                            <div 
                              key={ref.id || index} 
                              className="text-sm border-l-2 border-primary/30 pl-3 hover-elevate p-2 rounded-r-md"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm leading-relaxed" style={{ textIndent: '-0.5rem', paddingLeft: '0.5rem' }}>
                                  {ref.fullReference}
                                </p>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6 shrink-0"
                                  onClick={() => copyToClipboard(ref.fullReference, "Reference")}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                    {autoCiteResult.unchangedStatements.length > 0 && (
                      <Card className="border-amber-500/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center gap-2 text-amber-600 dark:text-amber-400">
                            <AlertCircle className="h-4 w-4" />
                            Statements Without Matching References
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {autoCiteResult.unchangedStatements.map((statement, index) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                • {statement}
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-muted-foreground mt-3 italic">
                            Consider adding sources to your reference database or finding manual citations for these.
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {autoCiteResult.citationsUsed.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Citation Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {autoCiteResult.citationsUsed.map((citation, index) => (
                            <div key={index} className="flex items-start gap-2 text-xs">
                              <Badge variant="outline" className="shrink-0">{citation.inText}</Badge>
                              <span className="text-muted-foreground">{citation.context}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </ScrollArea>
              </div>
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
