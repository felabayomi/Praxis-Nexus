import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  Leaf,
  Sparkles,
  Lightbulb,
  MessageCircleQuestion,
  Link2,
  Quote,
  TreeDeciduous,
  Mountain,
  Waves,
  Sun,
  Compass,
  X,
  Palette,
  ArrowRight,
  CheckCircle2,
  Circle
} from "lucide-react";
import { journalData } from "@/lib/journalData";
import { apiRequest } from "@/lib/queryClient";
import { TemplateStyle, templates } from "./TemplateSelector";
import { ShareExportControls } from "./ShareExportControls";

interface PresentationViewProps {
  template: TemplateStyle;
  onClose: () => void;
  onChangeTemplate: () => void;
  section?: string;
}

interface Slide {
  id: string;
  type: 'title' | 'content';
  title?: string;
  subtitle?: string;
  content?: string;
  author?: string;
  slideNumber: number;
  aiHeading?: string;
}

interface SlideInsight {
  keyInsight: string;
  thematicConnection: string;
  discussionQuestion: string;
  inquiryGuidance: string;
  imageQuery?: string;
}

function createSlides(sectionId?: string): Slide[] {
  const slides: Slide[] = [];
  
  // Find if this is a month section
  const month = sectionId?.startsWith("month-") 
    ? journalData.months.find(m => m.id === sectionId) 
    : null;

  // Check if this is the inquiry-questions section
  const isInquiryQuestions = sectionId === "inquiry-questions";

  if (month) {
    // Create slides for the specific month
    slides.push({
      id: "title-slide",
      type: "title",
      title: `Month ${month.monthNumber}: ${month.title}`,
      subtitle: month.theme,
      author: journalData.author,
      slideNumber: 1
    });

    let slideNum = 2;
    
    // Create ONE slide per section, combining all content intelligently
    month.sections.forEach((section) => {
      const paragraphs: string[] = [];
      const listItems: string[] = [];
      
      // Separate paragraphs and list items
      section.content.forEach(item => {
        if (item.type === "paragraph" && item.content) {
          paragraphs.push(item.content);
        } else if (item.type === "list" && item.items) {
          listItems.push(...item.items);
        }
      });

      // Combine content for this section
      let combinedContent = "";
      
      // Add paragraphs first
      if (paragraphs.length > 0) {
        combinedContent = paragraphs.join("\n\n");
      }
      
      // Add list items as bullet points
      if (listItems.length > 0) {
        const bulletList = listItems.map(item => `• ${item}`).join("\n\n");
        if (combinedContent) {
          combinedContent += "\n\n" + bulletList;
        } else {
          combinedContent = bulletList;
        }
      }

      // Create a single slide for this section
      if (combinedContent) {
        slides.push({
          id: section.id,
          type: "content",
          title: section.title,
          content: combinedContent,
          slideNumber: slideNum++
        });
      }
    });
  } else if (isInquiryQuestions && journalData.inquiryQuestions) {
    // Create slides for the Inquiry Questions section
    slides.push({
      id: "title-slide",
      type: "title",
      title: "Framing the Inquiry",
      subtitle: "AI, Ecology, and Economy in Human–Wildlife Conflict",
      author: journalData.author,
      slideNumber: 1
    });

    let slideNum = 2;
    
    // Create ONE slide per section, combining all content intelligently
    journalData.inquiryQuestions.forEach((section) => {
      const paragraphs: string[] = [];
      const listItems: string[] = [];
      
      // Separate paragraphs and list items
      section.content.forEach(item => {
        if (item.type === "paragraph" && item.content) {
          paragraphs.push(item.content);
        } else if (item.type === "list" && item.items) {
          listItems.push(...item.items);
        }
      });

      // Combine content for this section
      let combinedContent = "";
      
      // Add paragraphs first
      if (paragraphs.length > 0) {
        combinedContent = paragraphs.join("\n\n");
      }
      
      // Add list items as bullet points
      if (listItems.length > 0) {
        const bulletList = listItems.map(item => `• ${item}`).join("\n\n");
        if (combinedContent) {
          combinedContent += "\n\n" + bulletList;
        } else {
          combinedContent = bulletList;
        }
      }

      // Create a single slide for this section
      if (combinedContent) {
        slides.push({
          id: section.id,
          type: "content",
          title: section.title,
          content: combinedContent,
          slideNumber: slideNum++
        });
      }
    });
  } else if (sectionId === "methods-pathway" && journalData.methodsPathway) {
    // Create slides for the Methods / Learning Pathway section
    slides.push({
      id: "title-slide",
      type: "title",
      title: "Methods / Learning Pathway",
      subtitle: "AI, Ecology, and Economy in Human–Wildlife Conflict",
      author: journalData.author,
      slideNumber: 1
    });

    let slideNum = 2;
    
    journalData.methodsPathway.forEach((section) => {
      const paragraphs: string[] = [];
      const listItems: string[] = [];
      
      section.content.forEach(item => {
        if (item.type === "paragraph" && item.content) {
          paragraphs.push(item.content);
        } else if (item.type === "list" && item.items) {
          listItems.push(...item.items);
        }
      });

      let combinedContent = "";
      
      if (paragraphs.length > 0) {
        combinedContent = paragraphs.join("\n\n");
      }
      
      if (listItems.length > 0) {
        const bulletList = listItems.map(item => `• ${item}`).join("\n\n");
        if (combinedContent) {
          combinedContent += "\n\n" + bulletList;
        } else {
          combinedContent = bulletList;
        }
      }

      if (combinedContent) {
        slides.push({
          id: section.id,
          type: "content",
          title: section.title,
          content: combinedContent,
          slideNumber: slideNum++
        });
      }
    });
  } else if (sectionId?.startsWith("contribution-") && journalData.aiHubContributions) {
    const contributionId = sectionId.replace("contribution-", "");
    const contribution = journalData.aiHubContributions.find(c => c.id === contributionId);
    if (contribution) {
      if (contributionId === "ai-hub-demo") {
        // Demo script slides for the AI Inquiry Hub presentation
        slides.push({
          id: "title-slide",
          type: "title",
          title: "AI Inquiry Hub",
          subtitle: "A Living Learning Commons for Cohort Exploration",
          author: journalData.author,
          slideNumber: 1
        });
        slides.push({
          id: "slide-opening",
          type: "content",
          title: "Opening — Setting the Scene",
          content: "\"This is the AI Inquiry Hub — designed as a living learning commons for the cohort's exploration of AI across disciplines.\"\n\n• The Hub makes learning visible, shared, and accessible\n• It frames this as a reflective process rather than a purely technical one",
          slideNumber: 2
        });
        slides.push({
          id: "slide-what-this-is",
          type: "content",
          title: "Section 1 — What This Is",
          content: "• The homepage grounds the inquiry in shared values — curiosity, ethics, and collective wisdom\n\n• Participants are invited into a reflective process, not a prescriptive one\n\n• The design signals intention: this is not about AI adoption — it is about critical inquiry into AI",
          slideNumber: 3
        });
        slides.push({
          id: "slide-inquiry-journey",
          type: "content",
          title: "Section 2 — The Inquiry Journey",
          content: "• Structured across seven months — from framing and exploration to integration and presentation\n\n• Each phase outlines the focus, activities, and deliverables for that stage\n\n• Individual reflection and group collaboration are woven throughout the journey\n\n• The structure is consistent and easy to navigate",
          slideNumber: 4
        });
        slides.push({
          id: "slide-learning-commons",
          type: "content",
          title: "Section 3 — The Learning Commons (Core)",
          content: "• The heart of the Hub — where all cohort contributions live\n\n• Participants submit resources, reflections, and emerging questions through a shared form\n\n• Submissions are organized and displayed through shared folders and curated resources\n\n• Over time, this becomes a living repository of tools, insights, and questions from across the cohort",
          slideNumber: 5
        });
        slides.push({
          id: "slide-small-groups",
          type: "content",
          title: "Section 4 — Small Groups",
          content: "• Small groups are where most of the inquiry happens — peer dialogue drives the process\n\n• This page outlines group structure, participation expectations, and shared responsibilities\n\n• Dialogue and collaboration support thematic clustering around emerging patterns and tensions",
          slideNumber: 6
        });
        slides.push({
          id: "slide-closing",
          type: "content",
          title: "Section 5 — Closing Statement",
          content: "\"The Hub is designed to support both the process and the outcomes of the inquiry — making learning visible, shared, and accessible beyond the cohort.\"\n\n• Not just a website\n• A system. A learning model. A scalable digital commons.\n• That is why this matters.",
          slideNumber: 7
        });
        slides.push({
          id: "slide-delivery",
          type: "content",
          title: "Delivery Tips",
          content: "• Don't read — guide. You are narrating, not presenting slides\n\n• Move slowly — scrolling too fast creates confusion\n\n• Pause briefly between sections — signals confidence, not rushing\n\n• Timing: Opening 10s · Homepage 15s · Journey 20s · Commons 40s · Groups 10s · Close 10s\n\n• Total: approximately 1.5 minutes",
          slideNumber: 8
        });
        slides.push({
          id: "slide-qa",
          type: "content",
          title: "If They Ask — Be Ready",
          content: "\"How do contributions show up?\"\n→ Submitted through the form; captured in a shared structure — the connection is being finalized so everything appears seamlessly.\n\n\"Can this scale to the whole program?\"\n→ Yes — the structure is designed to expand beyond the cohort into a broader program resource.\n\n\"Who maintains it?\"\n→ Low-maintenance — once the contribution flow is finalized, updates happen naturally through submissions.",
          slideNumber: 9
        });
      } else {
        // Generic: generate slides from the contribution's own sections
        slides.push({
          id: "title-slide",
          type: "title",
          title: contribution.title,
          subtitle: contribution.resourceTitle,
          author: contribution.author,
          slideNumber: 1
        });
        let slideNum = 2;
        contribution.sections.forEach((section) => {
          const paragraphs: string[] = [];
          const listItems: string[] = [];
          section.content.forEach(item => {
            if (item.type === "paragraph" && item.content) {
              paragraphs.push(item.content);
            } else if (item.type === "list" && item.items) {
              listItems.push(...item.items);
            }
          });
          let combinedContent = paragraphs.join("\n\n");
          if (listItems.length > 0) {
            const bulletList = listItems.map(i => `• ${i}`).join("\n\n");
            combinedContent = combinedContent ? combinedContent + "\n\n" + bulletList : bulletList;
          }
          if (combinedContent) {
            slides.push({
              id: section.id,
              type: "content",
              title: section.title,
              content: combinedContent,
              slideNumber: slideNum++
            });
          }
        });
      }
    }
  } else {
    // Default: Introduction slides - group every 2-3 paragraphs together
    slides.push({
      id: "title-slide",
      type: "title",
      title: journalData.cohortTheme,
      subtitle: journalData.projectTitle,
      author: journalData.author,
      slideNumber: 1
    });

    // Group introduction paragraphs (2-3 per slide for better pacing)
    const introContent = journalData.introduction;
    const paragraphsPerSlide = 2;
    
    for (let i = 0; i < introContent.length; i += paragraphsPerSlide) {
      const group = introContent.slice(i, i + paragraphsPerSlide);
      const combinedContent = group.map(p => p.content).join("\n\n");
      
      slides.push({
        id: `intro-group-${i}`,
        type: "content",
        title: i === 0 ? "Introduction and Context" : undefined,
        content: combinedContent,
        slideNumber: Math.floor(i / paragraphsPerSlide) + 2
      });
    }
  }

  return slides;
}

