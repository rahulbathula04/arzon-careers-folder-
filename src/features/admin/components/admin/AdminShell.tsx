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
  KeyRound,
  BadgeCheck,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCommandPalette } from "@/components/admin/AdminCommandPalette";
import { ArzonLogo } from "@/components/acri/ArzonLogo";
import { DevBypassBanner } from "@/components/admin/DevBypassBanner";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "Overview" | "Pipeline" | "Growth" | "Workspace" | "Content";
};

const NAV: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
  { to: "/admin/retention", label: "Retention", icon: HeartHandshake, group: "Overview" },
  { to: "/admin/acri-invites", label: "ACRI candidate invites (100)", icon: KeyRound, group: "Pipeline" },
  { to: "/admin/acri", label: "ACRI Command Center", icon: ShieldCheck, group: "Pipeline" },
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
  Overview:  { label: "text-blue-300 font-bold",    active: "bg-blue-500/25 text-blue-100 font-bold border border-blue-400/40 shadow-sm shadow-blue-500/20",    icon: "text-blue-300",    indicator: "bg-blue-400 shadow-[0_0_10px_#60a5fa]" },
  Pipeline:  { label: "text-violet-300 font-bold",  active: "bg-violet-500/25 text-violet-100 font-bold border border-violet-400/40 shadow-sm shadow-violet-500/20",icon: "text-violet-300",  indicator: "bg-violet-400 shadow-[0_0_10px_#a78bfa]" },
  Growth:    { label: "text-emerald-300 font-bold", active: "bg-emerald-500/25 text-emerald-100 font-bold border border-emerald-400/40 shadow-sm shadow-emerald-500/20",icon: "text-emerald-300",indicator: "bg-emerald-400 shadow-[0_0_10px_#34d399]" },
  Content:   { label: "text-amber-300 font-bold",   active: "bg-amber-500/25 text-amber-100 font-bold border border-amber-400/40 shadow-sm shadow-amber-500/20",  icon: "text-amber-300",   indicator: "bg-amber-400 shadow-[0_0_10px_#fbbf24]" },
  Workspace: { label: "text-slate-300 font-bold",    active: "bg-white/15 text-white font-bold border border-white/30 shadow-sm",    icon: "text-slate-200",    indicator: "bg-slate-300" },
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
    <div className="dark relative min-h-dvh bg-[#07090E] text-slate-100 antialiased font-sans [color-scheme:dark]">
      <DevBypassBanner />
      {/* Mobile overlay */}
      {open && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-md lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Sidebar (Apple Glass Panel) ─────────────────────────────────── */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col",
          "border-r border-white/10",
          "bg-[#0A0D14]/95 backdrop-blur-2xl",
          "transition-transform duration-200 ease-out shadow-2xl",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Logo Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link to="/admin" className="flex items-center gap-2.5 group">
            <ArzonLogo variant="dark" size="sm" />
            <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-200 shadow-2xs group-hover:bg-white/15 transition">
              ADMIN
            </span>
          </Link>
          <button
            type="button"
            className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6 [scrollbar-width:thin] [scrollbar-color:#1E293B_transparent]">
          {GROUPS.map((g) => {
            const items = NAV.filter((n) => n.group === g);
            if (!items.length) return null;
            const colors = GROUP_COLORS[g];
            return (
              <div key={g}>
                <p className={`mb-2 px-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] ${colors.label}`}>
                  {g}
                </p>
                <ul className="space-y-1">
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
                            "group relative flex h-9 items-center gap-3 rounded-xl px-3 text-xs font-semibold transition-all duration-150",
                            active
                              ? colors.active
                              : "text-slate-200 hover:bg-white/15 hover:text-white",
                          ].join(" ")}
                        >
                          {active && (
                            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full ${colors.indicator}`} />
                          )}
                          <Icon
                            className={[
                              "h-4 w-4 shrink-0 transition-colors",
                              active ? colors.icon : "text-slate-300 group-hover:text-white",
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

        {/* User Profile Control Footer */}
        <div className="border-t border-white/10 p-3.5">
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-2.5 border border-white/10">
            <div className="relative shrink-0">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-xs text-white shadow-md shadow-blue-900/30 ring-1 ring-white/20">
                {initials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0A0D14] bg-emerald-400 motion-safe:animate-pulse" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-100">{firstName}</p>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">Staff Executive</p>
            </div>
            <button
              type="button"
              onClick={signOut}
              className="grid h-8 w-8 place-items-center rounded-xl text-slate-400 transition hover:bg-rose-500/20 hover:text-rose-300"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Layout Column ────────────────────────────── */}
      <div className="relative z-10 lg:pl-[260px]">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-white/10 bg-[#07090E]/85 px-4 sm:px-6 backdrop-blur-2xl">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="hidden items-center gap-2 text-xs text-slate-400 md:flex font-sans"
          >
            {crumbs.map((c, i) => (
              <span key={c + i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-600" />}
                <span className={i === crumbs.length - 1 ? "font-bold text-white" : "font-medium hover:text-slate-200"}>
                  {c}
                </span>
              </span>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {/* Live Status Badge */}
            <span
              className={[
                "hidden items-center gap-1.5 rounded-full border px-3 py-1 font-sans text-xs font-semibold md:inline-flex",
                isProd
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-300",
              ].join(" ")}
            >
              <span
                className={[
                  "h-2 w-2 rounded-full motion-safe:animate-pulse",
                  isProd ? "bg-emerald-400" : "bg-amber-400",
                ].join(" ")}
              />
              {isProd ? "LIVE PLATFORM" : "PREVIEW INSTANCE"}
            </span>

            {/* Quick Command Search Trigger */}
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="group hidden h-9 w-[240px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-xs text-slate-400 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-slate-200 md:flex cursor-pointer"
            >
              <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-200" />
              <span className="flex-1 text-left font-sans">Search or jump to…</span>
              <kbd className="rounded-md border border-white/10 bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-slate-300 font-bold">
                ⌘K
              </kbd>
            </button>
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Open command palette"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Notifications */}
            <button
              className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 hover:bg-white/10 hover:text-white transition"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 motion-safe:animate-pulse" />
            </button>

            {/* Avatar Pill */}
            <div className="ml-1 grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white shadow-md shadow-blue-900/30 ring-2 ring-white/15 cursor-default">
              {initials}
            </div>
          </div>
        </header>

        <main className="px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6 lg:px-8 lg:pt-8">
          {children}
        </main>
      </div>

      <AdminCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
