import { useState } from "react";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { researchPapers } from "@/data/mockData";

const suggestedQueries = [
  "Effects of microgravity on bone density",
  "Plant growth in space radiation conditions",
  "Gut microbiome changes during spaceflight",
  "DNA damage from cosmic radiation",
  "Cardiac remodeling in microgravity",
];

const SemanticSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof researchPapers | null>(null);
  const [searching, setSearching] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  const handleSearch = (searchQuery: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;
    setQuery(q);
    setSearching(true);

    setTimeout(() => {
      const keywords = q.toLowerCase().split(" ");
      const scored = researchPapers
        .map((paper) => {
          const text = `${paper.title} ${paper.objective} ${paper.conclusion} ${paper.tags.join(" ")}`.toLowerCase();
          const score = keywords.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
          return { ...paper, matchScore: score };
        })
        .filter((p) => p.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore);

      setResults(scored.length > 0 ? scored : researchPapers.slice(0, 3));
      setAiSummary(
        `Based on ${scored.length || 3} relevant studies, research indicates significant biological responses to space conditions matching your query. The most impactful findings relate to adaptive mechanisms and potential countermeasures for long-duration missions.`
      );
      setSearching(false);
    }, 800);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Semantic Search</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Ask natural language questions about space biology research
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-card rounded-lg border border-border p-1">
        <div className="flex items-center">
          <SearchIcon className="w-4 h-4 text-muted-foreground ml-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch("")}
            placeholder="Ask about space biology research..."
            className="flex-1 bg-transparent border-none outline-none px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <button
            onClick={() => handleSearch("")}
            disabled={searching}
            className="px-4 py-2 mr-1 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Suggested Queries */}
      {!results && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Suggested queries</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((sq) => (
              <button
                key={sq}
                onClick={() => handleSearch(sq)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowRight className="w-3 h-3" />
                {sq}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* AI Summary */}
          <div className="bg-card rounded-lg border border-accent/30 p-5">
            <h3 className="text-xs font-medium uppercase tracking-wide text-accent mb-2">AI Insight Summary</h3>
            <p className="text-sm text-foreground leading-relaxed">{aiSummary}</p>
          </div>

          <p className="text-xs text-muted-foreground">
            Found {results.length} relevant studies
          </p>

          {results.map((paper) => (
            <div
              key={paper.id}
              className="bg-card rounded-lg border border-border p-5 hover:border-muted-foreground/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent">{paper.biologicalSystem}</span>
                <span className="text-xs text-muted-foreground px-2 py-0.5 rounded border border-border">{paper.spaceCondition}</span>
                <span className="text-xs text-muted-foreground ml-auto">{paper.year}</span>
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1">{paper.title}</h3>
              <p className="text-xs text-muted-foreground">{paper.objective}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {paper.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-secondary text-[10px] text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SemanticSearch;
