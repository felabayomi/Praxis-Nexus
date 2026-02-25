import { useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Globe, ArrowLeft, Shield, MapPin, Users, Leaf, BookOpen, Handshake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sections = [
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Wildlife Protection",
    description: "Addressing urgent threats to Africa's iconic species through evidence-based conservation strategies and anti-poaching frameworks.",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Habitat Preservation",
    description: "Protecting critical ecosystems and wildlife corridors across the African continent to ensure biodiversity resilience.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Community Engagement",
    description: "Empowering local communities as custodians of wildlife through participatory conservation models and shared governance.",
  },
  {
    icon: <Handshake className="h-5 w-5" />,
    title: "Human–Wildlife Coexistence",
    description: "Developing practical approaches to reduce conflict between human communities and wildlife populations across diverse landscapes.",
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "Sustainable Livelihoods",
    description: "Creating economic opportunities that align conservation goals with the wellbeing and prosperity of local populations.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Research and Education",
    description: "Building knowledge through interdisciplinary research, capacity building, and educational outreach across African communities.",
  },
];

export default function WACI() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-orange-100/30 dark:from-gray-950 dark:to-gray-900">
      <header className="flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2"
            data-testid="button-back-hub"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Hub</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-500/10 mb-6">
              <Globe className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-3" data-testid="text-waci-title">
              Wildlife of Africa Conservation Initiative
            </h1>
            <p className="text-lg text-orange-700 dark:text-orange-400 font-serif italic mb-4">
              WACI — Protecting Africa's Biodiversity Heritage
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A conservation-focused initiative dedicated to understanding and addressing wildlife preservation challenges across the African continent through community-centred approaches.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <Card key={section.title} className="h-full" data-testid={`card-waci-${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
                      {section.icon}
                    </div>
                    <CardTitle className="font-serif text-lg">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center border-t border-border/50 pt-8">
            <p className="text-sm text-muted-foreground mb-2">Felix Abayomi</p>
            <p className="text-xs text-muted-foreground">EdD Candidate, Antioch University</p>
            <p className="text-xs text-muted-foreground mt-4">© Felix Abayomi 2026</p>
          </div>
        </div>
      </main>
    </div>
  );
}
