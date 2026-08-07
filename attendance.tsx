import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Clock, UserX, Timer } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — Nexus ERP" },
      { name: "description", content: "Shift attendance, biometric sync, overtime and absence tracking across plants." },
      { property: "og:title", content: "Attendance — Nexus ERP" },
      { property: "og:description", content: "Shift attendance, biometric sync, overtime and absence tracking across plants." },
    ],
  }),
  component: Attendance,
});

type Row = (typeof rows)[number];

const rows = [
  { emp: "Priya Sharma", shift: "General", inTime: "09:02", outTime: "18:34", hours: 9.5, ot: 1.5, status: "Present" },
  { emp: "Arjun Kulkarni", shift: "A (06-14)", inTime: "05:56", outTime: "14:10", hours: 8.2, ot: 0.2, status: "Present" },
  { emp: "Meera Raut", shift: "General", inTime: "—", outTime: "—", hours: 0, ot: 0, status: "On leave" },
  { emp: "Kiran Patil", shift: "B (14-22)", inTime: "14:12", outTime: "22:40", hours: 8.5, ot: 0.6, status: "Late" },
  { emp: "Rehan Sheikh", shift: "General", inTime: "—", outTime: "—", hours: 0, ot: 0, status: "Absent" },
];

const columns: Column<Row>[] = [
  { key: "emp", header: "Employee" },
  { key: "shift", header: "Shift" },
  { key: "inTime", header: "In" },
  { key: "outTime", header: "Out" },
  { key: "hours", header: "Hours", align: "right" },
  { key: "ot", header: "OT", align: "right" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Present" ? "success" : r.status === "Absent" ? "danger" : r.status === "Late" ? "warning" : "info"}>{r.status}</StatusPill> },
];

function Attendance() {
  return (
    <ModulePage
      eyebrow="People"
      title="Attendance"
      description="Shift attendance, biometric sync, overtime and absence tracking across plants."
      primaryAction="Mark attendance"
      stats={[{ label: "Present today", value: "441", delta: 1.2, icon: CalendarCheck, tone: "primary" }, { label: "Absent", value: "19", delta: -14.0, icon: UserX, tone: "accent" }, { label: "Overtime hours", value: "318", delta: 7.0, icon: Timer, tone: "secondary" }, { label: "Avg. hours/day", value: "8.4", delta: 0.5, icon: Clock, tone: "muted" }]}
      tabs={["Daily register", "Shifts", "Overtime", "Regularisation"]}
      columns={columns}
      rows={rows}
    />
  );
}
