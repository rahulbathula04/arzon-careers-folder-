import { useMemo } from "react";
import { Activity } from "lucide-react";

/**
 * Quiet rotating reassurance line shown under the test progress bar.
 * Driven purely by the question index - no scoring is read. The point is
 * to make the test feel like it's learning about the user, not just
 * tallying answers.
 */
const LINES = [
  "Locking in your aptitude signal…",
  "Your interest pattern is forming.",
  "Two paths are pulling ahead.",
  "Background and lifestyle weighting in.",
  "Reality-check signals coming through.",
  "Final separations between your top paths.",
];

export function AdaptiveWhisper({ index, total }: { index: number; total: number }) {
  const line = useMemo(() => {
    if (total <= 0) return LINES[0];
    const stage = Math.min(LINES.length - 1, Math.floor((index / total) * LINES.length));
    return LINES[stage];
  }, [index, total]);

  return (
    <p
      key={line}
      className="mt-2 flex items-center justify-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-primary-glow/80 motion-safe:animate-[fade-in_400ms_ease-out]"
    >
      <Activity className="h-3 w-3" /> {line}
    </p>
  );
}
