import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Sparkles, Pause } from "lucide-react";

/**
 * User-facing toggle to disable motion globally. Persists across sessions
 * and overrides system `prefers-reduced-motion` either way.
 */
export function MotionToggle({ className = "" }: { className?: string }) {
  const { reduced, toggle } = useReducedMotion();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={reduced}
      aria-label={reduced ? "Reduced motion is on" : "Reduce motion"}
      title={reduced ? "Animations are off, click to enable" : "Animations are on, click to reduce"}
      className={
        "inline-flex items-center gap-2 rounded-full border border-slate-200/15 bg-slate-50/5 px-3 py-1.5 text-micro font-medium text-slate-100/75 hover:bg-slate-50/10 hover:text-slate-50 transition-colors " +
        className
      }
    >
      {reduced ? <Pause className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
      <span>{reduced ? "Reduced motion: On" : "Reduce motion"}</span>
    </button>
  );
}
