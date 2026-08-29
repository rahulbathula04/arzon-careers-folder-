import { SectionHeader } from "./SectionHeader";
import { Sparkles } from "lucide-react";

/**
 * HiringPartnerWall — Healthcare Employers & Role Requirements Wall.
 * Shows how healthcare job descriptions directly shape Arzon's role-based curriculum.
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
      className="tone-dark relative overflow-hidden bg-[#0a0c10] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          tone="dark"
          eyebrow="HEALTHCARE EMPLOYERS • LIVE JOB DESCRIPTIONS • ROLE REQUIREMENTS"
          title={
            <h2 id="hiring-wall-heading" className="text-slate-50">
              The healthcare jobs that{" "}
              <em className="italic-accent not-italic">shape our curriculum.</em>
            </h2>
          }
          sub={
            <span className="text-slate-300">
              We study current healthcare job descriptions to understand what employers expect from candidates entering the industry. Those requirements help us build our role-based training tracks.
            </span>
          }
        />

        {/* Key Visual Content Hierarchy Flow */}
        <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-2.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-amber-300 shadow-sm sm:gap-3 sm:text-xs">
          <span className="text-slate-200">HEALTHCARE JOBS</span>
          <span className="text-amber-400 font-extrabold">↓</span>
          <span className="text-amber-300">ROLE REQUIREMENTS</span>
          <span className="text-amber-400 font-extrabold">↓</span>
          <span className="text-teal-300 font-extrabold">ARZON TRAINING</span>
        </div>

        {/* Statistics Row */}
        <dl className="mx-auto mt-10 flex max-w-5xl flex-col divide-y divide-white/10 overflow-hidden rounded-[1.5rem] bg-black/90 border border-white/15 sm:flex-row sm:divide-x sm:divide-y-0 shadow-2xl">
          {JD_STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-1 flex-col items-center justify-center p-5 text-center sm:p-6"
            >
              <dt className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-slate-300">
                {s.label}
              </dt>
              <dd
                className={`mt-2 font-mono text-3xl font-black sm:text-4xl ${
                  s.highlight ? "text-amber-400" : "text-slate-50"
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
                  ? "bg-amber-950/20 border-amber-500/50 shadow-lg shadow-amber-950/30 hover:border-amber-400"
                  : "bg-slate-900/60 border-white/10 hover:border-white/25"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-amber-400/90">
                    {domain}
                  </span>
                  {strongest && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] font-extrabold text-amber-300 border border-amber-400/30">
                      <Sparkles className="h-3 w-3 text-amber-400" /> HIGH DEMAND
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-sans text-lg font-bold text-slate-50 group-hover:text-amber-300 transition-colors">
                  {role}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Required Skill Stack
                </span>
                <p className="font-mono text-xs text-slate-300 font-medium leading-relaxed">
                  {requirements}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Bottom Proof Line */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-amber-500/20 bg-slate-900/90 p-6 text-center shadow-2xl backdrop-blur-sm sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 font-mono text-xs font-black uppercase tracking-widest text-amber-400 border border-amber-500/30">
            <span>JOB DESCRIPTION</span>
            <span className="text-amber-500">→</span>
            <span>SKILL GAP</span>
            <span className="text-amber-500">→</span>
            <span className="text-teal-300">TRAINING</span>
          </div>

          <div className="mt-6 space-y-2">
            <p className="font-serif text-base sm:text-lg font-medium text-slate-300 italic">
              "We don't start by asking, 'What course should we sell?'"
            </p>
            <p className="font-serif text-lg sm:text-xl font-bold text-amber-200">
              "We start by asking, 'What does the role require?'"
            </p>
          </div>
        </div>

        {/* Small Disclaimer */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-slate-400 font-sans leading-relaxed">
          Employer names shown for job-description/source attribution unless separately identified as Arzon Global recruitment partners. Requirements and job counts are updated periodically.
        </p>
      </div>
    </section>
  );
}

