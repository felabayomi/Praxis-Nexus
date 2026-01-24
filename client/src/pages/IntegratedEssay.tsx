import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EssaySearchDialog } from "@/components/EssaySearchDialog";
import { SimpleTTS } from "@/components/SimpleTTS";
import { AuthorModal } from "@/components/AuthorModal";
import { EssayAudioPlayer } from "@/components/EssayAudioPlayer";
import { EssayPresentationView } from "@/components/EssayPresentationView";
import { 
  ArrowLeft, 
  BookOpen, 
  Lock, 
  FileText,
  ChevronDown,
  ChevronUp,
  Printer,
  Download,
  Search,
  Type,
  Plus,
  Minus,
  Sparkles,
  Loader2,
  Check,
  PenTool,
  Clock,
  Presentation,
  Headphones
} from "lucide-react";
import { integratedEssayData, getSectionReadingTime, getTotalReadingTime, type EssaySection } from "@/lib/integratedEssayData";
import { apiRequest } from "@/lib/queryClient";
import { ShareExportControls } from "@/components/ShareExportControls";

const ACCESS_CODE = "ESSAY2026";
const STORAGE_KEY = "integrated_essay_access";

interface SectionContent {
  title: string;
  content: string;
  isGenerated: boolean;
  isLoading: boolean;
  isExpanded: boolean;
  usedCitationIds: string[];
}

function getReferencesForApi() {
  return integratedEssayData.references.map(ref => ({
    id: ref.id,
    citation: ref.citation,
  }));
}

