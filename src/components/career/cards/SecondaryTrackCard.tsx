import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { RichCard, type RichCardTone } from "@/components/ui/RichCard";

interface Props {
  slug: string;
  title: string;
  why: string;
  fit?: number;
  index: number;
  onSelect?: () => void;
}

const TONE_ROTATION: RichCardTone[] = ["emerald", "orange", "violet"];

/**
 * Sibling track card — RichCard with a tone rotation (emerald → orange →
 * violet). Pastel gradient header band, eyebrow chip, fit ring, and a
 * solid surface body matching the reference card system.
 */
export function SecondaryTrackCard({ slug, title, why, fit, index, onSelect }: Props) {
  const tone = TONE_ROTATION[index % TONE_ROTATION.length];
  const pct = typeof fit === "number" ? Math.max(0, Math.min(100, fit)) : null;

  return (
    <Link
      to="/courses/$slug"
      params={{ slug }}
      onClick={onSelect}
      className="tone-light group block transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
    >
      <RichCard tone={tone} elevation="lifted" className="h-full">
        <RichCard.Header compact>
          <RichCard.EyebrowRow>
            <RichCard.Chip icon={<BookOpen />}>Also strong</RichCard.Chip>
            {pct != null && (
              <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 font-mono text-micro font-bold tabular-nums text-white ring-1 ring-white/25 backdrop-blur">
                {pct}% fit
              </span>
            )}
          </RichCard.EyebrowRow>
          <RichCard.Title as="h4" className="text-body-lg sm:text-h4">
            {title}
          </RichCard.Title>
        </RichCard.Header>
        <RichCard.Body compact>
          <p className="text-caption leading-relaxed">{why}</p>
          {pct != null && (
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={`h-full rounded-full bg-[var(--tone-${tone}-to)] transition-[width] duration-500 motion-reduce:transition-none`}
                style={{ width: `${pct}%` }}
              />
            </div>
          )}
        </RichCard.Body>
        <RichCard.Footer>
          <span className="inline-flex items-center gap-1 text-meta font-bold text-current">
            View course
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </span>
        </RichCard.Footer>
      </RichCard>
    </Link>
  );
}
