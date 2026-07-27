import { r as reactExports } from "../_libs/react.mjs";
const EMPTY = {
  completed: [],
  bookmarks: [],
  notes: {},
  assignments: {},
  streak: { lastDay: "", count: 0 }
};
const storageKey = (slug) => `arzon_progress_v2_${slug}`;
function read(slug) {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}
function write(slug, state) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(slug), JSON.stringify(state));
  } catch {
  }
}
function todayISO() {
  const d = /* @__PURE__ */ new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function bumpStreak(prev) {
  const today = todayISO();
  if (prev.lastDay === today) return prev;
  if (!prev.lastDay) return { lastDay: today, count: 1 };
  const y = /* @__PURE__ */ new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}-${String(y.getDate()).padStart(2, "0")}`;
  return prev.lastDay === yesterday ? { lastDay: today, count: prev.count + 1 } : { lastDay: today, count: 1 };
}
function useProgress(slug) {
  const [state, setState] = reactExports.useState(EMPTY);
  reactExports.useEffect(() => {
    setState(read(slug));
  }, [slug]);
  const persist = reactExports.useCallback(
    (updater) => {
      setState((prev) => {
        const next = updater(prev);
        write(slug, next);
        return next;
      });
    },
    [slug]
  );
  const enrol = reactExports.useCallback(() => {
    persist((prev) => ({
      ...prev,
      enrolledAt: prev.enrolledAt ?? (/* @__PURE__ */ new Date()).toISOString(),
      streak: bumpStreak(prev.streak)
    }));
  }, [persist]);
  const toggleComplete = reactExports.useCallback(
    (key) => {
      persist((prev) => {
        const set = new Set(prev.completed);
        if (set.has(key)) set.delete(key);
        else set.add(key);
        return { ...prev, completed: Array.from(set), streak: bumpStreak(prev.streak) };
      });
    },
    [persist]
  );
  const toggleBookmark = reactExports.useCallback(
    (key) => {
      persist((prev) => {
        const set = new Set(prev.bookmarks);
        if (set.has(key)) set.delete(key);
        else set.add(key);
        return { ...prev, bookmarks: Array.from(set) };
      });
    },
    [persist]
  );
  const setNote = reactExports.useCallback(
    (key, value) => {
      persist((prev) => ({ ...prev, notes: { ...prev.notes, [key]: value } }));
    },
    [persist]
  );
  const submitAssignment = reactExports.useCallback(
    (moduleKey2, payload) => {
      persist((prev) => ({
        ...prev,
        assignments: {
          ...prev.assignments,
          [moduleKey2]: { ...payload, submittedAt: (/* @__PURE__ */ new Date()).toISOString() }
        }
      }));
    },
    [persist]
  );
  const submitCapstone = reactExports.useCallback(
    (payload) => {
      persist((prev) => ({
        ...prev,
        capstone: {
          ...payload,
          submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
          score: prev.capstone?.score
        }
      }));
    },
    [persist]
  );
  const setLastVisited = reactExports.useCallback(
    (moduleIndex, lessonIndex) => {
      persist((prev) => ({
        ...prev,
        lastVisited: { moduleIndex, lessonIndex, at: (/* @__PURE__ */ new Date()).toISOString() }
      }));
    },
    [persist]
  );
  const reset = reactExports.useCallback(() => {
    persist(() => EMPTY);
  }, [persist]);
  const stats = reactExports.useMemo(
    () => ({
      completedCount: state.completed.length,
      bookmarksCount: state.bookmarks.length,
      assignmentsCount: Object.keys(state.assignments).length,
      streak: state.streak.count,
      isEnrolled: !!state.enrolledAt
    }),
    [state]
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
    reset
  };
}
const lessonKey = (moduleId, lessonId) => `${moduleId}:${lessonId}`;
function getLessons(module) {
  if (module.lessons && module.lessons.length) return module.lessons;
  return module.topics.map((topic, i) => ({
    id: `l${i + 1}`,
    title: topic,
    type: i === module.topics.length - 1 ? "lab" : i % 3 === 1 ? "reading" : "video",
    durationMin: 18 + i * 7 % 22
  }));
}
function isFreePreview(_module, lessonIndex) {
  return lessonIndex === 0;
}
function getCourseLessonCount(course) {
  return course.syllabus.reduce((sum, m) => sum + getLessons(m).length, 0);
}
export {
  getLessons as a,
  getCourseLessonCount as g,
  isFreePreview as i,
  lessonKey as l,
  useProgress as u
};
