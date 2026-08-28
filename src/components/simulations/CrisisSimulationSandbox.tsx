import * as React from "react";
import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  ShieldCheck,
  Brain,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { isReducedMotion } from "@/hooks/useReducedMotion";

export interface CrisisSimulationSandboxProps {
  scenarioTitle?: string;
  scenarioType?: "pharmacovigilance" | "medical-coding" | "software-engineering";
  onComplete?: (bonusScore: number) => void;
  className?: string;
}

export function CrisisSimulationSandbox({
  scenarioTitle = "CDSCO Adverse Event Crisis Audit",
  scenarioType = "pharmacovigilance",
  onComplete,
  className,
}: CrisisSimulationSandboxProps) {
  const [timeLeft, setTimeLeft] = useState(180);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (submitted || timeLeft <= 0 || isReducedMotion()) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const options = [
    {
      id: 1,
      text: "Submit Form 44 to CDSCO within 15 days, holding patient dosing until trial monitor sign-off.",
      correct: false,
    },
    {
      id: 2,
      text: "File an expedited Suspected Unexpected Serious Adverse Reaction (SUSAR) report within 24 hours to Ethics Committee and CDSCO.",
      correct: true,
    },
    {
      id: 3,
      text: "Log the event in routine quarterly clinical safety audit and notify principal investigator at next site visit.",
      correct: false,
    },
  ];

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const chosen = options.find((o) => o.id === selectedOption);
    const correct = chosen?.correct ?? false;
    setIsCorrect(correct);
    setSubmitted(true);
    if (correct) {
      onComplete?.(12);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#0F172A] via-[#090D16] to-[#050A15] p-6 text-slate-200 shadow-2xl space-y-5",
        className,
      )}
    >
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Live Crisis Simulation Sandbox
            </span>
            <h3 className="text-base font-bold text-white">{scenarioTitle}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 font-mono text-xs font-bold text-amber-300 border border-amber-500/30">
            <Clock className="h-3.5 w-3.5" />
            {formattedTime}
          </div>
          <span className="rounded-full bg-teal-500/20 px-3 py-1 font-mono text-xs font-bold text-teal-300 border border-teal-500/30">
            +12 ACRI Bonus
          </span>
        </div>
      </div>

      {/* Scenario Briefing */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
        <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
          Clinical Audit Prompt #PV-904
        </span>
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          A 48-year-old phase III oncology trial subject presents with grade 3 alanine aminotransferase (ALT) elevation (8x ULN) 12 hours after receiving study drug dosage. The investigator suspects a SUSAR event. What is the mandatory regulatory timeline for submission under Indian GCP guidelines?
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            disabled={submitted}
            onClick={() => setSelectedOption(opt.id)}
            className={cn(
              "w-full text-left rounded-xl p-3.5 text-xs font-medium transition-all flex items-start gap-3 border",
              selectedOption === opt.id
                ? "border-teal-400 bg-teal-500/10 text-white shadow-md"
                : "border-white/10 bg-black/30 text-slate-300 hover:border-white/20 hover:text-white",
              submitted && opt.correct && "border-emerald-500 bg-emerald-500/20 text-emerald-200",
              submitted && selectedOption === opt.id && !opt.correct && "border-rose-500 bg-rose-500/20 text-rose-200",
            )}
          >
            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current">
              {selectedOption === opt.id && <div className="h-2 w-2 rounded-full bg-current" />}
            </div>
            <span className="leading-relaxed">{opt.text}</span>
          </button>
        ))}
      </div>

      {/* Submit / Results */}
      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className="w-full rounded-xl bg-teal-500 py-3 text-xs font-bold text-slate-950 hover:bg-teal-400 disabled:opacity-50 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <Zap className="h-4 w-4" />
          Submit Simulation Answer →
        </button>
      ) : (
        <div
          className={cn(
            "rounded-xl p-4 text-xs space-y-2 border",
            isCorrect
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
              : "border-rose-500/30 bg-rose-500/10 text-rose-200",
          )}
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>Simulation Passed! +12 ACRI Readiness Earned</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-rose-400" />
                <span>Regulatory Deadline Missed</span>
              </>
            )}
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            CDSCO GCP Schedule Y mandates expedited 24-hour reporting for life-threatening SUSARs to both the Licensing Authority and Institutional Ethics Committee.
          </p>
        </div>
      )}
    </div>
  );
}
