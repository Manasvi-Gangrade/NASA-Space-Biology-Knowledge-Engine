import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { buildGraph, type GraphNode } from "@/lib/data";

export const Route = createFileRoute("/graph")({
  head: () => ({
    meta: [
      { title: "Knowledge Graph — Space Biology Knowledge Engine" },
      { name: "description", content: "Interactive network of organisms, conditions, systems and genes from NASA space biology research." },
    ],
  }),
  component: GraphPage,
});

const TYPE_META: Record<GraphNode["type"], { color: string; label: string }> = {
  condition:   { color: "oklch(0.55 0.16 320)",  label: "Condition" },
  organism:    { color: "oklch(0.32 0.14 270)", label: "Organism" },
  system:      { color: "oklch(0.6 0.1 195)", label: "System" },
  gene:        { color: "oklch(0.7 0.14 75)",  label: "Gene" },
  publication: { color: "oklch(0.55 0.16 320)",   label: "Publication" },
};

function GraphPage() {
  const { nodes, edges } = useMemo(() => buildGraph(), []);
  const [hover, setHover] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState<Record<string, boolean>>({ condition: true, organism: true, system: true, gene: true, publication: true });

  const nodeMap = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const focusId = active ?? hover;
  const connected = useMemo(() => {
    if (!focusId) return new Set<string>();
    const s = new Set<string>([focusId]);
    edges.forEach((e) => {
      if (e.source === focusId) s.add(e.target);
      if (e.target === focusId) s.add(e.source);
    });
    return s;
  }, [focusId, edges]);

  const visibleNodes = nodes.filter((n) => filter[n.type]);

  const focused = active ? nodeMap[active] : null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Knowledge Graph</div>
      <h1 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">The shape of what we know.</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Each node is an entity extracted from NASA's space biology corpus. Edges represent co-occurrence and ontological relationships within the SLSO schema.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <div className="relative rounded-2xl border border-border bg-card shadow-paper">
            {/* Legend */}
            <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2 rounded-md border border-border bg-background/80 p-2 backdrop-blur">
              {Object.entries(TYPE_META).filter(([k]) => k !== "publication").map(([k, m]) => (
                <button
                  key={k}
                  onClick={() => setFilter((f) => ({ ...f, [k]: !f[k] }))}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-smooth ${filter[k] ? "" : "opacity-40"}`}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: m.color }} />
                  {m.label}
                </button>
              ))}
            </div>
            <svg viewBox="0 0 1000 700" className="h-[600px] w-full">
              <defs>
                <radialGradient id="bgGrad">
                  <stop offset="0%" stopColor="oklch(0.32 0.14 270)" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <rect x="0" y="0" width="1000" height="700" fill="url(#bgGrad)" />
              {/* concentric guides */}
              {[140, 250, 360, 440].map((r) => (
                <circle key={r} cx="500" cy="350" r={r} fill="none" stroke="oklch(0.22 0.08 270 / 0.1)" strokeDasharray="2 4" />
              ))}

              {/* edges */}
              {edges.map((e, i) => {
                const a = nodeMap[e.source], b = nodeMap[e.target];
                if (!a || !b) return null;
                if (!filter[a.type] || !filter[b.type]) return null;
                const hot = focusId && (e.source === focusId || e.target === focusId);
                return (
                  <line
                    key={i}
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke={hot ? "oklch(0.55 0.16 320)" : "oklch(0.22 0.08 270 / 0.2)"}
                    strokeWidth={hot ? 1.6 : 0.8}
                  />
                );
              })}

              {/* nodes */}
              {visibleNodes.map((n) => {
                const isFocus = focusId === n.id;
                const isConn = focusId ? connected.has(n.id) : true;
                return (
                  <g
                    key={n.id}
                    onMouseEnter={() => setHover(n.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setActive(active === n.id ? null : n.id)}
                    className="cursor-pointer"
                    opacity={isConn ? 1 : 0.25}
                  >
                    {isFocus && <circle cx={n.x} cy={n.y} r={n.size + 8} fill={TYPE_META[n.type].color} opacity={0.15} />}
                    <circle cx={n.x} cy={n.y} r={n.size} fill={TYPE_META[n.type].color} stroke="oklch(0.985 0.006 250)" strokeWidth={2} />
                    <text x={n.x} y={n.y + n.size + 14} textAnchor="middle" fontSize="11" fill="oklch(0.18 0.04 265)" fontFamily="Inter, sans-serif">
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <aside className="lg:col-span-3">
          <div className="sticky top-20 rounded-2xl border border-border bg-card p-6 shadow-paper">
            {focused ? (
              <>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{TYPE_META[focused.type].label}</div>
                <div className="mt-1 font-serif text-2xl font-semibold">{focused.label}</div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Connected to {connected.size - 1} entities in the graph. Click another node to traverse, or click again to clear.
                </p>
                <div className="mt-4 space-y-1.5">
                  {[...connected].filter((id) => id !== focused.id).slice(0, 8).map((id) => {
                    const n = nodeMap[id];
                    return (
                      <button key={id} onClick={() => setActive(id)} className="flex w-full items-center gap-2 rounded-md border border-border/60 px-2 py-1.5 text-left text-xs transition-smooth hover:border-accent/40">
                        <span className="h-2 w-2 rounded-full" style={{ background: TYPE_META[n.type].color }} />
                        <span className="truncate">{n.label}</span>
                        <span className="ml-auto text-muted-foreground">{TYPE_META[n.type].label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Inspector</div>
                <div className="mt-1 font-serif text-2xl font-semibold">Hover or tap a node</div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Conditions form the inner ring. Organisms orbit them. Systems and genes radiate outward as expression and pathway evidence accumulates.
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  <li className="flex justify-between"><span className="text-muted-foreground">Nodes</span><span className="font-mono">{nodes.length}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Edges</span><span className="font-mono">{edges.length}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Schema</span><span className="font-mono">SLSO v1.2</span></li>
                </ul>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
