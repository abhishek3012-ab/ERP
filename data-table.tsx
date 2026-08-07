import { useMemo, useState, type ReactNode } from "react";
import { ArrowUpDown, Download, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: keyof T & string;
  header: string;
  align?: "left" | "right";
  render?: (row: T) => ReactNode;
  sortable?: boolean;
};

export function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  searchKeys,
  emptyLabel = "No records found",
  toolbar,
}: {
  columns: Column<T>[];
  rows: T[];
  searchKeys?: (keyof T & string)[];
  emptyLabel?: string;
  toolbar?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);

  const filtered = useMemo(() => {
    const keys = searchKeys ?? columns.map((c) => c.key);
    let out = rows;
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((r) => keys.some((k) => String(r[k] ?? "").toLowerCase().includes(q)));
    }
    if (sort) {
      out = [...out].sort((a, b) => {
        const av = a[sort.key];
        const bv = b[sort.key];
        if (typeof av === "number" && typeof bv === "number") return (av - bv) * sort.dir;
        return String(av).localeCompare(String(bv)) * sort.dir;
      });
    }
    return out;
  }, [rows, query, sort, columns, searchKeys]);

  return (
    <div className="card-soft overflow-hidden">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border p-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="relative min-w-0 sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search records..."
            className="h-9 rounded-xl pl-9"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {toolbar}
          <Button variant="outline" size="sm" className="rounded-xl">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="max-h-[540px] overflow-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-surface-2/90 backdrop-blur">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    c.align === "right" ? "text-right" : "text-left",
                  )}
                >
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 hover:text-foreground"
                    onClick={() =>
                      setSort((s) =>
                        s?.key === c.key ? { key: c.key, dir: s.dir === 1 ? -1 : 1 } : { key: c.key, dir: 1 },
                      )
                    }
                  >
                    {c.header}
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-t border-border/70 transition-colors hover:bg-muted/50">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "px-4 py-3 align-middle",
                      c.align === "right" ? "text-right tabular-nums" : "text-left",
                    )}
                  >
                    {c.render ? c.render(row) : String(row[c.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-14 text-center text-sm text-muted-foreground">
                  {emptyLabel}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border p-3 text-xs text-muted-foreground">
        <span>
          Showing {filtered.length} of {rows.length} records
        </span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="rounded-lg" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg">
            1
          </Button>
          <Button variant="ghost" size="sm" className="rounded-lg">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
