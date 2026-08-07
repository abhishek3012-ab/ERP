import { createFileRoute } from "@tanstack/react-router";
import { Warehouse, ScanLine, PackageCheck, Send } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/warehouse")({
  head: () => ({
    meta: [
      { title: "Warehouse — Nexus ERP" },
      { name: "description", content: "Putaway, picking, packing and dispatch operations with barcode-driven location control." },
      { property: "og:title", content: "Warehouse — Nexus ERP" },
      { property: "og:description", content: "Putaway, picking, packing and dispatch operations with barcode-driven location control." },
    ],
  }),
  component: WarehousePage,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "WT-9012", type: "Picking", ref: "SO-4412", location: "A-04-12", assignee: "Sunil", items: 14, status: "In progress" },
  { id: "WT-9008", type: "Putaway", ref: "GRN-1188", location: "B-12-03", assignee: "Kiran", items: 32, status: "Pending" },
  { id: "WT-9004", type: "Packing", ref: "SO-4408", location: "Pack-02", assignee: "Rehan", items: 8, status: "Completed" },
  { id: "WT-8999", type: "Dispatch", ref: "SO-4401", location: "Dock-01", assignee: "Sunil", items: 21, status: "Completed" },
  { id: "WT-8994", type: "Picking", ref: "SO-4396", location: "C-02-09", assignee: "Anita", items: 46, status: "Blocked" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Task" },
  { key: "type", header: "Type" },
  { key: "ref", header: "Reference" },
  { key: "location", header: "Location" },
  { key: "assignee", header: "Assignee" },
  { key: "items", header: "Lines", align: "right" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Completed" ? "success" : r.status === "Blocked" ? "danger" : r.status === "Pending" ? "warning" : "info"}>{r.status}</StatusPill> },
];

function WarehousePage() {
  return (
    <ModulePage
      eyebrow="Supply chain"
      title="Warehouse"
      description="Putaway, picking, packing and dispatch operations with barcode-driven location control."
      primaryAction="New task"
      stats={[{ label: "Open pick lists", value: "23", delta: 7.0, icon: ScanLine, tone: "primary" }, { label: "Putaway pending", value: "11", delta: -9.0, icon: Warehouse, tone: "secondary" }, { label: "Packed today", value: "64", delta: 18.0, icon: PackageCheck, tone: "accent" }, { label: "Dispatched today", value: "41", delta: 12.0, icon: Send, tone: "muted" }]}
      tabs={["Tasks", "Locations", "Warehouse map", "Dispatch"]}
      columns={columns}
      rows={rows}
    />
  );
}
