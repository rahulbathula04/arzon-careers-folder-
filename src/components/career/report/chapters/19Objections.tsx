import { ReportCard } from "../ReportCard";
import { getPathDossier } from "@/data/careerPathDossier";

export function ChapterObjections({ slug, chapter }: { slug: string; chapter: number }) {
  const dossier = getPathDossier(slug);
  return (
    <ReportCard
      id={`ch-${chapter}-objections`}
      chapter={chapter}
      eyebrow="Straight answers to the doubts"
      tone="neutral"
      title="The questions you were about to ask"
      subtitle="No sugar-coating. If the answer is 'yes, that's a real risk' we say so."
      whatThisMeans="The doubts your parents, seniors and inner critic will raise - answered honestly, in one place."
    >
      <div className="space-y-3">
        {dossier.objections.map((o, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-white/8 bg-white/[0.02] p-5 open:bg-white/[0.04]"
          >
            <summary className="cursor-pointer list-none">
              <div className="flex items-start justify-between gap-3">
                <p className="font-grotesk text-base font-bold text-white">{o.q}</p>
                <span className="mt-1 font-mono text-lg text-white/40 group-open:rotate-45 motion-safe:transition-transform">
                  +
                </span>
              </div>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{o.a}</p>
          </details>
        ))}
      </div>
    </ReportCard>
  );
}
export default ChapterObjections;
