import { Calendar, CheckCircle2, ArrowRight, Layers, FileCheck } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
}

const ROADMAP_PHASES: Record<
  string,
  {
    title: string;
    phases: { month: string; focus: string; deliverables: string[] }[];
    capstone: string;
  }
> = {
  pharmacovigilance: {
    title: "Pharmacovigilance 90-Day Role Readiness",
    phases: [
      {
        month: "Month 1 · Foundations",
        focus: "Clinical Safety Vocabulary & Regulatory Frameworks",
        deliverables: [
          "ICH-E2A, E2B(R3), and GVP Module VI mastery",
          "Standardized medical coding 5-tier hierarchy drills (SOC down to LLT)",
          "Anatomy of an Individual Case Safety Report (ICSR)",
        ],
      },
      {
        month: "Month 2 · Production Tooling",
        focus: "Simulated Adverse Event Intake & Narrative Drafting",
        deliverables: [
          "Hands-on enterprise safety database workflow simulation",
          "Causality assessment via WHO-UMC & Naranjo algorithms",
          "Writing medically precise, audit-defensible safety narratives",
        ],
      },
      {
        month: "Month 3 · Proof of Work",
        focus: "Portfolio Assembly & Placement Readiness",
        deliverables: [
          "Complete 15-case adverse event portfolio with full audit trail",
          "Aggregate reporting overview (PSUR / PBRER fundamentals)",
          "Technical interview clearance with industry PV mentors",
        ],
      },
    ],
    capstone: "Process and QA a realistic multi-source adverse event dossier from clinical intake to E2B XML export.",
  },
  "clinical-data-management": {
    title: "Clinical Data Management 90-Day Roadmap",
    phases: [
      {
        month: "Month 1 · Foundations",
        focus: "Clinical Trial Protocols & Data Flow Architecture",
        deliverables: [
          "ICH-GCP guidelines & 21 CFR Part 11 electronic records",
          "eCRF design principles & CDASH variable standards",
          "Data Management Plan (DMP) structuring",
        ],
      },
      {
        month: "Month 2 · Production Tooling",
        focus: "EDC Navigation & Discrepancy Management",
        deliverables: [
          "Hands-on navigation in enterprise EDC platforms",
          "Discrepancy identification & site query generation",
          "Lab data normalization & local lab range mapping",
        ],
      },
      {
        month: "Month 3 · Proof of Work",
        focus: "Reconciliation & Database Lock Simulation",
        deliverables: [
          "SAE reconciliation between clinical database and safety database",
          "Pre-lock audit checklist execution & clean database sign-off",
          "Technical CDM portfolio and mock technical interview clearance",
        ],
      },
    ],
    capstone: "Clean and freeze a multi-center Phase III clinical trial dataset with documented query audit trails.",
  },
  "medical-coding": {
    title: "Medical Coding 90-Day Accuracy Mastery",
    phases: [
      {
        month: "Month 1 · Foundations",
        focus: "Human Anatomy, Pathophysiology & Medical Nomenclature",
        deliverables: [
          "Comprehensive medical roots, prefixes, and anatomical systems",
          "ICD-10-CM official conventions, instructional notes & chapters",
          "Identifying principal diagnosis vs secondary comorbidities",
        ],
      },
      {
        month: "Month 2 · Production Tooling",
        focus: "CPT-4 Procedure Coding & Modifiers",
        deliverables: [
          "Evaluation & Management (E/M) chart auditing drills",
          "Surgical section coding with anatomical specificity",
          "Modifier applications (-25, -59, -76) without payer rejections",
        ],
      },
      {
        month: "Month 3 · Proof of Work",
        focus: "Timed Production Batches & CPC Exam Clearance",
        deliverables: [
          "100 realistic patient chart abstractions across 5 specialties",
          "Audit accuracy benchmarking maintaining ≥95% score threshold",
          "AAPC/AHIMA certification test simulations & resume clearance",
        ],
      },
    ],
    capstone: "Abstract and accurately code a 50-chart multi-specialty clinical outpatient portfolio.",
  },
  "regulatory-affairs": {
    title: "Regulatory Affairs 90-Day Dossier Track",
    phases: [
      {
        month: "Month 1 · Foundations",
        focus: "Global Drug Lifecycle & Submission Guidelines",
        deliverables: [
          "eCTD 5-module hierarchy (Modules 1 through 5)",
          "CDSCO New Drugs & Clinical Trials Rules 2019",
          "US FDA 21 CFR Part 312 (IND) and Part 314 (NDA) pathways",
        ],
      },
      {
        month: "Month 2 · Production Tooling",
        focus: "Chemistry, Manufacturing & Controls (CMC) & Labeling",
        deliverables: [
          "Drafting Summary of Product Characteristics (SmPC) & Package Inserts",
          "CMC documentation review and variation filing structures",
          "Query response formulation for regulatory agency queries",
        ],
      },
      {
        month: "Month 3 · Proof of Work",
        focus: "Miniature Submission Package & Interview Clearance",
        deliverables: [
          "Complete miniature eCTD dossier assembly with hyperlinked index",
          "Post-approval lifecycle maintenance and annual report filings",
          "Regulatory interview defense with senior industry managers",
        ],
      },
    ],
    capstone: "Construct a complete miniature regulatory dossier module compliant with eCTD specifications.",
  },
  "sas-clinical": {
    title: "SAS Clinical 90-Day Biostatistical Track",
    phases: [
      {
        month: "Month 1 · Foundations",
        focus: "Base SAS Architecture & Data Manipulation",
        deliverables: [
          "Base SAS syntax, DATA step processing & PROC SQL queries",
          "Functions, conditional processing & formatting clinical variables",
          "Clinical trial protocol data structure fundamentals",
        ],
      },
      {
        month: "Month 2 · Production Tooling",
        focus: "CDISC SDTM & ADaM Dataset Building",
        deliverables: [
          "CDISC SDTM domain creation (DM, AE, LB, VS)",
          "ADaM dataset structures (ADSL, ADAE) & derivation rules",
          "PROC COMPARE data validation and spec compliance checks",
        ],
      },
      {
        month: "Month 3 · Proof of Work",
        focus: "Clinical TLFs (Tables, Listings & Figures)",
        deliverables: [
          "Generating safety summary tables & adverse event incidence rates",
          "Macro programming for automated clinical trial reporting",
          "CDISC compliant statistical package assembly for regulatory submission",
        ],
      },
    ],
    capstone: "Derive SDTM and ADaM clinical datasets and generate verified TLFs following CDISC implementation standards.",
  },
};

