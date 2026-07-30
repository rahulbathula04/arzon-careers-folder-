import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { UserCheck, UserX, Users, Filter } from "lucide-react";

/**
 * "Who we said no to" stat block. Selectivity reads as trust - most edtechs
 * brag about volume; we brag about who didn't make it in. Animated count-up
 * triggers when the section enters the viewport.
 */
type Row = {
  icon: typeof UserCheck;
  value: number;
  suffix?: string;
  label: string;
  sub: string;
  tone: "navy" | "gold" | "rust" | "teal";
};

const ROWS: Row[] = [
  { icon: Users, value: 1742, label: "Applied", sub: "to the last 3 cohorts", tone: "navy" },
  {
    icon: Filter,
    value: 1018,
    label: "Cleared the fit-test",
    sub: "ACRI score ≥ 62",
    tone: "teal",
  },
  { icon: UserCheck, value: 624, label: "Enrolled", sub: "we accepted", tone: "gold" },
  { icon: UserX, value: 394, label: "Turned away", sub: "we declined", tone: "rust" },
];

const TONES: Record<Row["tone"], { accent: string; halo: string; bar: string }> = {
  navy: { accent: "from-[#3B82F6] to-[#1E40AF]", halo: "rgba(59,130,246,0.10)", bar: "#3b6fa0" },
  teal: { accent: "from-[#14B8A6] to-[#0E7490]", halo: "rgba(20,184,166,0.10)", bar: "#0d7a5f" },
  gold: { accent: "from-[#F59E0B] to-[#B45309]", halo: "rgba(245,158,11,0.14)", bar: "#c9a84c" },
  rust: { accent: "from-[#F97316] to-[#9A3412]", halo: "rgba(249,115,22,0.12)", bar: "#c2654a" },
};

function useCountUp(target: number, run: boolean, durationMs = 1100) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, durationMs]);
  return n;
}

export function CounterProof() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), obs.disconnect()),
      { threshold: 0.25 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const acceptanceRate = Math.round((624 / 1742) * 100);

  return (
    <Section size="lg">
      <SectionHeader
        eyebrow="Selectivity, not volume"
        title={
          <>
            We turn away <em className="italic-accent not-italic">~ {100 - acceptanceRate}%</em> of
            applicants. On purpose.
          </>
        }
        sub={
          <>
            Cohorts cap at 60 seats. We accept{" "}
            <strong className="font-semibold text-ink">{acceptanceRate} out of every 100</strong>{" "}
            who apply because mentor attention does not scale, and weak fits hurt the cohort.
          </>
        }
      />

      <div ref={ref} className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
        {ROWS.map((r) => (
          <StatCard key={r.label} row={r} run={inView} />
        ))}
      </div>

      {/* Acceptance gauge - visual confirmation of selectivity */}
      <div className="card-light mx-auto mt-8 max-w-4xl rounded-2xl p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-micro uppercase tracking-[0.22em] text-primary">
            Acceptance rate · last 3 cohorts
          </p>
          <p className="font-display text-h3 text-ink">
            {acceptanceRate}
            <span className="text-slate-400">%</span>
          </p>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#B45309] transition-[width] duration-[1200ms] ease-out"
            style={{ width: `${inView ? acceptanceRate : 0}%` }}
          />
        </div>
        <p className="mt-3 text-caption leading-relaxed text-slate-600">
          Compared to industry edtech average of <strong className="text-ink">~92%</strong> (almost
          everyone is accepted). We are deliberately strict, that's why hiring partners trust our
          certificate.
        </p>
      </div>
    </Section>
  );
}

function StatCard({ row, run }: { row: Row; run: boolean }) {
  const tone = TONES[row.tone];
  const n = useCountUp(row.value, run);
  return (
    <div className="card-light rounded-2xl p-5 transition-all hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tone.accent} text-slate-50`}
        >
          <row.icon className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <div>
          <p className="font-display text-h3 font-bold text-ink leading-none">
            {n.toLocaleString()}
            {row.suffix ?? ""}
          </p>
          <p className="mt-0.5 font-mono text-micro uppercase tracking-[0.18em] text-primary">
            {row.label}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{row.sub}</p>
    </div>
  );
}
