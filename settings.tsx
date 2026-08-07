import { createFileRoute } from "@tanstack/react-router";
import { Building2, Palette, Bell, KeyRound, Globe2, Moon, Sun } from "lucide-react";
import { PageHeader, Section } from "@/components/erp/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Nexus ERP" },
      {
        name: "description",
        content: "Company profile, appearance, localisation, security and notification defaults.",
      },
      { property: "og:title", content: "Settings — Nexus ERP" },
      {
        property: "og:description",
        content: "Company profile, appearance, localisation, security and notification defaults.",
      },
    ],
  }),
  component: Settings,
});

function Row({ label, desc, on }: { label: string; desc: string; on: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{label}</p>
        <p className="truncate text-xs text-muted-foreground">{desc}</p>
      </div>
      <span
        className={`h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${on ? "bg-primary" : "bg-muted"}`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-card shadow transition-transform ${on ? "translate-x-5" : ""}`}
        />
      </span>
    </div>
  );
}

function Settings() {
  const { theme, toggle } = useTheme();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Workspace-wide defaults for your organisation."
        actions={<Button className="rounded-xl">Save changes</Button>}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="Company profile" description="Appears on documents and invoices">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label className="text-xs">Legal name</Label>
              <Input defaultValue="Nexus Industries Pvt. Ltd." className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label className="text-xs">GSTIN</Label>
              <Input defaultValue="27AABCN1234M1Z5" className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label className="text-xs">CIN</Label>
              <Input defaultValue="U29100PN2009PTC134221" className="mt-1.5 rounded-xl" />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Registered address</Label>
              <Input defaultValue="Plot 42, MIDC Chakan, Pune 410501" className="mt-1.5 rounded-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Building2 className="h-3.5 w-3.5" /> 3 plants · 5 warehouses · 486 employees
          </div>
        </Section>

        <Section title="Appearance" description="Theme and density">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => theme === "dark" && toggle()}
              className={`rounded-2xl border p-4 text-left transition-colors ${
                theme === "light" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"
              }`}
            >
              <Sun className="h-4 w-4 text-accent" />
              <p className="mt-2 text-sm font-semibold">Light</p>
              <p className="text-xs text-muted-foreground">Bright, high-contrast surfaces</p>
            </button>
            <button
              onClick={() => theme === "light" && toggle()}
              className={`rounded-2xl border p-4 text-left transition-colors ${
                theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"
              }`}
            >
              <Moon className="h-4 w-4 text-secondary" />
              <p className="mt-2 text-sm font-semibold">Dark</p>
              <p className="text-xs text-muted-foreground">Low-glare for long shifts</p>
            </button>
          </div>
          <div className="mt-4 divide-y divide-border">
            <Row label="Compact tables" desc="Tighter row height in data grids" on={false} />
            <Row label="Reduced motion" desc="Minimise animations across the app" on={false} />
            <div className="flex items-center gap-2 pt-3 text-xs text-muted-foreground">
              <Palette className="h-3.5 w-3.5" /> Brand accent: Nexus Green
            </div>
          </div>
        </Section>

        <Section title="Localisation" description="Regional formats">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs">Base currency</Label>
              <Input defaultValue="INR (₹)" className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label className="text-xs">Timezone</Label>
              <Input defaultValue="Asia/Kolkata (GMT+5:30)" className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label className="text-xs">Date format</Label>
              <Input defaultValue="DD MMM YYYY" className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label className="text-xs">Fiscal year start</Label>
              <Input defaultValue="April" className="mt-1.5 rounded-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Globe2 className="h-3.5 w-3.5" /> Number format: Indian (lakh / crore)
          </div>
        </Section>

        <Section title="Security & notifications" description="Workspace defaults">
          <div className="divide-y divide-border">
            <Row label="Two-factor authentication" desc="Required for all admin roles" on={true} />
            <Row label="Single sign-on (SSO)" desc="Google Workspace SAML" on={true} />
            <Row label="Session timeout" desc="Sign out after 8 hours of inactivity" on={true} />
            <Row label="Email digests" desc="Daily summary at 08:00 IST" on={true} />
            <Row label="IP allowlist" desc="Restrict access to plant networks" on={false} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <KeyRound className="h-3.5 w-3.5" /> 4 API keys active
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bell className="h-3.5 w-3.5" /> 6 alert rules
            </span>
          </div>
        </Section>
      </div>
    </div>
  );
}