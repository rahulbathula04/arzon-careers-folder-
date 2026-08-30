import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  TrendingUp,
  FileCheck2,
  ExternalLink,
  Laptop,
  GraduationCap,
} from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";

interface CareerTrack {
  id: string;
  name: string;
  shortCode: string;
  tagline: string;
  description: string;
  dayOneTasks: string[];
  primaryTools: string[];
  topEmployers: string[];
  eligibility: string;
  salary: {
    y1: string;
    y3: string;
    y5: string;
  };
  atsKeywords: string[];
  courseRoute: string;
}

const CAREER_TRACKS: CareerTrack[] = [
  {
    id: "pv",
    name: "Pharmacovigilance (PV)",
    shortCode: "PV-OPS",
    tagline: "Drug Safety, ICSR Case Processing & Aggregate Narrative Writing",
    description:
      "Triage adverse event reports from clinical trials and post-marketing surveillance. Process individual case safety reports (ICSRs) compliant with US FDA 21 CFR Part 11 and ICH E2B(R3) standards.",
    dayOneTasks: [
      "Process 4–6 spontaneous ICSR cases daily using Oracle Argus Safety.",
      "Assign precise MedDRA Lowest Level Terms (LLT) and Preferred Terms (PT).",
      "Perform duplicate search and medical narrative authoring for expedited 7/15-day cases.",
      "Evaluate causality and dechallenge/rechallenge outcomes under senior physician review.",
    ],
    primaryTools: ["Oracle Argus Safety 8.4", "MedDRA 27.0", "ARISg", "CIOMS-I", "ICH E2B(R3)"],
    topEmployers: ["Novartis", "IQVIA", "Parexel", "Pfizer", "Dr. Reddy's", "Cognizant Life Sciences"],
    eligibility: "Pharm.D, B.Pharm, M.Pharm, MBBS, BDS, BAMS, B.Sc/M.Sc Life Sciences",
    salary: {
      y1: "₹4.0L – ₹5.5L",
      y3: "₹7.5L – ₹10.0L",
      y5: "₹14.0L – ₹22.0L",
    },
    atsKeywords: ["Oracle Argus", "ICSR", "MedDRA", "MedWatch 3500A", "PBRER", "ICH-GCP"],
    courseRoute: "/pv-associate",
  },
  {
    id: "medical-coding",
    name: "Medical Coding & Billing",
    shortCode: "MED-CODE",
    tagline: "ICD-10-CM, CPT-4, HCPCS & US Healthcare Revenue Auditing",
    description:
      "Translate clinical encounters, operative notes, and diagnostic reports into standardized alphanumeric codes for US hospital reimbursement and compliance auditing.",
    dayOneTasks: [
      "Abstract clinical chart notes for inpatient and outpatient surgical procedures.",
      "Assign primary diagnosis and procedural codes compliant with Official Coding Guidelines.",
      "Resolve coding edits and modifier discrepancies (e.g. Modifiers 25, 59) to prevent claim denials.",
      "Prepare for CPC / CCS certification benchmarks required by US revenue cycle management teams.",
    ],
    primaryTools: ["ICD-10-CM", "CPT-4", "HCPCS Level II", "3M Encoder", "Optum CAC"],
    topEmployers: ["Optum (UnitedHealth)", "Omega Healthcare", "GeBBS", "Episource", "CorroHealth"],
    eligibility: "B.Pharm, B.Sc Life Sciences, Biotechnology, Nursing, Allied Health",
    salary: {
      y1: "₹3.8L – ₹5.0L",
      y3: "₹6.5L – ₹8.5L",
      y5: "₹12.0L – ₹18.0L",
    },
    atsKeywords: ["ICD-10-CM", "CPT Modifiers", "Anatomy & Physiology", "CPC Exam", "HCPCS", "HIPAA"],
    courseRoute: "/courses/medical-coding",
  },
  {
    id: "cdm",
    name: "Clinical Research & CDM",
    shortCode: "CLIN-CDM",
    tagline: "ICH-GCP Trial Coordination & Medidata RAVE eCRF Data Management",
    description:
      "Manage end-to-end clinical trial data pipelines from site initiation through database lock. Validate electronic Case Report Forms (eCRFs) and issue clinical queries.",
    dayOneTasks: [
      "Review and clean clinical trial patient data captured in Electronic Data Capture (EDC) systems.",
      "Raise and resolve data clarification forms (queries) with global investigator trial sites.",
      "Execute Data Validation Specifications (DVS) and manual discrepancy checks.",
      "Assist in serious adverse event (SAE) reconciliation between clinical and safety databases.",
    ],
    primaryTools: ["Medidata RAVE", "Oracle InForm", "Oracle Clinical", "ICH-GCP E6(R2)", "CDISC CDASH"],
    topEmployers: ["IQVIA", "Syneos Health", "ICON plc", "Labcorp Drug Development", "TCS Life Sciences"],
    eligibility: "B.Pharm, Pharm.D, M.Sc Biotechnology, Microbiology, Biochemistry, B.Sc Nursing",
    salary: {
      y1: "₹4.0L – ₹5.2L",
      y3: "₹7.0L – ₹9.5L",
      y5: "₹13.5L – ₹20.0L",
    },
    atsKeywords: ["Medidata RAVE", "eCRF Validation", "ICH-GCP", "Query Management", "Database Lock", "SOPs"],
    courseRoute: "/courses/clinical-research",
  },
  {
    id: "medical-writing",
    name: "Regulatory & Medical Writing",
    shortCode: "MED-WRITE",
    tagline: "Clinical Study Reports (ICH E3), Investigator Brochures & Protocols",
    description:
      "Author scientific and regulatory documents for global health authorities (US FDA, EMA, PMDA). Synthesize complex pharmacokinetic, efficacy, and safety data.",
    dayOneTasks: [
      "Draft clinical study protocols and patient informed consent documents (ICD).",
      "Write ICH E3 compliant Clinical Study Reports (CSRs) from statistical tables and listings.",
      "Prepare patient safety narratives for serious adverse events (SAEs).",
      "Format and quality-check regulatory submission documents according to style guides.",
    ],
    primaryTools: ["ICH E3 Guidelines", "Veeva Vault", "EndNote", "Documentum", "eCTD Module 2/5"],
    topEmployers: ["Novartis", "AstraZeneca", "Sanofi", "Parexel", "Cactus Communications", "Indegene"],
    eligibility: "Pharm.D, M.Pharm (Pharmacology), MBBS, BDS, M.Sc Life Sciences with strong writing skills",
    salary: {
      y1: "₹4.5L – ₹6.5L",
      y3: "₹8.0L – ₹12.0L",
      y5: "₹16.0L – ₹26.0L",
    },
    atsKeywords: ["Clinical Study Report", "ICH E3", "Investigator Brochure", "Patient Narratives", "CSR", "Module 2.7"],
    courseRoute: "/courses/medical-writing",
  },
  {
    id: "regulatory-affairs",
    name: "Regulatory Affairs (RA)",
    shortCode: "REG-AFF",
    tagline: "eCTD Dossier Assembly, DMF / ANDA Submissions & Lifecycle Management",
    description:
      "Navigate global pharmaceutical regulatory frameworks. Prepare, compile, and maintain Electronic Common Technical Document (eCTD) dossiers for product registrations.",
    dayOneTasks: [
      "Compile eCTD Module 1–5 documentation for generic ANDA and NDA filings.",
      "Review Chemistry, Manufacturing, and Controls (CMC) technical data for regulatory variations.",
      "Coordinate regulatory query responses and submission deficiency letters from health authorities.",
      "Track product licenses and post-approval variation submissions across global markets.",
    ],
    primaryTools: ["eCTD Lorenz DocuBridge", "Extedo", "US FDA ESG", "EU CESP", "DMF Guidelines"],
    topEmployers: ["Sun Pharma", "Dr. Reddy's", "Cipla", "Lupin", "Aurobindo", "Mylan (Viatris)"],
    eligibility: "B.Pharm, M.Pharm (Pharmaceutics/DRA/Chemistry), M.Sc Chemistry, Life Sciences",
    salary: {
      y1: "₹3.8L – ₹5.2L",
      y3: "₹7.0L – ₹9.5L",
      y5: "₹14.0L – ₹21.0L",
    },
    atsKeywords: ["eCTD Module 1-5", "ANDA Filing", "CMC Variations", "US FDA", "DMF", "ICH CTD"],
    courseRoute: "/courses/regulatory-affairs",
  },
  {
    id: "healthcare-analytics",
    name: "Healthcare & Clinical Data Analytics",
    shortCode: "HEALTH-ANALYTICS",
    tagline: "Clinical SAS (SDTM/ADaM), Real-World Evidence & Statistical Tables",
    description:
      "Transform raw clinical trial datasets into standardized CDISC SDTM and ADaM structures. Program safety and efficacy statistical summary tables, listings, and figures.",
    dayOneTasks: [
      "Write SAS macros and Base SAS scripts to generate clinical trial TLFs (Tables, Listings, Figures).",
      "Map raw EDC clinical datasets to CDISC SDTM domains (DM, AE, LB, VS, CM).",
      "Generate ADaM analysis datasets (ADSL, ADAE) according to Statistical Analysis Plans (SAP).",
      "Perform double-programming validation to ensure 100% data fidelity for regulatory submissions.",
    ],
    primaryTools: ["Base / Advanced SAS 9.4", "CDISC SDTM v1.7", "ADaM v1.1", "R for Clinical Trials", "SQL"],
    topEmployers: ["Cytel", "IQVIA", "Parexel", "Novartis", "Wipro Life Sciences", "Accenture Healthcare"],
    eligibility: "B.Pharm, M.Pharm, B.Sc/M.Sc Statistics, Biotechnology, Bioinformatics, Engineering",
    salary: {
      y1: "₹4.8L – ₹7.2L",
      y3: "₹9.0L – ₹14.0L",
      y5: "₹18.0L – ₹30.0L",
    },
    atsKeywords: ["Clinical SAS", "CDISC SDTM", "ADaM", "TLFs", "Base SAS", "Define.xml", "SAP"],
    courseRoute: "/courses/healthcare-analytics",
  },
];

