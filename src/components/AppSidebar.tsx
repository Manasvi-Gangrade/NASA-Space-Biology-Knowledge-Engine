import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  FileText, 
  Network, 
  Search, 
  TrendingUp, 
  Lightbulb,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { title: "Home", url: "/", icon: LayoutDashboard, color: "text-chart-blue" },
  { title: "Publications", url: "/publications", icon: FileText, color: "text-chart-teal" },
  { title: "Knowledge Graph", url: "/graph", icon: Network, color: "text-chart-purple" },
  { title: "Explore", url: "/explore", icon: Search, color: "text-chart-orange" },
  { title: "Trends", url: "/trends", icon: TrendingUp, color: "text-chart-red" },
  { title: "Insights", url: "/insights", icon: Lightbulb, color: "text-chart-amber" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen sticky top-0 flex flex-col border-r border-border bg-card transition-all duration-200 z-50 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-4 border-b border-border gap-2">
        <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground text-xs font-bold">SB</span>
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold text-foreground tracking-tight">
            Space Biology
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm text-muted-foreground transition-all hover:text-foreground hover:bg-secondary"
            activeClassName="bg-accent/10 text-accent font-semibold border-l-4 border-accent"
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${item.color}`} />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-4 space-y-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/80 px-3 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>{collapsed ? "Expand" : "Collapse"}</span>}
        </button>
      </div>
    </aside>
  );
}
