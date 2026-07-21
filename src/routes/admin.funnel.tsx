import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGate } from "@/hooks/useAdminGate";
import {
  getFunnel,
  getRecentEvents,
  getConversionFunnel,
  getExperimentLift,
  getFunnelDropoff,
  getWhatsAppConversion,
  getSsrErrors,
} from "@/lib/analytics.functions";
import { EXPERIMENTS } from "@/lib/abTest";

export const Route = createFileRoute("/admin/funnel")({
  head: () => ({
    meta: [{ title: "Funnel · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: FunnelPage,
});

type Step = { step: string; users: number; events: number };
type Funnel = Awaited<ReturnType<typeof getFunnel>>;
type EventsResp = Awaited<ReturnType<typeof getRecentEvents>>;
type Conv = Awaited<ReturnType<typeof getConversionFunnel>>;
type Lift = Awaited<ReturnType<typeof getExperimentLift>>;
type Dropoff = Awaited<ReturnType<typeof getFunnelDropoff>>;
type WaConv = Awaited<ReturnType<typeof getWhatsAppConversion>>;
type SsrErrs = Awaited<ReturnType<typeof getSsrErrors>>;
type Gate = "loading" | "unauth" | "forbidden" | "ready";

const STEP_LABEL: Record<string, string> = {
  quiz_started: "Quiz started",
  quiz_completed: "Quiz completed",
  lead_submitted: "Lead submitted",
  apply_started: "Apply started",
  apply_programme_selected: "Programme selected",
  apply_profile_completed: "Profile completed",
  apply_submitted: "Application submitted",
  apply_success_viewed: "Success page viewed",
  admin_application_viewed: "Reviewer opened application",
  admin_application_status_changed: "Status changed",
  enrol_intent_created: "Enrol intent created",
  checkout_started: "Checkout started",
  payment_started: "Payment started",
  payment_success: "Payment success",
  apply_cta_click: "Apply CTA clicked",
  page_view: "Page view",
};

function FunnelPage() {
  const navigate = useNavigate();
  const fn = useServerFn(getFunnel);
  const recent = useServerFn(getRecentEvents);
  const conv = useServerFn(getConversionFunnel);
  const lift = useServerFn(getExperimentLift);
  const dropoff = useServerFn(getFunnelDropoff);
  const waConv = useServerFn(getWhatsAppConversion);
  const ssrErrFn = useServerFn(getSsrErrors);
  const { status: gate } = useAdminGate(["admin", "reviewer", "support"]);
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Funnel | null>(null);
  const [events, setEvents] = useState<EventsResp["events"]>([]);
  const [convData, setConvData] = useState<Conv | null>(null);
  const [lifts, setLifts] = useState<Record<string, Lift>>({});
  const [dropoffData, setDropoffData] = useState<Dropoff | null>(null);
  const [waConvData, setWaConvData] = useState<WaConv | null>(null);
  const [ssrErrData, setSsrErrData] = useState<SsrErrs | null>(null);
  const [tab, setTab] = useState<
    "funnel" | "dropoff" | "conversion" | "experiments" | "events" | "ssr"
  >("funnel");
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState<"off" | "connecting" | "on">("off");
  const refetchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const f = await fn({ data: { fromDays: days } });
        if (!cancelled) setData(f);
      } catch {
        /* noop */
      }
      try {
        const e = await recent();
        if (!cancelled) setEvents(e.events);
      } catch {
        /* noop */
      }
      try {
        const c = await conv({ data: { fromDays: days } });
        if (!cancelled) setConvData(c);
      } catch {
        /* noop */
      }
      try {
        const d = await dropoff({ data: { fromDays: days } });
        if (!cancelled) setDropoffData(d);
      } catch {
        /* noop */
      }
      try {
        const w = await waConv({ data: { fromDays: days } });
        if (!cancelled) setWaConvData(w);
      } catch {
        /* noop */
      }
      try {
        const s = await ssrErrFn({ data: { fromDays: Math.min(days, 30) } });
        if (!cancelled) setSsrErrData(s);
      } catch {
        /* noop */
      }
      try {
        const liftEntries = await Promise.all(
          Object.keys(EXPERIMENTS).map(async (exp) => {
            try {
              const l = await lift({ data: { experiment: exp, fromDays: days } });
              return [exp, l] as const;
            } catch {
              return [exp, null] as const;
            }
          }),
        );
        if (!cancelled) {
          const obj: Record<string, Lift> = {};
          for (const [k, v] of liftEntries) if (v) obj[k] = v;
          setLifts(obj);
        }
      } catch {
        /* noop */
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [gate, days, fn, recent, conv, lift, dropoff, waConv, ssrErrFn]);

  // Realtime subscription — refresh funnel + prepend live events as they land.
  useEffect(() => {
    if (gate !== "ready") return;
    setLive("connecting");
    const channel = supabase
      .channel("analytics_events:live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "analytics_events" },
        (payload) => {
          const row = payload.new as EventsResp["events"][number];
          setEvents((prev) => [row, ...prev].slice(0, 200));
          if (refetchTimer.current) clearTimeout(refetchTimer.current);
          refetchTimer.current = setTimeout(async () => {
            try {
              const f = await fn({ data: { fromDays: days } });
              setData(f);
            } catch {
              /* noop */
            }
          }, 1500);
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setLive("on");
        else if (status === "CHANNEL_ERROR" || status === "CLOSED") setLive("off");
      });
    return () => {
      if (refetchTimer.current) clearTimeout(refetchTimer.current);
      supabase.removeChannel(channel);
    };
  }, [gate, days, fn]);

  if (gate === "loading") {
    return (
      <div className="flex items-center gap-2 text-foreground">
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading…
      </div>
    );
  }
  if (gate === "unauth") {
    navigate({ to: "/admin/login" });
    return null;
  }
  if (gate === "forbidden") {
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100">
        No staff role assigned.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin · Analytics
          </p>
          <h1 className="h-display mt-2">Funnel</h1>
          <p className="mt-1 text-sm text-foreground">
            Where users drop off across quiz, apply and admin review.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-micro font-mono uppercase tracking-widest ${
              live === "on"
                ? "border-accent-glow/30 bg-accent-glow/10 text-eyebrow"
                : live === "connecting"
                  ? "border-border bg-muted text-foreground"
                  : "border-amber-400/30 bg-amber-400/5 text-amber-200"
            }`}
            title="Real-time updates"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${live === "on" ? "bg-accent-glow motion-safe:animate-pulse" : live === "connecting" ? "bg-slate-50/40" : "bg-amber-400"}`}
            />
            {live === "on" ? "Live" : live === "connecting" ? "Connecting" : "Offline"}
          </span>
          <Link
            to="/admin/funnel-test"
            className="rounded-lg border border-border bg-muted px-3 py-2 text-xs text-foreground hover:bg-accent"
          >
            QA bench
          </Link>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground"
          >
            <option value={1}>Last 24h</option>
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <div className="flex rounded-lg border border-border bg-muted text-xs">
            <button
              className={`px-3 py-2 ${tab === "funnel" ? "bg-accent text-foreground" : "text-foreground"}`}
              onClick={() => setTab("funnel")}
            >
              Funnel
            </button>
            <button
              className={`px-3 py-2 ${tab === "dropoff" ? "bg-accent text-foreground" : "text-foreground"}`}
              onClick={() => setTab("dropoff")}
            >
              Drop-off
            </button>
            <button
              className={`px-3 py-2 ${tab === "conversion" ? "bg-accent text-foreground" : "text-foreground"}`}
              onClick={() => setTab("conversion")}
            >
              Conversion
            </button>
            <button
              className={`px-3 py-2 ${tab === "experiments" ? "bg-accent text-foreground" : "text-foreground"}`}
              onClick={() => setTab("experiments")}
            >
              Experiments
            </button>
            <button
              className={`px-3 py-2 ${tab === "events" ? "bg-accent text-foreground" : "text-foreground"}`}
              onClick={() => setTab("events")}
            >
              Live events
            </button>
            <button
              className={`px-3 py-2 ${tab === "ssr" ? "bg-accent text-foreground" : "text-foreground"}`}
              onClick={() => setTab("ssr")}
            >
              SSR errors{ssrErrData && ssrErrData.total > 0 ? ` (${ssrErrData.total})` : ""}
            </button>
          </div>
        </div>
      </header>

      {loading && <p className="text-sm text-foreground">Loading data…</p>}

      {tab === "funnel" && data && (
        <>
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            <FunnelCard title="Career-engine quiz" steps={data.quiz} />
            <FunnelCard title="Apply flow" steps={data.apply} />
            <FunnelCard title="Payment flow" steps={data.payment} />
            <FunnelCard title="Admin review" steps={data.admin} />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <WhatsAppCard data={data.whatsapp} />
            <PaymentOutcomeCard data={data.payment_outcomes} />
          </div>
        </>
      )}

      {tab === "conversion" && convData && <ConversionTab data={convData} wa={waConvData} />}

      {tab === "dropoff" && dropoffData && <DropoffTab data={dropoffData} />}

      {tab === "experiments" && (
        <div className="space-y-6">
          {Object.keys(EXPERIMENTS).map((exp) => {
            const l = lifts[exp];
            if (!l)
              return (
                <div
                  key={exp}
                  className="rounded-2xl border border-border bg-muted/60 p-5 text-sm text-foreground"
                >
                  <p className="font-mono text-micro uppercase tracking-[0.22em] text-foreground">
                    {exp}
                  </p>
                  <p className="mt-2">No assignments recorded yet for this window.</p>
                </div>
              );
            return <ExperimentCard key={exp} lift={l} />;
          })}
        </div>
      )}

      {tab === "events" && (
        <div className="rounded-2xl border border-border overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-micro uppercase tracking-widest text-foreground">
              <tr>
                <th className="px-3 py-2">When</th>
                <th className="px-3 py-2">Event</th>
                <th className="px-3 py-2">Path</th>
                <th className="px-3 py-2">Programme</th>
                <th className="px-3 py-2">UTM</th>
                <th className="px-3 py-2">Anon</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-t border-border/60">
                  <td className="px-3 py-2 text-foreground">
                    {new Date(e.created_at).toLocaleTimeString()}
                  </td>
                  <td className="px-3 py-2 font-mono text-foreground">{e.event_name}</td>
                  <td className="px-3 py-2 text-foreground">{e.path ?? "—"}</td>
                  <td className="px-3 py-2 text-foreground">{e.program_slug ?? "—"}</td>
                  <td className="px-3 py-2 text-foreground">{e.utm_source ?? "—"}</td>
                  <td className="px-3 py-2 text-micro text-muted-foreground">
                    {e.anon_id?.slice(0, 8) ?? "—"}
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-foreground">
                    No events yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "ssr" && <SsrErrorsTab data={ssrErrData} loading={loading} />}
    </div>
  );
}

function FunnelCard({ title, steps }: { title: string; steps: Step[] }) {
  const top = steps[0]?.users ?? 0;
  const overall = useMemo(() => {
    if (!steps.length || !steps[0].users) return 0;
    const last = steps[steps.length - 1].users;
    return Math.round((last / steps[0].users) * 100);
  }, [steps]);
  return (
    <div className="rounded-2xl border border-border bg-muted/60 p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
          {title}
        </p>
        <p className="font-display text-h4 text-primary-glow">{overall}%</p>
      </div>
      <ol className="mt-4 space-y-3">
        {steps.map((s, i) => {
          const pct = top ? Math.round((s.users / top) * 100) : 0;
          const prev = i > 0 ? steps[i - 1].users : null;
          const drop =
            prev !== null && prev > 0
              ? Math.max(0, Math.round(((prev - s.users) / prev) * 100))
              : null;
          return (
            <li key={s.step}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-foreground">{STEP_LABEL[s.step] ?? s.step}</span>
                <span className="font-display text-base text-foreground tabular-nums">
                  {s.users}
                  <span className="ml-1 text-micro font-normal text-muted-foreground">users</span>
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary-glow" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-1 flex items-center justify-between text-micro text-muted-foreground">
                <span>{pct}% of step 1</span>
                {drop !== null && (
                  <span className={drop > 50 ? "text-amber-300" : ""}>−{drop}% from previous</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function WhatsAppCard({ data }: { data: Funnel["whatsapp"] }) {
  const entries = Object.entries(data.by_source).sort((a, b) => b[1] - a[1]);
  const max = entries[0]?.[1] ?? 0;
  return (
    <div className="rounded-2xl border border-border bg-muted/60 p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
          WhatsApp clicks
        </p>
        <p className="font-display text-h4 text-sky-300">{data.total_clicks}</p>
      </div>
      <p className="mt-1 text-micro text-muted-foreground">{data.unique_users} unique users</p>
      <ol className="mt-4 space-y-2">
        {entries.length === 0 && (
          <li className="text-sm text-foreground">No WhatsApp clicks yet.</li>
        )}
        {entries.map(([src, n]) => {
          const pct = max ? Math.round((n / max) * 100) : 0;
          return (
            <li key={src}>
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-mono text-foreground">{src}</span>
                <span className="font-display text-foreground tabular-nums">{n}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-sky-400/80" style={{ width: `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function PaymentOutcomeCard({ data }: { data: Funnel["payment_outcomes"] }) {
  const total = data.success + data.failure;
  const successPct = total ? Math.round((data.success / total) * 100) : 0;
  return (
    <div className="rounded-2xl border border-border bg-muted/60 p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
          Payment outcomes
        </p>
        <p className="font-display text-h4 text-primary-glow">{successPct}%</p>
      </div>
      <p className="mt-1 text-micro text-muted-foreground">{total} attempts · success rate</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-sky-400/20 bg-sky-400/[0.05] p-4">
          <p className="font-mono text-micro uppercase tracking-widest text-sky-300">Success</p>
          <p className="mt-1 font-display text-h3 text-foreground tabular-nums">{data.success}</p>
        </div>
        <div className="rounded-xl border border-rose-400/20 bg-rose-400/[0.05] p-4">
          <p className="font-mono text-micro uppercase tracking-widest text-rose-300">
            Failure / cancelled
          </p>
          <p className="mt-1 font-display text-h3 text-foreground tabular-nums">{data.failure}</p>
        </div>
      </div>
    </div>
  );
}

function ConversionTab({ data, wa }: { data: Conv; wa: WaConv | null }) {
  const steps = data.steps;
  const top = steps[0]?.users ?? 0;
  const maxSpark = Math.max(1, ...data.sparkline);
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-muted/60 p-5">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
          End-to-end conversion (unique users)
        </p>
        <table className="mt-4 w-full text-left text-sm">
          <thead className="text-micro uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="py-2">Step</th>
              <th className="py-2 text-right">Users</th>
              <th className="py-2 text-right">% of top</th>
              <th className="py-2 text-right">Drop from prev</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((s, i) => {
              const pct = top ? Math.round((s.users / top) * 100) : 0;
              const prev = i > 0 ? steps[i - 1].users : null;
              const drop =
                prev !== null && prev > 0
                  ? Math.max(0, Math.round(((prev - s.users) / prev) * 100))
                  : null;
              return (
                <tr key={s.step} className="border-t border-border/60">
                  <td className="py-2 text-foreground">{STEP_LABEL[s.step] ?? s.step}</td>
                  <td className="py-2 text-right font-display text-foreground tabular-nums">
                    {s.users}
                  </td>
                  <td className="py-2 text-right text-foreground tabular-nums">{pct}%</td>
                  <td
                    className={`py-2 text-right tabular-nums ${drop !== null && drop > 50 ? "text-amber-300" : "text-foreground"}`}
                  >
                    {drop === null ? "—" : `−${drop}%`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-sky-400/20 bg-sky-400/[0.05] p-5">
          <p className="font-mono text-micro uppercase tracking-widest text-sky-300">
            WhatsApp clicks
          </p>
          <p className="mt-1 font-display text-h3 text-foreground tabular-nums">
            {data.whatsapp_total}
          </p>
        </div>
        <div className="rounded-2xl border border-accent-glow/20 bg-accent-glow/[0.05] p-5">
          <p className="font-mono text-micro uppercase tracking-widest text-eyebrow">
            /apply WhatsApp handoffs
          </p>
          <p className="mt-1 font-display text-h3 text-foreground tabular-nums">
            {data.whatsapp_handoff}
          </p>
        </div>
        <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.05] p-5">
          <p className="font-mono text-micro uppercase tracking-widest text-rose-300">
            Payment failures
          </p>
          <p className="mt-1 font-display text-h3 text-foreground tabular-nums">
            {data.payment_failed}
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-muted/60 p-5">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
          Payments · last 14 days
        </p>
        <div className="mt-3 flex h-20 items-end gap-1">
          {data.sparkline.map((n, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-primary-glow/70"
              style={{ height: `${Math.round((n / maxSpark) * 100)}%`, minHeight: n ? 4 : 1 }}
              title={`${n} payments`}
            />
          ))}
        </div>
      </div>
      {wa && <WhatsAppConversionCard wa={wa} />}
    </div>
  );
}

function WhatsAppConversionCard({ wa }: { wa: WaConv }) {
  return (
    <div className="rounded-2xl border border-sky-400/20 bg-sky-400/[0.04] p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-sky-300">
          WhatsApp → Payment
        </p>
        <p className="font-display text-h4 text-foreground tabular-nums">
          {(wa.cvr * 100).toFixed(1)}%
        </p>
      </div>
      <p className="mt-1 text-micro text-foreground">
        {wa.unique_clickers} unique clickers · {wa.message_created} likely sent ·{" "}
        {wa.paid_within_7d} paid within 7 days
      </p>
      <table className="mt-4 w-full text-left text-xs">
        <thead className="text-micro uppercase tracking-widest text-muted-foreground">
          <tr>
            <th className="py-2">Source</th>
            <th className="py-2 text-right">Clicks</th>
            <th className="py-2 text-right">Clickers</th>
            <th className="py-2 text-right">Msg sent (proxy)</th>
            <th className="py-2 text-right">Paid</th>
            <th className="py-2 text-right">CVR</th>
          </tr>
        </thead>
        <tbody>
          {wa.by_source.slice(0, 10).map((s) => (
            <tr key={s.source} className="border-t border-border/60">
              <td className="py-2 font-mono text-foreground">{s.source}</td>
              <td className="py-2 text-right tabular-nums text-foreground">{s.clicks}</td>
              <td className="py-2 text-right tabular-nums text-foreground">{s.clickers}</td>
              <td className="py-2 text-right tabular-nums text-foreground">{s.message_created}</td>
              <td className="py-2 text-right tabular-nums text-foreground">{s.paid}</td>
              <td className="py-2 text-right tabular-nums text-sky-200">
                {(s.cvr * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
          {wa.by_source.length === 0 && (
            <tr>
              <td colSpan={6} className="py-4 text-center text-muted-foreground">
                No WhatsApp clicks yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function DropoffTab({ data }: { data: Dropoff }) {
  const top = data.funnel[0]?.users ?? 0;
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-muted/60 p-5">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
          End-to-end drop-off · career-engine → apply → payment
        </p>
        <p className="mt-1 text-micro text-muted-foreground">
          Unique users per step. Red rows lose &gt;50% to the next step. Median time is
          event-to-event for users who completed.
        </p>
        <ol className="mt-4 space-y-3">
          {data.funnel.map((s) => {
            const widthPct = top ? Math.max(2, Math.round((s.users / top) * 100)) : 0;
            const dropPct = s.drop_rate != null ? Math.round(s.drop_rate * 100) : null;
            const isBad = dropPct != null && dropPct > 50;
            return (
              <li key={s.step}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-foreground">{STEP_LABEL[s.step] ?? s.step}</span>
                  <span className="font-display text-base text-foreground tabular-nums">
                    {s.users}
                    <span className="ml-1 text-micro font-normal text-muted-foreground">users</span>
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${isBad ? "bg-rose-400/80" : "bg-primary-glow"}`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-x-3 text-micro text-muted-foreground">
                  <span>{widthPct}% of step 1</span>
                  {dropPct != null ? (
                    <span className={isBad ? "text-rose-300" : "text-foreground"}>
                      −{dropPct}% drop · {s.drop_users} users
                      {s.median_to_next_ms != null
                        ? ` · median ${formatDuration(s.median_to_next_ms)}`
                        : ""}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">final step</span>
                  )}
                </div>
                {s.top_exits.length > 0 ? (
                  <details className="mt-1.5 rounded-lg border border-border/60 bg-muted/40 px-3 py-2">
                    <summary className="cursor-pointer text-micro uppercase tracking-widest text-muted-foreground">
                      Top exit pages ({s.top_exits.length})
                    </summary>
                    <ul className="mt-2 space-y-1 text-micro text-foreground">
                      {s.top_exits.map((e) => (
                        <li key={e.path} className="flex items-baseline justify-between gap-3">
                          <span className="truncate font-mono">{e.path}</span>
                          <span className="tabular-nums text-muted-foreground">{e.count}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function formatDuration(ms: number): string {
  if (ms < 60_000) return `${Math.round(ms / 1000)}s`;
  if (ms < 60 * 60_000) return `${Math.round(ms / 60_000)}m`;
  return `${(ms / (60 * 60_000)).toFixed(1)}h`;
}

function ExperimentCard({ lift }: { lift: Lift }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/60 p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
          {lift.experiment}
        </p>
        <p className="text-micro text-muted-foreground">
          since {new Date(lift.since).toLocaleDateString()}
        </p>
      </div>
      <table className="mt-4 w-full text-left text-sm">
        <thead className="text-micro uppercase tracking-widest text-muted-foreground">
          <tr>
            <th className="py-2">Variant</th>
            <th className="py-2 text-right">Assignments</th>
            <th className="py-2 text-right">CTA clicks</th>
            <th className="py-2 text-right">Submitted</th>
            <th className="py-2 text-right">Paid</th>
            <th className="py-2 text-right">CVR</th>
            <th className="py-2 text-right">Lift vs control</th>
          </tr>
        </thead>
        <tbody>
          {lift.variants.map((v) => (
            <tr key={v.variant} className="border-t border-border/60">
              <td className="py-2 font-mono text-foreground">{v.variant}</td>
              <td className="py-2 text-right tabular-nums text-foreground">{v.assignments}</td>
              <td className="py-2 text-right tabular-nums text-foreground">{v.cta_clicks}</td>
              <td className="py-2 text-right tabular-nums text-foreground">{v.submitted}</td>
              <td className="py-2 text-right tabular-nums text-foreground">{v.paid}</td>
              <td className="py-2 text-right tabular-nums text-foreground">
                {(v.cvr * 100).toFixed(1)}%
              </td>
              <td
                className={`py-2 text-right tabular-nums ${
                  v.lift_vs_control === null
                    ? "text-muted-foreground"
                    : v.lift_vs_control >= 0
                      ? "text-sky-300"
                      : "text-rose-300"
                }`}
              >
                {v.lift_vs_control === null
                  ? "—"
                  : `${v.lift_vs_control >= 0 ? "+" : ""}${(v.lift_vs_control * 100).toFixed(1)}%`}
              </td>
            </tr>
          ))}
          {lift.variants.length === 0 && (
            <tr>
              <td colSpan={7} className="py-4 text-center text-muted-foreground">
                No assignments recorded.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const KIND_LABEL: Record<string, { label: string; tone: string }> = {
  hydration_invariant: {
    label: "Hydration invariant",
    tone: "bg-rose-500/15 text-rose-200 ring-rose-400/30",
  },
  missing_dehydration: {
    label: "Missing dehydration",
    tone: "bg-rose-500/15 text-rose-200 ring-rose-400/30",
  },
  seroval_serialization: {
    label: "Loader serialization",
    tone: "bg-amber-500/15 text-amber-200 ring-amber-400/30",
  },
  hydration_mismatch: {
    label: "Hydration mismatch",
    tone: "bg-amber-500/15 text-amber-200 ring-amber-400/30",
  },
  unknown: { label: "Unknown", tone: "bg-accent text-foreground ring-border" },
};

function SsrErrorsTab({ data, loading }: { data: SsrErrs | null; loading: boolean }) {
  if (loading && !data) {
    return <p className="text-sm text-foreground">Loading SSR error data…</p>;
  }
  if (!data) return null;
  const max24h = Math.max(1, ...data.sparkline24h.map((b) => b.count));
  const last24h = data.sparkline24h.reduce((acc, b) => acc + b.count, 0);
  const alertLevel: "ok" | "warn" | "crit" = last24h === 0 ? "ok" : last24h < 10 ? "warn" : "crit";
  const alertCopy =
    alertLevel === "ok"
      ? "All clear — no SSR hydration errors in the last 24h."
      : alertLevel === "warn"
        ? `${last24h} SSR error${last24h === 1 ? "" : "s"} in the last 24h — investigate.`
        : `Critical: ${last24h} SSR errors in the last 24h. Pages are blanking for users.`;
  const alertTone =
    alertLevel === "ok"
      ? "border-sky-400/30 bg-sky-400/5 text-sky-200"
      : alertLevel === "warn"
        ? "border-amber-400/30 bg-amber-400/5 text-amber-200"
        : "border-rose-400/40 bg-rose-500/10 text-rose-200";
  return (
    <div className="space-y-6">
      <div className={`rounded-2xl border p-5 ${alertTone}`}>
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em]">SSR alert</p>
        <p className="mt-2 text-sm font-semibold">{alertCopy}</p>
        <div className="mt-4 flex items-end gap-1">
          {data.sparkline24h.map((b) => {
            const h = Math.max(2, Math.round((b.count / max24h) * 48));
            return (
              <div
                key={b.hour}
                title={`${new Date(b.hour).toLocaleString()} · ${b.count}`}
                className="w-1.5 rounded-sm bg-current/40"
                style={{ height: `${h}px`, opacity: b.count === 0 ? 0.25 : 1 }}
              />
            );
          })}
        </div>
        <p className="mt-2 text-micro text-current/70">
          Last 24 hours · bucketed per hour · total events {data.total} over{" "}
          {Math.round((Date.now() - Date.parse(data.since)) / 86_400_000)}d
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/60 p-5">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
            Affected routes
          </p>
          <p className="text-xs text-muted-foreground">
            {data.groups.length} unique (path × kind) groups
          </p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-micro uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-2 py-2">Path</th>
                <th className="px-2 py-2">Class</th>
                <th className="px-2 py-2 text-right">Events</th>
                <th className="px-2 py-2 text-right">Users</th>
                <th className="px-2 py-2">Last seen</th>
                <th className="px-2 py-2">Sample message</th>
              </tr>
            </thead>
            <tbody>
              {data.groups.map((g) => {
                const k = KIND_LABEL[g.kind] ?? KIND_LABEL.unknown;
                return (
                  <tr key={`${g.path}-${g.kind}`} className="border-t border-border/60 align-top">
                    <td className="px-2 py-2 font-mono text-foreground/90">
                      {g.path}
                      {g.slug && <span className="ml-1 text-muted-foreground">· {g.slug}</span>}
                    </td>
                    <td className="px-2 py-2">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 font-mono text-micro font-semibold ring-1 ${k.tone}`}
                      >
                        {k.label}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-right font-display text-sm text-foreground tabular-nums">
                      {g.total}
                    </td>
                    <td className="px-2 py-2 text-right tabular-nums text-foreground">
                      {g.unique_users}
                    </td>
                    <td className="px-2 py-2 text-muted-foreground">
                      {new Date(g.last_seen).toLocaleString()}
                    </td>
                    <td
                      className="px-2 py-2 max-w-[28ch] truncate text-foreground"
                      title={g.sample_message}
                    >
                      {g.sample_message || "—"}
                    </td>
                  </tr>
                );
              })}
              {data.groups.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-2 py-8 text-center text-foreground">
                    No SSR hydration errors recorded in this window. 🎉
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {data.recent.length > 0 && (
        <details className="rounded-2xl border border-border bg-muted/60 p-5">
          <summary className="cursor-pointer font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
            Recent raw events ({data.recent.length})
          </summary>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-micro">
              <thead className="text-micro uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-2 py-1.5">When</th>
                  <th className="px-2 py-1.5">Path</th>
                  <th className="px-2 py-1.5">Kind</th>
                  <th className="px-2 py-1.5">Source</th>
                  <th className="px-2 py-1.5">Message</th>
                </tr>
              </thead>
              <tbody>
                {data.recent.map((r) => (
                  <tr key={r.id} className="border-t border-border/60">
                    <td className="px-2 py-1.5 text-muted-foreground">
                      {new Date(r.at).toLocaleString()}
                    </td>
                    <td className="px-2 py-1.5 font-mono text-foreground">{r.path ?? "—"}</td>
                    <td className="px-2 py-1.5 text-foreground">
                      {(KIND_LABEL[r.kind] ?? KIND_LABEL.unknown).label}
                    </td>
                    <td className="px-2 py-1.5 text-foreground">{r.source}</td>
                    <td
                      className="px-2 py-1.5 text-foreground max-w-[40ch] truncate"
                      title={r.message}
                    >
                      {r.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </div>
  );
}
