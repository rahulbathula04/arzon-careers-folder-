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
          "MedDRA 5-level hierarchy drills (SOC down to LLT)",
          "Anatomy of an Individual Case Safety Report (ICSR)",
        ],
      },
      {
        month: "Month 2 · Production Tooling",
        focus: "Simulated Adverse Event Intake & Narrative Drafting",
        deliverables: [
          "Hands-on Oracle Argus safety workflow simulation",
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
    <section className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">
          <Calendar className="h-4 w-4" />
        </div>
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">
            EXECUTION BLUEPRINT
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#071A4A]">
            90-Day Proof-of-Work Roadmap
          </h2>
        </div>
      </div>

      <p className="mt-3 text-sm text-[#3F4A60] leading-relaxed max-w-3xl">
        Industry hiring managers do not hire for passive course certificates. They hire candidates who can prove operational competence from day one. Here is the structured 3-month progression:
      </p>

      {/* 3 Phases Grid */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {roadmap.phases.map((phase, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-5 text-sm"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E4EAF2]">
                <span className="text-xs font-mono font-bold uppercase text-[#1557D6]">
                  {phase.month}
                </span>
                <span className="h-6 w-6 rounded-full bg-white tone-light border border-[#E4EAF2] grid place-items-center text-xs font-bold text-[#071A4A]">
                  0{idx + 1}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-bold text-[#071A4A]">
                {phase.focus}
              </h3>

              <ul className="mt-3 space-y-2 text-xs text-[#3F4A60]">
                {phase.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Capstone Proof-of-Work Box */}
      <div className="mt-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/60 p-4 sm:p-5 flex items-start gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1557D6] text-white">
          <FileCheck className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-mono uppercase text-[#1557D6] font-bold block">
            REQUIRED CAPSTONE PROOF-OF-WORK
          </span>
          <p className="mt-1 text-sm font-semibold text-[#071A4A]">
            {roadmap.capstone}
          </p>
        </div>
      </div>
    </section>
  );
}
