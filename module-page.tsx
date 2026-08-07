import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, Section } from "@/components/erp/page";
import { StatCard } from "@/components/erp/stat-card";
import { DataTable, type Column } from "@/components/erp/data-table";

export type ModuleStat = {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  icon: LucideIcon;
  tone?: "primary" | "secondary" | "accent" | "muted";
};

export function ModulePage<T extends Record<string, any>>({
  eyebrow,
  title,
  description,
  primaryAction = "Create new",
  stats,
  tabs,
  columns,
  rows,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: string;
  stats: ModuleStat[];
  tabs: string[];
  columns: Column<T>[];
  rows: T[];
  aside?: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <Button className="rounded-xl">
            <Plus className="h-4 w-4" /> {primaryAction}
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <Tabs defaultValue={tabs[0] ?? "overview"}>
        <TabsList className="flex-wrap rounded-xl">
          {tabs.map((t) => (
            <TabsTrigger key={t} value={t} className="rounded-lg">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tabs[0] ?? "overview"} className="mt-5">
          <div className={aside ? "grid gap-6 xl:grid-cols-3" : ""}>
            <div className={aside ? "xl:col-span-2" : ""}>
              <DataTable columns={columns} rows={rows} />
            </div>
            {aside}
          </div>
        </TabsContent>
        {tabs.slice(1).map((t) => (
          <TabsContent key={t} value={t} className="mt-5">
            <Section title={t} description="Workspace view">
              <div className="grid place-items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
                <p className="text-sm font-semibold">{t}</p>
                <p className="max-w-sm text-xs text-muted-foreground">
                  This view shares the same records with a {t.toLowerCase()} layout. Switch back to{" "}
                  {tabs[0]} for the full data grid.
                </p>
                <Button variant="outline" size="sm" className="rounded-xl">
                  Configure {t.toLowerCase()}
                </Button>
              </div>
            </Section>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
