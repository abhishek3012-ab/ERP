import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Target, Percent, Users } from "lucide-react";
import { PageHeader, Section } from "@/components/erp/page";
import { StatCard } from "@/components/erp/stat-card";
import { TrendArea, Bars, Donut, Lines, chartColors } from "@/components/erp/charts";
import { StatusPill } from "@/components/erp/status-pill";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Nexus ERP" },
      {
        name: "description",
        content:
          "Cross-module analytics: revenue trends, margin mix, plant throughput and AI-driven forecasts.",
      },
      { property: "og:title", content: "Analytics — Nexus ERP" },
      {
        property: "og:description",
        content:
          "Cross-module analytics: revenue trends, margin mix, plant throughput and AI-driven forecasts.",
      },
    ],
  }),
  component: Analytics,
});

const revenue: { name: string; actual: number | null; forecast: number }[] = [
  { name: "Feb", actual: 268, forecast: 260 },
  { name: "Mar", actual: 312, forecast: 298 },
  { name: "Apr", actual: 294, forecast: 305 },
  { name: "May", actual: 348, forecast: 330 },
  { name: "Jun", actual: 386, forecast: 362 },
  { name: "Jul", actual: 418, forecast: 402 },
  { name: "Aug", actual: null, forecast: 441 },
];

const throughput = [
  { name: "SMT 1", units: 4200 },
  { name: "SMT 2", units: 3100 },
  { name: "Harness", units: 2650 },
  { name: "Assembly", units: 3890 },
  { name: "Testing", units: 3620 },
];

const mix = [
  { name: "Finished goods", value: 46, color: chartColors.green },
  { name: "Sub-assembly", value: 27, color: chartColors.blue },
  { name: "Raw material", value: 18, color: chartColors.orange },
  { name: "Consumables", value: 9, color: chartColors.violet },
];

const margin = [
  { name: "Feb", margin: 21.4 },
  { name: "Mar", margin: 22.8 },
  { name: "Apr", margin: 21.9 },
  { name: "May", margin: 23.6 },
  { name: "Jun", margin: 24.9 },
  { name: "Jul", margin: 25.4 },
];

const insights = [
  {
    tone: "success" as const,
    label: "Opportunity",
    text: "SMT Line 1 is running at 92% utilisation with a 4-week order book — shifting 12% of harness volume to Line 2 protects the August delivery plan.",
  },
  {
    tone: "warning" as const,
    label: "Watch",
    text: "Raw material cost per unit rose 3.1% for the third month. Renegotiating the Sigma Metals slab could recover ₹18.4L this quarter.",
  },
  {
    tone: "info" as const,
    label: "Forecast",
    text: "August revenue is projected at ₹4.41 Cr (±6%), driven by the Siemens repeat order and two quotations in final negotiation.",
  },
];

function Analytics() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Intelligence"
        title="Analytics"
        description="Every module rolled into one view — with forecasts, variance and written explanations."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue (Jul)" value="₹4.18 Cr" delta={8.3} icon={TrendingUp} />
        <StatCard label="Gross margin" value="25.4%" delta={2.1} icon={Percent} tone="secondary" />
        <StatCard label="Plan attainment" value="94%" delta={1.6} icon={Target} tone="accent" />
        <StatCard label="Active customers" value="212" delta={4.4} icon={Users} tone="muted" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Section
          title="Revenue vs AI forecast"
          description="₹ lakh · last 6 months with next-month projection"
          className="xl:col-span-2"
        >
          <TrendArea
            data={revenue}
            keys={[
              { key: "actual", color: chartColors.green, label: "Actual" },
              { key: "forecast", color: chartColors.blue, label: "Forecast" },
            ]}
            height={300}
          />
        </Section>

        <Section title="Inventory value mix" description="Share by category">
          <Donut data={mix} height={300} />
        </Section>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Section title="Plant throughput" description="Units produced this month" className="xl:col-span-2">
          <Bars data={throughput} keys={[{ key: "units", color: chartColors.blue, label: "Units" }]} />
        </Section>
        <Section title="Gross margin trend" description="% of revenue">
          <Lines data={margin} keys={[{ key: "margin", color: chartColors.orange, label: "Margin %" }]} />
        </Section>
      </div>

      <Section title="AI insights" description="Generated from the last 90 days of activity">
        <div className="grid gap-4 lg:grid-cols-3">
          {insights.map((i) => (
            <div key={i.label} className="rounded-2xl border border-border bg-muted/30 p-4">
              <StatusPill tone={i.tone}>{i.label}</StatusPill>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}