import { createFileRoute } from "@tanstack/react-router";
import { Wrench, Activity, TimerReset, Cpu } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title: "Manufacturing — Nexus ERP" },
      { name: "description", content: "Machine utilisation, operations, downtime tracking and capacity planning across lines." },
      { property: "og:title", content: "Manufacturing — Nexus ERP" },
      { property: "og:description", content: "Machine utilisation, operations, downtime tracking and capacity planning across lines." },
    ],
  }),
  component: Manufacturing,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "MC-01", machine: "SMT Pick & Place", line: "SMT Line 1", util: "92%", last: "31 Jul", next: "12 Aug", status: "Running" },
  { id: "MC-04", machine: "Reflow oven", line: "SMT Line 1", util: "88%", last: "28 Jul", next: "09 Aug", status: "Running" },
  { id: "MC-07", machine: "Crimping station", line: "Wire harness", util: "74%", last: "22 Jul", next: "05 Aug", status: "Running" },
  { id: "MC-11", machine: "Assembly conveyor", line: "Assembly A", util: "48%", last: "30 Jul", next: "02 Aug", status: "Changeover" },
  { id: "MC-15", machine: "HiPot tester", line: "Testing bay", util: "0%", last: "18 Jul", next: "01 Aug", status: "Breakdown" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Asset" },
  { key: "machine", header: "Machine" },
  { key: "line", header: "Line" },
  { key: "util", header: "Utilisation", align: "right" },
  { key: "last", header: "Last service" },
  { key: "next", header: "Next service" },
  { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Running" ? "success" : r.status === "Breakdown" ? "danger" : "warning"}>{r.status}</StatusPill> },
];

function Manufacturing() {
  return (
    <ModulePage
      eyebrow="Operations"
      title="Manufacturing"
      description="Machine utilisation, operations, downtime tracking and capacity planning across lines."
      primaryAction="Add machine"
      stats={[{ label: "Machines online", value: "28 / 31", delta: 2.0, icon: Cpu, tone: "primary" }, { label: "Utilisation", value: "76%", delta: 4.8, icon: Activity, tone: "secondary" }, { label: "Downtime (7d)", value: "11.4 h", delta: -18.0, icon: TimerReset, tone: "accent" }, { label: "MTTR", value: "42 min", delta: -9.0, icon: Wrench, tone: "muted" }]}
      tabs={["Machines", "Operations", "Downtime", "Capacity"]}
      columns={columns}
      rows={rows}
    />
  );
}
