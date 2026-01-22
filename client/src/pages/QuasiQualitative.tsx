import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FlaskConical, ArrowRight, ArrowLeft, Lock, Mail, BookOpen, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ACCESS_CODE = "QUASI2026";
const REMEMBER_KEY = "praxis-nexus-quasi-remember";

export default function QuasiQualitative() {
  const [showAccessScreen, setShowAccessScreen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const isRemembered = typeof window !== 'undefined' && localStorage.getItem(REMEMBER_KEY) === "true";

  const handleEnterClick = () => {
    if (isRemembered) {
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
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/10 mb-6">
                <Sparkles className="h-10 w-10 text-violet-600 dark:text-violet-400" />
              </div>
              <Badge variant="secondary" className="mb-4">
                Coming Soon
              </Badge>
              <h1 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Quasi-Qualitative Project
              </h1>
              <h2 className="text-xl text-muted-foreground mb-6">
                Topic and Research Question Development
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This project space is being prepared. Content will be added soon with a unique layout designed specifically for exploring research methodology and question development.
              </p>
            </div>

            <Card className="text-left">
              <CardHeader>
                <CardTitle className="font-sans text-lg">What to Expect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">1</span>
                  </div>
                  <p className="text-sm text-muted-foreground">A completely different visual design from the EdD Inquiry journal</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">2</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Structured sections for developing research topics and questions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">3</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Interactive methodology exploration tools</p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Return to Project Hub
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <footer className="py-6 text-center border-t bg-background/80">
          <p className="text-xs text-muted-foreground">
            © Felix Abayomi 2026
          </p>
        </footer>
      </div>
    );
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
              <CardDescription>
                This project is protected. Enter your access code to continue.
              </CardDescription>
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