const templateIcons = {
  forest: TreeDeciduous,
  nature: Mountain,
  minimal: Sun,
  bold: Waves,
  elegant: Leaf
};

const templateStyles = {
  forest: {
    titleBg: "bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900",
    contentBg: "bg-gradient-to-br from-emerald-50/80 to-teal-50/30 dark:from-emerald-950/40 dark:to-teal-950/20",
    accentBar: "from-emerald-500 via-teal-400 to-emerald-600",
    pattern: "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.08) 0%, transparent 40%)",
    badgeBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    footerIcon: "bg-gradient-to-br from-emerald-600 to-emerald-700"
  },
  nature: {
    titleBg: "bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700",
    contentBg: "bg-gradient-to-br from-amber-50/80 to-orange-50/30 dark:from-amber-950/40 dark:to-orange-950/20",
    accentBar: "from-amber-500 via-sky-400 to-orange-500",
    pattern: "radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(14, 165, 233, 0.08) 0%, transparent 40%)",
    badgeBg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    footerIcon: "bg-gradient-to-br from-amber-600 to-orange-600"
  },
  minimal: {
    titleBg: "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950",
    contentBg: "bg-gradient-to-br from-slate-50/80 to-gray-50/30 dark:from-slate-950/40 dark:to-gray-950/20",
    accentBar: "from-slate-500 via-slate-400 to-slate-600",
    pattern: "radial-gradient(circle at 50% 50%, rgba(100, 116, 139, 0.06) 0%, transparent 70%)",
    badgeBg: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
    footerIcon: "bg-gradient-to-br from-slate-700 to-slate-800"
  },
  bold: {
    titleBg: "bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900",
    contentBg: "bg-gradient-to-br from-blue-50/80 to-cyan-50/30 dark:from-blue-950/40 dark:to-cyan-950/20",
    accentBar: "from-blue-500 via-cyan-400 to-indigo-500",
    pattern: "radial-gradient(circle at 90% 90%, rgba(6, 182, 212, 0.12) 0%, transparent 50%), radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 40%)",
    badgeBg: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    footerIcon: "bg-gradient-to-br from-blue-600 to-indigo-700"
  },
  elegant: {
    titleBg: "bg-gradient-to-br from-green-600 via-green-700 to-green-800",
    contentBg: "bg-gradient-to-br from-green-50/80 to-lime-50/30 dark:from-green-950/40 dark:to-lime-950/20",
    accentBar: "from-green-500 via-lime-400 to-green-600",
    pattern: "radial-gradient(circle at 10% 30%, rgba(132, 204, 22, 0.10) 0%, transparent 50%), radial-gradient(circle at 85% 70%, rgba(34, 197, 94, 0.08) 0%, transparent 40%)",
    badgeBg: "bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20",
    footerIcon: "bg-gradient-to-br from-green-600 to-green-700"
  }
};

