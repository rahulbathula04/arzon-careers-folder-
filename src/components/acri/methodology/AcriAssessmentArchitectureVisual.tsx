import { useState } from "react";
import {
  FileCode,
  FileCheck2,
  Users,
  Clock,
  Layers,
  CheckCircle2,
  ChevronRight,
  Eye,
  AlertTriangle,
} from "lucide-react";

interface QuestionModal {
  type: string;
  count: number;
  pct: number;
  description: string;
  exampleQuestion: {
    prompt: string;
    context: string;
    options: { text: string; isCorrect: boolean; feedback: string }[];
  };
}

const QUESTION_DISTRIBUTIONS: QuestionModal[] = [
  {
    type: "Authentic Clinical Case Vignettes",
    count: 20,
    pct: 50,
    description:
      "Raw medical source documents, hospital discharge summaries, spontaneous patient telephone logs, and laboratory telemetry requiring triage.",
    exampleQuestion: {
      context:
        "Source Document: A 52-year-old female patient enrolled in a Phase III Rheumatoid Arthritis trial presents with sudden acute jaundice, elevated serum ALT (12x ULN), and total bilirubin > 2x ULN (Hy's Law criteria) 3 weeks after initiating study drug.",
      prompt:
        "As the Drug Safety Associate on call, which immediate action is mandated under ICH E2A expedited reporting rules?",
      options: [
        {
          text: "Wait for the 30-day scheduled safety protocol monitoring window to confirm transaminase resolution.",
          isCorrect: false,
          feedback: "Violates safety obligations; Hy's Law indicates severe drug-induced liver injury requiring expedited review.",
        },
        {
          text: "Classify as an expedited Serious Adverse Event (SAE) under 'Important Medical Event / Disability' and trigger the 7-to-15 day regulatory submission clock.",
          isCorrect: true,
          feedback: "Correct. Hy's Law triggers immediate expedited reporting protocols due to potential acute liver failure risk.",
        },
        {
          text: "Downgrade to non-serious since the patient has not yet been admitted to the ICU.",
          isCorrect: false,
          feedback: "Incorrect. Hospitalization is only one of six seriousness criteria; medical judgment dictates potential life threat.",
        },
      ],
    },
  },
  {
    type: "Situational & Operational Judgment",
    count: 12,
    pct: 30,
    description:
      "Realistic trade-offs in high-volume CRO queues: managing conflicting physician inputs, missing minimal criteria, and strict regulatory cutoff hours.",
    exampleQuestion: {
      context:
        "Operational Scenario: You have two cases in your queue at 16:30 on Day 14 of a 15-day expedited submission deadline. Case A is a spontaneous fatal pulmonary embolism with incomplete reporter contact details. Case B is a fully completed non-serious rash.",
      prompt: "How must you prioritize these cases before the close of business?",
      options: [
        {
          text: "Complete Case B first because it is already 100% complete and will improve your personal case-closure quota.",
          isCorrect: false,
          feedback: "Prioritizing non-serious quota over fatal expedited compliance is an immediate audit violation.",
        },
        {
          text: "Triage Case A immediately, verify minimum criteria, initiate urgent follow-up query, and transmit the expedited report to avoid a Day 15 late-submission regulatory penalty.",
          isCorrect: true,
          feedback: "Correct. Regulatory clocks for fatal/serious events supersede internal closure metrics.",
        },
        {
          text: "Leave both cases for the next shift since Day 15 expires at midnight.",
          isCorrect: false,
          feedback: "Unacceptable risk of submission failure; regulatory queues must be resolved during working hours.",
        },
      ],
    },
  },
  {
    type: "Regulatory & Technical Precision Probes",
    count: 8,
    pct: 20,
    description:
      "ICH E2B(R3) electronic data specifications, MedDRA hierarchy rules (LLT vs PT vs SOC), and WHO-UMC causality algorithms.",
    exampleQuestion: {
      context:
        "MedDRA Terminology Mapping: A physician reports that a clinical trial patient experienced 'headache on the left side with visual aura and nausea'.",
      prompt: "Which Lowest Level Term (LLT) best captures the clinical presentation without losing specificity?",
      options: [
        {
          text: "LLT: Cephalea (PT: Headache)",
          isCorrect: false,
          feedback: "Too non-specific; ignores the distinctive aura and lateralized presentation.",
        },
        {
          text: "LLT: Classical migraine (PT: Migraine with aura)",
          isCorrect: true,
          feedback: "Accurate MedDRA coding: correctly captures the constellation of unilateral headache with aura.",
        },
        {
          text: "LLT: Intracranial hypertension",
          isCorrect: false,
          feedback: "Diagnostic assumption not stated in the source text; introduces unauthorized medical speculation.",
        },
      ],
    },
  },
];

