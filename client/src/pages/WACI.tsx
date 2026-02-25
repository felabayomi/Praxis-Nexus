import { useState } from "react";
import { useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Globe, ArrowLeft, Shield, MapPin, Users, Leaf, BookOpen, Handshake,
  Target, Rocket, GraduationCap, TrendingUp, MessageCircle, Star,
  Mail, ExternalLink, ChevronDown, ChevronUp, Megaphone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const focusAreas = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Wildlife Education",
    description: "Building awareness and understanding of Africa's unique biodiversity through accessible, community-driven education programmes.",
  },
  {
    icon: <Handshake className="h-5 w-5" />,
    title: "Human-Wildlife Coexistence",
    description: "Developing practical approaches to reduce conflict between human communities and wildlife populations across diverse landscapes.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Youth Engagement",
    description: "Empowering young people as the next generation of conservation leaders through mentorship, training, and hands-on involvement.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Rescue and Rehabilitation Awareness",
    description: "Raising visibility for wildlife rescue efforts and rehabilitation practices that restore animals to their natural habitats.",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Community Partnerships",
    description: "Building lasting partnerships with local communities who are the true custodians of Africa's wildlife and ecosystems.",
  },
  {
    icon: <Megaphone className="h-5 w-5" />,
    title: "#VoicesForWildlife",
    description: "Amplifying authentic conservation stories from local leaders and communities, creating a platform for visibility, empathy, and funding.",
  },
];

const strategicPriorities = [
  {
    number: 1,
    icon: <Users className="h-5 w-5" />,
    title: "Community-Led Conservation Expansion",
    description: "Identify 3\u20135 grassroots initiatives to support. Develop micro-grant strategy. Feature local leaders quarterly.",
    insight: "The future of conservation in Africa must be led locally. Our role is to empower, amplify, and resource.",
  },
  {
    number: 2,
    icon: <Handshake className="h-5 w-5" />,
    title: "Human-Wildlife Conflict Mitigation",
    description: "Education and engagement. Beehive fence advocacy. Community deterrent strategies. Policy awareness.",
    insight: "Conflict is not solved with distance \u2014 it is solved with understanding and innovation.",
  },
  {
    number: 3,
    icon: <GraduationCap className="h-5 w-5" />,
    title: "WACI Training University Activation",
    description: "Launch structured online modules. Recruit volunteer facilitators. Develop youth conservation track. Offer certification pathways.",
    insight: "We are not only protecting wildlife \u2014 we are training the next generation of conservation leaders.",
  },
  {
    number: 4,
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Digital Growth and Fundraising Pipeline",
    description: "Increase story submissions. Grow newsletter base. Strengthen recurring donations. Expand global visibility.",
    insight: "Visibility fuels sustainability. When our impact is seen, support follows.",
  },
  {
    number: 5,
    icon: <Globe className="h-5 w-5" />,
    title: "Stronger Strategic Partnerships",
    description: "University collaborations. NGO alliances. CSR partnerships. Research partnerships. Volunteer leaders.",
    insight: "WACI is a platform. Partnerships are how we multiply impact.",
  },
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

export default function WACI() {
  const [, navigate] = useLocation();
  const [expandedPriority, setExpandedPriority] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white dark:from-gray-950 dark:to-gray-900">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur">
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
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:inline font-medium">WACI</span>
          <ThemeToggle />
        </div>
      </header>

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
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                WACI was never just about conservation projects. It was about building a movement \u2014 led by empowered local voices and supported by global action.
              </p>
            </div>
          </div>
        </section>

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
              <p className="text-muted-foreground">We did not just grow numbers \u2014 we deepened impact.</p>
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
                    Our digital ecosystem is no longer just informational \u2014 it is interactive. It allows stories, donations, education, and collaboration to happen in one place.
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
                <Card key={area.title} className="h-full" data-testid={`card-waci-${area.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
                        {area.icon}
                      </div>
                      <CardTitle className="font-serif text-base">{area.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {area.description}
                    </p>
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
              <p className="text-muted-foreground max-w-xl mx-auto">The Year of Alignment and Scale \u2014 not about doing more, but doing what matters with focus and excellence.</p>
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
                          <div className="text-orange-600 dark:text-orange-400">
                            {priority.icon}
                          </div>
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
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {priority.description}
                      </p>
                      <div className="bg-orange-50 dark:bg-orange-950/30 rounded-lg p-4 border border-orange-200/50 dark:border-orange-900/30">
                        <p className="text-sm font-serif italic text-orange-800 dark:text-orange-300">
                          "{priority.insight}"
                        </p>
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
              A movement of people who believe Africa's wildlife deserves protection \u2014 and that local voices matter. Let us lead boldly. Let us collaborate deeply. Let us make this transformational.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <span>Deeper collaboration</span>
              <span className="text-orange-400">\u2022</span>
              <span>Clearer impact</span>
              <span className="text-orange-400">\u2022</span>
              <span>Stronger community</span>
              <span className="text-orange-400">\u2022</span>
              <span>Louder voices for wildlife</span>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-12 bg-muted/30 border-t">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Connect with WACI</h3>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="mailto:wildlifeaboutafrica@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-orange-700 dark:text-orange-400 hover:underline"
                data-testid="link-waci-email"
              >
                <Mail className="h-4 w-4" />
                wildlifeaboutafrica@gmail.com
              </a>
              <a
                href="https://afwildlife.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-orange-700 dark:text-orange-400 hover:underline"
                data-testid="link-waci-website"
              >
                <ExternalLink className="h-4 w-4" />
                afwildlife.org
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
    </div>
  );
}
