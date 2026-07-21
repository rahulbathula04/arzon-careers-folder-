import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { useAdminGate } from "@/hooks/useAdminGate";
import { getDomainGridMetrics } from "@/lib/metrics.functions";

export const Route = createFileRoute("/admin/metrics-domain-grid")({
  head: () => ({
    meta: [
      { title: "Domain-grid removal · Metrics" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: MetricsPage,
});

type Data = Awaited<ReturnType<typeof getDomainGridMetrics>>;

function pct(n: number): string {
  if (!Number.isFinite(n)) return "–";
  return (n * 100).toFixed(1) + "%";
}
function delta(after: number, before: number): string {
  if (!before) return after ? "+∞" : "0";
  const d = (after - before) / before;
  const sign = d >= 0 ? "+" : "";
  return sign + (d * 100).toFixed(1) + "%";
}

function MetricsPage() {
  const fn = useServerFn(getDomainGridMetrics);
  const { status } = useAdminGate(["admin", "reviewer", "support"]);
  // Default cutover = today at 00:00 UTC; admin can rewind.
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [cutover, setCutover] = useState(today);
  const [windowDays, setWindowDays] = useState(14);
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== "ready") return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const cutoverISO = new Date(cutover + "T00:00:00Z").toISOString();
        const r = await fn({
          data: { cutoverISO, windowDays, experiment: "sticky_cta_placement" },
        });
        if (!cancelled) setData(r);
      } catch (e) {
        console.error(e);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [fn, status, cutover, windowDays]);

  if (status === "loading") return <Centered>Checking access…</Centered>;
  if (status === "unauth") return <Centered>Please sign in.</Centered>;
  if (status === "forbidden") return <Centered>Forbidden.</Centered>;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-foreground">
      <header className="mb-6">
        <h1 className="text-h3 font-semibold">Domain-grid removal — before/after</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Equal-length windows around the cutover. Compares apply CTA rate, funnel conversion, and
          home engagement signals; bottom panel breaks down the live sticky-CTA A/B by variant.
        </p>
        <nav className="mt-3 flex flex-wrap gap-3 text-xs">
          <a
            href="/admin/experiments/sticky-cta"
            className="rounded border border-border px-2 py-1 hover:bg-muted"
          >
            Sticky CTA · live A/B results →
          </a>
          <a
            href="/admin/qa/content-rebalance"
            className="rounded border border-border px-2 py-1 hover:bg-muted"
          >
            70/20/10 content QA checklist →
          </a>
        </nav>
      </header>

      <div className="mb-6 flex flex-wrap items-end gap-3 text-sm">
        <label className="flex flex-col">
          <span className="text-xs text-muted-foreground">Cutover (UTC)</span>
          <input
            type="date"
            value={cutover}
            onChange={(e) => setCutover(e.target.value)}
            className="mt-1 rounded-md border border-border bg-[#0A0F1E] px-2 py-1.5"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-xs text-muted-foreground">Window (days each side)</span>
          <input
            type="number"
            min={1}
            max={90}
            value={windowDays}
            onChange={(e) => setWindowDays(Number(e.target.value) || 14)}
            className="mt-1 w-24 rounded-md border border-border bg-[#0A0F1E] px-2 py-1.5"
          />
        </label>
        {loading && (
          <Loader2 className="ml-2 h-4 w-4 motion-safe:animate-spin text-muted-foreground" />
        )}
      </div>

      {data && (
        <>
          <table className="w-full table-fixed border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="border-b border-border py-2">Metric</th>
                <th className="border-b border-border py-2">Before</th>
                <th className="border-b border-border py-2">After</th>
                <th className="border-b border-border py-2">Δ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <Row label="Unique visitors" b={data.before.visitors} a={data.after.visitors} />
              <Row
                label="Apply CTA clicks (events)"
                b={data.before.ctaClicks}
                a={data.after.ctaClicks}
              />
              <Row
                label="Apply CTA clickers (unique)"
                b={data.before.ctaClickers}
                a={data.after.ctaClickers}
              />
              <Row
                label="CTA click rate (clickers / visitors)"
                b={data.before.ctaClickRate}
                a={data.after.ctaClickRate}
                format="pct"
              />
              <Row label="Apply submitters" b={data.before.submitters} a={data.after.submitters} />
              <Row
                label="CTA → submit conversion"
                b={data.before.ctaToSubmitRate}
                a={data.after.ctaToSubmitRate}
                format="pct"
              />
              <Row
                label="Legacy #domains rescue hits"
                b={data.before.domainGridHits}
                a={data.after.domainGridHits}
              />
              <Row
                label="Home dwell ≥60s w/o CTA"
                b={data.before.dwellNoCta}
                a={data.after.dwellNoCta}
              />
              <Row
                label="Home find-in-page triggers"
                b={data.before.searchKeypress}
                a={data.after.searchKeypress}
              />
            </tbody>
          </table>

          <section className="mt-10">
            <h2 className="text-lg font-semibold">Sticky-CTA A/B (post-cutover)</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Variants assigned in <code>src/lib/abTest.ts</code>. Visitors are unique anon_ids that
              received an assignment.
            </p>
            <table className="mt-3 w-full table-fixed border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="border-b border-border py-2">Variant</th>
                  <th className="border-b border-border py-2">Visitors</th>
                  <th className="border-b border-border py-2">CTA clickers</th>
                  <th className="border-b border-border py-2">Click rate</th>
                  <th className="border-b border-border py-2">Submitters</th>
                  <th className="border-b border-border py-2">Submit rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {Object.entries(data.experiment.variants).map(([name, v]) => (
                  <tr key={name}>
                    <td className="py-2 font-mono text-xs">{name}</td>
                    <td className="py-2">{v.visitors}</td>
                    <td className="py-2">{v.ctaClickers}</td>
                    <td className="py-2">{pct(v.visitors ? v.ctaClickers / v.visitors : 0)}</td>
                    <td className="py-2">{v.submitters}</td>
                    <td className="py-2">{pct(v.visitors ? v.submitters / v.visitors : 0)}</td>
                  </tr>
                ))}
                {Object.keys(data.experiment.variants).length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-3 text-muted-foreground">
                      No assignments yet in this window.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </>
      )}
    </main>
  );

  function Row({ label, b, a, format }: { label: string; b: number; a: number; format?: "pct" }) {
    const fmt = (n: number) => (format === "pct" ? pct(n) : String(n));
    return (
      <tr>
        <td className="py-2 text-foreground">{label}</td>
        <td className="py-2 font-mono">{fmt(b)}</td>
        <td className="py-2 font-mono">{fmt(a)}</td>
        <td className={"py-2 font-mono " + (a >= b ? "text-sky-300" : "text-rose-300")}>
          {delta(a, b)}
        </td>
      </tr>
    );
  }
}

function Centered({ children }: { children: React.ReactNode }) {
  return <main className="grid min-h-app place-items-center px-6 text-foreground">{children}</main>;
}
