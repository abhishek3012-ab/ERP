import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, Flag, CheckCircle2, Clock } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — Nexus ERP" },
      { name: "description", content: "Personal and departmental tasks with priorities, comments, attachments and due dates." },
      { property: "og:title", content: "Tasks — Nexus ERP" },
      { property: "og:description", content: "Personal and departmental tasks with priorities, comments, attachments and due dates." },
    ],
  }),
  component: Tasks,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "TSK-812", title: "Approve June payroll run", dept: "Finance", assignee: "Roshan", due: "Today", priority: "High" },
  { id: "TSK-809", title: "Vendor rating review — Sigma Metals", dept: "Procurement", assignee: "Priya", due: "Today", priority: "Medium" },
  { id: "TSK-804", title: "Sign off BOM for ATSH-4600", dept: "Engineering", assignee: "Arjun", due: "Tomorrow", priority: "High" },
  { id: "TSK-798", title: "Cycle count warehouse B rack 12", dept: "Warehouse", assignee: "Kiran", due: "Fri", priority: "Low" },
  { id: "TSK-791", title: "Close NCR-034 root cause", dept: "Quality", assignee: "Meera", due: "Overdue", priority: "Critical" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Task" },
  { key: "title", header: "Title" },
  { key: "dept", header: "Department" },
  { key: "assignee", header: "Assignee" },
  { key: "due", header: "Due" },
  { key: "priority", header: "Priority", render: (r) => <StatusPill tone={r.priority === "Critical" ? "danger" : r.priority === "High" ? "warning" : r.priority === "Medium" ? "info" : "neutral"}>{r.priority}</StatusPill> },
];

function Tasks() {
  return (
    <ModulePage
      eyebrow="Operations"
      title="Tasks"
      description="Personal and departmental tasks with priorities, comments, attachments and due dates."
      primaryAction="New task"
      stats={[{ label: "My open tasks", value: "14", delta: -8.0, icon: ListChecks, tone: "primary" }, { label: "High priority", value: "5", delta: 12.0, icon: Flag, tone: "accent" }, { label: "Completed this week", value: "38", delta: 22.0, icon: CheckCircle2, tone: "secondary" }, { label: "Overdue", value: "3", delta: -40.0, icon: Clock, tone: "muted" }]}
      tabs={["My tasks", "Department", "Board", "Calendar"]}
      columns={columns}
      rows={rows}
    />
  );
}
