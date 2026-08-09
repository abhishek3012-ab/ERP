import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  delta?: number;
  icon?: LucideIcon;
  tone?: "default" | "secondary" | "accent" | "muted";
  hint?: string;
}

const toneStyles = {
  default:
    "bg-gradient-to-br from-blue-500/10 to-blue-600/5 text-blue-600 border-blue-200/50",
  secondary:
    "bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 text-emerald-600 border-emerald-200/50",
  accent:
    "bg-gradient-to-br from-amber-500/10 to-amber-600/5 text-amber-600 border-amber-200/50",
  muted:
    "bg-gradient-to-br from-slate-500/10 to-slate-600/5 text-slate-600 border-slate-200/50",
};

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "default",
  hint,
}: StatCardProps) {
  const isDeltaPositive = (delta ?? 0) >= 0;

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 transition-all hover:shadow-md",
        toneStyles[tone]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {hint && (
            <p className="text-xs text-muted-foreground">{hint}</p>
          )}
        </div>
        {Icon && (
          <div className="rounded-xl bg-white/50 p-3">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {delta !== undefined && (
        <div className="mt-4 flex items-center gap-1">
          <span
            className={cn(
              "text-xs font-semibold",
              isDeltaPositive ? "text-emerald-600" : "text-red-600"
            )}
          >
            {isDeltaPositive ? "+" : ""}{delta}%
          </span>
          <span className="text-xs text-muted-foreground">from last month</span>
        </div>
      )}
    </div>
  );
}
