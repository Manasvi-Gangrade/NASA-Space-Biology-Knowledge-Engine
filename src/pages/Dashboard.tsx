import { StatCard } from "@/components/StatCard";
import { FileText, FlaskConical, Satellite, Lightbulb } from "lucide-react";
import { trendData, conditionDistribution, researchPapers } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const chartColors = {
  grid: "hsl(220, 15%, 90%)",
  axis: "hsl(220, 10%, 46%)",
  tooltip: { bg: "hsl(0, 0%, 100%)", border: "hsl(220, 15%, 90%)" },
};

const Dashboard = () => {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Overview of space biology research intelligence
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Publications" value={247} subtitle="Total analyzed" icon={<FileText className="w-4 h-4" />} trend="↑ 23% this year" color="bg-chart-blue" />
        <StatCard title="Biological Systems" value={12} subtitle="Studied" icon={<FlaskConical className="w-4 h-4" />} color="bg-chart-teal" />
        <StatCard title="Space Missions" value={38} subtitle="Referenced" icon={<Satellite className="w-4 h-4" />} color="bg-chart-purple" />
        <StatCard title="Knowledge Gaps" value={7} subtitle="Identified" icon={<Lightbulb className="w-4 h-4" />} trend="3 critical" color="bg-chart-orange" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Research publications over time
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="gradHuman" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(230, 65%, 55%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(230, 65%, 55%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradPlant" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(168, 55%, 42%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(168, 55%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="year" stroke={chartColors.axis} fontSize={12} />
              <YAxis stroke={chartColors.axis} fontSize={12} />
              <Tooltip contentStyle={{ background: chartColors.tooltip.bg, border: `1px solid ${chartColors.tooltip.border}`, borderRadius: "6px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="human" stroke="hsl(230, 65%, 55%)" fill="url(#gradHuman)" strokeWidth={1.5} name="Human" />
              <Area type="monotone" dataKey="plant" stroke="hsl(168, 55%, 42%)" fill="url(#gradPlant)" strokeWidth={1.5} name="Plant" />
              <Area type="monotone" dataKey="microbe" stroke="hsl(28, 85%, 56%)" fill="transparent" strokeWidth={1.5} name="Microbe" />
              <Area type="monotone" dataKey="animal" stroke="hsl(270, 55%, 58%)" fill="transparent" strokeWidth={1.5} name="Animal" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Space conditions studied
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={conditionDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {conditionDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: chartColors.tooltip.bg, border: `1px solid ${chartColors.tooltip.border}`, borderRadius: "6px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {conditionDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.fill }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-foreground font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Papers */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-medium text-foreground mb-4">
          Latest analyzed research
        </h3>
        <div className="space-y-2">
          {researchPapers.slice(0, 4).map((paper, i) => {
            const dotColors = ["bg-chart-blue", "bg-chart-teal", "bg-chart-orange", "bg-chart-purple"];
            return (
              <div
                key={paper.id}
                className="flex items-center justify-between p-3 rounded-md hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-1.5 h-8 rounded-full ${dotColors[i % dotColors.length]}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{paper.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {paper.mission} · {paper.year} · {paper.biologicalSystem}
                    </p>
                  </div>
                </div>
                <div className="ml-4 text-right flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">{paper.relevanceScore}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
