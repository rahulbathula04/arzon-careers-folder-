import { useState } from "react";
import { CheckSquare, Square, Award, Sparkles, ArrowRight } from "lucide-react";

const SKILL_ITEMS = [
  { id: "s1", label: "Basic Human Anatomy & Physiology", points: 15, category: "Foundation" },
  { id: "s2", label: "ICD-10-CM / CPT Diagnostic Coding Principles", points: 25, category: "Medical Coding" },
  { id: "s3", label: "ICSR Single Case Processing & Safety Narratives", points: 25, category: "Pharmacovigilance" },
  { id: "s4", label: "MedDRA Medical Dictionary Hierarchy & Coding", points: 20, category: "Pharmacovigilance" },
  { id: "s5", label: "Good Clinical Practice (GCP E6 R2) Compliance", points: 15, category: "Clinical Research" },
  { id: "s6", label: "Electronic Data Capture (EDC) & eCRF Workflow", points: 20, category: "Clinical Data" },
];

export function SkillGapDiagnostic() {
  const [checkedIds, setCheckedIds] = useState<string[]>(["s1"]);

  const toggleSkill = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentScore = checkedIds.reduce((total, id) => {
    const item = SKILL_ITEMS.find((s) => s.id === id);
    return total + (item ? item.points : 0);
  }, 0);

  const totalPossible = 120;
  const matchPercentage = Math.min(100, Math.round((currentScore / totalPossible) * 100));

  return (
    <section id="eligibility-quiz" className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#1B3F8B] shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#1B3F8B]" />
            <span>INTERACTIVE SKILL GAP AUDIT</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
            Audit your candidate ACRI readiness. <br />
            <span className="italic font-normal text-[#8A6D1F]">
              Find out what skill modules you need.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans font-medium">
            Check the healthcare technical competencies you currently possess to calculate your baseline ACRI (Arzon Candidate Readiness Index) score.
          </p>
        </div>

        {/* Diagnostic Panel */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xl tone-light card-light grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Skill Selector Checklist */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
              Check all skills you can confidently execute today:
            </h3>

            <div className="space-y-2.5">
              {SKILL_ITEMS.map((item) => {
                const isChecked = checkedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleSkill(item.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isChecked
                        ? "bg-sky-50/80 border-[#1B3F8B] text-[#1A1A1A] shadow-2xs"
                        : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isChecked ? (
                        <CheckSquare className="h-5 w-5 text-[#1B3F8B] shrink-0" />
                      ) : (
                        <Square className="h-5 w-5 text-stone-400 shrink-0" />
                      )}
                      <div>
                        <span className="font-sans font-bold text-xs sm:text-sm text-[#1A1A1A] block">
                          {item.label}
                        </span>
                        <span className="font-mono text-[10px] text-stone-500 font-medium">
                          {item.category} • +{item.points} ACRI Points
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Meter & Readiness Output */}
          <div className="lg:col-span-5 bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-inner text-center">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider block">
                YOUR ACRI READINESS SCORE
              </span>
              <div className="font-mono font-black text-5xl text-[#1B3F8B]">
                {matchPercentage}%
              </div>
              <p className="text-xs font-mono text-stone-600 font-bold">
                {currentScore} / {totalPossible} Evaluated Points
              </p>
            </div>

            {/* Score Meter Bar */}
            <div className="h-3 w-full bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1B3F8B] rounded-full transition-all duration-500"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>

            <div className="bg-white tone-light card-light p-4 rounded-xl border border-stone-200 text-left space-y-1.5 shadow-2xs">
              <span className="font-mono text-[11px] font-bold text-[#8A6D1F] uppercase block">
                {matchPercentage >= 70
                  ? "High Placement Probability"
                  : matchPercentage >= 40
                  ? "Moderate Skill Gap Identified"
                  : "Foundation Training Recommended"}
              </span>
              <p className="text-xs text-stone-700 font-sans leading-relaxed font-medium">
                {matchPercentage >= 70
                  ? "You have strong baseline competencies! A 12-week track will refine your portfolio deliverables for top-tier healthcare hiring desks."
                  : "You need targeted hands-on case work in MedDRA, ICSR, or ICD-10 coding to reach the 80+ ACRI threshold expected by hiring managers."}
              </p>
            </div>

            <a
              href="#pricing"
              style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}
              className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor-pointer"
            >
              <span>Bridge My Skill Gap Now</span>
              <ArrowRight className="h-4 w-4" style={{ color: "#FFFFFF" }} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