export default function IntegratedEssay() {
  const [hasAccess, setHasAccess] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [accessCode, setAccessCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [sections, setSections] = useState<Record<string, SectionContent>>({});
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authorModalOpen, setAuthorModalOpen] = useState(false);
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [presentationSection, setPresentationSection] = useState<EssaySection | undefined>(undefined);
  const [activeView, setActiveView] = useState<"essay" | "generator">("essay");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const allUsedCitationIds = Object.values(sections)
    .filter(s => s.isGenerated && s.usedCitationIds)
    .flatMap(s => s.usedCitationIds);
  const uniqueCitationIds = Array.from(new Set(allUsedCitationIds));
  const usedReferences = integratedEssayData.references.filter(ref => uniqueCitationIds.includes(ref.id));
  const hasGeneratedContent = Object.values(sections).some(s => s.isGenerated);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "true") {
      setHasAccess(true);
      setShowLanding(false);
    }
    const savedFontSize = localStorage.getItem("essay_font_size");
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getEssayText = useCallback(() => {
    let text = `${integratedEssayData.title}. ${integratedEssayData.overview}. `;
    for (const section of integratedEssayData.sections) {
      text += `${section.title}. ${section.description}. `;
      const sectionData = sections[section.id];
      if (sectionData?.isGenerated && sectionData.content) {
        text += sectionData.content + ". ";
      }
    }
    return text;
  }, [sections]);

  const handleAccessSubmit = () => {
    if (accessCode === ACCESS_CODE) {
      setHasAccess(true);
      setShowLanding(false);
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY, "true");
      }
    } else {
      setCodeError(true);
    }
  };

  const handleFontSizeChange = (delta: number) => {
    const newSize = Math.min(20, Math.max(14, fontSize + delta));
    setFontSize(newSize);
    localStorage.setItem("essay_font_size", newSize.toString());
  };

  const openSectionPresentation = (section: EssaySection) => {
    setPresentationSection(section);
    setPresentationOpen(true);
  };

  const openFullPresentation = () => {
    setPresentationSection(undefined);
    setPresentationOpen(true);
  };

  const toggleEssaySection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const totalReadingTime = getTotalReadingTime();

  const generateSection = async (sectionId: string) => {
    const sectionInfo = integratedEssayData.sections.find(s => s.id === sectionId);
    if (!sectionInfo) return;

    setSections(prev => ({
      ...prev,
      [sectionId]: {
        title: sectionInfo.title,
        content: "",
        isLoading: true,
        isGenerated: false,
        isExpanded: true,
        usedCitationIds: [],
      },
    }));

    try {
      const response = await apiRequest("POST", "/api/essay/generate-section", {
        sectionId,
        sectionTitle: sectionInfo.title,
        sectionDescription: sectionInfo.description,
        promptGuidance: sectionInfo.promptGuidance,
        dissertationTitle: integratedEssayData.dissertationTitle,
        references: getReferencesForApi(),
      });

      const data = await response.json();
      
      setSections(prev => ({
        ...prev,
        [sectionId]: {
          title: sectionInfo.title,
          content: data.content,
          isLoading: false,
          isGenerated: true,
          isExpanded: true,
          usedCitationIds: data.usedCitationIds || [],
        },
      }));
    } catch (error) {
      setSections(prev => ({
        ...prev,
        [sectionId]: {
          title: sectionInfo.title,
          content: "Failed to generate section. Please try again.",
          isLoading: false,
          isGenerated: false,
          isExpanded: true,
          usedCitationIds: [],
        },
      }));
    }
  };

  const generateAllSections = async () => {
    setIsGeneratingAll(true);
    for (const section of integratedEssayData.sections) {
      await generateSection(section.id);
    }
    setIsGeneratingAll(false);
  };

  const toggleSection = (sectionId: string) => {
    setSections(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        isExpanded: !prev[sectionId]?.isExpanded,
      },
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    let content = `${integratedEssayData.title}\n`;
    content += `${integratedEssayData.subtitle}\n`;
    content += `By ${integratedEssayData.author}\n`;
    content += `${integratedEssayData.affiliation}\n\n`;
    content += "=".repeat(50) + "\n\n";

    for (const section of integratedEssayData.sections) {
      const sectionData = sections[section.id];
      if (sectionData?.isGenerated) {
        content += `${section.title}\n`;
        content += "-".repeat(40) + "\n\n";
        content += sectionData.content + "\n\n";
      }
    }

    content += "\nReferences\n";
    content += "-".repeat(40) + "\n\n";
    const downloadRefs = usedReferences.length > 0 ? usedReferences : integratedEssayData.references;
    for (const ref of downloadRefs) {
      content += ref.citation + "\n\n";
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "integrated_essay.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (showLanding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-950 via-slate-900 to-emerald-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-teal-500/20 bg-slate-900/80 backdrop-blur">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10">
                <PenTool className="h-8 w-8 text-teal-400" />
              </div>
              <div>
                <CardTitle className="text-2xl font-serif text-white">{integratedEssayData.title}</CardTitle>
                <CardDescription className="text-teal-200/70">{integratedEssayData.subtitle}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!hasAccess ? (
                <>
                  <p className="text-sm text-center text-teal-200/60">
                    Enter the access code to view this essay
                  </p>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-400/50" />
                    <Input
                      type="password"
                      placeholder="Access Code"
                      value={accessCode}
                      onChange={(e) => {
                        setAccessCode(e.target.value);
                        setCodeError(false);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleAccessSubmit()}
                      className={`pl-10 bg-slate-800/50 border-teal-500/30 text-white placeholder:text-teal-300/40 ${codeError ? "border-red-500" : ""}`}
                      data-testid="input-access-code"
                    />
                  </div>
                  {codeError && (
                    <p className="text-sm text-red-400 text-center">Invalid access code</p>
                  )}
                  <label className="flex items-center gap-2 text-sm text-teal-200/60 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-teal-500/30"
                    />
                    Keep me signed in
                  </label>
                  <Button 
                    onClick={handleAccessSubmit} 
                    className="w-full bg-teal-600"
                    data-testid="button-submit-code"
                  >
                    Access Essay
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setShowLanding(false)} 
                  className="w-full bg-teal-600"
                  data-testid="button-enter-project"
                >
                  Enter Essay
                </Button>
              )}
              <div className="pt-4 border-t border-teal-500/20">
                <Link href="/">
                  <Button variant="ghost" className="w-full text-teal-300">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Hub
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-to-hub">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Hub
              </Button>
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <PenTool className="h-5 w-5 text-teal-600" />
              <span className="font-serif font-semibold text-teal-900 dark:text-teal-100">
                {integratedEssayData.title}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border rounded-md px-2 py-1">
              <Button variant="ghost" size="sm" onClick={() => handleFontSizeChange(-1)} data-testid="button-font-decrease">
                <Minus className="h-3 w-3" />
              </Button>
              <Type className="h-4 w-4 text-muted-foreground" />
              <Button variant="ghost" size="sm" onClick={() => handleFontSizeChange(1)} data-testid="button-font-increase">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <SimpleTTS getText={getEssayText} />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" title="AI Audio (CarPlay compatible)" data-testid="button-ai-audio">
                  <Headphones className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-serif">AI Audio Narration</DialogTitle>
                  <DialogDescription>
                    Generate AI-narrated audio for this essay content.
                  </DialogDescription>
                </DialogHeader>
                <EssayAudioPlayer sectionId="essay" />
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" onClick={openFullPresentation} title="Presentation Mode" data-testid="button-presentation">
              <Presentation className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} data-testid="button-search">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handlePrint} data-testid="button-print">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDownload} data-testid="button-download">
              <Download className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-4xl" style={{ fontSize: `${fontSize}px` }}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10">
              <PenTool className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-teal-900 dark:text-teal-100 mb-2">
            {integratedEssayData.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-2">{integratedEssayData.subtitle}</p>
          <p className="text-sm text-muted-foreground mb-2">
            {integratedEssayData.author} • {integratedEssayData.affiliation}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{totalReadingTime} min read</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed mb-4">{integratedEssayData.overview}</p>
            <div className="bg-teal-50 dark:bg-teal-950/30 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
              <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">Dissertation Focus</h4>
              <p className="text-teal-800 dark:text-teal-200 italic">"{integratedEssayData.dissertationTitle}"</p>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "essay" | "generator")} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="essay" data-testid="tab-essay-view">
              <FileText className="mr-2 h-4 w-4" />
              Essay View
            </TabsTrigger>
            <TabsTrigger value="generator" data-testid="tab-generator-view">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Generator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="essay" className="mt-6">
            <div className="space-y-4">
              {integratedEssayData.sections.map((section, index) => {
                const isExpanded = expandedSections[section.id] ?? true;
                const readingTime = getSectionReadingTime(section);

                return (
                  <Card key={section.id} className="overflow-hidden">
                    <CardHeader 
                      className="cursor-pointer hover-elevate py-4"
                      onClick={() => toggleEssaySection(section.id)}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <CardTitle className="text-base font-serif">{section.title}</CardTitle>
                            <CardDescription className="text-sm flex items-center gap-2">
                              {section.description}
                              {readingTime > 0 && (
                                <span className="flex items-center gap-1 text-xs">
                                  <Clock className="h-3 w-3" />
                                  {readingTime} min
                                </span>
                              )}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {section.pageLength && (
                            <Badge variant="secondary" className="text-xs">{section.pageLength}</Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); openSectionPresentation(section); }}
                            title="Present Section"
                            data-testid={`button-present-${section.id}`}
                          >
                            <Presentation className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    {isExpanded && section.content && (
                      <CardContent className="pt-0">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          {section.content.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="text-foreground leading-relaxed mb-4">{paragraph}</p>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="generator" className="mt-6">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="font-serif">AI Section Generator</CardTitle>
                      <CardDescription>Generate AI-enhanced academic writing for each section</CardDescription>
                    </div>
                  </div>
                  <Button
                    onClick={generateAllSections}
                    disabled={isGeneratingAll}
                    className="bg-teal-600"
                    data-testid="button-generate-all"
                  >
                    {isGeneratingAll ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate All Sections
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {integratedEssayData.sections.map((section, index) => {
                const sectionData = sections[section.id];
                const isLoading = sectionData?.isLoading;
                const isGenerated = sectionData?.isGenerated;
                const isExpanded = sectionData?.isExpanded ?? false;

                return (
                  <Card key={section.id} className={`overflow-hidden ${isGenerated ? "border-teal-500/30" : ""}`}>
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <CardTitle className="text-base font-serif">{section.title}</CardTitle>
                            <CardDescription className="text-sm">{section.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isGenerated && (
                            <Badge variant="secondary" className="bg-teal-500/10 text-teal-600">
                              <Check className="mr-1 h-3 w-3" />
                              Generated
                            </Badge>
                          )}
                          {!isGenerated && !isLoading && (
                            <Button
                              size="sm"
                              onClick={() => generateSection(section.id)}
                              className="bg-teal-600"
                              data-testid={`button-generate-${section.id}`}
                            >
                              <Sparkles className="mr-2 h-3 w-3" />
                              Generate
                            </Button>
                          )}
                          {isLoading && (
                            <Button size="sm" disabled>
                              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                              Generating...
                            </Button>
                          )}
                          {isGenerated && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleSection(section.id)}
                            >
                              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    {isGenerated && isExpanded && (
                      <CardContent className="pt-0">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          {sectionData.content.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="text-foreground leading-relaxed mb-4">{paragraph}</p>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 mb-10">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="font-serif">References (APA 7th Edition)</CardTitle>
                  {hasGeneratedContent && (
                    <p className="text-sm text-muted-foreground">
                      {usedReferences.length > 0 
                        ? `${usedReferences.length} sources cited in generated sections`
                        : "No citations detected in generated content"}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasGeneratedContent && usedReferences.length > 0 && (
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">
                    {usedReferences.length} / {integratedEssayData.references.length} sources used
                  </Badge>
                )}
                <ShareExportControls 
                  type="references"
                  project="integrated-essay"
                  title="Integrated Essay References"
                  content={hasGeneratedContent && usedReferences.length > 0 ? usedReferences : integratedEssayData.references}
                  variant="icon"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(hasGeneratedContent && usedReferences.length > 0 ? usedReferences : integratedEssayData.references).map((ref) => (
                <p 
                  key={ref.id} 
                  className={`leading-relaxed pl-8 -indent-8 ${
                    hasGeneratedContent && usedReferences.length > 0 
                      ? "text-foreground" 
                      : "text-muted-foreground"
                  }`}
                >
                  {ref.citation}
                  {ref.url && (
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 ml-1 hover:underline">
                      {ref.url}
                    </a>
                  )}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <footer className="text-center py-8 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            © <button onClick={() => setAuthorModalOpen(true)} className="hover:underline cursor-pointer" data-testid="button-author">Felix Abayomi</button> 2026
          </p>
        </footer>
      </main>

      <EssaySearchDialog open={searchOpen} onOpenChange={setSearchOpen} generatedSections={sections} />
      <AuthorModal open={authorModalOpen} onOpenChange={setAuthorModalOpen} />
      <EssayPresentationView 
        open={presentationOpen} 
        onClose={() => setPresentationOpen(false)} 
        section={presentationSection}
      />
    </div>
  );
}
