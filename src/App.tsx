import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";
import Publications from "./pages/Publications";
import Graph from "./pages/Graph";
import Explore from "./pages/Explore";
import Trends from "./pages/Trends";
import Insights from "./pages/Insights";
import About from "./pages/About";
import Research from "./pages/Research";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <SiteHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<Layout />}>
              <Route path="/publications" element={<Publications />} />
              <Route path="/research" element={<Research />} />
              <Route path="/graph" element={<Graph />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/search" element={<Explore />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SiteFooter />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
