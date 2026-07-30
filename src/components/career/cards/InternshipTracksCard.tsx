import { CheckCircle2, ListOrdered, TrendingUp } from "lucide-react";
import type { AcriProfile } from "@/lib/acri";
import { ACRI_DIMENSIONS, type AcriDimensionId } from "@/components/landing/constants";

/**
 * All internship tracks Arzon ranks. The five healthcare tracks plus the
 * business + tech + agri lanes for non-pharma students. Shown in a single
 * ranked list with personalised "why this fits" lines derived from the
 * candidate's ACRI profile + path-fit scores.
 */
type TrackDef = {
  slug: string;
  title: string;
  /** ACRI dimensions this track leans on, in priority order. */
  leans: AcriDimensionId[];
  /** One-line description of what the role actually does day-to-day. */
  doing: string;
  /** Reason template - uses the candidate's strongest matching dimension. */
  reason: (top: string) => string;
};

const TRACK_CATALOGUE: Record<string, TrackDef> = {
  "medical-coding": {
    slug: "medical-coding",
    title: "Medical Coding",
    leans: ["documentation", "operational"],
    doing: "Assign ICD-10-CM / CPT / HCPCS codes from charts at 95%+ accuracy.",
    reason: (top) =>
      `Your ${top} score lines up with the daily chart volume, audit grind and accuracy bar coders win on.`,
  },
  pharmacovigilance: {
    slug: "pharmacovigilance",
    title: "Pharmacovigilance",
    leans: ["documentation", "communication"],
    doing: "Process ICSRs, code adverse events in MedDRA, own aggregate safety reports.",
    reason: (top) =>
      `Your ${top} signal maps to ICSR write-ups, MedDRA coding and the narrative discipline PV teams hire on.`,
  },
  "clinical-data-management": {
    slug: "clinical-data-management",
    title: "Clinical Data Management",
    leans: ["operational", "workflow"],
    doing: "Build EDC studies, write edit-checks, drive trials to clean database lock.",
    reason: (top) =>
      `Your ${top} strength maps to EDC build, edit-check logic and the database-lock discipline CDM leads on.`,
  },
  "regulatory-affairs": {
    slug: "regulatory-affairs",
    title: "Regulatory Affairs",
    leans: ["documentation", "domain"],
    doing: "Author CTD modules, respond to deficiency letters, own submission strategy.",
    reason: (top) =>
      `Your ${top} signal fits long-form CTD authoring, deficiency-letter response and submission planning.`,
  },
  "ai-intelligence": {
    slug: "ai-intelligence",
    title: "AI in Healthcare",
    leans: ["workflow", "operational"],
    doing: "Build, prompt-engineer and validate clinical AI workflows for PV / coding / RA teams.",
    reason: (top) =>
      `Your ${top} strength matches the build-test-validate loop where you ARE the automation layer.`,
  },
  "sas-clinical": {
    slug: "sas-clinical",
    title: "SAS Clinical Programming",
    leans: ["workflow", "operational"],
    doing: "Write SDTM/ADaM datasets, TLF programs and validate trial outputs for submission.",
    reason: (top) =>
      `Your ${top} strength fits the SDTM/ADaM build, TLF programming and double-validation rigour SAS teams need.`,
  },
  "business-analyst": {
    slug: "business-analyst",
    title: "Business Analyst / Data Analyst",
    leans: ["workflow", "communication"],
    doing: "Translate stakeholder questions into SQL/Excel/dashboards and ship insight decks.",
    reason: (top) =>
      `Your ${top} signal maps to requirements gathering, SQL/Excel modelling and the stakeholder-storytelling BAs live on.`,
  },
  "b2b-saas-sales": {
    slug: "b2b-saas-sales",
    title: "B2B SaaS Sales / SDR",
    leans: ["communication", "operational"],
    doing: "Prospect, qualify, demo and close mid-market SaaS deals end-to-end.",
    reason: (top) =>
      `Your ${top} signal fits prospecting cadence, discovery calls and the pipeline discipline SaaS sales teams hire on.`,
  },
  "clinical-saas": {
    slug: "clinical-saas",
    title: "Clinical SaaS Account Management",
    leans: ["communication", "domain"],
    doing: "Own hospital / pharma SaaS accounts - onboarding, renewals, expansion, QBRs.",
    reason: (top) =>
      `Your ${top} strength fits stakeholder management, renewal-cycle ownership and the consultative selling clinical SaaS teams need.`,
  },
  "software-engineer": {
    slug: "software-engineer",
    title: "Software Engineer",
    leans: ["workflow", "operational"],
    doing: "Ship features in TypeScript/Python, review PRs, own services end-to-end.",
    reason: (top) =>
      `Your ${top} signal lines up with shipping code, debugging in production and the code-review discipline strong engineers grow on.`,
  },
  "agri-tech-ops": {
    slug: "agri-tech-ops",
    title: "Agri-Tech Operations",
    leans: ["operational", "workflow"],
    doing: "Run supply-chain, field-ops and quality workflows for agri/food-tech ventures.",
    reason: (top) =>
      `Your ${top} strength fits the field coordination, supplier ops and quality-control rigour agri-tech teams hire on.`,
  },
};

const DIM_LABEL: Record<AcriDimensionId, string> = ACRI_DIMENSIONS.reduce(
  (acc, d) => ({ ...acc, [d.id]: d.label.toLowerCase() }),
  {} as Record<AcriDimensionId, string>,
);

interface Props {
  profile: AcriProfile;
  pathFits: { slug: string; fit: number }[];
  /** Slug of the flagship track - used to mark the top recommendation. */
  flagshipSlug: string;
  /** Profile question `course` answer - drives the header copy. */
  course?: string;
}

