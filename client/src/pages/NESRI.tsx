import { useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Trees, ArrowLeft, BookOpen, Scale, Sprout, Heart, Globe, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sections = [
  {
    icon: <Scale className="h-5 w-5" />,
    title: "Environmental Ethics",
    description: "Examining moral obligations toward ecosystems, species, and the natural world through philosophical and applied ethical frameworks.",
  },
  {
    icon: <Sprout className="h-5 w-5" />,
    title: "Ecological Stewardship",
    description: "Exploring responsible guardianship of natural resources, emphasising intergenerational equity and sustainable practices.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Human–Nature Relationships",
    description: "Investigating the interconnections between human communities and natural environments, including indigenous perspectives and place-based knowledge.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Environmental Justice",
    description: "Addressing the equitable distribution of environmental benefits and burdens across communities, cultures, and geographies.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Community-Centred Conservation",
    description: "Prioritising local knowledge, participatory governance, and community-driven approaches to environmental protection.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Research and Scholarship",
    description: "Advancing interdisciplinary research at the intersection of ethics, ecology, education, and technology.",
  },
];

export default function NESRI() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100/30 dark:from-gray-950 dark:to-gray-900">
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
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-amber-500/10 mb-6">
              <Trees className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-3" data-testid="text-nesri-title">
              Nature Ethics Research Institute
            </h1>
            <p className="text-lg text-amber-700 dark:text-amber-400 font-serif italic mb-4">
              NESRI — Ethical Frameworks for Environmental Stewardship
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A research initiative exploring the ethical dimensions of human–nature relationships, environmental justice, and responsible stewardship of ecological systems.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <Card key={section.title} className="h-full" data-testid={`card-nesri-${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
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
