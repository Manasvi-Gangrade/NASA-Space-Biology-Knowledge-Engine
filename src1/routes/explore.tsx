import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, Filter, ChevronRight, X } from "lucide-react";
import { publications, organisms, conditions, systems } from "@/lib/data";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Space Biology Knowledge Engine" },
      { name: "description", content: "Natural language search and faceted filtering across NASA space biology publications." },
    ],
  }),
  component: Explore,
});

const SUGGESTIONS = [
  "Microgravity effects on bone density in mice",
  "Radiation-induced gene expression in plants",
  "Cardiovascular adaptation during long-duration spaceflight",
  "Microbial behaviour aboard the ISS",
];

function Explore() {
  const [query, setQuery] = useState("");
  const [orgFilter, setOrgFilter] = useState<string[]>([]);
  const [condFilter, setCondFilter] = useState<string[]>([]);
  const [sysFilter, setSysFilter] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((p) => {
      if (q && !(p.title.toLowerCase().includes(q) || p.abstract.toLowerCase().includes(q) || p.organism.toLowerCase().includes(q) || p.condition.toLowerCase().includes(q))) return false;
      if (orgFilter.length && !orgFilter.includes(p.organism)) return false;
      if (condFilter.length && !condFilter.includes(p.condition)) return false;
      if (sysFilter.length && !sysFilter.includes(p.system)) return false;
      return true;
    });
  }, [query, orgFilter, condFilter, sysFilter]);

  const activePub = publications.find((p) => p.id === active) ?? filtered[0];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Semantic Explorer</div>
      <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight md:text-5xl">Ask the corpus anything.</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Type a natural-language question. The engine translates it into graph queries and surfaces ranked, contextual results.
      </p>

      {/* Search */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-3 shadow-elevated">
        <div className="flex items-center gap-2 px-3">
          <Sparkles className="h-5 w-5 text-accent" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. How does microgravity affect bone density in mice?"
            className="h-12 flex-1 bg-transparent font-serif text-lg outline-none placeholder:text-muted-foreground/60"
          />
          {query && (
            <button onClick={() => setQuery("")} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary"><X className="h-4 w-4" /></button>
          )}
          <button className="hidden rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background md:inline-flex">
            <Search className="mr-2 h-4 w-4 inline" /> Search
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 px-3 pb-2">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => setQuery(s)} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground transition-smooth hover:border-accent/40 hover:text-foreground">
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Filters */}
        <aside className="lg:col-span-3">
          <div className="sticky top-20 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <Filter className="h-3.5 w-3.5" /> Filters
            </div>
            <FacetGroup title="Organism" items={organisms} selected={orgFilter} onChange={setOrgFilter} />
            <FacetGroup title="Condition" items={conditions} selected={condFilter} onChange={setCondFilter} />
            <FacetGroup title="System" items={systems} selected={sysFilter} onChange={setSysFilter} />
          </div>
        </aside>

        {/* Results */}
        <div className="lg:col-span-5">
          <div className="mb-3 flex items-baseline justify-between">
            <div className="text-sm text-muted-foreground"><span className="font-mono text-foreground">{filtered.length}</span> results</div>
            <div className="font-mono text-xs text-muted-foreground">ranked by semantic relevance</div>
          </div>
          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">No publications match. Try clearing filters.</div>
            )}
            {filtered.map((p) => {
              const isActive = (activePub?.id === p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  className={`block w-full rounded-xl border p-4 text-left transition-smooth ${isActive ? "border-accent bg-accent/5 shadow-paper" : "border-border bg-card hover:border-accent/40 hover:shadow-paper"}`}
                >
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-mono">{p.id} · {p.year} · {p.journal}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <div className="mt-1 font-serif text-base font-semibold leading-snug">{p.title}</div>
                  <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.abstract}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Pill>{p.organism}</Pill>
                    <Pill accent>{p.condition}</Pill>
                    <Pill>{p.system}</Pill>
                    <Pill muted>{p.citations} cit.</Pill>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 rounded-2xl border border-border bg-card p-6 shadow-paper">
            {activePub ? (
              <>
                <div className="font-mono text-xs text-muted-foreground">{activePub.id} · {activePub.year}</div>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug">{activePub.title}</h3>
                <div className="mt-3 text-sm text-muted-foreground">{activePub.authors.join(", ")} · <em>{activePub.journal}</em></div>
                <div className="mt-4 text-sm leading-relaxed">{activePub.abstract}</div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
                  <Stat label="Organism" value={activePub.organism} />
                  <Stat label="Condition" value={activePub.condition} />
                  <Stat label="System" value={activePub.system} />
                  <Stat label="Citations" value={String(activePub.citations)} />
                </div>

                <div className="mt-5">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">AI Summary</div>
                  <p className="mt-2 rounded-md border border-border/70 bg-secondary/40 p-3 text-sm">
                    Key finding: exposure to <strong>{activePub.condition.toLowerCase()}</strong> in <em>{activePub.organism}</em> alters {activePub.system.toLowerCase()} pathways with downstream regulatory effects relevant to long-duration mission risk.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">Select a publication.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FacetGroup({ title, items, selected, onChange }: { title: string; items: string[]; selected: string[]; onChange: (v: string[]) => void }) {
  return (
    <div>
      <div className="mb-2 font-serif text-sm font-semibold">{title}</div>
      <div className="space-y-1.5">
        {items.map((it) => {
          const on = selected.includes(it);
          return (
            <label key={it} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={on}
                onChange={() => onChange(on ? selected.filter((x) => x !== it) : [...selected, it])}
                className="h-3.5 w-3.5 rounded border-border accent-[oklch(0.28_0.12_270)]"
              />
              <span className={on ? "text-foreground" : "text-muted-foreground"}>{it}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Pill({ children, accent, muted }: { children: React.ReactNode; accent?: boolean; muted?: boolean }) {
  const cls = accent
    ? "border-accent/30 bg-accent/10 text-accent"
    : muted
    ? "border-border bg-secondary/60 text-muted-foreground"
    : "border-border bg-secondary text-foreground";
  return <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}>{children}</span>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
