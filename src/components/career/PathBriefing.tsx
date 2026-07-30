import { Building2, ClipboardCheck, Compass, Briefcase } from "lucide-react";
import { getPathBriefing } from "@/data/careerPaths";
import { ResultCard, Chip } from "@/components/career/cards/primitives";

interface Props {
  slug: string;
  trackTitle: string;
}

/**
 * Phase-3 briefing block - Indian role variants, employer requirements,
 * companies grouped by tier, and a first-90-days plan. Coursera-style
 * white card module, with sub-blocks for each section.
 */
export function PathBriefing({ slug, trackTitle }: Props) {
  const data = getPathBriefing(slug);
  if (!data) return null;

  return (
    <ResultCard
      tone="primary"
      icon={<Briefcase className="h-3.5 w-3.5" />}
      eyebrow="Roles · Employers · Hiring filters"
      title={`What this looks like in India - ${trackTitle}`}
    >
      {/* Indian role variants */}
      <div>
        <p className="text-micro font-bold uppercase tracking-wide text-slate-500">
          Roles you'll apply to as a fresher
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {data.roleVariants.map((r) => (
            <Chip key={r} tone="primary">
              {r}
            </Chip>
          ))}
        </div>
      </div>

      {/* Employer requirements */}
      <div className="mt-5 rounded-2xl bg-accent-sky-deep/[0.04] p-4 ring-1 ring-accent-sky-deep/15">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-4 w-4 text-accent-sky-deep" />
          <p className="text-micro font-bold uppercase tracking-wide text-accent-sky-deep">
            Employer requirements
          </p>
        </div>
        <ul className="mt-3 grid gap-2">
          {data.employerRequirements.map((req, i) => (
            <li key={req} className="flex items-start gap-2.5 text-caption text-slate-700">
              <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-sky-deep/15 text-micro font-bold text-accent-sky-deep">
                {i + 1}
              </span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Companies by tier */}
      <div className="mt-5">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-slate-500" />
          <p className="text-micro font-bold uppercase tracking-wide text-slate-500">
            Where to apply - Indian companies hiring now
          </p>
        </div>
        <div className="mt-3 grid gap-3">
          {data.tiers.map((tier) => (
            <div key={tier.label} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="font-grotesk text-body-sm font-extrabold text-slate-900">
                  {tier.label}
                </p>
                <p className="font-mono text-micro font-bold uppercase tracking-wide text-primary">
                  {tier.note}
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tier.companies.map((c) => (
                  <Chip key={c} tone="slate">
                    {c}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* First 90 days */}
      <div className="mt-5 rounded-2xl bg-yellow-50 p-4 ring-1 ring-yellow-200">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-yellow-700" />
          <p className="text-micro font-bold uppercase tracking-wide text-yellow-800">
            Your first 90 days on the job
          </p>
        </div>
        <ol className="mt-3 grid gap-2">
          {data.firstNinetyDays.map((step, i) => (
            <li key={step} className="flex items-start gap-2.5 text-caption text-slate-700">
              <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-yellow-200 text-micro font-bold text-yellow-800">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </ResultCard>
  );
}
