import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, RadarChart, PolarAngleAxis, PolarGrid, Radar, Legend } from "recharts";
import { organismDistribution, conditionDistribution, systemRadar, organisms, conditions } from "@/lib/data";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Space Biology Knowledge Engine" },
      { name: "description", content: "Trends, distributions, and gap analysis across NASA space biology research." },
    ],
  }),
  component: Insights,
});

const PIE_COLORS = [
  "oklch(0.32 0.14 270)", "oklch(0.55 0.16 320)", "oklch(0.6 0.1 195)",
  "oklch(0.7 0.14 75)",  "oklch(0.55 0.16 320)",  "oklch(0.6 0.12 210)",
  "oklch(0.6 0.1 195)", "oklch(0.7 0.14 75)",
];

function Insights() {
  // build a heatmap matrix organism x condition
  const matrix = organisms.map((o, i) =>
    conditions.map((_c, j) => ({
      v: ((Math.sin((i + 1) * (j + 1) * 1.7) + 1) / 2 * 9 + (i + j) % 4) | 0,
    }))
  );
  const max = 12;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Insights</div>
      <h1 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Patterns across the corpus</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Aggregated views reveal where research is dense, where gaps remain, and which biological systems dominate the literature.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        {/* Organism distribution */}
        <Card className="lg:col-span-7" eyebrow="Distribution" title="Studies by organism">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={organismDistribution} margin={{ left: -10 }}>
                <CartesianGrid stroke="oklch(0.22 0.08 270 / 0.1)" />
                <XAxis dataKey="name" fontSize={11} stroke="oklch(0.46 0.03 260)" />
                <YAxis fontSize={11} stroke="oklch(0.46 0.03 260)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {organismDistribution.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Condition pie */}
        <Card className="lg:col-span-5" eyebrow="Stressors" title="Conditions investigated">
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={conditionDistribution} dataKey="value" innerRadius={50} outerRadius={100} paddingAngle={2}>
                  {conditionDistribution.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Radar */}
        <Card className="lg:col-span-5" eyebrow="Coverage" title="System coverage vs research gaps">
          <div className="h-80">
            <ResponsiveContainer>
              <RadarChart data={systemRadar}>
                <PolarGrid stroke="oklch(0.22 0.08 270 / 0.14)" />
                <PolarAngleAxis dataKey="system" fontSize={11} />
                <Radar name="Studies"  dataKey="studies" stroke="oklch(0.32 0.14 270)" fill="oklch(0.32 0.14 270)" fillOpacity={0.35} />
                <Radar name="Gaps"     dataKey="gaps"    stroke="oklch(0.55 0.16 320)"  fill="oklch(0.55 0.16 320)"  fillOpacity={0.25} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Heatmap */}
        <Card className="lg:col-span-7" eyebrow="Density" title="Organism × condition research density">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-card p-2 text-left text-muted-foreground"></th>
                  {conditions.map((c) => (
                    <th key={c} className="p-2 text-left font-medium text-muted-foreground">
                      <div className="origin-bottom-left -rotate-45 whitespace-nowrap">{c}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {organisms.map((o, i) => (
                  <tr key={o}>
                    <td className="sticky left-0 bg-card p-2 pr-3 text-right font-serif italic">{o}</td>
                    {matrix[i].map((cell, j) => {
                      const t = cell.v / max;
                      return (
                        <td key={j} className="p-1">
                          <div
                            className="flex h-9 w-12 items-center justify-center rounded-md text-[10px] font-medium"
                            style={{
                              background: `oklch(0.32 0.07 255 / ${0.08 + t * 0.7})`,
                              color: t > 0.55 ? "oklch(0.99 0.008 250)" : "oklch(0.18 0.04 265)",
                            }}
                          >{cell.v}</div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

const tooltipStyle = {
  background: "oklch(0.995 0.004 250)",
  border: "1px solid oklch(0.88 0.015 250)",
  borderRadius: 8,
  fontSize: 12,
};

function Card({ eyebrow, title, children, className = "" }: { eyebrow: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-paper ${className}`}>
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{eyebrow}</div>
      <div className="font-serif text-xl font-semibold">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
