import { Link } from "@tanstack/react-router";
import { BookOpen, Trophy, Zap, ArrowRight, CheckCircle2, Users } from "lucide-react";
import { deriveEvidenceTags } from "./primitives";

interface Props {
  slug: string;
  title: string;
  why: string;
  fit?: number;
  onSelect?: () => void;
}

/**
 * Flagship card - Coursera/Duolingo flavour. Bright surface on the dark page,
 * chunky rounded corners, a "Best match" ribbon, big circular fit ring,
 * skill chips, and a prominent pill CTA.
 */
export function FlagshipTrackCard({ slug, title, why, fit, onSelect }: Props) {
  const tags = deriveEvidenceTags(why);
  const pct = typeof fit === "number" ? Math.max(0, Math.min(100, fit)) : null;
  const ringSize = 76;
  const stroke = 8;
  const r = (ringSize - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = pct != null ? (pct / 100) * circ : 0;

  return (
    <article className="tone-light relative overflow-hidden rounded-3xl bg-white text-slate-900 shadow-[0_20px_50px_-25px_rgba(37,99,235,0.55)] ring-1 ring-slate-200">
      {/* Top color band */}
      <div className="relative h-2 bg-gradient-to-r from-primary via-primary-glow to-accent-sky-deep" />

      {/* Best-match ribbon */}
      <div className="absolute right-4 top-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-micro font-bold uppercase tracking-wide text-white shadow-md">
        <Trophy className="h-3 w-3" /> Best match
      </div>

      <div className="px-5 pt-6 pb-5 sm:px-6">
        <div className="flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-primary">
          <BookOpen className="h-3.5 w-3.5" />
          Recommended track
        </div>

        <div className="mt-3 flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-grotesk text-h4 font-extrabold leading-tight text-slate-900 sm:text-h3">
              {title}
            </h3>
            <p className="mt-2 text-caption leading-relaxed text-slate-600">{why}</p>
          </div>

          {pct != null && (
            <div className="relative shrink-0" style={{ width: ringSize, height: ringSize }}>
              <svg width={ringSize} height={ringSize} className="-rotate-90">
                <circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={r}
                  stroke="rgb(226 232 240)"
                  strokeWidth={stroke}
                  fill="none"
                />
                <circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={r}
                  stroke="url(#flagGrad)"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${dash} ${circ}`}
                />
                <defs>
                  <linearGradient id="flagGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.21 263)" />
                    <stop offset="100%" stopColor="oklch(0.78 0.13 175)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                <span className="font-grotesk text-body-lg font-extrabold tabular-nums text-slate-900">
                  {pct}%
                </span>
                <span className="mt-0.5 text-micro font-semibold uppercase tracking-wide text-slate-500">
                  fit
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Meta row */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-3 text-center">
          <div>
            <p className="text-micro font-semibold uppercase tracking-wide text-slate-500">
              Length
            </p>
            <p className="mt-0.5 font-grotesk text-caption font-bold text-slate-900">12 weeks</p>
          </div>
          <div className="border-x border-slate-200">
            <p className="text-micro font-semibold uppercase tracking-wide text-slate-500">Level</p>
            <p className="mt-0.5 font-grotesk text-caption font-bold text-slate-900">Beginner</p>
          </div>
          <div>
            <p className="text-micro font-semibold uppercase tracking-wide text-slate-500">
              Cohort
            </p>
            <p className="mt-0.5 inline-flex items-center justify-center gap-1 font-grotesk text-caption font-bold text-slate-900">
              <Users className="h-3 w-3 text-primary" /> Live
            </p>
          </div>
        </div>

        {/* Skill chips */}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                data-testid="flagship-role-chip"
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-micro font-semibold text-primary"
              >
                <CheckCircle2 className="h-3 w-3" /> {t}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          to="/courses/$slug"
          params={{ slug }}
          onClick={onSelect}
          className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] transition-all hover:bg-primary-deep active:translate-y-px"
        >
          <Zap className="h-4 w-4" />
          Start learning
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </Link>
      </div>
    </article>
  );
}
