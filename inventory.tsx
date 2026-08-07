import { createFileRoute } from "@tanstack/react-router";
import { Boxes, AlertTriangle, PackageSearch, Layers } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — Nexus ERP" },
      { name: "description", content: "Item master, batch and serial tracking, multi-warehouse stock and AI shortage forecasting." },
      { property: "og:title", content: "Inventory — Nexus ERP" },
      { property: "og:description", content: "Item master, batch and serial tracking, multi-warehouse stock and AI shortage forecasting." },
    ],
  }),
  component: Inventory,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "FG000808", name: "ATSH4600527298 22KV VPIS", category: "Finished goods", wh: "Main", qty: 420, uom: "nos", reorder: 300, status: "Healthy" },
  { id: "PCBA001175", name: "PCBA LT_SMPS_12V 5A R0.1", category: "Sub-assembly", wh: "WIP store", qty: 96, uom: "nos", reorder: 150, status: "Low" },
  { id: "RM004421", name: "SMD LED Avago 0824", category: "Raw material", wh: "Main", qty: 18400, uom: "pcs", reorder: 12000, status: "Healthy" },
  { id: "RM007712", name: "Steel rod 12mm", category: "Raw material", wh: "Yard", qty: 1.2, uom: "T", reorder: 3, status: "Critical" },
  { id: "FG000397", name: "VPIS wire harness", category: "Finished goods", wh: "Main", qty: 780, uom: "nos", reorder: 400, status: "Healthy" },
  { id: "RM009002", name: "Bushing type-C 460820425", category: "Raw material", wh: "Rack B12", qty: 5400, uom: "pcs", reorder: 6000, status: "Low" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Item ID" },
  { key: "name", header: "Description" },
  { key: "category", header: "Category" },
  { key: "wh", header: "Warehouse" },
  { key: "qty", header: "On hand", align: "right" },
  { key: "reorder", header: "Reorder", align: "right" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Healthy" ? "success" : r.status === "Low" ? "warning" : "danger"}>{r.status}</StatusPill> },
];

function Inventory() {
  return (
    <ModulePage
      eyebrow="Supply chain"
      title="Inventory"
      description="Item master, batch and serial tracking, multi-warehouse stock and AI shortage forecasting."
      primaryAction="Add item"
      stats={[{ label: "SKUs", value: "3,842", delta: 1.9, icon: Boxes, tone: "primary" }, { label: "Low stock alerts", value: "12", delta: -24.0, icon: AlertTriangle, tone: "accent" }, { label: "Stock value", value: "₹2.18 Cr", delta: 3.2, icon: Layers, tone: "secondary" }, { label: "Cycle count accuracy", value: "99.1%", delta: 0.4, icon: PackageSearch, tone: "muted" }]}
      tabs={["Item master", "Batches", "Stock movement", "Warehouses", "ABC analysis", "Forecast"]}
      columns={columns}
      rows={rows}
    />
  );
}
