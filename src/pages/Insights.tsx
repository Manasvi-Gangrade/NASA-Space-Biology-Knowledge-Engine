import { insightSuggestions } from "@/data/mockData";
import { AlertTriangle, FlaskConical, ArrowRight } from "lucide-react";

const typeConfig = {
  gap: { icon: AlertTriangle, label: "Knowledge Gap", color: "text-chart-orange", bg: "bg-chart-orange/10", border: "border-l-chart-orange" },
  hypothesis: { icon: FlaskConical, label: "Hypothesis", color: "text-chart-purple", bg: "bg-chart-purple/10", border: "border-l-chart-purple" },
  recommendation: { icon: ArrowRight, label: "Recommendation", color: "text-chart-teal", bg: "bg-chart-teal/10", border: "border-l-chart-teal" },
};

const Insights = () => {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-semibold text-foreground">AI Insights</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Research gaps, hypotheses, and recommendations
        </p>
      </div>

      {/* Summary */}
      <div className="bg-card rounded-lg border border-border p-5 border-l-4 border-l-primary">
        <h2 className="text-sm font-medium text-foreground mb-2">Intelligence Overview</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Analysis of 247 research papers reveals <span className="text-chart-orange font-medium">3 critical knowledge gaps</span>,{" "}
          <span className="text-chart-purple font-medium">2 novel hypotheses</span>, and{" "}
          <span className="text-chart-teal font-medium">1 strategic recommendation</span> for advancing space biology research
          toward long-duration Mars missions.
        </p>
      </div>

      {/* Insights */}
      <div className="space-y-3">
        {insightSuggestions.map((insight) => {
          const config = typeConfig[insight.type];
          const Icon = config.icon;
          return (
            <div
              key={insight.id}
              className={`bg-card rounded-lg border border-border border-l-4 ${config.border} p-5 hover:border-muted-foreground/30 transition-colors`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-md ${config.bg}`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded border ${
                      insight.priority === "high"
                        ? "border-chart-red/30 text-chart-red bg-chart-red/5"
                        : "border-border text-muted-foreground"
                    }`}>
                      {insight.priority} priority
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-muted-foreground">Confidence</span>
                    <div className="flex-1 max-w-32 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-primary font-mono font-medium">{insight.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground mb-3">
          Insights generated from pattern analysis across the research corpus.
        </p>
        <button className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          Generate New Insights
        </button>
      </div>
    </div>
  );
};

export default Insights;
