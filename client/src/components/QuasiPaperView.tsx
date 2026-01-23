import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  Loader2, 
  Sparkles,
  BookOpen,
  Printer,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { quasiData } from "@/lib/quasiData";
import { apiRequest } from "@/lib/queryClient";

type PaperFormat = "proposal" | "full";

interface ChapterContent {
  title: string;
  content: string;
  isGenerated: boolean;
  isLoading: boolean;
  isExpanded: boolean;
  usedCitationIds: string[];
}

const CHAPTER_STRUCTURE = {
  proposal: [
    { id: "abstract", title: "Abstract", description: "150-250 word summary of the study" },
    { id: "chapter1", title: "Chapter 1: Introduction", description: "Background, problem statement, purpose, research questions" },
    { id: "chapter2", title: "Chapter 2: Literature Review", description: "Theoretical frameworks, empirical studies, gaps" },
    { id: "chapter3", title: "Chapter 3: Research Design and Methodology", description: "Design, participants, data collection, analysis" },
  ],
  full: [
    { id: "abstract", title: "Abstract", description: "150-250 word summary of the study" },
    { id: "chapter1", title: "Chapter 1: Introduction", description: "Background, problem statement, purpose, research questions" },
    { id: "chapter2", title: "Chapter 2: Literature Review", description: "Theoretical frameworks, empirical studies, gaps" },
    { id: "chapter3", title: "Chapter 3: Research Design and Methodology", description: "Design, participants, data collection, analysis" },
    { id: "chapter4", title: "Chapter 4: Findings", description: "Data analysis and key findings" },
    { id: "chapter5", title: "Chapter 5: Discussion", description: "Interpretation, implications, limitations" },
    { id: "chapter6", title: "Chapter 6: Conclusions", description: "Summary, recommendations, future research" },
  ],
};

function getSourceContent(): string {
  let content = `Title: ${quasiData.title}\n`;
  content += `Subtitle: ${quasiData.subtitle}\n`;
  content += `Author: ${quasiData.author}\n`;
  content += `Affiliation: ${quasiData.affiliation}\n\n`;
  content += `Research Question: ${quasiData.researchQuestion.main}\n`;
  content += `Overview: ${quasiData.researchQuestion.overview}\n\n`;
  
  for (const section of quasiData.sections) {
    content += `\n## ${section.title}\n\n`;
    for (const block of section.content) {
      if (block.type === "question") {
        content += `Q: ${block.question}\n`;
        content += `A: ${block.content}\n\n`;
      } else {
        content += `${block.content}\n\n`;
      }
    }
  }
  
  return content;
}

function getReferencesForApi() {
  return quasiData.references.map(ref => ({
    id: ref.id,
    citation: ref.citation,
  }));
}

