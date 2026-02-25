import { useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Sparkles, Filter, ChevronRight, X } from "lucide-react";
import { organisms, conditions, systems } from "@/lib/data";
import { searchPublications } from "@/lib/api";

export default function Explore() {
  const [query, setQuery] = useState("");
  const [orgFilter, setOrgFilter] = useState<string[]>([]);
  const [condFilter, setCondFilter] = useState<string[]>([]);
  const [sysFilter, setSysFilter] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);

  const clearFilters = () => {
    setQuery("");
    setOrgFilter([]);
    setCondFilter([]);
    setSysFilter([]);
    setActive(null);
  };

  const { data: filtered = [], isLoading } = useQuery([
    "search",
    query,
    orgFilter,
    condFilter,
    sysFilter,
  ], () => searchPublications({
    query,
    organism: orgFilter,
    condition: condFilter,
    system: sysFilter,
  }), {
    keepPreviousData: true,
  });

  const activePub = filtered.find((p) => p.id === active) ?? filtered[0];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Semantic Explorer</div>
      <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight md:text-5xl">Launch the NASA Space Biology engine.</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Ask the corpus in natural language, filter by organism, condition, or system, and surface ranked research intelligence.
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
        <span className="rounded-full border border-border bg-secondary/80 px-3 py-1.5">Start with a question or preset prompt</span>
        <button onClick={clearFilters} className="rounded-full border border-border bg-background/80 px-3 py-1.5 text-sm font-semibold text-accent transition hover:bg-accent/10">
          Clear filters
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-3 shadow-elevated">
        <div className="grid gap-3 px-3 py-4 sm:grid-cols-[1.2fr_auto] sm:items-center">
          <div className="relative">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. How does microgravity affect bone density in mice?"
              className="h-14 w-full rounded-2xl border border-border bg-secondary/85 px-12 text-lg font-serif text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div className="flex items-center gap-2">
            {query && (
              <button onClick={() => setQuery("")} className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground transition hover:bg-secondary">
                <X className="h-4 w-4" />
              </button>
            )}
            <button className="rounded-2xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:shadow-paper">
              <Search className="mr-2 h-4 w-4 inline" /> Search
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 px-3 pb-2">
          {[
            "Microgravity effects on bone density",
            "Radiation response of plant tissues",
            "Gut microbiome changes during spaceflight",
            "Cardiac adaptation to long-duration missions",
          ].map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground transition-smooth hover:border-accent/40 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-20 space-y-6">
            <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5" /> Filters
              </div>
              <button onClick={clearFilters} className="rounded-full border border-border bg-background/80 px-2 py-1 text-[11px] font-semibold text-accent transition hover:bg-accent/10">
                Reset
              </button>
            </div>
            <FacetGroup title="Organism" items={organisms} selected={orgFilter} onChange={setOrgFilter} />
            <FacetGroup title="Condition" items={conditions} selected={condFilter} onChange={setCondFilter} />
            <FacetGroup title="System" items={systems} selected={sysFilter} onChange={setSysFilter} />
          </div>
        </aside>

        <div className="lg:col-span-5">
          <div className="mb-3 flex items-baseline justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-mono text-foreground">{filtered.length}</span> results
            </div>
            <div className="font-mono text-xs text-muted-foreground">powered by NASA corpus search</div>
          </div>
          <div className="space-y-3">
            {isLoading && (
              <div className="rounded-xl border border-border p-8 text-center text-sm text-muted-foreground">Loading results…</div>
            )}
            {filtered.length === 0 && (
              <div className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">No publications match. Try clearing filters or changing the query.</div>
            )}
            {filtered.map((p) => {
              const isActive = activePub?.id === p.id;
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
              <div className="text-sm text-muted-foreground">Select a publication to inspect the engine’s findings.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FacetGroup({ title, items, selected, onChange }: { title: string; items: string[]; selected: string[]; onChange: (value: string[]) => void }) {
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

function Pill({ children, accent, muted }: { children: ReactNode; accent?: boolean; muted?: boolean }) {
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
