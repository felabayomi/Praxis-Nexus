import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  FileText, 
  Calendar,
  Leaf,
  ChevronRight
} from "lucide-react";
import { journalData } from "@/lib/journalData";

interface JournalSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function JournalSidebar({ activeSection, onSectionChange }: JournalSidebarProps) {
  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-serif font-semibold text-sidebar-foreground">
              Praxis Nexus
            </span>
            <span className="text-xs text-sidebar-foreground/60">
              EdD Cohort 2026
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
              Overview
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => onSectionChange("introduction")}
                    className={activeSection === "introduction" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                    data-testid="nav-introduction"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Introduction & Context</span>
                    {activeSection === "introduction" && (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => onSectionChange("references")}
                    className={activeSection === "references" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                    data-testid="nav-references"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>References</span>
                    {activeSection === "references" && (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
              Monthly Inquiries
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {journalData.months.map((month) => (
                  <SidebarMenuItem key={month.id}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange(month.id)}
                      className={activeSection === month.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      data-testid={`nav-${month.id}`}
                    >
                      <Calendar className="h-4 w-4" />
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="text-sm">Month {month.monthNumber}</span>
                        <span className="text-xs text-sidebar-foreground/60 line-clamp-1">
                          {month.title}
                        </span>
                      </div>
                      {activeSection === month.id && (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 pt-2">
        <div className="text-xs text-sidebar-foreground/40 text-center">
          {journalData.author}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
