import { createFileRoute } from "@tanstack/react-router";
import { IdCard, Users, Award, UserMinus } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/employees")({
  head: () => ({
    meta: [
      { title: "Employees — Nexus ERP" },
      { name: "description", content: "Employee master with departments, roles, documents and performance snapshots." },
      { property: "og:title", content: "Employees — Nexus ERP" },
      { property: "og:description", content: "Employee master with departments, roles, documents and performance snapshots." },
    ],
  }),
  component: Employees,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "EMP-1042", name: "Priya Sharma", dept: "Finance", role: "Controller", location: "Pune", joined: "12 Mar 2021", status: "Active" },
  { id: "EMP-1188", name: "Arjun Kulkarni", dept: "Production", role: "Plant Lead", location: "Pune", joined: "02 Jul 2019", status: "Active" },
  { id: "EMP-1274", name: "Meera Raut", dept: "Sales", role: "Key Accounts", location: "Mumbai", joined: "18 Jan 2022", status: "Active" },
  { id: "EMP-1391", name: "Kiran Patil", dept: "Warehouse", role: "Supervisor", location: "Chakan", joined: "05 Sep 2023", status: "On leave" },
  { id: "EMP-1440", name: "Rehan Sheikh", dept: "Quality", role: "QC Engineer", location: "Pune", joined: "27 Feb 2024", status: "Probation" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Emp ID" },
  { key: "name", header: "Name" },
  { key: "dept", header: "Department" },
  { key: "role", header: "Role" },
  { key: "location", header: "Location" },
  { key: "joined", header: "Joined" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Active" ? "success" : r.status === "Probation" ? "warning" : "info"}>{r.status}</StatusPill> },
];

function Employees() {
  return (
    <ModulePage
      eyebrow="People"
      title="Employees"
      description="Employee master with departments, roles, documents and performance snapshots."
      primaryAction="Add employee"
      stats={[{ label: "Headcount", value: "486", delta: 3.2, icon: Users, tone: "primary" }, { label: "New joiners (30d)", value: "14", delta: 22.0, icon: IdCard, tone: "secondary" }, { label: "Avg. rating", value: "4.1", delta: 1.4, icon: Award, tone: "accent" }, { label: "Attrition", value: "6.2%", delta: -1.1, icon: UserMinus, tone: "muted" }]}
      tabs={["Directory", "Departments", "Documents", "Performance"]}
      columns={columns}
      rows={rows}
    />
  );
}
