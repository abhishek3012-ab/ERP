import { createFileRoute } from "@tanstack/react-router";
import { UserPlus, Target, Flame, Percent } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Lead Management — Nexus ERP" },
      { name: "description", content: "Capture, score and route every inbound and outbound lead with AI-assisted prioritisation." },
      { property: "og:title", content: "Lead Management — Nexus ERP" },
      { property: "og:description", content: "Capture, score and route every inbound and outbound lead with AI-assisted prioritisation." },
    ],
  }),
  component: Leads,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "LD-2041", company: "Kirloskar Pneumatics", contact: "S. Rane", source: "Website", score: 92, value: "₹14.2L", status: "Hot", owner: "Meera" },
  { id: "LD-2038", company: "Bharat Forge", contact: "A. Deshmukh", source: "Referral", score: 78, value: "₹32.0L", status: "Warm", owner: "Arjun" },
  { id: "LD-2035", company: "Emcure Pharma", contact: "N. Gupta", source: "Trade show", score: 64, value: "₹21.5L", status: "Warm", owner: "Priya" },
  { id: "LD-2030", company: "Finolex Cables", contact: "R. Patil", source: "Cold call", score: 41, value: "₹8.4L", status: "Cold", owner: "Roshan" },
  { id: "LD-2028", company: "Thermax Ltd", contact: "K. Iyer", source: "LinkedIn", score: 88, value: "₹46.7L", status: "Hot", owner: "Meera" },
  { id: "LD-2024", company: "Praj Industries", contact: "V. Kulkarni", source: "Website", score: 57, value: "₹11.9L", status: "Cold", owner: "Arjun" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Lead ID" },
  { key: "company", header: "Company" },
  { key: "contact", header: "Contact" },
  { key: "source", header: "Source" },
  { key: "score", header: "AI score", align: "right" },
  { key: "value", header: "Est. value", align: "right" },
  { key: "status", header: "Stage", render: (r) => <StatusPill tone={r.status === "Hot" ? "danger" : r.status === "Warm" ? "warning" : "neutral"}>{r.status}</StatusPill> },
  { key: "owner", header: "Owner" },
];

function Leads() {
  return (
    <ModulePage
      eyebrow="Revenue"
      title="Lead Management"
      description="Capture, score and route every inbound and outbound lead with AI-assisted prioritisation."
      primaryAction="Add lead"
      stats={[{ label: "Active leads", value: "248", delta: 11.2, icon: UserPlus, tone: "primary" }, { label: "Qualified", value: "96", delta: 6.4, icon: Target, tone: "secondary" }, { label: "Hot leads", value: "24", delta: 18.0, icon: Flame, tone: "accent" }, { label: "Conversion", value: "31%", delta: 2.8, icon: Percent, tone: "muted" }]}
      tabs={["List", "Kanban", "Sources", "Scoring"]}
      columns={columns}
      rows={rows}
    />
  );
}
