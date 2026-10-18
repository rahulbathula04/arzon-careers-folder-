import { CheckCircle2, FileSearch, Terminal, UserCheck, AlertCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Stage {
  step: string;
  title: string;
  type: string;
  icon: typeof FileSearch;
  whatHappens: string;
  whyCandidatesFail: string;
  howToPass: string[];
}

const STAGES: Stage[] = [
  {
    step: "Stage 01",
    title: "ATS Machine Screening & Keyword Verification",
    type: "Automated Resume Filter",
    icon: FileSearch,
    whatHappens:
      "Applicant Tracking Systems (Workday, Taleo) automatically scan 500+ resumes per role, scoring candidates on exact database keywords and compliance standards.",
    whyCandidatesFail:
      "Resumes only list generic university subjects ('Pharmacology', 'Organic Chemistry') with zero references to industry database software or regulatory standards.",
    howToPass: [
      "Explicitly include verified software: Enterprise Safety Database, MedDRA v27, WHODrug, InForm, or Base SAS.",
      "Highlight regulatory frameworks: ICH-GCP E6(R2), E2B(R3), 21 CFR Part 11.",
      "Attach auditable work samples and de-identified project portfolio links.",
    ],
  },
  {
    step: "Stage 02",
    title: "Practical Case Processing & Tool Simulation",
    type: "Timed Technical Assessment",
    icon: Terminal,
    whatHappens:
      "Candidates are assigned a simulated clinical case: coding an adverse event verbatim into MedDRA, auditing a surgical operative report into ICD-10, or mapping a raw trial dataset.",
    whyCandidatesFail:
      "Candidates know the theoretical definitions but have never navigated an active database interface, causing high error rates and time overruns.",
    howToPass: [
      "Master the 4 minimum validity criteria under strict 15-minute case clocks.",
      "Achieve 95%+ coding accuracy on primary symptom terms and surgical approaches.",
      "Format clean, chronological narratives with proper onset latencies and dechallenge logs.",
    ],
  },
  {
    step: "Stage 03",
    title: "Technical Panel & Rationale Defense",
    type: "Senior Lead & Manager Interview",
    icon: UserCheck,
    whatHappens:
      "A Senior Safety Lead, CDM Manager, or Biostatistics Director drills down into your case choices: 'Why did you classify this event as serious? How would you resolve this discrepancy?'",
    whyCandidatesFail:
      "Rote memorization collapses when hiring managers challenge causality scoring or ask for SOP discrepancy resolution workflows.",
    howToPass: [
      "Defend your clinical judgment using standard WHO-UMC and Naranjo causality scales.",
      "Explain end-to-end data flow: from clinical trial site entry to regulatory submission.",
      "Demonstrate professional corporate communication and SOP audit readiness.",
    ],
  },
];

export function CareerRecruiterFunnel() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#E4EAF2] tone-light card-light">
      <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
          <Terminal className="h-3 w-3 text-[#2563EB]" />
          <span>INSIDE THE RECRUITMENT PROCESS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081F38] tracking-tight">
          How Indian GCCs &amp; CROs Actually Screen Candidates:{" "}
          <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
            The 3-Stage Recruiter Funnel
          </span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
          Understanding where candidates get eliminated is the key to building an unshakeable, audit-ready profile that clears hiring rounds on the first attempt.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {STAGES.map((stage) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.step}
              className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs tone-light card-light relative hover:border-[#BFDBFE] transition-all"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                  <span className="font-mono text-[11px] font-bold text-[#2563EB]">
                    {stage.step}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#475569]">
                    {stage.type}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-base font-bold text-[#081F38] leading-snug">
                    {stage.title}
                  </h3>
                </div>

                <p className="mt-3 text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                  {stage.whatHappens}
                </p>

                {/* Why candidates fail callout */}
                <div className="mt-4 rounded-xl bg-amber-50/80 border border-amber-200/80 p-3 text-xs text-amber-950">
                  <div className="flex items-center gap-1.5 font-bold font-mono text-[10.5px] text-amber-800 uppercase tracking-wider mb-1">
                    <AlertCircle className="h-3 w-3 text-amber-600" />
                    <span>Why 80% of Freshers Fail:</span>
                  </div>
                  <p className="text-[11.5px] leading-relaxed text-amber-900">
                    {stage.whyCandidatesFail}
                  </p>
                </div>

                {/* How to pass checklist */}
                <div className="mt-4 pt-3.5 border-t border-[#F1F5F9]">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#081F38]">
                    How to Clear this Stage:
                  </span>
                  <ul className="mt-2 space-y-2 text-xs text-[#334155]">
                    {stage.howToPass.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="text-[11.5px] leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-[#E4EAF2] text-center">
        <Link
          to="/career-engine/start"
          className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3 text-xs sm:text-sm font-bold shadow-xs transition-all"
        >
          <span>Benchmark your profile against recruiter screening criteria</span>
          <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
        </Link>
      </div>
    </section>
  );
}
