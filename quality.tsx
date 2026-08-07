import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, ClipboardCheck, AlertOctagon, FileCheck } from "lucide-react";
import { StatusPill } from "@/components/erp/status-pill";
import { ModulePage } from "@/components/erp/module-page";
import type { Column } from "@/components/erp/data-table";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality Control — Nexus ERP" },
      { name: "description", content: "Incoming, in-process and final inspections with NCR, CAPA and audit trails." },
      { property: "og:title", content: "Quality Control — Nexus ERP" },
      { property: "og:description", content: "Incoming, in-process and final inspections with NCR, CAPA and audit trails." },
    ],
  }),
  component: Quality,
});

type Row = (typeof rows)[number];

const rows = [
  { id: "QC-4471", type: "Incoming", ref: "GRN-1188", item: "SMD LED Avago", sampled: 320, defects: 2, result: "Pass" },
  { id: "QC-4468", type: "In-process", ref: "WO-1187", item: "PCBA LT_SMPS", sampled: 60, defects: 5, result: "Rework" },
  { id: "QC-4462", type: "Final", ref: "SO-4408", item: "ATSH4600527298", sampled: 40, defects: 0, result: "Pass" },
  { id: "QC-4455", type: "Incoming", ref: "GRN-1181", item: "Steel rod 12mm", sampled: 12, defects: 3, result: "Reject" },
  { id: "QC-4449", type: "In-process", ref: "WO-1174", item: "VPIS harness", sampled: 90, defects: 1, result: "Pass" },
];

const columns: Column<Row>[] = [
  { key: "id", header: "Inspection" },
  { key: "type", header: "Type" },
  { key: "ref", header: "Reference" },
  { key: "item", header: "Item" },
  { key: "sampled", header: "Sampled", align: "right" },
  { key: "defects", header: "Defects", align: "right" },
  { key: "result", header: "Result", render: (r) => <StatusPill tone={r.result === "Pass" ? "success" : r.result === "Reject" ? "danger" : "warning"}>{r.result}</StatusPill> },
];

function Quality() {
  return (
    <ModulePage
      eyebrow="Operations"
      title="Quality Control"
      description="Incoming, in-process and final inspections with NCR, CAPA and audit trails."
      primaryAction="New inspection"
      stats={[{ label: "Pass rate", value: "97.4%", delta: 0.8, icon: ShieldCheck, tone: "primary" }, { label: "Open NCRs", value: "7", delta: -30.0, icon: AlertOctagon, tone: "accent" }, { label: "CAPA in progress", value: "4", delta: 0, icon: ClipboardCheck, tone: "secondary" }, { label: "Audits closed", value: "12", delta: 20.0, icon: FileCheck, tone: "muted" }]}
      tabs={["Inspections", "NCR", "CAPA", "Checklists", "Audits"]}
      columns={columns}
      rows={rows}
    />
  );
}
