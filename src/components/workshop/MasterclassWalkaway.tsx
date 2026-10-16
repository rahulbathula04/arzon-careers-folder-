import { 
  Activity, 
  GitBranch, 
  Briefcase, 
  Cpu, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  Workflow, 
  Layers,
  AlertTriangle,
  HeartHandshake,
  Scale,
  Sparkles
} from "lucide-react";

interface WalkawayCardData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  chips: string[];
}

const WALKAWAY_MODULES: WalkawayCardData[] = [
  {
    number: "01",
    title: "What is Pharmacovigilance & Its Mandate",
    subtitle: "Science of Patient Safety",
    description:
      "Understand WHO's definition of PV: the science relating to detection, assessment, understanding, and prevention of adverse effects across patient safety, regulatory compliance, and risk-benefit evaluation.",
    chips: ["Patient Safety", "Regulatory Compliance", "Risk-Benefit Evaluation"],
  },
  {
    number: "02",
    title: "Drug Development & Where PV Fits",
    subtitle: "Discovery to Post-Marketing",
    description:
      "Trace how medicines move through Discovery → Pre-clinical → Clinical Trials → Regulatory Approval → Post-Marketing Surveillance (PV), and why drug safety is an ongoing commercial mandate.",
    chips: ["Clinical Phase I-IV", "Post-Marketing Surveillance", "Safety Lifecycle"],
  },
  {
    number: "03",
    title: "The 7-Stage ICSR Workflow",
    subtitle: "End-to-End Case Lifecycle",
    description:
      "Follow an Individual Case Safety Report (ICSR) end-to-end: Case Receipt → Triage → Data Entry → Medical Coding → Narrative Drafting → Quality Control (QC) → Expedited Submission.",
    chips: ["ICH E2B(R3)", "MedDRA Hierarchy", "Day 0 Clock Management"],
  },
  {
    number: "04",
    title: "Why Pharmacovigilance Matters",
    subtitle: "The 4 Core Healthcare Pillars",
    description:
      "Explore the 4 foundational reasons PV teams operate around the clock: detecting adverse reactions early, reducing medication errors, building patient confidence, and supporting regulatory decisions.",
    chips: ["Signal Detection", "Error Mitigation", "Regulatory Authority Audits"],
  },
  {
    number: "05",
    title: "Entry-Level Roles & Top Employers",
    subtitle: "Where Pharmacy Graduates Work",
    description:
      "Explore entry-level roles including PV Associate, Drug Safety Associate, Case Processor, Medical Reviewer, and Signal Detection Specialist across IQVIA, Accenture, Cognizant, TCS, Pfizer, and Novartis.",
    chips: ["PV Associate", "Case Processor", "Safety Specialist"],
  },
  {
    number: "06",
    title: "Your Questions, Answered Live",
    subtitle: "Direct Mentor Perspective",
    description:
      "Ask Mohamed Kumail Abbas direct questions about industry expectations, technical screening tests, common fresher misconceptions, and realistic preparation steps.",
    chips: ["Live Faculty Q&A", "Fresher Hiring Reality", "Technical Interview Prep"],
  },
];

// The 7-Stage ICSR Pipeline directly from the trainer's slides
const ICSR_PIPELINE_STEPS = [
  { step: "01", name: "Case Receipt", desc: "Spontaneous, trial, or literature intake" },
  { step: "02", name: "Triage", desc: "4 validity criteria & Day 0 clock" },
  { step: "03", name: "Data Entry", desc: "Argus/ArisG record entry" },
  { step: "04", name: "Medical Coding", desc: "MedDRA LLT/PT & WHODrug" },
  { step: "05", name: "Narrative", desc: "Chronological medical history" },
  { step: "06", name: "QC Review", desc: "Quality check & causality score" },
  { step: "07", name: "Submission", desc: "Expedited regulatory report" },
];

// Top Hiring Employers directly from the trainer's slides
const TOP_EMPLOYERS = [
  { name: "IQVIA", type: "Global CRO & Safety Leader" },
  { name: "Accenture", type: "Life Sciences Delivery Operations" },
  { name: "Cognizant", type: "Enterprise PV Case Processing" },
  { name: "TCS", type: "Healthcare & Life Sciences" },
  { name: "Pfizer", type: "Global Sponsor Drug Safety" },
  { name: "Novartis", type: "Innovative Medicines Surveillance" },
];

// Target Job Roles directly from the trainer's slides
const TARGET_ROLES = [
  "PV Associate",
  "Drug Safety Associate",
  "Case Processor",
  "Medical Reviewer",
  "Signal Detection Specialist",
];

// The 4 PV Pillars directly from the trainer's slides
const FOUR_PILLARS = [
  {
    title: "Detect Adverse Reactions Early",
    desc: "Identifying safety signals before they cause widespread patient harm.",
    icon: AlertTriangle,
  },
  {
    title: "Reduce Medication Errors",
    desc: "Analyzing dispensing, dosing, and administration discrepancies.",
    icon: ShieldCheck,
  },
  {
    title: "Improve Patient Confidence",
    desc: "Ensuring commercial medicines have continuous surveillance backing.",
    icon: HeartHandshake,
  },
  {
    title: "Support Regulatory Decisions",
    desc: "Supplying objective safety dossiers to FDA, EMA, and CDSCO.",
    icon: Scale,
  },
];

export function MasterclassWalkaway() {
  return (
    <section id="outcomes" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>02 · Curriculum &amp; Outcomes</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-tight leading-snug mb-3">
            Understand the work before you choose the career.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            A comprehensive curriculum connecting classroom pharmacology concepts with how enterprise drug safety teams actually operate.
          </p>
        </div>

        {/* Feature 1: The 7-Stage ICSR Workflow Pipeline */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs tone-light card-light">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-1">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Core Masterclass Case Study</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#081F38]">
                The 7-Stage ICSR Workflow Pipeline
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Individual Case Safety Report (ICH E2B)
            </span>
          </div>

          {/* Stepper Pipeline Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {ICSR_PIPELINE_STEPS.map((item, index) => (
              <div
                key={item.step}
                className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between hover:border-blue-400 hover:bg-blue-50/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      {item.step}
                    </span>
                    {index < 6 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 hidden lg:block -mr-1" />
                    )}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#081F38] mb-1 leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Modular Curriculum Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {WALKAWAY_MODULES.map((item) => (
            <div
              key={item.number}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between tone-light card-light"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    MODULE {item.number}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                    {item.subtitle}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#081F38] mb-2.5">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Micro Chips */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {item.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/70 text-slate-600 font-mono text-[10.5px] font-medium"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feature 2: 4 Pillars of PV & Top Employers Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (7 cols): The 4 Pillars */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs tone-light card-light flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Why Pharmacovigilance Matters</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#081F38] mb-6">
                The 4 Core Pillars of Drug Safety
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FOUR_PILLARS.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-2">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-sm text-[#081F38]">{p.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Job Roles & Top Hiring Employers */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#081F38] text-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-300 mb-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>Industry Hiring Landscape</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Target Roles &amp; Top Employers
              </h3>

              {/* Roles Badges */}
              <div className="mb-6">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                  Featured Entry-Level Roles:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TARGET_ROLES.map((r) => (
                    <span
                      key={r}
                      className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-white font-medium text-xs"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Employers List */}
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                  Primary Hiring Employers:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {TOP_EMPLOYERS.map((emp) => (
                    <div
                      key={emp.name}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="font-bold text-sm text-white">{emp.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{emp.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
              <span>Verified CRO &amp; Pharma Career Matrix</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
