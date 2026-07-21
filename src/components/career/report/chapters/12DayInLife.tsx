import { ReportCard } from "../ReportCard";
import { getPathDossier } from "@/data/careerPathDossier";
import { REPORT_TONES } from "../reportTones";

export function ChapterDayInLife({ slug, chapter }: { slug: string; chapter: number }) {
  const dossier = getPathDossier(slug);
  return (
    <ReportCard
      id={`ch-${chapter}-day`}
      chapter={chapter}
      eyebrow="A day in the life"
      tone="neutral"
      title="09:00 to signoff — hour by hour"
      subtitle="A representative weekday for the L1 role. Not glamour, not doom — just what actually happens."
      whatThisMeans="Read this before you commit — if the hour-by-hour feels wrong for you, no salary number is going to fix it later."
    >
      <ol className="relative border-l border-white/10 pl-6">
        {dossier.dayInLife.map((b, i) => (
          <li key={i} className="relative pb-5 last:pb-0">
            <span
              className={`absolute -left-[29px] mt-1 inline-flex h-3 w-3 rounded-full ${REPORT_TONES.primary.dot} ring-4 ${REPORT_TONES.primary.dotRing}`}
            />
            <div className="flex flex-wrap items-baseline gap-3">
              <span
                className={`font-mono text-xs font-bold ${REPORT_TONES.primary.chipPillText} tabular-nums`}
              >
                {b.time}
              </span>
              <span className="font-grotesk text-sm font-bold text-white">{b.activity}</span>
            </div>
            <p className="mt-1 text-sm text-white/70">{b.detail}</p>
          </li>
        ))}
      </ol>
    </ReportCard>
  );
}
export default ChapterDayInLife;
