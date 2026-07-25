import { Sparkles, RotateCcw, ShieldCheck } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { familyForPathSlug } from "@/data/careerFamilies";
import { ReportCard } from "../ReportCard";
import { bandForScore } from "../ScoreChip";

const BAND_HEADLINE: Record<string, string> = {
  highly_recommended: "Strong, consistent signal across your answers.",
  recommended: "Clear primary fit with one solid runner-up.",
  two_strong: "Two strong fits — both worth a serious look.",
  exploratory: "No clear winner yet. Start with the top fit; we'll refine in counselling.",
};

export function ChapterVerdict({
  result,
  onRetake,
}: {
  result: CareerEngineResult;
  onRetake?: () => void;
}) {
  const topSlug =
    result.evidence?.scoring?.topPathFits?.[0]?.slug ??
    result.archetype?.topPaths?.[0]?.slug ??
    null;
  const family = topSlug ? familyForPathSlug(topSlug) : null;
  const familyName =
    family?.name ?? (topSlug ? PATHS[topSlug]?.title : null) ?? "Pharmacovigilance";
  const answered = result.evidence?.scoring?.answered ?? 40;
  const confidence = Math.round(result.confidence ?? 60);
  const confBand: "strong" | "recommended" | "watch" =
    confidence >= 85 ? "strong" : confidence >= 65 ? "recommended" : "watch";

  return (
    <ReportCard
      id="ch-1-verdict"
      chapter={1}
      eyebrow="Career Brief · India"
      tone="primary"
      defaultExpanded
      title={
        <>
          Your best-fit career is{" "}
          <span className="italic text-amber-400 font-serif font-bold">{familyName}.</span>
        </>
      }
      subtitle={
        <>
          {BAND_HEADLINE[result.confidenceBand] ?? BAND_HEADLINE.recommended} Scored against{" "}
          <span className="font-semibold text-white">{answered} answers</span> and{" "}
          <span className="font-semibold text-white">live Indian JDs</span> recruiters posted in the last six months.
        </>
      }
      score={{
        value: Math.round(result.fitScore ?? 69),
        band: bandForScore(result.fitScore ?? 69),
        suffix: "fit",
      }}
      whatThisMeans="This is the single role recruiters are most likely to shortlist you for today — everything else in this report is built around it."
    >
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-[#161F33] p-4 text-slate-200">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-400" />
          <span className="text-xs font-semibold text-white">Discovery Brief</span>
          <span className="text-xs text-slate-400">• Not an employability score</span>
        </div>
        <span className="hidden h-4 w-px bg-white/10 sm:block" />
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-semibold text-white">
            {confBand === "strong" ? "Strong Signal" : confBand === "recommended" ? "Solid Signal" : "Emerging Signal"}
          </span>
          <span className="text-xs font-mono font-bold text-blue-400 tabular-nums">
            {confidence}% Confidence
          </span>
        </div>
      </div>

      {onRetake && (
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            id="report-retake"
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-blue-400" /> Retake — answers change the verdict
          </button>
          <span className="text-xs text-slate-400">
            Every retake refreshes your peer rank and 30/60/90 plan.
          </span>
        </div>
      )}
    </ReportCard>
  );
}

export default ChapterVerdict;
