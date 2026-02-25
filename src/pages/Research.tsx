import { researchPapers } from "@/data/mockData";
import { ResearchCard } from "@/components/ResearchCard";
import { useState } from "react";
import { Search } from "lucide-react";

const Research = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSystem, setFilterSystem] = useState<string | null>(null);

  const systems = ["Human", "Plant", "Microbe", "Animal"];

  const filtered = researchPapers.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.objective.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterSystem || p.biologicalSystem === filterSystem;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Publications</h1>
        <p className="text-sm text-muted-foreground mt-0.5">AI-analyzed space biology research papers</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search papers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setFilterSystem(null)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              !filterSystem ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {systems.map((s) => (
            <button
              key={s}
              onClick={() => setFilterSystem(filterSystem === s ? null : s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filterSystem === s ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} results</p>

      {/* Papers List */}
      <div className="space-y-3">
        {filtered.map((paper, i) => (
          <ResearchCard key={paper.id} paper={paper} index={i} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No papers match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;
