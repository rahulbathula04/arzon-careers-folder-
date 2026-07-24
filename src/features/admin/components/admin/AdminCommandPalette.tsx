import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Zap,
  FlaskConical,
  Mail,
  ShieldCheck,
  ImageIcon,
  Award,
  Search,
  Activity,
  LogOut,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ROUTES: {
  to: string;
  label: string;
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords?: string;
}[] = [
  {
    to: "/admin",
    label: "Dashboard",
    group: "Navigate",
    icon: LayoutDashboard,
    keywords: "home overview",
  },
  { to: "/admin/applications", label: "Applications", group: "Navigate", icon: FileText },
  { to: "/admin/leads", label: "Leads", group: "Navigate", icon: Users, keywords: "career engine" },
  { to: "/admin/funnel", label: "Funnel", group: "Navigate", icon: BarChart3 },
  {
    to: "/admin/arzonprime60",
    label: "ARZONPRIME60",
    group: "Navigate",
    icon: Zap,
    keywords: "prime waitlist tiers",
  },
  { to: "/admin/funnel-test", label: "Funnel QA", group: "Navigate", icon: FlaskConical },
  { to: "/admin/seo", label: "SEO performance", group: "Navigate", icon: Search },
  { to: "/admin/analytics-alerts", label: "Analytics alerts", group: "Navigate", icon: Activity },
  { to: "/admin/demand", label: "Demand tracks", group: "Navigate", icon: BarChart3 },
  { to: "/admin/thumbnails", label: "Thumbnails", group: "Navigate", icon: ImageIcon },
  { to: "/admin/certificates", label: "Certificates", group: "Navigate", icon: Award },
  { to: "/admin/invites", label: "Staff invites", group: "Workspace", icon: Mail },
  { to: "/admin/roles", label: "Staff roles", group: "Workspace", icon: ShieldCheck },
];

const ACTIONS = [
  { label: "View live site", group: "Actions", icon: ExternalLink, action: "open-site" },
  { label: "Career-engine landing", group: "Actions", icon: Sparkles, action: "open-ce" },
  { label: "Sign out", group: "Actions", icon: LogOut, action: "sign-out" },
] as const;

export function AdminCommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();

  // ⌘K / Ctrl+K global shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  function go(to: string) {
    onOpenChange(false);
    navigate({ to });
  }

  async function doAction(a: string) {
    onOpenChange(false);
    if (a === "sign-out") {
      await supabase.auth.signOut();
      navigate({ to: "/admin/login" });
    } else if (a === "open-site") {
      window.open("/", "_blank");
    } else if (a === "open-ce") {
      window.open("/career-engine", "_blank");
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search routes, run an action…" />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {ROUTES.filter((r) => r.group === "Navigate").map((r) => {
            const Icon = r.icon;
            return (
              <CommandItem
                key={r.to}
                value={`${r.label} ${r.keywords ?? ""}`}
                onSelect={() => go(r.to)}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{r.label}</span>
                <span className="ml-auto font-mono text-micro text-muted-foreground">{r.to}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Workspace">
          {ROUTES.filter((r) => r.group === "Workspace").map((r) => {
            const Icon = r.icon;
            return (
              <CommandItem key={r.to} value={r.label} onSelect={() => go(r.to)}>
                <Icon className="mr-2 h-4 w-4" />
                <span>{r.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          {ACTIONS.map((a) => {
            const Icon = a.icon;
            return (
              <CommandItem key={a.action} value={a.label} onSelect={() => doAction(a.action)}>
                <Icon className="mr-2 h-4 w-4" />
                <span>{a.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