type ContentBlock =
  | { type: "bullets"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "qa"; question: string; answer: string }
  | { type: "paragraph"; text: string };

function parseSlideContent(raw: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      blocks.push({ type: "bullets", items: [...bulletBuffer] });
      bulletBuffer = [];
    }
  };

  for (const block of raw.split("\n\n").filter(b => b.trim())) {
    const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
    if (!lines.length) continue;

    // Q&A: question line + arrow answer on next line
    if (lines.length >= 2 && (lines[0].startsWith('"') || lines[0].startsWith('\u201c')) && lines[1].startsWith("→")) {
      flushBullets();
      blocks.push({
        type: "qa",
        question: lines[0].replace(/^["\u201c]|["\u201d]$/g, "").trim(),
        answer: lines[1].replace(/^→\s*/, "").trim()
      });
    }
    // All-bullet block
    else if (lines.every(l => l.startsWith("•"))) {
      lines.forEach(l => bulletBuffer.push(l.replace(/^•\s*/, "")));
    }
    // Quote block
    else if (lines[0].startsWith('"') || lines[0].startsWith('\u201c')) {
      flushBullets();
      blocks.push({ type: "quote", text: block.replace(/^["\u201c]|["\u201d]$/g, "").trim() });
    }
    // Mixed: bullets + other text
    else if (lines.some(l => l.startsWith("•"))) {
      flushBullets();
      const textLines = lines.filter(l => !l.startsWith("•")).join(" ");
      const bulletLines = lines.filter(l => l.startsWith("•")).map(l => l.replace(/^•\s*/, ""));
      if (textLines) blocks.push({ type: "paragraph", text: textLines });
      if (bulletLines.length) blocks.push({ type: "bullets", items: bulletLines });
    }
    // Plain paragraph
    else {
      flushBullets();
      blocks.push({ type: "paragraph", text: block.trim() });
    }
  }

  flushBullets();
  return blocks;
}

