/**
 * ReportStateContext — page-level state for the Career Fit Report v5.
 * Provides: theme (dark/light), per-card expanded state, bookmarks,
 * last-viewed chapter (resume), and completed set. All persisted to
 * localStorage. Consumed by ReportCard, ReportActionBar, ResumeBanner.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { getReportProgress, upsertReportProgress } from "@/lib/report/progress.functions";
// Local type mirror to avoid a circular import back into ConfidenceBadge.
type ConfidenceLevel = "high" | "medium" | "directional";

export type ReportTheme = "dark" | "light";

export interface QuizProfile {
  skills: string[];
  gradYear: number | null;
  domain: string | null;
  savedAt: string;
}

export type TrackerStatus =
  | "not-started"
  | "researching"
  | "applied"
  | "interview"
  | "offer"
  | "rejected";

export interface TrackerEntry {
  status: TrackerStatus;
  dueDate: string | null;
  notes: string;
  updatedAt: string;
  /** When true (default when a due date is set), show due-date reminders. */
  remind?: boolean;
}

export interface EvidenceRequest {
  ids: string[];
  title?: string;
  level?: ConfidenceLevel;
  rationale?: string;
}

export type CounsellorBookingChannel = "calendar" | "whatsapp";

export interface CounsellorBooking {
  /** ISO timestamp of the requested slot; null for WhatsApp handoff without a picked slot. */
  slotAt: string | null;
  /** How the booking was captured. */
  via: CounsellorBookingChannel;
  /** ISO timestamp of when the booking was recorded. */
  bookedAt: string;
  /** Optional target role captured at booking time. */
  role?: string | null;
}

export interface BookingProfile {
  name: string;
  phone: string;
  role: string;
  savedAt: string;
}

interface ReportState {
  theme: ReportTheme;
  setTheme: (t: ReportTheme) => void;
  toggleTheme: () => void;

  isExpanded: (id: string) => boolean;
  toggleExpanded: (id: string) => void;
  setExpanded: (id: string, v: boolean) => void;
  expandAll: () => void;
  collapseAll: () => void;
  allExpandedIds: string[];
  registerCard: (id: string, defaultExpanded: boolean) => void;

  bookmarks: string[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (id: string) => void;

  lastChapterId: string | null;
  setLastChapter: (id: string) => void;
  resumeDismissed: boolean;
  dismissResume: () => void;

  completed: string[];
  markCompleted: (id: string) => void;

  // Evidence Explorer
  evidence: EvidenceRequest | null;
  openEvidence: (req: EvidenceRequest) => void;
  closeEvidence: () => void;

  // Role-fit quiz personalization
  quizProfile: QuizProfile | null;
  setQuizProfile: (p: QuizProfile | null) => void;
  quizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;

  // Employer apply tracker
  employerTracker: Record<string, TrackerEntry>;
  setTrackerEntry: (employerId: string, entry: Partial<TrackerEntry>) => void;
  clearTrackerEntry: (employerId: string) => void;

  // 4-week action plan step checks
  actionPlanChecks: Record<string, boolean>;
  toggleActionStep: (stepId: string) => void;
  actionPlanProgress: { done: number; total: number };

  // Counsellor booking (auto-completes the w4 action step)
  counsellorBooking: CounsellorBooking | null;
  confirmCounsellorBooking: (
    booking: Omit<CounsellorBooking, "bookedAt"> & { bookedAt?: string },
  ) => void;
  clearCounsellorBooking: () => void;

  bookingProfile: BookingProfile | null;
  updateBookingProfile: (patch: Partial<Omit<BookingProfile, "savedAt">>) => void;
}

const Ctx = createContext<ReportState | null>(null);

const KEY_THEME = "arzon:report:v5:theme";
const KEY_EXPANDED = "arzon:report:v5:expanded";
const KEY_BOOKMARKS = "arzon:report:v5:bookmarks";
const KEY_PROGRESS = "arzon:report:v5:progress";
const KEY_QUIZ = "arzon:report:v6:quiz";
const KEY_TRACKER = "arzon:report:v6:tracker";
const KEY_ACTION_PLAN = "arzon:report:v6:action-plan";
const KEY_COUNSELLOR_BOOKING = "arzon:report:v6:counsellor-booking";
const KEY_BOOKING_PROFILE = "arzon:report:v6:booking-profile";

// Canonical Week 1-4 step IDs — shared between the chapter component and rail.
export const ACTION_PLAN_STEP_IDS = ["w1", "w2", "w3", "w4"] as const;

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota */
  }
}