export function CareerExplorerTerminal() {
  const [activeTrackId, setActiveTrackId] = useState(CAREER_TRACKS[0].id);
  const activeTrack = CAREER_TRACKS.find((t) => t.id === activeTrackId) || CAREER_TRACKS[0];

  return (
    <section id="career-explorer" className="py-16 sm:py-24 border-b border-stone-200 bg-white tone-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="space-y-3 max-w-2xl">
            <PremiumChip variant="navy" size="md">
              THE HEALTHCARE CAREER EXPLORER
            </PremiumChip>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              Explore 6 High-Growth Corporate Healthcare Career Tracks
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
              Understand the day-one operational reality, salary trajectories, required software tools, and employer expectations before making a career commitment.
            </p>
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="font-mono text-xs text-stone-500 uppercase tracking-wider block">
              EMPIRICAL DATA SOURCE
            </span>
            <span className="font-mono text-sm font-bold text-[#1B3F8B]">
              300+ Verified Requisitions Decoded
            </span>
          </div>
        </div>

        {/* 6-Track Navigation Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {CAREER_TRACKS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTrackId(t.id)}
              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                activeTrackId === t.id
                  ? "bg-[#1B3F8B] text-slate-50 border-[#1B3F8B] shadow-sm ring-2 ring-[#1B3F8B]/20"
                  : "bg-[#FAF8F5] text-stone-700 hover:bg-stone-100 border-stone-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider opacity-80">
                  {t.shortCode}
                </span>
                {activeTrackId === t.id && (
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
              </div>
              <p className="font-serif text-xs sm:text-sm font-bold leading-tight line-clamp-2">
                {t.name}
              </p>
            </button>
          ))}
        </div>

        {/* Active Track Deep-Dive Console */}
        <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-10 shadow-xs space-y-8">
          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-md">
                  {activeTrack.shortCode}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  {activeTrack.tagline}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                {activeTrack.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                {activeTrack.description}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                to={activeTrack.courseRoute}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-sm cursor-pointer"
              >
                <span>View Full Curriculum &amp; Tool Stack</span>
                <ArrowRight className="h-4 w-4 text-slate-50" />
              </Link>
            </div>
          </div>

          {/* 3-Column Detailed Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: What You Actually Do on Day One (4-Span) */}
            <div className="lg:col-span-5 rounded-xl bg-white tone-light border border-stone-200 p-5 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-200">
                <Laptop className="h-4 w-4 text-[#1B3F8B]" />
                <span>Day-One Operational Tasks</span>
              </div>
              <ul className="space-y-2.5">
                {activeTrack.dayOneTasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 font-sans leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Center: Tools & Top Employers (3-Span) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Primary Software Tools */}
              <div className="rounded-xl bg-white tone-light border border-stone-200 p-4 space-y-2.5 shadow-2xs">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  PRIMARY SOFTWARE &amp; PROTOCOLS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTrack.primaryTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 font-mono text-[11px] font-bold border border-stone-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Who Hires in India */}
              <div className="rounded-xl bg-white tone-light border border-stone-200 p-4 space-y-2.5 shadow-2xs">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  TIER-1 HIRING ENTERPRISES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTrack.topEmployers.map((emp, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-sky-50 text-[#1B3F8B] font-mono text-[11px] font-bold border border-sky-200"
                    >
                      {emp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Salary Progression & Eligibility (3-Span) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-xl bg-white tone-light border border-stone-200 p-5 space-y-3 shadow-2xs">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#8A6D1F] block pb-1 border-b border-stone-200">
                  5-YEAR SALARY TRAJECTORY
                </span>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Year 1 (Entry):</span>
                    <span className="font-bold text-stone-900">{activeTrack.salary.y1}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Year 3 (Sr Assoc):</span>
                    <span className="font-bold text-[#1B3F8B]">{activeTrack.salary.y3}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Year 5+ (Lead/Mgr):</span>
                    <span className="font-bold text-emerald-700">{activeTrack.salary.y5}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white tone-light border border-stone-200 p-4 space-y-1.5 shadow-2xs text-xs">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                  ELIGIBLE DEGREES
                </span>
                <p className="text-stone-700 font-sans font-medium leading-relaxed text-[11px]">
                  {activeTrack.eligibility}
                </p>
              </div>
            </div>
          </div>

          {/* ATS Keyword Triggers Footer */}
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#1B3F8B] font-mono font-bold">
              <FileCheck2 className="h-4 w-4 shrink-0" />
              <span>ALGORITHMIC ATS KEYWORD TRIGGERS:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
              {activeTrack.atsKeywords.map((kw, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-white tone-light text-stone-800 border border-stone-200">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