function RichSlideLayout({
  content,
  title,
  style,
  imageQuery,
  slideIndex,
}: {
  content: string;
  title?: string;
  style: typeof templateStyles[keyof typeof templateStyles];
  imageQuery?: string;
  slideIndex: number;
}) {
  const blocks = parseSlideContent(content);
  const bullets = blocks.flatMap(b => b.type === "bullets" ? b.items : []);
  const otherBlocks = blocks.filter(b => b.type !== "bullets");
  const imageUrl = imageQuery
    ? `https://source.unsplash.com/400x400/?${encodeURIComponent(imageQuery)}&sig=${slideIndex}`
    : null;

  return (
    <div className="flex-1 flex flex-col gap-3 md:gap-5 overflow-hidden min-h-0">
      {/* Bold large title */}
      {title && (
        <h2 className="font-black text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase tracking-tight text-foreground leading-none shrink-0">
          {title}
        </h2>
      )}

      {/* Two-column: image left, content right */}
      <div className="flex-1 flex gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left: circular image */}
        <div className="relative shrink-0 flex flex-col items-center justify-center w-28 md:w-36 lg:w-44">
          {/* Dot grid behind image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
            <svg width="100%" height="100%">
              <pattern id={`dotgrid-${slideIndex}`} width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="currentColor" className="text-foreground/40" />
              </pattern>
              <rect width="100%" height="100%" fill={`url(#dotgrid-${slideIndex})`} />
            </svg>
          </div>
          {/* Circular image */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-xl border-[3px] border-white/70 dark:border-white/20 bg-muted z-10">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={imageQuery}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center");
                }}
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${style.titleBg} flex items-center justify-center`}>
                <Sparkles className="h-8 w-8 text-white/50" />
              </div>
            )}
          </div>
        </div>

        {/* Right: content */}
        <div className="flex-1 flex flex-col gap-2 md:gap-3 overflow-y-auto min-h-0">
          {/* Bullets as icon chips */}
          {bullets.map((item, j) => (
            <div key={j} className="flex items-start gap-3">
              <div className={`h-8 w-8 md:h-9 md:w-9 rounded-full ${style.footerIcon} flex items-center justify-center shrink-0 shadow-sm mt-0.5`}>
                <span className="text-white text-[10px] md:text-xs font-bold">{String(j + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex-1 py-1">
                <p className="font-serif text-sm md:text-base leading-snug text-foreground/85">{item}</p>
              </div>
            </div>
          ))}
          {/* Other blocks (quotes, Q&A, paragraphs) */}
          {otherBlocks.map((block, i) => {
            if (block.type === "quote") {
              return (
                <div key={i} className="relative pl-4 border-l-[3px] border-primary/60 py-1">
                  <span className="absolute -top-2 left-2 text-4xl text-primary/10 font-serif leading-none select-none">&ldquo;</span>
                  <p className="font-serif text-sm md:text-base italic leading-relaxed text-foreground/75 pt-3">{block.text}</p>
                </div>
              );
            }
            if (block.type === "qa") {
              return (
                <div key={i} className="rounded-lg overflow-hidden border border-border/40 shadow-sm">
                  <div className="bg-primary/8 dark:bg-primary/10 px-3 py-2 flex items-start gap-2 border-b border-border/20">
                    <MessageCircleQuestion className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    <p className="font-serif text-xs md:text-sm font-semibold italic text-foreground">{block.question}</p>
                  </div>
                  <div className="px-3 py-2 flex items-start gap-2 bg-card/40">
                    <ArrowRight className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <p className="font-serif text-xs md:text-sm text-foreground/80 leading-relaxed">{block.answer}</p>
                  </div>
                </div>
              );
            }
            return (
              <p key={i} className="font-serif text-sm md:text-base leading-relaxed text-foreground/85">{block.text}</p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function PresentationView({ template, onClose, onChangeTemplate, section }: PresentationViewProps) {
  const [slides, setSlides] = useState<Slide[]>(createSlides(section));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAI, setShowAI] = useState(true);
  const [showMobileAI, setShowMobileAI] = useState(false);
  const [insight, setInsight] = useState<SlideInsight | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [insightCache, setInsightCache] = useState<Record<number, SlideInsight>>({});
  const [headingCache, setHeadingCache] = useState<Record<number, string>>({});
  const [imageCache, setImageCache] = useState<Record<number, string>>({});

  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;
  const style = templateStyles[template];
  const Icon = templateIcons[template];
  const templateInfo = templates.find(t => t.id === template)!;

  // Regenerate slides when section changes
  useEffect(() => {
    setSlides(createSlides(section));
    setCurrentSlide(0);
    setInsightCache({});
    setHeadingCache({});
    setImageCache({});
  }, [section]);

  useEffect(() => {
    const slideIndex = currentSlide;
    const currentSlideData = slides[slideIndex];
    
    if (currentSlideData.type === "content" && showAI) {
      if (insightCache[slideIndex]) {
        setInsight(insightCache[slideIndex]);
        const cached = insightCache[slideIndex];
        if (cached.imageQuery && !imageCache[slideIndex]) {
          setImageCache(prev => ({ ...prev, [slideIndex]: cached.imageQuery! }));
        }
      } else {
        fetchInsight();
      }
      // Also fetch AI heading if not cached
      if (!headingCache[slideIndex] && currentSlideData.content) {
        fetchHeadingForSlide(slideIndex, currentSlideData.content);
      }
    } else {
      setInsight(null);
    }
  }, [currentSlide, showAI]);

  const fetchHeadingForSlide = async (slideIndex: number, content: string) => {
    try {
      const response = await apiRequest("POST", "/api/presentation/generate-heading", {
        content: content,
        slideNumber: slideIndex + 1,
        projectTitle: journalData.projectTitle
      });
      const result = await response.json();
      if (result.heading) {
        setHeadingCache(prev => ({ ...prev, [slideIndex]: result.heading }));
        setSlides(prevSlides => 
          prevSlides.map((s, i) => 
            i === slideIndex ? { ...s, aiHeading: result.heading } : s
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch heading:", error);
    }
  };

  const fetchInsight = async () => {
    if (!slide.content) return;
    
    setIsLoadingInsight(true);
    try {
      const response = await apiRequest("POST", "/api/presentation/enhance-slide", {
        content: slide.content,
        slideNumber: currentSlide + 1,
        totalSlides: slides.length,
        projectTitle: journalData.projectTitle,
        cohortTheme: journalData.cohortTheme
      });
      const result: SlideInsight = await response.json();
      setInsight(result);
      setInsightCache(prev => ({ ...prev, [currentSlide]: result }));
      if (result.imageQuery) {
        setImageCache(prev => ({ ...prev, [currentSlide]: result.imageQuery! }));
      }
    } catch (error) {
      console.error("Failed to fetch insight:", error);
    } finally {
      setIsLoadingInsight(false);
    }
  };

  const goToNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      goToNext();
    } else if (e.key === "ArrowLeft") {
      goToPrev();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-muted/50 flex flex-col h-[100dvh]"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-testid="presentation-view"
    >
      <header className="flex items-center justify-between px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b bg-card/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-full ${style.footerIcon} flex items-center justify-center`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <span className="font-serif font-medium hidden sm:inline">{templateInfo.name}</span>
          <Badge variant="outline" className="font-mono text-xs">
            {currentSlide + 1} / {slides.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm"
            variant={showAI ? "default" : "outline"}
            onClick={() => {
              if (window.innerWidth < 1024) {
                setShowMobileAI(true);
              } else {
                setShowAI(!showAI);
              }
            }}
            className="gap-2"
            data-testid="button-toggle-ai"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI Insights</span>
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={onChangeTemplate}
            title="Change template"
            data-testid="button-change-template"
          >
            <Palette className="h-4 w-4" />
          </Button>
          <ShareExportControls
            type="presentation"
            project="edd-inquiry"
            title={journalData.cohortTheme}
            content={slides}
            slides={slides}
            template={template}
          />
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={toggleFullscreen}
            data-testid="button-fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            data-testid="button-exit-presentation"
          >
            Exit
          </Button>
        </div>
      </header>

      <div className="h-1 bg-muted overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${style.accentBar} transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex-1 flex items-stretch p-2 sm:p-4 md:p-8 overflow-hidden gap-4 md:gap-6 min-h-0">
        <div className={`flex-1 flex items-center justify-center ${showAI && slide.type === "content" ? "lg:flex-[2]" : ""}`}>
          {slide.type === "title" ? (
            <Card className={`w-full max-w-5xl md:aspect-[16/9] h-full md:h-auto max-h-full relative overflow-hidden border-0 shadow-2xl ${style.titleBg}`}>
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <Icon className="w-full h-full text-white" />
              </div>
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 md:p-16 text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center h-20 w-20 md:h-28 md:w-28 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                    <Icon className="h-10 w-10 md:h-14 md:w-14 text-white" />
                  </div>
                </div>
                
                <Badge className="bg-white/20 text-white border-white/30 mb-6 text-xs uppercase tracking-widest">
                  EdD Cohort 2026
                </Badge>
                
                <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-4xl">
                  {slide.title}
                </h1>
                
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mb-6" />
                
                <h2 className="font-serif text-lg md:text-xl lg:text-2xl text-white/90 italic max-w-3xl">
                  {slide.subtitle}
                </h2>
                
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p className="text-white/70 font-medium">{slide.author}</p>
                </div>
              </div>
            </Card>
          ) : (
            <Card
              className={`w-full max-w-5xl h-full max-h-full relative overflow-hidden border-0 shadow-2xl flex flex-col`}
              style={{ background: style.pattern + ", hsl(var(--card))" }}
            >
              {/* Top gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${style.accentBar} z-20`} />

              {/* ── Geometric corner decorations ── */}
              {/* Top-left: two stacked accent rectangles */}
              <div className="absolute top-4 left-4 pointer-events-none z-10">
                <div className={`w-16 md:w-20 h-3 rounded-sm bg-gradient-to-r ${style.accentBar} opacity-60 mb-1`} />
                <div className={`w-10 md:w-12 h-3 rounded-sm bg-gradient-to-r ${style.accentBar} opacity-30`} />
              </div>
              {/* Top-right: concentric arcs */}
              <div className="absolute top-4 right-4 pointer-events-none z-10 opacity-20">
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                  <path d="M 52 0 A 52 52 0 0 1 0 52" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M 40 0 A 40 40 0 0 1 0 40" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M 28 0 A 28 28 0 0 1 0 28" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              {/* Bottom-left: small concentric arcs */}
              <div className="absolute bottom-10 left-4 pointer-events-none z-10 opacity-15">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M 0 40 A 40 40 0 0 1 40 0" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M 0 28 A 28 28 0 0 1 28 0" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              {/* Bottom-right: slide number + two bars */}
              <div className="absolute bottom-10 right-4 pointer-events-none z-10 flex flex-col items-end gap-1">
                <span className="font-mono text-lg md:text-xl font-black text-foreground/10 leading-none">
                  {String(currentSlide + 1).padStart(2, "0")}
                </span>
                <div className="flex gap-1">
                  <div className={`h-1.5 w-8 rounded-full bg-gradient-to-r ${style.accentBar} opacity-40`} />
                  <div className={`h-1.5 w-5 rounded-full bg-gradient-to-r ${style.accentBar} opacity-20`} />
                </div>
              </div>

              {/* AI heading badge */}
              {(slide.aiHeading || headingCache[currentSlide]) && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                  <Badge className={`${style.badgeBg} uppercase tracking-widest text-[10px] shadow-sm`}>
                    {slide.aiHeading || headingCache[currentSlide]}
                  </Badge>
                </div>
              )}

              {/* Main content */}
              <div className="relative z-10 flex-1 flex flex-col p-5 md:p-8 lg:p-10 pt-12 md:pt-14 overflow-hidden">
                <RichSlideLayout
                  content={slide.content || ""}
                  title={slide.title}
                  style={style}
                  imageQuery={imageCache[currentSlide]}
                  slideIndex={currentSlide}
                />

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border/20 mt-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className={`h-6 w-6 rounded-full ${style.footerIcon} flex items-center justify-center`}>
                      <Icon className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{journalData.author}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground/40 uppercase tracking-widest font-mono">EdD · 2026</span>
                </div>
              </div>
            </Card>
          )}
        </div>

        {showAI && slide.type === "content" && (
          <div className="hidden lg:flex flex-col flex-1 max-w-sm gap-4">
            <Card className="p-5 flex-1 flex flex-col gap-5 overflow-auto border shadow-lg bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl ${style.footerIcon} flex items-center justify-center`}>
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-foreground">AI Insights</h3>
                  <p className="text-xs text-muted-foreground">Powered by intelligence</p>
                </div>
              </div>

              {isLoadingInsight ? (
                <div className="space-y-5 flex-1">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-20 w-full rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                  </div>
                </div>
              ) : insight ? (
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                      <div className="h-6 w-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Lightbulb className="h-3.5 w-3.5" />
                      </div>
                      Key Insight
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20 p-4 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {insight.keyInsight}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Link2 className="h-3.5 w-3.5" />
                      </div>
                      Thematic Connection
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/20 p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {insight.thematicConnection}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
                      <div className="h-6 w-6 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        <MessageCircleQuestion className="h-3.5 w-3.5" />
                      </div>
                      Discussion Question
                    </div>
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/20 p-4 rounded-xl border border-violet-200/50 dark:border-violet-800/30">
                      <p className="text-sm text-foreground/85 leading-relaxed italic">
                        {insight.discussionQuestion}
                      </p>
                    </div>
                  </div>

                  {insight.inquiryGuidance && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400">
                        <div className="h-6 w-6 rounded-lg bg-sky-500/10 flex items-center justify-center">
                          <Compass className="h-3.5 w-3.5" />
                        </div>
                        Inquiry Pathways
                      </div>
                      <div className="bg-gradient-to-br from-sky-50 to-cyan-50/50 dark:from-sky-950/30 dark:to-cyan-950/20 p-4 rounded-xl border border-sky-200/50 dark:border-sky-800/30">
                        <p className="text-sm text-foreground/85 leading-relaxed">
                          {insight.inquiryGuidance}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <Button onClick={fetchInsight} variant="outline" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate Insights
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}
      </main>

      <footer className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 border-t bg-card/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <Button
            variant="outline"
            onClick={goToPrev}
            disabled={currentSlide === 0}
            className="gap-2"
            data-testid="button-prev-slide"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex items-center gap-1.5 sm:gap-2 max-w-[40%] flex-wrap justify-center">
            {slides.length <= 10 ? slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide 
                    ? `w-4 sm:w-6 h-2 rounded-full ${style.footerIcon}` 
                    : "w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                data-testid={`slide-indicator-${index}`}
              />
            )) : (
              <span className="text-sm text-muted-foreground font-medium">
                {currentSlide + 1} / {slides.length}
              </span>
            )}
          </div>

          <Button
            variant="outline"
            onClick={goToNext}
            disabled={currentSlide === slides.length - 1}
            className="gap-2"
            data-testid="button-next-slide"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </footer>

      <Sheet open={showMobileAI} onOpenChange={setShowMobileAI}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-xl overflow-hidden flex flex-col p-0">
          <SheetHeader className="px-4 py-3 border-b shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-lg ${style.footerIcon} flex items-center justify-center`}>
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <SheetTitle className="font-serif">AI Insights</SheetTitle>
              </div>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {isLoadingInsight ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-20 w-full rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-16 w-full rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-16 w-full rounded-xl" />
                </div>
              </div>
            ) : insight ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                    <div className="h-6 w-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <Lightbulb className="h-3.5 w-3.5" />
                    </div>
                    Key Insight
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20 p-4 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
                    <p className="text-sm text-foreground/85 leading-relaxed">
                      {insight.keyInsight}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Link2 className="h-3.5 w-3.5" />
                    </div>
                    Thematic Connection
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/20 p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
                    <p className="text-sm text-foreground/85 leading-relaxed">
                      {insight.thematicConnection}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
                    <div className="h-6 w-6 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <MessageCircleQuestion className="h-3.5 w-3.5" />
                    </div>
                    Discussion Question
                  </div>
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/20 p-4 rounded-xl border border-violet-200/50 dark:border-violet-800/30">
                    <p className="text-sm text-foreground/85 leading-relaxed italic">
                      {insight.discussionQuestion}
                    </p>
                  </div>
                </div>

                {insight.inquiryGuidance && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400">
                      <div className="h-6 w-6 rounded-lg bg-sky-500/10 flex items-center justify-center">
                        <Compass className="h-3.5 w-3.5" />
                      </div>
                      Inquiry Pathways
                    </div>
                    <div className="bg-gradient-to-br from-sky-50 to-cyan-50/50 dark:from-sky-950/30 dark:to-cyan-950/20 p-4 rounded-xl border border-sky-200/50 dark:border-sky-800/30">
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {insight.inquiryGuidance}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center py-12">
                <Button onClick={fetchInsight} variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Insights
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
