import { SectionHeader } from "./SectionHeader";
import { Sparkles } from "lucide-react";

/**
 * HiringPartnerWall — Healthcare Employers & Role Requirements Wall.
 * Rebuilt with warm champagne/white light theme matching Arzon Global branding.
 */
type RoleTrackCard = {
  domain: string;
  role: string;
  requirements: string;
  strongest?: boolean;
};

const ROLE_CARDS: RoleTrackCard[] = [
  {
    domain: "PHARMACOVIGILANCE",
    role: "Fresher PV Associate",
    requirements: "ICSR • MedDRA • Case Processing",
    strongest: true,
  },
  {
    domain: "CLINICAL RESEARCH",
    role: "Clinical Research Associate",
    requirements: "GCP • Trial Operations • Documentation",
    strongest: true,
  },
  {
    domain: "MEDICAL CODING",
    role: "Medical Coder",
    requirements: "ICD • CPT • Medical Terminology",
    strongest: true,
  },
  {
    domain: "CLINICAL DATA MANAGEMENT",
    role: "CDM Associate",
    requirements: "EDC • Data Cleaning • Query Management",
    strongest: false,
  },
  {
    domain: "REGULATORY AFFAIRS",
    role: "Regulatory Affairs Associate",
    requirements: "Submissions • CTD/eCTD • Compliance",
    strongest: false,
  },
  {
    domain: "MEDICAL WRITING",
    role: "Medical Writer",
    requirements: "Scientific Writing • Literature • Medical Content",
    strongest: false,
  },
];

const JD_STATS = [
  { value: "127+", label: "LIVE HEALTHCARE JDs ANALYSED", highlight: true },
  { value: "8", label: "HEALTHCARE ROLE TRACKS" },
  { value: "7", label: "HIRING MARKETS" },
  { value: "100s", label: "SKILL REQUIREMENTS MAPPED" },
];

export function HiringPartnerWall() {
  return (
    <section
      aria-labelledby="hiring-wall-heading"
      className="relative overflow-hidden bg-[#F7F5F0] tone-light text-[#1A1A1A] py-12 sm:py-16 border-b border-stone-200/80"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          tone="light"
          eyebrow="HEALTHCARE EMPLOYERS • LIVE JOB DESCRIPTIONS • ROLE REQUIREMENTS"
          title={
            <h2 id="hiring-wall-heading" className="text-[#1A1A1A]">
              The healthcare jobs that{" "}
              <em className="italic font-normal text-[#8A6D1F]">shape our curriculum.</em>
            </h2>
          }
          sub={
            <span className="text-stone-700">
              We study current healthcare job descriptions to understand what employers expect from candidates entering the industry. Those requirements help us build our role-based training tracks.
            </span>
          }
        />

        {/* Key Visual Content Hierarchy Flow */}
        <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-2 rounded-full border border-stone-300 bg-white tone-light card-light px-5 py-2.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] shadow-xs sm:gap-3">
          <span className="text-stone-700">HEALTHCARE JOBS</span>
          <span className="text-[#1B3F8B] font-extrabold">↓</span>
          <span className="text-[#8A6D1F]">ROLE REQUIREMENTS</span>
          <span className="text-[#1B3F8B] font-extrabold">↓</span>
          <span className="text-teal-700 font-extrabold">ARZON TRAINING</span>
        </div>

        {/* Statistics Row */}
        <dl className="mx-auto mt-10 flex max-w-5xl flex-col divide-y divide-stone-200 overflow-hidden rounded-[1.5rem] bg-white tone-light card-light border border-stone-200/90 sm:flex-row sm:divide-x sm:divide-y-0 shadow-sm">
          {JD_STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-1 flex-col items-center justify-center p-5 text-center sm:p-6"
            >
              <dt className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-stone-500">
                {s.label}
              </dt>
              <dd
                className={`mt-2 font-mono text-3xl font-black sm:text-4xl ${
                  s.highlight ? "text-[#1B3F8B]" : "text-[#1A1A1A]"
                }`}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Role Cards Grid */}
        <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROLE_CARDS.map(({ domain, role, requirements, strongest }) => (
            <li
              key={domain}
              className={`group flex flex-col justify-between rounded-2xl p-6 border transition-all ${
                strongest
                  ? "bg-white border-amber-300 shadow-sm hover:shadow-md hover:border-amber-400"
                  : "bg-white/90 border-stone-200 hover:border-stone-300 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#1B3F8B]">
                    {domain}
                  </span>
                  {strongest && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-extrabold text-[#8A6D1F] border border-amber-200">
                      <Sparkles className="h-3 w-3 text-[#8A6D1F]" /> HIGH DEMAND
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-sans text-lg font-bold text-[#1A1A1A] group-hover:text-[#1B3F8B] transition-colors">
                  {role}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-stone-500 font-bold mb-1">
                  Required Skill Stack
                </span>
                <p className="font-mono text-xs text-stone-700 font-medium leading-relaxed">
                  {requirements}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
