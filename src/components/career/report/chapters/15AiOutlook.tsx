import { ReportCard } from "../ReportCard";
import { getPathDossier } from "@/data/careerPathDossier";
import { REPORT_TONES } from "../reportTones";

const TOUCH_TINT: Record<string, string> = {
  human: `${REPORT_TONES.secondary.chipPillBg} ${REPORT_TONES.secondary.chipPillText}`,
  assisted: `${REPORT_TONES.warn.chipPillBg} ${REPORT_TONES.warn.chipPillText}`,
  automated: `${REPORT_TONES["ruled-out"].chipPillBg} ${REPORT_TONES["ruled-out"].chipPillText}`,
};

export function ChapterAiOutlook({ slug, chapter }: { slug: string; chapter: number }) {
  const dossier = getPathDossier(slug);
  return (
    <ReportCard
      id={`ch-${chapter}-ai`}
      chapter={chapter}
      eyebrow="AI risk & 2030 outlook"
      tone="warn"
      title="What this role looks like in 2030"
      subtitle={dossier.outlook2030.headline}
      whatThisMeans="Straight answer on whether AI eats this job by 2030 - which parts get automated and which parts still need you."
    >
      <div className="overflow-hidden rounded-2xl border border-white/8">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.04] font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
            <tr>
              <th className="px-4 py-3">Task</th>
              <th className="px-4 py-3">Today (2026)</th>
              <th className="px-4 py-3">2030</th>
              <th className="px-4 py-3">AI touch</th>
            </tr>
          </thead>
          <tbody>
            {dossier.outlook2030.rows.map((r) => (
              <tr key={r.label} className="border-t border-white/8">
                <td className="px-4 py-3 font-grotesk font-semibold text-white/90">{r.label}</td>
                <td className="px-4 py-3 text-white/70">{r.today}</td>
                <td className="px-4 py-3 text-white/85">{r.in2030}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${TOUCH_TINT[r.aiTouch]}`}
                  >
                    {r.aiTouch}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className={`mt-6 rounded-2xl border ${REPORT_TONES.secondary.softBorder} ${REPORT_TONES.secondary.softBg} p-5`}
      >
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.22em] ${REPORT_TONES.secondary.softEyebrow}`}
        >
          What stays human
        </p>
        <ul className="mt-3 space-y-2">
          {dossier.outlook2030.stayHuman.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-white/80">
              <span
                className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${REPORT_TONES.secondary.dot}`}
              />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </ReportCard>
  );
}
export default ChapterAiOutlook;
