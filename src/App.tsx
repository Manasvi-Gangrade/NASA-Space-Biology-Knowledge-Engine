import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Research from "./pages/Research";
import KnowledgeGraph from "./pages/KnowledgeGraph";
import SemanticSearch from "./pages/SemanticSearch";
import Trends from "./pages/Trends";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/research" element={<Research />} />
            <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
            <Route path="/search" element={<SemanticSearch />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
