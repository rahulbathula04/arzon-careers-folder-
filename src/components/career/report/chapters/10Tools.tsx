import { ReportCard } from "../ReportCard";
import { getPathDossier } from "@/data/careerPathDossier";
import { SourceTagRow } from "../SourceTag";
import { ConfidenceBadge, confidenceFrom } from "../ConfidenceBadge";
import { sourcesFor } from "@/data/industry/sources";
import { useReportState } from "../ReportStateContext";
import { personalizeToolList } from "@/lib/report/personalize";
import { Sparkles } from "lucide-react";

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
      eyebrow="Tools You'll Actually Use"
      tone="primary"
      title="The stack this role runs on"
      subtitle="Every tool below appears in 3+ live JDs for this role. Chips mark how often you touch it."
      whatThisMeans="Learn the daily-use tools first - they're what recruiters filter on and what you'll open on day one of the job."
    >
      <div className="flex flex-wrap items-center gap-3">
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
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 font-mono text-xs uppercase tracking-wider shadow-sm transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" /> Personalize This List
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" /> Personalized
          </span>
        )}
      </div>

      <div className="space-y-6">
        {dossier.tools.map((cat) => (
          <div key={cat.category} className="mt-6 first:mt-0 space-y-3">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
              {cat.category}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {personalizeToolList(cat.items, profile).map((t) => {
                const freqBadge =
                  t.frequency === "daily"
                    ? "border-blue-400/30 bg-blue-500/20 text-blue-300"
                    : t.frequency === "weekly"
                      ? "border-emerald-400/30 bg-emerald-500/20 text-emerald-300"
                      : "border-amber-400/30 bg-amber-500/20 text-amber-300";

                return (
                  <div
                    key={t.name}
                    className="rounded-2xl border border-white/10 bg-[#161F33] p-5 space-y-2 shadow-lg hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-bold text-white text-base">{t.name}</p>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider ${freqBadge}`}
                      >
                        {t.frequency}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{t.why}</p>
                    {profile && (
                      <div className="inline-flex items-center gap-1 rounded-md border border-blue-400/30 bg-blue-500/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-300">
                        {t.tag}
                      </div>
                    )}
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
