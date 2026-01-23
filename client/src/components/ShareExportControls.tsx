import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Share2, 
  Download, 
  Copy, 
  Check, 
  Loader2,
  Link2,
  FileDown
} from "lucide-react";

interface ShareExportControlsProps {
  type: 'presentation' | 'audio';
  project: 'edd-inquiry' | 'quasi-qualitative' | 'portfolio' | 'integrated-essay';
  title: string;
  content: any;
  slides?: any[];
  template?: string;
  variant?: 'icon' | 'full';
  className?: string;
}

export function ShareExportControls({ 
  type, 
  project, 
  title, 
  content,
  slides,
  template,
  variant = 'icon',
  className = ""
}: ShareExportControlsProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCreateShareLink = async () => {
    setIsCreating(true);
    try {
      const shareContent = type === 'presentation' 
        ? { slides: slides || content, template: template || 'forest-canopy' }
        : content;

      const response = await fetch("/api/share/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          project,
          title,
          content: shareContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create share link");
      }

      const data = await response.json();
      setShareUrl(data.fullUrl);
      setShareDialogOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create share link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const handleExportHTML = () => {
    if (!slides || slides.length === 0) {
      toast({
        title: "Export failed",
        description: "No slides available to export.",
        variant: "destructive",
      });
      return;
    }

    const htmlContent = generatePresentationHTML(title, slides, template || 'forest-canopy');
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-presentation.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export complete",
      description: "Presentation downloaded as HTML file.",
    });
  };

  return (
    <>
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          variant="ghost"
          size={variant === 'icon' ? 'icon' : 'sm'}
          onClick={handleCreateShareLink}
          disabled={isCreating}
          title="Create share link"
          data-testid="button-share"
        >
          {isCreating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              {variant === 'full' && <span className="ml-2">Share</span>}
            </>
          )}
        </Button>

        {type === 'presentation' && slides && (
          <Button
            variant="ghost"
            size={variant === 'icon' ? 'icon' : 'sm'}
            onClick={handleExportHTML}
            title="Download as HTML"
            data-testid="button-export-html"
          >
            <FileDown className="h-4 w-4" />
            {variant === 'full' && <span className="ml-2">Export</span>}
          </Button>
        )}
      </div>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Share Link Created
            </DialogTitle>
            <DialogDescription>
              Anyone with this link can view this {type} without needing an access code.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-2">
            <Input 
              value={shareUrl || ''} 
              readOnly 
              className="flex-1"
              data-testid="input-share-url"
            />
            <Button 
              size="icon" 
              onClick={handleCopyLink}
              data-testid="button-copy-link"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            This link will remain active as long as the server is running.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}

function generatePresentationHTML(title: string, slides: any[], template: string): string {
  const templateStyles: Record<string, { bg: string; text: string; accent: string }> = {
    'forest-canopy': { bg: 'linear-gradient(135deg, #064e3b, #065f46, #0f766e)', text: '#ffffff', accent: '#10b981' },
    'teal': { bg: 'linear-gradient(135deg, #0f172a, #1e293b, #134e4a)', text: '#ffffff', accent: '#5eead4' },
    'academic': { bg: 'linear-gradient(135deg, #0f172a, #1e3a5f, #1e293b)', text: '#ffffff', accent: '#93c5fd' },
    'forest': { bg: 'linear-gradient(135deg, #0f172a, #064e3b, #1e293b)', text: '#ffffff', accent: '#6ee7b7' },
    'minimal': { bg: 'linear-gradient(135deg, #f1f5f9, #ffffff, #f8fafc)', text: '#0f172a', accent: '#475569' },
    'sunset': { bg: 'linear-gradient(135deg, #0f172a, #78350f, #1e293b)', text: '#ffffff', accent: '#fcd34d' },
    'earth-sky': { bg: 'linear-gradient(135deg, #b45309, #ea580c, #be123c)', text: '#ffffff', accent: '#fbbf24' },
    'clean-scholar': { bg: 'linear-gradient(135deg, #f1f5f9, #e2e8f0, #f8fafc)', text: '#0f172a', accent: '#2563eb' },
    'ocean-deep': { bg: 'linear-gradient(135deg, #1e3a8a, #3730a3, #0f172a)', text: '#ffffff', accent: '#22d3ee' },
    'botanical-garden': { bg: 'linear-gradient(135deg, #4d7c0f, #059669, #0f766e)', text: '#ffffff', accent: '#bef264' },
  };

  const style = templateStyles[template] || templateStyles['forest-canopy'];

  const slideHTML = slides.map((slide, i) => `
    <div class="slide" id="slide-${i}" ${i > 0 ? 'style="display: none;"' : ''}>
      <h1>${slide.heading || slide.title || `Slide ${i + 1}`}</h1>
      <div class="content">${(slide.content || '').replace(/\n/g, '<br/>')}</div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Presentation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: ${style.bg};
      color: ${style.text};
      min-height: 100vh;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .slide {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 2rem;
    }
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 2rem;
      line-height: 1.2;
    }
    .content {
      font-size: 1.25rem;
      line-height: 1.8;
      max-width: 800px;
      opacity: 0.9;
    }
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,0.3);
    }
    button {
      background: ${style.accent};
      color: #000;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 500;
    }
    button:hover { opacity: 0.9; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .dots {
      display: flex;
      gap: 0.5rem;
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255,255,255,0.4);
      cursor: pointer;
    }
    .dot.active { background: ${style.accent}; }
    .footer {
      text-align: center;
      padding: 1rem;
      font-size: 0.875rem;
      opacity: 0.6;
    }
  </style>
</head>
<body>
  <div class="container">
    ${slideHTML}
  </div>
  <div class="nav">
    <button id="prev" onclick="navigate(-1)">Previous</button>
    <div class="dots" id="dots"></div>
    <button id="next" onclick="navigate(1)">Next</button>
  </div>
  <div class="footer">Exported from Praxis Nexus</div>
  <script>
    const totalSlides = ${slides.length};
    let current = 0;
    
    function updateDots() {
      const dots = document.getElementById('dots');
      dots.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === current ? ' active' : '');
        dot.onclick = () => goTo(i);
        dots.appendChild(dot);
      }
    }
    
    function goTo(n) {
      document.getElementById('slide-' + current).style.display = 'none';
      current = n;
      document.getElementById('slide-' + current).style.display = 'flex';
      document.getElementById('prev').disabled = current === 0;
      document.getElementById('next').disabled = current === totalSlides - 1;
      updateDots();
    }
    
    function navigate(dir) {
      const next = current + dir;
      if (next >= 0 && next < totalSlides) goTo(next);
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    });
    
    updateDots();
    document.getElementById('prev').disabled = true;
    if (totalSlides <= 1) document.getElementById('next').disabled = true;
  </script>
</body>
</html>`;
}
