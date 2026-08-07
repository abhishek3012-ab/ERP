import { createFileRoute } from "@tanstack/react-router";
import { Banknote, ReceiptIndianRupee, PiggyBank, Landmark } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/payroll")({
  head: () => ({
    meta: [
      { title: "Payroll — Nexus ERP" },
      { name: "description", content: "Salary structures, statutory deductions, payslips and bank disbursement files." },
      { property: "og:title", content: "Payroll — Nexus ERP" },
      { property: "og:description", content: "Salary structures, statutory deductions, payslips and bank disbursement files." },
    ],
  }),
  component: Payroll,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "PR-2607", period: "July 2026", headcount: 486, gross: "₹3.42 Cr", deductions: "₹41.2L", net: "₹3.01 Cr", status: "Awaiting approval" },
  { id: "PR-2606", period: "June 2026", headcount: 481, gross: "₹3.36 Cr", deductions: "₹40.4L", net: "₹2.96 Cr", status: "Paid" },
  { id: "PR-2605", period: "May 2026", headcount: 478, gross: "₹3.31 Cr", deductions: "₹39.8L", net: "₹2.91 Cr", status: "Paid" },
  { id: "PR-2604", period: "April 2026", headcount: 470, gross: "₹3.24 Cr", deductions: "₹38.9L", net: "₹2.85 Cr", status: "Paid" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Payrun" },
  { key: "period", header: "Period" },
  { key: "headcount", header: "Headcount", align: "right" },
  { key: "gross", header: "Gross", align: "right" },
  { key: "deductions", header: "Deductions", align: "right" },
  { key: "net", header: "Net payable", align: "right" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Paid" ? "success" : "warning"}>{r.status}</StatusPill> },
];

function Payroll() {
  return (
    <ModulePage
      eyebrow="People"
      title="Payroll"
      description="Salary structures, statutory deductions, payslips and bank disbursement files."
      primaryAction="Run payroll"
      stats={[{ label: "Monthly payout", value: "₹3.42 Cr", delta: 2.6, icon: Banknote, tone: "primary" }, { label: "Payslips generated", value: "486", delta: 0.8, icon: ReceiptIndianRupee, tone: "secondary" }, { label: "Statutory dues", value: "₹41.2L", delta: 1.4, icon: Landmark, tone: "accent" }, { label: "Cost per head", value: "₹70.4K", delta: 1.1, icon: PiggyBank, tone: "muted" }]}
      tabs={["Payruns", "Salary structures", "Payslips", "Statutory"]}
      columns={columns}
      rows={rows}
    />
  );
}
