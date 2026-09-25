/**
 * ACRI-PV Assessment Integrity & Anti-Cheating Guard
 *
 * Enforces occupational examination standards during Certified Mode:
 * 1. Focus Tracking: Detects visibility changes and window blur events.
 * 2. 3-Strike Warning Escalation:
 *    - Strike 1: Discreet notification banner.
 *    - Strike 2: High-priority warning modal.
 *    - Strike 3: Permanent session integrity flag logged for audit review.
 * 3. Clipboard & Context Menu Guard: Suppresses text copying and right-click inspections.
 * 4. Tamper Resistance: Preserves violation timestamps across storage.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import type { AssessmentMode } from "./acriSession";

export interface IntegrityViolation {
  strikeNumber: number;
  timestamp: number;
  reason: string;
}

export interface IntegrityGuardState {
  strikes: number;
  violations: IntegrityViolation[];
  showWarningModal: boolean;
  activeWarningText: string | null;
  dismissWarningModal: () => void;
  isFlaggedForAudit: boolean;
}

export function useAcriIntegrityGuard(
  mode: AssessmentMode,
  hasStarted: boolean,
  sessionId?: string
): IntegrityGuardState {
  const [strikes, setStrikes] = useState<number>(0);
  const [violations, setViolations] = useState<IntegrityViolation[]>([]);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [activeWarningText, setActiveWarningText] = useState<string | null>(null);

  const storageKey = sessionId ? `acri_integrity_${sessionId}` : "acri_integrity_active";

  // Load existing strikes from sessionStorage if resuming
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setStrikes(parsed.strikes || 0);
        setViolations(parsed.violations || []);
      }
    } catch {}
  }, [storageKey]);

  // Record a strike
  const handleDefocus = useCallback(
    (reason: string) => {
      // Anti-cheating rules ONLY apply in certified mode once test has started
      if (mode !== "certified" || !hasStarted) return;

      setStrikes((prev) => {
        const nextStrikes = prev + 1;
        const newViolation: IntegrityViolation = {
          strikeNumber: nextStrikes,
          timestamp: Date.now(),
          reason,
        };

        setViolations((curr) => {
          const updated = [...curr, newViolation];
          try {
            sessionStorage.setItem(
              storageKey,
              JSON.stringify({ strikes: nextStrikes, violations: updated })
            );
          } catch {}
          return updated;
        });

        if (nextStrikes === 1) {
          setActiveWarningText(
            "Warning 1 of 3: You have navigated away from the assessment window. The ACRI test requires continuous active focus."
          );
          setShowWarningModal(true);
        } else if (nextStrikes === 2) {
          setActiveWarningText(
            "Warning 2 of 3: Window focus lost again. A 3rd defocus event will permanently flag your assessment report."
          );
          setShowWarningModal(true);
        } else {
          setActiveWarningText(
            "Integrity Alert (Strike 3): Maximum tab switches exceeded. Your assessment attempt has been flagged for audit review."
          );
          setShowWarningModal(true);
        }

        return nextStrikes;
      });
    },
    [mode, hasStarted, storageKey]
  );

  // Visibility and blur event listeners
  useEffect(() => {
    if (mode !== "certified" || !hasStarted || typeof window === "undefined") return;

    const onVisibilityChange = () => {
      if (document.hidden) {
        handleDefocus("Tab switched / document hidden");
      }
    };

    const onWindowBlur = () => {
      handleDefocus("Window lost focus / application switched");
    };

    // Clipboard and right-click suppression
    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      // Optional: alert toast or silent block
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("copy", onCopy);
    document.addEventListener("contextmenu", onContextMenu);

    return () => {
      window.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("contextmenu", onContextMenu);
    };
  }, [mode, hasStarted, handleDefocus]);

  const dismissWarningModal = useCallback(() => {
    setShowWarningModal(false);
  }, []);

  return {
    strikes,
    violations,
    showWarningModal,
    activeWarningText,
    dismissWarningModal,
    isFlaggedForAudit: strikes >= 3,
  };
}
