import { useState } from "react";
import { Clock, ShieldCheck, BriefcaseBusiness, Stethoscope, BarChart3, CheckCircle2 } from "lucide-react";

interface ScheduleItem {
  time: string;
  activity: string;
  toolUsed: string;
  detail: string;
}

interface RoleDay {
  id: string;
  title: string;
  icon: typeof ShieldCheck;
  coreMission: string;
  schedule: ScheduleItem[];
}

const ROLES_DAY: RoleDay[] = [
  {
    id: "pv",
    title: "Drug Safety / ICSR Associate",
    icon: ShieldCheck,
    coreMission:
      "Triage incoming adverse event reports, code medical diagnoses in MedDRA, evaluate causality, and submit regulatory narratives.",
    schedule: [
      {
        time: "09:00 – 10:00",
        activity: "Case Receipt & Minimum Validity Triage",
        toolUsed: "Enterprise Safety Database / Intake Log",
        detail:
          "Verify the 4 minimum validity criteria: identifiable patient, identifiable reporter, suspect medicinal product, and adverse event.",
      },
      {
        time: "10:00 – 12:00",
        activity: "Medical History & MedDRA Coding",
        toolUsed: "MedDRA Browser (v27.0)",
        detail:
          "Convert raw patient symptom verbatims into Low Level Terms (LLT) and Preferred Terms (PT) across SOC anatomical hierarchies.",
      },
      {
        time: "12:00 – 13:30",
        activity: "WHODrug Coding & Concomitant Medications",
        toolUsed: "WHODrug Global Dictionary",
        detail:
          "Code suspect and concomitant drugs with active ingredients, ATC codes, and medicinal product identifiers.",
      },
      {
        time: "14:30 – 16:30",
        activity: "Medical Narrative Drafting & Causality Assessment",
        toolUsed: "Clinical Narrative Editor & WHO-UMC Scale",
        detail:
          "Write structured chronological narrative: patient baseline, onset latency, dechallenge/rechallenge reaction, and investigator causality.",
      },
      {
        time: "16:30 – 17:30",
        activity: "Quality QC & E2B(R3) XML Validation",
        toolUsed: "Electronic Transmission Validator",
        detail:
          "Run automated field consistency checks, verify expedited reporting clock (7/15 day), and submit for medical review.",
      },
    ],
  },
  {
    id: "cdm",
    title: "Clinical Data Associate (CDM)",
    icon: BriefcaseBusiness,
    coreMission:
      "Clean, audit, and reconcile electronic case report forms (eCRFs) across multi-center clinical trials to ensure database integrity.",
    schedule: [
      {
        time: "09:00 – 10:30",
        activity: "Daily Discrepancy & Query Review",
        toolUsed: "EDC Platform (Oracle InForm / Medidata Rave)",
        detail:
          "Review automated edit checks flagging missing laboratory values, out-of-range vitals, and inconsistent adverse event dates.",
      },
      {
        time: "10:30 – 12:30",
        activity: "Investigator Site Query Management",
        toolUsed: "Clinical Query Tracking Log",
        detail:
          "Issue protocol-compliant electronic data queries to clinical trial site coordinators and follow up on pending data revisions.",
      },
      {
        time: "13:30 – 15:30",
        activity: "Serious Adverse Event (SAE) Reconciliation",
        toolUsed: "CDM vs Safety Database Cross-Check Tool",
        detail:
          "Compare clinical trial database SAE entries against pharmacovigilance safety database records for exact date and term parity.",
      },
      {
        time: "15:30 – 17:30",
        activity: "Pre-Lock Data Auditing & Freeze Preparation",
        toolUsed: "Data Management Plan (DMP) Checklist",
        detail:
          "Perform soft-lock milestone audits to prepare trial datasets for blind-break, biostatistical analysis, and regulatory lock.",
      },
    ],
  },
  {
    id: "coding",
    title: "Inpatient Medical Coder",
    icon: Stethoscope,
    coreMission:
      "Audit surgical operative notes, physician consultations, and discharge summaries to assign precise ICD-10-CM and CPT codes for US healthcare billing.",
    schedule: [
      {
        time: "09:00 – 10:30",
        activity: "Clinical Documentation Integrity Review",
        toolUsed: "Hospital Electronic Health Record (EHR)",
        detail:
          "Examine admission history, physical exam, pathology lab results, and operative reports for principal diagnosis validity.",
      },
      {
        time: "10:30 – 12:30",
        activity: "ICD-10-CM Diagnosis Code Assignment",
        toolUsed: "EncoderPro / Official Coding Guidelines",
        detail:
          "Assign primary and secondary ICD-10-CM codes with manifestation sequencing, complication/comorbidity (CC/MCC) capture.",
      },
      {
        time: "13:30 – 15:30",
        activity: "Procedural Coding & Surgical Approach",
        toolUsed: "CPT-4 Manual & ICD-10-PCS Tables",
        detail:
          "Determine root surgical operation, anatomical site, approach, and device/graft qualifiers to assign surgical procedure codes.",
      },
      {
        time: "15:30 – 17:00",
        activity: "DRG Grouper Audit & Clean Claim Release",
        toolUsed: "MS-DRG Grouper Software",
        detail:
          "Verify Medicare Severity Diagnosis Related Group calculation, check National Correct Coding Initiative (NCCI) edits, and release chart.",
      },
    ],
  },
  {
    id: "sas",
    title: "Clinical SAS Programmer",
    icon: BarChart3,
    coreMission:
      "Write reproducible SAS macros, map raw trial datasets to CDISC SDTM domains, build ADaM analytical datasets, and generate regulatory TLFs.",
    schedule: [
      {
        time: "09:30 – 11:00",
        activity: "Raw Data Extraction & PROC SQL Scripting",
        toolUsed: "SAS Studio / Base SAS",
        detail:
          "Import EDC clinical databases, write SQL queries to merge demographic, lab, and concomitant medication tables.",
      },
      {
        time: "11:00 – 13:00",
        activity: "CDISC SDTM Mapping & Variable Standardization",
        toolUsed: "SDTM Implementation Guide (v3.3)",
        detail:
          "Transform study variables into standardized SDTM domains (DM, AE, LB, VS, CM) with compliant ISO 8601 timestamps.",
      },
      {
        time: "14:00 – 16:00",
        activity: "Analysis Data Model (ADaM) Dataset Creation",
        toolUsed: "ADaM Data Structures (ADSL, ADAE)",
        detail:
          "Program derived variables: treatment-emergent adverse event flags, baseline covariates, and time-to-event analytical vectors.",
      },
      {
        time: "16:00 – 17:30",
        activity: "TLF (Tables, Listings, Figures) Production",
        toolUsed: "SAS ODS & Macro Library",
        detail:
          "Generate statistical summary tables, patient safety profiles, and Kaplan-Meier survival curves formatted for FDA eCTD submissions.",
      },
    ],
  },
];

