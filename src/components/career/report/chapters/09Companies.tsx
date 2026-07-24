/**
 * ChapterCompanies — filterable employer list with per-row expandable
 * drilldown drawer. Drives every claim from `industry/employers.ts` +
 * `industry/employerDrilldown.ts`. Drilldown shows hiring signals, common
 * titles, project types, locations, WFH policy, required tools, and
 * contact-ready next steps (LinkedIn people search + Naukri employer
 * page + cold-DM template).
 */
import { useMemo, useState } from "react";
import { Building2, ChevronDown, Copy, ExternalLink, Flame, MapPin, Users } from "lucide-react";
import { ReportCard } from "../ReportCard";
import { EMPLOYERS } from "@/data/industry/employers";
import type { Employer, EmployerTier } from "@/data/industry/types";
import { getEmployerDrilldown } from "@/data/industry/employerDrilldown";
import { REPORT_TONES } from "../reportTones";
import { SourceTagRow, SourceTag } from "../SourceTag";
import { ConfidenceBadge, confidenceFrom } from "../ConfidenceBadge";
import { sourcesFor } from "@/data/industry/sources";
import { EmployerTracker, ApplicationsSummary, DueDateReminders } from "../EmployerTracker";
import { useReportState } from "../ReportStateContext";
import type { TrackerStatus } from "../ReportStateContext";

const ALL = "all" as const;

/** Reader-facing tracker buckets mapped to underlying TrackerStatus values. */
type TrackerFilter =
  | typeof ALL
  | "not-started"
  | "in-progress"
  | "submitted"
  | "follow-up"
  | "offer"
  | "rejected";
const TRACKER_FILTER_ORDER: TrackerFilter[] = [
  ALL,
  "not-started",
  "in-progress",
  "submitted",
  "follow-up",
  "offer",
  "rejected",
];
const TRACKER_FILTER_LABEL: Record<TrackerFilter, string> = {
  [ALL]: "All statuses",
  "not-started": "Not started",
  "in-progress": "In progress",
  submitted: "Submitted",
  "follow-up": "Follow-up",
  offer: "Offer",
  rejected: "Rejected",
};

function statusToFilter(status: TrackerStatus | undefined): Exclude<TrackerFilter, typeof ALL> {
  switch (status) {
    case "researching":
      return "in-progress";
    case "applied":
      return "submitted";
    case "interview":
      return "follow-up";
    case "offer":
      return "offer";
    case "rejected":
      return "rejected";
    case "not-started":
    case undefined:
    default:
      return "not-started";
  }
}

