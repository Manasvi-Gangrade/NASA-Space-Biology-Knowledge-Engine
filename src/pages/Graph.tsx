import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGraph, type GraphNode } from "@/lib/api";

const TYPE_META: Record<GraphNode["type"], { color: string; label: string }> = {
  condition: { color: "oklch(0.55 0.16 320)", label: "Condition" },
  organism: { color: "oklch(0.32 0.14 270)", label: "Organism" },
  system: { color: "oklch(0.6 0.1 195)", label: "System" },
  gene: { color: "oklch(0.7 0.14 75)", label: "Gene" },
  publication: { color: "oklch(0.55 0.16 320)", label: "Publication" },
};

export default function Graph() {
  const { data, isLoading } = useQuery(["graph"], fetchGraph, { staleTime: 1000 * 60 });
  const [hover, setHover] = useState<string | null>(null);
  const nodes = data?.nodes ?? [];
  const edges = data?.edges ?? [];
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState<Record<GraphNode["type"], boolean>>({
    condition: true,
    organism: true,
    system: true,
    gene: true,
    publication: true,
  });

  const nodeMap = useMemo(() => Object.fromEntries(nodes.map((node) => [node.id, node])), [nodes]);
  const focusId = active ?? hover;
  const connected = useMemo(() => {
    if (!focusId) return new Set<string>();
    const set = new Set<string>([focusId]);
    edges.forEach((edge) => {
      if (edge.source === focusId) set.add(edge.target);
      if (edge.target === focusId) set.add(edge.source);
    });
    return set;
  }, [focusId, edges]);

  const visibleNodes = nodes.filter((node) => filter[node.type]);
  const focused = active ? nodeMap[active] : null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Knowledge Graph</div>
      <h1 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">The shape of what we know.</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Entities and relationships extracted from NASA space biology research, organized as an interactive network.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <div className="relative rounded-2xl border border-border bg-card shadow-paper">
            <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2 rounded-md border border-border bg-background/80 p-2 backdrop-blur">
              {Object.entries(TYPE_META).filter(([key]) => key !== "publication").map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setFilter((current) => ({ ...current, [key]: !current[key as GraphNode["type"]] }))}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-smooth ${filter[key as GraphNode["type"]] ? "" : "opacity-40"}`}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.color }} />
                  {meta.label}
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
              {[140, 250, 360, 440].map((radius) => (
                <circle key={radius} cx="500" cy="350" r={radius} fill="none" stroke="oklch(0.22 0.08 270 / 0.1)" strokeDasharray="2 4" />
              ))}
              {edges.map((edge, index) => {
                const source = nodeMap[edge.source];
                const target = nodeMap[edge.target];
                if (!source || !target) return null;
                if (!filter[source.type] || !filter[target.type]) return null;
                const highlight = focusId && (edge.source === focusId || edge.target === focusId);
                return (
                  <line
                    key={index}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={highlight ? "oklch(0.55 0.16 320)" : "oklch(0.22 0.08 270 / 0.2)"}
                    strokeWidth={highlight ? 1.6 : 0.8}
                  />
                );
              })}
              {visibleNodes.map((node) => {
                const isFocus = focusId === node.id;
                const isConnected = focusId ? connected.has(node.id) : true;
                return (
                  <g
                    key={node.id}
                    onMouseEnter={() => setHover(node.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setActive(active === node.id ? null : node.id)}
                    className="cursor-pointer"
                    opacity={isConnected ? 1 : 0.25}
                  >
                    {isFocus && <circle cx={node.x} cy={node.y} r={node.size + 8} fill={TYPE_META[node.type].color} opacity={0.15} />}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.size}
                      fill={TYPE_META[node.type].color}
                      stroke="oklch(0.985 0.006 250)"
                      strokeWidth={2}
                    />
                    <text
                      x={node.x}
                      y={node.y + node.size + 14}
                      textAnchor="middle"
                      fontSize="11"
                      fill="oklch(0.18 0.04 265)"
                      fontFamily="Inter, sans-serif"
                    >
                      {node.label}
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
                    const node = nodeMap[id];
                    const color = TYPE_META[node.type].color;
                    return (
                      <button
                        key={id}
                        onClick={() => setActive(id)}
                        className="flex w-full items-center gap-2 rounded-md border border-border/60 px-2 py-1.5 text-left text-xs transition-smooth hover:border-accent/40"
                      >
                        <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                        <span className="truncate">{node.label}</span>
                        <span className="ml-auto text-muted-foreground">{TYPE_META[node.type].label}</span>
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
                  Conditions, organisms, systems, and genes form a semantic network of NASA space biology knowledge.
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  <li className="flex justify-between"><span className="text-muted-foreground">Nodes</span><span className="font-mono">{nodes.length}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Edges</span><span className="font-mono">{edges.length}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Policy</span><span className="font-mono">SLSO-inspired</span></li>
                </ul>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
