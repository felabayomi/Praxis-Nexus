import { useState } from "react";
import { useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Trees, ArrowLeft, BookOpen, Scale, Sprout, Heart, Globe, Users,
  Lightbulb, GraduationCap, Feather, Mail, ArrowRight, Presentation,
  Shield, Stethoscope, HandHeart, Megaphone, Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WACIPresentationView, type Slide } from "@/components/WACIPresentationView";
import { WACIAIAudio } from "@/components/WACIAIAudio";
import { ShareExportControls } from "@/components/ShareExportControls";

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
            NESRI invites scholars, practitioners, and communities to engage with the difficult, necessary questions about how we live alongside the natural world — and how we might do so more justly.
          </p>
        </div>
      </section>
    </div>
  );
}

function WelfareFoundation() {
  const traditionalFocus = [
    "Species survival",
    "Population recovery",
    "Habitat restoration",
    "Biodiversity metrics",
    "Ecosystem balance",
  ];

  const missingFoundation = [
    "Stress during research capture",
    "Trauma in relocation",
    "Welfare in monitoring practices",
    "Humane conflict mitigation",
    "Ethical field protocols",
  ];

  const ethicalResearch = [
    "Minimally invasive monitoring",
    "Humane capture and tagging methods",
    "Stress-reduction protocols",
    "Welfare review boards",
    "Community consultation",
    "Transparent reporting",
  ];

  const conflictLens = [
    "Non-lethal deterrents",
    "Beehive fences",
    "Early-warning systems",
    "Education and coexistence",
    "Compensation frameworks",
  ];

  const globalImpact = [
    "Public trust increases",
    "Funding confidence grows",
    "Youth engagement strengthens",
    "Partnerships expand",
    "Policy influence improves",
  ];

  const callToAction = [
    "Embed welfare into research",
    "Share ethical case studies",
    "Collaborate on humane innovation",
    "Amplify stories through #VoicesForWildlife",
  ];

  return (
    <div className="space-y-0">
      <section className="px-4 sm:px-6 py-12 bg-amber-500/5 dark:bg-amber-950/20 border-y border-amber-200/50 dark:border-amber-900/30">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg font-serif leading-relaxed text-foreground mb-4">
            What if conservation science put animal welfare first — not as a footnote, not as an afterthought, but as the foundation?
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For decades, conservation has focused on ecosystems, species numbers, habitat restoration, and biodiversity metrics. These are essential. They matter deeply. But somewhere along the way, the individual animal — the living, feeling being — sometimes became secondary to the system.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  The Traditional Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Conservation has historically focused on:</p>
                <ul className="space-y-2.5">
                  {traditionalFocus.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Sprout className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 italic">These priorities are valid and necessary. But they are not complete.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  The Missing Foundation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Where is the individual animal?</p>
                <ul className="space-y-2.5">
                  {missingFoundation.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Sprout className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 italic">Sometimes the individual becomes invisible inside the data.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium mb-4">
              <Lightbulb className="h-4 w-4" />
              <span>A New Framework</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">What If Welfare Was the Starting Point?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Not a regulation. Not a compliance box. But a guiding philosophy.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Ecological Integrity</h3>
                <p className="text-sm text-muted-foreground">Protecting the health and resilience of whole ecosystems.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Scientific Rigor</h3>
                <p className="text-sm text-muted-foreground">Evidence-based approaches grounded in robust methodology.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Animal Well-being</h3>
                <p className="text-sm text-muted-foreground">Respecting the welfare of every individual living being.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  Ethical Research in Practice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {ethicalResearch.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Sprout className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 italic">Ethical science does not weaken conservation. It strengthens trust.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2">
                  <HandHeart className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  Conflict Through a Welfare Lens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {conflictLens.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Sprout className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 italic">Conflict solutions should protect farmers and prevent suffering for wildlife.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-amber-500/5 dark:bg-amber-950/20 border-y border-amber-200/50 dark:border-amber-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h2 className="font-serif text-2xl font-bold text-foreground">Education as the Foundation</h2>
              </div>
              <p className="text-muted-foreground mb-4">Train conservationists differently through:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <Sprout className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Training University programmes</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <Sprout className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Ethical fieldwork modules</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <Sprout className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Community-led case studies</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <Sprout className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Welfare-integrated conservation research</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4 italic">If we train the next generation differently, the field evolves.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h2 className="font-serif text-2xl font-bold text-foreground">Why This Matters Globally</h2>
              </div>
              <p className="text-muted-foreground mb-4">When welfare is prioritised:</p>
              <ul className="space-y-3">
                {globalImpact.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <Sprout className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-4 italic">Ethics is strategic. Compassion builds credibility.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Megaphone className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h2 className="font-serif text-2xl font-bold text-foreground">Join Us in Redefining Conservation</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {callToAction.map((item) => (
              <Card key={item} className="text-center">
                <CardContent className="pt-6 pb-4">
                  <p className="text-sm font-medium text-foreground">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Conservation is not just about saving species.
          </h2>
          <p className="text-2xl font-serif font-bold text-amber-700 dark:text-amber-400 mb-6">
            It is about respecting life.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Because ethics is not a barrier to science. It is what gives science its legitimacy.
          </p>
        </div>
      </section>
    </div>
  );
}

const foundingVisionSlides: Slide[] = [
  { title: "NESRI — Founding Vision", content: "Nature Ethics Research Institute\n\nEthical Frameworks for Environmental Stewardship\n\nA research initiative dedicated to exploring the ethical dimensions of human-nature relationships, environmental justice, and responsible stewardship of ecological systems.", type: "title" },
  { title: "Our Mission & Vision", content: "Mission: To advance ethical thinking about the natural world through interdisciplinary research, education, and community-centred scholarship.\n\nVision: A world where environmental decisions are guided by ethical responsibility, ecological wisdom, and respect for all living systems.", type: "section" },
  { title: "Guiding Principles", content: "Ethical Inquiry: Every intervention in natural systems carries moral weight.\n\nRelational Responsibility: Humans are not separate from nature.\n\nInclusive Voices: Environmental ethics must include indigenous, local, and marginalised perspectives.\n\nGentle Scholarship: Rigorous inquiry does not require aggression.", type: "section" },
  { title: "Research Areas", content: "Environmental Ethics \u2022 Ecological Stewardship \u2022 Human\u2013Nature Relationships \u2022 Environmental Justice \u2022 Community-Centred Conservation \u2022 Research and Scholarship\n\nExploring the ethical questions that emerge at the intersection of ecology, justice, and human responsibility.", type: "section" },
];

const welfareSlides: Slide[] = [
  { title: "What If Conservation Science Put Animal Welfare First?", content: "Nature Ethics Research Institute\n\nConservation Science With Welfare at the Foundation\n\nToday we challenge how we think about conservation science — and invite us to imagine something better.", type: "title" },
  { title: "The Traditional Model", content: "Conservation Has Focused On:\n\n\u2022 Species survival\n\u2022 Population recovery\n\u2022 Habitat restoration\n\u2022 Biodiversity metrics\n\u2022 Ecosystem balance\n\nThese priorities are valid and necessary. But they are not complete.", type: "section" },
  { title: "The Missing Foundation", content: "Where Is the Individual Animal?\n\n\u2022 Stress during research capture\n\u2022 Trauma in relocation\n\u2022 Welfare in monitoring practices\n\u2022 Humane conflict mitigation\n\u2022 Ethical field protocols\n\nSometimes the individual becomes invisible inside the data.", type: "section" },
  { title: "The Question", content: "What If Welfare Was the Starting Point?\n\nNot a regulation.\nNot a compliance box.\nBut a guiding philosophy.\n\nWhat if compassion shaped methodology from the beginning?", type: "section" },
  { title: "A New Conservation Framework", content: "Ecosystem + Species + Individual Welfare\n\nThree pillars:\n1. Ecological Integrity\n2. Scientific Rigor\n3. Animal Well-being\n\nThese are not competing priorities. They strengthen each other.", type: "section" },
  { title: "What Ethical Research Looks Like", content: "\u2022 Minimally invasive monitoring\n\u2022 Humane capture and tagging methods\n\u2022 Stress-reduction protocols\n\u2022 Welfare review boards\n\u2022 Community consultation\n\u2022 Transparent reporting\n\nEthical science does not weaken conservation. It strengthens trust.", type: "section" },
  { title: "Human-Wildlife Conflict Through a Welfare Lens", content: "\u2022 Non-lethal deterrents\n\u2022 Beehive fences\n\u2022 Early-warning systems\n\u2022 Education and coexistence\n\u2022 Compensation frameworks\n\nConflict solutions should protect farmers and prevent suffering for wildlife.", type: "section" },
  { title: "Education as the Foundation", content: "Train Conservationists Differently\n\n\u2022 Training University programmes\n\u2022 Ethical fieldwork modules\n\u2022 Community-led case studies\n\u2022 Welfare-integrated conservation research\n\nIf we train the next generation differently, the field evolves.", type: "section" },
  { title: "Why This Matters Globally", content: "When welfare is prioritised:\n\n\u2022 Public trust increases\n\u2022 Funding confidence grows\n\u2022 Youth engagement strengthens\n\u2022 Partnerships expand\n\u2022 Policy influence improves\n\nEthics is strategic. Compassion builds credibility.", type: "section" },
  { title: "The Future We're Building", content: "\u2022 Research grounded in respect\n\u2022 Conservation rooted in compassion\n\u2022 Communities empowered to lead\n\u2022 Wildlife protected with dignity\n\nThis is not idealism. It is the next evolution of conservation science.", type: "section" },
  { title: "Join Us in Redefining Conservation", content: "\u2022 Embed welfare into research\n\u2022 Share ethical case studies\n\u2022 Collaborate on humane innovation\n\u2022 Amplify stories through #VoicesForWildlife\n\nWe don't have to choose between science and compassion. We choose both.", type: "closing" },
  { title: "Conservation Is Not Just About Saving Species", content: "It Is About Respecting Life.\n\nBecause ethics is not a barrier to science.\nIt is what gives science its legitimacy.\n\n#Conservation #EthicalResearch #WildlifeProtection", type: "closing" },
];

function getFoundingVisionText(): string {
  return foundingVisionSlides.map(s => `${s.title}\n\n${s.content}`).join("\n\n---\n\n");
}

function getWelfareText(): string {
  return welfareSlides.map(s => `${s.title}\n\n${s.content}`).join("\n\n---\n\n");
}

const contentEntries: ContentEntry[] = [
  {
    id: "welfare-foundation",
    title: "What If Conservation Science Put Animal Welfare First?",
    subtitle: "Conservation Science With Welfare at the Foundation",
    date: "2026",
    badge: "Thought Leadership",
    badgeColor: "bg-amber-600",
    component: WelfareFoundation,
    slides: welfareSlides,
    getAllText: getWelfareText,
  },
  {
    id: "founding-vision",
    title: "Founding Vision",
    subtitle: "Mission, Principles, and Research Areas",
    date: "2026",
    badge: "Overview",
    badgeColor: "bg-amber-600",
    component: FoundingVision,
    slides: foundingVisionSlides,
    getAllText: getFoundingVisionText,
  },
];

export default function NESRI() {
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
          {activeContent && activeEntry && (
            <>
              <ShareExportControls
                type="presentation"
                project="nesri"
                title={activeEntry.title}
                content={activeEntry.slides}
                slides={activeEntry.slides}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPresentation(true)}
                title="Presentation Mode"
                data-testid="button-nesri-presentation"
              >
                <Presentation className="h-4 w-4" />
              </Button>
              <WACIAIAudio getText={activeEntry.getAllText} sectionId={activeEntry.id} />
            </>
          )}
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
                NESRI is a research initiative dedicated to exploring the ethical dimensions of human–nature relationships, environmental justice, and responsible stewardship of ecological systems.
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
