import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NASA Space Biology Knowledge Engine" },
      { name: "description", content: "Background, objectives, and architecture of the NASA Space Biology Knowledge Engine concept." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Project Brief</div>
      <h1 className="mt-2 font-serif text-5xl font-semibold leading-tight">About the engine</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        A concept platform proposed for the 2025 NASA International Space Apps Challenge — built to make decades of space biology research instantly searchable, comparable, and visual.
      </p>

      <div className="mt-12 space-y-12 font-serif text-[17px] leading-[1.75] text-foreground/90">
        <Section title="Why it matters">
          NASA's space biology corpus spans hundreds of experiments and publications — investigating how microgravity, radiation, and isolation impact living systems. Yet this knowledge is fragmented across repositories, formats, and naming conventions. Without unification, comparative analysis is slow and gaps are easy to miss.
        </Section>

        <Section title="What it does">
          The Knowledge Engine ingests publications and experimental metadata, extracts entities with NLP transformers, normalizes them against domain ontologies (SLSO), and builds a queryable knowledge graph. Researchers can then ask questions in plain English, traverse the graph, and visualize trends across organisms, conditions, and systems.
        </Section>

        <Section title="Five-stage pipeline">
          <ul className="mt-3 space-y-3 font-sans text-base text-muted-foreground">
            {[
              ["Data ingestion", "Automated retrieval from NASA OSDR, GeneLab, PubMed, and bibliographic APIs."],
              ["Entity extraction", "Transformer models identify genes, organisms, stressors, outcomes."],
              ["Knowledge graph", "Entities and relations stored in Neo4j / RDF with SPARQL support."],
              ["Semantic search", "LLMs translate natural language into Cypher / SPARQL graph queries."],
              ["Visualization", "Network graphs, trend charts, and density heatmaps surface insight."],
            ].map(([h, b]) => (
              <li key={h} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                <div><span className="font-semibold text-foreground">{h}.</span> {b}</div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Impact">
          The engine reduces literature-discovery time, surfaces previously obscured relationships, and supports evidence-based decision-making for long-duration missions. Because it relies on open data and semantic standards, it remains interoperable with future omics datasets and community contributions.
        </Section>

        <Section title="Stack">
          <p className="mt-2 font-sans text-base text-muted-foreground">
            <strong>Backend</strong>: Python ingestion, Hugging Face transformers, spaCy. <strong>Graph</strong>: Neo4j with SLSO ontology mapping. <strong>Frontend</strong>: React + TanStack, Recharts, custom SVG visualizations.
          </p>
        </Section>
      </div>

      <div className="mt-16 flex flex-wrap gap-3">
        <Link to="/explore" className="rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background">Try the Explorer</Link>
        <Link to="/graph" className="rounded-md border border-border px-5 py-3 text-sm font-medium">Open the graph</Link>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-3xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
