import {
  LayoutDashboard, Users, UserPlus, Contact, ShoppingCart, Receipt, Boxes, Warehouse,
  Factory, Wrench, ShieldCheck, CalendarRange, Truck, Building2, FolderKanban, ListChecks,
  IdCard, CalendarCheck, Banknote, CheckCircle2, FileBarChart, TrendingUp, Sparkles,
  Bell, Settings, User, Plug, Wallet, ShieldHalf,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; to: string; icon: LucideIcon; badge?: string };
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", to: "/", icon: LayoutDashboard },
      { label: "AI Assistant", to: "/ai-assistant", icon: Sparkles, badge: "AI" },
      { label: "Analytics", to: "/analytics", icon: TrendingUp },
      { label: "Reports", to: "/reports", icon: FileBarChart },
    ],
  },
  {
    label: "Revenue",
    items: [
      { label: "CRM Pipeline", to: "/crm", icon: Contact },
      { label: "Lead Management", to: "/leads", icon: UserPlus },
      { label: "Customers", to: "/customers", icon: Users },
      { label: "Sales", to: "/sales", icon: ShoppingCart },
    ],
  },
  {
    label: "Supply Chain",
    items: [
      { label: "Purchase", to: "/purchase", icon: Receipt },
      { label: "Suppliers", to: "/suppliers", icon: Truck },
      { label: "Inventory", to: "/inventory", icon: Boxes, badge: "12" },
      { label: "Warehouse", to: "/warehouse", icon: Warehouse },
      { label: "MRP Planning", to: "/mrp", icon: CalendarRange },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Production", to: "/production", icon: Factory },
      { label: "Manufacturing", to: "/manufacturing", icon: Wrench },
      { label: "Quality Control", to: "/quality", icon: ShieldCheck },
      { label: "Projects", to: "/projects", icon: FolderKanban },
      { label: "Tasks", to: "/tasks", icon: ListChecks },
    ],
  },
  {
    label: "People & Finance",
    items: [
      { label: "Employees", to: "/employees", icon: IdCard },
      { label: "HRMS", to: "/hrms", icon: Building2 },
      { label: "Attendance", to: "/attendance", icon: CalendarCheck },
      { label: "Payroll", to: "/payroll", icon: Banknote },
      { label: "Finance", to: "/finance", icon: Wallet },
      { label: "Approvals", to: "/approvals", icon: CheckCircle2, badge: "8" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Notifications", to: "/notifications", icon: Bell },
      { label: "Integrations", to: "/integrations", icon: Plug },
      { label: "Admin", to: "/admin", icon: ShieldHalf },
      { label: "Settings", to: "/settings", icon: Settings },
      { label: "Profile", to: "/profile", icon: User },
    ],
  },
];

export const allNavItems: NavItem[] = navGroups.flatMap((g) => g.items);
