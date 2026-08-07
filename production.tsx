import { createFileRoute } from "@tanstack/react-router";
import { Factory, ClipboardList, Timer, Gauge } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/production")({
  head: () => ({
    meta: [
      { title: "Production — Nexus ERP" },
      { name: "description", content: "Production processes, work orders, BOM linkage, routings and shop-floor tracking." },
      { property: "og:title", content: "Production — Nexus ERP" },
      { property: "og:description", content: "Production processes, work orders, BOM linkage, routings and shop-floor tracking." },
    ],
  }),
  component: Production,
});

type Row = (typeof rows)[number];

const rows = [
  { ref: "OC-26-27/0170", process: "E2627T1768", stage: "Planned", bom: "BOM01648", fg: "FG000808", qty: 250, status: "Cancelled" },
  { ref: "INTERNAL ORDER", process: "E2627T1752", stage: "In progress", bom: "BOM01955", fg: "PCBA001175", qty: 400, status: "Running" },
  { ref: "OC-26-27/0170", process: "E2627T1768/5", stage: "Planned", bom: "BOM00798", fg: "FG000397", qty: 780, status: "Scheduled" },
  { ref: "OC-26-27/0182", process: "E2627T1801", stage: "QC hold", bom: "BOM02011", fg: "FG000808", qty: 120, status: "On hold" },
  { ref: "OC-26-27/0188", process: "E2627T1814", stage: "Completed", bom: "BOM01648", fg: "FG000808", qty: 300, status: "Completed" },
];

const columns: Column<Row>[] = [
  { key: "ref", header: "Reference" },
  { key: "process", header: "Process no." },
  { key: "stage", header: "Stage" },
  { key: "bom", header: "BOM" },
  { key: "fg", header: "FG item" },
  { key: "qty", header: "Qty", align: "right" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Completed" ? "success" : r.status === "Cancelled" ? "danger" : r.status === "On hold" ? "warning" : "info"}>{r.status}</StatusPill> },
];

function Production() {
  return (
    <ModulePage
      eyebrow="Operations"
      title="Production"
      description="Production processes, work orders, BOM linkage, routings and shop-floor tracking."
      primaryAction="Create process"
      stats={[{ label: "Active processes", value: "32", delta: 6.0, icon: Factory, tone: "primary" }, { label: "Work orders open", value: "57", delta: -4.0, icon: ClipboardList, tone: "secondary" }, { label: "OEE", value: "82%", delta: 3.1, icon: Gauge, tone: "accent" }, { label: "Avg. cycle time", value: "4.2 h", delta: -6.4, icon: Timer, tone: "muted" }]}
      tabs={["All processes", "Work orders", "Bill of materials", "Routings", "Sub-contract", "Shop floor"]}
      columns={columns}
      rows={rows}
    />
  );
}
