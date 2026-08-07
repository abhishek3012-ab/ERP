import { createFileRoute } from "@tanstack/react-router";
import { Contact, Filter, Mail, MessageCircle, Phone, Plus, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, Section } from "@/components/erp/page";
import { StatCard } from "@/components/erp/stat-card";
import { StatusPill } from "@/components/erp/status-pill";
import { KanbanBoard, type KanbanColumn } from "@/components/erp/kanban";
import { chartColors, TrendArea } from "@/components/erp/charts";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "CRM Pipeline — Nexus ERP" },
      { name: "description", content: "Visual deal pipeline, activity timeline and customer engagement across every channel." },
      { property: "og:title", content: "CRM Pipeline — Nexus ERP" },
      { property: "og:description", content: "Visual deal pipeline and customer engagement in one workspace." },
    ],
  }),
  component: CRM,
});

const columns: KanbanColumn[] = [
  {
    id: "new", title: "New", accent: "bg-muted-foreground/50",
    cards: [
      { id: "1", title: "Kirloskar Pneumatics", subtitle: "SMPS retrofit · inbound", value: "₹14.2L", owner: "Meera", tag: "Inbound", tone: "neutral", comments: 2, files: 1 },
      { id: "2", title: "Bharat Forge", subtitle: "Wire harness annual", value: "₹32.0L", owner: "Arjun", tag: "Referral", tone: "info", comments: 5, files: 3 },
    ],
  },
  {
    id: "qualified", title: "Qualified", accent: "bg-secondary",
    cards: [
      { id: "3", title: "Tata Elxsi", subtitle: "PCBA line expansion", value: "₹58.6L", owner: "Priya", tag: "Hot", tone: "danger", comments: 8, files: 4 },
      { id: "4", title: "Emcure Pharma", subtitle: "Control panels", value: "₹21.5L", owner: "Roshan", tag: "Demo done", tone: "info", comments: 3, files: 2 },
    ],
  },
  {
    id: "proposal", title: "Proposal", accent: "bg-accent",
    cards: [
      { id: "5", title: "Godrej & Boyce", subtitle: "22KV VPIS units", value: "₹76.4L", owner: "Meera", tag: "Awaiting", tone: "warning", comments: 11, files: 7 },
    ],
  },
  {
    id: "negotiation", title: "Negotiation", accent: "bg-chart-5",
    cards: [
      { id: "6", title: "Siemens India", subtitle: "3-year supply contract", value: "₹1.42 Cr", owner: "Arjun", tag: "Legal review", tone: "warning", comments: 19, files: 12 },
    ],
  },
  {
    id: "won", title: "Closed won", accent: "bg-primary",
    cards: [
      { id: "7", title: "Cummins India", subtitle: "LED driver batch 4", value: "₹44.8L", owner: "Priya", tag: "Won", tone: "success", comments: 6, files: 5 },
    ],
  },
];

const trend = [
  { name: "Wk 1", created: 18, won: 5 },
  { name: "Wk 2", created: 24, won: 8 },
  { name: "Wk 3", created: 21, won: 6 },
  { name: "Wk 4", created: 31, won: 12 },
];

const timeline = [
  { icon: Phone, t: "Call with Siemens procurement", d: "Discussed 3-year pricing slab. Follow up Tue.", w: "35m ago" },
  { icon: Mail, t: "Proposal sent to Godrej & Boyce", d: "QT-0912 · ₹76.4L · valid 30 days", w: "2h ago" },
  { icon: MessageCircle, t: "WhatsApp from Tata Elxsi", d: "Requested revised delivery schedule.", w: "5h ago" },
  { icon: Video, t: "Demo completed — Emcure", d: "6 stakeholders attended. Recording saved.", w: "Yesterday" },
];

function CRM() {
  return (
    <>
      <PageHeader
        eyebrow="Revenue"
        title="CRM Pipeline"
        description="₹3.89 Cr of open pipeline across 7 active deals and 4 stages."
        actions={
          <>
            <Button variant="outline" className="rounded-xl">
              <Filter className="h-4 w-4" /> Saved views
            </Button>
            <Button className="rounded-xl">
              <Plus className="h-4 w-4" /> New deal
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open pipeline" value="₹3.89 Cr" delta={9.2} icon={Contact} />
        <StatCard label="Win rate" value="38%" delta={4.6} icon={Users} tone="secondary" />
        <StatCard label="Avg. deal size" value="₹41.2L" delta={-2.1} icon={Contact} tone="accent" />
        <StatCard label="Meetings this week" value="14" delta={21} icon={Video} tone="muted" />
      </div>

      <Tabs defaultValue="pipeline">
        <TabsList className="rounded-xl">
          <TabsTrigger value="pipeline" className="rounded-lg">Pipeline</TabsTrigger>
          <TabsTrigger value="timeline" className="rounded-lg">Activity timeline</TabsTrigger>
          <TabsTrigger value="engagement" className="rounded-lg">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="mt-5">
          <KanbanBoard columns={columns} />
        </TabsContent>

        <TabsContent value="timeline" className="mt-5 grid gap-6 xl:grid-cols-3">
          <Section className="xl:col-span-2" title="Activity timeline" description="All customer touchpoints">
            <ol className="relative space-y-6 border-l border-border pl-6">
              {timeline.map((e, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[33px] grid h-6 w-6 place-items-center rounded-full bg-surface ring-1 ring-border">
                    <e.icon className="h-3 w-3 text-primary" />
                  </span>
                  <p className="text-sm font-semibold">{e.t}</p>
                  <p className="text-xs text-muted-foreground">{e.d}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground/70">{e.w}</p>
                </li>
              ))}
            </ol>
          </Section>
          <Section title="Upcoming meetings">
            <div className="space-y-3">
              {[
                { t: "Siemens pricing review", w: "Today · 4:30 PM", tone: "warning" as const },
                { t: "Godrej site survey", w: "Tomorrow · 11:00 AM", tone: "info" as const },
                { t: "Cummins kickoff", w: "Fri · 2:00 PM", tone: "success" as const },
              ].map((m) => (
                <div key={m.t} className="rounded-2xl border border-border bg-surface-2/60 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{m.t}</p>
                    <StatusPill tone={m.tone}>Scheduled</StatusPill>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{m.w}</p>
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="engagement" className="mt-5">
          <Section title="Deals created vs won" description="Rolling 4 weeks">
            <TrendArea
              data={trend}
              keys={[
                { key: "created", color: chartColors.blue, label: "Created" },
                { key: "won", color: chartColors.green, label: "Won" },
              ]}
            />
          </Section>
        </TabsContent>
      </Tabs>
    </>
  );
}
