import { 
  GitBranch, 
  Briefcase, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  Workflow, 
  AlertTriangle,
  HeartHandshake,
  Scale,
  Activity,
  Layers,
  Sparkles
} from "lucide-react";

interface WalkawayOutcome {
  num: string;
  title: string;
  desc: string;
  tag: string;
  icon: typeof Activity;
}

const FIVE_OUTCOMES: WalkawayOutcome[] = [
  {
    num: "01",
    title: "The role",
    tag: "Patient Safety Mandate",
    desc: "Understand what a Drug Safety Associate does and how pharmacovigilance teams contribute to patient safety across clinical trials and commercial medicines.",
    icon: Activity,
  },
  {
    num: "02",
    title: "The workflow",
    tag: "7-Stage ICSR Pipeline",
    desc: "Follow the stages of an Individual Case Safety Report (ICSR), from case receipt and triage to medical coding, quality control, and expedited submission.",
    icon: GitBranch,
  },
  {
    num: "03",
    title: "The opportunities",
    tag: "Entry-Level Career Paths",
    desc: "Explore entry-level pharmacovigilance and drug safety roles, their day-to-day responsibilities, and the differences between them.",
    icon: Briefcase,
  },
  {
    num: "04",
    title: "The skills",
    tag: "Technical Capabilities",
    desc: "Understand the knowledge and capabilities relevant to these roles, MedDRA hierarchy, Argus safety software, and what you may need to learn next.",
    icon: Layers,
  },
  {
    num: "05",
    title: "Your questions, answered",
    tag: "Live Faculty Q&A",
    desc: "Get the opportunity to ask Mohamed Kumail Abbas direct questions about the field, hiring manager expectations, and practical transition steps.",
    icon: HelpCircle,
  },
];

// The 7-Stage ICSR Pipeline directly from the trainer's slides
const ICSR_PIPELINE = [
  { step: "1", name: "Receipt" },
  { step: "2", name: "Triage" },
  { step: "3", name: "Data Entry" },
  { step: "4", name: "Coding" },
  { step: "5", name: "Narrative" },
  { step: "6", name: "QC" },
  { step: "7", name: "Submission" },
];

// Top Hiring Employers directly from the trainer's slides
const TOP_EMPLOYERS = ["IQVIA", "Accenture", "Cognizant", "TCS", "Pfizer", "Novartis"];

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
  { title: "Detect Early", desc: "Adverse reactions identified fast" },
  { title: "Reduce Errors", desc: "Dosing & medication discrepancy" },
  { title: "Patient Trust", desc: "Continuous post-market monitoring" },
  { title: "Regulatory Fit", desc: "FDA, EMA & CDSCO compliance" },
];

export function MasterclassWalkaway() {
  return (
    <section id="outcomes" className="py-12 sm:py-16 border-b border-slate-200/80 bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5">
            <Workflow className="w-3.5 h-3.5" />
            <span>02 · What You'll Walk Away With</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight leading-snug">
            Understand the work before you choose the career.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
            Connect what you learn in your pharmacy degree with how enterprise drug safety teams operate.
          </p>
        </div>

        {/* Compact 2-Column Balanced Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column (7 cols): The 5 Core Takeaway Cards */}
          <div className="lg:col-span-7 space-y-3">
            {FIVE_OUTCOMES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all tone-light card-light flex items-start gap-3.5 group"
                >
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 shrink-0 mt-0.5">
                    {item.num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm sm:text-base font-bold text-[#081F38] group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider hidden sm:inline-block">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (5 cols): Compact Technical Blueprints (from Trainer Slides) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Box 1: The 7-Stage ICSR Pipeline */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs tone-light card-light">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>The 7-Stage ICSR Pipeline</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">ICH E2B</span>
              </div>

              {/* Compact horizontal stepper chain */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {ICSR_PIPELINE.map((st, i) => (
                  <div key={st.step} className="inline-flex items-center gap-1">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-700">
                      <span className="font-mono text-[10px] font-bold text-blue-600">{st.step}.</span>
                      <span>{st.name}</span>
                    </span>
                    {i < 6 && <span className="text-slate-300 text-xs">→</span>}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-2.5 leading-tight">
                Case receipt and triage through MedDRA coding, QC, and regulatory submission.
              </p>
            </div>

            {/* Box 2: 4 Core Pillars of Drug Safety */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs tone-light card-light">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-3 pb-2.5 border-b border-slate-100">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Why Pharmacovigilance Matters</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left">
                {FOUR_PILLARS.map((p, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                    <div className="font-bold text-xs text-[#081F38]">{p.title}</div>
                    <div className="text-[10.5px] text-slate-500 leading-tight mt-0.5">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 3: Roles & Top Employers */}
            <div className="p-5 rounded-2xl bg-[#081F38] text-white shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-300">
                  Target Roles &amp; Top Employers
                </span>
                <Building2 className="w-3.5 h-3.5 text-blue-300" />
              </div>

              {/* Roles Chips */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {TARGET_ROLES.map((r) => (
                  <span
                    key={r}
                    className="px-2 py-0.5 rounded-md bg-white/10 text-[11px] font-medium text-slate-200 border border-white/10"
                  >
                    {r}
                  </span>
                ))}
              </div>

              {/* Employers Bar */}
              <div className="pt-2 border-t border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Primary Hiring Employers:
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {TOP_EMPLOYERS.map((emp) => (
                    <span
                      key={emp}
                      className="px-2 py-0.5 rounded-md bg-blue-900/60 border border-blue-500/30 font-mono text-[10.5px] font-bold text-blue-200"
                    >
                      {emp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
