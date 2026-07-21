import { ReportCard } from "../ReportCard";
import { getPathDossier } from "@/data/careerPathDossier";
import { ArrowRight } from "lucide-react";
import { REPORT_TONES } from "../reportTones";

export function ChapterPivots({ slug, chapter }: { slug: string; chapter: number }) {
  const dossier = getPathDossier(slug);
  return (
    <ReportCard
      id={`ch-${chapter}-pivots`}
      chapter={chapter}
      eyebrow="Where this role can take you"
      tone="secondary"
      title="Adjacent roles you can pivot into"
      subtitle="You are not locked in. These are the moves colleagues in this role typically make once they have 18–30 months of ground truth."
      whatThisMeans="Picking this role doesn't close doors — here are the realistic next moves once you have two years of ground under you."
    >
      <div className="grid gap-3 md:grid-cols-3">
        {dossier.pivots.map((p) => (
          <div key={p.slug} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
            <p
              className={`font-mono text-[10px] uppercase tracking-[0.22em] ${REPORT_TONES.primary.softEyebrow}`}
            >
              {p.timing}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <ArrowRight className={`h-4 w-4 ${REPORT_TONES.primary.iconAccent}`} />
              <p className="font-grotesk text-h4 font-extrabold text-white">{p.title}</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{p.why}</p>
          </div>
        ))}
      </div>
    </ReportCard>
  );
}
export default ChapterPivots;
