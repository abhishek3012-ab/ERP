import { createFileRoute } from "@tanstack/react-router";
import { Wallet, TrendingUp, TrendingDown, Landmark } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Finance — Nexus ERP" },
      { name: "description", content: "Expenses, income, GST, P&L, balance sheet and bank reconciliation." },
      { property: "og:title", content: "Finance — Nexus ERP" },
      { property: "og:description", content: "Expenses, income, GST, P&L, balance sheet and bank reconciliation." },
    ],
  }),
  component: Finance,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "JV-8841", date: "31 Jul 2026", account: "Sales — domestic", type: "Credit", amount: "₹42,80,000", ref: "SO-4412", status: "Posted" },
  { id: "JV-8836", date: "30 Jul 2026", account: "Raw material purchase", type: "Debit", amount: "₹18,42,000", ref: "PO-2418", status: "Posted" },
  { id: "JV-8829", date: "29 Jul 2026", account: "Freight outward", type: "Debit", amount: "₹1,24,600", ref: "SO-4408", status: "Draft" },
  { id: "JV-8821", date: "28 Jul 2026", account: "GST input credit", type: "Credit", amount: "₹3,31,560", ref: "GRN-1188", status: "Posted" },
  { id: "JV-8814", date: "27 Jul 2026", account: "Machine maintenance", type: "Debit", amount: "₹86,400", ref: "MC-15", status: "Pending" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Voucher" },
  { key: "date", header: "Date" },
  { key: "account", header: "Account" },
  { key: "type", header: "Dr/Cr" },
  { key: "amount", header: "Amount", align: "right" },
  { key: "ref", header: "Reference" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Posted" ? "success" : r.status === "Pending" ? "warning" : "neutral"}>{r.status}</StatusPill> },
];

function Finance() {
  return (
    <ModulePage
      eyebrow="Finance"
      title="Finance"
      description="Expenses, income, GST, P&L, balance sheet and bank reconciliation."
      primaryAction="New entry"
      stats={[{ label: "Revenue YTD", value: "₹41.8 Cr", delta: 14.2, icon: TrendingUp, tone: "primary" }, { label: "Expenses YTD", value: "₹31.6 Cr", delta: 8.4, icon: TrendingDown, tone: "accent" }, { label: "Net profit", value: "₹10.2 Cr", delta: 22.0, icon: Wallet, tone: "secondary" }, { label: "GST payable", value: "₹68.4L", delta: -4.0, icon: Landmark, tone: "muted" }]}
      tabs={["Ledger", "Expenses", "Cash flow", "P&L", "Balance sheet", "GST", "Reconciliation"]}
      columns={columns}
      rows={rows}
    />
  );
}
