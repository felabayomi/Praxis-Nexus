import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PortfolioSearchDialog } from "@/components/PortfolioSearchDialog";
import { SimpleTTS } from "@/components/SimpleTTS";
import { PortfolioAIAudio } from "@/components/PortfolioAIAudio";
import { PortfolioPresentationView } from "@/components/PortfolioPresentationView";
import { AuthorModal } from "@/components/AuthorModal";
import { 
  ArrowLeft, 
  BookOpen, 
  Wrench, 
  User, 
  Lock, 
  FolderOpen,
  FileText,
  ChevronDown,
  ChevronUp,
  Printer,
  Download,
  Search,
  Type,
  Plus,
  Minus,
  Folder,
  Clock,
  Presentation,
  Headphones,
  Sparkles,
  Loader2
} from "lucide-react";
import { portfolioData, getStrandReadingTime, getTotalReadingTime, type PortfolioStrand } from "@/lib/portfolioData";

const ACCESS_CODE = "PORTFOLIO2026";
const STORAGE_KEY = "portfolio_access";

function getStrandIcon(icon: string) {
  switch (icon) {
    case "BookOpen": return BookOpen;
    case "Wrench": return Wrench;
    case "User": return User;
    default: return FileText;
  }
}

function getStrandColor(color: string) {
  switch (color) {
    case "blue": return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "emerald": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "violet": return "bg-violet-500/10 text-violet-600 dark:text-violet-400";
    default: return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
  }
}

function getStrandBorder(color: string) {
  switch (color) {
    case "blue": return "border-l-blue-500";
    case "emerald": return "border-l-emerald-500";
    case "violet": return "border-l-violet-500";
    default: return "border-l-gray-500";
  }
}

