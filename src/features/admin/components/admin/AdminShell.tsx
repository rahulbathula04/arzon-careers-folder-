import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
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
  Bell,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  SpellCheck,
  History,
  Camera,
  HeartHandshake,
  HardDrive,
  BadgeCheck,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCommandPalette } from "@/components/admin/AdminCommandPalette";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "Overview" | "Pipeline" | "Growth" | "Workspace" | "Content";
};

const NAV: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
  { to: "/admin/retention", label: "Retention", icon: HeartHandshake, group: "Overview" },
  { to: "/admin/applications", label: "Applications", icon: FileText, group: "Pipeline" },
  { to: "/admin/leads", label: "Leads", icon: Users, group: "Pipeline" },
  { to: "/admin/placements", label: "Placements ledger", icon: BadgeCheck, group: "Pipeline" },
  { to: "/admin/funnel", label: "Funnel", icon: BarChart3, group: "Growth" },
  { to: "/admin/readiness-journeys", label: "Readiness funnel", icon: BarChart3, group: "Growth" },
  { to: "/admin/arzonprime60", label: "ARZONPRIME60", icon: Zap, group: "Growth" },
  { to: "/admin/funnel-test", label: "Funnel QA", icon: FlaskConical, group: "Growth" },
  { to: "/admin/seo", label: "SEO performance", icon: Search, group: "Growth" },
  { to: "/admin/demand", label: "Demand tracks", icon: BarChart3, group: "Content" },
  { to: "/admin/thumbnails", label: "Thumbnails", icon: ImageIcon, group: "Content" },
  { to: "/admin/certificates", label: "Certificates", icon: Award, group: "Content" },
  { to: "/admin/content-qa-scan", label: "Content QA scan", icon: SpellCheck, group: "Content" },
  { to: "/admin/landing-changelog", label: "Copy changelog", icon: History, group: "Content" },
  { to: "/admin/moments", label: "Arzon Moments", icon: Camera, group: "Content" },
  { to: "/admin/assets", label: "Static assets", icon: HardDrive, group: "Content" },
  { to: "/admin/invites", label: "Staff invites", icon: Mail, group: "Workspace" },
  { to: "/admin/roles", label: "Staff roles", icon: ShieldCheck, group: "Workspace" },
];

const GROUPS: NavItem["group"][] = ["Overview", "Pipeline", "Growth", "Content", "Workspace"];

function crumbsFor(pathname: string): string[] {
  const item = NAV.find((n) =>
    n.to === "/admin" ? pathname === "/admin" : pathname.startsWith(n.to),
  );
  return ["Admin", item?.label ?? ""].filter(Boolean);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);
  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  const crumbs = crumbsFor(pathname);
  const initials = (email || "A").slice(0, 2).toUpperCase();
  const isProd =
    typeof window !== "undefined" && window.location.hostname.endsWith("arzoncareers.in");

  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      {/* Mobile overlay */}
      {open && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-foreground/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-border",
          "bg-card",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 ring-1 ring-primary/30">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </span>
            <span className="font-display text-body-sm leading-none text-foreground">Arzon</span>
            <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground">
              Admin
            </span>
          </Link>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {GROUPS.map((g) => {
            const items = NAV.filter((n) => n.group === g);
            if (!items.length) return null;
            return (
              <div key={g} className="mb-4">
                <p className="px-3 py-1.5 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {g}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => {
                    const active =
                      item.to === "/admin"
                        ? pathname === "/admin"
                        : pathname === item.to || pathname.startsWith(item.to + "/");
                    const Icon = item.icon;
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className={[
                            "group relative flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm font-medium transition",
                            active
                              ? "bg-accent text-accent-foreground before:absolute before:inset-y-1.5 before:left-0 before:w-1 before:rounded-r before:bg-primary"
                              : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                          ].join(" ")}
                        >
                          <Icon
                            className={[
                              "h-4 w-4 shrink-0",
                              active
                                ? "text-primary"
                                : "text-muted-foreground group-hover:text-foreground",
                            ].join(" ")}
                          />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2.5 rounded-lg bg-muted p-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-micro font-semibold">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-meta text-foreground">{email || "Signed in"}</p>
              <p className="font-mono text-micro uppercase tracking-wider text-muted-foreground">
                Staff
              </p>
            </div>
            <button
              type="button"
              onClick={signOut}
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="relative z-10 lg:pl-[260px]">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur-xl lg:px-6">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <nav
            aria-label="Breadcrumb"
            className="hidden items-center gap-1.5 text-meta text-muted-foreground md:flex"
          >
            {crumbs.map((c, i) => (
              <span key={c + i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/60" />}
                <span className={i === crumbs.length - 1 ? "text-foreground font-medium" : ""}>
                  {c}
                </span>
              </span>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <span
              className={[
                "hidden items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-micro uppercase tracking-[0.18em] md:inline-flex",
                isProd
                  ? "border-sky-300 bg-sky-50 text-sky-900"
                  : "border-amber-300 bg-amber-50 text-amber-900",
              ].join(" ")}
              title={isProd ? "Production environment" : "Preview environment"}
            >
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full",
                  isProd ? "bg-sky-500" : "bg-amber-500",
                ].join(" ")}
              />
              {isProd ? "Live" : "Preview"}
            </span>
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="group relative hidden h-9 w-[260px] items-center gap-2 rounded-lg border border-border bg-muted px-2.5 text-caption text-muted-foreground transition hover:border-foreground/20 hover:bg-accent hover:text-foreground md:flex"
            >
              <Search className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
              <span className="flex-1 text-left">Search or jump to…</span>
              <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-micro text-muted-foreground">
                ⌘K
              </kbd>
            </button>
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
              aria-label="Open command palette"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 lg:px-8 lg:pt-10">
          {children}
        </main>
      </div>
      <AdminCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
