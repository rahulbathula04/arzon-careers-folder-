import { ReportCard } from "../ReportCard";
import { IndiaMarketPanel } from "@/components/career/v2/IndiaMarketPanel";

/**
 * ChapterMarketReality — wraps the existing India Market panel inside the
 * master card grammar. The inner section resets its own border/padding
 * via [&>section] so it visually reads as one panel.
 */
export function ChapterMarketReality({ slug, chapter }: { slug: string; chapter: number }) {
  return (
    <ReportCard
      id={`ch-${chapter}-market`}
      chapter={chapter}
      eyebrow="Market reality · India"
      tone="primary"
      title="Where this role actually exists right now"
      subtitle="Cities that hire, employers that publish JDs, and how quickly candidates who finish our programme land the first interview."
      whatThisMeans="This role isn't hypothetical — companies are hiring for it right now, in these cities, on these timelines."
    >
      <IndiaMarketPanel pathSlug={slug} chromeless />
    </ReportCard>
  );
}

export default ChapterMarketReality;
