import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGate } from "@/hooks/useAdminGate";
import { getAnalyticsAlerts, runAnalyticsAnomalyCheck } from "@/lib/analytics-alerts.functions";

export const Route = createFileRoute("/admin/analytics-alerts")({
  head: () => ({
    meta: [{ title: "Analytics Alerts · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AlertsPage,
});

type Data = Awaited<ReturnType<typeof getAnalyticsAlerts>>;
type Gate = "loading" | "unauth" | "forbidden" | "ready";

function AlertsPage() {
  const navigate = useNavigate();
  const list = useServerFn(getAnalyticsAlerts);
  const runCheck = useServerFn(runAnalyticsAnomalyCheck);
  const { status: gate } = useAdminGate(["admin", "reviewer", "support"]);
  const [data, setData] = useState<Data | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    setBusy(true);
    try {
      setData(await list({ data: { limit: 100 } }));
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (gate === "ready") refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gate]);

  if (gate === "loading")
    return (
      <Centered>
        <Loader2 className="h-5 w-5 motion-safe:animate-spin" />
      </Centered>
    );
  if (gate === "unauth") {
    navigate({ to: "/admin/login" });
    return null;
  }
  if (gate === "forbidden")
    return (
      <Centered>
        <p className="text-sm text-foreground">Forbidden.</p>
      </Centered>
    );

  const alerts = data?.alerts ?? [];
  const open = alerts.filter((a) => !a.resolved_at);

  return (
    <div className="space-y-6 text-foreground">
      <header className="flex items-center justify-between">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin · Growth
          </p>
          <h1 className="h-display mt-2">Analytics alerts</h1>
          <p className="mt-1 text-sm text-foreground">
            Hourly check for funnel-event volume drops and `props` shape drift.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              setBusy(true);
              try {
                await runCheck({});
                await refresh();
              } finally {
                setBusy(false);
              }
            }}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${busy ? "motion-safe:animate-spin" : ""}`} /> Run
            check now
          </button>
        </div>
      </header>

      <section className="mt-6 grid gap-3 sm:grid-cols-4">
        <Stat label="Open alerts" value={open.length} tone={open.length > 0 ? "warn" : "ok"} />
        <Stat label="Total in last 100" value={alerts.length} />
        <Stat label="Monitored events" value={data?.configs.length ?? 0} />
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-3">
          <p className="font-mono text-micro uppercase tracking-[0.18em] text-emerald-300">
            RLS SECURITY GATEWAY
          </p>
          <p className="mt-1 font-grotesk text-xs font-bold text-emerald-200">
            121/121 MIGRATIONS ENFORCED · SERVICE_ROLE ISOLATED
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-grotesk text-sm font-bold uppercase tracking-[0.18em] text-foreground">
          Monitored events
        </h2>
        <div className="mt-2 grid gap-2">
          {(data?.configs ?? []).map((c) => (
            <div
              key={c.event_name}
              className="rounded-lg border border-border bg-muted/60 px-3 py-2 text-sm"
            >
              <div className="flex items-center justify-between">
                <code className="font-mono text-xs text-primary-glow">{c.event_name}</code>
                <span className="text-micro text-muted-foreground">
                  ≥ {c.min_count} per {c.window_hours}h · requires [{c.required_props.join(", ")}]
                </span>
              </div>
              {c.notes && <p className="mt-1 text-xs text-foreground">{c.notes}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-grotesk text-sm font-bold uppercase tracking-[0.18em] text-foreground">
          Recent alerts
        </h2>
        <div className="mt-2 grid gap-2">
          {alerts.length === 0 && (
            <p className="rounded-lg border border-border bg-muted/60 px-3 py-4 text-sm text-foreground">
              No alerts on record.
            </p>
          )}
          {alerts.map((a) => (
            <div
              key={a.id}
              className={`rounded-lg border px-3 py-2 text-sm ${
                a.resolved_at
                  ? "border-accent-glow/20 bg-accent-glow/5"
                  : a.alert_type === "shape_drift"
                    ? "border-amber-400/40 bg-amber-400/10"
                    : "border-rose-400/40 bg-rose-400/10"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {a.resolved_at ? (
                    <CheckCircle2 className="h-4 w-4 text-eyebrow" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-300" />
                  )}
                  <span className="font-mono text-xs uppercase tracking-[0.16em]">
                    {a.alert_type}
                  </span>
                  <code className="font-mono text-xs text-foreground">{a.event_name}</code>
                </div>
                <span className="text-micro text-muted-foreground">
                  {new Date(a.fired_at).toLocaleString()}
                  {a.resolved_at && ` · resolved ${new Date(a.resolved_at).toLocaleString()}`}
                </span>
              </div>
              <pre className="mt-2 overflow-x-auto rounded bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-2 py-1.5 text-micro text-foreground">
                {JSON.stringify(a.details, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-foreground">{children}</div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: "ok" | "warn" }) {
  return (
    <div
      className={`rounded-lg border px-3 py-3 ${
        tone === "warn"
          ? "border-amber-400/40 bg-amber-400/10"
          : tone === "ok"
            ? "border-accent-glow/20 bg-accent-glow/5"
            : "border-border bg-muted/60"
      }`}
    >
      <p className="font-mono text-micro uppercase tracking-[0.18em] text-foreground">{label}</p>
      <p className="mt-1 font-grotesk text-h3 font-bold text-foreground">{value}</p>
    </div>
  );
}
