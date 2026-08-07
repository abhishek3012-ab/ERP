import { createFileRoute } from "@tanstack/react-router";
import { ShieldHalf, KeyRound, Users, History } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Nexus ERP" },
      { name: "description", content: "Roles, permissions, departments, workflow builder and audit logs." },
      { property: "og:title", content: "Admin — Nexus ERP" },
      { property: "og:description", content: "Roles, permissions, departments, workflow builder and audit logs." },
    ],
  }),
  component: Admin,
});

type Row = (typeof rows)[number];

const rows = [
  { role: "Super Admin", users: 3, scope: "Global", modules: "All", updated: "12 Jun 2026", status: "Locked" },
  { role: "Plant Manager", users: 8, scope: "Plant", modules: "Production, Inventory, QC", updated: "24 Jul 2026", status: "Active" },
  { role: "Finance Controller", users: 5, scope: "Company", modules: "Finance, Payroll, Approvals", updated: "18 Jul 2026", status: "Active" },
  { role: "Sales Executive", users: 46, scope: "Region", modules: "CRM, Sales", updated: "02 Jul 2026", status: "Active" },
  { role: "Warehouse Operator", users: 74, scope: "Warehouse", modules: "Warehouse, Inventory", updated: "29 Jun 2026", status: "Review due" },
];

const columns: Column<Row>[] = [
  { key: "role", header: "Role" },
  { key: "users", header: "Users", align: "right" },
  { key: "scope", header: "Scope" },
  { key: "modules", header: "Modules" },
  { key: "updated", header: "Updated" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Active" ? "success" : r.status === "Locked" ? "info" : "warning"}>{r.status}</StatusPill> },
];

function Admin() {
  return (
    <ModulePage
      eyebrow="Workspace"
      title="Admin"
      description="Roles, permissions, departments, workflow builder and audit logs."
      primaryAction="Add role"
      stats={[{ label: "Roles", value: "14", delta: 0, icon: ShieldHalf, tone: "primary" }, { label: "Users", value: "486", delta: 3.0, icon: Users, tone: "secondary" }, { label: "Permission sets", value: "62", delta: 8.0, icon: KeyRound, tone: "accent" }, { label: "Audit events (24h)", value: "1,842", delta: 12.0, icon: History, tone: "muted" }]}
      tabs={["Roles", "Permissions", "Departments", "Workflow builder", "Audit logs"]}
      columns={columns}
      rows={rows}
    />
  );
}
