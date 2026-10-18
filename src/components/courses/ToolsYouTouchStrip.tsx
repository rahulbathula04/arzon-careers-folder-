import { Wrench, Building2, Info, CheckCircle2 } from "lucide-react";

const INDUSTRY_DOMAINS: Record<string, string> = {
  Pharmacovigilance: "Global CROs · Indian Pharma GCCs · Multinational Safety Hubs",
  "Medical Coding": "US Health Systems · Revenue Cycle Managers · Inpatient Billing Units",
  "Clinical Data Management": "Global CRO Networks · Phase I–IV Trial Units · Site Management Hubs",
  "Clinical SAS Programming": "Regulatory Biostatistics Units · Statistical Computing GCCs · CRO Data Units",
};

/**
 * Tools You Will Touch in Hands-On Lab Work (Brand Guidelines v1.0 • 2026)
 * Real tools and dictionaries encountered in entry-level clinical safety and informatics workflows.
 */
const TRACKS: { name: string; tools: string[] }[] = [
  {
    name: "Pharmacovigilance",
    tools: [
      "Enterprise Safety DB",
      "ICSR Gateways",
      "MedDRA Dictionary",
      "WHODrug",
      "E2B(R3) Transmission",
    ],
  },
  {
    name: "Medical Coding",
    tools: [
      "ICD-10-CM",
      "CPT Codes",
      "HCPCS Level II",
      "Clinical Encoders",
      "CAC Systems",
    ],
  },
  {
    name: "Clinical Data Management",
    tools: [
      "Electronic Data Capture (EDC)",
      "CDASH Standards",
      "eCRF Workflows",
      "Discrepancy / Query Logs",
      "ICH-GCP Guidelines",
    ],
  },
  {
    name: "Clinical SAS Programming",
    tools: [
      "Base SAS",
      "SAS Macros & SQL",
      "SDTM Domains",
      "ADaM Datasets",
      "Pinnacle 21 Community",
    ],
  },
];

export function ToolsYouTouchStrip() {
  return (
    <section
      aria-labelledby="tools-strip-heading"
      className="py-12 sm:py-16 border-t border-[#E4EAF2]"
    >
      <div className="tone-light card-light rounded-3xl border border-[#E4EAF2] bg-white p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] shadow-2xs tone-light card-light">
            <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
            <span>HANDS-ON LAB ENVIRONMENTS</span>
          </div>
        </div>

        <h2
          id="tools-strip-heading"
          className="mt-3 text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight"
        >
          Software, Dictionaries &amp; Standards You Will Work With
        </h2>
        <p className="mt-2 max-w-2xl text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
          Reverse-engineered from 2,000+ Indian entry-level healthcare and data JDs. You build your portfolio projects with the exact systems and standards recruiters look for.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {TRACKS.map((t) => (
            <div
              key={t.name}
              className="tone-light card-light rounded-2xl border border-[#E4EAF2] bg-[#F8FAFC] p-5 transition hover:bg-white hover:border-[#1557D6]/30 hover:shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-base font-bold text-[#071A4A]">{t.name}</p>
                <span className="rounded-full bg-[#E6F7F1] border border-[#10B981]/25 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#081F38]">
                  Day-one skills
                </span>
              </div>

              <ul className="mt-3.5 flex flex-wrap gap-1.5">
                {t.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-md bg-white border border-slate-200/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#071A4A] shadow-2xs tone-light card-light"
                  >
                    {tool}
                  </li>
                ))}
              </ul>

              <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#64748B]">
                <Building2 className="h-3.5 w-3.5 text-[#1557D6]" />
                <span className="truncate">{INDUSTRY_DOMAINS[t.name]}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Educational Simulation Disclosure */}
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] p-4 text-xs text-[#64748B] tone-light card-light">
          <Info className="h-4 w-4 shrink-0 text-[#1557D6] mt-0.5" />
          <p className="leading-relaxed font-normal">
            <strong className="text-[#071A4A] font-semibold">Educational Simulation Disclosure:</strong> Software tools, proprietary databases, and medical coding dictionaries are taught conceptually using synthetic, anonymized training scenarios and compliant sandbox environments. Arzon Careers does not sell proprietary enterprise software licenses.
          </p>
        </div>
      </div>
    </section>
  );
}
