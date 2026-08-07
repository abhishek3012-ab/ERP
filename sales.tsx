import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart, FileText, Receipt, RotateCcw } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/sales")({
  head: () => ({
    meta: [
      { title: "Sales — Nexus ERP" },
      { name: "description", content: "Quotations, sales orders, invoices, delivery challans and returns in a single flow." },
      { property: "og:title", content: "Sales — Nexus ERP" },
      { property: "og:description", content: "Quotations, sales orders, invoices, delivery challans and returns in a single flow." },
    ],
  }),
  component: Sales,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "SO-4412", customer: "Siemens India", date: "31 Jul 2026", amount: "₹42,80,000", due: "14 Sep", status: "Confirmed" },
  { id: "SO-4408", customer: "Tata Elxsi", date: "30 Jul 2026", amount: "₹18,25,400", due: "13 Sep", status: "Dispatched" },
  { id: "SO-4401", customer: "Cummins India", date: "29 Jul 2026", amount: "₹9,44,000", due: "28 Aug", status: "Invoiced" },
  { id: "SO-4396", customer: "Godrej & Boyce", date: "27 Jul 2026", amount: "₹76,40,000", due: "26 Sep", status: "Pending" },
  { id: "SO-4390", customer: "Finolex Cables", date: "25 Jul 2026", amount: "₹5,12,800", due: "24 Aug", status: "Paid" },
  { id: "SO-4381", customer: "Praj Industries", date: "22 Jul 2026", amount: "₹3,96,500", due: "21 Aug", status: "Cancelled" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Order" },
  { key: "customer", header: "Customer" },
  { key: "date", header: "Order date" },
  { key: "amount", header: "Amount", align: "right" },
  { key: "due", header: "Due" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Paid" ? "success" : r.status === "Cancelled" ? "danger" : r.status === "Pending" ? "warning" : "info"}>{r.status}</StatusPill> },
];

function Sales() {
  return (
    <ModulePage
      eyebrow="Revenue"
      title="Sales"
      description="Quotations, sales orders, invoices, delivery challans and returns in a single flow."
      primaryAction="New sales order"
      stats={[{ label: "Orders this month", value: "186", delta: 12.4, icon: ShoppingCart, tone: "primary" }, { label: "Open quotations", value: "34", delta: 5.1, icon: FileText, tone: "secondary" }, { label: "Unpaid invoices", value: "₹1.24 Cr", delta: -8.2, icon: Receipt, tone: "accent" }, { label: "Returns", value: "6", delta: -22.0, icon: RotateCcw, tone: "muted" }]}
      tabs={["Sales orders", "Quotations", "Invoices", "Payments", "Returns", "Delivery challans"]}
      columns={columns}
      rows={rows}
    />
  );
}
