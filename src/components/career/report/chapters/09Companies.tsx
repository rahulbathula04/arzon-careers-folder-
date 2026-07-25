import { useMemo, useState } from "react";
import { Building2, ChevronDown, Copy, ExternalLink, Flame, MapPin, Users } from "lucide-react";
import { ReportCard } from "../ReportCard";
import { EMPLOYERS } from "@/data/industry/employers";
import type { Employer, EmployerTier } from "@/data/industry/types";
import { getEmployerDrilldown } from "@/data/industry/employerDrilldown";
import { SourceTagRow, SourceTag } from "../SourceTag";
import { ConfidenceBadge, confidenceFrom } from "../ConfidenceBadge";
import { sourcesFor } from "@/data/industry/sources";
import { EmployerTracker, ApplicationsSummary, DueDateReminders } from "../EmployerTracker";
import { useReportState } from "../ReportStateContext";
import type { TrackerStatus } from "../ReportStateContext";

const ALL = "all" as const;

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
  const commonTitles = d?.commonTitles ?? [];
  const topTitle = commonTitles[0] ?? "Entry-level associate";
  const dm = dmTemplate(e.name, topTitle);
  const cities = e.cities ?? [];
  const projectTypes = d?.projectTypes ?? [];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#161F33] text-white shadow-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 p-4 text-left transition hover:bg-white/5"
      >
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/10 font-mono text-sm font-bold text-white">
          {initials(e.name)}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-bold text-base text-white">{e.name}</p>
            <span className="shrink-0 rounded-full border border-blue-400/30 bg-blue-500/20 px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-blue-300">
              {e.tier}
            </span>
          </div>
          <p className="mt-1 truncate text-xs text-slate-300">
            {cities.join(" · ")}
            {e.typicalBand ? ` · ${e.typicalBand}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5" title={`Hiring signal ${flames}/5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Flame
                key={i}
                className={`h-4 w-4 ${i < flames ? "text-amber-400 fill-amber-400" : "text-white/20"}`}
              />
            ))}
          </div>
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </div>
      </button>

      {open && (
        <div className="border-t border-white/10 p-5 space-y-4 bg-[#0B0F19]">
          {!d ? (
            <div className="rounded-xl border border-white/10 bg-[#161F33] p-4 text-xs text-slate-300 space-y-2">
              <p>Deep-dive coming soon — the Arzon employer desk refreshes this monthly.</p>
              <SourceTag id="arzon_employer_desk" tone="neutral" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {/* Hiring signals */}
              <div className="space-y-2">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Hiring signals · last 90 days
                </p>
                <p className="text-sm text-slate-200">
                  <span className="font-mono font-bold text-blue-400 text-base">
                    {d.jdCount90d}
                  </span>{" "}
                  live JDs indexed. Most common titles:
                </p>
                <ul className="text-xs text-slate-300 space-y-1">
                  {commonTitles.map((t) => (
                    <li key={t}>• {t}</li>
                  ))}
                </ul>
                {d.seasonalNote && (
                  <p className="text-xs italic text-slate-400">{d.seasonalNote}</p>
                )}
              </div>

              {/* Locations + WFH */}
              <div className="space-y-2">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Locations & Work Mode
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cities.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-xs text-white"
                    >
                      <MapPin className="h-3 w-3 text-blue-400" /> {c}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-medium text-slate-300 pt-1">
                  Work Mode:{" "}
                  <span className="text-white font-bold">
                    {d.wfhPolicy === "wfh-common"
                      ? "WFH Common"
                      : d.wfhPolicy === "hybrid"
                        ? "Hybrid (3 days in office)"
                        : "Office-first"}
                  </span>
                </p>
              </div>

              {/* Project types */}
              <div className="md:col-span-2 space-y-2">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Typical projects they staff
                </p>
                <ul className="grid gap-2 text-xs text-slate-200 sm:grid-cols-2">
                  {projectTypes.map((pt) => (
                    <li key={pt} className="rounded-xl border border-white/10 bg-[#161F33] p-3">
                      • {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact-ready next steps */}
              <div className="md:col-span-2 space-y-3 pt-2">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Contact-ready next steps
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={linkedinPeopleSearchUrl(e.name, topTitle)}
                    target="_blank"
                    rel="noopener nofollow"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs px-4 py-2 shadow-md transition-colors"
                  >
                    <Users className="h-4 w-4" /> Find {topTitle}s on LinkedIn
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                  <a
                    href={naukriEmployerUrl(e.name)}
                    target="_blank"
                    rel="noopener nofollow"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2 transition-colors"
                  >
                    <Building2 className="h-4 w-4 text-blue-400" /> {e.name} on Naukri
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof navigator !== "undefined" && navigator.clipboard) {
                        void navigator.clipboard.writeText(dm);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs px-4 py-2 transition-colors"
                  >
                    <Copy className="h-4 w-4 text-amber-400" /> Copy Cold-DM Template
                  </button>
                </div>
              </div>

              {/* Sources for this drilldown */}
              <div className="md:col-span-2 pt-2">
                <SourceTagRow ids={d.sourceIds ?? []} tone="neutral" />
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
  const matches = useMemo(() => EMPLOYERS.filter((e) => (e.hiringFor ?? []).includes(slug)), [slug]);
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
    for (const e of matches) for (const c of e.cities ?? []) set.add(c);
    return [...set].sort();
  }, [matches]);

  const filtered = matches.filter((e) => {
    if (tier !== ALL && e.tier !== tier) return false;
    if (city !== ALL && !(e.cities ?? []).includes(city)) return false;
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
      eyebrow="Who's Hiring Right Now"
      tone="secondary"
      title={`${matches.length} employers actively hiring for this role`}
      subtitle="Expand any row for hiring signals, typical projects, tools, and contact-ready next steps. Refreshed monthly from Naukri + LinkedIn."
      whatThisMeans="These are the exact employers you should be researching this month — not a generic Top-100 list."
    >
      <div className="flex flex-wrap items-center gap-3">
        <ConfidenceBadge
          level={conf}
          detail="Confidence rises with source count + JD volume."
          sourceIds={(companySources ?? []).map((s) => s.id)}
        />
        <SourceTagRow ids={(companySources ?? []).map((s) => s.id)} tone="secondary" />
      </div>

      <div className="mt-4 space-y-3">
        <DueDateReminders employerIds={(matches ?? []).map((m) => m.name)} />
        <ApplicationsSummary
          employerIds={(matches ?? []).map((m) => m.name)}
          activeFilter={trackerFilter}
          onFilterChange={setTrackerFilter}
        />
      </div>

      {/* Filters */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
            Tier
          </span>
          <select
            value={tier}
            onChange={(ev) => setTier(ev.target.value as EmployerTier | typeof ALL)}
            className="w-full rounded-xl border border-white/15 bg-[#161F33] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"
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
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
            City
          </span>
          <select
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
            className="w-full rounded-xl border border-white/15 bg-[#161F33] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"
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
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
            Status
          </span>
          <select
            value={trackerFilter}
            onChange={(ev) => setTrackerFilter(ev.target.value as TrackerFilter)}
            className="w-full rounded-xl border border-white/15 bg-[#161F33] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"
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
          className="mt-2 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20"
        >
          Clear status filter · {TRACKER_FILTER_LABEL[trackerFilter]}
        </button>
      )}

      <p className="mt-3 font-mono text-xs uppercase tracking-wider text-slate-400">
        {filtered.length} of {matches.length} employers shown
      </p>

      {/* Rows */}
      <div className="mt-3 space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#161F33] p-6 text-sm text-slate-300">
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
