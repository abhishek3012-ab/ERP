import { createFileRoute } from "@tanstack/react-router";
import { Building2, UserPlus, CalendarOff, GraduationCap } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/hrms")({
  head: () => ({
    meta: [
      { title: "HRMS — Nexus ERP" },
      { name: "description", content: "Recruitment, leave, onboarding and employee lifecycle workflows in one place." },
      { property: "og:title", content: "HRMS — Nexus ERP" },
      { property: "og:description", content: "Recruitment, leave, onboarding and employee lifecycle workflows in one place." },
    ],
  }),
  component: HRMS,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "HR-3312", type: "Leave", employee: "Kiran Patil", detail: "Earned leave · 4 days", raised: "29 Jul", approver: "Arjun", status: "Pending" },
  { id: "HR-3308", type: "Recruitment", employee: "—", detail: "QC Engineer · Pune", raised: "27 Jul", approver: "Priya", status: "In review" },
  { id: "HR-3301", type: "Reimbursement", employee: "Meera Raut", detail: "Travel · ₹18,400", raised: "26 Jul", approver: "Priya", status: "Approved" },
  { id: "HR-3294", type: "Leave", employee: "Rehan Sheikh", detail: "Sick leave · 2 days", raised: "24 Jul", approver: "Meera", status: "Approved" },
  { id: "HR-3287", type: "Exit", employee: "Sunil More", detail: "Resignation · 60 days", raised: "20 Jul", approver: "Roshan", status: "Rejected" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Request" },
  { key: "type", header: "Type" },
  { key: "employee", header: "Employee" },
  { key: "detail", header: "Details" },
  { key: "raised", header: "Raised" },
  { key: "approver", header: "Approver" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Approved" ? "success" : r.status === "Rejected" ? "danger" : r.status === "Pending" ? "warning" : "info"}>{r.status}</StatusPill> },
];

function HRMS() {
  return (
    <ModulePage
      eyebrow="People"
      title="HRMS"
      description="Recruitment, leave, onboarding and employee lifecycle workflows in one place."
      primaryAction="New request"
      stats={[{ label: "Open positions", value: "11", delta: 10.0, icon: UserPlus, tone: "primary" }, { label: "Leave requests", value: "23", delta: -6.0, icon: CalendarOff, tone: "secondary" }, { label: "Onboarding", value: "6", delta: 0, icon: Building2, tone: "accent" }, { label: "Trainings due", value: "19", delta: 5.0, icon: GraduationCap, tone: "muted" }]}
      tabs={["Requests", "Recruitment", "Leave", "Onboarding", "Documents"]}
      columns={columns}
      rows={rows}
    />
  );
}
