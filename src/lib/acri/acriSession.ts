import type { AcriDecisionResult } from "@/data/acri/acriPvStandard";

export type AssessmentMode = "practice" | "certified";

export interface AcriSessionState {
  mode: AssessmentMode;
  currentItemIndex: number;
  answers: Record<string, any>;
  flaggedItemIds: string[];
  timeRemainingSeconds: number;
  isFinished: boolean;
  result: AcriDecisionResult | null;
  startedAt: number;
}

const ACRI_SESSION_KEY = "acri_pv_session_v1";

const DEFAULT_STATE: AcriSessionState = {
  mode: "certified",
  currentItemIndex: 0,
  answers: {},
  flaggedItemIds: [],
  timeRemainingSeconds: 25 * 60, // 25 minutes default for calibrated battery
  isFinished: false,
  result: null,
  startedAt: Date.now(),
};

export function getAcriSession(): AcriSessionState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = sessionStorage.getItem(ACRI_SESSION_KEY) || localStorage.getItem(ACRI_SESSION_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
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
    startedAt: Date.now(),
  };
  saveAcriSession(fresh);
  return fresh;
}
