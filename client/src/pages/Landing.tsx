import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Leaf, ArrowRight, BookOpen } from "lucide-react";

interface LandingProps {
  onEnterJournal: () => void;
}

export default function Landing({ onEnterJournal }: LandingProps) {
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
              onClick={onEnterJournal}
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
      </main>
    </div>
  );
}
