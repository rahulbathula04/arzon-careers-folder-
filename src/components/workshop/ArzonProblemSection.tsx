import { HelpCircle, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";

interface ArzonProblemSectionProps {
  onReserveClick: () => void;
}

export function ArzonProblemSection({ onReserveClick }: ArzonProblemSectionProps) {
  const marketQuestions = [
    "Which companies hire freshers directly after B.Pharm?",
    "Which healthcare roles are actually open to B.Pharm vs M.Pharm?",
    "What does each job involve on a day-to-day operational level?",
    "Which technical & clinical skills are screened during interviews?",
    "Which software tools and platforms (Argus, EDC, ICD-10) matter?",
    "Which certifications are valued vs unnecessary cash grabs?",
    "What starting salary (LPA) should freshers realistically expect?",
    "Which careers require postgraduate degrees vs on-job growth?",
    "Which cities (Hyderabad, Bengaluru, Pune, NCR) have peak openings?",
  ];

  return (
    <section className="w-full bg-[var(--color-warm-paper)] py-14 sm:py-20 border-b border-[var(--color-border-warm)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Representation of Student Confusion vs Clarity */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md bg-white tone-light rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xl overflow-hidden">
              {/* Decorative Subtle Background Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

              {/* Student Persona Representation */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[var(--color-medical-navy)] border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative">
                    <img
                      src="/images/pharmacy-student-avatar.jpg"
                      alt="Thoughtful B.Pharm Student"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Floating Question Bubbles matching Mockup */}
                  <div className="absolute -top-4 -left-12 bg-white tone-light px-3 py-1.5 rounded-full border border-stone-200 shadow-md font-mono text-[11px] font-bold text-slate-700 whitespace-nowrap motion-safe:animate-bounce">
                    Pharmacovigilance maybe? 🤔
                  </div>
                  <div className="absolute top-8 -right-16 bg-white tone-light px-3 py-1.5 rounded-full border border-stone-200 shadow-md font-mono text-[11px] font-bold text-slate-700 whitespace-nowrap">
                    Clinical research? 📄
                  </div>
                  <div className="absolute -bottom-2 -left-14 bg-white tone-light px-3 py-1.5 rounded-full border border-stone-200 shadow-md font-mono text-[11px] font-bold text-slate-700 whitespace-nowrap">
                    Medical coding? 💻
                  </div>
                  <div className="absolute -bottom-6 -right-10 bg-amber-50 text-amber-900 px-3 py-1.5 rounded-full border border-amber-200 shadow-md font-mono text-[11px] font-bold whitespace-nowrap">
                    I'm not sure... ❓
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[var(--color-medical-navy)]">
                  The B.Pharm Graduate Dilemma
                </h3>
                <p className="font-sans text-xs text-stone-600 mt-2 leading-relaxed max-w-xs">
                  4 years of intense pharma theory, but zero clarity on which domain fits your goals, skills, and salary expectations.
                </p>
              </div>

              {/* Bottom Callout Highlight Box matching Mockup */}
              <div className="mt-8 relative z-10 bg-teal-50/80 border border-teal-200/90 rounded-2xl p-4 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-teal-600 text-white shrink-0">
                  <Lightbulb className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-[var(--color-medical-navy)] uppercase tracking-wider">
                    Understand the Job. Not the Course.
                  </h4>
                  <p className="font-sans text-xs text-teal-900 mt-1 leading-snug">
                    Make informed career decisions based on what healthcare employers actually screen and hire for.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Problem Narrative & 9 Market Questions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono font-bold tracking-wide">
              <span>⚠️ CAREER DECISION RISK</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-medical-navy)] tracking-tight leading-tight">
              YOU HAVE A B.PHARM DEGREE.
              <br />
              <span className="text-[var(--color-arzon-blue)]">
                BUT DO YOU KNOW WHAT JOB YOU ARE PREPARING FOR?
              </span>
            </h2>

            <div className="space-y-4 font-sans text-sm text-stone-700 leading-relaxed">
              <p>
                A B.Pharm degree gives you a foundation. It does <strong>not automatically give you a career direction</strong>. Most students know the degree syllabus, but very few understand the hiring market.
              </p>
              <p>
                Without verified job-market data, candidates spend months taking random courses, chasing unrealistic roles, or settling for low-paying jobs out of sheer confusion.
              </p>
            </div>

            {/* 9 Market Questions Grid */}
            <div className="pt-2">
              <p className="font-mono text-xs font-bold text-[var(--color-medical-navy)] uppercase tracking-wider mb-3">
                Before choosing a course, do you know the answers to these?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {marketQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white tone-light border border-stone-200/70 text-xs font-sans text-stone-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Central Callout Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-medical-navy)] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div>
                <span className="font-mono text-[11px] text-teal-300 font-bold uppercase tracking-wider">
                  Central Principle
                </span>
                <p className="font-serif text-lg font-bold text-white mt-0.5">
                  DON'T CHOOSE A COURSE. CHOOSE A CAREER PATH FIRST.
                </p>
              </div>
              <button
                type="button"
                onClick={onReserveClick}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                style={{ color: '#FFFFFF' }}
              >
                GET MY FREE CAREER MAP
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
