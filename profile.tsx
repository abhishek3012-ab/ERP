import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Building2, Shield, Activity, Keyboard } from "lucide-react";
import { PageHeader, Section } from "@/components/erp/page";
import { StatusPill } from "@/components/erp/status-pill";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Nexus ERP" },
      {
        name: "description",
        content: "Your Nexus ERP profile: role, permissions, recent activity and keyboard shortcuts.",
      },
      { property: "og:title", content: "Profile — Nexus ERP" },
      {
        property: "og:description",
        content: "Your Nexus ERP profile: role, permissions, recent activity and keyboard shortcuts.",
      },
    ],
  }),
  component: Profile,
});

const activity = [
  { text: "Approved PO-2411 for ₹6,84,000", time: "Today · 10:24" },
  { text: "Created sales order SO-4412 for Siemens India", time: "Today · 09:02" },
  { text: "Commented on NCR-034 root cause analysis", time: "Yesterday · 17:41" },
  { text: "Updated reorder level for SMD LED Avago 0824", time: "Yesterday · 14:08" },
  { text: "Exported the monthly GST summary", time: "30 Jul · 11:15" },
];

const permissions = [
  "Approve purchase orders up to ₹25L",
  "Full access to Production and Inventory",
  "Read-only access to Payroll",
  "Manage CRM pipeline and quotations",
];

const shortcuts = [
  { keys: "Ctrl K", label: "Command menu" },
  { keys: "G then D", label: "Go to dashboard" },
  { keys: "N", label: "Quick create" },
  { keys: "?", label: "Shortcut help" },
];

function Profile() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Profile"
        description="Your account, access level and recent footprint across the workspace."
        actions={
          <Button variant="outline" className="rounded-xl">
            Edit profile
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <Section>
          <div className="flex flex-col items-center text-center">
            <span className="grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 text-2xl font-bold text-primary">
              AK
            </span>
            <p className="mt-4 text-lg font-semibold">Arjun Kulkarni</p>
            <p className="text-sm text-muted-foreground">Plant Lead · Production</p>
            <div className="mt-3">
              <StatusPill tone="success">Active</StatusPill>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm">
            <p className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0" /> arjun.k@nexusind.com
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" /> +91 98220 41188
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4 shrink-0" /> Chakan Plant 1
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" /> Pune, Maharashtra
            </p>
          </div>
        </Section>

        <div className="space-y-6">
          <Section title="Access" description="Role: Plant Manager">
            <ul className="grid gap-2 sm:grid-cols-2">
              {permissions.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 rounded-xl border border-border bg-muted/30 p-3 text-xs text-muted-foreground"
                >
                  <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Recent activity" description="Last 7 days">
            <ol className="relative space-y-4 border-l border-border pl-5">
              {activity.map((a) => (
                <li key={a.text} className="relative">
                  <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/15" />
                  <p className="text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="h-3.5 w-3.5" /> 1,204 actions this quarter
            </p>
          </Section>

          <Section title="Keyboard shortcuts" description="Move faster">
            <div className="grid gap-2 sm:grid-cols-2">
              {shortcuts.map((s) => (
                <div
                  key={s.keys}
                  className="flex items-center justify-between rounded-xl border border-border px-3 py-2"
                >
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <kbd className="rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-semibold">
                    {s.keys}
                  </kbd>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Keyboard className="h-3.5 w-3.5" /> Press Ctrl + K anywhere to jump between modules.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}