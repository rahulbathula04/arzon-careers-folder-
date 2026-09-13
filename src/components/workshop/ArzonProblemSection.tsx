import { Lightbulb, ArrowRight } from "lucide-react";

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
    <section className="w-full bg-[var(--color-warm-paper)] py-12 sm:py-20 border-b border-[var(--color-border-warm)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: The Graduate Dilemma Dossier Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md bg-white tone-light card-light rounded-3xl p-5 sm:p-7 border border-stone-200/90 shadow-xl overflow-hidden">
              
              {/* Header Dossier Strip */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <span className="font-mono text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Career Diagnostic
                </span>
                <span className="font-mono text-[10px] font-medium text-stone-500">
                  Ref: EDU-IND-2026
                </span>
              </div>

              {/* Student Persona & Core Identity */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[var(--color-medical-navy)] border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative mb-2 ring-4 ring-amber-100/80">
                  <img
                    src="/images/pharmacy-student-avatar.jpg"
                    alt="Thoughtful B.Pharm Student"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[10px] font-bold mb-3">
                  <span>🎓 B.Pharm Final Year</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-amber-800">Direction Unknown</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[var(--color-medical-navy)]">
                  The B.Pharm Graduate Dilemma
                </h3>
                <p className="font-sans text-xs text-stone-600 mt-1 leading-relaxed max-w-xs">
                  4 years of intense pharma theory, but zero syllabus coverage on which industry domain fits your aptitude, skills, and salary expectations.
                </p>
              </div>

              {/* The 4 Core Unanswered Dilemmas (Non-overlapping, responsive chip matrix) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4 relative z-10">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50/90 border border-stone-200 text-left">
                  <span className="text-sm shrink-0">💊</span>
                  <span className="font-sans text-xs font-semibold text-stone-800 leading-snug">
                    Pharmacovigilance maybe?
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50/90 border border-stone-200 text-left">
                  <span className="text-sm shrink-0">📄</span>
                  <span className="font-sans text-xs font-semibold text-stone-800 leading-snug">
                    Clinical Research?
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50/90 border border-stone-200 text-left">
                  <span className="text-sm shrink-0">💻</span>
                  <span className="font-sans text-xs font-semibold text-stone-800 leading-snug">
                    Medical Coding?
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50 border border-amber-200 text-left">
                  <span className="text-sm shrink-0">❓</span>
                  <span className="font-sans text-xs font-bold text-amber-900 leading-snug">
                    Which fits my goals?
                  </span>
                </div>
              </div>

              {/* Bottom Principle Highlight Box */}
              <div className="relative z-10 bg-teal-50/90 border border-teal-200/90 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-teal-600 text-white shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-[var(--color-medical-navy)] uppercase tracking-wider">
                    Understand the Job. Not the Course.
                  </h4>
                  <p className="font-sans text-xs text-teal-900 mt-0.5 leading-snug">
                    Make informed career decisions based on verified employer screening criteria, not promotional course claims.
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

            <div className="space-y-3 font-sans text-sm text-stone-700 leading-relaxed">
              <p>
                A B.Pharm degree gives you scientific foundations. It does <strong>not automatically give you a career roadmap</strong>. Most students know textbook chemistry and pharmacology, but very few understand the hiring market.
              </p>
              <p>
                Without verified job-market data, candidates spend months taking random courses, chasing mismatched roles, or settling for low-paying jobs out of sheer confusion.
              </p>
            </div>

            {/* 9 Market Questions Grid with Clean Numbered Monospace Badges */}
            <div className="pt-1">
              <p className="font-mono text-xs font-bold text-[var(--color-medical-navy)] uppercase tracking-wider mb-3">
                Before choosing any path or course, do you know the answers to these 9 questions?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {marketQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white tone-light card-light border border-stone-200/80 hover:border-teal-400 transition-colors shadow-xs"
                  >
                    <span className="font-mono text-[11px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100 shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-xs text-stone-800 font-medium leading-snug">
                      {q}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Central Callout Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="text-center sm:text-left">
                <span className="font-sans text-[11px] text-teal-400 font-bold uppercase tracking-wider">
                  Central Principle
                </span>
                <p className="font-sans text-sm sm:text-base font-extrabold text-white mt-0.5">
                  DON'T CHOOSE A COURSE. CHOOSE A CAREER PATH FIRST.
                </p>
              </div>
              <button
                type="button"
                onClick={onReserveClick}
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer min-h-[48px]"
              >
                <span>GET MY FREE CAREER MAP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
