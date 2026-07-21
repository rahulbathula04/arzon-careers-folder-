import { useEffect, useState, useCallback, useMemo } from "react";

/**
 * Per-course progress state. Stored in localStorage under
 * `arzon_progress_v2_<slug>`. The v2 namespace lets us evolve the shape
 * without colliding with the previous version.
 */
export interface ProgressState {
  /** Lesson-keys the learner has marked complete. */
  completed: string[];
  /** Lesson-keys the learner has bookmarked for later. */
  bookmarks: string[];
  /** Per-lesson notes (autosave). */
  notes: Record<string, string>;
  /** Per-module assignment submissions. */
  assignments: Record<string, { score: number; submittedAt: string; link?: string }>;
  /** Capstone state — submitted once per course. */
  capstone?: { link: string; summary: string; submittedAt: string; score?: number };
  /** Last lesson opened — used to "Resume". */
  lastVisited?: { moduleIndex: number; lessonIndex: number; at: string };
  /** Daily-touch streak (yyyy-mm-dd of last touch + count). */
  streak: { lastDay: string; count: number };
  /** When the learner first opened the player. */
  enrolledAt?: string;
}

const EMPTY: ProgressState = {
  completed: [],
  bookmarks: [],
  notes: {},
  assignments: {},
  streak: { lastDay: "", count: 0 },
};

const storageKey = (slug: string) => `arzon_progress_v2_${slug}`;

function read(slug: string): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

function write(slug: string, state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(slug), JSON.stringify(state));
  } catch {
    /* quota exceeded — ignore */
  }
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function bumpStreak(prev: ProgressState["streak"]): ProgressState["streak"] {
  const today = todayISO();
  if (prev.lastDay === today) return prev;
  if (!prev.lastDay) return { lastDay: today, count: 1 };
  // is yesterday?
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}-${String(y.getDate()).padStart(2, "0")}`;
  return prev.lastDay === yesterday
    ? { lastDay: today, count: prev.count + 1 }
    : { lastDay: today, count: 1 };
}

export function useProgress(slug: string) {
  const [state, setState] = useState<ProgressState>(EMPTY);

  useEffect(() => {
    setState(read(slug));
  }, [slug]);

  const persist = useCallback(
    (updater: (prev: ProgressState) => ProgressState) => {
      setState((prev) => {
        const next = updater(prev);
        write(slug, next);
        return next;
      });
    },
    [slug],
  );

  const enrol = useCallback(() => {
    persist((prev) => ({
      ...prev,
      enrolledAt: prev.enrolledAt ?? new Date().toISOString(),
      streak: bumpStreak(prev.streak),
    }));
  }, [persist]);

  const toggleComplete = useCallback(
    (key: string) => {
      persist((prev) => {
        const set = new Set(prev.completed);
        if (set.has(key)) set.delete(key);
        else set.add(key);
        return { ...prev, completed: Array.from(set), streak: bumpStreak(prev.streak) };
      });
    },
    [persist],
  );

  const toggleBookmark = useCallback(
    (key: string) => {
      persist((prev) => {
        const set = new Set(prev.bookmarks);
        if (set.has(key)) set.delete(key);
        else set.add(key);
        return { ...prev, bookmarks: Array.from(set) };
      });
    },
    [persist],
  );

  const setNote = useCallback(
    (key: string, value: string) => {
      persist((prev) => ({ ...prev, notes: { ...prev.notes, [key]: value } }));
    },
    [persist],
  );

  const submitAssignment = useCallback(
    (moduleKey: string, payload: { score: number; link?: string }) => {
      persist((prev) => ({
        ...prev,
        assignments: {
          ...prev.assignments,
          [moduleKey]: { ...payload, submittedAt: new Date().toISOString() },
        },
      }));
    },
    [persist],
  );

  const submitCapstone = useCallback(
    (payload: { link: string; summary: string }) => {
      persist((prev) => ({
        ...prev,
        capstone: {
          ...payload,
          submittedAt: new Date().toISOString(),
          score: prev.capstone?.score,
        },
      }));
    },
    [persist],
  );

  const setLastVisited = useCallback(
    (moduleIndex: number, lessonIndex: number) => {
      persist((prev) => ({
        ...prev,
        lastVisited: { moduleIndex, lessonIndex, at: new Date().toISOString() },
      }));
    },
    [persist],
  );

  const reset = useCallback(() => {
    persist(() => EMPTY);
  }, [persist]);

  const stats = useMemo(
    () => ({
      completedCount: state.completed.length,
      bookmarksCount: state.bookmarks.length,
      assignmentsCount: Object.keys(state.assignments).length,
      streak: state.streak.count,
      isEnrolled: !!state.enrolledAt,
    }),
    [state],
  );

  return {
    state,
    stats,
    enrol,
    toggleComplete,
    toggleBookmark,
    setNote,
    submitAssignment,
    submitCapstone,
    setLastVisited,
    reset,
  };
}

export const lessonKey = (moduleId: string, lessonId: string) => `${moduleId}:${lessonId}`;
export const moduleKey = (moduleIndex: number) => `m${moduleIndex + 1}`;
