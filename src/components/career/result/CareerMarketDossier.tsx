import { Briefcase, Building2, TrendingUp, DollarSign, CheckCircle2, ChevronRight } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
}

const MARKET_METRICS: Record<
  string,
  {
    targetRole: string;
    entryRange: string;
    midRange: string;
    leadRange: string;
    tools: string[];
    employers: string[];
    dayInLife: string;
  }
> = {
  pharmacovigilance: {
    targetRole: "Drug Safety / Pharmacovigilance Associate",
    entryRange: "₹3.5L – ₹5.5L",
    midRange: "₹6.5L – ₹10.5L",
    leadRange: "₹14.0L – ₹22.0L+",
    tools: ["Oracle Argus Safety", "MedDRA 27.0", "WHO-DD", "ICH E2B(R3)", "Safety Narratives"],
    employers: ["Novartis", "Parexel", "IQVIA", "Cognizant", "TCS Life Sciences", "Pfizer"],
    dayInLife: "Screening spontaneous adverse event reports, coding medical events with MedDRA LLTs, evaluating drug-event causality, and drafting concise clinical safety narratives under regulatory timeline constraints.",
  },
  "clinical-data-management": {
    targetRole: "Clinical Data Associate / Data Manager",
    entryRange: "₹3.8L – ₹6.0L",
    midRange: "₹7.0L – ₹11.5L",
    leadRange: "₹15.0L – ₹24.0L+",
    tools: ["Medidata Rave", "Oracle InForm", "EDC Platforms", "Query Management", "CDASH / SDTM"],
    employers: ["IQVIA", "Icon plc", "Syneos Health", "Wipro Life Sciences", "Novartis"],
    dayInLife: "Validating clinical trial electronic case report forms (eCRFs), issuing discrepancy queries to trial sites, reconciling serious adverse event tables, and preparing trial databases for interim and final lock.",
  },
  "medical-coding": {
    targetRole: "Medical Coding Specialist (Outpatient/Inpatient)",
    entryRange: "₹3.0L – ₹5.0L",
    midRange: "₹5.5L – ₹8.5L",
    leadRange: "₹11.0L – ₹16.0L+",
    tools: ["ICD-10-CM", "CPT-4 / HCPCS", "3M Encoder", "Medical Terminology", "HIPAA Compliance"],
    employers: ["Omega Healthcare", "Optum (UnitedHealth)", "Episource", "CorroHealth", "Cognizant"],
    dayInLife: "Translating patient surgical charts, doctor clinical notes, and discharge summaries into standardized alphanumeric codes for international healthcare payers with strict 95%+ audit accuracy requirements.",
  },
  "regulatory-affairs": {
    targetRole: "Regulatory Affairs Associate / Specialist",
    entryRange: "₹4.0L – ₹6.5L",
    midRange: "₹8.0L – ₹13.0L",
    leadRange: "₹16.0L – ₹28.0L+",
    tools: ["eCTD Submissions", "Module 1-5 Dossier Structuring", "CDSCO / USFDA Guidelines", "Labeling QA"],
    employers: ["Sun Pharma", "Dr. Reddy's Laboratories", "Cipla", "Lupin", "Viatris"],
    dayInLife: "Compiling drug master files, reviewing chemistry and clinical dossier sections, interacting with regulatory authorities, and tracking global submission lifecycle variations.",
  },
  "clinical-saas": {
    targetRole: "Healthcare SaaS / Clinical Solutions Specialist",
    entryRange: "₹5.0L – ₹8.0L",
    midRange: "₹9.5L – ₹16.0L",
    leadRange: "₹18.0L – ₹30.0L+",
    tools: ["Veeva Vault", "Salesforce Health Cloud", "Healthcare Workflow Modeling", "Product Demos"],
    employers: ["Veeva Systems", "Siemens Healthineers", "Cerner / Oracle Health", "HealthPlix", "GE Healthcare"],
    dayInLife: "Bridging the gap between clinical teams and software engineering, onboarding hospital enterprises onto clinical software systems, and ensuring technology solutions fit frontline medical protocols.",
  },
  "ai-intelligence": {
    targetRole: "Healthcare AI / Clinical Data Scientist",
    entryRange: "₹6.0L – ₹10.0L",
    midRange: "₹12.0L – ₹20.0L",
    leadRange: "₹22.0L – ₹40.0L+",
    tools: ["Python / PyTorch", "BioBERT / Clinical LLMs", "FHIR / HL7 Standards", "SQL / Cloud"],
    employers: ["Microsoft Health", "Google Health", "Philips Healthcare", "Wipro AI Labs", "Cognizant AI"],
    dayInLife: "Designing predictive models for patient triage, developing automated medical text extraction pipelines, and deploying clinical decision support algorithms in compliant healthcare cloud environments.",
  },
};

