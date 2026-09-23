/**
 * ACRI Session State — Single Source of Truth
 *
 * AcriSession is the canonical source of truth for all active assessment state.
 *
 * RULE: The following components are consumers only — they receive state via
 * props and emit events upward. They must NOT independently calculate,
 * store, or derive assessment state:
 *   - AcriAssessmentTerminal (orchestrator — passes state down)
 *   - AcriQuestionWorkspace / AcriWorkSimulation
 *   - AcriStageRail
 *   - AcriProgressSubheader / AcriProgressRail
 *   - AcriTimer
 *   - AcriReviewModal
 *   - AcriAutosaveIndicator
 *   - AcriAiAssistantPanel
 *
 * Phase transitions must use acriStateMachine.ts transition functions.
 * No component writes `phase` directly.
 */

import type { AcriDecisionResult } from "@/data/acri/acriPvStandard";
import type { AssessmentPhase } from "./acriStateMachine";
import { generateAttemptId } from "./acriCredential";

export type AssessmentMode = "practice" | "certified";

// ─── Session State ────────────────────────────────────────────────────────────

export interface AcriSessionState {
  // Mode — determines AI availability, timer, and credential eligibility
  mode: AssessmentMode;

  // Phase — drives all UI state branching (managed by acriStateMachine.ts)
  phase: AssessmentPhase;

  // Navigation
  currentItemIndex: number;

  // Responses
  answers: Record<string, unknown>;
  flaggedItemIds: string[];

  // Timer (seconds remaining — only relevant in certified mode)
  timeRemainingSeconds: number;

  // Completion
  isFinished: boolean;
  result: AcriDecisionResult | null;

  // Identity (bound at session creation, never changes)
  startedAt: number;  // Unix ms
  attemptId: string;  // ATT-XXXXXXXX — unique per attempt

  // Autosave tracking
  lastSavedAt: number | null;
  saveError: string | null;

  // Integrity — response timestamps (itemId → Unix ms of last answer)
  // Used by AcriInternalMetrics; never shown to candidate
  responseTimestamps: Record<string, number>;
}

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_STATE: AcriSessionState = {
  mode: "certified",
  phase: "NOT_STARTED",
  currentItemIndex: 0,
  answers: {},
  flaggedItemIds: [],
  timeRemainingSeconds: 25 * 60, // 25 minutes for certified battery
  isFinished: false,
  result: null,
  startedAt: Date.now(),
  attemptId: generateAttemptId(),
  lastSavedAt: null,
  saveError: null,
  responseTimestamps: {},
};

// ─── Storage Key ──────────────────────────────────────────────────────────────

const ACRI_SESSION_KEY = "acri_pv_session_v2"; // v2 — schema updated

// ─── CRUD Functions ───────────────────────────────────────────────────────────

export function getAcriSession(): AcriSessionState {
  if (typeof window === "undefined") return { ...DEFAULT_STATE, attemptId: generateAttemptId() };
  try {
    const raw =
      sessionStorage.getItem(ACRI_SESSION_KEY) || localStorage.getItem(ACRI_SESSION_KEY);
    if (!raw) return { ...DEFAULT_STATE, attemptId: generateAttemptId() };
    const parsed = JSON.parse(raw) as Partial<AcriSessionState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      // Always ensure phase and attemptId are defined even on old sessions
      phase: parsed.phase ?? "NOT_STARTED",
      attemptId: parsed.attemptId ?? generateAttemptId(),
      responseTimestamps: parsed.responseTimestamps ?? {},
    };
  } catch {
    return { ...DEFAULT_STATE, attemptId: generateAttemptId() };
  }
}

export function saveAcriSession(state: Partial<AcriSessionState>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getAcriSession();
    const updated = { ...current, ...state };
    const serialized = JSON.stringify(updated);
    sessionStorage.setItem(ACRI_SESSION_KEY, serialized);
    localStorage.setItem(ACRI_SESSION_KEY, serialized);
  } catch {
    // Ignore quota or private browsing errors
  }
}

export function resetAcriSession(mode: AssessmentMode = "certified"): AcriSessionState {
  const fresh: AcriSessionState = {
    ...DEFAULT_STATE,
    mode,
    phase: "READY",
    startedAt: Date.now(),
    attemptId: generateAttemptId(),
    timeRemainingSeconds: mode === "certified" ? 25 * 60 : Infinity,
    lastSavedAt: null,
    saveError: null,
    responseTimestamps: {},
  };
  saveAcriSession(fresh);
  return fresh;
}

/** Record an answer with its timestamp (for internal analytics) */
export function recordAnswer(
  session: AcriSessionState,
  itemId: string,
  answer: unknown,
): Partial<AcriSessionState> {
  return {
    answers: { ...session.answers, [itemId]: answer },
    responseTimestamps: { ...session.responseTimestamps, [itemId]: Date.now() },
  };
}
