import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Factory,
  DollarSign,
  Settings,
  LogOut,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  {
    label: "CRM",
    icon: Users,
    href: "/crm",
    submenu: [
      { label: "Leads", href: "/leads" },
      { label: "Customers", href: "/customers" },
    ],
  },
  { label: "Sales", icon: ShoppingCart, href: "/sales" },
  { label: "Purchase", icon: Package, href: "/purchase" },
  { label: "Inventory", icon: Package, href: "/inventory" },
  { label: "Manufacturing", icon: Factory, href: "/production" },
  { label: "Finance", icon: DollarSign, href: "/finance" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
  { label: "AI Assistant", icon: Zap, href: "/ai-assistant" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar transition-transform duration-300 lg:relative lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-border px-6 py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                N
              </div>
              <span className="font-semibold text-foreground">Nexus ERP</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {menuItems.map((item) => (
              <div key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.submenu && (
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isActive(item.href) && "rotate-90"
                      )}
                    />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-accent hover:text-foreground">
              <LogOut className="h-5 w-5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
