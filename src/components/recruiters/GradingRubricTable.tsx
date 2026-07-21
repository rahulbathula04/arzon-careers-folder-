import { useState } from "react";
import { GRADING_RUBRIC, type GradeBand } from "@/data/gradingRubric";

const BAND_TONE: Record<GradeBand, string> = {
  A: "bg-sky-100 text-sky-900 ring-sky-500/30",
  "B+": "bg-sky-100 text-sky-900 ring-accent-glow/30",
  B: "bg-amber-100 text-amber-900 ring-amber-500/30",
  NA: "bg-slate-100 text-slate-700 ring-slate-400/30",
};

/**
 * Rubric explorer — recruiter picks a track, sees what each grade band
 * means in JD-task terms + recruiter-read for hiring decisions.
 */
export function GradingRubricTable() {
  const [slug, setSlug] = useState(GRADING_RUBRIC[0].slug);
  const active = GRADING_RUBRIC.find((r) => r.slug === slug) ?? GRADING_RUBRIC[0];

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        {GRADING_RUBRIC.map((r) => (
          <button
            key={r.slug}
            type="button"
            onClick={() => setSlug(r.slug)}
            aria-pressed={r.slug === slug}
            className={`rounded-full px-3.5 py-1.5 text-meta font-semibold transition ${
              r.slug === slug
                ? "bg-[color:var(--teal-deep)] text-white"
                : "bg-[color:var(--teal-soft)]/40 text-[color:var(--teal-deep)] hover:bg-[color:var(--teal-soft)]/70"
            }`}
          >
            {r.title}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-ink/10 bg-[color:var(--teal-soft)]/20 p-4">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]">
          JD role calibrated against
        </p>
        <p className="mt-1 font-grotesk text-body-sm font-bold text-ink">{active.jdRole}</p>
        <p className="mt-3 font-mono text-micro font-semibold uppercase tracking-[0.2em] text-slate-500">
          Graded deliverables
        </p>
        <ul className="mt-1 list-disc pl-5 text-caption leading-relaxed text-slate-700">
          {active.gradedDeliverables.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left text-caption">
          <thead>
            <tr className="text-micro font-semibold uppercase tracking-[0.16em] text-slate-500">
              <th className="border-b border-ink/10 px-3 py-2">Band</th>
              <th className="border-b border-ink/10 px-3 py-2">Cutoff</th>
              <th className="border-b border-ink/10 px-3 py-2">What they can do (JD-task terms)</th>
              <th className="border-b border-ink/10 px-3 py-2">Recruiter read</th>
            </tr>
          </thead>
          <tbody>
            {active.rows.map((row) => (
              <tr key={row.band} className="align-top">
                <td className="border-b border-ink/5 px-3 py-3">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-micro font-bold ring-1 ${BAND_TONE[row.band]}`}
                  >
                    {row.band}
                  </span>
                </td>
                <td className="border-b border-ink/5 px-3 py-3 font-mono text-meta text-slate-700">
                  {row.cutoff}
                </td>
                <td className="border-b border-ink/5 px-3 py-3 text-slate-800">{row.jdOutcome}</td>
                <td className="border-b border-ink/5 px-3 py-3 text-slate-700">
                  {row.recruiterRead}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-micro leading-relaxed text-slate-500">
        Bands are performance-based, not participation-based. A student who does not clear the
        production accuracy bar does not receive a certificate — they are not on the recruiter list
        at all.
      </p>
    </div>
  );
}
