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
  Compass,
  Radio,
  Cpu,
  Layers,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCommandPalette } from "@/components/admin/AdminCommandPalette";
import { ArzonLogo } from "@/components/acri/ArzonLogo";
import { DevBypassBanner } from "@/components/admin/DevBypassBanner";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "Command" | "Intake & Pipeline" | "Growth & Revenue" | "Content" | "Workspace";
};

const NAV: NavItem[] = [
  { to: "/admin", label: "Executive Dashboard", icon: LayoutDashboard, group: "Command" },
  { to: "/admin/retention", label: "Cohort Retention", icon: HeartHandshake, group: "Command" },
  
  { to: "/admin/results", label: "Assessment Results", icon: Compass, group: "Intake & Pipeline" },
  { to: "/admin/acri", label: "ACRI Command Center", icon: ShieldCheck, group: "Intake & Pipeline" },
  { to: "/admin/acri-invites", label: "Candidate Invites", icon: KeyRound, group: "Intake & Pipeline" },
  { to: "/admin/applications", label: "Direct Applications", icon: FileText, group: "Intake & Pipeline" },
  { to: "/admin/leads", label: "Admissions Leads", icon: Users, group: "Intake & Pipeline" },
  { to: "/admin/placements", label: "Placements Ledger", icon: BadgeCheck, group: "Intake & Pipeline" },
  
  { to: "/admin/funnel", label: "Conversion Funnel", icon: BarChart3, group: "Growth & Revenue" },
  { to: "/admin/readiness-journeys", label: "Readiness Velocity", icon: Zap, group: "Growth & Revenue" },
  { to: "/admin/arzonprime60", label: "Prime60 Engine", icon: Cpu, group: "Growth & Revenue" },
  { to: "/admin/funnel-test", label: "Funnel QA Sandbox", icon: FlaskConical, group: "Growth & Revenue" },
  { to: "/admin/seo", label: "SEO Acquisition", icon: Search, group: "Growth & Revenue" },

  { to: "/admin/demand", label: "Clinical Track Demand", icon: Layers, group: "Content" },
  { to: "/admin/thumbnails", label: "Visual Thumbnails", icon: ImageIcon, group: "Content" },
  { to: "/admin/certificates", label: "Credential Engine", icon: Award, group: "Content" },
  { to: "/admin/content-qa-scan", label: "Copy & Token QA", icon: SpellCheck, group: "Content" },
  { to: "/admin/landing-changelog", label: "Editorial History", icon: History, group: "Content" },
  { to: "/admin/moments", label: "Arzon Moments", icon: Camera, group: "Content" },
  { to: "/admin/assets", label: "Media Storage", icon: HardDrive, group: "Content" },

  { to: "/admin/invites", label: "Staff Direct Access", icon: Mail, group: "Workspace" },
  { to: "/admin/roles", label: "Security & Permissions", icon: ShieldCheck, group: "Workspace" },
];

const GROUPS: NavItem["group"][] = [
  "Command",
  "Intake & Pipeline",
  "Growth & Revenue",
  "Content",
  "Workspace",
];

