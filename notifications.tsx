import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Package,
  Receipt,
  Users,
  Factory,
} from "lucide-react";
import { PageHeader, Section } from "@/components/erp/page";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/erp/status-pill";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Nexus ERP" },
      {
        name: "description",
        content: "Approvals, stock alerts, production events and system activity in one timeline.",
      },
      { property: "og:title", content: "Notifications — Nexus ERP" },
      {
        property: "og:description",
        content: "Approvals, stock alerts, production events and system activity in one timeline.",
      },
    ],
  }),
  component: Notifications,
});

const feed = [
  {
    icon: AlertTriangle,
    tone: "bg-accent/15 text-accent",
    title: "Steel rod 12mm below critical level",
    body: "1.2 T on hand against a 3 T reorder point. MRP suggests an urgent PO to Sigma Metals.",
    time: "12 min ago",
    tag: "Inventory",
    unread: true,
  },
  {
    icon: Receipt,
    tone: "bg-primary/10 text-primary",
    title: "PO-2418 awaiting your approval",
    body: "₹18,42,000 raised by Priya Sharma for raw material purchase.",
    time: "4 hours ago",
    tag: "Approvals",
    unread: true,
  },
  {
    icon: Factory,
    tone: "bg-secondary/10 text-secondary",
    title: "HiPot tester MC-15 reported a breakdown",
    body: "Testing bay is down. Two work orders re-sequenced automatically.",
    time: "6 hours ago",
    tag: "Manufacturing",
    unread: true,
  },
  {
    icon: Package,
    tone: "bg-primary/10 text-primary",
    title: "SO-4408 dispatched",
    body: "21 lines packed and handed to the carrier from Dock-01.",
    time: "Yesterday",
    tag: "Warehouse",
    unread: false,
  },
  {
    icon: Users,
    tone: "bg-muted text-muted-foreground",
    title: "Kiran Patil requested 4 days of earned leave",
    body: "Approval routed to Arjun Kulkarni with an SLA of 24 hours.",
    time: "2 days ago",
    tag: "HRMS",
    unread: false,
  },
];

const channels = [
  { label: "Approvals", desc: "Documents waiting on you", on: true },
  { label: "Stock alerts", desc: "Reorder and critical levels", on: true },
  { label: "Production events", desc: "Breakdowns and delays", on: true },
  { label: "Daily AI brief", desc: "Morning summary at 08:00", on: true },
  { label: "Marketing digest", desc: "Product news from Nexus", on: false },
];

function Notifications() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Notifications"
        description="Everything that needs your attention, ranked by business impact."
        actions={
          <Button variant="outline" className="rounded-xl">
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all read
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Section title="Activity" description="3 unread">
          <div className="space-y-2">
            {feed.map((f) => (
              <div
                key={f.title}
                className={`flex gap-3 rounded-2xl p-3 transition-colors ${
                  f.unread ? "bg-muted/50" : "hover:bg-muted/40"
                }`}
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${f.tone}`}>
                  <f.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{f.title}</p>
                    {f.unread ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{f.body}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <StatusPill tone="neutral">{f.tag}</StatusPill>
                    <span className="text-xs text-muted-foreground">{f.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Preferences" description="Choose what reaches you">
          <div className="space-y-3">
            {channels.map((c) => (
              <div key={c.label} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{c.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.desc}</p>
                </div>
                <span
                  className={`h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${
                    c.on ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`block h-5 w-5 rounded-full bg-card shadow transition-transform ${
                      c.on ? "translate-x-5" : ""
                    }`}
                  />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-dashed border-border p-4 text-center">
            <Bell className="mx-auto h-5 w-5 text-muted-foreground" />
            <p className="mt-2 text-xs text-muted-foreground">
              Quiet hours are on between 21:00 and 07:00.
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}