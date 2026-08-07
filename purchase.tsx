import { createFileRoute } from "@tanstack/react-router";
import { Receipt, FileSearch, PackageCheck, IndianRupee } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/purchase")({
  head: () => ({
    meta: [
      { title: "Purchase — Nexus ERP" },
      { name: "description", content: "Requisitions, RFQs, vendor comparison, purchase orders, GRN and bill matching." },
      { property: "og:title", content: "Purchase — Nexus ERP" },
      { property: "og:description", content: "Requisitions, RFQs, vendor comparison, purchase orders, GRN and bill matching." },
    ],
  }),
  component: Purchase,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "PO-2418", vendor: "Vertex Components", item: "SMD LED Avago", qty: "24,000", amount: "₹18,42,000", eta: "05 Aug", status: "Approved" },
  { id: "PO-2415", vendor: "Sigma Metals", item: "Steel rods 12mm", qty: "8.4 T", amount: "₹6,88,400", eta: "03 Aug", status: "In transit" },
  { id: "PO-2411", vendor: "Nova Plastics", item: "Bushing type-C", qty: "60,000", amount: "₹2,14,000", eta: "09 Aug", status: "Pending" },
  { id: "PO-2404", vendor: "Elektra Wires", item: "Harness wire 1.5sq", qty: "18 km", amount: "₹9,60,000", eta: "01 Aug", status: "Received" },
  { id: "PO-2399", vendor: "Prime Enclosures", item: "Enclosure IP65", qty: "1,200", amount: "₹11,04,000", eta: "12 Aug", status: "Approved" },
  { id: "PO-2388", vendor: "Vertex Components", item: "PCB FR4 2-layer", qty: "9,500", amount: "₹7,32,000", eta: "28 Jul", status: "Delayed" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "PO" },
  { key: "vendor", header: "Vendor" },
  { key: "item", header: "Item" },
  { key: "qty", header: "Qty", align: "right" },
  { key: "amount", header: "Value", align: "right" },
  { key: "eta", header: "ETA" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Received" ? "success" : r.status === "Delayed" ? "danger" : r.status === "Pending" ? "warning" : "info"}>{r.status}</StatusPill> },
];

function Purchase() {
  return (
    <ModulePage
      eyebrow="Supply chain"
      title="Purchase"
      description="Requisitions, RFQs, vendor comparison, purchase orders, GRN and bill matching."
      primaryAction="New purchase order"
      stats={[{ label: "Open POs", value: "48", delta: 6.8, icon: Receipt, tone: "primary" }, { label: "RFQs in flight", value: "12", delta: 14.0, icon: FileSearch, tone: "secondary" }, { label: "GRN pending", value: "9", delta: -11.0, icon: PackageCheck, tone: "accent" }, { label: "Committed spend", value: "₹2.86 Cr", delta: 4.4, icon: IndianRupee, tone: "muted" }]}
      tabs={["Purchase orders", "Requisitions", "RFQ", "Vendor comparison", "GRN", "Bills"]}
      columns={columns}
      rows={rows}
    />
  );
}
