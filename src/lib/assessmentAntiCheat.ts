import { useEffect, useRef, useState, useCallback } from "react";

export interface AntiCheatEvent {
  timestamp: number;
  type:
    | "TAB_SWITCH"
    | "FOCUS_LOST"
    | "FULLSCREEN_EXIT"
    | "COPY_ATTEMPT"
    | "PASTE_ATTEMPT"
    | "CONTEXT_MENU"
    | "SHORTCUT_BLOCKED"
    | "DEVTOOLS_ATTEMPT"
    | "SPEED_ANOMALY"
    | "FULLSCREEN_ENTER";
  details: string;
  questionIndex?: number;
}

export interface AntiCheatTelemetry {
  integrityScore: number;
  integrityStatus: "VERIFIED" | "REVIEW_RECOMMENDED" | "FLAGGED";
  tabSwitches: number;
  focusLossCount: number;
  fullscreenExits: number;
  copyAttempts: number;
  pasteAttempts: number;
  devtoolsAttempts: number;
  shortcutBlocks: number;
  fastAnswerFlags: number;
  totalQuestions: number;
  totalActiveSeconds: number;
  totalFocusLostSeconds: number;
  focusRetentionPct: number;
  avgTimePerQuestionSec: number;
  fastestAnswerSec: number;
  questionTimeSeconds: Record<string, number>;
  events: AntiCheatEvent[];
}

const STORAGE_KEY = "arzon_ce_anticheat_telemetry_v1";

export function calculateIntegrityScore(data: {
  tabSwitches: number;
  focusLossCount: number;
  fullscreenExits: number;
  copyAttempts: number;
  pasteAttempts: number;
  devtoolsAttempts: number;
  fastAnswerFlags: number;
}): { score: number; status: "VERIFIED" | "REVIEW_RECOMMENDED" | "FLAGGED" } {
  let score = 100;

  // Tab switches have the highest penalty
  score -= Math.min(45, data.tabSwitches * 15);

  // Fullscreen exits penalty
  score -= Math.min(25, data.fullscreenExits * 10);

  // DevTools inspection penalty
  score -= Math.min(30, data.devtoolsAttempts * 15);

  // Copy / Paste attempts penalty
  score -= Math.min(20, (data.copyAttempts + data.pasteAttempts) * 5);

  // Focus loss penalty (switching application)
  score -= Math.min(20, data.focusLossCount * 4);

  // Speed anomalies penalty (<2.5s on multi-clause questions)
  score -= Math.min(20, data.fastAnswerFlags * 5);

  const finalScore = Math.max(10, Math.min(100, Math.round(score)));

  let status: "VERIFIED" | "REVIEW_RECOMMENDED" | "FLAGGED" = "VERIFIED";
  if (finalScore < 70 || data.tabSwitches >= 3) {
    status = "FLAGGED";
  } else if (finalScore < 88 || data.tabSwitches >= 1 || data.fullscreenExits >= 1) {
    status = "REVIEW_RECOMMENDED";
  }

  return { score: finalScore, status };
}

export function saveAntiCheatToStorage(telemetry: AntiCheatTelemetry): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(telemetry));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(telemetry));
  } catch {
    // Ignore storage quota errors
  }
}

export function getAntiCheatFromStorage(): AntiCheatTelemetry | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AntiCheatTelemetry;
  } catch {
    return null;
  }
}

export interface AntiCheatWarning {
  title: string;
  message: string;
  strike: number;
  type: "TAB_SWITCH" | "FULLSCREEN_EXIT" | "COPY_ATTEMPT" | "FOCUS_LOST";
}

interface UseAntiCheatOptions {
  enabled?: boolean;
  isCompletedView: boolean;
  currentIndex: number;
  currentQuestionId: string;
  totalQuestions: number;
  onRecordAnswer?: (questionId: string, secondsSpent: number) => void;
}