export function ReportStateProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ReportTheme>("dark");
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});
  const [registered, setRegistered] = useState<Record<string, boolean>>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [lastChapterId, setLastChapterId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [resumeDismissed, setResumeDismissed] = useState(false);
  const [evidence, setEvidence] = useState<EvidenceRequest | null>(null);
  const [quizProfile, setQuizProfileState] = useState<QuizProfile | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [employerTracker, setEmployerTracker] = useState<Record<string, TrackerEntry>>({});
  const [actionPlanChecks, setActionPlanChecks] = useState<Record<string, boolean>>({});
  const [counsellorBooking, setCounsellorBookingState] = useState<CounsellorBooking | null>(null);
  const [bookingProfile, setBookingProfileState] = useState<BookingProfile | null>(null);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    const storedTheme = readLS<ReportTheme | null>(KEY_THEME, null);
    if (storedTheme === "dark" || storedTheme === "light") {
      setThemeState(storedTheme);
    } else if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: light)").matches
    ) {
      setThemeState("light");
    }
    setExpandedMap(readLS<Record<string, boolean>>(KEY_EXPANDED, {}));
    setBookmarks(readLS<string[]>(KEY_BOOKMARKS, []));
    const p = readLS<{ lastChapterId: string | null; completed: string[] }>(KEY_PROGRESS, {
      lastChapterId: null,
      completed: [],
    });
    setLastChapterId(p.lastChapterId ?? null);
    setCompleted(Array.isArray(p.completed) ? p.completed : []);
    setQuizProfileState(readLS<QuizProfile | null>(KEY_QUIZ, null));
    setEmployerTracker(readLS<Record<string, TrackerEntry>>(KEY_TRACKER, {}));
    setActionPlanChecks(readLS<Record<string, boolean>>(KEY_ACTION_PLAN, {}));
    setCounsellorBookingState(readLS<CounsellorBooking | null>(KEY_COUNSELLOR_BOOKING, null));
    setBookingProfileState(readLS<BookingProfile | null>(KEY_BOOKING_PROFILE, null));
  }, []);

  // Cloud sync: when a user is signed in, hydrate quiz + tracker from the
  // backend (remote wins on first load) and mirror local changes back with
  // a debounced upsert so progress follows the reader across devices.
  const hydratedRemoteRef = useRef(false);
  useEffect(() => {
    let cancelled = false;
    let unsub: (() => void) | undefined;
    const hydrate = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data.session) return;
        const remote = await getReportProgress();
        if (cancelled) return;
        if (remote.quizProfile) {
          setQuizProfileState(remote.quizProfile as QuizProfile);
          writeLS(KEY_QUIZ, remote.quizProfile);
        }
        if (remote.employerTracker && Object.keys(remote.employerTracker).length > 0) {
          setEmployerTracker(remote.employerTracker as Record<string, TrackerEntry>);
          writeLS(KEY_TRACKER, remote.employerTracker);
        }
      } catch {
        /* offline / signed-out — localStorage fallback stays in place */
      } finally {
        hydratedRemoteRef.current = true;
      }
    };
    void hydrate();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        hydratedRemoteRef.current = false;
        void hydrate();
      }
    });
    unsub = () => sub.subscription.unsubscribe();
    return () => {
      cancelled = true;
      unsub?.();
    };
  }, []);

  // Debounced push of quiz + tracker changes to backend (signed-in users only).
  useEffect(() => {
    if (!hydratedRemoteRef.current) return;
    const handle = window.setTimeout(async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data.session) return;
        await upsertReportProgress({
          data: {
            quizProfile: quizProfile as unknown,
            employerTracker: employerTracker as unknown as Record<string, unknown>,
          },
        });
      } catch {
        /* fail silently — localStorage is source of truth offline */
      }
    }, 1200);
    return () => window.clearTimeout(handle);
  }, [quizProfile, employerTracker]);

  const setTheme = useCallback((t: ReportTheme) => {
    setThemeState(t);
    writeLS(KEY_THEME, t);
  }, []);
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      writeLS(KEY_THEME, next);
      return next;
    });
  }, []);

  const registerCard = useCallback((id: string, defaultExpanded: boolean) => {
    setRegistered((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
    setExpandedMap((prev) => (id in prev ? prev : { ...prev, [id]: defaultExpanded }));
  }, []);

  const isExpanded = useCallback(
    (id: string) => (id in expandedMap ? expandedMap[id] : true),
    [expandedMap],
  );

  const persistExpanded = useCallback((next: Record<string, boolean>) => {
    writeLS(KEY_EXPANDED, next);
  }, []);

  const setExpanded = useCallback(
    (id: string, v: boolean) => {
      setExpandedMap((prev) => {
        const next = { ...prev, [id]: v };
        persistExpanded(next);
        return next;
      });
    },
    [persistExpanded],
  );
  const toggleExpanded = useCallback(
    (id: string) => {
      setExpandedMap((prev) => {
        const next = { ...prev, [id]: !(prev[id] ?? true) };
        persistExpanded(next);
        return next;
      });
    },
    [persistExpanded],
  );
  const expandAll = useCallback(() => {
    setExpandedMap(() => {
      const next: Record<string, boolean> = {};
      for (const id of Object.keys(registered)) next[id] = true;
      persistExpanded(next);
      return next;
    });
  }, [registered, persistExpanded]);
  const collapseAll = useCallback(() => {
    setExpandedMap(() => {
      const next: Record<string, boolean> = {};
      for (const id of Object.keys(registered)) next[id] = false;
      persistExpanded(next);
      return next;
    });
  }, [registered, persistExpanded]);

  const isBookmarked = useCallback((id: string) => bookmarks.includes(id), [bookmarks]);
  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeLS(KEY_BOOKMARKS, next);
      return next;
    });
  }, []);

  const setLastChapter = useCallback(
    (id: string) => {
      setLastChapterId((prev) => {
        if (prev === id) return prev;
        writeLS(KEY_PROGRESS, { lastChapterId: id, completed });
        return id;
      });
    },
    [completed],
  );

  const dismissResume = useCallback(() => setResumeDismissed(true), []);

  const markCompleted = useCallback(
    (id: string) => {
      setCompleted((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        writeLS(KEY_PROGRESS, { lastChapterId, completed: next });
        return next;
      });
    },
    [lastChapterId],
  );

  const openEvidence = useCallback((req: EvidenceRequest) => setEvidence(req), []);
  const closeEvidence = useCallback(() => setEvidence(null), []);

  const setQuizProfile = useCallback((p: QuizProfile | null) => {
    setQuizProfileState(p);
    writeLS(KEY_QUIZ, p);
  }, []);
  const openQuiz = useCallback(() => setQuizOpen(true), []);
  const closeQuiz = useCallback(() => setQuizOpen(false), []);

  const setTrackerEntry = useCallback((employerId: string, entry: Partial<TrackerEntry>) => {
    setEmployerTracker((prev) => {
      const existing: TrackerEntry = prev[employerId] ?? {
        status: "not-started",
        dueDate: null,
        notes: "",
        updatedAt: new Date().toISOString(),
      };
      const next = {
        ...prev,
        [employerId]: { ...existing, ...entry, updatedAt: new Date().toISOString() },
      };
      writeLS(KEY_TRACKER, next);
      return next;
    });
  }, []);
  const clearTrackerEntry = useCallback((employerId: string) => {
    setEmployerTracker((prev) => {
      const next = { ...prev };
      delete next[employerId];
      writeLS(KEY_TRACKER, next);
      return next;
    });
  }, []);

  const toggleActionStep = useCallback((stepId: string) => {
    setActionPlanChecks((prev) => {
      const next = { ...prev, [stepId]: !prev[stepId] };
      writeLS(KEY_ACTION_PLAN, next);
      return next;
    });
  }, []);

  const setActionStepChecked = useCallback((stepId: string, checked: boolean) => {
    setActionPlanChecks((prev) => {
      if (Boolean(prev[stepId]) === checked) return prev;
      const next = { ...prev, [stepId]: checked };
      writeLS(KEY_ACTION_PLAN, next);
      return next;
    });
  }, []);

  const confirmCounsellorBooking = useCallback(
    (booking: Omit<CounsellorBooking, "bookedAt"> & { bookedAt?: string }) => {
      const record: CounsellorBooking = {
        slotAt: booking.slotAt ?? null,
        via: booking.via,
        role: booking.role ?? null,
        bookedAt: booking.bookedAt ?? new Date().toISOString(),
      };
      setCounsellorBookingState(record);
      writeLS(KEY_COUNSELLOR_BOOKING, record);
      setActionStepChecked("w4", true);
    },
    [setActionStepChecked],
  );

  const clearCounsellorBooking = useCallback(() => {
    setCounsellorBookingState(null);
    writeLS(KEY_COUNSELLOR_BOOKING, null);
  }, []);

  const updateBookingProfile = useCallback((patch: Partial<Omit<BookingProfile, "savedAt">>) => {
    setBookingProfileState((prev) => {
      const base: BookingProfile = prev ?? { name: "", phone: "", role: "", savedAt: "" };
      const next: BookingProfile = {
        name: (patch.name ?? base.name).slice(0, 120),
        phone: (patch.phone ?? base.phone).slice(0, 40),
        role: (patch.role ?? base.role).slice(0, 160),
        savedAt: new Date().toISOString(),
      };
      writeLS(KEY_BOOKING_PROFILE, next);
      return next;
    });
  }, []);

  const actionPlanProgress = useMemo(() => {
    const total = ACTION_PLAN_STEP_IDS.length;
    const done = ACTION_PLAN_STEP_IDS.filter((id) => actionPlanChecks[id]).length;
    return { done, total };
  }, [actionPlanChecks]);

  // When user completes all 4 steps, mark the chapter itself as completed
  // so the rail's overall progress bar reflects it too.
  useEffect(() => {
    if (actionPlanProgress.done === actionPlanProgress.total) {
      markCompleted("ch-20-action-plan");
    }
    // markCompleted is memoised; safe dependency
  }, [actionPlanProgress.done, actionPlanProgress.total, markCompleted]);

  const allExpandedIds = useMemo(
    () =>
      Object.entries(expandedMap)
        .filter(([, v]) => v)
        .map(([k]) => k),
    [expandedMap],
  );

  const value: ReportState = {
    theme,
    setTheme,
    toggleTheme,
    isExpanded,
    toggleExpanded,
    setExpanded,
    expandAll,
    collapseAll,
    allExpandedIds,
    registerCard,
    bookmarks,
    isBookmarked,
    toggleBookmark,
    lastChapterId,
    setLastChapter,
    resumeDismissed,
    dismissResume,
    completed,
    markCompleted,
    evidence,
    openEvidence,
    closeEvidence,
    quizProfile,
    setQuizProfile,
    quizOpen,
    openQuiz,
    closeQuiz,
    employerTracker,
    setTrackerEntry,
    clearTrackerEntry,
    actionPlanChecks,
    toggleActionStep,
    actionPlanProgress,
    counsellorBooking,
    confirmCounsellorBooking,
    clearCounsellorBooking,
    bookingProfile,
    updateBookingProfile,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useReportState(): ReportState {
  const v = useContext(Ctx);
  if (!v) {
    // Fallback no-op state so ReportCard works outside the provider
    // (e.g. Storybook / isolated tests).
    return {
      theme: "dark",
      setTheme: () => {},
      toggleTheme: () => {},
      isExpanded: () => true,
      toggleExpanded: () => {},
      setExpanded: () => {},
      expandAll: () => {},
      collapseAll: () => {},
      allExpandedIds: [],
      registerCard: () => {},
      bookmarks: [],
      isBookmarked: () => false,
      toggleBookmark: () => {},
      lastChapterId: null,
      setLastChapter: () => {},
      resumeDismissed: true,
      dismissResume: () => {},
      completed: [],
      markCompleted: () => {},
      evidence: null,
      openEvidence: () => {},
      closeEvidence: () => {},
      quizProfile: null,
      setQuizProfile: () => {},
      quizOpen: false,
      openQuiz: () => {},
      closeQuiz: () => {},
      employerTracker: {},
      setTrackerEntry: () => {},
      clearTrackerEntry: () => {},
      actionPlanChecks: {},
      toggleActionStep: () => {},
      actionPlanProgress: { done: 0, total: 4 },
      counsellorBooking: null,
      confirmCounsellorBooking: () => {},
      clearCounsellorBooking: () => {},
      bookingProfile: null,
      updateBookingProfile: () => {},
    };
  }
  return v;
}
