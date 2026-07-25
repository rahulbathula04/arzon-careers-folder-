import { ReportCard } from "../ReportCard";
import { getPathDossier } from "@/data/careerPathDossier";

export function ChapterDayInLife({ slug, chapter }: { slug: string; chapter: number }) {
  const dossier = getPathDossier(slug);
  return (
    <ReportCard
      id={`ch-${chapter}-day`}
      chapter={chapter}
      eyebrow="A Day in the Life"
      tone="neutral"
      title="09:00 to signoff — hour by hour"
      subtitle="A representative weekday for the L1 role. Not glamour, not doom — just what actually happens."
      whatThisMeans="Read this before you commit — if the hour-by-hour feels wrong for you, no salary number is going to fix it later."
    >
      <ol className="relative border-l-2 border-blue-500/30 pl-6 space-y-6">
        {dossier.dayInLife.map((b, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[31px] mt-1.5 h-3.5 w-3.5 rounded-full bg-[#2563EB] ring-4 ring-blue-500/20 shadow-md shadow-blue-500/30" />
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold text-blue-300 bg-blue-500/20 border border-blue-400/30 px-2.5 py-0.5 rounded-md">
                {b.time}
              </span>
              <span className="font-bold text-white text-base">{b.activity}</span>
            </div>
            <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">{b.detail}</p>
          </li>
        ))}
      </ol>
    </ReportCard>
  );
}

export default ChapterDayInLife;