export function CareerMarketDossier({ result }: Props) {
  const pathSlug =
    result.archetype?.topPaths?.[0]?.slug ??
    result.archetype?.pathSlug ??
    "pharmacovigilance";

  const market =
    MARKET_METRICS[pathSlug] ||
    MARKET_METRICS["pharmacovigilance"];

  return (
    <section className="space-y-6">
      {/* ─── Role Reality & Core Profile ─────────────────────────── */}
      <div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">
            <Briefcase className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">
              INDUSTRY SPECIFICATION
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#071A4A]">
              Target Role & Market Reality
            </h2>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/60 p-5">
          <span className="text-xs font-mono uppercase text-[#1557D6] font-bold block">
            RECOMMENDED CAREER TITLE
          </span>
          <p className="mt-1 font-serif text-xl sm:text-2xl font-bold text-[#071A4A]">
            {market.targetRole}
          </p>
          <p className="mt-2 text-xs sm:text-sm text-[#3F4A60] leading-relaxed">
            {market.dayInLife}
          </p>
        </div>

        {/* 5-Year Compensation Progression Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#69758A] font-bold">
              COMPENSATION PROGRESSION (INDIAN CRO / MNC HUBS)
            </span>
            <span className="text-[11px] text-[#69758A]">Source: Arzon 2026 Industry Survey</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-center">
              <span className="text-[11px] font-mono text-[#69758A] block uppercase">
                Level 1 · Trainee / Fresher (0–1 yr)
              </span>
              <span className="mt-2 font-serif text-2xl font-bold text-[#071A4A] block">
                {market.entryRange}
              </span>
              <span className="text-[11px] text-[#69758A] block mt-1">Starting CTC Package</span>
            </div>

            <div className="rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/40 p-4 text-center">
              <span className="text-[11px] font-mono text-[#1557D6] block uppercase font-semibold">
                Level 2 · Specialist (2–4 yrs)
              </span>
              <span className="mt-2 font-serif text-2xl font-bold text-[#1557D6] block">
                {market.midRange}
              </span>
              <span className="text-[11px] text-[#69758A] block mt-1">Independent Case Processor</span>
            </div>

            <div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-center">
              <span className="text-[11px] font-mono text-[#69758A] block uppercase">
                Level 3 · Lead / Manager (5–8 yrs)
              </span>
              <span className="mt-2 font-serif text-2xl font-bold text-[#071A4A] block">
                {market.leadRange}
              </span>
              <span className="text-[11px] text-[#69758A] block mt-1">Team & Quality Authority</span>
            </div>
          </div>
        </div>

        {/* Expected Tool Stack & Employers */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 pt-6 border-t border-[#E4EAF2]">
          {/* Tools */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#69758A] font-bold block mb-3">
              PRODUCTION TOOL COMPETENCIES
            </span>
            <div className="flex flex-wrap gap-2">
              {market.tools.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4EAF2] bg-[#FAFBFD] px-3 py-1.5 text-xs font-medium text-[#071A4A]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#1557D6]" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Hiring Ecosystem */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#69758A] font-bold block mb-3">
              TOP HIRING ECOSYSTEM IN INDIA
            </span>
            <div className="flex flex-wrap gap-2">
              {market.employers.map((emp) => (
                <span
                  key={emp}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4EAF2] bg-white tone-light card-light px-3 py-1.5 text-xs font-medium text-[#3F4A60] shadow-2xs"
                >
                  <Building2 className="h-3.5 w-3.5 text-[#69758A]" />
                  {emp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
