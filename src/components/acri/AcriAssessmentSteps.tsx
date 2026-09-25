import { User, ClipboardList, BarChart3, BookOpen, Award, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AcriAssessmentSteps() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Role",
      desc: "Select from 6 in-demand healthcare careers matching your academic qualification.",
      icon: User,
    },
    {
      num: "02",
      title: "Take the ACRI Assessment",
      desc: "25-minute calibrated evaluation with real ICSR cases, MedDRA coding, and safety triage.",
      icon: ClipboardList,
    },
    {
      num: "03",
      title: "Get Your Result",
      desc: "Instant objective score out of 100 with clear strength analysis and competency gap mapping.",
      icon: BarChart3,
    },
    {
      num: "04",
      title: "Follow Your Learning Path",
      desc: "Targeted 12-week role-readiness curricula processing real anonymized clinical datasets.",
      icon: BookOpen,
    },
    {
      num: "05",
      title: "Earn a Verified Credential",
      desc: "Cryptographically verified ACRI credential shared directly with our 14+ hiring partner CROs.",
      icon: Award,
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#FAF8F5] py-16 lg:py-24 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header matching comp */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200/80">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-[#005B4F]" />
              <span>HOW IT WORKS · CRADLE-TO-CAREER PATH</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1325]">
              From Assessment to a Clear Career Path
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              A proven 5-step process designed with healthcare industry experts to bridge the gap between university syllabus and workplace competence.
            </p>
          </div>

          <div>
            <Link
              to="/career-engine/test"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] px-5 py-3 text-xs font-semibold text-white transition-colors shadow-xs"
            >
              <span>Start Assessment (Stage 01)</span>
              <ArrowRight className="h-4 w-4 text-emerald-300" />
            </Link>
          </div>
        </div>

        {/* 5 Steps Horizontal Sequence */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative group">
                <div className="card-light h-full rounded-2xl border border-stone-200 bg-white tone-light p-5 hover:border-[#005B4F]/50 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    {/* Step Icon Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1325] text-white shadow-xs group-hover:bg-[#005B4F] transition-colors">
                        <Icon className="h-5 w-5 text-emerald-300" />
                      </div>
                      <span className="font-mono text-xs font-bold text-stone-400 group-hover:text-[#005B4F] transition-colors">
                        {step.num}
                      </span>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="font-serif text-base font-bold text-[#0B1325] mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Micro label */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-stone-500">
                    <span className="font-mono text-[10px] text-stone-400">Step {idx + 1} of 5</span>
                    <span className="text-[#005B4F] font-bold text-[10px] uppercase">
                      {idx === 4 ? "Goal" : "Next →"}
                    </span>
                  </div>
                </div>

                {/* Arrow connector between steps on desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <div className="h-6 w-6 rounded-full bg-white tone-light border border-stone-200 flex items-center justify-center text-stone-400 shadow-2xs">
                      <ArrowRight className="h-3 w-3" />
                    </div>
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
