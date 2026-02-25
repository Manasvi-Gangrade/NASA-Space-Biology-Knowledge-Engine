import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { Search } from "lucide-react";

export function Layout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="text-sm font-medium text-muted-foreground">Knowledge engine workspace</div>
          <div className="hidden items-center gap-3 sm:flex">
            <div className="relative w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search the engine..."
                className="w-full rounded-full border border-border bg-secondary/90 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-muted-foreground">247 papers indexed</div>
          </div>
        </header>
        <main className="flex-1 scrollbar-thin">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
