import { createFileRoute } from "@tanstack/react-router";
import { Truck, Star, Clock, ShieldCheck } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/suppliers")({
  head: () => ({
    meta: [
      { title: "Suppliers — Nexus ERP" },
      { name: "description", content: "Vendor master, performance scorecards, on-time delivery and quality ratings." },
      { property: "og:title", content: "Suppliers — Nexus ERP" },
      { property: "og:description", content: "Vendor master, performance scorecards, on-time delivery and quality ratings." },
    ],
  }),
  component: Suppliers,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "SUP-014", name: "Vertex Components", category: "Electronics", otd: "78%", quality: "96%", spend: "₹1.14 Cr", rating: "At risk" },
  { id: "SUP-021", name: "Sigma Metals", category: "Raw material", otd: "94%", quality: "98%", spend: "₹86.4L", rating: "Preferred" },
  { id: "SUP-033", name: "Elektra Wires", category: "Cabling", otd: "97%", quality: "99%", spend: "₹64.2L", rating: "Preferred" },
  { id: "SUP-041", name: "Nova Plastics", category: "Moulding", otd: "88%", quality: "94%", spend: "₹31.8L", rating: "Approved" },
  { id: "SUP-052", name: "Prime Enclosures", category: "Fabrication", otd: "92%", quality: "95%", spend: "₹48.6L", rating: "Approved" },
  { id: "SUP-060", name: "Orbit Fasteners", category: "Hardware", otd: "69%", quality: "89%", spend: "₹12.4L", rating: "Probation" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Code" },
  { key: "name", header: "Supplier" },
  { key: "category", header: "Category" },
  { key: "otd", header: "On-time", align: "right" },
  { key: "quality", header: "Quality", align: "right" },
  { key: "spend", header: "YTD spend", align: "right" },
  { key: "rating", header: "Rating", render: (r) => <StatusPill tone={r.rating === "Preferred" ? "success" : r.rating === "Approved" ? "info" : r.rating === "Probation" ? "warning" : "danger"}>{r.rating}</StatusPill> },
];

function Suppliers() {
  return (
    <ModulePage
      eyebrow="Supply chain"
      title="Suppliers"
      description="Vendor master, performance scorecards, on-time delivery and quality ratings."
      primaryAction="Add supplier"
      stats={[{ label: "Active suppliers", value: "128", delta: 2.4, icon: Truck, tone: "primary" }, { label: "Avg. rating", value: "4.3", delta: 3.1, icon: Star, tone: "secondary" }, { label: "On-time delivery", value: "91%", delta: -1.8, icon: Clock, tone: "accent" }, { label: "Quality pass rate", value: "97.4%", delta: 0.9, icon: ShieldCheck, tone: "muted" }]}
      tabs={["Directory", "Scorecards", "Contracts", "Payments"]}
      columns={columns}
      rows={rows}
    />
  );
}
