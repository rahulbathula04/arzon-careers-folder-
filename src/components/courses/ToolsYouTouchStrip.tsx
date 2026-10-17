import { Wrench, Building2 } from "lucide-react";

const INDUSTRY_DOMAINS: Record<string, string> = {
  Pharmacovigilance: "Global CROs · Indian Pharma GCCs · Multinational Safety Hubs",
  "Medical Coding": "US Health Systems · Revenue Cycle Managers · Inpatient Billing Units",
  "Clinical Research": "Global CRO Networks · Phase I–IV Trial Units · Site Management Hubs",
  "SAS Clinical": "Regulatory Biostatistics Units · Statistical Computing GCCs · CRO Data Units",
};

/**
 * 70%-band content for /courses - the actual tools graduates use on the job,
 * grouped by track. No Apply CTA in this block.
 */
const TRACKS: { name: string; tools: string[] }[] = [
  { name: "Pharmacovigilance", tools: ["Enterprise Safety DB", "ICSR Gateways", "Standardized Medical Coding", "Drug Product Dictionaries", "E2B(R3) Transmission"] },
  { name: "Medical Coding", tools: ["ICD-10-CM", "CPT", "HCPCS", "Clinical Encoders", "CAC Software"] },
  {
    name: "Clinical Research",
    tools: ["Electronic Data Capture (EDC)", "eTMF Platforms", "eCRF Workflows", "Query Management", "ICH-GCP"],
  },
  { name: "SAS Clinical", tools: ["Clinical Statistical Programming", "SDTM", "ADaM", "Define-XML", "CDISC Validation"] },
];

export function ToolsYouTouchStrip() {
  return (
    <section
      aria-label="Tools you'll touch in each programme"
      className="tone-light rounded-3xl border border-border bg-gradient-to-b from-white to-slate-50 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8"
    >
      <div className="flex items-center gap-2">
        <Wrench className="h-4 w-4 text-[color:var(--teal-deep)]" />
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]">
          Tools you'll touch
        </p>
      </div>
      <h2 className="mt-2 font-display text-h3 font-bold leading-tight text-ink sm:text-h2">
        The exact software fresh hires open on day one.
      </h2>
      <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground">
        Every tool below is the literal stack pulled from 100–200 live Indian JDs per role. No
        "industry-standard" hand-waving - these are the strings the recruiter is grepping your CV
        for.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {TRACKS.map((t) => (
          <div
            key={t.name}
            className="tone-light rounded-2xl border border-border bg-white p-5 shadow-[0_4px_14px_-6px_rgba(15,23,42,0.12)] transition hover:border-border hover:shadow-[0_10px_24px_-12px_rgba(15,23,42,0.2)]"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-body-sm font-bold text-ink">{t.name}</p>
              <span className="rounded-full bg-accent-emerald-soft px-2 py-0.5 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-accent-emerald-deep ring-1 ring-sky-200">
                Day one
              </span>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {t.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full bg-muted px-2.5 py-1 font-mono text-micro font-semibold text-ink ring-1 ring-border"
                >
                  {tool}
                </li>
              ))}
            </ul>
            <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-micro font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <Building2 className="h-3 w-3" /> Hiring Hubs · {INDUSTRY_DOMAINS[t.name]}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-center font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Stack refreshed every quarter from the live JD pool
      </p>
    </section>
  );
}