export default function Portfolio() {
  const [hasAccess, setHasAccess] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [accessCode, setAccessCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeView, setActiveView] = useState<"portfolio" | "paper">("portfolio");
  const [expandedStrands, setExpandedStrands] = useState<Record<string, boolean>>({
    knowledge: true,
    practice: true,
    "self-in-context": true
  });
  const [expandedArtifacts, setExpandedArtifacts] = useState<Record<string, boolean>>({});
  const [fontSize, setFontSize] = useState(16);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authorModalOpen, setAuthorModalOpen] = useState(false);
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [presentationStrand, setPresentationStrand] = useState<PortfolioStrand | undefined>(undefined);
  const [generatingSynthesis, setGeneratingSynthesis] = useState<string | null>(null);
  const [generatedSyntheses, setGeneratedSyntheses] = useState<Record<string, { content: string; usedCitationIds: string[] }>>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "true") {
      setHasAccess(true);
      setShowLanding(false);
    }
    const savedFontSize = localStorage.getItem("portfolio_font_size");
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

  const getPortfolioText = useCallback(() => {
    let text = `${portfolioData.title}. ${portfolioData.overview}. `;
    for (const strand of portfolioData.strands) {
      text += `${strand.title}. ${strand.description}. `;
      for (const artifact of strand.artifacts) {
        text += `${artifact.title}. ${artifact.reflection}. `;
      }
    }
    return text;
  }, []);

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
    localStorage.setItem("portfolio_font_size", newSize.toString());
  };

  const toggleStrand = (strandId: string) => {
    setExpandedStrands(prev => ({ ...prev, [strandId]: !prev[strandId] }));
  };

  const toggleArtifact = (artifactId: string) => {
    setExpandedArtifacts(prev => ({ ...prev, [artifactId]: !prev[artifactId] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    let content = `${portfolioData.title}\n`;
    content += `${portfolioData.subtitle}\n`;
    content += `By ${portfolioData.author}\n`;
    content += `${portfolioData.affiliation}\n\n`;
    content += "=".repeat(50) + "\n\n";
    content += `Overview\n${portfolioData.overview}\n\n`;

    for (const strand of portfolioData.strands) {
      content += "=".repeat(50) + "\n";
      content += `${strand.title}\n`;
      content += `${strand.description}\n\n`;
      
      if (generatedSyntheses[strand.id]) {
        content += `AI-Generated Synthesis:\n${generatedSyntheses[strand.id].content}\n\n`;
      }
      
      for (const artifact of strand.artifacts) {
        content += `-`.repeat(30) + "\n";
        content += `${artifact.title}\n`;
        content += `${artifact.description}\n\n`;
        content += `Reflection:\n${artifact.reflection}\n\n`;
      }
    }

    content += "=".repeat(50) + "\n";
    content += "References\n\n";
    for (const ref of portfolioData.references) {
      content += `${ref.citation}\n\n`;
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "doctoral_portfolio.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateStrandSynthesis = async (strand: PortfolioStrand) => {
    setGeneratingSynthesis(strand.id);
    try {
      const response = await fetch("/api/portfolio/generate-synthesis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          strandId: strand.id,
          strandTitle: strand.title,
          strandReflection: strand.strandReflection,
          artifacts: strand.artifacts,
          learningOutcomes: strand.learningOutcomes,
          references: portfolioData.references,
          dissertationTitle: portfolioData.dissertationTitle
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate synthesis");
      }

      const data = await response.json();
      setGeneratedSyntheses(prev => ({
        ...prev,
        [strand.id]: { content: data.content, usedCitationIds: data.usedCitationIds }
      }));
    } catch (error) {
      console.error("Error generating synthesis:", error);
    } finally {
      setGeneratingSynthesis(null);
    }
  };

  const openStrandPresentation = (strand: PortfolioStrand) => {
    setPresentationStrand(strand);
    setPresentationOpen(true);
  };

  const totalReadingTime = getTotalReadingTime();

  if (showLanding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-blue-500/20 bg-slate-900/80 backdrop-blur">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                <FolderOpen className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-2xl font-serif text-white">{portfolioData.title}</CardTitle>
                <CardDescription className="text-blue-200/70">{portfolioData.subtitle}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!hasAccess ? (
                <>
                  <p className="text-sm text-center text-blue-200/60">
                    Enter the access code to view this portfolio
                  </p>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400/50" />
                    <Input
                      type="password"
                      placeholder="Access Code"
                      value={accessCode}
                      onChange={(e) => {
                        setAccessCode(e.target.value);
                        setCodeError(false);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleAccessSubmit()}
                      className={`pl-10 bg-slate-800/50 border-blue-500/30 text-white placeholder:text-blue-300/40 ${codeError ? "border-red-500" : ""}`}
                      data-testid="input-access-code"
                    />
                  </div>
                  {codeError && (
                    <p className="text-sm text-red-400 text-center">Invalid access code</p>
                  )}
                  <label className="flex items-center gap-2 text-sm text-blue-200/60 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-blue-500/30"
                    />
                    Keep me signed in
                  </label>
                  <Button 
                    onClick={handleAccessSubmit} 
                    className="w-full bg-blue-600"
                    data-testid="button-submit-code"
                  >
                    Access Portfolio
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setShowLanding(false)} 
                  className="w-full bg-blue-600"
                  data-testid="button-enter-project"
                >
                  Enter Portfolio
                </Button>
              )}
              <div className="pt-4 border-t border-blue-500/20">
                <Link href="/">
                  <Button variant="ghost" className="w-full text-blue-300">
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
              <FolderOpen className="h-5 w-5 text-blue-600" />
              <span className="font-serif font-semibold text-blue-900 dark:text-blue-100">
                {portfolioData.title}
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
            <SimpleTTS getText={getPortfolioText} />
            <PortfolioAIAudio getText={getPortfolioText} sectionId="portfolio" />
            <Button variant="ghost" size="icon" onClick={() => { setPresentationStrand(undefined); setPresentationOpen(true); }} title="Presentation Mode" data-testid="button-presentation">
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
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
              <FolderOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-blue-900 dark:text-blue-100 mb-2">
            {portfolioData.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">{portfolioData.subtitle}</p>
          <p className="text-sm text-muted-foreground mb-2">
            {portfolioData.author} • {portfolioData.affiliation}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>~{totalReadingTime} min read</span>
          </div>
        </div>

        <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "portfolio" | "paper")} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="portfolio" data-testid="tab-portfolio">
              <FolderOpen className="mr-2 h-4 w-4" />
              Portfolio View
            </TabsTrigger>
            <TabsTrigger value="paper" data-testid="tab-paper">
              <Sparkles className="mr-2 h-4 w-4" />
              Paper View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="mt-6">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">{portfolioData.overview}</p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {portfolioData.strands.map((strand) => {
                const Icon = getStrandIcon(strand.icon);
                const isExpanded = expandedStrands[strand.id];
                const strandReadingTime = getStrandReadingTime(strand);
                
                return (
                  <Card key={strand.id} className={`border-l-4 ${getStrandBorder(strand.color)}`}>
                    <CardHeader 
                      className="cursor-pointer hover-elevate"
                      onClick={() => toggleStrand(strand.id)}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getStrandColor(strand.color)}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="font-serif">{strand.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              {strand.description}
                              <span className="flex items-center gap-1 text-xs">
                                <Clock className="h-3 w-3" />
                                {strandReadingTime} min
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => { e.stopPropagation(); openStrandPresentation(strand); }}
                            title="Present Strand"
                            data-testid={`button-present-${strand.id}`}
                          >
                            <Presentation className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                
                    {isExpanded && (
                      <CardContent className="space-y-4">
                        {strand.artifacts.map((artifact) => {
                          const isArtifactExpanded = expandedArtifacts[artifact.id];
                          
                          return (
                            <Card key={artifact.id} className="bg-muted/30">
                              <CardHeader 
                                className="cursor-pointer py-4"
                                onClick={() => toggleArtifact(artifact.id)}
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                      <CardTitle className="text-base">{artifact.title}</CardTitle>
                                      <CardDescription className="text-sm">{artifact.description}</CardDescription>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="capitalize">{artifact.type}</Badge>
                                    {isArtifactExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                  </div>
                                </div>
                              </CardHeader>
                              
                              {isArtifactExpanded && (
                                <CardContent className="pt-0">
                                  <div className="bg-background rounded-lg p-4 border">
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Reflection</h4>
                                    <p className="text-foreground leading-relaxed">{artifact.reflection}</p>
                                  </div>
                                </CardContent>
                              )}
                            </Card>
                          );
                        })}
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Folder className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="font-serif">{portfolioData.appendix.title}</CardTitle>
                    <CardDescription>{portfolioData.appendix.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {portfolioData.appendix.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paper" className="mt-6">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Sparkles className="h-12 w-12 mx-auto text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-serif font-semibold">AI Strand Synthesis Generator</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Generate formal academic syntheses for each doctoral learning strand. The AI transforms your reflections and artifacts into structured scholarly writing with proper citations from your reference list.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {portfolioData.strands.map((strand) => {
                const Icon = getStrandIcon(strand.icon);
                const synthesis = generatedSyntheses[strand.id];
                const isGenerating = generatingSynthesis === strand.id;
                
                return (
                  <Card key={strand.id} className={`border-l-4 ${getStrandBorder(strand.color)}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getStrandColor(strand.color)}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="font-serif">{strand.title}</CardTitle>
                            <CardDescription>{strand.purpose}</CardDescription>
                          </div>
                        </div>
                        <Button
                          onClick={() => generateStrandSynthesis(strand)}
                          disabled={isGenerating}
                          data-testid={`button-generate-${strand.id}`}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating...
                            </>
                          ) : synthesis ? (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Regenerate
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Generate Synthesis
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    
                    {synthesis && (
                      <CardContent>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <div className="bg-muted/30 rounded-lg p-6 whitespace-pre-wrap leading-relaxed">
                            {synthesis.content}
                          </div>
                          {synthesis.usedCitationIds.length > 0 && (
                            <div className="mt-4 pt-4 border-t">
                              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                                Sources Cited ({synthesis.usedCitationIds.length})
                              </h4>
                              <div className="space-y-2">
                                {portfolioData.references
                                  .filter(ref => synthesis.usedCitationIds.includes(ref.id))
                                  .map(ref => (
                                    <p key={ref.id} className="text-xs text-muted-foreground pl-4 -indent-4">
                                      {ref.citation}
                                    </p>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-serif">Reference List (APA 7th Edition)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolioData.references.map((ref) => (
                    <p key={ref.id} className="text-sm text-muted-foreground leading-relaxed pl-6 -indent-6">
                      {ref.citation}
                      {ref.url && (
                        <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 ml-1 hover:underline">
                          {ref.url}
                        </a>
                      )}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="text-center py-8 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            © <button onClick={() => setAuthorModalOpen(true)} className="hover:underline cursor-pointer" data-testid="button-author">Felix Abayomi</button> 2026
          </p>
        </footer>
      </main>

      <PortfolioSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <AuthorModal open={authorModalOpen} onOpenChange={setAuthorModalOpen} />
      <PortfolioPresentationView 
        open={presentationOpen} 
        onClose={() => setPresentationOpen(false)} 
        strand={presentationStrand}
      />
    </div>
  );
}
