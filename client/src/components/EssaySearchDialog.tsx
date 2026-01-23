import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, BookOpen } from "lucide-react";
import { integratedEssayData } from "@/lib/integratedEssayData";

interface SearchResult {
  type: "section" | "reference";
  title: string;
  text: string;
  sectionId?: string;
}

interface EssaySearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  generatedSections?: Record<string, { content: string }>;
}

function searchEssay(query: string, generatedSections: Record<string, { content: string }> = {}): SearchResult[] {
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  for (const section of integratedEssayData.sections) {
    if (section.title.toLowerCase().includes(lowerQuery) || 
        section.description.toLowerCase().includes(lowerQuery) ||
        section.promptGuidance.toLowerCase().includes(lowerQuery)) {
      results.push({
        type: "section",
        title: section.title,
        text: section.description,
        sectionId: section.id,
      });
    }
    
    const generated = generatedSections[section.id];
    if (generated?.content?.toLowerCase().includes(lowerQuery)) {
      results.push({
        type: "section",
        title: `${section.title} (Generated)`,
        text: generated.content.substring(0, 150) + "...",
        sectionId: section.id,
      });
    }
  }

  for (const ref of integratedEssayData.references) {
    if (ref.citation.toLowerCase().includes(lowerQuery)) {
      results.push({
        type: "reference",
        title: "Reference",
        text: ref.citation.substring(0, 150) + "...",
      });
    }
  }

  return results.slice(0, 20);
}

export function EssaySearchDialog({ open, onOpenChange, generatedSections = {} }: EssaySearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const performSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }
    setResults(searchEssay(searchQuery, generatedSections));
  }, [generatedSections]);

  useEffect(() => {
    const timer = setTimeout(() => performSearch(query), 200);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  const getIcon = (type: string) => {
    switch (type) {
      case "section": return <FileText className="h-4 w-4" />;
      case "reference": return <BookOpen className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search Essay</DialogTitle>
          <DialogDescription className="sr-only">Search across essay content</DialogDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sections, content, references..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-base"
              autoFocus
              data-testid="input-essay-search"
            />
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4 pt-2">
          {query.trim().length < 2 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Type at least 2 characters to search</p>
              <p className="text-xs mt-2 text-muted-foreground/70">Tip: Press Ctrl+K or Cmd+K to open search</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No results found for "{query}"</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-3">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </p>
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => onOpenChange(false)}
                  className="w-full text-left p-3 rounded-lg border hover-elevate transition-colors"
                  data-testid={`search-result-${index}`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-teal-600">{getIcon(result.type)}</span>
                    <span className="font-medium text-sm text-foreground">{result.title}</span>
                    <Badge variant="secondary" className="text-xs ml-auto capitalize">{result.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{result.text}</p>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
