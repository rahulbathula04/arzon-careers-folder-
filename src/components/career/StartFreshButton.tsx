import { useNavigate } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { getAttemptId, startFreshAttempt } from "@/lib/careerEngineApi";
import { trackAttemptRetake } from "@/lib/careerEngineAnalytics";

interface StartFreshButtonProps {
  label?: string;
  className?: string;
}

/**
 * One-click reset for the Career Engine funnel. Clears all sessionStorage
 * keys (ce_session_id, ce_lead_id, ce_answers, ce_result) and sends the
 * user back to the start of the test. Uses a hard navigation so any
 * in-memory React state in TestPage / LeadPage / ResultPage is dropped.
 */
export function StartFreshButton({ label = "Start fresh", className }: StartFreshButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    const previousAttemptId = getAttemptId();
    startFreshAttempt({ preserveProfile: true });
    trackAttemptRetake({ previousAttemptId });
    // Force a full remount so component state resets too.
    if (typeof window !== "undefined") {
      window.location.href = "/career-engine/start";
      return;
    }
    navigate({ to: "/career-engine/start" }).catch(() => {
      if (typeof window !== "undefined") window.location.href = "/career-engine/start";
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ??
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/65 transition hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
      }
    >
      <RotateCcw className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
