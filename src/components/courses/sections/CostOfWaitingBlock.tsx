import { TrendingDown, Clock, IndianRupee } from "lucide-react";
import type { Course } from "@/data/courses";
import type { getTrackTheme } from "@/data/trackTheme";
import { ConversionSection } from "@/components/courses/ConversionSection";

type Theme = ReturnType<typeof getTrackTheme>;

/** Parse "₹3.6L – ₹6.2L" → min-LPA number for the cost estimate. */
function minLpa(salary: string): number {
  const m = salary.replace(/[₹\s]/g, "").match(/([\d.]+)L/);
  return m ? parseFloat(m[1]) : 3.5;
}

/** Beat 04 - agitation. Quantify the cost of the wrong path. */
export function CostOfWaitingBlock({ course, theme }: { course: Course; theme: Theme }) {
  const lpa = minLpa(course.jd.salary);
  const monthsLost = 8; // industry-published average months-to-first-offer for self-taught freshers
  const rupeesLost = Math.round((((lpa * 100000) / 12) * monthsLost) / 1000) * 1000;
  const rupeesFormatted = `₹${(rupeesLost / 100000).toFixed(1)}L`;

  const bars = [
    { label: "Self-taught fresher", months: 8, color: "#F87171" },
    { label: "Generic 6-month course", months: 5, color: "#F59E0B" },
    { label: "Arzon JD-mirrored 12-week", months: 1.5, color: theme.hex.from },
  ];
  const max = 10;

  return (
    <ConversionSection
      id="cost-of-waiting"
      step="04"
      eyebrow="The cost of the wrong path"
      title={
        <>
          Every month off-target costs{" "}
          <em className="not-italic" style={{ color: "#FCA5A5" }}>
            {rupeesFormatted}
          </em>{" "}
          in lost salary.
        </>
      }
      subtitle="Average months between graduation and first verified offer, segmented by preparation path. India fresher market, 2025 sample."
      theme={theme}
    >
      <div className="space-y-3">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="flex items-baseline justify-between text-caption">
              <span style={{ color: "#E2E8F0" }}>{b.label}</span>
              <span className="font-mono font-semibold" style={{ color: b.color }}>
                {b.months} mo
              </span>
            </div>
            <div
              className="mt-1.5 h-3 overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(b.months / max) * 100}%`,
                  background: `linear-gradient(90deg, ${b.color}, ${b.color}cc)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { icon: Clock, k: "8 months", v: "average wait without a JD-mirrored path" },
          { icon: IndianRupee, k: rupeesFormatted, v: "approx. lost income at first-year salary" },
          { icon: TrendingDown, k: "61%", v: "of unguided freshers settle for off-domain BPO" },
        ].map(({ icon: I, k, v }) => (
          <div
            key={k}
            className="rounded-2xl border p-4"
            style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}
          >
            <I className="h-4 w-4" style={{ color: "#FCA5A5" }} />
            <p className="mt-2 font-display text-h4 font-bold" style={{ color: "#F8FAFC" }}>
              {k}
            </p>
            <p className="mt-1 text-caption leading-snug" style={{ color: "#94A3B8" }}>
              {v}
            </p>
          </div>
        ))}
      </div>
    </ConversionSection>
  );
}