function initials(name: string) {
  return name
    .split(/[\s()]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
}

function linkedinPeopleSearchUrl(company: string, role: string) {
  const q = encodeURIComponent(role);
  return `https://www.linkedin.com/search/results/people/?currentCompany=%5B%22${encodeURIComponent(company)}%22%5D&keywords=${q}`;
}

function naukriEmployerUrl(company: string) {
  return `https://www.naukri.com/${encodeURIComponent(company.toLowerCase().replace(/\s+/g, "-"))}-jobs-careers`;
}

function dmTemplate(company: string, roleTitle: string) {
  return (
    `Hi {first name},\n\n` +
    `I'm targeting an L1 ${roleTitle} role at ${company} and I've completed a JD-mapped bootcamp that ships portfolio artefacts (case narratives, coded event sets, tool screenshots).\n\n` +
    `If you have 10 minutes this week, could I share a 1-page brief on what I can contribute in the first 90 days? Happy to also apply through your careers page — just wanted to make sure it lands with someone.\n\n` +
    `Thanks,\n{your name}`
  );
}

function EmployerRow({ e, slug }: { e: Employer; slug: string }) {
  const [open, setOpen] = useState(false);
  const d = getEmployerDrilldown(e.name);
  const flames = d?.hiringSignal ?? 2;
  const topTitle = d?.commonTitles[0] ?? "Entry-level associate";
  const dm = dmTemplate(e.name, topTitle);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 p-4 text-left transition hover:bg-white/[0.03]"
      >
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-surface-dim/40 font-mono text-body-sm font-semibold text-white/80">
          {initials(e.name)}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-grotesk text-body font-bold text-white">{e.name}</p>
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-caption uppercase tracking-[0.12em] ${REPORT_TONES.neutral.chipBorder} ${REPORT_TONES.neutral.chipBg} ${REPORT_TONES.neutral.chipText}`}
            >
              {e.tier}
            </span>
          </div>
          <p className="mt-1 truncate text-caption text-white/60">
            {e.cities.join(" · ")}
            {e.typicalBand ? ` · ${e.typicalBand}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5" title={`Hiring signal ${flames}/5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Flame
                key={i}
                className={`h-3.5 w-3.5 ${i < flames ? REPORT_TONES.warn.iconFill : "text-white/15"}`}
              />
            ))}
          </div>
          <ChevronDown
            className={`h-4 w-4 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </div>
      </button>

      {open && (
        <div className="border-t border-white/8 p-4 sm:p-5">
          {!d ? (
            <div className="rounded-xl glass-panel-deep p-3 text-caption text-white/60">
              Deep-dive coming soon — the Arzon employer desk refreshes this monthly.{" "}
              <SourceTag id="arzon_employer_desk" tone="neutral" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {/* Hiring signals */}
              <div>
                <p className="font-mono text-caption uppercase tracking-[0.16em] text-white/50">
                  Hiring signals · last 90 days
                </p>
                <p className="mt-2 text-body-sm text-white/85">
                  <span className={`font-mono tabular-nums ${REPORT_TONES.primary.accentText}`}>
                    {d.jdCount90d}
                  </span>{" "}
                  live JDs indexed. Most common titles:
                </p>
                <ul className="mt-1 text-body-sm text-white/70">
                  {d.commonTitles.map((t) => (
                    <li key={t}>· {t}</li>
                  ))}
                </ul>
                {d.seasonalNote && (
                  <p className="mt-2 text-caption italic text-white/55">{d.seasonalNote}</p>
                )}
              </div>

              {/* Locations + WFH */}
              <div>
                <p className="font-mono text-caption uppercase tracking-[0.16em] text-white/50">
                  Locations
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {e.cities.map((c) => (
                    <span
                      key={c}
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-caption ${REPORT_TONES.neutral.chipBorder} ${REPORT_TONES.neutral.chipBg} ${REPORT_TONES.neutral.chipText}`}
                    >
                      <MapPin className="h-3 w-3" /> {c}
                    </span>
                  ))}
                </div>
                <p className="mt-3 font-mono text-caption uppercase tracking-[0.16em] text-white/50">
                  Work mode
                </p>
                <p className="mt-1 text-body-sm text-white/80">
                  {d.wfhPolicy === "wfh-common"
                    ? "WFH common"
                    : d.wfhPolicy === "hybrid"
                      ? "Hybrid (3 days in office typical)"
                      : "Office-first"}
                </p>
              </div>

              {/* Project types */}
              <div className="md:col-span-2">
                <p className="font-mono text-caption uppercase tracking-[0.16em] text-white/50">
                  Typical projects they staff
                </p>
                <ul className="mt-2 grid gap-1 text-body-sm text-white/80 sm:grid-cols-2">
                  {d.projectTypes.map((pt) => (
                    <li key={pt} className="rounded-lg glass-panel-deep p-2">
                      · {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact-ready next steps */}
              <div className="md:col-span-2">
                <p className="font-mono text-caption uppercase tracking-[0.16em] text-white/50">
                  Contact-ready next steps
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    href={linkedinPeopleSearchUrl(e.name, topTitle)}
                    target="_blank"
                    rel="noopener nofollow"
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-caption transition hover:brightness-110 ${REPORT_TONES.primary.chipBorder} ${REPORT_TONES.primary.chipBg} ${REPORT_TONES.primary.chipText}`}
                  >
                    <Users className="h-3.5 w-3.5" /> Find {topTitle}s on LinkedIn
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                  <a
                    href={naukriEmployerUrl(e.name)}
                    target="_blank"
                    rel="noopener nofollow"
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-caption transition hover:brightness-110 ${REPORT_TONES.secondary.chipBorder} ${REPORT_TONES.secondary.chipBg} ${REPORT_TONES.secondary.chipText}`}
                  >
                    <Building2 className="h-3.5 w-3.5" /> {e.name} on Naukri
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof navigator !== "undefined" && navigator.clipboard) {
                        void navigator.clipboard.writeText(dm);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-caption transition hover:brightness-110 ${REPORT_TONES.warn.chipBorder} ${REPORT_TONES.warn.chipBg} ${REPORT_TONES.warn.chipText}`}
                  >
                    <Copy className="h-3.5 w-3.5" /> Copy cold-DM template
                  </button>
                </div>
                <details className="mt-3">
                  <summary className="cursor-pointer select-none font-mono text-caption uppercase tracking-[0.14em] text-white/50 hover:text-white/80">
                    Preview cold-DM template
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap rounded-xl glass-panel-deep p-3 text-caption text-white/70">
                    {dm}
                  </pre>
                </details>
              </div>

              {/* Sources for this drilldown */}
              <div className="md:col-span-2">
                <SourceTagRow ids={d.sourceIds} tone="neutral" />
              </div>

              {/* Per-employer apply tracker */}
              <div className="md:col-span-2">
                <EmployerTracker employerId={e.name} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ChapterCompanies({ slug, chapter }: { slug: string; chapter: number }) {
  const matches = useMemo(() => EMPLOYERS.filter((e) => e.hiringFor.includes(slug)), [slug]);
  const [tier, setTier] = useState<EmployerTier | typeof ALL>(ALL);
  const [city, setCity] = useState<string | typeof ALL>(ALL);
  const [trackerFilter, setTrackerFilter] = useState<TrackerFilter>(ALL);
  const trackerState = useReportState();

  const tiers = useMemo(() => {
    const set = new Set<EmployerTier>();
    for (const e of matches) set.add(e.tier);
    return [...set];
  }, [matches]);
  const cities = useMemo(() => {
    const set = new Set<string>();
    for (const e of matches) for (const c of e.cities) set.add(c);
    return [...set].sort();
  }, [matches]);

  const filtered = matches.filter((e) => {
    if (tier !== ALL && e.tier !== tier) return false;
    if (city !== ALL && !e.cities.includes(city)) return false;
    if (trackerFilter !== ALL) {
      const bucket = statusToFilter(trackerState.employerTracker[e.name]?.status);
      if (bucket !== trackerFilter) return false;
    }
    return true;
  });

  const trackerCounts = useMemo(() => {
    const c: Record<Exclude<TrackerFilter, typeof ALL>, number> = {
      "not-started": 0,
      "in-progress": 0,
      submitted: 0,
      "follow-up": 0,
      offer: 0,
      rejected: 0,
    };
    for (const e of matches) c[statusToFilter(trackerState.employerTracker[e.name]?.status)] += 1;
    return c;
  }, [matches, trackerState.employerTracker]);

  const companySources = sourcesFor(slug, "companies");
  const conf = confidenceFrom({ sources: companySources.length, jdCount: matches.length * 6 });

  return (
    <ReportCard
      id={`ch-${chapter}-companies`}
      chapter={chapter}
      readMinutes={5}
      eyebrow="Who's hiring right now"
      tone="secondary"
      title={`${matches.length} employers actively hiring for this role`}
      subtitle="Expand any row for hiring signals, typical projects, tools, and contact-ready next steps. Refreshed monthly from Naukri + LinkedIn."
      whatThisMeans="These are the exact employers you should be researching this month — not a generic Top-100 list."
    >
      <div className="flex flex-wrap items-center gap-2">
        <ConfidenceBadge
          level={conf}
          detail="Confidence rises with source count + JD volume."
          sourceIds={companySources.map((s) => s.id)}
        />
        <SourceTagRow ids={companySources.map((s) => s.id)} tone="secondary" />
      </div>

      {/* Applications summary — only renders if the user has tracked any employer */}
      <div className="mt-4 space-y-3">
        <DueDateReminders employerIds={matches.map((m) => m.name)} />
        <ApplicationsSummary
          employerIds={matches.map((m) => m.name)}
          activeFilter={trackerFilter}
          onFilterChange={setTrackerFilter}
        />
      </div>

      {/* Filters */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Tier
          </span>
          <select
            value={tier}
            onChange={(ev) => setTier(ev.target.value as EmployerTier | typeof ALL)}
            className={`w-full rounded-xl border border-white/15 bg-[#0B1226] px-3 py-2 text-body-sm text-white/95 shadow-inner ${REPORT_TONES.primary.focusBorder} focus:outline-none`}
          >
            <option value={ALL}>All tiers</option>
            {tiers.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            City
          </span>
          <select
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
            className={`w-full rounded-xl border border-white/15 bg-[#0B1226] px-3 py-2 text-body-sm text-white/95 shadow-inner ${REPORT_TONES.primary.focusBorder} focus:outline-none`}
          >
            <option value={ALL}>All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Status
          </span>
          <select
            value={trackerFilter}
            onChange={(ev) => setTrackerFilter(ev.target.value as TrackerFilter)}
            className={`w-full rounded-xl border border-white/15 bg-[#0B1226] px-3 py-2 text-body-sm text-white/95 shadow-inner ${REPORT_TONES.primary.focusBorder} focus:outline-none`}
          >
            {TRACKER_FILTER_ORDER.map((k) => (
              <option key={k} value={k}>
                {TRACKER_FILTER_LABEL[k]}
                {k !== ALL ? ` · ${trackerCounts[k]}` : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      {trackerFilter !== ALL && (
        <button
          type="button"
          onClick={() => setTrackerFilter(ALL)}
          className="mt-2 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-caption uppercase tracking-wider text-white/70 hover:text-white"
        >
          Clear status filter · {TRACKER_FILTER_LABEL[trackerFilter]}
        </button>
      )}

      <p className="mt-3 font-mono text-caption uppercase tracking-[0.14em] text-white/50">
        {filtered.length} of {matches.length} employers shown
      </p>

      {/* Rows */}
      <div className="mt-3 space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-2xl glass-panel-deep p-6 text-body-sm text-white/60">
            No employers match those filters. Broaden your city or tier.
          </div>
        ) : (
          filtered.map((e) => <EmployerRow key={e.name} e={e} slug={slug} />)
        )}
      </div>
    </ReportCard>
  );
}

export default ChapterCompanies;
