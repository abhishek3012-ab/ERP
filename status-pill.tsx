import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  success: "bg-success/12 text-success ring-success/20",
  warning: "bg-warning/15 text-warning ring-warning/25",
  danger: "bg-destructive/10 text-destructive ring-destructive/20",
  info: "bg-secondary/10 text-secondary ring-secondary/20",
  neutral: "bg-muted text-muted-foreground ring-border",
};

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: keyof typeof map;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        map[tone],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
