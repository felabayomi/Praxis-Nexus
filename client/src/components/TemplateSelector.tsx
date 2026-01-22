import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  TreeDeciduous, 
  Mountain, 
  Waves,
  Sun,
  Check,
  Play,
  X
} from "lucide-react";

export type TemplateStyle = "forest" | "nature" | "minimal" | "bold" | "elegant";

interface TemplateSelectorProps {
  onSelect: (template: TemplateStyle) => void;
  onClose: () => void;
}

interface TemplateOption {
  id: TemplateStyle;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
  };
  icon: typeof Leaf;
  preview: {
    titleBg: string;
    contentBg: string;
    pattern: string;
  };
}

const templates: TemplateOption[] = [
  {
    id: "forest",
    name: "Forest Canopy",
    description: "Deep forest greens with organic patterns and leaf motifs",
    colors: {
      primary: "from-emerald-700 to-emerald-900",
      secondary: "from-emerald-600/20 to-teal-600/10",
      accent: "bg-amber-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30"
    },
    icon: TreeDeciduous,
    preview: {
      titleBg: "bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900",
      contentBg: "bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/20",
      pattern: "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)"
    }
  },
  {
    id: "nature",
    name: "Earth & Sky",
    description: "Warm earth tones meeting sky blue, inspired by landscapes",
    colors: {
      primary: "from-amber-600 to-orange-700",
      secondary: "from-sky-500/20 to-amber-500/10",
      accent: "bg-sky-500",
      bg: "bg-amber-50 dark:bg-amber-950/30"
    },
    icon: Mountain,
    preview: {
      titleBg: "bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700",
      contentBg: "bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20",
      pattern: "radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)"
    }
  },
  {
    id: "minimal",
    name: "Clean Scholar",
    description: "Minimalist black and white with subtle gray accents",
    colors: {
      primary: "from-slate-800 to-slate-900",
      secondary: "from-slate-100 to-slate-50",
      accent: "bg-slate-600",
      bg: "bg-slate-50 dark:bg-slate-950/30"
    },
    icon: Sun,
    preview: {
      titleBg: "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950",
      contentBg: "bg-gradient-to-br from-slate-50 to-gray-50/50 dark:from-slate-950/30 dark:to-gray-950/20",
      pattern: "radial-gradient(circle at 50% 50%, rgba(100, 116, 139, 0.08) 0%, transparent 70%)"
    }
  },
  {
    id: "bold",
    name: "Ocean Deep",
    description: "Deep blues and teals evoking marine conservation themes",
    colors: {
      primary: "from-blue-700 to-indigo-900",
      secondary: "from-cyan-500/20 to-blue-500/10",
      accent: "bg-cyan-400",
      bg: "bg-blue-50 dark:bg-blue-950/30"
    },
    icon: Waves,
    preview: {
      titleBg: "bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900",
      contentBg: "bg-gradient-to-br from-blue-50 to-cyan-50/50 dark:from-blue-950/30 dark:to-cyan-950/20",
      pattern: "radial-gradient(circle at 90% 90%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)"
    }
  },
  {
    id: "elegant",
    name: "Botanical Garden",
    description: "Soft sage greens with floral elegance and gold accents",
    colors: {
      primary: "from-green-600 to-green-800",
      secondary: "from-lime-500/15 to-green-500/10",
      accent: "bg-yellow-500",
      bg: "bg-green-50 dark:bg-green-950/30"
    },
    icon: Leaf,
    preview: {
      titleBg: "bg-gradient-to-br from-green-600 via-green-700 to-green-800",
      contentBg: "bg-gradient-to-br from-green-50 to-lime-50/50 dark:from-green-950/30 dark:to-lime-950/20",
      pattern: "radial-gradient(circle at 10% 30%, rgba(132, 204, 22, 0.12) 0%, transparent 50%)"
    }
  }
];

