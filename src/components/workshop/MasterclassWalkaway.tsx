import { useState } from "react";
import { 
  Activity, 
  GitBranch, 
  Layers, 
  Briefcase, 
  HelpCircle, 
  Workflow, 
  Clock, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  CheckCircle2 
} from "lucide-react";

// The 5 Core Takeaways of the Masterclass
const FIVE_OUTCOMES = [
  {
    num: "01",
    tag: "Patient Safety",
    title: "The Role Reality",
    desc: "What a Drug Safety Associate does daily across clinical trials and commercial medicines.",
    icon: Activity,
  },
  {
    num: "02",
    tag: "7-Stage Workflow",
    title: "The ICSR Pipeline",
    desc: "End-to-end case journey from Day-0 intake to MedDRA coding, QC, and submission.",
    icon: GitBranch,
  },
  {
    num: "03",
    tag: "Enterprise Tools",
    title: "Argus & MedDRA",
    desc: "Oracle Argus Safety workflows, 5-tier MedDRA coding hierarchy, and WHO-DD.",
    icon: Layers,
  },
  {
    num: "04",
    tag: "MNC Hiring",
    title: "Career Opportunities",
    desc: "Entry roles, CTC brackets, and what top employers look for in pharmacy graduates.",
    icon: Briefcase,
  },
  {
    num: "05",
    tag: "Direct Access",
    title: "Live Faculty Q&A",
    desc: "Ask Mohamed Kumail Abbas direct questions on CV prep, interviews, and transition.",
    icon: HelpCircle,
  },
];

// The 7-Stage ICSR Pipeline directly from Mohamed Kumail Abbas's live slide deck
const ICSR_PIPELINE = [
  {
    step: 1,
    short: "Receipt",
    name: "Case Receipt & Day-0 Trigger",
    timeline: "Day 0 Initial Clock",
    sop: "Adverse event arrives via spontaneous reports, clinical trials, or medical literature. The regulatory clock begins on Day 0 upon first receipt by any company employee.",
    lesson: "How Day-0 determination works in CROs and why missing this clock results in severe regulatory audit citations.",
    badge: "Clock Initiation",
  },
  {
    step: 2,
    short: "Triage",
    name: "Intake & 4 Minimum Criteria Triage",
    timeline: "Within 24 Hours",
    sop: "Verifies the 4 mandatory elements: (1) Identifiable Patient, (2) Identifiable Reporter, (3) Suspect Drug, (4) Adverse Event. Evaluates seriousness (death, hospitalization, disability).",
    lesson: "How triage specialists determine 15-day expedited reporting vs 90-day periodic safety updates in screening interviews.",
    badge: "Seriousness Filter",
  },
  {
    step: 3,
    short: "Data Entry",
    name: "Argus Safety Database Capture",
    timeline: "Days 1 – 3",
    sop: "Structured electronic entry of patient demographics, medical history, concurrent medications, dose schedules, laboratory findings, and dechallenge/rechallenge.",
    lesson: "Navigating Oracle Argus Safety tabs and avoiding the top data entry errors made by fresher associates.",
    badge: "Safety DB Entry",
  },
  {
    step: 4,
    short: "MedDRA",
    name: "MedDRA & WHO-DD Medical Coding",
    timeline: "Days 3 – 5",
    sop: "Standardizing raw patient verbatims into the 5-level MedDRA hierarchy: System Organ Class (SOC) down to Preferred Term (PT) and Lowest Level Term (LLT).",
    lesson: "How interviewers test your understanding of Preferred Terms (PT) versus Lowest Level Terms (LLT) in technical rounds.",
    badge: "Medical Coding",
  },
  {
    step: 5,
    short: "Narrative",
    name: "Safety Narrative Drafting",
    timeline: "Days 5 – 8",
    sop: "Drafting an objective, chronological medical summary detailing patient timeline, symptom onset, therapy changes, and final clinical outcome.",
    lesson: "Writing audit-proof case narratives according to CIOMS guidelines without diagnostic speculation.",
    badge: "Medical Case Story",
  },
  {
    step: 6,
    short: "QC Audit",
    name: "Zero-Defect Quality Control Review",
    timeline: "Days 9 – 11",
    sop: "Independent audit reconciling source documents against database fields, coding fidelity, and timeline compliance.",
    lesson: "Understanding QC checklists and how error rate metrics determine associate performance appraisal in MNCs.",
    badge: "Quality Audit",
  },
  {
    step: 7,
    short: "Submission",
    name: "Electronic Regulatory Submission",
    timeline: "Day 15 Expedited Gateway",
    sop: "ICH E2B(R3) XML electronic transmission to global health authorities including US FDA (MedWatch) and EMA (EudraVigilance).",
    lesson: "How global submission gateways operate and the statutory penalties for late pharmacovigilance reports.",
    badge: "Gateway Dispatch",
  },
];

