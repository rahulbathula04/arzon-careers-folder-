import { ArrowRight, X, Check, Sparkles } from "lucide-react";

const COLLEGE_GIVES = [
  "Theory of pharmacology & drug mechanisms",
  "Academic knowledge of clinical trial design",
  "Textbook understanding of regulatory pathways",
  "Lab practicals in controlled environments",
  "Exam-passing ability in medical terminology",
];

const EMPLOYERS_EXPECT = [
  "Process real ICSR cases in Argus Safety software",
  "Code clinical data in MedDRA classification hierarchy",
  "Execute eCRF queries and data cleaning workflows",
  "Navigate actual EDC tools (Medidata Rave, Oracle Clinical)",
  "Prepare career documentation reviewed by global hiring desks",
];

const GAP_STAGES = [
  { label: "YOUR DEGREE", detail: "B.Pharm / Pharm.D / B.Sc / Biotech", color: "bg-stone-100 text-stone-700 border-stone-300" },
  { label: "ACADEMIC KNOWLEDGE", detail: "Theory, concepts, exams", color: "bg-stone-100 text-stone-700 border-stone-300" },
  { label: "THE SKILL GAP", detail: "Where most freshers get stuck", color: "bg-rose-50 text-rose-700 border-rose-300", highlight: true },
  { label: "PRACTICAL CAPABILITY", detail: "Real tools, real files, real workflows", color: "bg-sky-50 text-[#1B3F8B] border-sky-300" },
  { label: "EMPLOYER READINESS", detail: "Hired into PV, Coding, CDM, CRA", color: "bg-teal-50 text-teal-700 border-teal-300" },
];

export function CareerGap() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-rose-700 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-rose-500" />
            THE HEALTHCARE CAREER GAP
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
            Your degree opens the door.
            <br />
            <span className="italic font-normal text-[#8A6D1F]">
              But employers test what's beyond it.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans font-medium">
            Indian healthcare employers hiring freshers for Pharmacovigilance, Medical Coding, and CDM roles don't just want a degree. They test specific, practical skills on day one — skills that no university syllabus covers.
          </p>
        </div>

        {/* Gap Visualization: Funnel */}
        <div className="flex flex-col items-center gap-1 w-full max-w-xl mx-auto px-2">
          {GAP_STAGES.map((stage, idx) => (
            <div key={idx} className="flex flex-col items-center w-full">
              <div
                className={`w-full rounded-xl border-2 px-3 sm:px-5 py-3 sm:py-3.5 text-center transition-all ${stage.color} ${
                  stage.highlight ? "shadow-md ring-2 ring-rose-200" : "shadow-xs"
                }`}
                style={{ maxWidth: `clamp(90%, ${100 - idx * 4}%, 100%)` }}
              >
                <div className={`font-mono font-black text-xs sm:text-sm tracking-wider uppercase ${stage.highlight ? "text-rose-700" : ""}`}>
                  {stage.label}
                </div>
                <div className="text-[10px] sm:text-[11px] font-sans font-medium mt-0.5 opacity-80">{stage.detail}</div>
              </div>
              {idx < GAP_STAGES.length - 1 && (
                <div className={`h-4 sm:h-5 w-0.5 ${stage.highlight ? "bg-rose-300" : "bg-stone-300"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

          {/* Left: What College Gives */}
          <div className="bg-white tone-light card-light rounded-2xl border border-stone-200 p-5 sm:p-8 space-y-5 shadow-xs">
            <div className="border-b border-stone-100 pb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500 block">WHAT YOUR DEGREE GIVES YOU</span>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1A1A1A] mt-1">Academic Foundation</h3>
            </div>
            <ul className="space-y-3">
              {COLLEGE_GIVES.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-stone-600 font-sans font-medium">
                  <div className="h-5 w-5 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-stone-500" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-stone-50 rounded-xl p-3 sm:p-3.5 border border-stone-200">
              <p className="text-xs text-stone-500 font-sans font-medium text-center">
                Necessary foundation — but not sufficient for role-specific hiring
              </p>
            </div>
          </div>

          {/* Right: What Employers Expect */}
          <div className="bg-white tone-light card-light rounded-2xl border-2 border-[#1B3F8B] p-5 sm:p-8 space-y-5 shadow-md">
            <div className="border-b border-stone-100 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] block">WHAT EMPLOYERS ACTUALLY TEST</span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1A1A1A] mt-1">Role-Specific Skills</h3>
              </div>
              <span className="text-[10px] font-mono font-bold bg-rose-50 border border-rose-200 text-rose-700 px-2.5 py-1 rounded-full">
                NOT IN SYLLABUS
              </span>
            </div>
            <ul className="space-y-3">
              {EMPLOYERS_EXPECT.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#1A1A1A] font-sans font-semibold">
                  <div className="h-5 w-5 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-3 w-3 text-rose-500" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-[#1B3F8B] rounded-xl p-3.5 sm:p-4">
              <p className="text-xs font-sans font-bold text-center" style={{ color: "#FFFFFF" }}>
                Arzon builds these exact skills in 12 weeks through live training + applied internship
              </p>
            </div>
          </div>
        </div>

        {/* Bridge CTA */}
        <div className="text-center">
          <a
            href="#eligibility-quiz"
            style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}
            className="h-12 px-6 sm:px-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor-pointer"
          >
            <span>Bridge My Skill Gap — Check Readiness</span>
            <ArrowRight className="h-4 w-4 shrink-0" style={{ color: "#FFFFFF" }} />
          </a>
        </div>
      </div>
    </section>
  );
}
