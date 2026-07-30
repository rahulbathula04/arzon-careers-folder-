import { Activity } from "lucide-react";
import type { CareerEngineResult, ConfidenceBand } from "@/data/careerEngineScoring";
import { familyForPathSlug } from "@/data/careerFamilies";
import { PATHS } from "@/data/careerEngineScoring";

const BAND_VERDICT: Record<ConfidenceBand, string> = {
  highly_recommended: "Strong, consistent signal across your answers.",
  recommended: "Clear primary fit with one solid runner-up.",
  two_strong: "Two strong fits - both worth a serious look.",
  exploratory: "No clear winner yet. Start with the top fit; we will refine in counselling.",
};

export function VerdictHeader({ result }: { result: CareerEngineResult }) {
  const topPath =
    result.evidence?.scoring?.topPathFits?.[0]?.slug ??
    result.archetype.topPaths?.[0]?.slug ??
    null;
  const family = topPath ? familyForPathSlug(topPath) : null;
  const familyName =
    family?.name ?? (topPath ? PATHS[topPath]?.title : null) ?? "Three healthcare careers";
  const verdict = BAND_VERDICT[result.confidenceBand];
  const answered = result.evidence?.scoring?.answered ?? 40;

  return (
    <header className="rounded-3xl border border-white/10 bg-white/[0.025] px-6 py-7 sm:px-8 sm:py-9">
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.28em] text-eyebrow/85">
        Career Brief · India
      </p>
      <h1
        className="mt-2 font-grotesk font-extrabold tracking-tight text-white"
        style={{
          fontSize: "clamp(1.85rem, 4.8vw, 2.75rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        Your best-fit career is <span className="text-eyebrow">{familyName}</span>.
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
        {verdict} Built from {answered} answers, scored against{" "}
        <span className="text-white">live Indian JDs</span> recruiters posted in the last six
        months.
      </p>
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-micro uppercase tracking-[0.22em] text-white/70">
        <Activity className="h-3 w-3 text-sky-300" /> Discovery · not an employability score
      </div>
    </header>
  );
}

export default VerdictHeader;
