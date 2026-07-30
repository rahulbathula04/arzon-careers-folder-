import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { useAdminGate } from "@/hooks/useAdminGate";
import { getCareerEngineFunnel } from "@/lib/analytics.functions";

export const Route = createFileRoute("/admin/funnel-ce")({
  head: () => ({
    meta: [
      { title: "Career Engine funnel · Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CEFunnelPage,
});

type Data = Awaited<ReturnType<typeof getCareerEngineFunnel>>;

const STEP_LABEL: Record<string, string> = {
  ce_test_viewed: "Test viewed",
  ce_lead_form_viewed: "Lead form viewed",
  lead_submitted: "Lead submitted",
  payment_started: "Payment started",
  payment_success: "Payment success",
};

const FAILURE_LABEL: Record<string, string> = {
  lead_form_validation_error: "Lead form validation errors",
  test_timeout: "Test timeouts (>30 min)",
  payment_failed: "Payment failed (client)",
  razorpay_verify_failed: "Razorpay verify failed (server)",
};

function fmtPct(n: number | null): string {
  if (n === null || !Number.isFinite(n)) return "-";
  return `${(n * 100).toFixed(1)}%`;
}

function CEFunnelPage() {
  const navigate = useNavigate();
  const fn = useServerFn(getCareerEngineFunnel);
  const { status: gate } = useAdminGate(["admin", "reviewer", "support"]);
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const d = await fn({ data: { fromDays: days } });
        if (!cancelled) setData(d);
      } catch (e) {
        console.error("[ce-funnel]", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
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

  const top = data?.steps[0]?.users ?? 0;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin · Analytics
          </p>
          <h1 className="h-display mt-2">Career Engine funnel</h1>
          <p className="mt-1 text-sm text-foreground">
            Test → Lead form → Lead submit → Payment start → Payment success, plus failure events
            and UTM split.
          </p>
        </div>
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
      </header>

      {loading && <p className="text-sm text-foreground">Loading data…</p>}

      {data && (
        <>
          <div className="rounded-2xl border border-border bg-muted/60 p-5">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
                End-to-end conversion
              </p>
              <p className="font-display text-h3 text-primary-glow">{fmtPct(data.overall_cvr)}</p>
            </div>
            <p className="mt-1 text-micro text-muted-foreground">
              {top} users entered · {data.steps[data.steps.length - 1]?.users ?? 0} paid
            </p>

            <ol className="mt-5 space-y-4">
              {data.steps.map((s, i) => {
                const pct = top > 0 ? Math.round((s.users / top) * 100) : 0;
                const exits = data.exit_counts[s.step] ?? 0;
                return (
                  <li key={s.step}>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-foreground">
                        <span className="mr-2 font-mono text-micro text-muted-foreground">
                          {i + 1}.
                        </span>
                        {STEP_LABEL[s.step] ?? s.step}
                      </span>
                      <span className="font-display text-base text-foreground tabular-nums">
                        {s.users}
                        <span className="ml-1 text-micro font-normal text-muted-foreground">
                          users
                        </span>
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary-glow"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-micro text-muted-foreground">
                      <span>{pct}% of step 1</span>
                      <span>
                        {s.drop_rate !== null && (
                          <span className={(s.drop_rate ?? 0) > 0.5 ? "text-amber-300" : ""}>
                            −{fmtPct(s.drop_rate)} vs prev · {s.drop_users ?? 0} lost
                          </span>
                        )}
                        {exits > 0 && <span className="ml-3">{exits} ended here</span>}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-muted/60 p-5">
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
                Failure events
              </p>
              <p className="mt-1 text-micro text-muted-foreground">
                Use to debug drop-offs. Recent {days}d.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {Object.entries(data.failures).map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between">
                    <span className="text-foreground">{FAILURE_LABEL[k] ?? k}</span>
                    <span
                      className={`font-display tabular-nums ${v > 0 ? "text-rose-300" : "text-foreground"}`}
                    >
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-muted/60 p-5">
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
                Top UTM sources
              </p>
              <p className="mt-1 text-micro text-muted-foreground">
                Reached test → paid, by attribution source.
              </p>
              <table className="mt-3 w-full text-left text-xs">
                <thead className="text-micro uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="py-1">Source</th>
                    <th className="py-1 text-right">Reached</th>
                    <th className="py-1 text-right">Paid</th>
                    <th className="py-1 text-right">CVR</th>
                  </tr>
                </thead>
                <tbody>
                  {data.utm.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-3 text-center text-foreground">
                        No UTM activity yet.
                      </td>
                    </tr>
                  )}
                  {data.utm.map((u) => (
                    <tr key={u.source} className="border-t border-border/60">
                      <td className="py-1.5 font-mono text-foreground">{u.source}</td>
                      <td className="py-1.5 text-right tabular-nums text-foreground">
                        {u.reached}
                      </td>
                      <td className="py-1.5 text-right tabular-nums text-foreground">{u.paid}</td>
                      <td className="py-1.5 text-right tabular-nums text-foreground">
                        {fmtPct(u.cvr)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