function fitTier(fit: number): { label: string; tone: string } {
  if (fit >= 75) return { label: "Very strong fit", tone: "bg-sky-50 text-primary ring-sky-200" };
  if (fit >= 60) return { label: "Strong fit", tone: "bg-primary/10 text-primary ring-primary/25" };
  if (fit >= 45) return { label: "Solid fit", tone: "bg-amber-50 text-amber-700 ring-amber-200" };
  return { label: "Stretch fit", tone: "bg-slate-100 text-slate-600 ring-slate-200" };
}

const HEALTHCARE_SLUGS = [
  "medical-coding",
  "pharmacovigilance",
  "clinical-data-management",
  "regulatory-affairs",
  "ai-intelligence",
];

export function InternshipTracksCard({ profile, pathFits, flagshipSlug, course }: Props) {
  const nonPharma =
    course === "comm" || course === "arts" || course === "agri" || course === "engg";

  // Build a fit lookup; fall back to a profile-derived estimate if missing.
  const fitBySlug = new Map<string, number>();
  pathFits.forEach((p) => fitBySlug.set(p.slug, Math.round(p.fit)));

  // For non-pharma students, surface the top 5 actual path-fits (which the
  // scoring engine has already capped to the candidate's real domain).
  // For pharma / lifesci / med, keep the original 5 healthcare tracks since
  // that's still the relevant ranking for them.
  const slugList: string[] = nonPharma
    ? (() => {
        const fromFits = pathFits.filter((p) => TRACK_CATALOGUE[p.slug]).map((p) => p.slug);
        // De-duplicate while preserving order, then pad with healthcare
        // tracks if we somehow have fewer than 5.
        const seen = new Set<string>();
        const merged = [...fromFits, ...HEALTHCARE_SLUGS].filter((s) => {
          if (seen.has(s)) return false;
          seen.add(s);
          return true;
        });
        return merged.slice(0, 5);
      })()
    : HEALTHCARE_SLUGS;

  const ranked = slugList
    .map((slug) => TRACK_CATALOGUE[slug])
    .filter((t): t is TrackDef => Boolean(t))
    .map((t) => {
      const fit = fitBySlug.has(t.slug)
        ? fitBySlug.get(t.slug)!
        : Math.round((profile[t.leans[0]] + profile[t.leans[1]]) / 2);
      const topLean = [...t.leans].sort((a, b) => profile[b] - profile[a])[0];
      return { ...t, fit, topLeanLabel: DIM_LABEL[topLean] };
    })
    .sort((a, b) => b.fit - a.fit);

  const headerTitle = nonPharma
    ? "Your top internship tracks, ranked by fit"
    : "All five Arzon tracks, ranked by your fit";

  return (
    <section
      aria-labelledby="internship-tracks-heading"
      className="tone-light mt-6 overflow-hidden rounded-3xl bg-white text-slate-900 ring-1 ring-slate-200 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.4)]"
    >
      <div className="border-b border-slate-100 bg-gradient-to-r from-primary/5 via-white to-primary/5 px-5 py-4 sm:px-6">
        <p className="inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wide text-primary">
          <ListOrdered className="h-3.5 w-3.5" /> Internship track ranking · personalised
        </p>
        <h3
          id="internship-tracks-heading"
          className="mt-1.5 font-grotesk text-body font-extrabold leading-snug text-slate-900 sm:text-body-lg"
        >
          {headerTitle}
        </h3>
        <p className="mt-1 text-meta leading-relaxed text-slate-600">
          Derived from your 5-dimension ACRI profile and weighted path-fit scores.
        </p>
      </div>

      <ol className="divide-y divide-slate-100">
        {ranked.map((t, i) => {
          const tier = fitTier(t.fit);
          const isFlagship = t.slug === flagshipSlug || i === 0;
          return (
            <li key={t.slug} className="px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-micro font-bold ring-1 ${
                    isFlagship
                      ? "bg-primary text-white ring-primary"
                      : "bg-slate-50 text-slate-700 ring-slate-200"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-grotesk text-body-sm font-extrabold leading-tight text-slate-900">
                      {t.title}
                    </h4>
                    {isFlagship && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-micro font-bold uppercase tracking-wide text-primary ring-1 ring-sky-200">
                        <CheckCircle2 className="h-3 w-3" /> Top recommendation
                      </span>
                    )}
                    <span
                      className={`ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-micro font-bold uppercase tracking-wide ring-1 ${tier.tone}`}
                    >
                      <TrendingUp className="h-3 w-3" /> {tier.label} · {t.fit}%
                    </span>
                  </div>
                  <p className="mt-1.5 text-meta leading-relaxed text-slate-600">
                    <span className="font-semibold text-slate-700">What you'd do:</span> {t.doing}
                  </p>
                  <p className="mt-1 text-meta leading-relaxed text-slate-700">
                    <span className="font-semibold">Why it fits:</span> {t.reason(t.topLeanLabel)}
                  </p>
                  {/* Fit bar */}
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${
                        t.fit >= 75
                          ? "bg-sky-500"
                          : t.fit >= 60
                            ? "bg-primary"
                            : t.fit >= 45
                              ? "bg-amber-400"
                              : "bg-slate-300"
                      }`}
                      style={{ width: `${Math.max(6, Math.min(100, t.fit))}%` }}
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-meta text-slate-600 sm:px-6">
        Ranking refreshes with every attempt. Counsellors use this list - not a single answer - to
        confirm your cohort placement.
      </div>
    </section>
  );
}
