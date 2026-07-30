import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, AlertTriangle, Check } from "lucide-react";
import { getCurriculumExperimentResults } from "@/lib/curriculumExperiments.functions";
import { TRACK_THEME, type TrackSlug } from "@/data/trackTheme";
import { isReducedMotion } from "@/hooks/useReducedMotion";

export const Route = createFileRoute("/admin/experiments")({
  head: () => ({
    meta: [
      { title: "Curriculum experiments · A/B results" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ExperimentsPage,
});

type Data = Awaited<ReturnType<typeof getCurriculumExperimentResults>>;

const fmtPct = (n: number) => (Number.isFinite(n) ? (n * 100).toFixed(2) + "%" : "–");
const fmtNum = (n: number) => new Intl.NumberFormat("en-IN").format(n);

const FUNNEL: Array<{ key: string; label: string }> = [
  { key: "exposure", label: "Exposure" },
  { key: "cta_click", label: "CTA click" },
  { key: "form_open", label: "Form open" },
  { key: "form_submit", label: "Form submit" },
  { key: "whatsapp_click", label: "WhatsApp" },
  { key: "razorpay_open", label: "Razorpay open" },
  { key: "razorpay_success", label: "Razorpay success" },
  { key: "enrolment_paid", label: "Paid" },
];

function ExperimentsPage() {
  const fn = useServerFn(getCurriculumExperimentResults);
  const [data, setData] = useState<Data | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [windowDays, setWindowDays] = useState(14);
  const [slug, setSlug] = useState<string>("");

  const slugs = useMemo(() => Object.keys(TRACK_THEME) as TrackSlug[], []);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fn({
          data: {
            experiments: ["curriculum_layout_v1", "cta_timing_v1"],
            windowDays,
            courseSlug: slug || undefined,
          },
        });
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
    const id = setInterval(load, isReducedMotion() ? 300_000 : 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [fn, windowDays, slug]);

  return (
    <div className="space-y-8 p-6 text-foreground">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h-display">Curriculum experiments</h1>
          <p className="mt-1 text-sm text-foreground">
            Hero CTA → form submit → WhatsApp → Razorpay → paid registration, split by variant.
            Refreshes every 60s.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <label className="flex items-center gap-2">
            Course
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="rounded border border-border bg-transparent px-2 py-1"
            >
              <option value="">All</option>
              {slugs.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            Window
            <select
              value={windowDays}
              onChange={(e) => setWindowDays(Number(e.target.value))}
              className="rounded border border-border bg-transparent px-2 py-1"
            >
              {[1, 3, 7, 14, 30, 60].map((d) => (
                <option key={d} value={d}>
                  {d}d
                </option>
              ))}
            </select>
          </label>
          {loading && <Loader2 className="h-4 w-4 motion-safe:animate-spin opacity-60" />}
        </div>
      </header>

      {err && (
        <div className="rounded border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
          <AlertTriangle className="mr-2 inline h-4 w-4" />
          {err}
        </div>
      )}

      {data?.experiments.map((exp) => (
        <section key={exp.experiment} className="rounded-xl border border-border bg-muted/40">
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="font-display text-lg font-bold">{exp.experiment}</h2>
            <p className="text-xs text-muted-foreground">
              {exp.arms.length} arm{exp.arms.length === 1 ? "" : "s"}
            </p>
          </header>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Variant</th>
                  {FUNNEL.map((s) => (
                    <th key={s.key} className="px-3 py-2 text-right">
                      {s.label}
                    </th>
                  ))}
                  <th className="px-3 py-2 text-right">Conv.</th>
                  <th className="px-3 py-2 text-right">Lift</th>
                  <th className="px-3 py-2 text-right">p</th>
                  <th className="px-3 py-2 text-right">Sig?</th>
                </tr>
              </thead>
              <tbody>
                {exp.arms.map((a) => (
                  <tr key={a.variant} className="border-t border-border">
                    <td className="px-3 py-2 font-mono">
                      {a.variant}
                      {a.isControl && (
                        <span className="ml-2 text-xs text-muted-foreground">control</span>
                      )}
                    </td>
                    {FUNNEL.map((s) => (
                      <td key={s.key} className="px-3 py-2 text-right tabular-nums">
                        {fmtNum((a.counts as Record<string, number>)[s.key] ?? 0)}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right tabular-nums">{fmtPct(a.conversion)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {a.test
                        ? (a.test.lift >= 0 ? "+" : "") + (a.test.lift * 100).toFixed(1) + "%"
                        : "-"}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {a.test ? a.test.p.toFixed(4) : "-"}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {a.test?.sig ? (
                        <span className="inline-flex items-center gap-1 rounded bg-sky-500/20 px-2 py-0.5 text-xs text-sky-200">
                          <Check className="h-3 w-3" /> Yes
                        </span>
                      ) : a.test ? (
                        <span className="text-xs text-muted-foreground">n≥100/arm, p&lt;0.05</span>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-border px-4 py-3">
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Daily - exposures vs paid
            </p>
            <Sparkline series={exp.series} />
          </div>
        </section>
      ))}
    </div>
  );
}

function Sparkline({ series }: { series: { date: string; exposure: number; paid: number }[] }) {
  const w = 720;
  const h = 80;
  const maxE = Math.max(1, ...series.map((d) => d.exposure));
  const maxP = Math.max(1, ...series.map((d) => d.paid));
  const stepX = series.length > 1 ? w / (series.length - 1) : 0;
  const ePath = series
    .map(
      (d, i) =>
        `${i ? "L" : "M"}${(i * stepX).toFixed(1)},${(h - (d.exposure / maxE) * h).toFixed(1)}`,
    )
    .join(" ");
  const pPath = series
    .map(
      (d, i) => `${i ? "L" : "M"}${(i * stepX).toFixed(1)},${(h - (d.paid / maxP) * h).toFixed(1)}`,
    )
    .join(" ");
  return (
    <div className="mt-2">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-20 w-full">
        <path d={ePath} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />
        <path d={pPath} fill="none" stroke="#10B981" strokeWidth={1.5} />
      </svg>
      <div className="mt-1 flex items-center gap-4 text-micro text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-px w-3 bg-slate-50/60" /> exposures (max {maxE})
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-px w-3 bg-sky-400" /> paid (max {maxP})
        </span>
      </div>
    </div>
  );
}