export function CareerRoadmap({ result }: Props) {
  const pathSlug =
    result.archetype?.topPaths?.[0]?.slug ??
    result.archetype?.pathSlug ??
    "pharmacovigilance";

  const roadmap =
    ROADMAP_PHASES[pathSlug] ||
    ROADMAP_PHASES["pharmacovigilance"];

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-4 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_30px_-5px_rgba(7,26,74,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] w-full max-w-full min-w-0 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-blue-700 mb-2.5 shadow-2xs">
            <Calendar className="h-3.5 w-3.5 text-blue-600" />
            <span className="truncate">EXECUTION BLUEPRINT · 90-DAY ACCELERATION</span>
          </div>
          <h2 className="font-serif text-xl sm:text-3xl font-bold tracking-tight text-[#081F38] break-words">
            90-Day Proof-of-Work Roadmap
          </h2>
          <p className="mt-1 text-sm text-slate-600 max-w-3xl leading-relaxed font-sans">
            Industry hiring managers do not hire for passive course certificates. They hire candidates who can prove operational competence from day one. Here is the structured 3-month progression:
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-2xl shadow-2xs">
          <Layers className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="text-xs font-mono font-bold text-[#081F38]">3 Structured Sprints</span>
        </div>
      </div>

      {/* 3 Phases Grid (Apple Pro Progressive Sprint Cards) */}
      <div className="mt-6 grid gap-4.5 lg:grid-cols-3 items-stretch">
        {roadmap.phases.map((phase, idx) => {
          const isMonth3 = idx === 2;
          const isMonth2 = idx === 1;
          const weekRanges = ["Weeks 1–4", "Weeks 5–8", "Weeks 9–12"];

          return (
            <div
              key={idx}
              className={`flex flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all duration-200 shadow-2xs ${
                isMonth3
                  ? "border-emerald-300/90 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/30 hover:border-emerald-400"
                  : isMonth2
                    ? "border-blue-200/90 bg-gradient-to-b from-blue-50/40 via-white to-slate-50/30 hover:border-blue-300"
                    : "border-slate-200/90 bg-white hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-[0.14em] ${
                        isMonth3 ? "text-emerald-700" : isMonth2 ? "text-blue-700" : "text-blue-600"
                      }`}
                    >
                      MONTH 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">· {weekRanges[idx]}</span>
                  </div>
                  <span className="h-6 w-6 rounded-lg bg-slate-100/90 border border-slate-200/80 grid place-items-center text-[10px] font-mono font-bold text-[#081F38] shadow-2xs">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="mt-3.5 text-sm sm:text-base font-bold text-[#081F38] font-sans leading-snug">
                  {phase.focus}
                </h3>

                <ul className="mt-4 space-y-3 text-xs text-slate-600 font-sans">
                  {phase.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <div className="h-4 w-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/70 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Phase Outcome</span>
                <span className={`font-bold ${isMonth3 ? "text-emerald-700" : "text-blue-700"}`}>
                  {isMonth3 ? "Placement Clear" : "Casework Verified"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Capstone Proof-of-Work Box (Executive Asset Banner) */}
      <div className="mt-6 rounded-3xl border border-slate-200/90 bg-gradient-to-br from-blue-50/50 via-white to-slate-50/50 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
        <div className="h-12 w-12 rounded-2xl bg-[#081F38] text-white flex items-center justify-center shrink-0 shadow-sm border border-slate-700">
          <FileCheck className="h-6 w-6 text-blue-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] font-mono uppercase text-blue-700 font-bold tracking-[0.14em]">
              REQUIRED CAPSTONE PROOF-OF-WORK
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 motion-safe:animate-pulse" />
              Auditable Artifact
            </span>
          </div>
          <p className="text-sm font-semibold text-[#081F38] leading-relaxed font-sans">
            {roadmap.capstone}
          </p>
          <p className="mt-1 text-xs text-slate-500 font-sans">
            Verifiable in Round 2 Technical Case Interviews &amp; Recruiter Screenings.
          </p>
        </div>
      </div>
    </section>
  );
}
