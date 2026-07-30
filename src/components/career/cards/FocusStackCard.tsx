import { Wrench, Briefcase, Layers } from "lucide-react";
import { ROLES } from "@/data/industry/roles";

interface Props {
  /** Recommended track slug - must match a ROLES[].slug or roles.arzonCourseSlug. */
  slug: string;
  /** Human-readable track title (e.g. "Pharmacovigilance"). Used in copy. */
  trackTitle: string;
}

/**
 * "Focus stack" - translates the recommended track into the *exact*
 * tools/skills and job titles the candidate should target. Pulls from the
 * same `ROLES` industry dataset that powers the /industry pages, so the
 * skill stack and job titles are JD-derived, not made up at result time.
 */
export function FocusStackCard({ slug, trackTitle }: Props) {
  const role = ROLES.find((r) => r.slug === slug || r.arzonCourseSlug === slug);
  if (!role) return null;

  const skills = role.skills.slice(0, 8);
  const titles = role.hiringRoles.slice(0, 6);

  return (
    <section
      aria-labelledby="focus-stack-heading"
      className="tone-light mt-6 overflow-hidden rounded-3xl bg-white text-slate-900 ring-1 ring-slate-200 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.4)]"
    >
      {/* Header band */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-primary/5 via-white to-primary/5 px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wide text-primary">
            <Layers className="h-3.5 w-3.5" /> Focus stack · {trackTitle}
          </p>
          <h3
            id="focus-stack-heading"
            className="mt-1.5 font-grotesk text-body font-extrabold leading-snug text-slate-900 sm:text-body-lg"
          >
            The exact skills to build and roles to target
          </h3>
        </div>
      </div>

      <div className="grid gap-0 sm:grid-cols-2 sm:divide-x sm:divide-slate-100">
        {/* Skills to build */}
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-primary" />
            <p className="text-micro font-bold uppercase tracking-wide text-primary">
              Skills &amp; tools to build
            </p>
          </div>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <li
                key={s}
                className="rounded-full bg-primary/[0.07] px-3 py-1.5 font-grotesk text-meta font-semibold text-slate-800 ring-1 ring-primary/15"
              >
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-meta leading-relaxed text-slate-600">
            JD-derived from active {role.name} openings. The 12-week cohort builds the first{" "}
            {Math.min(skills.length, 5)} with simulations and mentor reviews.
          </p>
        </div>

        {/* Roles to target */}
        <div className="border-t border-slate-100 px-5 py-5 sm:border-t-0 sm:px-6">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-accent-sky-deep" />
            <p className="text-micro font-bold uppercase tracking-wide text-accent-sky-deep">
              Roles to target after the cohort
            </p>
          </div>
          <ul className="mt-3 grid gap-1.5">
            {titles.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2 text-caption leading-snug text-slate-800"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-sky-deep/70"
                />
                <span className="font-grotesk font-semibold">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-meta leading-relaxed text-slate-600">
            Entry-level bands hire freshers with the stack above. Senior titles unlock in{" "}
            {role.ladder[1]?.yrs ?? "Y2"}–{role.ladder[2]?.yrs ?? "Y5"}.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-meta text-slate-600 sm:px-6">
        Source: live JDs (Naukri + LinkedIn) and the {role.name} industry brief, refreshed{" "}
        {role.asOf}.
      </div>
    </section>
  );
}
