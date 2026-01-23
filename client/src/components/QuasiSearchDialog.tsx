import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, FileText } from "lucide-react";
import { quasiData } from "@/lib/quasiData";

interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  matches: string[];
}

interface QuasiSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate?: (sectionId: string) => void;
}

function searchContent(query: string): SearchResult[] {
  if (!query.trim()) return [];
  
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  if (
    quasiData.researchQuestion.main.toLowerCase().includes(lowerQuery) ||
    quasiData.researchQuestion.overview.toLowerCase().includes(lowerQuery)
  ) {
    results.push({
      sectionId: "research-question",
      sectionTitle: "Research Question",
      matches: [quasiData.researchQuestion.main],
    });
  }

  for (const section of quasiData.sections) {
    const matches: string[] = [];
    
    if (section.title.toLowerCase().includes(lowerQuery)) {
      matches.push(section.title);
    }
    
    for (const block of section.content) {
      if (block.type === "question" && block.question?.toLowerCase().includes(lowerQuery)) {
        matches.push(block.question);
      }
      if (block.content.toLowerCase().includes(lowerQuery)) {
        const index = block.content.toLowerCase().indexOf(lowerQuery);
        const start = Math.max(0, index - 40);
        const end = Math.min(block.content.length, index + query.length + 40);
        const excerpt = (start > 0 ? "..." : "") + 
          block.content.slice(start, end) + 
          (end < block.content.length ? "..." : "");
        matches.push(excerpt);
      }
    }

    if (matches.length > 0) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        matches: matches.slice(0, 3),
      });
    }
  }

  return results;
}

export function QuasiSearchDialog({ open, onOpenChange, onNavigate }: QuasiSearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setResults(searchContent(value));
  }, []);

  const handleSelect = (sectionId: string) => {
    onNavigate?.(sectionId);
    onOpenChange(false);
  };

  const highlightMatch = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;
    
    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-violet-200 dark:bg-violet-800 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-sans">
            <Search className="h-5 w-5" />
            Search Content
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Input
            placeholder="Search sections, questions, content..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
            autoFocus
            data-testid="input-search"
          />
          
          <ScrollArea className="max-h-80">
            {results.length > 0 ? (
              <div className="space-y-2">
                {results.map((result) => (
                  <button
                    key={result.sectionId}
                    onClick={() => handleSelect(result.sectionId)}
                    className="w-full text-left p-3 rounded-lg border hover-elevate transition-colors"
                    data-testid={`search-result-${result.sectionId}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                      <span className="font-medium text-sm">
                        {result.sectionTitle}
                      </span>
                    </div>
                    {result.matches.map((match, i) => (
                      <p key={i} className="text-xs text-muted-foreground pl-6 truncate">
                        {highlightMatch(match, query)}
                      </p>
                    ))}
                  </button>
                ))}
              </div>
            ) : query ? (
              <p className="text-center text-muted-foreground py-8">
                No results found for "{query}"
              </p>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Start typing to search...
              </p>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
