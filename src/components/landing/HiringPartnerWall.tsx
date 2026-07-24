import { SectionHeader } from "./SectionHeader";

/**
 * HiringPartnerWall — wordmark grid of the employers whose live JDs we
 * reverse-engineer the curriculum from. Wordmark-only (no logo files) to
 * stay trademark-safe; the copy is explicit that these are JD sources, not
 * endorsements.
 */
type Partner = { name: string; role: string };

const PARTNERS: Partner[] = [
  { name: "IQVIA", role: "PV Associate I" },
  { name: "Cognizant", role: "Medical Coder" },
  { name: "Parexel", role: "Drug Safety Associate" },
  { name: "Accenture", role: "Clinical Data Coordinator" },
  { name: "ICON", role: "Safety Specialist" },
  { name: "Syneos", role: "PV Case Processor" },
  { name: "Omega Healthcare", role: "Medical Coder (CPC)" },
  { name: "Apollo Hospitals", role: "Clinical Research Coordinator" },
  { name: "Dr Reddy's", role: "Regulatory Affairs Trainee" },
  { name: "Sun Pharma", role: "Pharmacovigilance Trainee" },
];

const JD_STATS = [
  { value: "127", label: "Live JDs analysed this month" },
  { value: "10", label: "Employer sources, refreshed weekly" },
  { value: "3 days ago", label: "Last syllabus sync" },
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
          eyebrow="JD sources · live Indian listings"
          title={
            <h2 id="hiring-wall-heading" className="text-slate-50">
              The employers whose JDs <em className="italic-accent not-italic">we mirror.</em>
            </h2>
          }
          sub={
            <span className="text-slate-300">
              We rebuild every syllabus from current fresher JDs at these firms. Names shown for
              source attribution only — no endorsement or partnership is claimed.
            </span>
          }
        />

        <dl className="mx-auto mt-10 flex max-w-4xl flex-col divide-y divide-white/10 overflow-hidden rounded-[1.5rem] glass-panel-deep sm:flex-row sm:divide-x sm:divide-y-0 shadow-2xl">
          {JD_STATS.map((s) => (
            <div key={s.label} className="flex-1 px-5 py-6 text-center hover:bg-white/[0.02] transition-colors">
              <dd className="stat-num text-h3 text-brand-gold sm:text-h2">{s.value}</dd>
              <dt className="mt-2 font-mono text-micro uppercase tracking-[0.16em] text-white/60">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>

        <ul className="mx-auto mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-10 lg:grid-cols-5">
          {PARTNERS.map(({ name, role }) => (
            <li
              key={name}
              className="group relative flex min-w-0 min-h-[96px] flex-col items-start justify-center gap-1 overflow-hidden rounded-[1rem] glass-panel px-4 py-3 hover-glass-glow"
            >
              <span
                aria-hidden
                className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-brand-gold/0 transition-all duration-300 group-hover:bg-brand-gold/90"
              />
              <span className="block w-full truncate font-display text-body-sm font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-brand-gold">
                {name}
              </span>
              <span className="block w-full font-sans text-micro font-medium leading-snug text-white/60">
                {role}
              </span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-3xl text-center source-note">
          Source: Naukri, LinkedIn and company career sites. Names shown for source attribution only
          — no endorsement or partnership is claimed.
        </p>
      </div>
    </section>
  );
}
