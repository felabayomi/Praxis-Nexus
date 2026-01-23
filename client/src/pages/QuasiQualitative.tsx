import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FlaskConical, ArrowRight, ArrowLeft, Lock, Mail, 
  BookOpen, Microscope, Users, Database, BarChart, Shield, FileText,
  ChevronDown, ChevronUp, ExternalLink, HelpCircle
} from "lucide-react";
import { quasiData, QuasiSection, QuasiContentBlock } from "@/lib/quasiData";

const ACCESS_CODE = "QUASI2026";
const REMEMBER_KEY = "praxis-nexus-quasi-remember";

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="h-5 w-5" />,
  Microscope: <Microscope className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  BarChart: <BarChart className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
};

function ContentBlock({ block }: { block: QuasiContentBlock }) {
  if (block.type === "question") {
    return (
      <div className="mb-6 last:mb-0">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-violet-500/10 flex items-center justify-center mt-0.5">
            <HelpCircle className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
          </div>
          <p className="font-medium text-foreground">{block.question}</p>
        </div>
        <div className="pl-9">
          <p className="text-muted-foreground leading-relaxed">{block.content}</p>
        </div>
      </div>
    );
  }
  
  if (block.type === "paragraph") {
    return (
      <p className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
        {block.content}
      </p>
    );
  }

  return null;
}

function SectionCard({ section, isExpanded, onToggle }: { 
  section: QuasiSection; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const icon = iconMap[section.icon];

  return (
    <Card 
      className="overflow-hidden transition-all"
      data-testid={`section-${section.id}`}
    >
      <CardHeader 
        className="cursor-pointer hover-elevate"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
              {icon}
            </div>
            <CardTitle className="font-sans text-lg">{section.title}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <Separator className="mb-6" />
          {section.content.map((block) => (
            <ContentBlock key={block.id} block={block} />
          ))}
        </CardContent>
      )}
    </Card>
  );
}

function QuasiContent() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["theoretical-framework"]));
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSections(new Set(quasiData.sections.map(s => s.id)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-hub">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Hub</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-500/10">
              <FlaskConical className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="font-sans text-sm font-semibold hidden sm:inline" data-testid="text-project-name">
              Quasi-Qualitative
            </span>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <ScrollArea className="flex-1">
        <div ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <header className="text-center mb-10">
            <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800">
              Research Methodology
            </Badge>
            <h1 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {quasiData.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {quasiData.subtitle}
            </p>
            <p className="text-sm text-muted-foreground">
              {quasiData.author} · {quasiData.affiliation}
            </p>
          </header>

          <Card className="mb-8 border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/20 text-violet-600 dark:text-violet-400">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <CardTitle className="font-sans text-lg">Guiding Research Question</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground font-medium leading-relaxed mb-4 text-lg">
                {quasiData.researchQuestion.main}
              </p>
              <Separator className="my-4" />
              <p className="text-muted-foreground leading-relaxed">
                {quasiData.researchQuestion.overview}
              </p>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mb-6">
            <h2 className="font-sans text-xl font-semibold text-foreground">
              Study Components
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={expandAll} data-testid="button-expand-all">
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAll} data-testid="button-collapse-all">
                Collapse All
              </Button>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            {quasiData.sections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                isExpanded={expandedSections.has(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
          </div>

          <Card className="mb-10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle className="font-sans text-lg">References</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quasiData.references.map((ref) => (
                  <div key={ref.id} className="flex items-start gap-3">
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      {ref.citation}
                      {ref.url && (
                        <a 
                          href={ref.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 ml-2 text-violet-600 dark:text-violet-400 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <footer className="text-center py-8 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              © Felix Abayomi 2026
            </p>
          </footer>
        </div>
      </ScrollArea>
    </div>
  );
}

export default function QuasiQualitative() {
  const [hasAccess, setHasAccess] = useState(false);
  const [showAccessScreen, setShowAccessScreen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(REMEMBER_KEY) === "true") {
      setHasAccess(true);
    }
  }, []);

  const handleEnterClick = () => {
    if (typeof window !== 'undefined' && localStorage.getItem(REMEMBER_KEY) === "true") {
      setHasAccess(true);
      return;
    }
    setShowAccessScreen(true);
    setError("");
    setAccessCode("");
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === ACCESS_CODE) {
      if (rememberMe) {
        localStorage.setItem(REMEMBER_KEY, "true");
      }
      setHasAccess(true);
    } else {
      setError("Invalid access code. Please try again or request access.");
    }
  };

  const handleRequestAccess = () => {
    const subject = encodeURIComponent("Request for Quasi-Qualitative Project Access");
    const body = encodeURIComponent(
      `Dear Felix,\n\nI am writing to request access to your Quasi-Qualitative Project on Praxis Nexus.\n\nName: \nAffiliation: \nReason for access: \n\nThank you for considering my request.\n\nBest regards`
    );
    window.location.href = `mailto:praxinex@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleBack = () => {
    setShowAccessScreen(false);
    setError("");
    setAccessCode("");
  };

  if (hasAccess) {
    return <QuasiContent />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
      <header className="flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-hub">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Hub</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-500/10">
              <FlaskConical className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="font-sans text-sm font-semibold" data-testid="text-project-name">
              Quasi-Qualitative
            </span>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        {!showAccessScreen ? (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full text-sm font-medium">
                <FlaskConical className="h-4 w-4" />
                <span>Research Methodology</span>
              </div>
              
              <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground" data-testid="text-project-title">
                Quasi-Qualitative Project
              </h1>
              
              <h2 className="font-sans text-xl sm:text-2xl text-muted-foreground leading-relaxed" data-testid="text-project-subtitle">
                Topic and Research Question Development
              </h2>
            </div>

            <div className="pt-4">
              <p className="text-lg text-foreground font-sans" data-testid="text-author">
                Felix Abayomi
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                EdD Candidate, Antioch University
              </p>
            </div>

            <div className="pt-6">
              <Button 
                size="lg" 
                onClick={handleEnterClick}
                className="font-sans gap-2 bg-violet-600"
                data-testid="button-enter-project"
              >
                Enter Project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="pt-8 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                © Felix Abayomi 2026
              </p>
            </div>
          </div>
        ) : (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10">
                <Lock className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <CardTitle className="font-sans text-2xl">Access Required</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                This project is protected. Enter your access code to continue.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter access code"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                      setError("");
                    }}
                    className="text-center text-lg tracking-wider"
                    data-testid="input-access-code"
                  />
                  {error && (
                    <p className="text-sm text-destructive text-center" data-testid="text-error">
                      {error}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Checkbox 
                    id="remember-me" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    data-testid="checkbox-remember-me"
                  />
                  <Label 
                    htmlFor="remember-me" 
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Keep me signed in
                  </Label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full font-sans gap-2 bg-violet-600"
                  data-testid="button-submit-code"
                >
                  <Lock className="h-4 w-4" />
                  Access Project
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full font-sans gap-2"
                onClick={handleRequestAccess}
                data-testid="button-request-access"
              >
                <Mail className="h-4 w-4" />
                Request Access
              </Button>

              <Button 
                variant="ghost" 
                className="w-full font-sans gap-2 text-muted-foreground"
                onClick={handleBack}
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
