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
  ChevronRight,
  Clock
} from "lucide-react";
import { journalData } from "@/lib/journalData";
import { 
  getIntroductionReadingTime, 
  getMonthReadingTime, 
  getReferencesReadingTime,
  formatReadingTime,
  getTotalReadingTime
} from "@/lib/journalUtils";

interface JournalSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function JournalSidebar({ activeSection, onSectionChange }: JournalSidebarProps) {
  const introTime = getIntroductionReadingTime(journalData);
  const refsTime = getReferencesReadingTime(journalData);
  const totalTime = getTotalReadingTime(journalData);

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm font-serif font-semibold text-sidebar-foreground">
            Praxis Nexus
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-sidebar-foreground/50">
          <Clock className="h-3 w-3" />
          <span>{formatReadingTime(totalTime)} total</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          <div className="px-4 py-2 text-xs text-sidebar-foreground/60 font-medium">
            EdD AI Inquiry Exploration Cohort
          </div>
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
                    <div className="flex flex-col items-start gap-0.5 flex-1">
                      <span>Introduction & Context</span>
                      <span className="text-xs text-sidebar-foreground/50">
                        {formatReadingTime(introTime)}
                      </span>
                    </div>
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
                    <div className="flex flex-col items-start gap-0.5 flex-1">
                      <span>References</span>
                      <span className="text-xs text-sidebar-foreground/50">
                        {formatReadingTime(refsTime)}
                      </span>
                    </div>
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
                {journalData.months.map((month) => {
                  const monthTime = getMonthReadingTime(month);
                  return (
                    <SidebarMenuItem key={month.id}>
                      <SidebarMenuButton
                        onClick={() => onSectionChange(month.id)}
                        className={activeSection === month.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                        data-testid={`nav-${month.id}`}
                      >
                        <Calendar className="h-4 w-4" />
                        <div className="flex flex-col items-start gap-0.5 flex-1">
                          <span className="text-sm">Month {month.monthNumber}: {month.title}</span>
                          <span className="text-xs text-sidebar-foreground/50">
                            {formatReadingTime(monthTime)}
                          </span>
                        </div>
                        {activeSection === month.id && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 pt-2">
        <div className="text-xs text-sidebar-foreground/40 text-center">
          Academic Inquiry Journal
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
