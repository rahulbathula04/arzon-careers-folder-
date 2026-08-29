import { useState } from "react";
import { ClipboardList, BookOpen, FlaskConical, FolderKanban, BarChart3, UserCheck, TrendingUp, ArrowRight } from "lucide-react";

const STAGES = [
  {
    id: "assess",
    step: "01",
    icon: ClipboardList,
    label: "ASSESS",
    title: "Know where you stand",
    desc: "Complete the ACRI role-fit diagnostic. Understand your current readiness across clinical knowledge, software familiarity, and documentation skills. Get a clear baseline before investing time or money.",
    deliverable: "Your personalised ACRI Baseline Score",
    color: "text-[#1B3F8B]",
    bg: "bg-sky-50 border-sky-200",
    dot: "bg-[#1B3F8B]",
  },
  {
    id: "learn",
    step: "02",
    icon: BookOpen,
    label: "LEARN",
    title: "Build required knowledge",
    desc: "8 weeks of live, instructor-led sessions mapped directly to the competencies real Indian employers list in their job descriptions — not generic pharma theory.",
    deliverable: "8 graded weekly submissions on real medical files",
    color: "text-orange-700",
    bg: "bg-orange-50 border-orange-200",
    dot: "bg-orange-500",
  },
  {
    id: "practice",
    step: "03",
    icon: FlaskConical,
    label: "PRACTICE",
    title: "Apply it to real data",
    desc: "Work on de-identified ICSR case narratives, ICD-10 patient charts, eCRF datasets, and MedDRA coding exercises — the exact files you'd handle on day one of a PV or CDM role.",
    deliverable: "Graded practice sets reviewed by mentors",
    color: "text-teal-700",
    bg: "bg-teal-50 border-teal-200",
    dot: "bg-teal-600",
  },
  {
    id: "build",
    step: "04",
    icon: FolderKanban,
    label: "BUILD",
    title: "Create auditable evidence",
    desc: "Weeks 9–12: a supervised applied internship where you complete a capstone project on a real hospital or CRO dataset. This becomes your verified career dossier — not just a course completion PDF.",
    deliverable: "Verified capstone project + ISO internship certificate",
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
    dot: "bg-purple-600",
  },
  {
    id: "measure",
    step: "05",
    icon: BarChart3,
    label: "MEASURE",
    title: "Track readiness through ACRI",
    desc: "Post-program ACRI reassessment benchmarks your skill growth across all competency areas. Your score appears on your candidate profile visible to hiring managers on the Arzon partner desk.",
    deliverable: "Post-program ACRI score uplift report",
    color: "text-[#8A6D1F]",
    bg: "bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
  },
  {
    id: "prepare",
    step: "06",
    icon: UserCheck,
    label: "PREPARE",
    title: "Prepare for employer evaluation",
    desc: "CV rewrite, mock interviews with industry practitioners, and a recruiter-ready candidate profile sent to our hiring partner network with your ACRI score and verified project artifacts attached.",
    deliverable: "Recruiter-reviewed candidate profile + mock interview score",
    color: "text-rose-700",
    bg: "bg-rose-50 border-rose-200",
    dot: "bg-rose-500",
  },
  {
    id: "progress",
    step: "07",
    icon: TrendingUp,
    label: "PROGRESS",
    title: "Move toward relevant opportunities",
    desc: "Your profile routes to our fast-track partner desk network — Tier-1 CROs, healthcare IT firms, and specialty pharma companies actively hiring ACRI-verified freshers for entry-level roles.",
    deliverable: "Direct partner desk profile introduction",
    color: "text-teal-700",
    bg: "bg-teal-50 border-teal-200",
    dot: "bg-teal-600",
  },
];

export function ArzonMethod() {
  const [activeId, setActiveId] = useState<string>("assess");
  const active = STAGES.find((s) => s.id === activeId) || STAGES[0];
  const ActiveIcon = active.icon;

  return (
    <section id="how-it-works" className="py-12 sm:py-16 bg-white tone-light text-[#1A1A1A] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1B3F8B]/20 bg-sky-50 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#1B3F8B] shadow-xs">
            THE ARZON METHOD
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
            Your path from qualified
            <br />
            <span className="italic font-normal text-[#8A6D1F]">to career-ready.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans font-medium">
            A 7-stage structured process designed to close the gap between your academic degree and what Indian healthcare employers actually hire for.
          </p>
        </div>

        {/* Desktop: Connected Path Selector + Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Vertical Stage Navigator */}
          <div className="lg:col-span-4 space-y-1.5 relative">
            {/* Connecting Line */}
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-stone-200 z-0 hidden lg:block" />
            {STAGES.map((stage) => {
              const SIcon = stage.icon;
              const isActive = activeId === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveId(stage.id)}
                  className={`w-full text-left flex items-center gap-4 p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative z-10 ${
                    isActive
                      ? `bg-stone-50 border-[#1B3F8B] shadow-sm`
                      : "bg-white border-stone-100 hover:border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  <div className={`h-10 w-10 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isActive ? `${stage.bg} ${stage.color}` : "bg-stone-100 border-stone-200 text-stone-400"
                  }`}>
                    <SIcon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isActive ? stage.color : "text-stone-400"}`}>
                      {stage.step} · {stage.label}
                    </div>
                    <div className={`font-serif font-bold text-sm mt-0.5 ${isActive ? "text-[#1A1A1A]" : "text-stone-500"}`}>
                      {stage.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Stage Detail Expansion */}
          <div className="lg:col-span-8 bg-stone-50 tone-light rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl border-2 ${active.bg}`}>
                <ActiveIcon className={`h-7 w-7 ${active.color}`} />
              </div>
              <div>
                <div className={`text-[11px] font-mono font-bold uppercase tracking-widest ${active.color}`}>
                  STAGE {active.step} · {active.label}
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A] mt-1">
                  {active.title}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed font-medium">
              {active.desc}
            </p>

            <div className="bg-white tone-light card-light rounded-2xl border border-stone-200 p-4.5 flex items-center gap-3 shadow-xs">
              <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${active.dot}`} />
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-stone-500 block">DELIVERABLE AT THIS STAGE</span>
                <span className="font-sans font-bold text-sm text-[#1A1A1A] mt-0.5 block">{active.deliverable}</span>
              </div>
            </div>

            {/* Stage Progress Indicators */}
            <div className="flex gap-1.5 pt-2">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${
                    s.id === activeId ? `bg-[#1B3F8B]` : "bg-stone-200 hover:bg-stone-300"
                  }`}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {activeId !== STAGES[STAGES.length - 1].id && (
                <button
                  type="button"
                  onClick={() => {
                    const idx = STAGES.findIndex((s) => s.id === activeId);
                    if (idx < STAGES.length - 1) setActiveId(STAGES[idx + 1].id);
                  }}
                  className="flex-1 h-11 inline-flex items-center justify-center gap-2 text-xs font-bold border border-stone-300 text-stone-700 rounded-xl hover:bg-stone-100 transition-all cursor-pointer"
                >
                  Next Stage <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
              <a
                href="#eligibility-quiz"
                style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}
                className={`${activeId !== STAGES[STAGES.length - 1].id ? "flex-1" : "w-full"} h-12 inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor-pointer`}
              >
                <span>Check Your Readiness</span>
                <ArrowRight className="h-4 w-4 shrink-0" style={{ color: "#FFFFFF" }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
