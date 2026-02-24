import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  FileText, 
  Network, 
  Search, 
  TrendingUp, 
  Lightbulb,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, color: "text-chart-blue" },
  { title: "Publications", url: "/research", icon: FileText, color: "text-chart-teal" },
  { title: "Knowledge Graph", url: "/knowledge-graph", icon: Network, color: "text-chart-purple" },
  { title: "Search", url: "/search", icon: Search, color: "text-chart-orange" },
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
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary group"
            activeClassName="bg-primary/5 text-foreground font-medium border-l-2 border-primary"
          >
            <item.icon className={`w-4 h-4 flex-shrink-0 group-hover:${item.color} transition-colors`} />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="px-2 pb-3 space-y-0.5">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
          activeClassName="text-foreground bg-primary/5"
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
