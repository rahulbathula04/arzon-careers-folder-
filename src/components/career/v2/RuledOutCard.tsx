import { XCircle, ArrowRight } from "lucide-react";
import { FAMILIES, type CareerFamily, eligibilityFitForCourse } from "@/data/careerFamilies";

/**
 * Shows families the student's degree blocks, with the WHY explanation
 * and 1–2 bridges ("what to do instead"). Never a dead end.
 */
export function RuledOutCard({ course }: { course: string | undefined }) {
  if (!course) return null;
  const blocked: CareerFamily[] = Object.values(FAMILIES).filter(
    (f) => eligibilityFitForCourse(f, course).tier === "blocker",
  );
  if (blocked.length === 0) return null;

  return (
    <section className="rounded-3xl border border-rose-400/25 bg-rose-500/[0.04] p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <XCircle className="h-5 w-5 text-rose-400" />
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-rose-300/90">
          Ruled out by your degree - and what to do instead
        </p>
      </div>
      <p className="mt-2 text-sm text-white/75">
        With <span className="font-bold text-white">{course}</span>, these healthcare families
        typically aren't accessible at entry level today. We're being honest about that - but you
        have bridges.
      </p>

      <div className="mt-4 space-y-4">
        {blocked.map((fam) => (
          <div key={fam.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="font-grotesk text-base font-extrabold text-white">{fam.name}</p>
            <p className="mt-1 text-sm text-white/70">
              {fam.blockerExplain ?? `${course} is not the typical entry path into ${fam.name}.`}
            </p>
            {fam.bridges && fam.bridges.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="font-mono text-micro uppercase tracking-[0.18em] text-white/55">
                  What to do instead
                </p>
                <ul className="space-y-2">
                  {fam.bridges.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2 text-sm text-white/80"
                    >
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                      <span>
                        <span className="font-bold text-white">{b.label}.</span> {b.why}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs italic text-white/45">
        "Blocked today" is not "blocked forever". The bridges above are the routes our counsellors
        recommend most often for students in your shoes.
      </p>
    </section>
  );
}
