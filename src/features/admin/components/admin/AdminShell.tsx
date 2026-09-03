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

const GROUP_COLORS: Record<NavItem["group"], { label: string; active: string; icon: string; indicator: string }> = {
  Overview:  { label: "text-blue-400",    active: "bg-blue-500/20 text-blue-100 font-semibold border border-blue-500/30 shadow-sm shadow-blue-500/10",    icon: "text-blue-400",    indicator: "bg-blue-500 shadow-[0_0_8px_#3b82f6]" },
  Pipeline:  { label: "text-violet-400",  active: "bg-violet-500/20 text-violet-100 font-semibold border border-violet-500/30 shadow-sm shadow-violet-500/10",icon: "text-violet-400",  indicator: "bg-violet-500 shadow-[0_0_8px_#8b5cf6]" },
  Growth:    { label: "text-emerald-400", active: "bg-emerald-500/20 text-emerald-100 font-semibold border border-emerald-500/30 shadow-sm shadow-emerald-500/10",icon: "text-emerald-400",indicator: "bg-emerald-500 shadow-[0_0_8px_#10b981]" },
  Content:   { label: "text-amber-400",   active: "bg-amber-500/20 text-amber-100 font-semibold border border-amber-500/30 shadow-sm shadow-amber-500/10",  icon: "text-amber-400",   indicator: "bg-amber-500 shadow-[0_0_8px_#f59e0b]" },
  Workspace: { label: "text-zinc-400",    active: "bg-white/10 text-white font-semibold border border-white/20 shadow-sm",    icon: "text-zinc-200",    indicator: "bg-zinc-400" },
};

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
  useEffect(() => { setOpen(false); }, [pathname]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  const crumbs = crumbsFor(pathname);
  const initials = (email || "A").slice(0, 2).toUpperCase();
  const firstName = (email?.split("@")[0] || "Admin").split(/[._-]/)[0];
  const isProd =
    typeof window !== "undefined" && window.location.hostname.endsWith("arzoncareers.in");

  return (
    <div className="dark relative min-h-dvh bg-[#09090b] text-zinc-100 antialiased [color-scheme:dark]">
      {/* Mobile overlay */}
      {open && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────── */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-[256px] flex-col",
          "border-r border-white/[0.08]",
          "bg-[#0a0a0d]",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex h-14 items-center justify-between border-b border-white/[0.08] px-4">
          <Link to="/admin" className="flex items-center gap-2.5">
            <span className="relative grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-900/40">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="font-semibold tracking-tight text-white">Arzon</span>
            <span className="rounded border border-white/15 bg-white/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-zinc-300">
              Admin
            </span>
          </Link>
          <button
            type="button"
            className="grid h-7 w-7 place-items-center rounded-md text-zinc-400 hover:bg-white/10 hover:text-zinc-200 lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav with dark scrollbar */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-4 space-y-5 [scrollbar-width:thin] [scrollbar-color:#27272a_transparent]">
          {GROUPS.map((g) => {
            const items = NAV.filter((n) => n.group === g);
            if (!items.length) return null;
            const colors = GROUP_COLORS[g];
            return (
              <div key={g}>
                <p className={`mb-1.5 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${colors.label}`}>
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
                            "group relative flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-xs font-medium transition-all duration-150",
                            active
                              ? colors.active
                              : "text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-100",
                          ].join(" ")}
                        >
                          {active && (
                            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r ${colors.indicator}`} />
                          )}
                          <Icon
                            className={[
                              "h-4 w-4 shrink-0 transition-colors",
                              active ? colors.icon : "text-zinc-400 group-hover:text-zinc-200",
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

        {/* User section */}
        <div className="border-t border-white/[0.08] p-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/[0.08]">
            <div className="relative shrink-0">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 font-semibold text-[11px] text-white shadow-md shadow-violet-900/30">
                {initials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a0a0d] bg-emerald-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold capitalize text-zinc-100">{firstName}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">Staff</p>
            </div>
            <button
              type="button"
              onClick={signOut}
              className="grid h-7 w-7 place-items-center rounded-lg text-zinc-400 transition hover:bg-white/[0.1] hover:text-rose-400"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main column ────────────────────────────── */}
      <div className="relative z-10 lg:pl-[256px]">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-white/[0.06] bg-[#09090b]/80 px-4 backdrop-blur-xl lg:px-6">
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-lg text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-300 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="hidden items-center gap-1.5 text-xs text-zinc-600 md:flex"
          >
            {crumbs.map((c, i) => (
              <span key={c + i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-zinc-700" />}
                <span className={i === crumbs.length - 1 ? "font-medium text-zinc-300" : ""}>
                  {c}
                </span>
              </span>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {/* Environment badge */}
            <span
              className={[
                "hidden items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest md:inline-flex",
                isProd
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-400",
              ].join(" ")}
            >
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full motion-safe:animate-pulse",
                  isProd ? "bg-emerald-400" : "bg-amber-400",
                ].join(" ")}
              />
              {isProd ? "Live" : "Preview"}
            </span>

            {/* Search trigger */}
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="group hidden h-9 w-[220px] items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-xs text-zinc-600 transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-zinc-400 md:flex"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="flex-1 text-left">Search or jump to…</span>
              <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] text-zinc-700">
                ⌘K
              </kbd>
            </button>
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-lg text-zinc-600 hover:bg-white/[0.06] hover:text-zinc-300 md:hidden"
              aria-label="Open command palette"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Notifications */}
            <button
              className="relative grid h-9 w-9 place-items-center rounded-lg text-zinc-600 hover:bg-white/[0.06] hover:text-zinc-300"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-500" />
            </button>

            {/* Avatar */}
            <div className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[11px] font-semibold text-white shadow-md shadow-violet-900/30 ring-2 ring-white/10 cursor-default">
              {initials}
            </div>
          </div>
        </header>

        <main className="px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 lg:px-8 lg:pt-8">
          {children}
        </main>
      </div>

      <AdminCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
