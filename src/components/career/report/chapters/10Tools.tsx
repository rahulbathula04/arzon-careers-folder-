import { ReportCard } from "../ReportCard";
import { getPathDossier } from "@/data/careerPathDossier";
import { REPORT_TONES } from "../reportTones";
import { SourceTagRow } from "../SourceTag";
import { ConfidenceBadge, confidenceFrom } from "../ConfidenceBadge";
import { sourcesFor } from "@/data/industry/sources";
import { useReportState } from "../ReportStateContext";
import { personalizeToolList } from "@/lib/report/personalize";
import { Sparkles } from "lucide-react";

const FREQ_TONE: Record<string, keyof typeof REPORT_TONES> = {
  daily: "primary",
  weekly: "warn",
  occasional: "neutral",
};

export function ChapterTools({ slug, chapter }: { slug: string; chapter: number }) {
  const dossier = getPathDossier(slug);
  const sources = sourcesFor(slug, "tools");
  const totalItems = dossier.tools.reduce((s, c) => s + c.items.length, 0);
  const conf = confidenceFrom({ sources: sources.length, jdCount: totalItems * 4 });
  const state = useReportState();
  const profile = state.quizProfile;
  return (
    <ReportCard
      id={`ch-${chapter}-tools`}
      chapter={chapter}
      readMinutes={4}
      eyebrow="Tools you'll actually use"
      tone="primary"
      title="The stack this role runs on"
      subtitle="Every tool below appears in 3+ live JDs for this role. Chips mark how often you touch it."
      whatThisMeans="Learn the daily-use tools first — they're what recruiters filter on and what you'll open on day one of the job."
    >
      <div className="flex flex-wrap items-center gap-2">
        <ConfidenceBadge
          level={conf}
          detail={`${sources.length} source(s) backing the tool inventory.`}
          sourceIds={sources.map((s) => s.id)}
        />
        <SourceTagRow ids={sources.map((s) => s.id)} tone="primary" />
        {!profile ? (
          <button
            type="button"
            onClick={state.openQuiz}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-caption uppercase tracking-widest hover:brightness-110 ${REPORT_TONES.primary.chipBorder} ${REPORT_TONES.primary.chipBg} ${REPORT_TONES.primary.chipText}`}
          >
            <Sparkles className="h-3 w-3" /> Personalize this list
          </button>
        ) : (
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-caption uppercase tracking-widest ${REPORT_TONES.primary.chipBorder} ${REPORT_TONES.primary.chipBg} ${REPORT_TONES.primary.chipText}`}
          >
            <Sparkles className="h-3 w-3" /> Personalized
          </span>
        )}
      </div>
      <div className="space-y-6">
        {dossier.tools.map((cat) => (
          <div key={cat.category} className="mt-6 first:mt-0">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
              {cat.category}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {personalizeToolList(cat.items, profile).map((t) => {
                const tone = REPORT_TONES[FREQ_TONE[t.frequency] ?? "neutral"];
                const tagStyle =
                  t.tag === "priority"
                    ? `${REPORT_TONES.primary.chipBorder} ${REPORT_TONES.primary.chipBg} ${REPORT_TONES.primary.chipText}`
                    : t.tag === "familiar"
                      ? `${REPORT_TONES.secondary.chipBorder} ${REPORT_TONES.secondary.chipBg} ${REPORT_TONES.secondary.chipText}`
                      : "border-white/10 bg-white/[0.03] text-white/60";
                return (
                  <div
                    key={t.name}
                    className="rounded-2xl border border-white/8 bg-white/[0.02] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-grotesk text-body-sm font-bold text-white">{t.name}</p>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-caption font-semibold uppercase tracking-wider ${tone.chipBorder} ${tone.chipBg} ${tone.chipText}`}
                      >
                        {t.frequency}
                      </span>
                    </div>
                    <p className="mt-2 text-caption leading-relaxed text-white/70">{t.why}</p>
                    {profile ? (
                      <div
                        className={`mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${tagStyle}`}
                        title={t.reason}
                      >
                        {t.tag}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </ReportCard>
  );
}
export default ChapterTools;