export function QuasiPaperView() {
  const [format, setFormat] = useState<PaperFormat>("proposal");
  const [chapters, setChapters] = useState<Record<string, ChapterContent>>({});
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);

  const structure = CHAPTER_STRUCTURE[format];
  
  const allUsedCitationIds = Object.values(chapters)
    .filter(c => c.isGenerated && c.usedCitationIds)
    .flatMap(c => c.usedCitationIds);
  const uniqueCitationIds = [...new Set(allUsedCitationIds)];
  const usedReferences = quasiData.references.filter(ref => uniqueCitationIds.includes(ref.id));
  const hasGeneratedContent = Object.values(chapters).some(c => c.isGenerated);

  const generateChapter = async (chapterId: string) => {
    const chapterInfo = structure.find(c => c.id === chapterId);
    if (!chapterInfo) return;

    setChapters(prev => ({
      ...prev,
      [chapterId]: {
        ...prev[chapterId],
        title: chapterInfo.title,
        content: "",
        isLoading: true,
        isGenerated: false,
        isExpanded: true,
        usedCitationIds: [],
      },
    }));

    try {
      const response = await apiRequest("POST", "/api/dissertation/generate-chapter", {
        chapterId,
        chapterTitle: chapterInfo.title,
        chapterDescription: chapterInfo.description,
        sourceContent: getSourceContent(),
        format,
        references: getReferencesForApi(),
      });

      const data = await response.json();
      
      setChapters(prev => ({
        ...prev,
        [chapterId]: {
          title: chapterInfo.title,
          content: data.content,
          isLoading: false,
          isGenerated: true,
          isExpanded: true,
          usedCitationIds: data.usedCitationIds || [],
        },
      }));
    } catch (error) {
      setChapters(prev => ({
        ...prev,
        [chapterId]: {
          title: chapterInfo.title,
          content: "Failed to generate chapter. Please try again.",
          isLoading: false,
          isGenerated: false,
          isExpanded: true,
          usedCitationIds: [],
        },
      }));
    }
  };

  const generateAllChapters = async () => {
    setIsGeneratingAll(true);
    
    for (const chapter of structure) {
      await generateChapter(chapter.id);
    }
    
    setIsGeneratingAll(false);
  };

  const toggleChapter = (chapterId: string) => {
    setChapters(prev => ({
      ...prev,
      [chapterId]: {
        ...prev[chapterId],
        isExpanded: !prev[chapterId]?.isExpanded,
      },
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    let content = `${quasiData.title}\n`;
    content += `${quasiData.subtitle}\n`;
    content += `By ${quasiData.author}\n`;
    content += `${quasiData.affiliation}\n\n`;
    content += "=".repeat(60) + "\n\n";
    
    for (const chapter of structure) {
      const chapterData = chapters[chapter.id];
      if (chapterData?.isGenerated) {
        content += `${chapter.title}\n`;
        content += "-".repeat(40) + "\n\n";
        content += chapterData.content + "\n\n";
      }
    }
    
    content += "\nReferences\n";
    content += "-".repeat(40) + "\n\n";
    const downloadRefs = usedReferences.length > 0 ? usedReferences : quasiData.references;
    for (const ref of downloadRefs) {
      content += ref.citation + "\n\n";
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dissertation-${format}-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ScrollArea className="flex-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800">
            AI Dissertation Generator
          </Badge>
          <h1 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Generate Academic Paper
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Transform your research content into a properly formatted dissertation
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Select value={format} onValueChange={(v) => setFormat(v as PaperFormat)}>
              <SelectTrigger className="w-60" data-testid="select-format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="proposal">Proposal (Chapters 1-3)</SelectItem>
                <SelectItem value="full">Full Dissertation (Chapters 1-6)</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={generateAllChapters}
              disabled={isGeneratingAll}
              className="bg-violet-600 gap-2"
              data-testid="button-generate-all"
            >
              {isGeneratingAll ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate All Chapters
                </>
              )}
            </Button>
          </div>
        </header>

        <Card className="mb-6 border-violet-200 dark:border-violet-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="font-sans text-lg">{quasiData.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{quasiData.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handlePrint} data-testid="button-print">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} data-testid="button-download">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-4 mb-10">
          {structure.map((chapter, index) => {
            const chapterData = chapters[chapter.id];
            const isExpanded = chapterData?.isExpanded ?? false;
            const isLoading = chapterData?.isLoading ?? false;
            const isGenerated = chapterData?.isGenerated ?? false;

            return (
              <Card key={chapter.id} className="overflow-visible" data-testid={`chapter-${chapter.id}`}>
                <CardHeader 
                  className="cursor-pointer hover-elevate"
                  onClick={() => isGenerated && toggleChapter(chapter.id)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="font-sans text-lg">{chapter.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{chapter.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isGenerated && !isLoading && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            generateChapter(chapter.id);
                          }}
                          data-testid={`button-generate-${chapter.id}`}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate
                        </Button>
                      )}
                      {isLoading && (
                        <Badge variant="secondary" className="bg-violet-500/10">
                          <Loader2 className="h-3 w-3 animate-spin mr-1" />
                          Generating...
                        </Badge>
                      )}
                      {isGenerated && (
                        <>
                          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">
                            Generated
                          </Badge>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {isExpanded && isGenerated && chapterData && (
                  <CardContent className="pt-0">
                    <Separator className="mb-6" />
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {chapterData.content.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        <Card className="mb-10">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="font-sans text-lg">References (APA 7th Edition)</CardTitle>
                  {hasGeneratedContent && (
                    <p className="text-sm text-muted-foreground">
                      {usedReferences.length > 0 
                        ? `${usedReferences.length} sources cited in generated chapters`
                        : "No citations detected in generated content"}
                    </p>
                  )}
                </div>
              </div>
              {hasGeneratedContent && usedReferences.length > 0 && (
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">
                  {usedReferences.length} / {quasiData.references.length} sources used
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(hasGeneratedContent && usedReferences.length > 0 ? usedReferences : quasiData.references).map((ref) => (
                <p 
                  key={ref.id} 
                  className={`leading-relaxed pl-8 -indent-8 ${
                    hasGeneratedContent && usedReferences.length > 0 
                      ? "text-foreground" 
                      : "text-muted-foreground"
                  }`}
                  data-testid={`reference-${ref.id}`}
                >
                  {ref.citation}
                </p>
              ))}
            </div>
            {hasGeneratedContent && usedReferences.length === 0 && (
              <p className="text-sm text-muted-foreground italic mt-4">
                Showing all available references. Generate chapters to see which sources are cited.
              </p>
            )}
          </CardContent>
        </Card>

        <footer className="text-center py-8 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            © Felix Abayomi 2026
          </p>
        </footer>
      </div>
    </ScrollArea>
  );
}
