import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Send,
  ScanText,
  TrendingUp,
  Search,
  FileSpreadsheet,
  Bot,
  User,
} from "lucide-react";
import { PageHeader, Section } from "@/components/erp/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusPill } from "@/components/erp/status-pill";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — Nexus ERP" },
      {
        name: "description",
        content:
          "Ask your ERP anything: natural-language search, forecasting, invoice OCR and instant operational summaries.",
      },
      { property: "og:title", content: "AI Assistant — Nexus ERP" },
      {
        property: "og:description",
        content:
          "Ask your ERP anything: natural-language search, forecasting, invoice OCR and instant operational summaries.",
      },
    ],
  }),
  component: AiAssistant,
});

type Message = { role: "user" | "ai"; text: string; meta?: string };

const seed: Message[] = [
  {
    role: "user",
    text: "Which customers are at risk of churn this quarter?",
  },
  {
    role: "ai",
    meta: "Analysed 486 orders · 14 accounts",
    text: "Three accounts show a risk signal. Godrej & Boyce order value dropped 38% QoQ with two delayed payments. Praj Industries cancelled SO-4381 and has no open quotation. Finolex Cables reduced order frequency from weekly to fortnightly. Suggested next step: create follow-up tasks for the account owners and offer the Q3 volume slab.",
  },
];

const capabilities = [
  {
    icon: Search,
    title: "Natural language search",
    body: "Ask “show unpaid invoices over ₹10L due this week” and get a live filtered table.",
  },
  {
    icon: TrendingUp,
    title: "Demand forecasting",
    body: "Twelve-week demand and material shortage projection per SKU and per plant.",
  },
  {
    icon: ScanText,
    title: "Invoice OCR",
    body: "Drop a supplier PDF — line items, taxes and GSTIN are extracted into a draft bill.",
  },
  {
    icon: FileSpreadsheet,
    title: "Dashboard summaries",
    body: "A written morning brief across sales, production, cash and quality every day at 8am.",
  },
];

const prompts = [
  "Summarise yesterday's production output",
  "Which raw materials will run out in 30 days?",
  "Top 5 customers by margin this year",
  "Draft a reminder email for overdue invoices",
];

function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>(seed);
  const [draft, setDraft] = useState("");

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: q },
      {
        role: "ai",
        meta: "Reasoning over live ERP data",
        text: "Here's what I found across your connected modules. Connect Lovable Cloud to run this query against real data — right now I'm showing a representative answer shape with sources, confidence and a suggested action you can push straight into Tasks.",
      },
    ]);
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Intelligence"
        title="AI Assistant"
        description="Your ERP copilot — natural language across every module, with forecasting and document understanding built in."
        actions={
          <Button className="rounded-xl">
            <Sparkles className="mr-2 h-4 w-4" />
            New conversation
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Section className="flex min-h-[520px] flex-col">
          <div className="flex-1 space-y-5 overflow-y-auto pr-1">
            {messages.map((m, i) => (
              <div key={i} className="flex gap-3 animate-rise">
                <span
                  className={
                    m.role === "ai"
                      ? "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"
                      : "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground"
                  }
                >
                  {m.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{m.role === "ai" ? "Nexus AI" : "You"}</p>
                    {m.meta ? (
                      <span className="text-xs text-muted-foreground">{m.meta}</span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
                  {m.role === "ai" ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <StatusPill tone="success">Confidence 92%</StatusPill>
                      <StatusPill tone="info">3 sources</StatusPill>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-border pt-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {prompts.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {p}
                </button>
              ))}
            </div>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
            >
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask anything about your business…"
                className="h-11 rounded-xl"
              />
              <Button type="submit" size="icon" className="h-11 w-11 shrink-0 rounded-xl">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Section>

        <div className="space-y-4">
          {capabilities.map((c) => (
            <div key={c.title} className="card-soft lift p-4">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary/10 text-secondary">
                <c.icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-sm font-semibold">{c.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}