export function CareerDayInLife() {
  const [activeTab, setActiveTab] = useState(0);
  const current = ROLES_DAY[activeTab];
  const Icon = current.icon;

  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFC]/80 border-b border-[#E4EAF2] tone-light card-light">
      <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
          <Clock className="h-3 w-3 text-[#2563EB]" />
          <span>A DAY IN THE LIFE OF A HEALTHCARE SPECIALIST</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081F38] tracking-tight">
          What Do Healthcare Desk Professionals{" "}
          <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
            Actually Do Hour-by-Hour?
          </span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
          Demystify the daily workflow. See the exact enterprise database tools, compliance checkpoints, and case milestones handled on the job.
        </p>
      </div>

      {/* Role Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {ROLES_DAY.map((role, idx) => {
          const isSelected = activeTab === idx;
          const TabIcon = role.icon;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#081F38] tone-light card-light"
              }`}
            >
              <TabIcon className="h-4 w-4" />
              <span>{role.title}</span>
            </button>
          );
        })}
      </div>

      {/* Schedule Container */}
      <div className="max-w-4xl mx-auto rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-xs tone-light card-light">
        {/* Core Mission Banner */}
        <div className="pb-6 border-b border-[#F1F5F9] flex items-start gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
              Core Workplace Mission
            </span>
            <h3 className="text-lg font-bold text-[#081F38] mt-0.5">{current.title}</h3>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
              {current.coreMission}
            </p>
          </div>
        </div>

        {/* Hour by hour schedule list */}
        <div className="mt-6 space-y-4">
          {current.schedule.map((item, idx) => (
            <div
              key={item.time}
              className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 p-4 rounded-xl bg-[#F8FAFC] border border-slate-100 tone-light card-light hover:border-[#BFDBFE] transition-colors"
            >
              <div className="sm:w-36 shrink-0">
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#081F38] bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-md tone-light card-light">
                  <Clock className="h-3 w-3 text-[#2563EB]" />
                  <span>{item.time}</span>
                </span>
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-[#081F38]">{item.activity}</h4>
                  <span className="font-mono text-[10px] font-semibold text-[#1D4ED8] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    {item.toolUsed}
                  </span>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B] font-mono">
          <span>* Standard full-time corporate desk workflow across Indian GCCs &amp; CROs.</span>
          <span className="hidden sm:inline">21 CFR Part 11 Compliant</span>
        </div>
      </div>
    </section>
  );
}
