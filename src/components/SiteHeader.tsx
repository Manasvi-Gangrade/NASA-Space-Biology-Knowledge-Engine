import { NavLink } from "react-router-dom";
import { Atom } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/publications", label: "Publications" },
  { to: "/graph", label: "Knowledge Graph" },
  { to: "/explore", label: "Explore" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <NavLink to="/" className="flex items-center gap-3 transition-smooth hover:opacity-95">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-background shadow-paper">
            <Atom className="h-5 w-5" />
            <span className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
          </div>
          <div className="leading-tight">
            <div className="flex items-baseline gap-1.5">
              <span className="rounded-full bg-accent px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-foreground">NASA</span>
              <span className="font-serif text-base font-semibold tracking-tight text-foreground">Space Biology</span>
            </div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Knowledge Engine</div>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-smooth ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/explore"
          className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-smooth hover:opacity-90 md:inline-flex"
        >
          Launch explorer
        </NavLink>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40 text-sm text-muted-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-serif text-lg font-semibold text-foreground">NASA Space Biology Knowledge Engine</div>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            An AI-driven research platform that structures, indexes, and semantically searches NASA's space biology corpus.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Resources</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <NavLink to="/graph" className="hover:text-accent">
                Knowledge graph
              </NavLink>
            </li>
            <li>
              <NavLink to="/explore" className="hover:text-accent">
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink to="/insights" className="hover:text-accent">
                Insights
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Project</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <NavLink to="/publications" className="hover:text-accent">
                Publications overview
              </NavLink>
            </li>
            <li>
              <span className="text-muted-foreground">2025 NASA Space Apps</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        Built with open NASA data · Concept project — not affiliated with NASA
      </div>
    </footer>
  );
}
