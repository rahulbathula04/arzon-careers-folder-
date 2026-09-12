import { CheckCircle, Info } from "lucide-react";

export function EmployerSkillsSection() {
  const skillStats = [
    { percent: "68%", skill: "Medical Terminology & Anatomy", domain: "Universal Healthcare" },
    { percent: "55%", skill: "Pharmacology & Pharmacodynamics", domain: "Core B.Pharm Skill" },
    { percent: "56%", skill: "Clinical Chart Review & Documentation", domain: "Clinical Operations" },
    { percent: "75%", skill: "Advanced Excel (Pivot, VLOOKUP, Formulas)", domain: "Data & Operations" },
    { percent: "36%", skill: "ICH-GCP Principles & Guidelines", domain: "Clinical Research & CDM" },
    { percent: "18%", skill: "Pharmacovigilance / GVP Concepts & Argus", domain: "Drug Safety Operations" },
  ];

  return (
    <section className="w-full bg-white tone-light py-14 sm:py-20 border-b border-[var(--color-border-warm)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <span>EMPLOYER REQUIREMENTS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-medical-navy)] tracking-tight">
            WHAT EMPLOYERS ACTUALLY ASK FOR
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-600 mt-2">
            Frequency of technical requirements extracted from Arzon Global's analyzed Indian healthcare job postings.
          </p>
        </div>

        {/* 6 Data Percentage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {skillStats.map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--color-warm-paper)] rounded-2xl p-6 border border-stone-200 hover:border-teal-400 shadow-xs transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-3xl font-black text-[var(--color-arzon-blue)]">
                    {item.percent}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-stone-500 uppercase px-2 py-0.5 rounded bg-stone-200/60">
                    {item.domain}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[var(--color-medical-navy)] mt-1">
                  {item.skill}
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center gap-1.5 text-xs text-stone-600">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Screened in entry-level hiring</span>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Highlight Banner */}
        <div className="max-w-3xl mx-auto bg-stone-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 flex items-start gap-4 shadow-lg">
          <Info className="w-6 h-6 text-teal-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <p className="font-bold text-teal-300 font-mono uppercase tracking-wider mb-1">
              Important Insight
            </p>
            <p className="text-stone-300">
              Arzon's analyzed dataset shows that <strong>the goal is NOT to learn everything</strong>. The goal is to know precisely which 2-3 specific skills matter for the career path you choose, and ignore the rest.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
