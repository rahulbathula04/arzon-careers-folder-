import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, CheckCircle2, XCircle, ShieldCheck, Sparkles } from "lucide-react";

interface ScenarioQuestion {
  number: string;
  category: string;
  timeRemaining: string;
  scenario: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
  incorrectExplanation: string;
}

const SAMPLE_QUESTIONS: ScenarioQuestion[] = [
  {
    number: "Question 12/40",
    category: "PV Scenario",
    timeRemaining: "02:10",
    scenario:
      "A patient reports a severe rash after starting a new medication. The case contains patient, drug, and event details. What should be done first?",
    options: [
      { key: "A", text: "Assess causality" },
      { key: "B", text: "Check if it meets serious criteria" },
      { key: "C", text: "Verify case validity requirements" },
      { key: "D", text: "Check if it is expected" },
    ],
    correctKey: "C",
    explanation:
      "Correct. Under ICH E2A and E2B(R3) guidelines, an ICSR must first satisfy the 4 minimum validity criteria: an identifiable patient, an identifiable reporter, at least one suspect medicinal product, and at least one adverse event. Seriousness, expectedness, and causality can only be assessed on a valid case.",
    incorrectExplanation:
      "Not quite. While this step is critical in the PV workflow, an ICSR cannot be processed for seriousness, expectedness, or causality until the 4 minimum validity criteria are verified.",
  },
  {
    number: "Question 18/40",
    category: "Regulatory Reporting",
    timeRemaining: "01:45",
    scenario:
      "A patient taking an approved oncology drug suffers unexpected acute hepatic failure requiring immediate hospitalization. What is the standard expedited reporting deadline for this Serious Adverse Drug Reaction (SADR)?",
    options: [
      { key: "A", text: "7 calendar days" },
      { key: "B", text: "15 calendar days" },
      { key: "C", text: "30 calendar days" },
      { key: "D", text: "Report in the next Periodic Safety Update Report (PSUR)" },
    ],
    correctKey: "B",
    explanation:
      "Correct. Under US FDA (21 CFR 314.80) and EMA GVP Module VI, serious and unexpected adverse drug reactions (not fatal or life-threatening) must be submitted within 15 calendar days of receiving primary information.",
    incorrectExplanation:
      "Not quite. 7 calendar days applies strictly to fatal or life-threatening unexpected reactions. Non-fatal serious unexpected reactions require 15-calendar-day expedited submission.",
  },
  {
    number: "Question 25/40",
    category: "MedDRA Coding",
    timeRemaining: "02:00",
    scenario:
      "When processing an adverse event report in Argus Safety, a reporter's verbatim term 'severe heart attack' must be coded using MedDRA. At which hierarchy level is the term directly entered?",
    options: [
      { key: "A", text: "System Organ Class (SOC)" },
      { key: "B", text: "High Level Term (HLT)" },
      { key: "C", text: "Preferred Term (PT)" },
      { key: "D", text: "Lowest Level Term (LLT)" },
    ],
    correctKey: "D",
    explanation:
      "Correct. In MedDRA, verbatim adverse event terms are always entered at the Lowest Level Term (LLT) level to maintain maximum clinical specificity, which then programmatically maps to a single Preferred Term (PT).",
    incorrectExplanation:
      "Not quite. Preferred Term (PT) represents the distinct medical concept, but data entry and verbatim capture must always map to the Lowest Level Term (LLT) first.",
  },
];

