/**
 * AcriProgressSubheader — Top sub-header strip inside the assessment
 *
 * Reference: Image 4 — narrow strip below main header showing:
 *   [Section Name] [Question count] [Progress bar] [Timer] [Save & Exit] [End Test]
 *   [AI Proctoring badge] (certified only)
 *
 * This replaces the old AcriProgressRail which was a right sidebar.
 * The new layout uses the reference-correct horizontal sub-header.
 *
 * Timer display delegates to AcriTimer (which is props-only, no state).
 * All state comes from parent (AcriAssessmentTerminal).
 */
import { Flag, ShieldCheck, LogOut, CheckSquare } from "lucide-react";
import { AcriTimer } from "./AcriTimer";
import { AcriAutosaveIndicator } from "./AcriAutosaveIndicator";
import type { AssessmentPhase } from "@/lib/acri/acriStateMachine";
import { cn } from "@/lib/utils";

interface AcriProgressSubheaderProps {
  // Section info
  sectionName: string;
  questionNumber: number;    // 1-based
  totalQuestions: number;
  overallPercent: number;    // 0–100

  // Timer
  timeRemainingSeconds: number;
  mode: "practice" | "certified";
  onExpire?: () => void;

  // Flagging
  isFlaggedCurrent: boolean;
  flaggedCount: number;
  onToggleFlagCurrent: () => void;

  // Actions
  onSaveAndExit?: () => void;
  onEndTest?: () => void;
  onOpenReview?: () => void;

  // Autosave
  phase: AssessmentPhase;
  lastSavedAt: number | null;
  saveError: string | null;

  className?: string;
}

export function AcriProgressSubheader({
  sectionName,
  questionNumber,
  totalQuestions,
  overallPercent,
  timeRemainingSeconds,
  mode,
  onExpire,
  isFlaggedCurrent,
  flaggedCount,
  onToggleFlagCurrent,
  onSaveAndExit,
  onEndTest,
  onOpenReview,
  phase,
  lastSavedAt,
  saveError,
  className,
}: AcriProgressSubheaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col shrink-0 bg-[var(--color-brand-ink)] border-b border-[rgba(255,255,255,0.08)]",
        className,
      )}
    >
      {/* ── Main strip ─────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 py-2"
        style={{ minHeight: "var(--sub-header-height)" }}
      >
        {/* Left: section + question */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] text-[rgba(255,255,255,0.45)] uppercase tracking-widest shrink-0">
              Section
            </span>
            <span className="font-semibold text-xs text-white truncate max-w-[180px]">
              {sectionName}
            </span>
            <span className="font-mono text-[10px] text-[rgba(255,255,255,0.35)]">
              {questionNumber}/{totalQuestions}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-1.5 flex items-center gap-2">
            <div className="flex-1 max-w-[160px] h-1 rounded-full bg-[rgba(255,255,255,0.1)] overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-[rgba(255,255,255,0.45)] shrink-0">
              {overallPercent}% overall
            </span>
          </div>
        </div>

        {/* Center: autosave indicator */}
        <AcriAutosaveIndicator
          phase={phase}
          lastSavedAt={lastSavedAt}
          saveError={saveError}
          className="hidden sm:flex"
        />

        {/* Center-right: timer (certified only) */}
        {mode === "certified" && (
          <AcriTimer
            timeRemainingSeconds={timeRemainingSeconds}
            onExpire={onExpire}
            compact={true}
          />
        )}
        {mode === "practice" && (
          <span className="font-mono text-[10px] text-[rgba(255,255,255,0.35)] hidden md:block">
            UNTIMED
          </span>
        )}

        {/* AI Proctoring badge — certified only */}
        {mode === "certified" && (
          <div className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/40">
            <ShieldCheck className="h-3 w-3 text-emerald-400 shrink-0" />
            <span className="font-mono text-[9px] text-emerald-300 uppercase tracking-wider whitespace-nowrap">
              AI Proctoring Active
            </span>
          </div>
        )}

        {/* Flag button */}
        <button
          type="button"
          onClick={onToggleFlagCurrent}
          title={isFlaggedCurrent ? "Unflag question" : "Flag for review"}
          className={cn(
            "h-7 w-7 flex items-center justify-center rounded-[var(--radius-sm)] border transition-colors duration-[var(--duration-fast)] cursor-pointer shrink-0",
            isFlaggedCurrent
              ? "border-amber-500/50 bg-amber-950/40 text-amber-400"
              : "border-[rgba(255,255,255,0.12)] bg-transparent text-[rgba(255,255,255,0.35)] hover:text-amber-400",
          )}
          aria-pressed={isFlaggedCurrent}
          aria-label={isFlaggedCurrent ? "Unflag question" : "Flag for review"}
        >
          <Flag
            className="h-3.5 w-3.5"
            fill={isFlaggedCurrent ? "currentColor" : "none"}
          />
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-[rgba(255,255,255,0.1)] shrink-0" />

        {/* Review button */}
        <button
          type="button"
          onClick={onOpenReview}
          className={cn(
            "hidden sm:flex items-center gap-1.5 px-3 h-7 rounded-[var(--radius-sm)]",
            "font-mono text-[10px] uppercase tracking-wider font-bold",
            "border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.6)]",
            "hover:border-[rgba(255,255,255,0.3)] hover:text-white transition-colors cursor-pointer",
          )}
        >
          <CheckSquare className="h-3 w-3" />
          Review
          {flaggedCount > 0 && (
            <span className="h-4 w-4 flex items-center justify-center rounded-full bg-amber-500/30 text-amber-300 text-[9px] font-bold">
              {flaggedCount}
            </span>
          )}
        </button>

        {/* Save & Exit */}
        {onSaveAndExit && (
          <button
            type="button"
            onClick={onSaveAndExit}
            className={cn(
              "hidden md:flex items-center gap-1.5 px-3 h-7 rounded-[var(--radius-sm)]",
              "font-mono text-[10px] uppercase tracking-wider font-bold",
              "border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.5)]",
              "hover:border-[rgba(255,255,255,0.3)] hover:text-white transition-colors cursor-pointer",
            )}
          >
            <LogOut className="h-3 w-3" />
            Save & Exit
          </button>
        )}

        {/* End Test */}
        {onEndTest && (
          <button
            type="button"
            onClick={onEndTest}
            className={cn(
              "flex items-center gap-1.5 px-3 h-7 rounded-[var(--radius-sm)]",
              "font-mono text-[10px] uppercase tracking-wider font-bold",
              "bg-white text-[var(--color-brand-ink)] border border-transparent",
              "hover:bg-stone-100 transition-colors cursor-pointer shrink-0",
            )}
          >
            End Test
          </button>
        )}
      </div>
    </div>
  );
}

export { AcriProgressSubheader as AcriProgressRail };
