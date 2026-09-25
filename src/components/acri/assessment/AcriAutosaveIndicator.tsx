/**
 * AcriAutosaveIndicator — Displays save status
 *
 * Reads from session: phase, lastSavedAt, saveError.
 * Shows: Saving... / Saved ✓ / Connection lost / (hidden)
 *
 * This component NEVER manages save logic — it renders state only.
 */
import { cn } from "@/lib/utils";
import type { AssessmentPhase } from "@/lib/acri/acriStateMachine";

interface AcriAutosaveIndicatorProps {
  phase: AssessmentPhase;
  lastSavedAt: number | null;
  saveError: string | null;
  className?: string;
}

export function AcriAutosaveIndicator({
  phase,
  lastSavedAt,
  saveError,
  className,
}: AcriAutosaveIndicatorProps) {
  if (phase === "SAVING") {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <svg className="h-3 w-3 text-amber-400 motion-safe:animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider">
          Saving…
        </span>
      </div>
    );
  }

  if (phase === "NETWORK_LOST" || saveError) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <svg className="h-3 w-3 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
          <path d="M12 9v4m0 4h.01M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3z" strokeLinecap="round" />
        </svg>
        <span className="font-mono text-[10px] text-red-400 uppercase tracking-wider">
          Connection lost
        </span>
      </div>
    );
  }

  if (phase === "SAVED" && lastSavedAt) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <svg className="h-3 w-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider">
          Saved
        </span>
      </div>
    );
  }

  // ACTIVE phase — show last saved quietly if available
  if (phase === "ACTIVE" && lastSavedAt) {
    return (
      <div className={cn("flex items-center gap-1 opacity-50", className)}>
        <svg className="h-2.5 w-2.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider">
          Auto-saved
        </span>
      </div>
    );
  }

  return null;
}
