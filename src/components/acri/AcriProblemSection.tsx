import { BookOpen, FileCheck, Award, ArrowRight } from "lucide-react";

export function AcriProblemSection() {
  return (
    <section className="bg-[#FAF8F5] py-16 lg:py-24 border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white tone-light px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-stone-600 shadow-2xs">
            <span>THE EMPLOYABILITY REALITY</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1325]">
            A Degree Doesn&apos;t Tell You If You&apos;re Ready.
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            A Pharm.D, B.Pharm or M.Pharm degree tells employers what you studied. It does not necessarily show what you can do with that knowledge in a real PV workflow.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Academic Knowledge */}
          <div className="card-light rounded-2xl border border-stone-200 bg-white p-7 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-800 mb-5">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
              01 · Academic Knowledge
            </span>
            <h3 className="font-sans text-xl font-bold text-[#0B1325] mt-1.5 mb-2.5">
              You know the concepts.
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Pharmacology, drug classifications, adverse reactions, and mechanism of actions learned across 4–6 years of university syllabus.
            </p>
            <div className="mt-5 pt-4 border-t border-stone-100 text-xs text-stone-500 font-medium">
              Necessary foundation, but purely theoretical.
            </div>
          </div>

          {/* Card 2: Workplace Application */}
          <div className="card-light rounded-2xl border border-stone-200 bg-white p-7 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-800 mb-5">
              <FileCheck className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
              02 · Workplace Application
            </span>
            <h3 className="font-sans text-xl font-bold text-[#0B1325] mt-1.5 mb-2.5">
              Can you apply them to a real case?
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Evaluating an ambiguous narrative, verifying 4 minimum ICSR criteria, assessing expectedness against an SmPC, and identifying serious adverse events under strict deadlines.
            </p>
            <div className="mt-5 pt-4 border-t border-stone-100 text-xs text-stone-500 font-medium">
              What CRO managers actually test in technical rounds.
            </div>
          </div>

          {/* Card 3: Industry Readiness */}
          <div className="card-light rounded-2xl border border-emerald-200 bg-emerald-50/40 p-7 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 mb-5">
              <Award className="h-6 w-6 text-emerald-700" />
            </div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
              03 · Industry Readiness (ACRI)
            </span>
            <h3 className="font-sans text-xl font-bold text-[#0B1325] mt-1.5 mb-2.5">
              Can you meet the defined standard?
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Demonstrated capability score of 80%+ across critical competencies, verified case documentation, and proven attention to detail.
            </p>
            <div className="mt-5 pt-4 border-t border-emerald-200/60 text-xs font-semibold text-emerald-900">
              The objective threshold employers use to shortlist.
            </div>
          </div>
        </div>

        {/* Visual Progression Ribbon */}
        <div className="mt-10 rounded-xl border border-stone-200 bg-white tone-light p-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-around gap-4 text-xs font-bold uppercase tracking-wider text-stone-700">
            <span className="text-stone-500 font-mono">Degree</span>
            <ArrowRight className="h-4 w-4 text-stone-400" />
            <span className="text-stone-700 font-mono">Knowledge</span>
            <ArrowRight className="h-4 w-4 text-stone-400" />
            <span className="text-stone-700 font-mono">Application</span>
            <ArrowRight className="h-4 w-4 text-emerald-600" />
            <span className="text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full font-mono">
              Industry Readiness (ACRI)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
