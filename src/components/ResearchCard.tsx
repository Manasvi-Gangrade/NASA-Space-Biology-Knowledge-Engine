import { ResearchPaper } from "@/data/mockData";
import { useState } from "react";
import { ChevronDown, ChevronUp, Tag } from "lucide-react";

interface ResearchCardProps {
  paper: ResearchPaper;
  index: number;
}

const systemColors: Record<string, { badge: string; dot: string }> = {
  Human: { badge: "bg-chart-blue/10 text-chart-blue", dot: "bg-chart-blue" },
  Plant: { badge: "bg-chart-teal/10 text-chart-teal", dot: "bg-chart-teal" },
  Microbe: { badge: "bg-chart-orange/10 text-chart-orange", dot: "bg-chart-orange" },
  Animal: { badge: "bg-chart-purple/10 text-chart-purple", dot: "bg-chart-purple" },
};

export function ResearchCard({ paper }: ResearchCardProps) {
  const [expanded, setExpanded] = useState(false);
  const colors = systemColors[paper.biologicalSystem] || { badge: "bg-secondary text-secondary-foreground", dot: "bg-muted-foreground" };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden transition-colors hover:border-muted-foreground/30">
      <div className="p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className={`w-1 h-12 rounded-full mt-0.5 flex-shrink-0 ${colors.dot}`} />
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${colors.badge}`}>
                  {paper.biologicalSystem}
                </span>
                <span className="text-xs text-muted-foreground px-2 py-0.5 rounded border border-border">
                  {paper.spaceCondition}
                </span>
                <span className="text-xs text-muted-foreground">{paper.year} · {paper.mission}</span>
              </div>
              <h3 className="font-medium text-foreground leading-snug">{paper.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{paper.authors.join(", ")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Relevance</p>
              <p className="text-lg font-semibold text-primary">{paper.relevanceScore}%</p>
            </div>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-border pt-4 ml-8">
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">Objective</h4>
            <p className="text-sm text-foreground">{paper.objective}</p>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">Key Findings</h4>
            <ul className="space-y-1.5">
              {paper.keyFindings.map((finding, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className={`w-1 h-1 rounded-full ${colors.dot} mt-2 flex-shrink-0`} />
                  {finding}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">Conclusion</h4>
            <p className="text-sm text-foreground">{paper.conclusion}</p>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">Future Research</h4>
            <p className="text-sm text-primary">{paper.futureSuggestions}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {paper.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
