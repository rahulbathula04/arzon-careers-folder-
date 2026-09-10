import { Clock, FileSearch, Stethoscope, BarChart3, MessageSquare, CheckCircle2 } from "lucide-react";

const agenda = [
  {
    num: "01",
    duration: "20 MIN",
    icon: FileSearch,
    title: "THE REAL CASE PROCESSING",
    subtitle: "Live Intake & Triage Walkthrough",
    description:
      "Watch a real adverse-event report (Metformin ER acute metabolic acidosis) triaged live on screen. Learn how enterprise safety systems handle intake and duplicate verification.",
    tag: "PRACTICAL DEMONSTRATION",
    color: "text-[var(--color-clinical-teal)]",
    bg: "bg-teal-50 border-teal-200",
  },
  {
    num: "02",
    duration: "25 MIN",
    icon: Stethoscope,
    title: "HOW SAFETY TEAMS THINK",
    subtitle: "4 Criteria, MedDRA Coding & Regulatory Timelines",
    description:
      "Deconstruct the four minimum validity pillars, seriousness determination (life-threatening vs hospitalization), MedDRA coding, and expedited 15-day reporting deadlines.",
    tag: "TECHNICAL CORE",
    color: "text-[var(--color-medical-navy)]",
    bg: "bg-blue-50 border-blue-200",
  },
  {
    num: "03",
    duration: "15 MIN",
    icon: BarChart3,
    title: "THE CAREER MAP & SALARY BANDS",
    subtitle: "Roles, Employers & Promotion Trajectories",
    description:
      "Understand entry CTC bands (₹3.2L – ₹4.8L), 42 hiring CROs across Bangalore, Hyderabad, and Pune, and the 3-year path from associate to safety scientist.",
    tag: "INDUSTRY INTELLIGENCE",
    color: "text-[var(--color-editorial-amber)]",
    bg: "bg-amber-50 border-amber-200",
  },
  {
    num: "04",
    duration: "15 MIN",
    icon: MessageSquare,
    title: "LIVE CANDIDATE Q&A",
    subtitle: "Direct Access to Mentor Kumail",
    description:
      "Ask questions about resume tailoring, campus placements, degree eligibility (Pharm.D vs B.Pharm vs Life Sciences), and what to say in technical interview rounds.",
    tag: "INTERACTIVE ACCESS",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
  },
];

// The right-side "Case Workflow" column from the reference design —
// shows the 4 operational steps performed inside the live session
const caseWorkflow = [
  {
    num: "01",
    title: "Vendor ICSRs",
    desc: "ICH E2D validity screening of incoming spontaneous reports",
  },
  {
    num: "02",
    title: "Assess Seriousness",
    desc: "Apply hospitalization / life-threatening criteria per FDA 21 CFR 314.80",
  },
  {
    num: "03",
    title: "Code MedDRA",
    desc: "Map PT → HLT → SOC hierarchy using MedDRA v27.0 Browser",
  },
  {
    num: "04",
    title: "Prepare Narrative",
    desc: "Draft 15-day expedited ICSR narrative and set regulatory clock",
  },
];

export function ArzonWhatYouWillSee() {
  return (
    <section
      id="what-you-will-see"
      className="w-full py-16 sm:py-20 bg-[var(--color-warm-white)] border-b border-[var(--color-border-warm)] text-left tone-light"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[var(--color-editorial-amber)] rounded-sm" />
            <span className="font-mono text-[11px] font-bold text-[var(--color-arzon-ink)] uppercase tracking-widest">
              WHAT YOU'LL LEARN · 75 MINUTES
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-arzon-ink)] tracking-tight">
            What you'll actually see
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
            A timed, structured working session designed to replace abstract speculation with demonstrable operations literacy.
          </p>
        </div>

        {/* Two-column layout: Agenda (left) + Case Workflow (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Left Column: 4-item Agenda Cards ── */}
          <div className="lg:col-span-8 space-y-4">
            {agenda.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="group flex gap-4 p-5 rounded-2xl bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)] hover:border-[var(--color-medical-navy)]/40 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  {/* Number badge */}
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] group-hover:bg-[var(--color-medical-navy)] group-hover:border-[var(--color-medical-navy)] flex items-center justify-center font-mono text-sm font-black text-[var(--color-arzon-ink)] group-hover:text-white transition-colors">
                    {item.num}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    {/* Tag + Duration */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`font-mono text-[9.5px] font-bold uppercase tracking-wider ${item.color}`}>
                        {item.tag}
                      </span>
                      <div className="flex items-center gap-1 font-mono text-[9.5px] font-bold text-stone-500 ml-auto">
                        <Clock className="w-3 h-3" />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--color-arzon-ink)]">
                      {item.title}
                    </h3>
                    <p className={`font-mono text-[10px] font-semibold uppercase tracking-wider ${item.color}`}>
                      {item.subtitle}
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Right Column: Case Workflow Steps ── */}
          <div className="lg:col-span-4 space-y-4">
            {/* Header */}
            <div className="p-4 rounded-2xl bg-[var(--color-medical-navy)] tone-dark text-white space-y-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-clinical-teal)] block">
                CASE WORKFLOW
              </span>
              <h3 className="font-serif text-xl font-extrabold text-white leading-tight" style={{ color: "#FFFFFF" }}>
                Inside the Live Argus Case Triage
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                The exact sequence you'll see performed step-by-step on screen.
              </p>
            </div>

            {/* Step cards */}
            <div className="space-y-3">
              {caseWorkflow.map((step) => (
                <div
                  key={step.num}
                  className="flex gap-3 p-4 rounded-xl bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)] hover:border-[var(--color-medical-navy)]/30 transition-colors"
                >
                  {/* Step number */}
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-[var(--color-medical-navy)]/10 flex items-center justify-center font-mono text-xs font-black text-[var(--color-medical-navy)]">
                    {step.num}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[var(--color-clinical-teal)] shrink-0" />
                      <span className="font-serif text-sm font-bold text-[var(--color-arzon-ink)]">
                        {step.title}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-stone-500 leading-snug mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Regulatory timeline note */}
            <div className="p-3 rounded-xl bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)]">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-editorial-amber)]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--color-editorial-amber)]">
                  Regulatory Timeline
                </span>
              </div>
              <p className="font-mono text-xs font-bold text-[var(--color-arzon-ink)]">15-Day Expedited Reporting</p>
              <p className="font-sans text-[11px] text-stone-500 mt-0.5">
                Learn exactly when Day 0 starts and why the regulatory clock matters in India CRO contexts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