export function TemplateSelector({ onSelect, onClose }: TemplateSelectorProps) {
  const [selected, setSelected] = useState<TemplateStyle>("forest");
  const selectedTemplate = templates.find(t => t.id === selected)!;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col" data-testid="template-selector">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h2 className="font-serif text-xl font-semibold">Choose Presentation Style</h2>
          <p className="text-sm text-muted-foreground">Select a visual theme for your slides</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-templates">
          <X className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Templates</h3>
            <div className="grid gap-3">
              {templates.map((template) => {
                const Icon = template.icon;
                const isSelected = selected === template.id;
                return (
                  <Card
                    key={template.id}
                    className={`p-4 cursor-pointer transition-all hover-elevate ${
                      isSelected ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelected(template.id)}
                    data-testid={`template-option-${template.id}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-xl ${template.preview.titleBg} flex items-center justify-center shrink-0`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{template.name}</h4>
                          {isSelected && (
                            <Badge variant="default" className="h-5">
                              <Check className="h-3 w-3 mr-1" />
                              Selected
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{template.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Preview</h3>
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <div className={`aspect-video ${selectedTemplate.preview.titleBg} relative`}>
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id="preview-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.3" opacity="0.4"/>
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#preview-grid)" />
                    </svg>
                  </div>
                  <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                    <selectedTemplate.icon className="w-full h-full text-white" />
                  </div>
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
                      <selectedTemplate.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 text-[10px] uppercase tracking-widest mb-3">
                      EdD Cohort 2026
                    </Badge>
                    <h4 className="font-serif text-lg font-bold text-white leading-tight mb-2">
                      AI's Ecological Entanglements
                    </h4>
                    <div className="w-12 h-px bg-white/40 mb-2" />
                    <p className="text-xs text-white/80 italic">Conservation & Human-Wildlife Relations</p>
                  </div>
                </div>
                <div className="text-center py-2 bg-muted/50 text-xs text-muted-foreground">Title Slide</div>
              </Card>

              <Card className="overflow-hidden">
                <div 
                  className={`aspect-video ${selectedTemplate.preview.contentBg} relative border-t-4`}
                  style={{ 
                    borderImage: `linear-gradient(to right, ${selectedTemplate.id === 'minimal' ? '#64748b, #94a3b8' : selectedTemplate.id === 'nature' ? '#d97706, #0ea5e9' : selectedTemplate.id === 'bold' ? '#0284c7, #06b6d4' : selectedTemplate.id === 'elegant' ? '#16a34a, #84cc16' : '#059669, #14b8a6'}) 1`,
                    background: selectedTemplate.preview.pattern + ", " + (selectedTemplate.preview.contentBg.includes('dark:') ? 'hsl(var(--card))' : '')
                  }}
                >
                  <div className="absolute top-4 right-4 opacity-5">
                    <selectedTemplate.icon className="h-20 w-20" />
                  </div>
                  <div className="relative z-10 h-full flex flex-col p-6">
                    <Badge variant="outline" className="w-fit text-[10px] uppercase tracking-wider mb-3">
                      Introduction
                    </Badge>
                    <div className="flex-1 flex items-center">
                      <p className="font-serif text-sm leading-relaxed text-foreground/80 line-clamp-4">
                        This inquiry examines how AI reconfigures human-wildlife relations within conservation practices, 
                        exploring the ecological, economic, and ethical entanglements of intelligent systems...
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/50 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className={`h-5 w-5 rounded-full ${selectedTemplate.preview.titleBg} flex items-center justify-center`}>
                          <selectedTemplate.icon className="h-2.5 w-2.5 text-white" />
                        </div>
                        <span className="text-[10px] text-muted-foreground">Felix Abayomi</span>
                      </div>
                      <span className="font-mono text-xs font-bold opacity-60">02</span>
                    </div>
                  </div>
                </div>
                <div className="text-center py-2 bg-muted/50 text-xs text-muted-foreground">Content Slide</div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-6 py-4 border-t bg-card/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-medium text-foreground">{selectedTemplate.name}</span>
          </p>
          <Button onClick={() => onSelect(selected)} className="gap-2" data-testid="button-start-presentation">
            <Play className="h-4 w-4" />
            Start Presentation
          </Button>
        </div>
      </footer>
    </div>
  );
}

export { templates };
export type { TemplateOption };
