import { useState } from "react";
import { useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Globe, ArrowLeft, Shield, MapPin, Users, Leaf, BookOpen, Handshake,
  Target, Rocket, GraduationCap, TrendingUp, MessageCircle, Star,
  Mail, ExternalLink, ChevronDown, ChevronUp, Megaphone, ArrowRight,
  Presentation
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WACIPresentationView, type Slide } from "@/components/WACIPresentationView";
import { WACIAIAudio } from "@/components/WACIAIAudio";

interface ContentEntry {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  badge: string;
  badgeColor: string;
  component: () => JSX.Element;
  slides: Slide[];
  getAllText: () => string;
}

function VolunteerCheckin() {
  const [expandedPriority, setExpandedPriority] = useState<number | null>(null);

  const focusAreas = [
    { icon: <BookOpen className="h-5 w-5" />, title: "Wildlife Education", description: "Building awareness and understanding of Africa's unique biodiversity through accessible, community-driven education programmes." },
    { icon: <Handshake className="h-5 w-5" />, title: "Human-Wildlife Coexistence", description: "Developing practical approaches to reduce conflict between human communities and wildlife populations across diverse landscapes." },
    { icon: <Users className="h-5 w-5" />, title: "Youth Engagement", description: "Empowering young people as the next generation of conservation leaders through mentorship, training, and hands-on involvement." },
    { icon: <Shield className="h-5 w-5" />, title: "Rescue and Rehabilitation Awareness", description: "Raising visibility for wildlife rescue efforts and rehabilitation practices that restore animals to their natural habitats." },
    { icon: <MapPin className="h-5 w-5" />, title: "Community Partnerships", description: "Building lasting partnerships with local communities who are the true custodians of Africa's wildlife and ecosystems." },
    { icon: <Megaphone className="h-5 w-5" />, title: "#VoicesForWildlife", description: "Amplifying authentic conservation stories from local leaders and communities, creating a platform for visibility, empathy, and funding." },
  ];

  const strategicPriorities = [
    { number: 1, icon: <Users className="h-5 w-5" />, title: "Community-Led Conservation Expansion", description: "Identify 3\u20135 grassroots initiatives to support. Develop micro-grant strategy. Feature local leaders quarterly.", insight: "The future of conservation in Africa must be led locally. Our role is to empower, amplify, and resource." },
    { number: 2, icon: <Handshake className="h-5 w-5" />, title: "Human-Wildlife Conflict Mitigation", description: "Education and engagement. Beehive fence advocacy. Community deterrent strategies. Policy awareness.", insight: "Conflict is not solved with distance \u2014 it is solved with understanding and innovation." },
    { number: 3, icon: <GraduationCap className="h-5 w-5" />, title: "WACI Training University Activation", description: "Launch structured online modules. Recruit volunteer facilitators. Develop youth conservation track. Offer certification pathways.", insight: "We are not only protecting wildlife \u2014 we are training the next generation of conservation leaders." },
    { number: 4, icon: <TrendingUp className="h-5 w-5" />, title: "Digital Growth and Fundraising Pipeline", description: "Increase story submissions. Grow newsletter base. Strengthen recurring donations. Expand global visibility.", insight: "Visibility fuels sustainability. When our impact is seen, support follows." },
    { number: 5, icon: <Globe className="h-5 w-5" />, title: "Stronger Strategic Partnerships", description: "University collaborations. NGO alliances. CSR partnerships. Research partnerships. Volunteer leaders.", insight: "WACI is a platform. Partnerships are how we multiply impact." },
  ];

  const yearHighlights = [
    "Expanded #VoicesForWildlife storytelling",
    "Increased volunteer engagement",
    "Strengthened digital platform engagement",
    "Deepened community conversations",
    "Expanded conservation education efforts",
  ];

  const platformHighlights = [
    "Story submission and sharing system",
    "Blog integration",
    "Secure donation processing",
    "Newsletter growth",
    "Social sharing integration",
  ];

  const getInvolved = [
    "Lead a regional initiative",
    "Submit or feature a conservation story",
    "Join Training University facilitation",
    "Recruit new volunteers",
    "Support fundraising campaigns",
  ];

  return (
    <div className="space-y-0">
      <section className="px-4 sm:px-6 py-12 bg-orange-500/5 dark:bg-orange-950/20 border-y border-orange-200/50 dark:border-orange-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-orange-600 mb-4">Our Mission</Badge>
              <p className="text-lg font-serif leading-relaxed text-foreground">
                To educate, inspire, and mobilize individuals and communities to protect Africa's wildlife and ecosystems.
              </p>
            </div>
            <div>
              <Badge className="bg-orange-600 mb-4">Our Vision</Badge>
              <p className="text-lg font-serif leading-relaxed text-foreground">
                A thriving Africa where humans and wildlife coexist harmoniously.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 text-orange-700 dark:text-orange-400 rounded-full text-sm font-medium mb-4">
              <Rocket className="h-4 w-4" />
              <span>Building Momentum</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">A Year of Momentum</h2>
            <p className="text-muted-foreground">We did not just grow numbers — we deepened impact.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  What We Strengthened
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {yearHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Leaf className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  Digital Platform Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {platformHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Leaf className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 italic">
                  Our digital ecosystem is no longer just informational — it is interactive.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 text-orange-700 dark:text-orange-400 rounded-full text-sm font-medium mb-4">
              <MapPin className="h-4 w-4" />
              <span>Current Focus</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">Where We Are Now</h2>
            <p className="text-muted-foreground">We are now positioned to move from awareness into measurable outcomes.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area) => (
              <Card key={area.title} className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 text-orange-700 dark:text-orange-400 rounded-full text-sm font-medium mb-4">
              <Rocket className="h-4 w-4" />
              <span>Strategic Direction</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">Strategic Priorities</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">The Year of Alignment and Scale — not about doing more, but doing what matters with focus and excellence.</p>
          </div>
          <div className="space-y-4">
            {strategicPriorities.map((priority) => (
              <Card
                key={priority.number}
                className="cursor-pointer transition-all hover:shadow-md"
                onClick={() => setExpandedPriority(expandedPriority === priority.number ? null : priority.number)}
                data-testid={`card-priority-${priority.number}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white font-bold text-sm shrink-0">
                        {priority.number}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-orange-600 dark:text-orange-400">{priority.icon}</div>
                        <CardTitle className="font-serif text-lg">{priority.title}</CardTitle>
                      </div>
                    </div>
                    {expandedPriority === priority.number ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                  </div>
                </CardHeader>
                {expandedPriority === priority.number && (
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{priority.description}</p>
                    <div className="bg-orange-50 dark:bg-orange-950/30 rounded-lg p-4 border border-orange-200/50 dark:border-orange-900/30">
                      <p className="text-sm font-serif italic text-orange-800 dark:text-orange-300">"{priority.insight}"</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-orange-500/5 dark:bg-orange-950/20 border-y border-orange-200/50 dark:border-orange-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <h2 className="font-serif text-2xl font-bold text-foreground">Get Involved</h2>
              </div>
              <p className="text-muted-foreground mb-6">WACI grows when you step forward. Here is how you can plug in.</p>
              <ul className="space-y-3">
                {getInvolved.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <Leaf className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <h2 className="font-serif text-2xl font-bold text-foreground">Join the Conversation</h2>
              </div>
              <p className="text-muted-foreground mb-6">This is not a top-down organization. Your voice shapes our direction.</p>
              <div className="space-y-3">
                <p className="text-sm text-foreground">What support do you need?</p>
                <p className="text-sm text-foreground">What initiatives should we prioritize?</p>
                <p className="text-sm text-foreground">Who wants to lead or co-lead a project?</p>
                <p className="text-sm text-foreground">How can we improve volunteer engagement?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-6">
            WACI is not just an organization. It is a movement.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            A movement of people who believe Africa's wildlife deserves protection — and that local voices matter. Let us lead boldly. Let us collaborate deeply. Let us make this transformational.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>Deeper collaboration</span>
            <span className="text-orange-400">{"\u2022"}</span>
            <span>Clearer impact</span>
            <span className="text-orange-400">{"\u2022"}</span>
            <span>Stronger community</span>
            <span className="text-orange-400">{"\u2022"}</span>
            <span>Louder voices for wildlife</span>
          </div>
        </div>
      </section>
    </div>
  );
}

const volunteerCheckinSlides: Slide[] = [
  { title: "WACI Volunteer & Partner Check-in", content: "Q1 2026\nWildlife of Africa Conservation Initiative\n\nWelcome, WACI family. Today is about alignment, momentum, and strengthening the mission that unites us — protecting Africa's wildlife through education, community leadership, and global collaboration.", type: "title" },
  { title: "Why We Exist", content: "Our Mission: To educate, inspire, and mobilize individuals and communities to protect Africa's wildlife and ecosystems.\n\nOur Vision: A thriving Africa where humans and wildlife coexist harmoniously.\n\nWACI was never just about conservation projects. It was about building a movement — led by empowered local voices and supported by global action.", type: "section" },
  { title: "A Year of Momentum", content: "What We Strengthened:\n\n• Expanded #VoicesForWildlife storytelling\n• Increased volunteer engagement\n• Strengthened digital platform engagement\n• Deepened community conversations\n• Expanded conservation education efforts\n\nWe didn't just grow numbers — we deepened impact.", type: "section" },
  { title: "#VoicesForWildlife", content: "Amplifying Authentic Conservation Stories\n\n• Local conservation leaders highlighted\n• Community-driven narratives\n• Cross-continental engagement\n• A platform for visibility and funding\n\nStories move people. #VoicesForWildlife is more than a campaign — it's our heartbeat.", type: "section" },
  { title: "Our Digital Platform Growth", content: "Platform Highlights:\n\n• Story submission & sharing system\n• Blog integration\n• Secure donation processing\n• Newsletter growth\n• Social sharing integration\n\nOur digital ecosystem is no longer just informational — it's interactive.", type: "section" },
  { title: "Where We Are Now", content: "Current Focus Areas:\n\n• Wildlife education\n• Human-wildlife coexistence\n• Youth engagement\n• Rescue & rehabilitation awareness\n• Community partnerships\n\nWe are now positioned to move from awareness into measurable outcomes.", type: "section" },
  { title: "Strategic Priorities", content: "This Is Our Year of Alignment & Scale\n\n1. Community-Led Conservation Expansion\n2. Human-Wildlife Conflict Mitigation Programs\n3. WACI Training University Activation\n4. Digital Growth & Fundraising Pipeline\n5. Stronger Strategic Partnerships\n\nNot about doing more — it's about doing what matters with focus and excellence.", type: "section" },
  { title: "Priority 1: Community-Led Conservation", content: "Action Steps:\n\n• Identify 3–5 grassroots initiatives to support\n• Develop micro-grant strategy\n• Feature local leaders quarterly\n\nThe future of conservation in Africa must be led locally. Our role is to empower, amplify, and resource.", type: "priority" },
  { title: "Priority 2: Human-Wildlife Coexistence", content: "Focus Areas:\n\n• Education & engagement\n• Beehive fence advocacy\n• Community deterrent strategies\n• Policy awareness\n\nConflict is not solved with distance — it is solved with understanding and innovation.", type: "priority" },
  { title: "Priority 3: WACI Training University", content: "Goals:\n\n• Launch structured online modules\n• Recruit volunteer facilitators\n• Develop youth conservation track\n• Offer certification pathways\n\nWe are not only protecting wildlife — we are training the next generation of conservation leaders.", type: "priority" },
  { title: "Priority 4: Digital & Fundraising Growth", content: "Targets:\n\n• Increase story submissions\n• Grow newsletter base\n• Strengthen recurring donations\n• Expand global visibility\n\nVisibility fuels sustainability. When our impact is seen, support follows.", type: "priority" },
  { title: "Priority 5: Partnerships", content: "We're Looking For:\n\n• University collaborations\n• NGO alliances\n• CSR partnerships\n• Research partnerships\n• Volunteer leaders\n\nWACI is a platform. Partnerships are how we multiply impact.", type: "priority" },
  { title: "Your Role", content: "How You Can Plug In:\n\n• Lead a regional initiative\n• Submit or feature a story\n• Join Training University facilitation\n• Recruit new volunteers\n• Support fundraising campaigns\n\nWACI grows when you step forward.", type: "section" },
  { title: "Closing & Call to Action", content: "WACI is not just an organization. It is a movement of people who believe Africa's wildlife deserves protection — and that local voices matter.\n\n• Deeper collaboration\n• Clearer impact\n• Stronger community\n• Louder voices for wildlife\n\nLet's lead boldly. Let's collaborate deeply. Let's make this transformational.", type: "closing" },
];

function getVolunteerCheckinText(): string {
  return volunteerCheckinSlides.map(s => `${s.title}\n\n${s.content}`).join("\n\n---\n\n");
}

const contentEntries: ContentEntry[] = [
  {
    id: "volunteer-checkin-q1-2026",
    title: "Volunteer and Partner Check-in",
    subtitle: "Q1 2026 — Alignment, Momentum, and Strengthening the Mission",
    date: "Q1 2026",
    badge: "Meeting Deck",
    badgeColor: "bg-orange-600",
    component: VolunteerCheckin,
    slides: volunteerCheckinSlides,
    getAllText: getVolunteerCheckinText,
  },
];

export default function WACI() {
  const [, navigate] = useLocation();
  const [activeContent, setActiveContent] = useState<string | null>(null);
  const [showPresentation, setShowPresentation] = useState(false);

  const activeEntry = contentEntries.find((e) => e.id === activeContent);

  if (showPresentation && activeEntry) {
    return (
      <WACIPresentationView
        open={true}
        onClose={() => setShowPresentation(false)}
        slides={activeEntry.slides}
        title={activeEntry.title}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white dark:from-gray-950 dark:to-gray-900">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur">
        <div className="flex items-center gap-2">
          {activeContent ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveContent(null)}
              className="gap-2"
              data-testid="button-back-waci"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to WACI</span>
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
          {activeContent && activeEntry && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPresentation(true)}
                title="Presentation Mode"
                data-testid="button-waci-presentation"
              >
                <Presentation className="h-4 w-4" />
              </Button>
              <WACIAIAudio getText={activeEntry.getAllText} sectionId={activeEntry.id} />
            </>
          )}
          <span className="text-xs text-muted-foreground hidden sm:inline font-medium">WACI</span>
          <ThemeToggle />
        </div>
      </header>

      {!activeContent ? (
        <main className="flex-1">
          <section className="px-4 sm:px-6 py-16 sm:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-orange-500/10 mb-8">
                <Globe className="h-10 w-10 text-orange-600 dark:text-orange-400" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4" data-testid="text-waci-title">
                Wildlife of Africa Conservation Initiative
              </h1>
              <p className="text-lg sm:text-xl text-orange-700 dark:text-orange-400 font-serif italic mb-6">
                Protecting Africa's Biodiversity Heritage
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                WACI was never just about conservation projects. It was about building a movement — led by empowered local voices and supported by global action.
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
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Connect with WACI</h3>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a href="mailto:wildlifeaboutafrica@gmail.com" className="inline-flex items-center gap-2 text-sm text-orange-700 dark:text-orange-400 hover:underline" data-testid="link-waci-email">
                  <Mail className="h-4 w-4" />
                  wildlifeaboutafrica@gmail.com
                </a>
                <a href="https://wacihub.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-orange-700 dark:text-orange-400 hover:underline" data-testid="link-waci-website">
                  <ExternalLink className="h-4 w-4" />
                  wacihub.org
                </a>
                <a href="https://wacicrew.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-orange-700 dark:text-orange-400 hover:underline" data-testid="link-waci-crew">
                  <ExternalLink className="h-4 w-4" />
                  wacicrew.org
                </a>
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">Stay connected. Stay active. Stay aligned.</p>
            </div>
          </section>

          <footer className="px-4 sm:px-6 py-8 border-t">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-muted-foreground mb-2">Felix Abayomi</p>
              <p className="text-xs text-muted-foreground">Founder, Wildlife of Africa Conservation Initiative</p>
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
                  <p className="text-xs text-muted-foreground">Founder, Wildlife of Africa Conservation Initiative</p>
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
