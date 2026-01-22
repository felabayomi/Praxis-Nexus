import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { JournalSidebar } from "@/components/JournalSidebar";
import { JournalContent } from "@/components/JournalContent";
import { PresentationView } from "@/components/PresentationView";
import { TemplateSelector, TemplateStyle } from "@/components/TemplateSelector";
import { SearchDialog } from "@/components/SearchDialog";
import { AuthorModal } from "@/components/AuthorModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Leaf, Search, Printer, Home as HomeIcon } from "lucide-react";
import Landing from "./Landing";

const TEMPLATE_STORAGE_KEY = "ai-inquiry-preferred-template";
const JOURNAL_ENTERED_KEY = "praxis-nexus-journal-entered";
const JOURNAL_REMEMBER_KEY = "praxis-nexus-remember-access";

export default function Home() {
  const [showLanding, setShowLanding] = useState(() => {
    // Check localStorage first for "remember me" persistent access
    if (localStorage.getItem(JOURNAL_REMEMBER_KEY)) {
      return false;
    }
    // Then check session storage for current session
    return !sessionStorage.getItem(JOURNAL_ENTERED_KEY);
  });
  const [activeSection, setActiveSection] = useState("welcome");
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateStyle>("forest");
  const [hasPreference, setHasPreference] = useState(false);
  const [showInfoCenter, setShowInfoCenter] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(TEMPLATE_STORAGE_KEY);
    if (saved && ["forest", "nature", "minimal", "bold", "elegant"].includes(saved)) {
      setSelectedTemplate(saved as TemplateStyle);
      setHasPreference(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleSearchNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const sidebarStyle = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "3.5rem",
  };

  const handleOpenPresentation = () => {
    if (hasPreference) {
      setShowPresentation(true);
    } else {
      setShowTemplateSelector(true);
    }
  };

  const handleSelectTemplate = (template: TemplateStyle) => {
    setSelectedTemplate(template);
    localStorage.setItem(TEMPLATE_STORAGE_KEY, template);
    setHasPreference(true);
    setShowTemplateSelector(false);
    setShowPresentation(true);
  };

  const handleChangeTemplate = () => {
    setShowPresentation(false);
    setShowTemplateSelector(true);
  };

  const handleClosePresentation = () => {
    setShowPresentation(false);
  };

  const handleEnterJournal = (rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem(JOURNAL_REMEMBER_KEY, "true");
    }
    sessionStorage.setItem(JOURNAL_ENTERED_KEY, "true");
    setShowLanding(false);
  };

  const handleBackToLanding = () => {
    sessionStorage.removeItem(JOURNAL_ENTERED_KEY);
    // Don't clear localStorage - keep "remember me" access persistent
    setShowLanding(true);
  };

  if (showLanding) {
    return <Landing onEnterJournal={handleEnterJournal} />;
  }

  if (showTemplateSelector) {
    return (
      <TemplateSelector 
        onSelect={handleSelectTemplate} 
        onClose={() => setShowTemplateSelector(false)}
        currentTemplate={selectedTemplate}
      />
    );
  }

  if (showPresentation) {
    return (
      <PresentationView 
        template={selectedTemplate}
        onClose={handleClosePresentation}
        onChangeTemplate={handleChangeTemplate}
      />
    );
  }

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <JournalSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onOpenInfoCenter={() => setShowInfoCenter(true)}
        />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center justify-between gap-2 px-3 sm:px-4 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 print:hidden">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <Separator orientation="vertical" className="h-5" />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToLanding}
                title="Back to landing page"
                data-testid="button-home"
              >
                <HomeIcon className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 min-w-0">
                <Leaf className="h-4 w-4 text-primary shrink-0" />
                <span className="font-serif text-sm font-medium truncate" data-testid="text-header-app-name">
                  Praxis Nexus
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(true)}
                title="Search (Ctrl+K)"
                data-testid="button-search"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrint}
                title="Print / Export PDF"
                data-testid="button-print"
              >
                <Printer className="h-4 w-4" />
              </Button>
              <ThemeToggle />
            </div>
          </header>
          <SearchDialog 
            open={showSearch} 
            onOpenChange={setShowSearch}
            onNavigate={handleSearchNavigate}
          />
          <main className="flex-1 overflow-hidden bg-muted/30">
            <JournalContent 
              activeSection={activeSection} 
              onOpenPresentation={handleOpenPresentation}
              onOpenInfoCenter={() => setShowInfoCenter(true)}
              onSectionChange={setActiveSection}
            />
          </main>
        </div>
      </div>
      <AuthorModal open={showInfoCenter} onOpenChange={setShowInfoCenter} />
    </SidebarProvider>
  );
}