// The 4 Core Pharmacovigilance Pillars from trainer slides
const FOUR_PILLARS = [
  { 
    title: "Detect Early", 
    tag: "Surveillance",
    desc: "Identify rare adverse drug reactions before widespread patient exposure." 
  },
  { 
    title: "Reduce Errors", 
    tag: "Safety Audits",
    desc: "Flag dosing discrepancies, contraindications & drug-drug interactions." 
  },
  { 
    title: "Patient Trust", 
    tag: "Commercial Care",
    desc: "Continuous post-market monitoring of approved commercial medicines." 
  },
  { 
    title: "Regulatory Fit", 
    tag: "Compliance",
    desc: "Strict adherence to US FDA 21 CFR 314.80, EMA GVP & CDSCO mandates." 
  },
];

// Top Hiring Employers from trainer slides
const TOP_EMPLOYERS = [
  { name: "IQVIA", tag: "Global Leader CRO" },
  { name: "Accenture", tag: "Healthcare GCC" },
  { name: "Cognizant", tag: "Life Sciences Delivery" },
  { name: "TCS", tag: "Enterprise Pharma" },
  { name: "Pfizer", tag: "Global Sponsor Hub" },
  { name: "Novartis", tag: "Commercial Safety" },
];

// Target Job Roles from trainer slides
const TARGET_ROLES = [
  "PV Associate",
  "Drug Safety Associate",
  "Case Processor",
  "Medical Reviewer",
  "Signal Detection Specialist",
];

