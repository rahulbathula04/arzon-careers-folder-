import { CheckCircle2, Circle, Target } from "lucide-react";

interface Gap {
  id: string;
  label: string;
  score: number;
}

interface Props {
  gaps: Gap[];
  trackTitle: string;
}

/**
 * "What the cohort closes" — Canvas/Coursera module-list vibe. White card,
 * each gap is a checklist row with a per-skill progress bar and a "current →
 * target" delta. Done items get a filled check; pending items get an open
 * circle.
 */
export function GapMapCard({ gaps, trackTitle }: Props) {
  if (!gaps.length) return null;
  const target = 80;

  return (
    <section className="tone-light mt-6 overflow-hidden rounded-3xl bg-white text-slate-900 ring-1 ring-slate-200 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.4)]">
      {/* Header band */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-primary/5 via-white to-accent-sky-deep/5 px-5 py-4 sm:px-6">
        <div>
          <p className="inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wide text-primary">
            <Target className="h-3.5 w-3.5" /> Skill map · {trackTitle}
          </p>
          <h3 className="mt-1.5 font-grotesk text-body font-extrabold leading-snug text-slate-900 sm:text-body-lg">
            What the 12-week cohort builds for you
          </h3>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <p className="text-micro font-semibold uppercase tracking-wide text-slate-500">Target</p>
          <p className="font-grotesk text-body-lg font-extrabold tabular-nums text-slate-900">
            {target}
            <span className="text-meta text-slate-400">/100</span>
          </p>
        </div>
      </div>

      <ol className="divide-y divide-slate-100">
        {gaps.map((g, i) => {
          const cur = Math.max(0, Math.min(100, g.score));
          const done = cur >= target;
          return (
            <li key={g.id} className="flex items-center gap-3 px-5 py-3.5 sm:px-6">
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-micro font-bold ${
                  done
                    ? "bg-accent-sky-deep/15 text-accent-sky-deep"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {done ? <CheckCircle2 className="h-4 w-4" /> : <span>{i + 1}</span>}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate font-grotesk text-body-sm font-bold text-slate-900">
                    {g.label}
                  </p>
                  <p className="shrink-0 font-mono text-micro tabular-nums text-slate-500">
                    <span className="font-bold text-slate-900">{cur}</span>
                    <span className="mx-1 text-slate-300">→</span>
                    <span className="text-primary">{target}</span>
                  </p>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none ${
                      done ? "bg-accent-sky-deep" : "bg-primary"
                    }`}
                    style={{ width: `${cur}%` }}
                  />
                  {/* target tick */}
                  <div className="relative -mt-1.5 h-1.5 w-full">
                    <span
                      className="absolute top-0 h-1.5 w-px bg-slate-400/60"
                      style={{ left: `${target}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {!done && <Circle className="hidden h-4 w-4 shrink-0 text-slate-300 sm:block" />}
            </li>
          );
        })}
      </ol>

      <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-meta text-slate-600 sm:px-6">
        Each skill is built in weekly modules with hands-on simulations and mentor reviews.
      </div>
    </section>
  );
}
