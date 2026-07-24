import { ArrowRight, CheckCircle2, Scale } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { getPathFacts } from "@/data/careerPathEvidence";
import { familyForPathSlug, eligibilityFitForCourse } from "@/data/careerFamilies";

/**
 * Primary-fit hero card — the only large block above the fold.
 *
 * Replaces the old "Top match" PathBlock head with a recruiter-facing
 * summary: career name + JD overlap + eligibility chip + circular fit %.
 */
export function PrimaryFit({
  result,
  slug,
  onSeeLadder,
}: {
  result: CareerEngineResult;
  slug: string;
  onSeeLadder?: () => void;
}) {
  const path = PATHS[slug];
  const facts = getPathFacts(slug);
  if (!path) return null;

  const fit = result.evidence?.scoring?.topPathFits?.find((p) => p.slug === slug)?.fit ?? 0;
  const family = familyForPathSlug(slug);
  const eligibility = family ? eligibilityFitForCourse(family, result.profile?.course) : null;

  // JD overlap from the trait drivers we already record per path.
  const drivers = (result.evidence?.pathDrivers?.[slug] ?? result.evidence?.topDrivers ?? []).slice(
    0,
    4,
  );
  const matched = drivers.length;
  const total = 6;
  const jdCount = facts?.evidence?.jdCount ?? 0;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.025] to-transparent p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-sky-300/85">
            Primary fit{family ? ` · ${family.name}` : ""}
          </p>
          <h2 className="mt-1.5 font-grotesk text-h2 font-extrabold tracking-tight text-white sm:text-h1">
            {path.title}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/75 sm:text-base">{path.blurb}</p>

          {eligibility && eligibility.tier !== "unknown" && (
            <div
              className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-micro uppercase tracking-[0.18em] ${
                eligibility.tier === "required"
                  ? "border-sky-400/35 bg-sky-400/10 text-sky-200"
                  : eligibility.tier === "preferred"
                    ? "border-accent-glow/35 bg-accent-glow/10 text-eyebrow-strong"
                    : "border-rose-400/35 bg-rose-400/10 text-rose-200"
              }`}
            >
              <Scale className="h-3 w-3" /> Eligibility · {eligibility.note}
            </div>
          )}
        </div>

        <FitRing percent={fit} />
      </div>

      {/* JD overlap meter */}
      {jdCount > 0 && (
        <div className="mt-6 rounded-2xl glass-panel-deep px-4 py-3.5">
          <div className="flex items-center justify-between gap-3 font-mono text-micro uppercase tracking-[0.22em] text-white/55">
            <span>JD keyword overlap</span>
            <span className="text-white/80 tabular-nums">
              {matched}/{total}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-sky-400/80"
              style={{ width: `${Math.round((matched / total) * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-white/55">
            Matched against <span className="text-white/80">{jdCount}</span> live Indian JDs posted{" "}
            {facts?.evidence?.windowStart} – {facts?.evidence?.windowEnd}.
          </p>
        </div>
      )}

      {/* Why-this-fits, compact 3 bullets */}
      {drivers.length > 0 && (
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {drivers.slice(0, 4).map((d, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2 text-sm text-white/85"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
              <span>
                <span className="text-white">{d.chosenLabel}</span>
                <span className="text-white/55">
                  {" "}
                  — signals {d.traitImpacts[0]?.trait ?? "fit"}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {onSeeLadder && (
        <button
          type="button"
          onClick={onSeeLadder}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-eyebrow hover:underline"
        >
          See day-in-life, ladder &amp; salary <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </section>
  );
}

function FitRing({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const r = 44;
  const c = 2 * Math.PI * r;
  const offset = c - (clamped / 100) * c;
  return (
    <div className="relative h-28 w-28 shrink-0 self-center sm:self-start">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#fitGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="fitGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7FB0D8" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-grotesk text-h2 font-extrabold tabular-nums text-white">
          {clamped}
        </span>
        <span className="font-mono text-micro uppercase tracking-[0.18em] text-white/55">fit</span>
      </div>
    </div>
  );
}

export default PrimaryFit;
