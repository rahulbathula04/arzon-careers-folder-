import { ReportCard } from "../ReportCard";
import { getPathDossier } from "@/data/careerPathDossier";
import { REPORT_TONES } from "../reportTones";

export function ChapterInterviewReality({ slug, chapter }: { slug: string; chapter: number }) {
  const dossier = getPathDossier(slug);
  const total = dossier.interview.reduce((s, b) => s + b.weight, 0);

  return (
    <ReportCard
      id={`ch-${chapter}-interview`}
      chapter={chapter}
      eyebrow="Interview reality"
      tone="warn"
      title="What they'll actually ask you"
      subtitle="Weighted by frequency across ~50 recruiter callbacks in this role. Common-fail line = why candidates lose the slot."
      whatThisMeans="Prepare for these exact question types and you'll answer 80% of what actually gets asked — the rest is nerves."
    >
      <div className="mb-6 flex h-2 w-full overflow-hidden rounded-full border border-white/10">
        {dossier.interview.map((b, i) => {
          const pct = (b.weight / total) * 100;
          const tint =
            i === 0
              ? REPORT_TONES.primary.dot
              : i === 1
                ? REPORT_TONES.secondary.dot
                : i === 2
                  ? REPORT_TONES.warn.dot
                  : "bg-fuchsia-300";
          return (
            <div
              key={b.bucket}
              className={tint}
              style={{ width: `${pct}%` }}
              title={`${b.bucket} · ${b.weight}%`}
            />
          );
        })}
      </div>

      <div className="space-y-4">
        {dossier.interview.map((b) => (
          <div key={b.bucket} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-grotesk text-h4 font-extrabold text-white">{b.bucket}</p>
              <span className="rounded-full bg-white/8 px-2 py-0.5 font-mono text-xs font-bold text-white/80 tabular-nums">
                {b.weight}% of interview
              </span>
            </div>
            <ul className="mt-3 space-y-1">
              {b.examples.map((ex) => (
                <li key={ex} className="text-sm italic text-white/70">
                  &ldquo;{ex}&rdquo;
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div
                className={`rounded-xl border ${REPORT_TONES["ruled-out"].softBorder} ${REPORT_TONES["ruled-out"].softBg} p-3`}
              >
                <p
                  className={`font-mono text-[10px] uppercase tracking-wider ${REPORT_TONES["ruled-out"].softEyebrow}`}
                >
                  Common fail
                </p>
                <p className="mt-1 text-sm text-white/80">{b.commonFail}</p>
              </div>
              <div
                className={`rounded-xl border ${REPORT_TONES.primary.softBorder} ${REPORT_TONES.primary.softBg} p-3`}
              >
                <p
                  className={`font-mono text-[10px] uppercase tracking-wider ${REPORT_TONES.primary.softEyebrow}`}
                >
                  Arzon counter
                </p>
                <p className="mt-1 text-sm text-white/80">{b.arzonCounter}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ReportCard>
  );
}
export default ChapterInterviewReality;
