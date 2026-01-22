import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import NotFound from "@/pages/not-found";
import ProjectHub from "@/pages/ProjectHub";
import Home from "@/pages/Home";
import QuasiQualitative from "@/pages/QuasiQualitative";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ProjectHub} />
      <Route path="/edd-inquiry" component={Home} />
      <Route path="/quasi-qualitative" component={QuasiQualitative} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