export function MasterclassWalkaway() {
  const [activeStep, setActiveStep] = useState(1); // Default to Step 2: Triage
  const currentStep = ICSR_PIPELINE[activeStep];

  return (
    <section id="outcomes" className="py-14 sm:py-20 border-b border-[#E4EAF2] bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Apple Typography + Arzon Gradient Accent */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200/80 bg-blue-50/80 text-blue-700 font-mono text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <Workflow className="w-3.5 h-3.5 text-blue-600" />
            <span>02 · WHAT YOU'LL WALK AWAY WITH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#081F38] tracking-tight leading-tight">
            Understand the enterprise workflow{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              before you choose the career.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-sans leading-relaxed max-w-2xl mx-auto">
            Direct from enterprise drug safety practice. Inspect the exact 7-stage case processing pipeline, software tools, and hiring expectations used across global pharma.
          </p>
        </div>

        {/* Part 1: The 5 Core Masterclass Takeaways (Compact Apple Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-10">
          {FIVE_OUTCOMES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="p-4.5 rounded-2xl bg-white border border-[#E4EAF2] shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 tone-light card-light flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      {item.num}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50/80 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-600 mb-0.5">
                    {item.tag}
                  </div>
                  <h3 className="text-sm font-bold text-[#081F38] group-hover:text-blue-700 transition-colors leading-snug mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Part 2: The Core Hero Feature — 7-Stage ICSR Pipeline (Clean Interactive Apple Stepper) */}
        <div className="rounded-3xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light p-6 sm:p-8 mb-6">
          
          {/* Stepper Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
                  The 7-Stage ICSR Enterprise Pipeline
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-sans">
                Follow an adverse drug reaction from initial hospital intake to global health authority transmission.
              </p>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 shrink-0 self-start sm:self-auto">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Step {currentStep.step} of 7</span>
            </div>
          </div>

          {/* Stepper Button Chain (Clickable) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
            {ICSR_PIPELINE.map((st, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={st.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                    isActive
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : "bg-slate-50/80 border-slate-200/80 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className={`text-[10px] font-mono font-bold ${isActive ? "text-blue-100" : "text-blue-600"}`}>
                    STAGE 0{st.step}
                  </div>
                  <div className="text-xs font-bold truncate mt-0.5">
                    {st.short}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep-Dive Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100/70 text-blue-800 text-xs font-mono font-bold">
                <span>{currentStep.badge.toUpperCase()}</span>
              </div>
              <span className="text-xs font-mono text-slate-600">
                Regulatory Clock: <strong className="text-[#081F38]">{currentStep.timeline}</strong>
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-[#081F38] mb-2">
              {currentStep.name}
            </h4>

            {/* 2-Column Split: Enterprise SOP vs Masterclass Takeaway */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 tone-light card-light">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1">
                  Enterprise SOP Standard:
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-sans">
                  {currentStep.sop}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-blue-700 font-bold mb-1">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>What Mohamed Kumail Abbas Teaches You:</span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed font-sans">
                  {currentStep.lesson}
                </p>
              </div>
            </div>

            {/* Prev / Next Stage Controls */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200/80">
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : ICSR_PIPELINE.length - 1))}
                className="inline-flex items-center gap-1 text-xs font-mono text-slate-600 hover:text-blue-700 transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-slate-200/50"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Stage</span>
              </button>

              <div className="flex items-center gap-1">
                {ICSR_PIPELINE.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    aria-label={`Jump to stage ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === activeStep ? "w-6 bg-blue-600" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev < ICSR_PIPELINE.length - 1 ? prev + 1 : 0))}
                className="inline-flex items-center gap-1 text-xs font-mono text-blue-700 hover:text-blue-800 transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-blue-100/50 font-bold"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Part 3: Two Compact Supporting Bento Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          {/* Card A: 4 Core Pharmacovigilance Pillars */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3.5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Why Pharmacovigilance Matters</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  Patient Safety
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {FOUR_PILLARS.map((p, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-200 transition-colors"
                  >
                    <div className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wide mb-0.5">
                      {p.tag}
                    </div>
                    <div className="font-bold text-xs sm:text-[13px] text-[#081F38] mb-1">
                      {p.title}
                    </div>
                    <div className="text-[11px] text-slate-600 leading-snug">
                      {p.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
              Mandatory compliance under US FDA 21 CFR 314.80 &amp; EMA Good Vigilance Practice (GVP).
            </div>
          </div>

          {/* Card B: Target Roles & Top Hiring Employers */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3.5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Actively Recruiting Employers</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-bold">
                  Enterprise Tier
                </span>
              </div>

              {/* Employer Tiles */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {TOP_EMPLOYERS.map((emp) => (
                  <div
                    key={emp.name}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors"
                  >
                    <div className="font-bold text-xs text-[#081F38]">{emp.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5 leading-tight">{emp.tag}</div>
                  </div>
                ))}
              </div>

              {/* Target Job Roles */}
              <div className="pt-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                  Primary Roles Covered in Masterclass:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TARGET_ROLES.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50/80 border border-blue-100 text-xs font-medium text-blue-800"
                    >
                      <Check className="w-3 h-3 text-blue-600" />
                      <span>{role}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
              12,000+ entry-level openings across Indian Global Capability Centers (GCCs).
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
