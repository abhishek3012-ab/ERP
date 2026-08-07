import { createFileRoute } from "@tanstack/react-router";
import { Plug, Zap, ShieldCheck, RefreshCw } from "lucide-react";
import { PageHeader, Section } from "@/components/erp/page";
import { StatCard } from "@/components/erp/stat-card";
import { StatusPill } from "@/components/erp/status-pill";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Nexus ERP" },
      {
        name: "description",
        content: "Connect accounting, e-invoicing, logistics, messaging and BI tools to your ERP.",
      },
      { property: "og:title", content: "Integrations — Nexus ERP" },
      {
        property: "og:description",
        content: "Connect accounting, e-invoicing, logistics, messaging and BI tools to your ERP.",
      },
    ],
  }),
  component: Integrations,
});

const apps = [
  { name: "GST e-Invoice (IRP)", cat: "Compliance", desc: "Auto-generate IRN and QR for every B2B invoice.", status: "Connected", sync: "2 min ago" },
  { name: "Tally Prime", cat: "Accounting", desc: "Two-way ledger and voucher sync with your books.", status: "Connected", sync: "18 min ago" },
  { name: "Shiprocket", cat: "Logistics", desc: "Rate shopping, AWB generation and delivery tracking.", status: "Connected", sync: "1 hour ago" },
  { name: "WhatsApp Business", cat: "Messaging", desc: "Order updates and approval nudges on WhatsApp.", status: "Action needed", sync: "Token expired" },
  { name: "Razorpay", cat: "Payments", desc: "Payment links on invoices with auto reconciliation.", status: "Connected", sync: "5 min ago" },
  { name: "Google Workspace", cat: "Productivity", desc: "SSO, calendar sync and Drive document storage.", status: "Connected", sync: "Live" },
  { name: "Power BI", cat: "Analytics", desc: "Push curated datasets to your BI workspace.", status: "Available", sync: "—" },
  { name: "Zoho People", cat: "HR", desc: "Import attendance and leave balances nightly.", status: "Available", sync: "—" },
];

function Integrations() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Integrations"
        description="Plug Nexus into the tools your teams already run on — with managed auth and health monitoring."
        actions={
          <Button className="rounded-xl">
            <Plug className="mr-2 h-4 w-4" />
            Browse catalogue
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Connected apps" value="14" delta={16.0} icon={Plug} />
        <StatCard label="Events synced (24h)" value="42,180" delta={7.4} icon={RefreshCw} tone="secondary" />
        <StatCard label="Needs attention" value="1" delta={-50.0} icon={ShieldCheck} tone="accent" />
        <StatCard label="Automations live" value="37" delta={11.0} icon={Zap} tone="muted" />
      </div>

      <Section title="Your apps" description="Health and last sync">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((a) => (
            <div key={a.name} className="rounded-2xl border border-border p-4 transition-shadow hover:shadow-[var(--shadow-soft)]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.cat}</p>
                </div>
                <StatusPill
                  tone={a.status === "Connected" ? "success" : a.status === "Action needed" ? "warning" : "neutral"}
                >
                  {a.status}
                </StatusPill>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{a.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Last sync: {a.sync}</span>
                <Button variant="ghost" size="sm" className="rounded-lg text-xs">
                  {a.status === "Available" ? "Connect" : "Manage"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}