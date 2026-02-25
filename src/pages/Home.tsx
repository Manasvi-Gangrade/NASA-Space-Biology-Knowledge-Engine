import { Link } from "react-router-dom";
import { ArrowRight, Database, Network, Search, Sparkles, BookOpen, Microscope, Rocket, Brain, GitBranch } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";
import { yearTrend, organisms, conditions, publications } from "@/lib/data";
import { nasaDataSources } from "@/lib/nasaSources";

const Home = () => {
  return (
    <div>
      <section className="relative overflow-hidden bg-hero-light text-slate-900">
        <div className="absolute inset-0 hero-texture opacity-90" />
        <div className="absolute inset-0 grid-paper opacity-20" />
        <div className="absolute -right-24 top-12 h-[22rem] w-[22rem] rounded-full bg-gradient-aurora opacity-80 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-white/80 blur-3xl" />
        <div className="pointer-events-none absolute left-[12%] top-[30%] h-1.5 w-1.5 rounded-full bg-accent animate-twinkle" />
        <div className="pointer-events-none absolute right-[28%] top-[18%] h-1 w-1 rounded-full bg-primary animate-twinkle" style={{ animationDelay: "0.8s" }} />
        <div className="pointer-events-none absolute left-[60%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-nebula animate-twinkle" style={{ animationDelay: "1.6s" }} />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              2025 NASA Space Apps Challenge · Concept Platform
            </div>
            <h1 className="mt-6 font-serif text-5xl font-normal italic-fix leading-[1.02] tracking-tight text-balance md:text-7xl">
              The semantic atlas of <span className="text-gradient-cosmos animate-gradient">space biology</span> research.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-700 text-balance">
              An AI-driven knowledge engine that ingests, links, and reasons over NASA's space biology corpus — turning fragmented publications into an interactive graph of organisms, conditions, and discoveries.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/explore" className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-elevated">
                Explore the corpus <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/graph" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100">
                <Network className="h-4 w-4" /> View knowledge graph
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Launch Explorer", desc: "Query the research corpus with natural language and discover evidence fast.", href: "/explore" },
                { title: "Inspect graph", desc: "Traverse organism, condition and publication links in an interactive network.", href: "/graph" },
                { title: "Browse papers", desc: "Sort and filter the corpus to find high-impact studies and trends.", href: "/publications" },
              ].map((action) => (
                <Link key={action.href} to={action.href} className="rounded-[1.5rem] border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-elevated">
                  <div className="font-semibold text-foreground">{action.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{action.desc}</p>
                </Link>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
              {[
                { v: "608+", l: "Publications indexed" },
                { v: "12k", l: "Entity relationships" },
                { v: "32", l: "Organisms tracked" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-serif text-3xl font-semibold text-slate-900">{s.v}</div>
                  <div className="text-xs uppercase tracking-widest text-slate-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative rounded-2xl border border-border bg-card p-6 shadow-elevated">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-accent" /> Natural language query
              </div>
              <div className="mt-3 rounded-lg border border-border bg-secondary/50 p-3 font-mono text-sm">
                <span className="text-accent">›</span> Find publications studying microgravity effects on bone density in mice
              </div>
              <div className="mt-4 space-y-2">
                {publications.slice(0, 3).map((p) => (
                  <div key={p.id} className="rounded-md border border-border/70 p-3 text-sm transition-smooth hover:border-accent/60 hover:bg-secondary/40">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-mono">{p.id} · {p.year}</span>
                      <span>{p.journal}</span>
                    </div>
                    <div className="mt-1 line-clamp-2 font-medium">{p.title}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Tag>{p.organism}</Tag>
                      <Tag accent>{p.condition}</Tag>
                      <Tag>{p.system}</Tag>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Translated to Cypher · 0.42s</span>
                <Link to="/explore" className="font-medium text-accent hover:underline">Open Explorer →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          eyebrow="System Architecture"
          title="From scattered PDFs to a queryable knowledge graph"
          description="Five tightly-integrated components transform unstructured research into structured, semantic insight."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-5">
          {[
            { icon: Database, title: "Ingestion", desc: "Automated retrieval from NASA repositories, OSDR, and PubMed APIs." },
            { icon: Brain, title: "NLP Extraction", desc: "Transformer models extract genes, organisms, stressors, outcomes." },
            { icon: GitBranch, title: "Knowledge Graph", desc: "Entities and relations stored in Neo4j with SLSO ontology mapping." },
            { icon: Search, title: "Semantic Search", desc: "LLM translates natural language into Cypher / SPARQL queries." },
            { icon: Network, title: "Visualization", desc: "Interactive networks, trends, heatmaps, and gap analysis." },
          ].map((s) => (
            <div key={s.title} className="relative rounded-xl border border-border bg-card p-5 shadow-paper transition-smooth hover:-translate-y-1 hover:shadow-elevated">
              <div className="absolute -top-3 left-5 rounded-full bg-foreground px-2 py-0.5 font-mono text-[10px] text-background">0{(s.title === "Ingestion" ? 1 : s.title === "NLP Extraction" ? 2 : s.title === "Knowledge Graph" ? 3 : s.title === "Semantic Search" ? 4 : 5)}</div>
              <s.icon className="h-6 w-6 text-accent" />
              <div className="mt-3 font-serif text-lg font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          eyebrow="Data Sources"
          title="Integrating NASA publication and metadata repositories"
          description="The engine is designed to ingest content from NASA open science sources such as NTRS, PubSpace, OSDR, and the Open Data Portal."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nasaDataSources.map((source) => (
            <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="group rounded-3xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:shadow-elevated">
              <div className="text-sm font-semibold text-foreground">{source.name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{source.description}</p>
              <div className="mt-4 text-xs uppercase tracking-[0.3em] text-accent">{source.focus}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Living Corpus"
            title="A growing body of evidence"
            description="Publication volume across NASA-funded space biology research, 2008–2025."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6 shadow-paper md:col-span-2">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Publications per year</div>
                  <div className="font-serif text-2xl font-semibold">Research velocity</div>
                </div>
                <div className="font-mono text-xs text-muted-foreground">2008 — 2025</div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={yearTrend}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.32 0.14 270)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="oklch(0.32 0.14 270)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.08 270 / 0.1)" />
                    <XAxis dataKey="year" stroke="oklch(0.46 0.03 260)" fontSize={11} />
                    <YAxis stroke="oklch(0.46 0.03 260)" fontSize={11} />
                    <Tooltip contentStyle={{ background: "oklch(0.995 0.004 250)", border: "1px solid oklch(0.88 0.015 250)", borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="publications" stroke="oklch(0.32 0.14 270)" strokeWidth={2} fill="url(#g1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-paper">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Citation impact</div>
              <div className="font-serif text-2xl font-semibold">Knowledge influence</div>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearTrend}>
                    <Line type="monotone" dataKey="citations" stroke="oklch(0.55 0.16 320)" strokeWidth={2.5} dot={false} />
                    <XAxis dataKey="year" hide />
                    <Tooltip contentStyle={{ background: "oklch(0.995 0.004 250)", border: "1px solid oklch(0.88 0.015 250)", borderRadius: 8, fontSize: 12 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-muted-foreground">Avg. citations / paper</span><span className="font-mono">42.7</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Cross-domain links</span><span className="font-mono">1,284</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Active organisms</span><span className="font-mono">{organisms.length}</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Stressor types</span><span className="font-mono">{conditions.length}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          eyebrow="Use Cases"
          title="Built for researchers, mission planners, and educators"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: Microscope, title: "Comparative analysis", desc: "Compare expression patterns across organisms exposed to similar stressors." },
            { icon: Rocket, title: "Mission planning", desc: "Surface evidence-backed health risks for long-duration crewed missions." },
            { icon: BookOpen, title: "Gap discovery", desc: "Identify under-explored organism × condition combinations to target." },
          ].map((u) => (
            <div key={u.title} className="rounded-xl border border-border bg-card p-6 shadow-paper transition-smooth hover:shadow-elevated">
              <u.icon className="h-7 w-7 text-accent" />
              <div className="mt-4 font-serif text-xl font-semibold">{u.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-ink p-12 text-primary-foreground shadow-elevated md:p-16">
          <div className="absolute inset-0 grid-paper opacity-20" />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">Ready to interrogate the cosmos?</h2>
              <p className="mt-3 max-w-md text-primary-foreground/70">
                Start asking questions in plain English and watch the engine traverse decades of NASA biology in seconds.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/explore" className="rounded-md bg-background px-5 py-3 text-sm font-medium text-foreground">Open Explorer</Link>
              <Link to="/about" className="rounded-md border border-primary-foreground/30 px-5 py-3 text-sm font-medium transition-smooth hover:bg-primary-foreground/10">Read the brief</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</div>
      <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">{title}</h2>
      {description && <p className="mt-3 text-muted-foreground">{description}</p>}
    </div>
  );
}

function Tag({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${accent ? "border-accent/30 bg-accent/10 text-accent" : "border-border bg-secondary text-muted-foreground"}`}>
      {children}
    </span>
  );
}

export default Home;
