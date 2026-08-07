import { createFileRoute } from "@tanstack/react-router";
import { FolderKanban, Milestone, Clock, Wallet } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Nexus ERP" },
      { name: "description", content: "Delivery projects with milestones, Gantt timelines, time tracking and budgets." },
      { property: "og:title", content: "Projects — Nexus ERP" },
      { property: "og:description", content: "Delivery projects with milestones, Gantt timelines, time tracking and budgets." },
    ],
  }),
  component: Projects,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "PRJ-041", name: "Siemens 3-year supply setup", lead: "Arjun", progress: "62%", budget: "₹1.42 Cr", due: "30 Sep", status: "On track" },
  { id: "PRJ-038", name: "SMT Line 2 commissioning", lead: "Roshan", progress: "38%", budget: "₹86.0L", due: "22 Oct", status: "At risk" },
  { id: "PRJ-034", name: "ERP data migration", lead: "Priya", progress: "88%", budget: "₹18.4L", due: "12 Aug", status: "On track" },
  { id: "PRJ-029", name: "ISO 9001 recertification", lead: "Meera", progress: "45%", budget: "₹6.2L", due: "05 Nov", status: "Delayed" },
  { id: "PRJ-021", name: "Warehouse B automation", lead: "Kiran", progress: "100%", budget: "₹64.8L", due: "Closed", status: "Completed" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Project" },
  { key: "name", header: "Name" },
  { key: "lead", header: "Lead" },
  { key: "progress", header: "Progress", align: "right" },
  { key: "budget", header: "Budget", align: "right" },
  { key: "due", header: "Due" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "On track" || r.status === "Completed" ? "success" : r.status === "Delayed" ? "danger" : "warning"}>{r.status}</StatusPill> },
];

function Projects() {
  return (
    <ModulePage
      eyebrow="Operations"
      title="Projects"
      description="Delivery projects with milestones, Gantt timelines, time tracking and budgets."
      primaryAction="New project"
      stats={[{ label: "Active projects", value: "18", delta: 5.0, icon: FolderKanban, tone: "primary" }, { label: "Milestones due", value: "9", delta: -10.0, icon: Milestone, tone: "secondary" }, { label: "Hours logged", value: "1,248", delta: 8.0, icon: Clock, tone: "accent" }, { label: "Budget utilised", value: "71%", delta: 3.0, icon: Wallet, tone: "muted" }]}
      tabs={["Projects", "Kanban", "Timeline", "Gantt", "Time tracking"]}
      columns={columns}
      rows={rows}
    />
  );
}
