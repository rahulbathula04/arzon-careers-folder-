import { Sparkles, RotateCcw, ShieldCheck } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { familyForPathSlug } from "@/data/careerFamilies";
import { ReportCard } from "../ReportCard";
import { bandForScore } from "../ScoreChip";
import { REPORT_TONES } from "../reportTones";
import { cn } from "@/lib/utils";

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
    result.archetype.topPaths?.[0]?.slug ??
    null;
  const family = topSlug ? familyForPathSlug(topSlug) : null;
  const familyName =
    family?.name ?? (topSlug ? PATHS[topSlug]?.title : null) ?? "your best-fit career";
  const answered = result.evidence?.scoring?.answered ?? 40;
  const confidence = Math.round(result.confidence ?? 60);
  const confBand: "strong" | "recommended" | "watch" =
    confidence >= 85 ? "strong" : confidence >= 65 ? "recommended" : "watch";

  return (
    <ReportCard
      id="ch-1-verdict"
      chapter={1}
      eyebrow="Career brief · India"
      tone="primary"
      defaultExpanded
      title={
        <>
          Your best-fit career is{" "}
          <span className={REPORT_TONES.primary.accentText}>{familyName}.</span>
        </>
      }
      subtitle={
        <>
          {BAND_HEADLINE[result.confidenceBand] ?? BAND_HEADLINE.recommended} Built from{" "}
          <span className="font-semibold text-white">{answered} answers</span>, scored against{" "}
          <span className="font-semibold text-white">live Indian JDs</span> recruiters posted in the
          last six months.
        </>
      }
      score={{
        value: Math.round(result.fitScore ?? 0),
        band: bandForScore(result.fitScore ?? 0),
        suffix: "fit",
      }}
      whatThisMeans="This is the single role recruiters are most likely to shortlist you for today — everything else in this report is built around it."
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
        <MetaItem
          icon={<Sparkles className={cn("h-3.5 w-3.5", REPORT_TONES.primary.accentText)} />}
          label="Discovery brief"
          value="not an employability score"
        />
        <span aria-hidden className="hidden h-6 w-px bg-white/10 sm:block" />
        <MetaItem
          icon={<ShieldCheck className={cn("h-3.5 w-3.5", REPORT_TONES.primary.accentText)} />}
          label={
            confBand === "strong"
              ? "Strong signal"
              : confBand === "recommended"
                ? "Solid signal"
                : "Emerging signal"
          }
          value={`Confidence ${confidence}%`}
        />
      </div>
      {onRetake && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            id="report-retake"
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Retake — answers change the verdict
          </button>
          <span className="text-xs text-white/45">
            Every retake refreshes your peer rank and 30/60/90 plan.
          </span>
        </div>
      )}
    </ReportCard>
  );
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5">
        {icon}
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-[13px] font-semibold text-white">{label}</p>
        <p className="text-[11px] text-white/55">{value}</p>
      </div>
    </div>
  );
}

export default ChapterVerdict;
