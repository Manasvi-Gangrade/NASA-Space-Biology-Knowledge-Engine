import { Link } from "@tanstack/react-router";
import { Atom } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/graph", label: "Knowledge Graph" },
  { to: "/publications", label: "Publications" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-md bg-gradient-ink text-primary-foreground shadow-paper">
            <Atom className="h-5 w-5" />
            <span className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
          </div>
          <div className="leading-tight">
            <div className="flex items-baseline gap-1.5">
              <span className="rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-widest text-accent-foreground">NASA</span>
              <span className="font-serif text-base font-semibold tracking-tight">Space Biology</span>
            </div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Knowledge Engine</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/explore"
          className="hidden rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-smooth hover:opacity-90 md:inline-flex"
        >
          Launch Engine →
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-serif text-lg font-semibold">NASA Space Biology Knowledge Engine</div>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            An AI-driven research platform that structures, indexes, and semantically searches NASA's
            space biology corpus to accelerate discovery for long-duration missions.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Resources</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/publications" className="hover:text-accent">Publications</Link></li>
            <li><Link to="/graph" className="hover:text-accent">Knowledge Graph</Link></li>
            <li><Link to="/insights" className="hover:text-accent">Insights</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Project</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><span className="text-muted-foreground">2025 NASA Space Apps</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        Built with open NASA data · Concept project — not affiliated with NASA
      </div>
    </footer>
  );
}
