import { SectionHeader } from "./SectionHeader";
import { CheckCircle2 } from "lucide-react";

/**
 * HiringPartnerWall — GCC / BFSI employer grid.
 *
 * HSBC and JPMorgan Chase are surfaced first as **Certified Recruitment Partners**
 * (July 2026), clearly distinguished from the remaining firms whose JDs we
 * reverse-engineer the curriculum from.
 */
type Partner = { name: string; role: string; certified?: boolean };

const PARTNERS: Partner[] = [
  { name: "HSBC India", role: "AI/ML Engineer (Fresher)", certified: true },
  { name: "JPMorgan Chase", role: "Software Engineer (Fresher)", certified: true },
  { name: "Deutsche Bank", role: "Technology Analyst" },
  { name: "Barclays India", role: "Data Analyst Trainee" },
  { name: "Goldman Sachs", role: "Technology Associate" },
  { name: "Citibank India", role: "Data Science Analyst" },
  { name: "Standard Chartered", role: "Digital & Technology Grad" },
  { name: "BNY Mellon", role: "Software Developer" },
  { name: "Morgan Stanley", role: "Technology Analyst" },
  { name: "KPMG India", role: "Data Analytics Consultant" },
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
              HSBC and JPMorgan Chase are{" "}
              <strong className="text-white">Certified Recruitment Partners</strong> — we
              hold official partnership certificates from both (July 2026). All other firms
              listed for source attribution only; no endorsement claimed.
            </span>
          }
        />

        <dl className="mx-auto mt-10 flex max-w-4xl flex-col divide-y divide-white/10 overflow-hidden rounded-[1.5rem] bg-black/90 border border-white/15 sm:flex-row sm:divide-x sm:divide-y-0 shadow-2xl">
          {JD_STATS.map((s) => (
            <div
              key={s.label}
              className="flex-1 px-5 py-6 text-center hover:bg-white/[0.04] transition-colors"
            >
              <dd
                className={`text-3xl font-extrabold sm:text-4xl font-mono drop-shadow-[0_0_15px_rgba(255,255,255,0.35)] ${
                  s.highlight
                    ? "bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent"
                }`}
              >
                {s.value}
              </dd>
              <dt className="mt-2.5 font-mono text-xs uppercase tracking-[0.16em] text-slate-300 font-bold">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>

        <ul className="mx-auto mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-10 lg:grid-cols-5">
          {PARTNERS.map(({ name, role, certified }) => (
            <li
              key={name}
              className={`group relative flex min-w-0 min-h-[96px] flex-col items-start justify-center gap-1 overflow-hidden rounded-[1rem] px-4 py-3 transition-all ${
                certified
                  ? "bg-gradient-to-br from-blue-950/80 to-slate-900 border border-blue-800/60 hover:border-blue-600/80"
                  : "glass-panel hover-glass-glow"
              }`}
            >
              <span
                aria-hidden
                className={`absolute inset-y-2 left-0 w-[3px] rounded-full transition-all duration-300 ${
                  certified
                    ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    : "bg-sky-400/0 group-hover:bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                }`}
              />
              {certified && (
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle2 className="h-3 w-3 text-blue-400 shrink-0" />
                  <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-blue-400">
                    Certified Partner
                  </span>
                </div>
              )}
              <span
                className={`block w-full truncate font-display text-body-sm font-semibold leading-tight tracking-tight transition-colors ${
                  certified
                    ? "text-blue-200 group-hover:text-blue-100"
                    : "text-white group-hover:text-sky-400"
                }`}
              >
                {name}
              </span>
              <span className="block w-full font-sans text-xs font-semibold leading-snug text-slate-300">
                {role}
              </span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-3xl text-center source-note">
          HSBC and JPMorgan Chase are certified recruitment partners (July 2026). All other
          names shown for JD source attribution — sourced from Naukri, LinkedIn and company career
          sites. No endorsement implied for non-partner firms.
        </p>
      </div>
    </section>
  );
}
