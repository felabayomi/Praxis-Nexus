import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Leaf, ArrowRight, BookOpen, Lock, Mail, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LandingProps {
  onEnterJournal: (rememberMe: boolean) => void;
}

const ACCESS_CODE = "150920";
const JOURNAL_REMEMBER_KEY = "praxis-nexus-remember-access";

export default function Landing({ onEnterJournal }: LandingProps) {
  const [showAccessScreen, setShowAccessScreen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Check if user is already remembered
  const isRemembered = localStorage.getItem(JOURNAL_REMEMBER_KEY) === "true";

  const handleEnterClick = () => {
    // If already remembered, skip the access screen
    if (isRemembered) {
      onEnterJournal(true);
      return;
    }
    setShowAccessScreen(true);
    setError("");
    setAccessCode("");
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === ACCESS_CODE) {
      onEnterJournal(rememberMe);
    } else {
      setError("Invalid access code. Please try again or request access.");
    }
  };

  const handleRequestAccess = () => {
    const subject = encodeURIComponent("Request for Praxis Nexus Access Code");
    const body = encodeURIComponent(
      `Dear Felix,\n\nI am writing to request access to your Praxis Nexus academic inquiry journal.\n\nName: \nAffiliation: \nReason for access: \n\nThank you for considering my request.\n\nBest regards`
    );
    window.location.href = `mailto:praxinex@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleBack = () => {
    setShowAccessScreen(false);
    setError("");
    setAccessCode("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <Leaf className="h-4 w-4 text-primary" />
          </div>
          <span className="font-serif text-sm font-semibold" data-testid="text-app-name">
            Praxis Nexus
          </span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        {!showAccessScreen ? (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex flex-col items-center gap-1 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Academic Inquiry Journal</span>
                </div>
                <span className="text-xs opacity-80">EdD AI Cohort Inquiry Journal</span>
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground" data-testid="text-inquiry-title">
                EdD Inquiry on AI's Ecological and Economic Entanglements
              </h1>
              
              <h2 className="font-serif text-xl sm:text-2xl text-muted-foreground leading-relaxed" data-testid="text-personal-inquiry">
                Personal Inquiry: AI, Conservation, and the Reconfiguration of Human–Wildlife Relations
              </h2>
            </div>

            <div className="pt-4">
              <p className="text-lg text-foreground font-serif" data-testid="text-author">
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
                className="font-serif gap-2"
                data-testid="button-enter-journal"
              >
                Enter Journal
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
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-serif text-2xl">Access Required</CardTitle>
              <CardDescription>
                This journal is protected. Enter your access code to continue.
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
                  className="w-full font-serif gap-2"
                  data-testid="button-submit-code"
                >
                  <Lock className="h-4 w-4" />
                  Access Journal
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
                className="w-full font-serif gap-2"
                onClick={handleRequestAccess}
                data-testid="button-request-access"
              >
                <Mail className="h-4 w-4" />
                Request Access
              </Button>

              <Button 
                variant="ghost" 
                className="w-full font-serif gap-2 text-muted-foreground"
                onClick={handleBack}
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Landing
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
