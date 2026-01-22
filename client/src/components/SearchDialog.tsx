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
import { Search, FileText, BookOpen, Quote } from "lucide-react";
import { journalData } from "@/lib/journalData";
import { searchJournal, type SearchResult } from "@/lib/journalUtils";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (sectionId: string) => void;
}

export function SearchDialog({ open, onOpenChange, onNavigate }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const performSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }
    const searchResults = searchJournal(journalData, searchQuery);
    setResults(searchResults);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  const handleResultClick = (result: SearchResult) => {
    onNavigate(result.sectionId);
    onOpenChange(false);
  };

  const getIcon = (matchType: string) => {
    switch (matchType) {
      case "introduction":
        return <FileText className="h-4 w-4" />;
      case "month":
        return <BookOpen className="h-4 w-4" />;
      case "reference":
        return <Quote className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = (matchType: string) => {
    switch (matchType) {
      case "introduction":
        return "secondary";
      case "month":
        return "default";
      case "reference":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search Journal</DialogTitle>
          <DialogDescription className="sr-only">
            Search for topics, terms, or authors across the journal
          </DialogDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics, terms, or authors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-base"
              autoFocus
              data-testid="input-search"
            />
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4 pt-2">
          {query.trim().length < 2 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Type at least 2 characters to search</p>
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
                  key={`${result.sectionId}-${index}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-3 rounded-lg border hover-elevate transition-colors"
                  data-testid={`search-result-${index}`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-primary">
                      {getIcon(result.matchType)}
                    </span>
                    <span className="font-medium text-sm text-foreground">
                      {result.sectionTitle}
                    </span>
                    <Badge variant={getBadgeVariant(result.matchType)} className="text-xs ml-auto">
                      {result.matchType}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {result.matchText}
                  </p>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
