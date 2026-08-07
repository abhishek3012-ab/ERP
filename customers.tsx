import { createFileRoute } from "@tanstack/react-router";
import { Users, Wallet, HeartHandshake, TrendingUp } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers — Nexus ERP" },
      { name: "description", content: "360° customer records with credit exposure, lifetime value and engagement health." },
      { property: "og:title", content: "Customers — Nexus ERP" },
      { property: "og:description", content: "360° customer records with credit exposure, lifetime value and engagement health." },
    ],
  }),
  component: Customers,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "CU-0112", name: "Siemens India", segment: "Enterprise", ltv: "₹6.42 Cr", credit: "₹80L", terms: "60 days", health: "Excellent" },
  { id: "CU-0098", name: "Tata Elxsi", segment: "Enterprise", ltv: "₹4.18 Cr", credit: "₹65L", terms: "45 days", health: "Good" },
  { id: "CU-0087", name: "Cummins India", segment: "Enterprise", ltv: "₹3.94 Cr", credit: "₹50L", terms: "45 days", health: "Excellent" },
  { id: "CU-0074", name: "Godrej & Boyce", segment: "Mid-market", ltv: "₹1.82 Cr", credit: "₹30L", terms: "30 days", health: "At risk" },
  { id: "CU-0061", name: "Finolex Cables", segment: "Mid-market", ltv: "₹94.2L", credit: "₹15L", terms: "30 days", health: "Good" },
  { id: "CU-0043", name: "Praj Industries", segment: "SMB", ltv: "₹42.7L", credit: "₹8L", terms: "15 days", health: "Watch" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Code" },
  { key: "name", header: "Customer" },
  { key: "segment", header: "Segment" },
  { key: "ltv", header: "Lifetime value", align: "right" },
  { key: "credit", header: "Credit limit", align: "right" },
  { key: "terms", header: "Terms" },
  { key: "health", header: "Health", render: (r) => <StatusPill tone={r.health === "Excellent" ? "success" : r.health === "Good" ? "info" : r.health === "Watch" ? "warning" : "danger"}>{r.health}</StatusPill> },
];

function Customers() {
  return (
    <ModulePage
      eyebrow="Revenue"
      title="Customers"
      description="360° customer records with credit exposure, lifetime value and engagement health."
      primaryAction="Add customer"
      stats={[{ label: "Total customers", value: "412", delta: 4.1, icon: Users, tone: "primary" }, { label: "Lifetime value", value: "₹58.4 Cr", delta: 9.7, icon: Wallet, tone: "secondary" }, { label: "Credit exposure", value: "₹4.12 Cr", delta: -3.4, icon: HeartHandshake, tone: "accent" }, { label: "Retention", value: "94%", delta: 1.2, icon: TrendingUp, tone: "muted" }]}
      tabs={["Directory", "Segments", "Credit", "Notes"]}
      columns={columns}
      rows={rows}
    />
  );
}
