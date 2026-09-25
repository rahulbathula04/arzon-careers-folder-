import {
  X,
  Award,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface CompetencyDetailData {
  key: string;
  name: string;
  category: string;
  score: number;
  status: "Strong" | "Developing" | "Priority Development";
  assessed: string[];
  evidence: string;
  recommendedFocus: string[];
}

interface AcriCompetencyDetailModalProps {
  competency: CompetencyDetailData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AcriCompetencyDetailModal({
  competency,
  isOpen,
  onClose,
}: AcriCompetencyDetailModalProps) {
  if (!isOpen || !competency) return null;

  const isStrong = competency.status === "Strong";
  const isDeveloping = competency.status === "Developing";

  const badgeColor = isStrong
    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
    : isDeveloping
      ? "bg-amber-50 text-amber-800 border-amber-200"
      : "bg-rose-50 text-rose-800 border-rose-200";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="competency-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1325]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white tone-light card-light rounded-2xl border border-stone-200 shadow-2xl p-6 sm:p-7 space-y-5 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-400">
              {competency.category}
            </span>
            <h3 id="competency-modal-title" className="text-xl font-serif font-bold text-[#0B1325]">
              {competency.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close competency details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Score & Status Hero Strip */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/80">
          <div>
            <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">
              Assessed Score
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-serif font-black text-[#0B1325]">
                {competency.score}
              </span>
              <span className="text-xs font-mono text-stone-400">/ 100</span>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor}`}
          >
            {competency.status}
          </span>
        </div>

        {/* 1. What We Assessed */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-sans flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-[#005B4F]" />
            <span>What We Assessed</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-stone-600 pl-1">
            {competency.assessed.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#005B4F] shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Your Evidence */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-sans flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#005B4F]" />
            <span>Your Evidence</span>
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed bg-[#FAF8F5] p-3 rounded-lg border border-stone-200/60">
            {competency.evidence}
          </p>
        </div>

        {/* 3. Recommended Focus */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-sans flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-[#005B4F]" />
            <span>Recommended Focus</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {competency.recommendedFocus.map((focusItem, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-white tone-light border border-stone-200 text-[11px] text-stone-700 font-medium"
              >
                {focusItem}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            Close
          </button>

          <Link
            to="/courses"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <span>Practice This Competency</span>
            <ArrowRight className="h-3.5 w-3.5 text-emerald-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
