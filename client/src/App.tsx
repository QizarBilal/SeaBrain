import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import FishMap from "@/pages/FishMap";
import Climate from "@/pages/Climate";
import Marketplace from "@/pages/Marketplace";
import Community from "@/pages/Community";
import MarkCatch from "@/pages/MarkCatch";
import ContactSOS from "@/pages/ContactSOS";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/map" component={FishMap} />
      <Route path="/climate" component={Climate} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/community" component={Community} />
      <Route path="/mark-catch" component={MarkCatch} />
      <Route path="/contact-sos" component={ContactSOS} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Router />
            <FloatingChatbot />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