export function AcriAssessmentArchitectureVisual() {
  const [activeModalIdx, setActiveModalIdx] = useState<number>(0);
  const activeModal = QUESTION_DISTRIBUTIONS[activeModalIdx];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
  };

  const handleChangeModal = (idx: number) => {
    setActiveModalIdx(idx);
    setSelectedOption(null);
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white card-light tone-light p-6 sm:p-8 space-y-8">
      {/* ── Top Bar: 40 Questions Summary Metrics ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-stone-200">
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
          <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
            TOTAL ITEMS
          </span>
          <div className="font-serif font-bold text-2xl text-stone-900 mt-1">40 Items</div>
          <span className="font-sans text-[11px] text-stone-500">Psychometrically calibrated</span>
        </div>

        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
          <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
            SESSION DURATION
          </span>
          <div className="font-serif font-bold text-2xl text-stone-900 mt-1">25–30 Min</div>
          <span className="font-sans text-[11px] text-stone-500">Timed adaptive pacing</span>
        </div>

        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
          <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
            EVALUATED TRAITS
          </span>
          <div className="font-serif font-bold text-2xl text-[#005B4F] mt-1">13 Traits</div>
          <span className="font-sans text-[11px] text-stone-500">4 functional clusters</span>
        </div>

        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
          <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
            HARD CRITICAL GATES
          </span>
          <div className="font-serif font-bold text-2xl text-rose-700 mt-1">3 Fail-Safes</div>
          <span className="font-sans text-[11px] text-stone-500">Zero-tolerance safety criteria</span>
        </div>
      </div>

      {/* ── Middle: Question Distribution Bar & Selector ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 className="font-serif font-bold text-base text-stone-900">
            Item Format Distribution across 40 Questions
          </h4>
          <span className="font-mono text-xs text-stone-500">Click a category to test an authentic item</span>
        </div>

        {/* Visual Stacked Progress Bar */}
        <div className="h-4 w-full rounded-full overflow-hidden flex bg-stone-100 border border-stone-200">
          <div className="bg-[#005B4F] h-full w-[50%]" title="Clinical Case Vignettes (50%)" />
          <div className="bg-[#1B3F8B] h-full w-[30%]" title="Situational Judgment (30%)" />
          <div className="bg-[#D4AF37] h-full w-[20%]" title="Regulatory Precision (20%)" />
        </div>

        {/* Category Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {QUESTION_DISTRIBUTIONS.map((item, idx) => {
            const isActive = idx === activeModalIdx;
            return (
              <button
                key={item.type}
                onClick={() => handleChangeModal(idx)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isActive
                    ? "bg-[#FAF9F6] border-[#005B4F] ring-2 ring-[#005B4F]/20 shadow-xs"
                    : "bg-white tone-light border-stone-200 hover:bg-stone-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    {item.count} QUESTIONS ({item.pct}%)
                  </span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      idx === 0
                        ? "bg-[#005B4F]"
                        : idx === 1
                          ? "bg-[#1B3F8B]"
                          : "bg-[#D4AF37]"
                    }`}
                  />
                </div>
                <div className="font-serif font-bold text-sm text-stone-900">
                  {item.type}
                </div>
                <p className="font-sans text-[11px] text-stone-600 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Interactive Item Sandbox / Preview ── */}
      <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-stone-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">
              INTERACTIVE PREVIEW: SAMPLE QUESTION
            </span>
            <span className="text-stone-300">|</span>
            <span className="font-sans text-xs text-stone-600">Category: {activeModal.type}</span>
          </div>

          <span className="font-mono text-[10px] text-stone-500 px-2 py-0.5 rounded bg-white tone-light border border-stone-200">
            Item Difficulty: Calibrated (p = 0.64)
          </span>
        </div>

        {/* Clinical Scenario Box */}
        <div className="p-4 rounded-xl bg-white tone-light border border-stone-200 space-y-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
            CLINICAL SOURCE CASE
          </span>
          <p className="font-sans text-xs sm:text-sm text-stone-800 leading-relaxed font-mono">
            {activeModal.exampleQuestion.context}
          </p>
        </div>

        {/* Question Prompt */}
        <div className="font-serif font-bold text-sm sm:text-base text-stone-900 pt-1">
          {activeModal.exampleQuestion.prompt}
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-2.5 pt-1">
          {activeModal.exampleQuestion.options.map((opt, optIdx) => {
            const isSelected = selectedOption === optIdx;
            const showFeedback = isSelected;

            return (
              <div key={optIdx} className="space-y-2">
                <button
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                    isSelected
                      ? opt.isCorrect
                        ? "bg-emerald-50/80 border-emerald-500 text-emerald-950 font-medium"
                        : "bg-rose-50/80 border-rose-400 text-rose-950 font-medium"
                      : "bg-white tone-light border-stone-200 hover:bg-stone-50 text-stone-800"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? opt.isCorrect
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-rose-600 bg-rose-600 text-white"
                        : "border-stone-300 text-stone-500"
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>

                {/* Immediate Rationale Callout */}
                {showFeedback && (
                  <div
                    className={`ml-8 p-3 rounded-lg text-xs leading-relaxed ${
                      opt.isCorrect
                        ? "bg-emerald-100/70 border border-emerald-300 text-emerald-900"
                        : "bg-rose-100/70 border border-rose-300 text-rose-900"
                    }`}
                  >
                    <span className="font-bold mr-1.5">
                      {opt.isCorrect ? "✓ Valid Operational Rationale:" : "✗ Clinical Error:"}
                    </span>
                    <span>{opt.feedback}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
