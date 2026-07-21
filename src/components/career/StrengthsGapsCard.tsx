import { CheckCircle2, AlertCircle, ArrowUpRight, Sparkles } from "lucide-react";
import { ACRI_DIMENSIONS, type AcriDimensionId } from "@/components/landing/constants";
import type { AcriProfile } from "@/lib/acri";
import { ResultCard } from "@/components/career/cards/primitives";

/** How to close each ACRI gap, written for a fresher in plain language. */
const CLOSE_GAP: Record<AcriDimensionId, string> = {
  operational:
    "Run a 30-day micro-project: track 20 cases / charts / tickets in a spreadsheet, hit a daily quota, log accuracy.",
  communication:
    "Record one 3-min Loom every week explaining a workflow to a non-expert. Watch it back, cut filler, re-record.",
  documentation:
    "Write one long-form note per week (incident report, SOP draft, narrative). Get a senior to red-pen it.",
  workflow:
    "Pick one tool the role uses (Argus / Rave / Salesforce / Tableau) and complete its free certification track.",
  domain:
    "Read one industry primer cover-to-cover (ICH-GCP / CDISC / NASSCOM sector report) and summarise it in 1 page.",
};

interface Props {
  profile: AcriProfile;
  trackTitle: string;
}

export function StrengthsGapsCard({ profile, trackTitle }: Props) {
  const ranked = ACRI_DIMENSIONS.map(({ id, label }) => ({
    id,
    label,
    score: profile[id],
  })).sort((a, b) => b.score - a.score);

  const strengths = ranked.slice(0, 3);
  const gaps = ranked.slice(-2).reverse();

  return (
    <ResultCard
      tone="emerald"
      icon={<Sparkles className="h-3.5 w-3.5" />}
      eyebrow="Strengths & gaps"
      title="What you lead with — and what the cohort closes"
    >
      <p className="text-caption text-slate-600">
        Specific to your answers. The {trackTitle} cohort closes the gaps in 12 weeks — here's the
        self-study version if you want to start now.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* Strengths */}
        <div className="rounded-2xl bg-accent-sky-deep/[0.05] p-4 ring-1 ring-accent-sky-deep/15">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-accent-sky-deep" />
            <p className="text-micro font-bold uppercase tracking-wide text-accent-sky-deep">
              3 strengths to lead with
            </p>
          </div>
          <ul className="mt-3 grid gap-2.5">
            {strengths.map((s) => (
              <li key={s.id} className="flex items-start justify-between gap-3">
                <span className="font-grotesk text-caption font-bold text-slate-900">
                  {s.label}
                </span>
                <span className="font-mono text-micro font-bold tabular-nums text-accent-sky-deep">
                  {s.score}/100
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-micro text-slate-600">
            Frame these explicitly in your resume bullets and interview opening.
          </p>
        </div>

        {/* Gaps */}
        <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <p className="text-micro font-bold uppercase tracking-wide text-amber-700">
              2 gaps to close
            </p>
          </div>
          <ul className="mt-3 grid gap-3">
            {gaps.map((g) => (
              <li key={g.id} className="text-caption text-slate-700">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-grotesk text-caption font-bold text-slate-900">
                    {g.label}
                  </span>
                  <span className="font-mono text-micro font-bold tabular-nums text-amber-700">
                    {g.score}/100
                  </span>
                </div>
                <p className="mt-1.5 flex items-start gap-1.5 text-meta leading-relaxed text-slate-600">
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 flex-none text-amber-600" />
                  <span>{CLOSE_GAP[g.id]}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ResultCard>
  );
}
