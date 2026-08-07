import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange, Boxes, ClipboardList, Sparkles } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/mrp")({
  head: () => ({
    meta: [
      { title: "MRP Planning — Nexus ERP" },
      { name: "description", content: "Material requirement planning with net requirements, indents and RFQ suggestions." },
      { property: "og:title", content: "MRP Planning — Nexus ERP" },
      { property: "og:description", content: "Material requirement planning with net requirements, indents and RFQ suggestions." },
    ],
  }),
  component: MRP,
});

type Row = (typeof rows)[number];

const rows = [
  { item: "SMD LED Avago 0824", required: 26000, available: 18400, shortage: 7600, need: "04 Aug", action: "Raise PO" },
  { item: "Steel rod 12mm (T)", required: 6, available: 1.2, shortage: 4.8, need: "02 Aug", action: "Urgent PO" },
  { item: "Bushing type-C", required: 9000, available: 5400, shortage: 3600, need: "08 Aug", action: "Raise PO" },
  { item: "PCB FR4 2-layer", required: 12000, available: 12400, shortage: 0, need: "12 Aug", action: "None" },
  { item: "Harness wire 1.5sq (km)", required: 22, available: 18, shortage: 4, need: "06 Aug", action: "Raise indent" },
];

const columns: Column<Row>[] = [
  { key: "item", header: "Item" },
  { key: "required", header: "Required", align: "right" },
  { key: "available", header: "Available", align: "right" },
  { key: "shortage", header: "Shortage", align: "right" },
  { key: "need", header: "Need by" },
  { key: "action", header: "Suggested action", render: (r) => <StatusPill tone={r.action === "None" ? "success" : r.action === "Urgent PO" ? "danger" : "warning"}>{r.action}</StatusPill> },
];

function MRP() {
  return (
    <ModulePage
      eyebrow="Supply chain"
      title="MRP Planning"
      description="Material requirement planning with net requirements, indents and RFQ suggestions."
      primaryAction="Run MRP"
      stats={[{ label: "Planned orders", value: "74", delta: 9.0, icon: CalendarRange, tone: "primary" }, { label: "Shortages", value: "18", delta: -12.0, icon: Boxes, tone: "accent" }, { label: "Open indents", value: "26", delta: 5.0, icon: ClipboardList, tone: "secondary" }, { label: "AI suggestions", value: "9", delta: 0, icon: Sparkles, tone: "muted" }]}
      tabs={["Net requirements", "Indents", "RFQ suggestions", "Capacity"]}
      columns={columns}
      rows={rows}
    />
  );
}