export function AcriInteractiveQuestion() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQ = SAMPLE_QUESTIONS[currentIdx];
  const isCorrect = selectedKey === currentQ.correctKey;

  const handleSelectOption = (key: string) => {
    setSelectedKey(key);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setSelectedKey(null);
    setShowFeedback(false);
    setCurrentIdx((prev) => (prev + 1) % SAMPLE_QUESTIONS.length);
  };

  return (
    <section
      id="interactive-demo"
      className="relative overflow-hidden bg-[#07241A] py-16 lg:py-24 text-white"
    >
      {/* Background Subtle Gradient & Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Context & CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-400">
              <Sparkles className="h-3 w-3" />
              <span>Interactive Assessment Demo</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Real Skills.<br />
              Real Scenarios.<br />
              Real Career Outcomes.
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed">
              Our AI assessment is built using global pharmacovigilance standards (ICH, WHO, CIOMS) and real job requirements from top employers.
            </p>

            <div>
              <Link
                to="/career-engine/start"
                className="inline-flex items-center gap-2 rounded-xl bg-white tone-light px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1325] hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <span>Take the First Step</span>
                <ArrowRight className="h-4 w-4 text-emerald-700" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-semibold text-emerald-300/80">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Evidence-based
              </span>
              <span>·</span>
              <span>Industry-aligned</span>
              <span>·</span>
              <span>Continuously updated</span>
            </div>
          </div>

          {/* Center Column: The Interactive Assessment Card */}
          <div className="lg:col-span-5">
            <div className="card-light rounded-2xl border border-stone-200 bg-white p-6 text-stone-900 shadow-2xl transition-all">
              {/* Question Header Bar */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-3 text-xs font-semibold text-stone-500">
                <span className="font-mono font-bold text-stone-700">{currentQ.number}</span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                  {currentQ.category}
                </span>
                <span className="flex items-center gap-1 font-mono text-stone-600">
                  <Clock className="h-3.5 w-3.5 text-stone-400" /> {currentQ.timeRemaining}
                </span>
              </div>

              {/* Scenario Prompt */}
              <p className="mt-4 text-sm font-semibold text-[#0B1325] leading-relaxed">
                {currentQ.scenario}
              </p>

              {/* Options */}
              <div className="mt-5 space-y-2.5">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedKey === opt.key;
                  const isThisCorrect = opt.key === currentQ.correctKey;

                  let optionStyle =
                    "border-stone-200 bg-stone-50/60 hover:bg-stone-100 hover:border-stone-300 text-stone-800";

                  if (showFeedback) {
                    if (isThisCorrect) {
                      optionStyle =
                        "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500";
                    } else if (isSelected && !isThisCorrect) {
                      optionStyle =
                        "border-rose-400 bg-rose-50 text-rose-950 font-medium";
                    } else {
                      optionStyle = "border-stone-200 bg-stone-50/40 text-stone-400 opacity-60";
                    }
                  } else if (isSelected) {
                    optionStyle =
                      "border-[#0B1325] bg-stone-100 text-stone-950 font-bold";
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleSelectOption(opt.key)}
                      className={`w-full text-left rounded-xl border p-3 text-xs sm:text-[13px] transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-stone-300 bg-white tone-light font-mono text-xs font-bold text-stone-700">
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                      {showFeedback && isThisCorrect && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {showFeedback && isSelected && !isThisCorrect && (
                        <XCircle className="h-4 w-4 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Feedback & Rationale Explanation */}
              {showFeedback && (
                <div
                  className={`mt-4 rounded-xl p-3.5 text-xs leading-relaxed ${
                    isCorrect
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                      : "bg-amber-50 border border-amber-200 text-amber-900"
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Correct Clinical Decision</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5 text-amber-600" />
                        <span>Clinical Rationale</span>
                      </>
                    )}
                  </div>
                  <p>{isCorrect ? currentQ.explanation : currentQ.incorrectExplanation}</p>
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-medium">
                  {showFeedback ? "Clinical reasoning logged" : "Select an answer to see rationale"}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B1325] px-4 py-2 text-xs font-bold text-white hover:bg-[#152342] transition-colors cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="h-3 w-3 text-emerald-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: More than just a test Checklist */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-white">
              More than<br />just a test.
            </h3>
            <p className="text-xs text-emerald-100/70">
              Evaluates end-to-end operational competencies expected in tier-1 life sciences GCCs:
            </p>

            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-emerald-50">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Scenario-based questions</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Case processing tasks</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Data interpretation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Narrative writing</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Real industry tools interface</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
