import { SectionHeader } from "./SectionHeader";
import { CheckCircle2 } from "lucide-react";

/**
 * HiringPartnerWall — Enterprise Tech & Quant Fintech employer grid.
 *
 * Tier-1 Enterprise Tech and Quant Fintechs are surfaced first as **Certified Recruitment Partners**
 * (July 2026), clearly distinguished from the remaining firms whose JDs we
 * reverse-engineer the curriculum from.
 */
type Partner = { name: string; role: string; certified?: boolean };

const PARTNERS: Partner[] = [
  { name: "Tier-1 Enterprise Tech", role: "AI/ML Engineer (Fresher)", certified: true },
  { name: "Global Quant Fintech", role: "Software Engineer (Fresher)", certified: true },
  { name: "Global Capital Markets", role: "Technology Analyst" },
  { name: "Enterprise Analytics Hub", role: "Data Analyst Trainee" },
  { name: "Quantitative Systems Enterprise", role: "Technology Associate" },
  { name: "Global Financial Data Hub", role: "Data Science Analyst" },
  { name: "Tier-1 Tech GCC", role: "Digital & Technology Grad" },
  { name: "Cloud Engineering Systems", role: "Software Developer" },
  { name: "Global Fintech Solutions", role: "Technology Analyst" },
  { name: "Enterprise AI Consultancy", role: "Data Analytics Consultant" },
];

const JD_STATS = [
  { value: "2", label: "Certified Recruitment Partners", highlight: true },
  { value: "127", label: "Live GCC / BFSI JDs this month" },
  { value: "7 Cities", label: "Pan India hiring footprint" },
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
          eyebrow="Official Partners + JD sources · live Indian listings"
          title={
            <h2 id="hiring-wall-heading" className="text-slate-50">
              The employers whose JDs <em className="italic-accent not-italic">drive our curriculum.</em>
            </h2>
          }
          sub={
            <span className="text-slate-300">
              Tier-1 Enterprise Tech & Quant Fintechs are{" "}
              <strong className="text-slate-50">Certified Recruitment Partners</strong>: we
              hold official recruitment partner desks from both (July 2026). All other firms
              listed for source attribution only; no endorsement claimed.
            </span>
          }
        />

        <dl className="mx-auto mt-10 flex max-w-4xl flex-col divide-y divide-white/10 overflow-hidden rounded-[1.5rem] bg-black/90 border border-white/15 sm:flex-row sm:divide-x sm:divide-y-0 shadow-2xl">
          {JD_STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-1 flex-col items-center justify-center p-6 text-center"
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

        <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map(({ name, role, certified }) => (
            <li
              key={name}
              className={`group flex flex-col justify-between rounded-2xl p-5 border transition-all ${
                certified
                  ? "bg-amber-950/20 border-amber-500/40 shadow-lg shadow-amber-950/30"
                  : "bg-slate-900/60 border-white/10 hover:border-white/25"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="font-sans text-base font-bold text-slate-50 group-hover:text-amber-300 transition-colors">
                  {name}
                </span>
                {certified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] font-extrabold text-amber-300 border border-amber-400/30">
                    <CheckCircle2 className="h-3 w-3 text-amber-400" /> CERTIFIED
                  </span>
                )}
              </div>
              <span className="mt-3 font-mono text-xs text-slate-300">
                {role}
              </span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-3xl text-center source-note">
          Tier-1 Enterprise Tech & Quant Fintechs are certified recruitment partners (July 2026). All other
          names shown for JD source attribution (sourced from Naukri, LinkedIn and company career
          sites). No endorsement implied for non-partner firms.
        </p>
      </div>
    </section>
  );
}