function crumbsFor(pathname: string): string[] {
  const item = NAV.find((n) =>
    n.to === "/admin" ? pathname === "/admin" : pathname.startsWith(n.to),
  );
  return ["Console", item?.label ?? "Command Center"].filter(Boolean);
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
  const firstName = (email?.split("@")[0] || "Executive").split(/[._-]/)[0];
  const isProd =
    typeof window !== "undefined" && window.location.hostname.endsWith("arzoncareers.in");

  return (
    <div className="dark relative min-h-dvh bg-[#05070B] text-slate-100 antialiased font-sans [color-scheme:dark]">
      {/* Background Subtle Ambient Specular Glow */}
      <div className="pointer-events-none fixed -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/[0.04] blur-[140px]" />
      <div className="pointer-events-none fixed top-1/2 -left-32 h-[450px] w-[450px] rounded-full bg-indigo-600/[0.03] blur-[130px]" />

      <DevBypassBanner />

      {/* Mobile Backdrop Overlay */}
      {open && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl lg:hidden transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Cupertino Titanium Glass Sidebar ─────────────────────────────────── */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col",
          "border-r border-white/[0.08]",
          "bg-[#080B12]/92 backdrop-blur-3xl",
          "shadow-[4px_0_36px_rgba(0,0,0,0.6)]",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Apple Pro Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/[0.08] px-5 bg-white/[0.01]">
          <Link to="/admin" className="flex items-center gap-2.5 group">
            <ArzonLogo variant="dark" size="sm" />
            <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.25)]">
              PRO
            </span>
          </Link>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition lg:hidden cursor-pointer"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Search Launcher Bar inside Sidebar */}
        <div className="px-3.5 pt-4 pb-1">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="w-full flex items-center justify-between gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/[0.15] px-3 py-2 text-xs text-slate-400 transition-all cursor-pointer shadow-inner shadow-black/40 group"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span className="font-sans font-medium text-slate-300 text-[11.5px]">Command Palette</span>
            </div>
            <kbd className="rounded-md border border-white/15 bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-slate-300 font-bold tracking-wider">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]">
          {GROUPS.map((g, gIdx) => {
            const items = NAV.filter((n) => n.group === g);
            if (!items.length) return null;
            return (
              <div key={g}>
                <div className="flex items-center justify-between mb-2 px-3">
                  <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] text-slate-400">
                    {`0${gIdx + 1} · ${g}`}
                  </p>
                </div>
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
                            "group relative flex h-9 items-center gap-2.5 rounded-xl px-3 text-xs font-semibold transition-all duration-200",
                            active
                              ? "bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent text-white border border-blue-400/30 shadow-[0_2px_12px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]"
                              : "text-slate-300 hover:bg-white/[0.06] hover:text-white",
                          ].join(" ")}
                        >
                          {active && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
                          )}
                          <Icon
                            className={[
                              "h-4 w-4 shrink-0 transition-colors",
                              active ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200",
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

        {/* User Profile Glass Control Footer */}
        <div className="border-t border-white/[0.08] p-3.5 bg-black/20">
          <div className="flex items-center gap-2.5 rounded-2xl bg-white/[0.04] p-2.5 border border-white/[0.08] shadow-inner shadow-black/40">
            <div className="relative shrink-0">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 font-bold text-xs text-white shadow-md shadow-blue-900/40 ring-1 ring-white/20">
                {initials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#080B12] bg-emerald-400 motion-safe:animate-pulse" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-100">{firstName}</p>
              <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-400">Arzon Director</p>
            </div>
            <button
              type="button"
              onClick={signOut}
              className="grid h-8 w-8 place-items-center rounded-xl text-slate-400 transition hover:bg-rose-500/20 hover:text-rose-300 cursor-pointer"
              aria-label="Sign out"
              title="Sign out of Console"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Beast Command Center Area ────────────────────────────── */}
      <div className="relative z-10 lg:pl-[268px] min-h-dvh flex flex-col">
        {/* Apple Cupertino Control Center Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/[0.08] bg-[#070A10]/85 px-4 sm:px-6 lg:px-8 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 hover:bg-white/10 hover:text-white transition lg:hidden cursor-pointer"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-4 w-4" />
            </button>

            {/* Breadcrumb Navigation Trail */}
            <nav
              aria-label="Breadcrumb"
              className="hidden items-center gap-2 text-xs text-slate-400 md:flex font-sans"
            >
              <Link to="/admin" className="hover:text-slate-200 transition-colors">
                Console
              </Link>
              {crumbs.slice(1).map((c, i) => (
                <span key={c + i} className="flex items-center gap-2">
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                  <span className={i === crumbs.length - 2 ? "font-bold text-white tracking-wide" : "font-medium hover:text-slate-200"}>
                    {c}
                  </span>
                </span>
              ))}
            </nav>
          </div>

          {/* Right Header Status Telemetry */}
          <div className="flex items-center gap-3">
            {/* Live Infrastructure Telemetry Chip */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-mono text-[10.5px] font-bold text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{isProd ? "LIVE PRODUCTION · ENGINE ONLINE" : "TEST INSTANCE · SANDBOX"}</span>
            </div>

            {/* Quick Command Launcher */}
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden sm:inline-flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs text-slate-300 hover:border-white/20 hover:bg-white/[0.08] transition cursor-pointer"
              aria-label="Open command palette"
            >
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span>Spotlight</span>
              <kbd className="rounded bg-white/10 px-1 py-0.2 text-[9px] font-mono text-slate-300">⌘K</kbd>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>

      <AdminCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
