import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Leaf, BookOpen, FlaskConical, ArrowRight, FolderOpen, PenTool, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ProjectCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  status: "active" | "coming-soon";
  color: string;
}

const projects: ProjectCard[] = [
  {
    id: "edd-inquiry",
    title: "EdD Inquiry on AI's Ecological and Economic Entanglements",
    subtitle: "AI, Conservation, and the Reconfiguration of Human–Wildlife Relations",
    description: "An academic inquiry journal documenting doctoral research on the intersection of artificial intelligence, ecological systems, and conservation practices.",
    icon: <Leaf className="h-6 w-6" />,
    route: "/edd-inquiry",
    status: "active",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "quasi-qualitative",
    title: "Quasi-Qualitative Project",
    subtitle: "Topic and Research Question Development",
    description: "A structured exploration of research methodology, developing topics and formulating research questions through quasi-qualitative approaches.",
    icon: <FlaskConical className="h-6 w-6" />,
    route: "/quasi-qualitative",
    status: "active",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    id: "portfolio",
    title: "Doctoral Portfolio",
    subtitle: "Capstone Demonstration of Doctoral Learning",
    description: "A comprehensive collection of artifacts and reflections documenting mastery across Knowledge, Practice, and Self-in-Context strands.",
    icon: <FolderOpen className="h-6 w-6" />,
    route: "/portfolio",
    status: "active",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    id: "integrated-essay",
    title: "Integrated Essay",
    subtitle: "Synthesis of Doctoral Learning Across Three Strands",
    description: "A 10-15 page synthesis essay connecting learning across Knowledge, Practice, and Self-in-Context to demonstrate dissertation readiness.",
    icon: <PenTool className="h-6 w-6" />,
    route: "/integrated-essay",
    status: "active",
    color: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
];

export default function ProjectHub() {
  const [, navigate] = useLocation();

  const handleProjectSelect = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <span className="font-serif text-sm font-semibold" data-testid="text-app-name">
            Praxis Nexus
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2" data-testid="button-quick-jump">
                <span className="hidden sm:inline">Quick Jump</span>
                <span className="sm:hidden">Projects</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {projects.map((project, index) => (
                <div key={project.id}>
                  <DropdownMenuItem
                    onClick={() => handleProjectSelect(project.route)}
                    className="cursor-pointer py-3"
                    data-testid={`menu-item-${project.id}`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-md mr-3 ${project.color}`}>
                      {project.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{project.title.length > 30 ? project.title.substring(0, 30) + "..." : project.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{project.subtitle}</p>
                    </div>
                  </DropdownMenuItem>
                  {index < projects.length - 1 && <DropdownMenuSeparator />}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              <span>Academic Research Hub</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4" data-testid="text-hub-title">
              Praxis Nexus
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A collection of academic inquiry projects by Felix Abayomi, exploring the intersections of education, technology, and research methodology.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Link key={project.id} href={project.route}>
                <Card 
                  className={`h-full hover-elevate cursor-pointer transition-all ${
                    project.status === "coming-soon" ? "opacity-75" : ""
                  }`}
                  data-testid={`card-project-${project.id}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${project.color}`}>
                        {project.icon}
                      </div>
                      {project.status === "coming-soon" && (
                        <Badge variant="secondary" className="text-xs">
                          Coming Soon
                        </Badge>
                      )}
                      {project.status === "active" && (
                        <Badge 
                          variant="default" 
                          className={`text-xs ${
                            project.id === "edd-inquiry" ? "bg-emerald-600" :
                            project.id === "quasi-qualitative" ? "bg-violet-600" :
                            project.id === "portfolio" ? "bg-blue-600" :
                            project.id === "integrated-essay" ? "bg-teal-600" : "bg-primary"
                          }`}
                        >
                          Active
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="font-serif text-xl leading-tight">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="font-serif text-sm italic">
                      {project.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-2 p-0 h-auto font-medium"
                      disabled={project.status === "coming-soon"}
                    >
                      {project.status === "active" ? "Enter Project" : "Available Soon"}
                      {project.status === "active" && <ArrowRight className="h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center border-t border-border/50 pt-8">
            <p className="text-sm text-muted-foreground mb-2">
              Felix Abayomi
            </p>
            <p className="text-xs text-muted-foreground">
              EdD Candidate, Antioch University
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              © Felix Abayomi 2026
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
