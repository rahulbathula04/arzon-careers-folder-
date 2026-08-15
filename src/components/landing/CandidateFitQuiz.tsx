import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, AlertCircle, Award, Target, RefreshCw } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { LiveOpportunitiesData } from "@/data/liveOpportunities";
import { trackEvent } from "@/lib/analytics";

interface QuizAnswers {
  track: string;
  education: string;
  skills: string[];
  timeline: string;
}

export function CandidateFitQuiz() {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    track: "data-analyst",
    education: "btech-stem",
    skills: ["sql", "python"],
    timeline: "immediate",
  });
  const [isCalculated, setIsCalculated] = useState(false);

  const handleNextStep = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
      trackEvent("fit_quiz_step_complete", { step });
    } else {
      setIsCalculated(true);
      trackEvent("fit_quiz_complete", {
        track: answers.track,
        education: answers.education,
        timeline: answers.timeline,
        skillsCount: answers.skills.length,
      });
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsCalculated(false);
  };

  const toggleSkill = (skillId: string) => {
    setAnswers((prev) => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter((s) => s !== skillId)
        : [...prev.skills, skillId],
    }));
  };

  // Calculate score logic based on track and skills selected
  const calculateScore = () => {
    let base = 60;
    if (answers.education === "btech-stem" || answers.education === "mca") base += 15;
    base += answers.skills.length * 6;
    if (answers.timeline === "immediate") base += 5;
    return Math.min(Math.max(base, 68), 94);
  };

  const score = calculateScore();
  const targetRole = LiveOpportunitiesData.ROLES.find(
    (r) => r.trackSlug === answers.track
  ) || LiveOpportunitiesData.ROLES[0];

  return (
    <section
      id="eligibility-quiz"
      aria-labelledby="fit-quiz-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <PremiumChip variant="navy" size="md">
            2-MINUTE CANDIDATE INDUSTRY-FIT CALCULATOR
          </PremiumChip>
          <h2
            id="fit-quiz-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            Check If Your Profile Qualifies for <span className="italic text-[#1B3F8B]">Live Employer Intake.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans">
            Evaluate your academic background, technical skills, and target readiness against active HSBC and JPMorgan Chase hiring briefs.
          </p>

          {/* Candidate Competition Scarcity Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 font-mono text-xs font-bold text-stone-700">
            <span className="px-3 py-1 rounded-full bg-stone-200 text-stone-900 border border-stone-300">
              36% ACCEPT RATE
            </span>
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-200">
              64% TURNED AWAY
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              1,842 ASSESSED THIS MONTH
            </span>
          </div>
        </div>

        {/* Quiz Container */}
        <div className="rounded-3xl border border-stone-300 bg-[#FAF8F5] p-6 sm:p-10 shadow-md relative overflow-hidden">
          {!isCalculated ? (
            <div className="space-y-8">
              {/* Progress Tracker */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs text-stone-600 font-bold">
                  <span>STEP {step} OF 4</span>
                  <span>{step * 25}% COMPLETED</span>
                </div>
                <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1B3F8B] transition-all duration-300 rounded-full"
                    style={{ width: `${step * 25}%` }}
                  />
                </div>
              </div>

              {/* Step 1: Target Track */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                    01. Select Your Target Career Role
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "data-analyst", label: "Data Analyst", employer: "JPMorgan Chase Focus", ctc: "₹14 LPA" },
                      { id: "ai-ml", label: "AI / ML Engineer", employer: "HSBC Focus", ctc: "As per JD" },
                      { id: "python-dev", label: "Python Developer", employer: "Partner Network", ctc: "₹6–10 LPA" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setAnswers((p) => ({ ...p, track: opt.id }))}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          answers.track === opt.id
                            ? "bg-[#1B3F8B] text-white border-[#1B3F8B] shadow-md"
                            : "bg-white text-stone-800 border-stone-300 hover:border-stone-400"
                        }`}
                      >
                        <div className="font-serif font-bold text-base">{opt.label}</div>
                        <div className={`text-xs mt-1 ${answers.track === opt.id ? "text-stone-200" : "text-stone-500"}`}>
                          {opt.employer} · {opt.ctc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Educational Background */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                    02. Educational Background & Graduation Status
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "btech-stem", label: "B.Tech / BE (CS, IT, ECE, EEE, Mechanical, Civil, STEM)" },
                      { id: "mca", label: "MCA / M.Tech / M.Sc Data Science / Statistics" },
                      { id: "degree-stem", label: "B.Sc / BCA / B.Com (Computers / Data)" },
                      { id: "other", label: "Other Graduate Degree" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setAnswers((p) => ({ ...p, education: opt.id }))}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          answers.education === opt.id
                            ? "bg-[#1B3F8B] text-white border-[#1B3F8B] shadow-md"
                            : "bg-white text-stone-800 border-stone-300 hover:border-stone-400"
                        }`}
                      >
                        <div className="font-sans font-bold text-xs sm:text-sm">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Skill Self-Assessment */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                    03. Select Skills You Have Basic Exposure To
                  </h3>
                  <p className="text-xs text-stone-600 font-sans">
                    Select all that apply. It is completely normal if you are missing some — Arzon training bridges these gaps.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: "sql", label: "SQL Queries" },
                      { id: "python", label: "Python Basics" },
                      { id: "excel", label: "Advanced Excel" },
                      { id: "powerbi", label: "Power BI / Tableau" },
                      { id: "ml", label: "Machine Learning" },
                      { id: "apis", label: "REST APIs / Git" },
                    ].map((opt) => {
                      const selected = answers.skills.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => toggleSkill(opt.id)}
                          className={`p-3.5 rounded-xl border text-left font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                            selected
                              ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
                              : "bg-white text-stone-700 border-stone-300 hover:border-stone-400"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {selected && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Timeline */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                    04. Target Preparation & Application Timeline
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "immediate", label: "Immediate Intake", desc: "Ready for current Sept 15 window" },
                      { id: "1month", label: "Next 30 Days", desc: "Preparing for upcoming batch" },
                      { id: "exploring", label: "Exploring Roles", desc: "Planning ahead" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setAnswers((p) => ({ ...p, timeline: opt.id }))}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          answers.timeline === opt.id
                            ? "bg-[#1B3F8B] text-white border-[#1B3F8B] shadow-md"
                            : "bg-white text-stone-800 border-stone-300 hover:border-stone-400"
                        }`}
                      >
                        <div className="font-serif font-bold text-base">{opt.label}</div>
                        <div className={`text-xs mt-1 ${answers.timeline === opt.id ? "text-stone-200" : "text-stone-500"}`}>
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    onClick={() => setStep((p) => p - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-stone-600 bg-stone-200 hover:bg-stone-300 transition-all cursor-pointer"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-xs sm:text-sm text-white bg-[#1B3F8B] hover:bg-[#153270] shadow-sm transition-all cursor-pointer"
                >
                  <span>{step === 4 ? "GENERATE FIT SCORE" : "NEXT QUESTION"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Results State */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-[#1B3F8B]">
                    EVALUATION COMPLETE
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                    Your Arzon Industry-Fit Assessment
                  </h3>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-stone-600 bg-white border border-stone-300 hover:bg-stone-100 cursor-pointer self-start sm:self-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
              </div>

              {/* Score Display Box */}
              <div className="bg-white rounded-2xl border border-stone-300 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xs">
                <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-stone-200 pb-4 md:pb-0 md:pr-6 space-y-1">
                  <span className="font-mono text-xs font-bold text-stone-500 uppercase">
                    MATCH SCORE
                  </span>
                  <div className="font-serif text-5xl font-extrabold text-[#1B3F8B]">
                    {score} <span className="text-xl text-stone-400 font-normal">/ 100</span>
                  </div>
                  <span className="inline-block px-3 py-0.5 rounded-full font-mono text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    HIGH CANDIDATE POTENTIAL
                  </span>
                </div>

                <div className="md:col-span-8 space-y-3 font-sans">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase text-stone-500">
                      Target Opportunity Match
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
                      {targetRole.role} — {targetRole.employer}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1">
                      Eligibility Window: <span className="font-bold text-stone-900">{targetRole.deadlineDisplay}</span> · CTC: <span className="font-bold text-emerald-800">{targetRole.ctcDisplay}</span>
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-700">
                    <div className="flex items-center gap-2 text-emerald-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Degree & academic background aligns with intake criteria.</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-800 font-medium">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Recommended focus: Bank-domain capstones & timed mock assessment.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Banner */}
              <div className="bg-[#1B3F8B] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-serif text-lg font-bold">
                    Submit Your Fit Report to the Certified Partner Desk
                  </h4>
                  <p className="text-xs text-stone-200">
                    No payment required to submit your candidate dossier. Hiring decisions remain with the employer.
                  </p>
                </div>

                <a
                  href="#apply"
                  onClick={() => trackEvent("fit_quiz_submit_dossier_click", { score })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sans font-bold text-xs sm:text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-sm transition-all shrink-0 cursor-pointer"
                  style={{ color: "#0F172A", backgroundColor: "#FFFFFF" }}
                >
                  <span style={{ color: "#0F172A" }}>SUBMIT DOSSIER — FREE</span>
                  <ArrowRight className="w-4 h-4 text-slate-900" style={{ color: "#0F172A" }} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
