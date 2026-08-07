import { createFileRoute } from "@tanstack/react-router";
import {
  FileBarChart,
  Download,
  Clock,
  Star,
  ShoppingCart,
  Boxes,
  Factory,
  Wallet,
  Users,
  ShieldCheck,
} from "lucide-react";
import { PageHeader, Section } from "@/components/erp/page";
import { StatCard } from "@/components/erp/stat-card";
import { StatusPill } from "@/components/erp/status-pill";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Nexus ERP" },
      {
        name: "description",
        content:
          "Standard and scheduled reports across sales, inventory, production, finance, people and quality.",
      },
      { property: "og:title", content: "Reports — Nexus ERP" },
      {
        property: "og:description",
        content:
          "Standard and scheduled reports across sales, inventory, production, finance, people and quality.",
      },
    ],
  }),
  component: Reports,
});

const catalog = [
  {
    icon: ShoppingCart,
    group: "Sales",
    tone: "bg-primary/10 text-primary",
    reports: ["Sales register", "Customer ageing", "Quotation conversion", "Region performance"],
  },
  {
    icon: Boxes,
    group: "Inventory",
    tone: "bg-secondary/10 text-secondary",
    reports: ["Stock valuation", "Batch traceability", "Slow moving items", "Reorder report"],
  },
  {
    icon: Factory,
    group: "Production",
    tone: "bg-accent/15 text-accent",
    reports: ["Work order status", "Machine utilisation", "Scrap analysis", "BOM variance"],
  },
  {
    icon: Wallet,
    group: "Finance",
    tone: "bg-primary/10 text-primary",
    reports: ["Trial balance", "P&L statement", "GST summary", "Cash flow"],
  },
  {
    icon: Users,
    group: "People",
    tone: "bg-secondary/10 text-secondary",
    reports: ["Attendance summary", "Payroll register", "Attrition analysis", "Overtime report"],
  },
  {
    icon: ShieldCheck,
    group: "Quality",
    tone: "bg-accent/15 text-accent",
    reports: ["Inspection summary", "NCR trend", "Supplier quality", "CAPA status"],
  },
];

const scheduled = [
  { name: "Daily production brief", freq: "Daily · 08:00", to: "Plant leadership", format: "PDF", status: "Active" },
  { name: "Weekly sales register", freq: "Mon · 09:30", to: "Sales team", format: "XLSX", status: "Active" },
  { name: "Monthly GST summary", freq: "1st · 07:00", to: "Finance", format: "PDF", status: "Active" },
  { name: "Supplier quality scorecard", freq: "Fri · 17:00", to: "Procurement", format: "XLSX", status: "Paused" },
];

function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Intelligence"
        title="Reports"
        description="One catalogue for every standard report, plus scheduled deliveries straight to inboxes."
        actions={
          <Button className="rounded-xl">
            <FileBarChart className="mr-2 h-4 w-4" />
            Build report
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Reports available" value="128" delta={6.0} icon={FileBarChart} />
        <StatCard label="Scheduled" value="24" delta={9.0} icon={Clock} tone="secondary" />
        <StatCard label="Exports this month" value="1,406" delta={14.0} icon={Download} tone="accent" />
        <StatCard label="Pinned by you" value="7" icon={Star} tone="muted" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {catalog.map((c) => (
          <div key={c.group} className="card-soft lift p-5">
            <div className="flex items-center gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${c.tone}`}>
                <c.icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold">{c.group}</p>
            </div>
            <ul className="mt-4 space-y-2">
              {c.reports.map((r) => (
                <li key={r}>
                  <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    {r}
                    <Download className="h-3.5 w-3.5 opacity-60" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Section title="Scheduled deliveries" description="Automated report runs">
        <div className="divide-y divide-border">
          {scheduled.map((s) => (
            <div
              key={s.name}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 sm:flex sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {s.freq} · {s.to} · {s.format}
                </p>
              </div>
              <StatusPill tone={s.status === "Active" ? "success" : "warning"}>{s.status}</StatusPill>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}