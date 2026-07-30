import { ReportCard } from "../ReportCard";
import { getPathDossier } from "@/data/careerPathDossier";
import { LineChartSvg } from "../LineChartSvg";
import { TrendingUp } from "lucide-react";
import { REPORT_TONES } from "../reportTones";

export function ChapterGrowthChart({ slug, chapter }: { slug: string; chapter: number }) {
  const dossier = getPathDossier(slug);
  const points = dossier.growthIndex.map((p) => ({
    x: String(p.year),
    y: p.index,
  }));
  const first = dossier.growthIndex[0];
  const last = dossier.growthIndex[dossier.growthIndex.length - 1];
  const growth = Math.round(((last.index - first.index) / first.index) * 100);

  return (
    <ReportCard
      id={`ch-${chapter}-growth`}
      chapter={chapter}
      eyebrow="10-year role growth"
      tone="secondary"
      title="How demand for this role has moved 2016 → 2026"
      subtitle="Indexed to 100 in 2016. Sourced from JD-count sampling and public labour reports."
      whatThisMeans="You're not betting on a dying role - demand for this work has moved in the right direction for a decade."
    >
      <div
        className={`mb-4 inline-flex items-center gap-2 rounded-full border ${REPORT_TONES.secondary.softBorder} ${REPORT_TONES.secondary.softBg} px-3 py-1.5`}
      >
        <TrendingUp className={`h-3.5 w-3.5 ${REPORT_TONES.secondary.iconAccent}`} />
        <span
          className={`font-mono text-xs font-bold ${REPORT_TONES.secondary.chipPillText} tabular-nums`}
        >
          +{growth}% since 2016
        </span>
      </div>

      <div className="rounded-2xl glass-panel-deep p-4 sm:p-6">
        <LineChartSvg
          points={points}
          height={220}
          yFormat={(n) => `${Math.round(n)}`}
          accent="emerald"
          ariaLabel="Role demand index over the last decade"
        />
      </div>

      {last.jdCount && (
        <p className="mt-4 text-xs text-white/55">
          Latest window: <strong className="text-white/75 tabular-nums">{last.jdCount}</strong> live
          Indian JDs sampled H1 2026.
        </p>
      )}
    </ReportCard>
  );
}
export default ChapterGrowthChart;
