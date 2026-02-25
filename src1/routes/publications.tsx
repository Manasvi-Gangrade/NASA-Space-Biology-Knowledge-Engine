import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { publications } from "@/lib/data";
import { ArrowUpDown } from "lucide-react";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — Space Biology Knowledge Engine" },
      { name: "description", content: "Browse the indexed corpus of NASA space biology publications." },
    ],
  }),
  component: PublicationsPage,
});

type SortKey = "year" | "citations" | "title";

function PublicationsPage() {
  const [sort, setSort] = useState<SortKey>("year");
  const [dir, setDir] = useState<1 | -1>(-1);

  const rows = useMemo(() => {
    const sorted = [...publications].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title) * dir;
      return ((a[sort] as number) - (b[sort] as number)) * dir;
    });
    return sorted;
  }, [sort, dir]);

  const toggle = (k: SortKey) => {
    if (sort === k) setDir((d) => (d === 1 ? -1 : 1));
    else { setSort(k); setDir(-1); }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Corpus</div>
      <h1 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Publications catalogue</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        The full set of indexed publications, normalized against SLSO ontologies. Sort and inspect.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-paper">
        <div className="grid grid-cols-12 gap-4 border-b border-border bg-secondary/40 px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          <button onClick={() => toggle("title")} className="col-span-6 flex items-center gap-1 text-left hover:text-foreground"><ArrowUpDown className="h-3 w-3" /> Title</button>
          <div className="col-span-2">Organism</div>
          <div className="col-span-2">Condition</div>
          <button onClick={() => toggle("year")} className="col-span-1 flex items-center gap-1 hover:text-foreground"><ArrowUpDown className="h-3 w-3" /> Year</button>
          <button onClick={() => toggle("citations")} className="col-span-1 flex items-center gap-1 hover:text-foreground"><ArrowUpDown className="h-3 w-3" /> Cit.</button>
        </div>
        <ul className="divide-y divide-border">
          {rows.map((p) => (
            <li key={p.id} className="grid grid-cols-12 gap-4 px-5 py-4 text-sm transition-smooth hover:bg-secondary/30">
              <div className="col-span-6">
                <div className="font-mono text-[10px] text-muted-foreground">{p.id} · {p.journal}</div>
                <div className="mt-0.5 font-serif text-base font-medium leading-snug">{p.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{p.authors.join(", ")}</div>
              </div>
              <div className="col-span-2 self-center"><em>{p.organism}</em></div>
              <div className="col-span-2 self-center"><span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[11px] text-accent">{p.condition}</span></div>
              <div className="col-span-1 self-center font-mono text-xs">{p.year}</div>
              <div className="col-span-1 self-center font-mono text-xs">{p.citations}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