export function useAssessmentAntiCheat({
  enabled = true,
  isCompletedView,
  currentIndex,
  currentQuestionId,
  totalQuestions,
}: UseAntiCheatOptions) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [warning, setWarning] = useState<AntiCheatWarning | null>(null);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [focusLossCount, setFocusLossCount] = useState(0);
  const [fullscreenExits, setFullscreenExits] = useState(0);
  const [copyAttempts, setCopyAttempts] = useState(0);
  const [pasteAttempts, setPasteAttempts] = useState(0);
  const [devtoolsAttempts, setDevtoolsAttempts] = useState(0);
  const [shortcutBlocks, setShortcutBlocks] = useState(0);
  const [fastAnswerFlags, setFastAnswerFlags] = useState(0);

  const eventsRef = useRef<AntiCheatEvent[]>([]);
  const questionTimesRef = useRef<Record<string, number>>({});
  const questionEnteredAtRef = useRef<number>(Date.now());
  const blurStartedAtRef = useRef<number | null>(null);
  const totalFocusLostSecRef = useRef<number>(0);
  const assessmentStartedAtRef = useRef<number>(Date.now());

  // Check fullscreen state
  useEffect(() => {
    if (typeof document === "undefined") return;
    const checkFs = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", checkFs);
    return () => document.removeEventListener("fullscreenchange", checkFs);
  }, []);

  const addEvent = useCallback(
    (type: AntiCheatEvent["type"], details: string) => {
      const ev: AntiCheatEvent = {
        timestamp: Date.now(),
        type,
        details,
        questionIndex: currentIndex,
      };
      eventsRef.current.push(ev);
    },
    [currentIndex],
  );

  // Request fullscreen
  const enterFullscreen = useCallback(async () => {
    if (typeof document === "undefined") return;
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        addEvent("FULLSCREEN_ENTER", "Candidate initiated lockdown fullscreen mode");
      }
    } catch (e) {
      console.warn("Fullscreen request declined or unsupported", e);
    }
  }, [addEvent]);

  // Track time spent per question on question change
  useEffect(() => {
    const prevQId = currentQuestionId;
    questionEnteredAtRef.current = Date.now();

    return () => {
      const elapsedSec = Math.max(0.5, (Date.now() - questionEnteredAtRef.current) / 1000);
      questionTimesRef.current[prevQId] = (questionTimesRef.current[prevQId] ?? 0) + elapsedSec;
    };
  }, [currentIndex, currentQuestionId]);

  // 1. Tab visibility changes (User left tab or minimized browser)
  useEffect(() => {
    if (!enabled || isCompletedView) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches((prev) => {
          const next = prev + 1;
          addEvent("TAB_SWITCH", `Tab hidden / browser minimized (Strike ${next})`);
          return next;
        });
      } else {
        // Returned to tab: show warning modal
        setTabSwitches((current) => {
          setWarning({
            type: "TAB_SWITCH",
            strike: current,
            title: "Assessment Integrity Alert: Tab Switch Detected",
            message:
              "Navigating away from the diagnostic or opening external windows is monitored under Arzon Proctoring standards. Repeated infractions will be flagged on your technical evaluation dossier.",
          });
          return current;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [enabled, isCompletedView, addEvent]);

  // 2. Window Blur & Focus (User clicked off to another monitor or application)
  useEffect(() => {
    if (!enabled || isCompletedView) return;

    const handleBlur = () => {
      blurStartedAtRef.current = Date.now();
      setFocusLossCount((prev) => {
        const next = prev + 1;
        addEvent("FOCUS_LOST", `Window lost focus (Count: ${next})`);
        return next;
      });
    };

    const handleFocus = () => {
      if (blurStartedAtRef.current) {
        const lostSec = (Date.now() - blurStartedAtRef.current) / 1000;
        totalFocusLostSecRef.current += lostSec;
        blurStartedAtRef.current = null;
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [enabled, isCompletedView, addEvent]);

  // 3. Fullscreen Exit Detection
  useEffect(() => {
    if (!enabled || isCompletedView) return;

    const handleFullscreenChange = () => {
      const inFs = Boolean(document.fullscreenElement);
      setIsFullscreen(inFs);

      if (!inFs && !isCompletedView) {
        setFullscreenExits((prev) => {
          const next = prev + 1;
          addEvent("FULLSCREEN_EXIT", `Exited fullscreen mode (Count: ${next})`);
          setWarning({
            type: "FULLSCREEN_EXIT",
            strike: next,
            title: "Proctor Alert: Fullscreen Mode Exited",
            message:
              "The Drug Safety Associate Technical Diagnostic requires full-screen lockdown to safeguard casework integrity. Please re-enter full-screen mode to resume.",
          });
          return next;
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [enabled, isCompletedView, addEvent]);

  // 4. Clipboard & Text Selection Blocking
  useEffect(() => {
    if (!enabled || isCompletedView) return;

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      setCopyAttempts((prev) => prev + 1);
      addEvent("COPY_ATTEMPT", "Prevented copy of clinical casework dilemma");
      setWarning({
        type: "COPY_ATTEMPT",
        strike: copyAttempts + 1,
        title: "Content Protected: Copying Prohibited",
        message:
          "Casework questions and scenario parameters are protected intellectual property and cannot be copied.",
      });
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      setPasteAttempts((prev) => prev + 1);
      addEvent("PASTE_ATTEMPT", "Prevented paste event in assessment surface");
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      addEvent("CONTEXT_MENU", "Right-click context menu blocked");
    };

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName !== "INPUT" && target?.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("cut", handleCut);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("selectstart", handleSelectStart);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("selectstart", handleSelectStart);
    };
  }, [enabled, isCompletedView, copyAttempts, addEvent]);

  // 5. Keyboard shortcut blocking (DevTools, Source, Print, Copy/Paste)
  useEffect(() => {
    if (!enabled || isCompletedView) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // F12 or Ctrl+Shift+I / Cmd+Option+I (DevTools)
      if (
        key === "F12" ||
        (isCtrlOrCmd && e.shiftKey && (key === "I" || key === "J" || key === "C"))
      ) {
        e.preventDefault();
        e.stopPropagation();
        setDevtoolsAttempts((prev) => prev + 1);
        addEvent("DEVTOOLS_ATTEMPT", "Blocked DevTools inspection attempt");
        return;
      }

      // Ctrl+U (View Source)
      if (isCtrlOrCmd && key === "U") {
        e.preventDefault();
        e.stopPropagation();
        setShortcutBlocks((prev) => prev + 1);
        addEvent("SHORTCUT_BLOCKED", "Blocked View Source shortcut");
        return;
      }

      // Ctrl+P (Print)
      if (isCtrlOrCmd && key === "P") {
        e.preventDefault();
        e.stopPropagation();
        setShortcutBlocks((prev) => prev + 1);
        addEvent("SHORTCUT_BLOCKED", "Blocked Print shortcut");
        return;
      }

      // Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A outside form fields
      const target = e.target as HTMLElement | null;
      const isInput = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";
      if (isCtrlOrCmd && !isInput && ["C", "V", "X", "A"].includes(key)) {
        e.preventDefault();
        e.stopPropagation();
        setShortcutBlocks((prev) => prev + 1);
        addEvent("SHORTCUT_BLOCKED", `Blocked Ctrl/Cmd+${key}`);
      }

      // PrintScreen Key
      if (key === "PRINTSCREEN") {
        addEvent("SHORTCUT_BLOCKED", "PrintScreen key press detected");
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [enabled, isCompletedView, addEvent]);

  // Speed anomaly tracking helper
  const notifyAnswerChosen = useCallback(
    (questionId: string) => {
      const secondsSpent = Math.max(0.5, (Date.now() - questionEnteredAtRef.current) / 1000);
      questionTimesRef.current[questionId] = (questionTimesRef.current[questionId] ?? 0) + secondsSpent;

      // Complex regulatory dilemmas answered in under 2.5s indicate AI bot or mindless clicking
      if (secondsSpent < 2.5) {
        setFastAnswerFlags((prev) => prev + 1);
        addEvent(
          "SPEED_ANOMALY",
          `Question ${questionId} answered in ${secondsSpent.toFixed(1)}s (below 2.5s threshold)`,
        );
      }
    },
    [addEvent],
  );

  // Compile final telemetry
  const getTelemetrySnapshot = useCallback((): AntiCheatTelemetry => {
    const totalElapsedSec = Math.max(1, (Date.now() - assessmentStartedAtRef.current) / 1000);
    const lostSec = totalFocusLostSecRef.current;
    const activeSec = Math.max(0, totalElapsedSec - lostSec);
    const focusRetentionPct = Math.round((activeSec / totalElapsedSec) * 1000) / 10;

    const timeValues = Object.values(questionTimesRef.current);
    const answeredCount = Math.max(1, timeValues.length);
    const totalAnswerTime = timeValues.reduce((a, b) => a + b, 0);
    const avgTimePerQuestionSec = Math.round((totalAnswerTime / answeredCount) * 10) / 10;
    const fastestAnswerSec = timeValues.length ? Math.min(...timeValues) : 0;

    const { score, status } = calculateIntegrityScore({
      tabSwitches,
      focusLossCount,
      fullscreenExits,
      copyAttempts,
      pasteAttempts,
      devtoolsAttempts,
      fastAnswerFlags,
    });

    const snapshot: AntiCheatTelemetry = {
      integrityScore: score,
      integrityStatus: status,
      tabSwitches,
      focusLossCount,
      fullscreenExits,
      copyAttempts,
      pasteAttempts,
      devtoolsAttempts,
      shortcutBlocks,
      fastAnswerFlags,
      totalQuestions,
      totalActiveSeconds: Math.round(activeSec),
      totalFocusLostSeconds: Math.round(lostSec),
      focusRetentionPct,
      avgTimePerQuestionSec,
      fastestAnswerSec: Math.round(fastestAnswerSec * 10) / 10,
      questionTimeSeconds: { ...questionTimesRef.current },
      events: [...eventsRef.current],
    };

    saveAntiCheatToStorage(snapshot);
    return snapshot;
  }, [
    tabSwitches,
    focusLossCount,
    fullscreenExits,
    copyAttempts,
    pasteAttempts,
    devtoolsAttempts,
    shortcutBlocks,
    fastAnswerFlags,
    totalQuestions,
  ]);

  const dismissWarning = () => setWarning(null);

  const { score: currentScore, status: currentStatus } = calculateIntegrityScore({
    tabSwitches,
    focusLossCount,
    fullscreenExits,
    copyAttempts,
    pasteAttempts,
    devtoolsAttempts,
    fastAnswerFlags,
  });

  return {
    isFullscreen,
    warning,
    tabSwitches,
    focusLossCount,
    fullscreenExits,
    copyAttempts,
    fastAnswerFlags,
    currentScore,
    currentStatus,
    enterFullscreen,
    dismissWarning,
    notifyAnswerChosen,
    getTelemetrySnapshot,
  };
}
