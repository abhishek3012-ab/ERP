import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity, ArrowRight, Boxes, CalendarDays, CheckCircle2, CloudSun, Factory, Megaphone,
  Package, ShoppingCart, Sparkles, TrendingUp, Wallet, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader, Section } from "@/components/erp/page";
import { StatCard } from "@/components/erp/stat-card";
import { StatusPill } from "@/components/erp/status-pill";
import { Bars, chartColors, Donut, TrendArea } from "@/components/erp/charts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Nexus ERP" },
      {
        name: "description",
        content:
          "Live operations dashboard with revenue, production, inventory and approval insights powered by AI.",
      },
      { property: "og:title", content: "Dashboard — Nexus ERP" },
      { property: "og:description", content: "Live enterprise operations dashboard powered by AI." },
    ],
  }),
  component: Dashboard,
});

const revenue = [
  { name: "Jan", revenue: 412, profit: 118 },
  { name: "Feb", revenue: 468, profit: 141 },
  { name: "Mar", revenue: 521, profit: 158 },
  { name: "Apr", revenue: 498, profit: 149 },
  { name: "May", revenue: 604, profit: 191 },
  { name: "Jun", revenue: 672, profit: 214 },
  { name: "Jul", revenue: 741, profit: 248 },
];

const cashflow = [
  { name: "W1", inflow: 84, outflow: 61 },
  { name: "W2", inflow: 96, outflow: 72 },
  { name: "W3", inflow: 71, outflow: 68 },
  { name: "W4", inflow: 118, outflow: 79 },
];

const inventoryMix = [
  { name: "Raw material", value: 42, color: chartColors.green },
  { name: "WIP", value: 24, color: chartColors.blue },
  { name: "Finished", value: 22, color: chartColors.orange },
  { name: "Reject", value: 12, color: chartColors.violet },
];

const activities = [
  { who: "Priya S.", what: "approved PO-2418 for Vertex Components", when: "4m ago", tone: "success" as const },
  { who: "System", what: "flagged low stock on VPIS_LED_0824", when: "22m ago", tone: "warning" as const },
  { who: "Arjun K.", what: "closed work order WO-1187 (2h early)", when: "1h ago", tone: "info" as const },
  { who: "Meera R.", what: "created quotation QT-0912 · ₹18.4L", when: "2h ago", tone: "neutral" as const },
  { who: "QC Bot", what: "raised NCR-034 on batch B-7741", when: "3h ago", tone: "danger" as const },
];

const tasks = [
  { title: "Approve June payroll run", due: "Today · 4:00 PM", done: false },
  { title: "Review vendor rating — Sigma Metals", due: "Today · 6:30 PM", done: false },
  { title: "Sign off BOM for ATSH-4600", due: "Tomorrow", done: true },
  { title: "Cycle count — Warehouse B rack 12", due: "Fri", done: false },
];

const production = [
  { line: "SMT Line 1", output: 92, status: "Running" },
  { line: "Wire Harness", output: 74, status: "Running" },
  { line: "Assembly A", output: 48, status: "Changeover" },
  { line: "Testing Bay", output: 88, status: "Running" },
];

function Dashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Good evening, Roshan"
        title="Operations Command Center"
        description="Everything happening across Elite Technologies today — synced 2 minutes ago."
        actions={
          <>
            <Button variant="outline" className="rounded-xl">
              <CalendarDays className="h-4 w-4" /> Last 30 days
            </Button>
            <Button className="rounded-xl">
              <Zap className="h-4 w-4" /> Customise widgets
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue this month" value="₹7.41 Cr" delta={12.4} icon={Wallet} hint="Target ₹8.0 Cr" />
        <StatCard label="Today's orders" value="36" delta={8.1} icon={ShoppingCart} tone="secondary" hint="9 awaiting dispatch" />
        <StatCard label="Pending approvals" value="8" delta={-14} icon={CheckCircle2} tone="accent" hint="3 older than 48h" />
        <StatCard label="Inventory value" value="₹2.18 Cr" delta={3.2} icon={Boxes} tone="muted" hint="12 low-stock items" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Section
          className="xl:col-span-2"
          title="Revenue vs profit"
          description="Monthly performance in ₹ lakhs"
          actions={<StatusPill tone="success">+18.6% YoY</StatusPill>}
        >
          <TrendArea
            data={revenue}
            height={280}
            keys={[
              { key: "revenue", color: chartColors.green, label: "Revenue" },
              { key: "profit", color: chartColors.blue, label: "Profit" },
            ]}
          />
        </Section>

        <Section title="AI insights" description="Generated from live ERP data">
          <div className="space-y-3">
            {[
              { t: "Stockout risk", d: "3 SKUs will breach safety stock within 6 days. Raise PO for Sigma Metals now.", tone: "warning" as const },
              { t: "Demand forecast", d: "Q3 demand for LT_SMPS_12V trending +22%. Increase batch size to 850.", tone: "success" as const },
              { t: "Vendor watch", d: "Vertex Components on-time delivery dropped to 78%. Consider dual sourcing.", tone: "danger" as const },
            ].map((i) => (
              <div key={i.t} className="rounded-2xl border border-border bg-surface-2/60 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="h-4 w-4 text-primary" />
                    {i.t}
                  </span>
                  <StatusPill tone={i.tone}>Action</StatusPill>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{i.d}</p>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full rounded-xl">
              <Link to="/ai-assistant">
                Open AI Assistant <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Section title="Cash flow" description="Inflow vs outflow · ₹ lakhs">
          <Bars
            data={cashflow}
            height={230}
            keys={[
              { key: "inflow", color: chartColors.green, label: "Inflow" },
              { key: "outflow", color: chartColors.orange, label: "Outflow" },
            ]}
          />
        </Section>

        <Section title="Inventory mix" description="Share of ₹2.18 Cr stock value">
          <Donut data={inventoryMix} height={230} />
        </Section>

        <Section title="Production status" description="Shop floor output vs plan">
          <div className="space-y-4">
            {production.map((p) => (
              <div key={p.line}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{p.line}</span>
                  <span className="tabular-nums text-muted-foreground">{p.output}%</span>
                </div>
                <Progress value={p.output} className="h-2" />
                <p className="mt-1 text-[11px] text-muted-foreground">{p.status}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Section
          className="xl:col-span-2"
          title="Recent activity"
          description="Live feed across all modules"
          actions={
            <Button variant="ghost" size="sm" className="rounded-lg">
              View all
            </Button>
          }
        >
          <ul className="space-y-1">
            {activities.map((a, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted/60"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary/12 text-[10px] font-bold text-secondary">
                  {a.who.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground/80">{a.when}</p>
                </div>
                <StatusPill tone={a.tone}>{a.tone === "danger" ? "Issue" : "Update"}</StatusPill>
              </li>
            ))}
          </ul>
        </Section>

        <div className="space-y-6">
          <Section title="Today's tasks" description="4 items assigned to you">
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li key={t.title} className="flex items-start gap-3 rounded-xl bg-surface-2/60 p-3">
                  <span
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                      t.done ? "border-primary bg-primary text-primary-foreground" : "border-border"
                    }`}
                  >
                    {t.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${t.done ? "line-through opacity-60" : ""}`}>
                      {t.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{t.due}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Quick actions">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "New order", icon: ShoppingCart, to: "/sales" },
                { label: "New PO", icon: Package, to: "/purchase" },
                { label: "Work order", icon: Factory, to: "/production" },
                { label: "Analytics", icon: TrendingUp, to: "/analytics" },
              ].map((q) => (
                <Button key={q.label} asChild variant="outline" className="h-auto justify-start rounded-xl py-3">
                  <Link to={q.to}>
                    <q.icon className="h-4 w-4 text-primary" />
                    <span className="truncate text-xs font-semibold">{q.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Section title="Announcements">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
              <Megaphone className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium">Product variants are live</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Item master now supports process variants and WIP stores. Rollout completed 29 July.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Plant conditions">
          <div className="flex items-center gap-4">
            <CloudSun className="h-10 w-10 text-accent" />
            <div>
              <p className="text-2xl font-bold">24°C</p>
              <p className="text-xs text-muted-foreground">Cloudy · Pune plant · humidity 68%</p>
            </div>
          </div>
        </Section>

        <Section title="System health">
          <div className="space-y-3 text-sm">
            {[
              { l: "Sync engine", v: "Operational" },
              { l: "AI services", v: "Operational" },
              { l: "Tally bridge", v: "Degraded" },
            ].map((s) => (
              <div key={s.l} className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" /> {s.l}
                </span>
                <StatusPill tone={s.v === "Operational" ? "success" : "warning"}>{s.v}</StatusPill>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
