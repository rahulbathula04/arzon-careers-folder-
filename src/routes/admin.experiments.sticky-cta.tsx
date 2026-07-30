import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, AlertTriangle, Check } from "lucide-react";
import { getExperimentResults } from "@/lib/experiment.functions";
import { isReducedMotion } from "@/hooks/useReducedMotion";

export const Route = createFileRoute("/admin/experiments/sticky-cta")({
  head: () => ({
    meta: [{ title: "Sticky CTA · A/B results" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: ExperimentPage,
});

type Data = Awaited<ReturnType<typeof getExperimentResults>>;

const fmtPct = (n: number) => (Number.isFinite(n) ? (n * 100).toFixed(2) + "%" : "–");
const fmtNum = (n: number) => new Intl.NumberFormat("en-IN").format(n);

function ExperimentPage() {
  const fn = useServerFn(getExperimentResults);
  const [data, setData] = useState<Data | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [windowDays, setWindowDays] = useState(14);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fn({ data: { experiment: "sticky_cta_placement", windowDays } });
        if (alive) {
          setData(res);
          setErr(null);
        }
      } catch (e) {
        if (alive) setErr(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (alive) setLoading(false);
      }
    };
    void load();
    const id = isReducedMotion() ? null : setInterval(load, 30_000);
    return () => {
      alive = false;
      if (id) clearInterval(id);
    };
  }, [fn, windowDays]);

  return (
    <div className="space-y-6 p-6 text-foreground">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="h-display">Sticky CTA · A/B results</h1>
          <p className="mt-1 text-sm text-foreground">
            Two-proportion z-test vs control. 95% CI on click-through rate. Auto-refresh every 30s.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          Window
          <select
            value={windowDays}
            onChange={(e) => setWindowDays(Number(e.target.value))}
            className="rounded border border-border bg-transparent px-2 py-1"
          >
            {[1, 3, 7, 14, 30].map((d) => (
              <option key={d} value={d}>
                {d}d
              </option>
            ))}
          </select>
          {loading && <Loader2 className="h-4 w-4 motion-safe:animate-spin opacity-60" />}
        </label>
      </header>

      {err && (
        <div className="rounded border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
          {err}
        </div>
      )}

      {data && (
        <>
          <section className="overflow-x-auto rounded border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Variant</th>
                  <th className="px-3 py-2">Visitors</th>
                  <th className="px-3 py-2">CTA clickers</th>
                  <th className="px-3 py-2">CTR</th>
                  <th className="px-3 py-2">Submitters</th>
                  <th className="px-3 py-2">Submit rate</th>
                  <th className="px-3 py-2">Lift vs control</th>
                  <th className="px-3 py-2">95% CI (Δ CTR)</th>
                  <th className="px-3 py-2">p-value</th>
                  <th className="px-3 py-2">Significant?</th>
                </tr>
              </thead>
              <tbody>
                {data.arms.map((arm) => (
                  <tr key={arm.variant} className="border-t border-border">
                    <td className="px-3 py-2 font-mono">
                      {arm.variant}
                      {arm.isControl && (
                        <span className="ml-2 text-xs text-muted-foreground">control</span>
                      )}
                    </td>
                    <td className="px-3 py-2">{fmtNum(arm.visitors)}</td>
                    <td className="px-3 py-2">{fmtNum(arm.ctaClickers)}</td>
                    <td className="px-3 py-2">{fmtPct(arm.ctr)}</td>
                    <td className="px-3 py-2">{fmtNum(arm.submitters)}</td>
                    <td className="px-3 py-2">{fmtPct(arm.submitRate)}</td>
                    <td className="px-3 py-2">
                      {arm.test
                        ? (arm.test.lift >= 0 ? "+" : "") + (arm.test.lift * 100).toFixed(1) + "%"
                        : "-"}
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {arm.test
                        ? `[${(arm.test.ciLow * 100).toFixed(2)}%, ${(arm.test.ciHigh * 100).toFixed(2)}%]`
                        : "-"}
                    </td>
                    <td className="px-3 py-2">{arm.test ? arm.test.pValue.toFixed(4) : "-"}</td>
                    <td className="px-3 py-2">
                      {arm.test?.significant ? (
                        <span className="inline-flex items-center gap-1 rounded bg-sky-500/20 px-2 py-0.5 text-xs text-sky-200">
                          <Check className="h-3 w-3" /> Yes
                        </span>
                      ) : arm.test ? (
                        <span className="text-xs text-muted-foreground">
                          Need n≥100/arm & p&lt;0.05
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="rounded border border-border p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <AlertTriangle className="h-4 w-4 text-amber-300" />
              Variant drift (mutual exclusion check)
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Sessions that saw more than one variant. Should always be 0 - each session must stay
              on the same arm.
            </p>
            <p className="mt-2 text-h3 font-semibold">{data.drift.totalOffending}</p>
            {data.drift.offendingSessions.length > 0 && (
              <ul className="mt-2 max-h-48 overflow-y-auto text-xs text-foreground">
                {data.drift.offendingSessions.map((s) => (
                  <li key={s.sessionId} className="font-mono">
                    {s.sessionId} → {s.variants.join(", ")}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
