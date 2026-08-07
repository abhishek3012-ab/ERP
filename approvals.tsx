import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, Send, Workflow } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/approvals")({
  head: () => ({
    meta: [
      { title: "Approvals — Nexus ERP" },
      { name: "description", content: "Received and sent approvals with multi-level rules and SLA tracking." },
      { property: "og:title", content: "Approvals — Nexus ERP" },
      { property: "og:description", content: "Received and sent approvals with multi-level rules and SLA tracking." },
    ],
  }),
  component: Approvals,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "AP-6612", doc: "PO-2418", type: "Purchase order", amount: "₹18,42,000", requester: "Priya", age: "4h", status: "Pending" },
  { id: "AP-6608", doc: "PR-2607", type: "Payroll run", amount: "₹3.42 Cr", requester: "HR Bot", age: "9h", status: "Pending" },
  { id: "AP-6601", doc: "SO-4396", type: "Sales discount", amount: "₹76,40,000", requester: "Meera", age: "1d", status: "Escalated" },
  { id: "AP-6592", doc: "HR-3312", type: "Leave request", amount: "—", requester: "Kiran", age: "2d", status: "Approved" },
  { id: "AP-6585", doc: "JV-8814", type: "Expense", amount: "₹86,400", requester: "Arjun", age: "3d", status: "Rejected" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Approval" },
  { key: "doc", header: "Document" },
  { key: "type", header: "Type" },
  { key: "amount", header: "Value", align: "right" },
  { key: "requester", header: "Requested by" },
  { key: "age", header: "Age" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Approved" ? "success" : r.status === "Rejected" ? "danger" : r.status === "Escalated" ? "warning" : "info"}>{r.status}</StatusPill> },
];

function Approvals() {
  return (
    <ModulePage
      eyebrow="Workflow"
      title="Approvals"
      description="Received and sent approvals with multi-level rules and SLA tracking."
      primaryAction="New rule"
      stats={[{ label: "Awaiting me", value: "8", delta: -14.0, icon: CheckCircle2, tone: "primary" }, { label: "Sent by me", value: "17", delta: 6.0, icon: Send, tone: "secondary" }, { label: "Breaching SLA", value: "3", delta: -25.0, icon: Clock, tone: "accent" }, { label: "Active rules", value: "24", delta: 4.0, icon: Workflow, tone: "muted" }]}
      tabs={["Received", "Sent", "Rules", "History"]}
      columns={columns}
      rows={rows}
    />
  );
}
