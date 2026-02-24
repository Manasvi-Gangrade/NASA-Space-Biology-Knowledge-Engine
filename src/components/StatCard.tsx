import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: string;
  delay?: number;
  color?: string;
}

export function StatCard({ title, value, subtitle, icon, trend, color = "bg-chart-blue" }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-semibold text-foreground mt-1">{value}</p>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
          {trend && (
            <p className="text-xs text-accent mt-2 font-medium">{trend}</p>
          )}
        </div>
        <div className={`p-2 rounded-md ${color}/10 text-foreground`}>
          <div className={`${color} text-white p-1.5 rounded-md`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
