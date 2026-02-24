import { AppSidebar } from "@/components/AppSidebar";
import { ReactNode } from "react";
import { Search } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search publications, topics, insights..."
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">247 papers indexed</span>
            <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-medium">
              SB
            </div>
          </div>
        </header>
        <main className="flex-1 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
