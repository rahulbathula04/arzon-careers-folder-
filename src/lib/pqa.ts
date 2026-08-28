import { toast } from "sonner";

export interface PQAState {
  degreeSelected: boolean;
  intentSelected: boolean;
  careersExploredCount: number;
  matchCalculated: boolean;
  skillGapViewed: boolean;
  assayAttempted: boolean;
  whatsAppSubmitted: boolean;
  advisorSlotSelected: boolean;
  score: number;
  lastUpdated: number;
}

const STORAGE_KEY = "arzon_pqa_v2";

const INITIAL_PQA: PQAState = {
  degreeSelected: false,
  intentSelected: false,
  careersExploredCount: 0,
  matchCalculated: false,
  skillGapViewed: false,
  assayAttempted: false,
  whatsAppSubmitted: false,
  advisorSlotSelected: false,
  score: 0,
  lastUpdated: Date.now(),
};

// ---------------------------------------------------------------------------
// Persistence helpers
// ---------------------------------------------------------------------------

function loadPQAFromStorage(): PQAState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_PQA };
    const parsed = JSON.parse(raw) as PQAState;
    // Expire sessions older than 7 days to prevent stale state
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - (parsed.lastUpdated ?? 0) > sevenDays) {
      localStorage.removeItem(STORAGE_KEY);
      return { ...INITIAL_PQA };
    }
    return { ...INITIAL_PQA, ...parsed };
  } catch {
    return { ...INITIAL_PQA };
  }
}

function savePQAToStorage(state: PQAState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, lastUpdated: Date.now() }));
  } catch {
    // localStorage may be disabled (private mode, storage quota)
  }
}

// In-memory mirror — loaded once on first import, kept in sync with localStorage
let currentPQAState: PQAState = loadPQAFromStorage();

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function trackPQAEvent(
  event:
    | "DEGREE_SELECTED"
    | "INTENT_SELECTED"
    | "CAREER_EXPLORED"
    | "MATCH_CALCULATED"
    | "SKILL_GAP_VIEWED"
    | "ASSAY_ATTEMPTED"
    | "WHATSAPP_SUBMITTED"
    | "ADVISOR_SLOT_SELECTED"
): PQAState {
  let scoreDelta = 0;

  switch (event) {
    case "DEGREE_SELECTED":
      if (!currentPQAState.degreeSelected) {
        currentPQAState.degreeSelected = true;
        scoreDelta = 10;
      }
      break;

    case "INTENT_SELECTED":
      if (!currentPQAState.intentSelected) {
        currentPQAState.intentSelected = true;
        scoreDelta = 10;
      }
      break;

    case "CAREER_EXPLORED":
      currentPQAState.careersExploredCount += 1;
      if (currentPQAState.careersExploredCount <= 3) {
        scoreDelta = 15;
      }
      break;

    case "MATCH_CALCULATED":
      if (!currentPQAState.matchCalculated) {
        currentPQAState.matchCalculated = true;
        scoreDelta = 20;
      }
      break;

    case "SKILL_GAP_VIEWED":
      if (!currentPQAState.skillGapViewed) {
        currentPQAState.skillGapViewed = true;
        scoreDelta = 15;
      }
      break;

    case "ASSAY_ATTEMPTED":
      if (!currentPQAState.assayAttempted) {
        currentPQAState.assayAttempted = true;
        scoreDelta = 25;
      }
      break;

    case "WHATSAPP_SUBMITTED":
      if (!currentPQAState.whatsAppSubmitted) {
        currentPQAState.whatsAppSubmitted = true;
        scoreDelta = 20;
      }
      break;

    case "ADVISOR_SLOT_SELECTED":
      if (!currentPQAState.advisorSlotSelected) {
        currentPQAState.advisorSlotSelected = true;
        scoreDelta = 30;
      }
      break;
  }

  currentPQAState.score += scoreDelta;

  // Milestone toast — fires only once when score crosses 70
  if (currentPQAState.score >= 70 && currentPQAState.score - scoreDelta < 70) {
    toast.success("🎉 You've unlocked Priority Advisory Status", {
      description:
        "Your exploration depth qualifies you for a complimentary 1-on-1 career roadmap call.",
      duration: 6000,
    });
  }

  savePQAToStorage(currentPQAState);
  return { ...currentPQAState };
}

export function getPQAState(): PQAState {
  // Always return from in-memory mirror (already synced with localStorage)
  return { ...currentPQAState };
}

export function getPQAScore(): number {
  return currentPQAState.score;
}

export function resetPQA(): void {
  currentPQAState = { ...INITIAL_PQA };
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}
