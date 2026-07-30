import { Calculator, Info, Target } from "lucide-react";

/**
 * Transparent industry-fit score: the headline composite score plus a
 * category-by-category breakdown showing exactly how it was calculated.
 * Each of the 4 categories contributes 25% to the composite.
 */

const CATEGORY_WEIGHT = 25; // %, equal-weighted across 4 categories

interface CategoryDef {
  key: "aptitude" | "interest" | "background" | "commitment";
  label: string;
  what: string;
  derivedFrom: string;
  bar: string;
  dot: string;
}

const CATEGORIES: CategoryDef[] = [
  {
    key: "aptitude",
    label: "Aptitude",
    what: "Cognitive fit: detail, logic, language and workflow signals plus your mini skill-check.",
    derivedFrom: "Trait scores (detail, logic, language, workflow) + skill-check accuracy",
    bar: "bg-primary",
    dot: "bg-primary",
  },
  {
    key: "interest",
    label: "Interest",
    what: "What you're drawn to: patient-facing, compliance, data, writing and tech preference signals.",
    derivedFrom: "Trait scores from your interest-leaning question choices",
    bar: "bg-accent-sky-deep",
    dot: "bg-accent-sky-deep",
  },
  {
    key: "background",
    label: "Background",
    what: "Course, stream, year and prior exposure - how your starting line maps to the track.",
    derivedFrom: "Course + stream + year + prior-experience answers",
    bar: "bg-amber-500",
    dot: "bg-amber-500",
  },
  {
    key: "commitment",
    label: "Commitment",
    what: "Hours/week you'll invest, willingness to relocate, and salary realism vs market entry bands.",
    derivedFrom: "Hours/week, relocation, salary expectation, timeline answers",
    bar: "bg-fuchsia-500",
    dot: "bg-fuchsia-500",
  },
];

interface Props {
  fitScore: number; // 0-100 composite
  confidence: number; // 0-100
  bandLabel: string; // e.g. "Recommended"
  breakdown: Record<CategoryDef["key"], number>;
  microAccuracy?: number; // 0-100, optional
  signalCount?: number; // answered questions
  topTrackTitle: string;
}

export function IndustryFitScoreCard({
  fitScore,
  confidence,
  bandLabel,
  breakdown,
  microAccuracy = 0,
  signalCount,
  topTrackTitle,
}: Props) {
  const fit = Math.max(0, Math.min(100, Math.round(fitScore)));

  return (
    <section
      aria-labelledby="industry-fit-heading"
      className="tone-light mt-6 overflow-hidden rounded-3xl bg-white text-slate-900 ring-1 ring-slate-200 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)]"
    >
      <div className="border-b border-slate-100 bg-gradient-to-r from-primary/5 via-white to-primary/5 px-5 py-4 sm:px-6">
        <p className="inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wide text-primary">
          <Target className="h-3.5 w-3.5" /> Industry-fit score · transparent breakdown
        </p>
        <h3
          id="industry-fit-heading"
          className="mt-1.5 font-grotesk text-body font-extrabold leading-snug text-slate-900 sm:text-body-lg"
        >
          Your industry-fit score for {topTrackTitle}
        </h3>
      </div>

      <div className="p-5 sm:p-6">
        {/* Headline number + ring */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left">
          <FitRing value={fit} />
          <div className="min-w-0">
            <p className="font-mono text-micro font-bold uppercase tracking-wide text-slate-500">
              Composite fit
            </p>
            <p className="font-grotesk text-h2 font-extrabold leading-none tabular-nums text-slate-900">
              {fit}
              <span className="text-h4 text-slate-400">/100</span>
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-micro font-bold uppercase tracking-wide text-primary ring-1 ring-primary/20">
              {bandLabel}
            </p>
            <p className="mt-2 text-meta text-slate-600">
              Confidence{" "}
              <span className="font-bold text-slate-900 tabular-nums">
                {Math.round(confidence)}%
              </span>
              {typeof signalCount === "number" && signalCount > 0 ? (
                <>
                  {" "}
                  · Built from{" "}
                  <span className="font-bold text-slate-900 tabular-nums">{signalCount}</span>{" "}
                  answers
                </>
              ) : null}
            </p>
          </div>
        </div>

        {/* Formula line */}
        <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
          <p className="inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wide text-slate-700">
            <Calculator className="h-3.5 w-3.5" /> How it's calculated
          </p>
          <p className="mt-1.5 text-meta leading-relaxed text-slate-700">
            Fit ={" "}
            <span className="font-mono font-bold">
              (Aptitude + Interest + Background + Commitment) ÷ 4
            </span>{" "}
            - each category contributes <span className="font-bold tabular-nums">25%</span> to the
            composite.
          </p>
        </div>

        {/* Category breakdown */}
        <ul className="mt-5 grid gap-4">
          {CATEGORIES.map((c) => {
            const score = Math.max(0, Math.min(100, Math.round(breakdown[c.key] ?? 0)));
            const contrib = Math.round((score * CATEGORY_WEIGHT) / 100);
            return (
              <li key={c.key}>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${c.dot}`}
                    aria-hidden="true"
                  />
                  <p className="font-grotesk text-body-sm font-bold text-slate-900">{c.label}</p>
                  <span className="font-mono text-micro font-bold uppercase tracking-wide text-slate-400">
                    weight {CATEGORY_WEIGHT}%
                  </span>
                  <p className="ml-auto font-mono text-meta font-bold tabular-nums text-slate-800">
                    {score}
                    <span className="text-slate-400">/100</span>
                    <span className="ml-2 text-micro font-semibold text-slate-500">
                      = +{contrib} pts
                    </span>
                  </p>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${c.bar} transition-[width] duration-500 motion-reduce:transition-none`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="mt-1.5 text-meta leading-snug text-slate-600">
                  <span className="font-semibold text-slate-700">What it measures:</span> {c.what}
                </p>
                <p className="text-micro leading-snug text-slate-500">
                  <span className="font-semibold">Derived from:</span> {c.derivedFrom}
                </p>
              </li>
            );
          })}
        </ul>

        {microAccuracy > 0 && (
          <p className="mt-5 inline-flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2 text-meta leading-snug text-amber-800 ring-1 ring-amber-200">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Mini skill-check accuracy:{" "}
              <span className="font-bold tabular-nums">{Math.round(microAccuracy)}%</span> - folded
              into your Aptitude score above.
            </span>
          </p>
        )}

        <p className="mt-4 text-micro leading-relaxed text-slate-500">
          Composite score is the average of the four category scores shown above (each capped at
          100). The category scores are deterministic - the same answers always produce the same
          numbers.
        </p>
      </div>
    </section>
  );
}

/** Compact donut for the headline fit score. */
function FitRing({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  const r = 36;
  const c = 2 * Math.PI * r;
  const dash = (v / 100) * c;
  const colour =
    v >= 75
      ? "stroke-sky-500"
      : v >= 60
        ? "stroke-primary"
        : v >= 45
          ? "stroke-amber-500"
          : "stroke-slate-400";
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24 shrink-0 -rotate-90" aria-hidden="true">
      <circle cx="50" cy="50" r={r} className="fill-none stroke-slate-100" strokeWidth="10" />
      <circle
        cx="50"
        cy="50"
        r={r}
        className={`fill-none ${colour} transition-[stroke-dasharray] duration-700 motion-reduce:transition-none`}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
      />
    </svg>
  );
}
