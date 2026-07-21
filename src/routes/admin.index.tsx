import { Component, useEffect, useState, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  Loader2,
  FileText,
  Users,
  Mail,
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
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip as RTooltip } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { adminOverview } from "@/lib/leads.functions";
import { useAdminGate } from "@/hooks/useAdminGate";
import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminKpi } from "@/components/admin/AdminCard";

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
      <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.04] p-8 text-center">
        <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-rose-300" />
        <h1 className="font-display text-h3 text-foreground">Dashboard couldn't load</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-foreground">
          {error?.message || "An unexpected error occurred while loading the overview."}
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Retry
          </Button>
          <Button asChild>
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
        <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.04] p-4 text-amber-100">
          <p className="font-mono text-micro uppercase tracking-[0.18em] text-amber-200/80">
            <AlertTriangle className="mr-1 inline h-3 w-3" /> {this.props.name} unavailable
          </p>
          <p className="mt-1 text-meta text-amber-100/80">{this.state.err.message}</p>
          <button
            onClick={() => this.setState({ err: null })}
            className="mt-2 font-mono text-micro text-amber-200 underline-offset-2 hover:underline"
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
  const navigate = useNavigate();
  const overview = useServerFn(adminOverview);
  const { status: gate, userId } = useAdminGate(["admin", "reviewer", "support"]);
  const [data, setData] = useState<Overview | null>(null);
  const [email, setEmail] = useState<string>("");
  const [greet, setGreet] = useState<string>("Hello");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (gate === "loading") {
    return (
      <div className="flex items-center gap-2 text-foreground text-sm">
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading…
      </div>
    );
  }
  if (gate === "unauth") {
    return <RedirectToLogin />;
  }
  if (gate === "forbidden") {
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100">
        You're signed in as <span className="text-foreground">{email}</span> but no staff role is
        assigned. Ask an admin for access.
      </div>
    );
  }

  const firstName = (email?.split("@")[0] || "there").split(/[._-]/)[0];

  const ts = data?.timeseries ?? [];
  const k = data?.kpis;
  const fmtINR = (n: number) =>
    n >= 100000
      ? `₹${(n / 100000).toFixed(n >= 1000000 ? 1 : 2)}L`
      : `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="mx-auto max-w-[1320px] space-y-7">
      <AdminPageHeader
        eyebrow="Admin · Overview"
        title={
          <>
            {greet}, <span className="capitalize">{firstName}</span>
          </>
        }
        description="Last 7 days vs prior 7 — real numbers, no projections."
        actions={
          <>
            <Link
              to="/admin/applications"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
            >
              <FileText className="h-3.5 w-3.5" /> Review applications
            </Link>
            <Link
              to="/admin/leads"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <Users className="h-3.5 w-3.5" /> Open leads
            </Link>
          </>
        }
      />

      {/* KPI cards */}
      <section aria-label="Key metrics" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminKpi
          label="Applications · 7d"
          value={k?.applications.value ?? "—"}
          delta={kpiDelta(k?.applications.delta)}
          trend={kpiTrend(k?.applications.delta)}
          icon={<FileText className="h-4 w-4" />}
          helper="vs prior 7 days"
        />
        <AdminKpi
          label="New leads · 7d"
          value={k?.leads.value ?? "—"}
          delta={kpiDelta(k?.leads.delta)}
          trend={kpiTrend(k?.leads.delta)}
          icon={<Users className="h-4 w-4" />}
          helper="vs prior 7 days"
        />
        <AdminKpi
          label="Paid enrolments · 7d"
          value={k?.paid.value ?? "—"}
          delta={kpiDelta(k?.paid.delta)}
          trend={kpiTrend(k?.paid.delta)}
          icon={<CheckCircle2 className="h-4 w-4" />}
          helper="vs prior 7 days"
          accent
        />
        <AdminKpi
          label="Revenue · 7d"
          value={k ? fmtINR(k.revenue.value) : "—"}
          delta={kpiDelta(k?.revenue.delta)}
          trend={kpiTrend(k?.revenue.delta)}
          icon={<IndianRupee className="h-4 w-4" />}
          helper="vs prior 7 days"
        />
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Funnel + Today */}
        <section className="space-y-5 lg:col-span-2">
          <PanelBoundary name="Funnel">
            <Panel title="Funnel · last 14 days" hint="Lead → Apply → Review → Accept → Paid">
              {loadError ? <InlineError msg={loadError} /> : <Funnel stages={data?.funnel ?? []} />}
            </Panel>
          </PanelBoundary>

          <PanelBoundary name="Stream">
            <Panel title="Today's stream" hint="Live across applications, leads, payments">
              {loadError ? (
                <InlineError msg={loadError} />
              ) : loading ? (
                <Skeleton h="9rem" />
              ) : (
                <Stream items={data?.stream ?? []} />
              )}
            </Panel>
          </PanelBoundary>
        </section>

        {/* Attention */}
        <section className="space-y-5">
          <PanelBoundary name="Attention queue">
            <Panel
              title="Needs your attention"
              hint={
                loadError
                  ? "—"
                  : `${(data?.attention?.stalledApplications.length ?? 0) + (data?.attention?.expiringInvites.length ?? 0)} items`
              }
              tone="warn"
            >
              {loadError ? (
                <InlineError msg={loadError} />
              ) : (
                <Attention
                  stalled={data?.attention?.stalledApplications ?? []}
                  invites={data?.attention?.expiringInvites ?? []}
                />
              )}
            </Panel>
          </PanelBoundary>

          <Panel title="Shortcuts">
            <div className="grid grid-cols-2 gap-2">
              <Shortcut to="/admin/applications" label="Applications" hint="⌘1" />
              <Shortcut to="/admin/leads" label="Leads" hint="⌘2" />
              <Shortcut to="/admin/results" label="Results" hint="⌘3" />
              <Shortcut to="/admin/activity" label="Activity" hint="⌘4" />
              <Shortcut to="/admin/seo" label="SEO" hint="⌘5" />
              <Shortcut to="/admin/demand" label="Demand" hint="⌘6" />
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-micro text-muted-foreground">
              <Sparkles className="h-3 w-3" /> Press ⌘K from anywhere
            </p>
          </Panel>
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
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
      <AlertTriangle className="mr-1 inline h-3 w-3 text-amber-700" /> {msg}
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

function Panel({
  title,
  hint,
  tone = "default",
  children,
}: {
  title: string;
  hint?: string;
  tone?: "default" | "warn";
  children: React.ReactNode;
}) {
  return (
    <section
      className={[
        "rounded-2xl border bg-card p-4 shadow-sm sm:p-5",
        tone === "warn" ? "border-amber-400/60" : "border-border",
      ].join(" ")}
    >
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
        {hint && (
          <span className="font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground">
            {hint}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function Kpi({
  label,
  value,
  delta,
  icon,
  series,
  accent = false,
}: {
  label: string;
  value: number | string | undefined;
  delta: number | undefined;
  icon: React.ReactNode;
  series: { v: number }[];
  accent?: boolean;
}) {
  const v = value === undefined || value === null ? "—" : String(value);
  const d = delta ?? 0;
  const up = d > 0,
    down = d < 0;
  const TrendIcon = up ? TrendingUp : down ? TrendingDown : Activity;
  const trendClass = up ? "text-sky-300" : down ? "text-rose-300" : "text-muted-foreground";
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl border p-4 transition",
        accent
          ? "border-primary-glow/30 bg-primary-glow/[0.04] ring-1 ring-primary-glow/10"
          : "border-white/[0.08] bg-white/[0.025] hover:border-border",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-muted text-primary-glow">
            {icon}
          </span>
          <span className="font-mono text-micro font-semibold uppercase tracking-[0.18em]">
            {label}
          </span>
        </div>
        <span className={`flex items-center gap-1 font-mono text-micro ${trendClass}`}>
          <TrendIcon className="h-3 w-3" />
          {d === 0 && value === undefined ? "—" : `${d > 0 ? "+" : ""}${d}%`}
        </span>
      </div>
      <p className="mt-3 font-display text-h2 leading-none text-foreground tabular-nums">{v}</p>
      <p className="mt-1 text-micro text-muted-foreground">vs prior 7 days</p>
      <div className="pointer-events-none mt-3 h-9">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={`sg-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity={0.45} />
                <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
              </linearGradient>
            </defs>
            <RTooltip cursor={false} content={() => null} />
            <Area
              type="monotone"
              dataKey="v"
              stroke="currentColor"
              strokeWidth={1.5}
              fill={`url(#sg-${label})`}
              className="text-primary-glow"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Funnel({ stages }: { stages: { stage: string; value: number }[] }) {
  if (!stages.length) return <Skeleton h="9rem" />;
  const max = Math.max(1, ...stages.map((s) => s.value));
  return (
    <div className="space-y-2">
      {stages.map((s, i) => {
        const next = stages[i + 1];
        const conv = next && s.value > 0 ? Math.round((next.value / s.value) * 100) : null;
        const w = Math.max(6, (s.value / max) * 100);
        return (
          <div key={s.stage} className="group">
            <div className="flex items-center justify-between gap-3 text-meta">
              <span className="font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground">
                {s.stage}
              </span>
              <span className="tabular-nums text-foreground">
                {s.value.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="mt-1.5 h-7 overflow-hidden rounded-md bg-muted">
              <div
                className="h-full bg-gradient-to-r from-primary-glow/70 to-primary-glow/30 transition-[width] duration-500"
                style={{ width: `${w}%` }}
              />
            </div>
            {conv != null && (
              <p className="mt-1 flex items-center gap-1 font-mono text-micro text-muted-foreground">
                <ChevronRight className="h-3 w-3" />
                <span
                  className={
                    conv >= 30
                      ? "text-sky-300/80"
                      : conv >= 10
                        ? "text-amber-200/80"
                        : "text-rose-300/80"
                  }
                >
                  {conv}%
                </span>
                <span>convert to {stages[i + 1].stage.toLowerCase()}</span>
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
        body="New activity will appear here in real-time."
      />
    );
  return (
    <ul className="divide-y divide-white/[0.06]">
      {items.map((it) => {
        const meta = streamMeta(it.kind);
        const Icon = meta.icon;
        return (
          <li key={`${it.kind}-${it.id}`} className="flex items-center gap-3 py-2.5">
            <span
              className={[
                "grid h-7 w-7 shrink-0 place-items-center rounded-md ring-1",
                meta.bg,
              ].join(" ")}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-caption text-foreground">{it.title}</p>
              {it.sub && (
                <p className="truncate font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground">
                  {it.sub}
                </p>
              )}
            </div>
            <time className="shrink-0 font-mono text-micro text-muted-foreground">
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
    return { icon: CheckCircle2, bg: "bg-sky-400/10 text-sky-300 ring-sky-400/20" };
  if (kind === "application")
    return { icon: FileText, bg: "bg-primary-glow/10 text-primary-glow ring-primary-glow/20" };
  return { icon: Users, bg: "bg-muted text-foreground ring-border" };
}

function Attention({ stalled, invites }: { stalled: any[]; invites: any[] }) {
  if (!stalled.length && !invites.length) {
    return (
      <EmptyState
        icon={<CheckCircle2 className="h-4 w-4 text-sky-300" />}
        title="All clear"
        body="Nothing stalled, nothing expiring."
      />
    );
  }
  return (
    <div className="space-y-3">
      {stalled.length > 0 && (
        <AttentionGroup
          icon={<FileSearch className="h-3.5 w-3.5" />}
          label="Stalled applications · >48h"
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
          icon={<Mail className="h-3.5 w-3.5" />}
          label="Unaccepted staff invites"
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
  icon,
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
    <div className="rounded-lg border border-white/[0.06] bg-muted/40 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-amber-200/80">
          <AlertTriangle className="h-3 w-3" /> {label}
        </span>
        <Link to={to} className="font-mono text-micro text-muted-foreground hover:text-foreground">
          open →
        </Link>
      </div>
      <ul className="space-y-1.5">
        {items.slice(0, 4).map((it) => (
          <li key={it.id} className="flex items-center justify-between gap-2 text-meta">
            <div className="min-w-0 flex-1">
              <p className="truncate text-foreground">{it.title}</p>
              {it.sub && (
                <p className="truncate font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground">
                  {it.sub}
                </p>
              )}
            </div>
            <time className="shrink-0 font-mono text-micro text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {timeAgo(it.when)}
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
      className="group flex items-center justify-between gap-2 rounded-lg border border-white/[0.08] bg-muted/40 px-3 py-2 text-meta text-foreground transition hover:border-primary-glow/40 hover:bg-muted hover:text-foreground"
    >
      <span>{label}</span>
      <span className="flex items-center gap-1 font-mono text-micro text-muted-foreground/70">
        {hint && <kbd className="rounded border border-border bg-muted px-1 py-0.5">{hint}</kbd>}
        <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function EmptyState({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-white/[0.015] py-7 text-center">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground">
        {icon}
      </span>
      <p className="text-caption text-foreground">{title}</p>
      <p className="text-micro text-muted-foreground">{body}</p>
    </div>
  );
}

function Skeleton({ h }: { h: string }) {
  return <div className="motion-safe:animate-pulse rounded-md bg-muted" style={{ height: h }} />;
}

function timeAgo(iso: string) {
  const d = new Date(iso).getTime();
  const s = Math.max(1, Math.floor((Date.now() - d) / 1000));
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}
