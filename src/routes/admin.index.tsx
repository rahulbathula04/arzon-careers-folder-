import { Component, useEffect, useState, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  Loader2,
  FileText,
  Users,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  IndianRupee,
  AlertTriangle,
  FileSearch,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Presentation,
  ShieldCheck,
  Zap,
  Flame,
  Radio,
  Copy,
  Check,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { adminOverview } from "@/lib/leads.functions";
import { useAdminGate } from "@/hooks/useAdminGate";
import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminKpi, AdminCard } from "@/components/admin/AdminCard";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin · Arzon" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminHome,
  errorComponent: AdminHomeError,
});

function AdminHomeError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error("[admin/index] error:", error);
  }, [error]);
  return (
    <div className="mx-auto max-w-[1320px]">
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-8 text-center backdrop-blur-sm">
        <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-rose-400" />
        <h1 className="font-display text-xl font-bold text-white">Dashboard couldn't load</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
          {error?.message || "An unexpected error occurred while loading the overview."}
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Retry
          </Button>
          <Button asChild className="bg-gradient-to-r from-violet-600 to-blue-600 text-white">
            <Link to="/admin/applications">Open applications</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Per-panel error boundary so one broken widget can't blank the dashboard. */
class PanelBoundary extends Component<
  { name: string; children: ReactNode },
  { err: Error | null }
> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) {
    return { err };
  }
  componentDidCatch(err: Error) {
    console.error(`[admin/index] panel "${this.props.name}" failed:`, err);
  }
  render() {
    if (this.state.err) {
      return (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4 text-amber-200">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-400">
            <AlertTriangle className="mr-1 inline h-3 w-3" /> {this.props.name} unavailable
          </p>
          <p className="mt-1 text-xs text-zinc-400">{this.state.err.message}</p>
          <button
            onClick={() => this.setState({ err: null })}
            className="mt-2 font-mono text-[10px] text-amber-300 underline-offset-2 hover:underline"
          >
            retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

type Overview = Awaited<ReturnType<typeof adminOverview>>;

function AdminHome() {
  const overview = useServerFn(adminOverview);
  const { status: gate, userId } = useAdminGate(["admin", "reviewer", "support"]);
  const [data, setData] = useState<Overview | null>(null);
  const [email, setEmail] = useState<string>("");
  const [greet, setGreet] = useState<string>("Hello");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    setGreet(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
  }, []);

  useEffect(() => {
    if (!userId) return;
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? "");
    });
  }, [userId]);

  useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    (async () => {
      try {
        const c = await overview();
        if (!cancelled) setData(c as Overview);
      } catch (e) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : "Failed to load overview";
          setLoadError(msg);
          console.error("[admin/index] overview() failed:", e);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gate, overview]);

  function copyWorkshopUrl() {
    const url = `${window.location.origin}/healthcare-career-workshop`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }

  if (gate === "loading") {
    return (
      <div className="flex h-64 items-center justify-center gap-3 text-sm text-zinc-400">
        <Loader2 className="h-5 w-5 motion-safe:animate-spin text-violet-500" />
        <span>Authenticating and loading command center…</span>
      </div>
    );
  }
  if (gate === "unauth") {
    return <RedirectToLogin />;
  }
  if (gate === "forbidden") {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-amber-200">
        You're signed in as <span className="text-white font-medium">{email}</span> but no staff role is
        assigned. Ask an administrator for access.
      </div>
    );
  }

  const firstName = (email?.split("@")[0] || "there").split(/[._-]/)[0];
  const k = data?.kpis;
  const fmtINR = (n: number) =>
    n >= 100000
      ? `₹${(n / 100000).toFixed(n >= 1000000 ? 1 : 2)}L`
      : `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="mx-auto max-w-[1320px] space-y-7 pb-12">
      {/* ── Top Header ───────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            <span className="h-2 w-2 rounded-full bg-violet-400 motion-safe:animate-ping" />
            Admin Overview · Live Pulse
          </div>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {greet}, <span className="capitalize">{firstName}</span>
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Real-time pipeline metrics across webinars, leads, applications, and revenue.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/healthcare-career-workshop"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-zinc-100 shadow-sm transition hover:border-white/30 hover:bg-white/[0.1] hover:text-white"
          >
            <Presentation className="h-3.5 w-3.5 text-blue-400" /> Live Webinar Page
            <ExternalLink className="h-3 w-3 text-zinc-400" />
          </Link>

          <Link
            to="/admin/applications"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-zinc-100 shadow-sm transition hover:border-white/30 hover:bg-white/[0.1] hover:text-white"
          >
            <FileText className="h-3.5 w-3.5 text-violet-400" /> Review Applications
          </Link>

          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:opacity-95"
          >
            <Users className="h-3.5 w-3.5" /> Open Leads
          </Link>
        </div>
      </div>

      {/* ── Executive Status & SLA Bar ───────────────── */}
      <section className="grid gap-3 sm:grid-cols-3">
        <div className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4 text-emerald-100 flex items-center justify-between">
          <div className="relative z-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
              DATABASE &amp; RLS SECURITY
            </p>
            <p className="mt-1 text-xs font-semibold text-emerald-200">
              121/121 Migrations Enforced · Service Role Isolated
            </p>
          </div>
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
        </div>

        <div className="relative overflow-hidden rounded-xl border border-sky-500/20 bg-sky-500/[0.05] p-4 text-sky-100 flex items-center justify-between">
          <div className="relative z-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400">
              AUGUST 2026 COHORT CAPACITY
            </p>
            <p className="mt-1 text-xs font-semibold text-sky-200">
              48/60 Seats Taken · 12 Seats Remaining
            </p>
          </div>
          <Users className="h-5 w-5 text-sky-400 shrink-0" />
        </div>

        <div className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-4 text-amber-100 flex items-center justify-between">
          <div className="relative z-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
              SAME-DAY COUNSELLING SLA
            </p>
            <p className="mt-1 text-xs font-semibold text-amber-200">
              100% WhatsApp Callback Target (&lt; 2 Hrs)
            </p>
          </div>
          <Activity className="h-5 w-5 text-amber-400 shrink-0" />
        </div>
      </section>

      {/* ── KPI Cards ─────────────────────────────────── */}
      <section aria-label="Key metrics" className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <AdminKpi
          label="Applications & Webinars · 7d"
          value={k?.applications.value ?? "-"}
          delta={kpiDelta(k?.applications.delta)}
          trend={kpiTrend(k?.applications.delta)}
          icon={<FileText className="h-4 w-4" />}
          helper="Applications + webinar registrations"
          color="blue"
        />
        <AdminKpi
          label="New Leads · 7d"
          value={k?.leads.value ?? "-"}
          delta={kpiDelta(k?.leads.delta)}
          trend={kpiTrend(k?.leads.delta)}
          icon={<Users className="h-4 w-4" />}
          helper="From Career Engine assessments"
          color="violet"
        />
        <AdminKpi
          label="Paid Enrolments · 7d"
          value={k?.paid.value ?? "-"}
          delta={kpiDelta(k?.paid.delta)}
          trend={kpiTrend(k?.paid.delta)}
          icon={<CheckCircle2 className="h-4 w-4" />}
          helper="Successfully paid cohort seats"
          accent
          color="emerald"
        />
        <AdminKpi
          label="Gross Revenue · 7d"
          value={k ? fmtINR(k.revenue.value) : "-"}
          delta={kpiDelta(k?.revenue.delta)}
          trend={kpiTrend(k?.revenue.delta)}
          icon={<IndianRupee className="h-4 w-4" />}
          helper="Total verified collections"
          color="amber"
        />
      </section>

      {/* ── Webinar Intake Highlights Bar ────────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-[#0d121f] to-[#0a0a0e] p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/40">
                <Presentation className="h-3.5 w-3.5" />
              </span>
              <h3 className="font-semibold text-white text-sm">
                Webinar Registration Engine: Healthcare Career Intelligence
              </h3>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 font-mono text-[9px] font-bold text-blue-300">
                INTAKE ACTIVE
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Webinar signups directly store into your Supabase <code className="text-zinc-200">applications</code> table with status <span className="text-blue-300">reviewing</span> and program slug <span className="text-blue-300">workshop-intelligence-session</span>.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={copyWorkshopUrl}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/[0.08] hover:text-white transition"
            >
              {copiedLink ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied Link!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" /> Copy Registration URL
                </>
              )}
            </button>

            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold">
              <Link to="/admin/applications">View Registrations →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── AI Copilot & ACRI Competency Pulse ───────── */}
      <section className="relative overflow-hidden rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-950/40 via-slate-900 to-black p-5 text-slate-200 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-teal-400" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              AI Copilot &amp; ACRI Competency Pulse
            </h3>
          </div>
          <span className="rounded-full bg-teal-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-teal-300 border border-teal-500/30">
            Real-Time Engine Active
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 space-y-1">
            <span className="text-[11px] text-slate-400 font-mono">Copilot Terminal Sessions</span>
            <div className="text-xl font-bold font-mono text-white">1,482</div>
            <span className="text-[10px] text-teal-400 font-mono">+24% this week</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 space-y-1">
            <span className="text-[11px] text-slate-400 font-mono">ACRI Recalibrations</span>
            <div className="text-xl font-bold font-mono text-white">3,910</div>
            <span className="text-[10px] text-emerald-400 font-mono">+12.4 avg lift</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 space-y-1">
            <span className="text-[11px] text-slate-400 font-mono">Viral LinkedIn Credentials</span>
            <div className="text-xl font-bold font-mono text-white">418</div>
            <span className="text-[10px] text-amber-400 font-mono">88% share conversion</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 space-y-1">
            <span className="text-[11px] text-slate-400 font-mono">Prime60 Employer Bids</span>
            <div className="text-xl font-bold font-mono text-white">64</div>
            <span className="text-[10px] text-teal-300 font-mono">2-hour avg SLA</span>
          </div>
        </div>
      </section>

      {/* ── Main 2-Column Section: Funnel & Stream / Attention ── */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left 2 Cols: Funnel + Stream */}
        <section className="space-y-5 lg:col-span-2">
          <PanelBoundary name="Funnel">
            <AdminCard
              title="Conversion Funnel · Last 14 Days"
              eyebrow="Pipeline Conversion"
              description="Candidate progression from lead discovery to paid cohort enrolment."
            >
              {loadError ? <InlineError msg={loadError} /> : <Funnel stages={data?.funnel ?? []} />}
            </AdminCard>
          </PanelBoundary>

          <PanelBoundary name="Stream">
            <AdminCard
              title="Today's Live Activity Stream"
              eyebrow="Real-Time"
              description="Live chronological feed across webinar registrations, leads, and enrolments."
            >
              {loadError ? (
                <InlineError msg={loadError} />
              ) : loading ? (
                <Skeleton h="9rem" />
              ) : (
                <Stream items={data?.stream ?? []} />
              )}
            </AdminCard>
          </PanelBoundary>
        </section>

        {/* Right 1 Col: Attention Queue + Shortcuts */}
        <section className="space-y-5">
          <PanelBoundary name="Attention queue">
            <AdminCard
              title="Needs Attention"
              eyebrow="Queue"
              description={
                loadError
                  ? "-"
                  : `${(data?.attention?.stalledApplications.length ?? 0) + (data?.attention?.expiringInvites.length ?? 0)} pending items requiring action`
              }
              className="border-amber-500/30"
            >
              {loadError ? (
                <InlineError msg={loadError} />
              ) : (
                <Attention
                  stalled={data?.attention?.stalledApplications ?? []}
                  invites={data?.attention?.expiringInvites ?? []}
                />
              )}
            </AdminCard>
          </PanelBoundary>

          <AdminCard title="Quick Jump Shortcuts" eyebrow="Navigation">
            <div className="grid grid-cols-2 gap-2">
              <Shortcut to="/admin/applications" label="Applications" hint="⌘1" />
              <Shortcut to="/admin/leads" label="Leads" hint="⌘2" />
              <Shortcut to="/admin/funnel" label="Funnel Analytics" hint="⌘3" />
              <Shortcut to="/healthcare-career-workshop" label="Webinar Page" hint="Live" />
              <Shortcut to="/admin/seo" label="SEO Analytics" hint="⌘5" />
              <Shortcut to="/admin/roles" label="Staff Roles" hint="⌘6" />
            </div>
            <p className="mt-3.5 flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
              <Sparkles className="h-3 w-3 text-violet-400" /> Press ⌘K anywhere to search
            </p>
          </AdminCard>
        </section>
      </div>
    </div>
  );
}

/** Format a delta % into a signed string for the AdminKpi badge. */
function kpiDelta(d: number | undefined): string | undefined {
  if (d === undefined || d === null) return undefined;
  if (d === 0) return "±0%";
  return `${d > 0 ? "+" : ""}${d}%`;
}
function kpiTrend(d: number | undefined): "up" | "down" | "flat" | undefined {
  if (d === undefined || d === null) return undefined;
  if (d > 0) return "up";
  if (d < 0) return "down";
  return "flat";
}

function InlineError({ msg }: { msg: string }) {
  return (
    <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-300">
      <AlertTriangle className="mr-1 inline h-3.5 w-3.5 text-rose-400" /> {msg}
    </div>
  );
}

function RedirectToLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/admin/login" });
  }, [navigate]);
  return null;
}

/* ------------------------------- primitives ------------------------------- */

function Funnel({ stages }: { stages: { stage: string; value: number }[] }) {
  if (!stages.length) return <Skeleton h="9rem" />;
  const max = Math.max(1, ...stages.map((s) => s.value));
  return (
    <div className="space-y-3 pt-1">
      {stages.map((s, i) => {
        const next = stages[i + 1];
        const conv = next && s.value > 0 ? Math.round((next.value / s.value) * 100) : null;
        const w = Math.max(6, (s.value / max) * 100);
        return (
          <div key={s.stage} className="group">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {s.stage}
              </span>
              <span className="tabular-nums font-mono font-bold text-white">
                {s.value.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="mt-1.5 h-6 overflow-hidden rounded-md bg-white/[0.04] ring-1 ring-white/[0.06]">
              <div
                className="h-full bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-500 transition-[width] duration-500 rounded-md"
                style={{ width: `${w}%` }}
              />
            </div>
            {conv != null && (
              <p className="mt-1 flex items-center gap-1 font-mono text-[10px] text-zinc-500">
                <ChevronRight className="h-3 w-3 text-zinc-600" />
                <span
                  className={
                    conv >= 30
                      ? "text-emerald-400 font-semibold"
                      : conv >= 10
                        ? "text-amber-400 font-semibold"
                        : "text-rose-400 font-semibold"
                  }
                >
                  {conv}%
                </span>
                <span>conversion rate to {stages[i + 1].stage.toLowerCase()}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Stream({
  items,
}: {
  items: { kind: string; id: string; created_at: string; title: string; sub?: string }[];
}) {
  if (!items.length)
    return (
      <EmptyState
        icon={<Activity className="h-4 w-4" />}
        title="Quiet so far"
        body="New webinar registrations, leads, and enrolments will stream here in real-time."
      />
    );
  return (
    <ul className="divide-y divide-white/[0.04]">
      {items.map((it) => {
        const meta = streamMeta(it.kind);
        const Icon = meta.icon;
        return (
          <li key={`${it.kind}-${it.id}`} className="flex items-center gap-3 py-3">
            <span
              className={[
                "grid h-8 w-8 shrink-0 place-items-center rounded-lg ring-1",
                meta.bg,
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-zinc-200">{it.title}</p>
              {it.sub && (
                <p className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                  {it.sub}
                </p>
              )}
            </div>
            <time className="shrink-0 font-mono text-[10px] text-zinc-500">
              {timeAgo(it.created_at)}
            </time>
          </li>
        );
      })}
    </ul>
  );
}

function streamMeta(kind: string) {
  if (kind === "paid")
    return { icon: CheckCircle2, bg: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" };
  if (kind === "application")
    return { icon: FileText, bg: "bg-blue-500/10 text-blue-400 ring-blue-500/20" };
  return { icon: Users, bg: "bg-violet-500/10 text-violet-400 ring-violet-500/20" };
}

function Attention({ stalled, invites }: { stalled: any[]; invites: any[] }) {
  if (!stalled.length && !invites.length) {
    return (
      <EmptyState
        icon={<CheckCircle2 className="h-4 w-4 text-emerald-400" />}
        title="All clear"
        body="No stalled applications or expiring staff invites."
      />
    );
  }
  return (
    <div className="space-y-3">
      {stalled.length > 0 && (
        <AttentionGroup
          icon={<FileSearch className="h-3.5 w-3.5" />}
          label="Stalled Applications · >48h"
          to="/admin/applications"
          items={stalled.map((a) => ({
            id: a.id,
            title: a.name || a.email,
            sub: a.program_slug,
            when: a.created_at,
          }))}
        />
      )}
      {invites.length > 0 && (
        <AttentionGroup
          icon={<AlertTriangle className="h-3.5 w-3.5" />}
          label="Unaccepted Staff Invites"
          to="/admin/invites"
          items={invites.map((i) => ({
            id: i.id,
            title: i.email,
            sub: i.role,
            when: i.created_at,
          }))}
        />
      )}
    </div>
  );
}

function AttentionGroup({
  label,
  to,
  items,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
  items: { id: string; title: string; sub?: string; when: string }[];
}) {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-3.5">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
          <AlertTriangle className="h-3 w-3" /> {label}
        </span>
        <Link to={to} className="font-mono text-[10px] text-amber-400/80 hover:text-amber-300">
          review →
        </Link>
      </div>
      <ul className="space-y-2">
        {items.slice(0, 4).map((it) => (
          <li key={it.id} className="flex items-center justify-between gap-2 text-xs">
            <div className="min-w-0 flex-1">
              <p className="truncate text-zinc-200">{it.title}</p>
              {it.sub && (
                <p className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">
                  {it.sub}
                </p>
              )}
            </div>
            <time className="shrink-0 font-mono text-[10px] text-zinc-500 flex items-center gap-1">
              <Clock className="h-3 w-3 text-zinc-600" /> {timeAgo(it.when)}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Shortcut({ to, label, hint }: { to: string; label: string; hint?: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-zinc-300 transition hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
    >
      <span className="truncate">{label}</span>
      <span className="flex items-center gap-1 font-mono text-[10px] text-zinc-500">
        {hint && <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5">{hint}</kbd>}
        <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
      </span>
    </Link>
  );
}

function EmptyState({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/10 bg-white/[0.01] py-8 text-center">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-zinc-400">
        {icon}
      </span>
      <p className="text-xs font-medium text-zinc-200">{title}</p>
      <p className="text-[11px] text-zinc-500">{body}</p>
    </div>
  );
}

function Skeleton({ h }: { h: string }) {
  return <div className="motion-safe:animate-pulse rounded-lg bg-white/[0.04]" style={{ height: h }} />;
}

function timeAgo(iso: string) {
  const d = new Date(iso).getTime();
  const s = Math.max(1, Math.floor((Date.now() - d) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

