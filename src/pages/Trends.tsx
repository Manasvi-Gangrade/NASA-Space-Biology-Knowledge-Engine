import { trendData } from "@/data/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

const chartStyle = {
  grid: "hsl(220, 15%, 90%)",
  axis: "hsl(220, 10%, 46%)",
  tooltip: { background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 15%, 90%)", borderRadius: "6px", fontSize: "12px" },
};

const gapData = [
  { area: "Bone Health", researched: 85, needed: 95 },
  { area: "Cardiovascular", researched: 70, needed: 90 },
  { area: "Microbiome", researched: 55, needed: 85 },
  { area: "Plant Crops", researched: 60, needed: 80 },
  { area: "Radiation Shield", researched: 35, needed: 95 },
  { area: "Mental Health", researched: 25, needed: 90 },
  { area: "Reproduction", researched: 15, needed: 70 },
];

const consensusItems = [
  { topic: "Microgravity causes bone density loss", status: "consensus", confidence: 97 },
  { topic: "Exercise partially mitigates muscle atrophy", status: "consensus", confidence: 92 },
  { topic: "Gut microbiome shifts during spaceflight", status: "consensus", confidence: 88 },
  { topic: "Optimal radiation shielding materials", status: "conflicting", confidence: 45 },
  { topic: "Long-term cognitive effects of isolation", status: "insufficient", confidence: 30 },
  { topic: "Epigenetic inheritance of space adaptations", status: "conflicting", confidence: 38 },
];

const Trends = () => {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Trends & Gap Analysis</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Research trends, knowledge gaps, and scientific consensus</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">Publication volume by system</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
              <XAxis dataKey="year" stroke={chartStyle.axis} fontSize={12} />
              <YAxis stroke={chartStyle.axis} fontSize={12} />
              <Tooltip contentStyle={chartStyle.tooltip} />
              <Bar dataKey="human" fill="hsl(230, 65%, 55%)" radius={[3, 3, 0, 0]} name="Human" />
              <Bar dataKey="plant" fill="hsl(168, 55%, 42%)" radius={[3, 3, 0, 0]} name="Plant" />
              <Bar dataKey="microbe" fill="hsl(28, 85%, 56%)" radius={[3, 3, 0, 0]} name="Microbe" />
              <Bar dataKey="animal" fill="hsl(270, 55%, 58%)" radius={[3, 3, 0, 0]} name="Animal" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">Research coverage vs need</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={gapData}>
              <PolarGrid stroke={chartStyle.grid} />
              <PolarAngleAxis dataKey="area" stroke={chartStyle.axis} fontSize={10} />
              <PolarRadiusAxis stroke={chartStyle.grid} fontSize={10} />
              <Radar name="Researched" dataKey="researched" stroke="hsl(230, 65%, 55%)" fill="hsl(230, 65%, 55%)" fillOpacity={0.15} />
              <Radar name="Needed" dataKey="needed" stroke="hsl(355, 65%, 55%)" fill="hsl(355, 65%, 55%)" fillOpacity={0.08} strokeDasharray="5 5" />
              <Tooltip contentStyle={chartStyle.tooltip} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Under-Researched Areas */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-medium text-foreground mb-4">Under-researched areas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {gapData
            .filter((g) => g.needed - g.researched > 30)
            .sort((a, b) => (b.needed - b.researched) - (a.needed - a.researched))
            .map((gap, i) => {
              const barColors = ["bg-chart-red", "bg-chart-orange", "bg-chart-amber", "bg-chart-purple"];
              return (
                <div key={gap.area} className="p-4 rounded-md border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-chart-orange" />
                    <span className="text-sm font-medium text-foreground">{gap.area}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Coverage: {gap.researched}%</span>
                    <span className="text-chart-red font-medium">Gap: {gap.needed - gap.researched}%</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColors[i % barColors.length]}`}
                      style={{ width: `${gap.researched}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Scientific Consensus */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-medium text-foreground mb-4">Scientific consensus tracker</h3>
        <div className="space-y-2">
          {consensusItems.map((item) => {
            const Icon = item.status === "consensus" ? CheckCircle : item.status === "conflicting" ? AlertTriangle : HelpCircle;
            const statusColor = item.status === "consensus" ? "text-chart-teal" : item.status === "conflicting" ? "text-chart-orange" : "text-muted-foreground";
            const barColor = item.confidence > 80 ? "bg-chart-teal" : item.confidence > 50 ? "bg-chart-amber" : "bg-chart-red";
            return (
              <div key={item.topic} className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary transition-colors">
                <Icon className={`w-4 h-4 flex-shrink-0 ${statusColor}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{item.topic}</p>
                  <p className="text-xs text-muted-foreground capitalize">{item.status} · {item.confidence}% confidence</p>
                </div>
                <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden flex-shrink-0">
                  <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{ width: `${item.confidence}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Trends;
