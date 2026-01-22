import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { JournalSidebar } from "@/components/JournalSidebar";
import { JournalContent } from "@/components/JournalContent";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import { Leaf } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sidebarStyle = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "3.5rem",
  };

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <JournalSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center justify-between gap-4 px-4 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="font-serif text-sm font-medium hidden sm:inline">
                  AI Inquiry Journal
                </span>
              </div>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-hidden bg-muted/30">
            <JournalContent activeSection={activeSection} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
