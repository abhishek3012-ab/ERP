import { GripVertical, MessageSquare, Paperclip } from "lucide-react";
import { StatusPill } from "./status-pill";
import { cn } from "@/lib/utils";

export type KanbanCard = {
  id: string;
  title: string;
  subtitle?: string;
  value?: string;
  owner: string;
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
  tag?: string;
  comments?: number;
  files?: number;
};

export type KanbanColumn = { id: string; title: string; accent: string; cards: KanbanCard[] };

export function KanbanBoard({ columns }: { columns: KanbanColumn[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {columns.map((col) => (
        <div key={col.id} className="w-[290px] shrink-0">
          <div className="mb-3 flex items-center justify-between rounded-xl bg-surface-2 px-3 py-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", col.accent)} />
              <span className="truncate text-sm font-semibold">{col.title}</span>
            </div>
            <span className="shrink-0 rounded-md bg-background px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {col.cards.length}
            </span>
          </div>
          <div className="space-y-3">
            {col.cards.map((card) => (
              <article
                key={card.id}
                draggable
                className="card-soft lift group cursor-grab p-4 active:cursor-grabbing"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-snug">{card.title}</h3>
                  <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                {card.subtitle ? (
                  <p className="mt-1 text-xs text-muted-foreground">{card.subtitle}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {card.tag ? <StatusPill tone={card.tone ?? "neutral"}>{card.tag}</StatusPill> : null}
                  {card.value ? (
                    <span className="text-sm font-bold tabular-nums">{card.value}</span>
                  ) : null}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/12 text-[10px] font-bold text-primary">
                      {card.owner.slice(0, 2).toUpperCase()}
                    </span>
                    {card.owner}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {card.comments ?? 0}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Paperclip className="h-3.5 w-3.5" />
                      {card.files ?? 0}
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
