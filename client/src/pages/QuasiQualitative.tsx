import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FlaskConical, ArrowRight, ArrowLeft, Lock, Mail, 
  Brain, FileText
} from "lucide-react";
import { QuasiReasoningView } from "@/components/QuasiReasoningView";
import { QuasiPaperView } from "@/components/QuasiPaperView";
import { QuasiPresentationView } from "@/components/QuasiPresentationView";
import { QuasiSearchDialog } from "@/components/QuasiSearchDialog";

const ACCESS_CODE = "QUASI2026";
const REMEMBER_KEY = "praxis-nexus-quasi-remember";

type ViewMode = "reasoning" | "paper";

function QuasiContent() {
  const [viewMode, setViewMode] = useState<ViewMode>("reasoning");
  const [showPresentation, setShowPresentation] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (showPresentation) {
    return <QuasiPresentationView onClose={() => setShowPresentation(false)} />;
  }

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

        <div className="flex items-center gap-4">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
            <TabsList className="grid grid-cols-2 h-9">
              <TabsTrigger value="reasoning" className="gap-2 text-sm" data-testid="tab-reasoning">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Reasoning</span>
              </TabsTrigger>
              <TabsTrigger value="paper" className="gap-2 text-sm" data-testid="tab-paper">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Paper</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ThemeToggle />
        </div>
      </header>

      {viewMode === "reasoning" ? (
        <QuasiReasoningView 
          onOpenPresentation={() => setShowPresentation(true)}
          onOpenSearch={() => setShowSearch(true)}
        />
      ) : (
        <QuasiPaperView />
      )}

      <QuasiSearchDialog 
        open={showSearch} 
        onOpenChange={setShowSearch}
      />
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
