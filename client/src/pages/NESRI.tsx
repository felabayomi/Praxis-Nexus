import { useState } from "react";
import { useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Trees, ArrowLeft, BookOpen, Scale, Sprout, Heart, Globe, Users,
  Lightbulb, GraduationCap, Feather, Mail, ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ContentEntry {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  badge: string;
  badgeColor: string;
  component: () => JSX.Element;
}

function FoundingVision() {
  const researchAreas = [
    { icon: <Scale className="h-5 w-5" />, title: "Environmental Ethics", description: "Examining moral obligations toward ecosystems, species, and the natural world through philosophical and applied ethical frameworks." },
    { icon: <Sprout className="h-5 w-5" />, title: "Ecological Stewardship", description: "Exploring responsible guardianship of natural resources, emphasising intergenerational equity and sustainable practices." },
    { icon: <Heart className="h-5 w-5" />, title: "Human\u2013Nature Relationships", description: "Investigating the interconnections between human communities and natural environments, including indigenous perspectives and place-based knowledge." },
    { icon: <Globe className="h-5 w-5" />, title: "Environmental Justice", description: "Addressing the equitable distribution of environmental benefits and burdens across communities, cultures, and geographies." },
    { icon: <Users className="h-5 w-5" />, title: "Community-Centred Conservation", description: "Prioritising local knowledge, participatory governance, and community-driven approaches to environmental protection." },
    { icon: <BookOpen className="h-5 w-5" />, title: "Research and Scholarship", description: "Advancing interdisciplinary research at the intersection of ethics, ecology, education, and technology." },
  ];

  const principles = [
    { icon: <Lightbulb className="h-5 w-5" />, title: "Ethical Inquiry", text: "Every intervention in natural systems carries moral weight. NESRI centres ethical reasoning in all research and practice." },
    { icon: <Heart className="h-5 w-5" />, title: "Relational Responsibility", text: "Humans are not separate from nature. We hold a duty of care rooted in interconnection, reciprocity, and respect." },
    { icon: <Users className="h-5 w-5" />, title: "Inclusive Voices", text: "Environmental ethics must include indigenous, local, and marginalised perspectives often excluded from mainstream discourse." },
    { icon: <Feather className="h-5 w-5" />, title: "Gentle Scholarship", text: "Rigorous inquiry does not require aggression. NESRI promotes thoughtful, patient, and compassionate approaches to knowledge." },
  ];

  return (
    <div className="space-y-0">
      <section className="px-4 sm:px-6 py-12 bg-amber-500/5 dark:bg-amber-950/20 border-y border-amber-200/50 dark:border-amber-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-amber-600 mb-4">Our Mission</Badge>
              <p className="text-lg font-serif leading-relaxed text-foreground">
                To advance ethical thinking about the natural world through interdisciplinary research, education, and community-centred scholarship.
              </p>
            </div>
            <div>
              <Badge className="bg-amber-600 mb-4">Our Vision</Badge>
              <p className="text-lg font-serif leading-relaxed text-foreground">
                A world where environmental decisions are guided by ethical responsibility, ecological wisdom, and respect for all living systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium mb-4">
              <GraduationCap className="h-4 w-4" />
              <span>Guiding Principles</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">What Guides Us</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">The values and commitments that shape every aspect of NESRI's work.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((principle) => (
              <Card key={principle.title} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      {principle.icon}
                    </div>
                    <CardTitle className="font-serif text-base">{principle.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{principle.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4" />
              <span>Research Areas</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">Areas of Focus</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Exploring the ethical questions that emerge at the intersection of ecology, justice, and human responsibility.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area) => (
              <Card key={area.title} className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      {area.icon}
                    </div>
                    <CardTitle className="font-serif text-base">{area.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Ethics is not a constraint on conservation. It is the foundation.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            NESRI invites scholars, practitioners, and communities to engage with the difficult, necessary questions about how we live alongside the natural world \u2014 and how we might do so more justly.
          </p>
        </div>
      </section>
    </div>
  );
}

const contentEntries: ContentEntry[] = [
  {
    id: "founding-vision",
    title: "Founding Vision",
    subtitle: "Mission, Principles, and Research Areas",
    date: "2026",
    badge: "Overview",
    badgeColor: "bg-amber-600",
    component: FoundingVision,
  },
];

export default function NESRI() {
  const [, navigate] = useLocation();
  const [activeContent, setActiveContent] = useState<string | null>(null);

  const activeEntry = contentEntries.find((e) => e.id === activeContent);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white dark:from-gray-950 dark:to-gray-900">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur">
        <div className="flex items-center gap-2">
          {activeContent ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveContent(null)}
              className="gap-2"
              data-testid="button-back-nesri"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to NESRI</span>
            </Button>
          ) : (
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
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:inline font-medium">NESRI</span>
          <ThemeToggle />
        </div>
      </header>

      {!activeContent ? (
        <main className="flex-1">
          <section className="px-4 sm:px-6 py-16 sm:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-amber-500/10 mb-8">
                <Trees className="h-10 w-10 text-amber-600 dark:text-amber-400" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4" data-testid="text-nesri-title">
                Nature Ethics Research Institute
              </h1>
              <p className="text-lg sm:text-xl text-amber-700 dark:text-amber-400 font-serif italic mb-6">
                Ethical Frameworks for Environmental Stewardship
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                NESRI is a research initiative dedicated to exploring the ethical dimensions of human\u2013nature relationships, environmental justice, and responsible stewardship of ecological systems.
              </p>
            </div>
          </section>

          <section className="px-4 sm:px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Content</h2>
              <div className="space-y-4">
                {contentEntries.map((entry) => (
                  <Card
                    key={entry.id}
                    className="cursor-pointer transition-all hover:shadow-md"
                    onClick={() => setActiveContent(entry.id)}
                    data-testid={`card-content-${entry.id}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={entry.badgeColor}>{entry.badge}</Badge>
                            <span className="text-xs text-muted-foreground">{entry.date}</span>
                          </div>
                          <CardTitle className="font-serif text-xl">{entry.title}</CardTitle>
                          <CardDescription className="mt-1">{entry.subtitle}</CardDescription>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-6 py-12 bg-muted/30 border-t">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Connect with NESRI</h3>
              <a href="mailto:praxinex@gmail.com" className="inline-flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 hover:underline" data-testid="link-nesri-email">
                <Mail className="h-4 w-4" />
                praxinex@gmail.com
              </a>
            </div>
          </section>

          <footer className="px-4 sm:px-6 py-8 border-t">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-muted-foreground mb-2">Felix Abayomi</p>
              <p className="text-xs text-muted-foreground">Founder, Nature Ethics Research Institute</p>
              <p className="text-xs text-muted-foreground mt-4">&copy; Felix Abayomi 2026</p>
            </div>
          </footer>
        </main>
      ) : (
        <main className="flex-1">
          {activeEntry && (
            <>
              <section className="px-4 sm:px-6 py-12 text-center border-b">
                <div className="max-w-4xl mx-auto">
                  <Badge className={activeEntry.badgeColor + " mb-3"}>{activeEntry.badge}</Badge>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">{activeEntry.title}</h1>
                  <p className="text-muted-foreground">{activeEntry.subtitle}</p>
                </div>
              </section>
              <activeEntry.component />
              <footer className="px-4 sm:px-6 py-8 border-t">
                <div className="max-w-4xl mx-auto text-center">
                  <p className="text-sm text-muted-foreground mb-2">Felix Abayomi</p>
                  <p className="text-xs text-muted-foreground">Founder, Nature Ethics Research Institute</p>
                  <p className="text-xs text-muted-foreground mt-4">&copy; Felix Abayomi 2026</p>
                </div>
              </footer>
            </>
          )}
        </main>
      )}
    </div>
  );
}
