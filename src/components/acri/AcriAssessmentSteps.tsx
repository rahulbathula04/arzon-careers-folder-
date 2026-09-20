import { User, ClipboardList, BarChart3, BookOpen, Award, ArrowRight } from "lucide-react";

export function AcriAssessmentSteps() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Role",
      desc: "Select Pharmacovigilance or explore other healthcare roles.",
      icon: User,
    },
    {
      num: "02",
      title: "Answer AI Assessment",
      desc: "40 adaptive questions + real-world scenarios.",
      icon: ClipboardList,
    },
    {
      num: "03",
      title: "Get Your ACRI Score",
      desc: "Detailed skill breakdown and industry benchmark.",
      icon: BarChart3,
    },
    {
      num: "04",
      title: "See Your Learning Path",
      desc: "Personalized roadmap to fill the gaps.",
      icon: BookOpen,
    },
    {
      num: "05",
      title: "Meet the ACRI Readiness Standard",
      desc: "Achieve ≥80% composite score and pass all 3 critical occupational gates.",
      icon: Award,
    },
  ];

  return (
    <section id="assess-section" className="bg-white tone-light py-16 lg:py-24 border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Title on Left, View Sample Questions on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-100">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span>A SMARTER WAY TO START YOUR CAREER</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1325]">
              How the AI Assessment Works
            </h2>
            <p className="text-base text-stone-600 leading-relaxed">
              A structured, research-backed process designed with industry experts to measure your real-world readiness — not just academic knowledge.
            </p>
          </div>

          <div>
            <a
              href="#interactive-demo"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-[#FAF8F5] px-5 py-3 text-xs font-bold uppercase tracking-wider text-stone-900 hover:bg-stone-100 hover:border-stone-400 transition-colors shadow-2xs"
            >
              <span>View Sample Questions</span>
              <ArrowRight className="h-4 w-4 text-emerald-600" />
            </a>
          </div>
        </div>

        {/* 5 Steps Horizontal Sequence */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative group">
                <div className="card-light h-full rounded-2xl border border-stone-200/90 bg-[#FAF8F5] p-5 hover:bg-white hover:border-stone-300 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    {/* Step Icon Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1325] text-white shadow-xs group-hover:bg-[#152342] transition-colors">
                        <Icon className="h-5 w-5 text-emerald-400" />
                      </div>
                      <span className="font-mono text-xs font-bold text-stone-400 group-hover:text-emerald-700 transition-colors">
                        {step.num}
                      </span>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="font-sans text-base font-bold text-[#0B1325] mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Micro label */}
                  <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center gap-1 text-[11px] font-semibold text-stone-500">
                    <span>Stage {idx + 1}</span>
                  </div>
                </div>

                {/* Arrow connector between steps on desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-stone-300">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
