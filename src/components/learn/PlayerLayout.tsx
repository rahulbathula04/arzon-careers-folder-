import { useState, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  Beaker,
  Video,
  Lock,
  Menu,
  X,
  Send,
  StickyNote,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Flame,
  Award,
  ArrowRight,
  Trash2,
} from "lucide-react";
import type { Course, Lesson, SyllabusModule } from "@/data/courses";
import { getLessons, isFreePreview, getCourseLessonCount } from "@/lib/lessons";
import { useProgress, lessonKey } from "@/hooks/useProgress";
import { Button } from "@/components/ui/button";
import { TrustBar } from "@/components/courses/TrustBar";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const TYPE_ICON: Record<Lesson["type"], typeof Video> = {
  video: Video,
  reading: FileText,
  lab: Beaker,
  live: PlayCircle,
};

export function PlayerLayout({
  course,
  initialModuleIndex,
  initialLessonIndex,
}: {
  course: Course;
  initialModuleIndex: number;
  initialLessonIndex: number;
}) {
  const {
    state,
    stats,
    toggleComplete,
    setNote,
    submitAssignment,
    toggleBookmark,
    setLastVisited,
    submitCapstone,
    enrol,
  } = useProgress(course.slug);
  const [mIdx, setMIdx] = useState(initialModuleIndex);
  const [lIdx, setLIdx] = useState(initialLessonIndex);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resumed, setResumed] = useState(false);
  const [resumeDismissed, setResumeDismissed] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  // Resume to last visited if landed on default lesson
  useEffect(() => {
    if (resumed) return;
    const lv = state.lastVisited;
    if (lv && (initialModuleIndex !== lv.moduleIndex || initialLessonIndex !== lv.lessonIndex)) {
      // only auto-resume if user didn't deep-link (default 0,0)
      if (initialModuleIndex === 0 && initialLessonIndex === 0) {
        setMIdx(lv.moduleIndex);
        setLIdx(lv.lessonIndex);
      }
    }
    setResumed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.lastVisited]);

  // Persist last visited
  useEffect(() => {
    const t = setTimeout(() => setLastVisited(mIdx, lIdx), 500);
    return () => clearTimeout(t);
  }, [mIdx, lIdx, setLastVisited]);

  const totalLessons = useMemo(() => getCourseLessonCount(course), [course]);
  const completedCount = state.completed.length;
  const pct = Math.round((completedCount / Math.max(1, totalLessons)) * 100);

  const module = course.syllabus[mIdx];
  const lessons = getLessons(module);
  const lesson = lessons[lIdx];
  const moduleId = `m${mIdx + 1}`;
  const lkey = lessonKey(moduleId, lesson.id);
  const isComplete = state.completed.includes(lkey);
  const isBookmarked = state.bookmarks.includes(lkey);
  const isLocked = !isFreePreview(module, lIdx) && !state.enrolledAt;
  const isLastLesson = mIdx === course.syllabus.length - 1 && lIdx === lessons.length - 1;

  // Keyboard shortcuts: J/K next-prev, M mark complete
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName?.match(/INPUT|TEXTAREA/)) return;
      if (e.key === "j") goNext();
      else if (e.key === "k") goPrev();
      else if (e.key === "m") toggleComplete(lkey);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mIdx, lIdx, lkey]);

  const goNext = () => {
    if (lIdx + 1 < lessons.length) setLIdx(lIdx + 1);
    else if (mIdx + 1 < course.syllabus.length) {
      setMIdx(mIdx + 1);
      setLIdx(0);
    }
  };
  const goPrev = () => {
    if (lIdx > 0) setLIdx(lIdx - 1);
    else if (mIdx > 0) {
      const prev = course.syllabus[mIdx - 1];
      setMIdx(mIdx - 1);
      setLIdx(getLessons(prev).length - 1);
    }
  };

  return (
    <div className="min-h-app bg-[#0f172a] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-white/10 bg-[#0f172a]/95 px-3 backdrop-blur sm:px-5">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-white lg:hidden"
            aria-label="Toggle modules"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link
            to="/courses/$slug"
            params={{ slug: course.slug }}
            className="hidden text-xs font-semibold text-eyebrow hover:underline sm:block"
          >
            ← {course.title}
          </Link>
          <span className="truncate text-sm font-semibold text-white sm:hidden">
            {course.title}
          </span>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          {stats.streak > 0 && (
            <span className="hidden items-center gap-1 rounded-full bg-orange-500/15 px-2.5 py-1 text-micro font-semibold text-orange-300 ring-1 ring-orange-400/30 sm:inline-flex">
              <Flame className="h-3 w-3" /> {stats.streak}-day streak
            </span>
          )}
          {state.bookmarks.length > 0 && (
            <button
              onClick={() => setBookmarksOpen(true)}
              className="hidden items-center gap-1 rounded-full bg-blue-500/15 px-2.5 py-1 text-micro font-semibold text-eyebrow-strong ring-1 ring-blue-400/30 transition hover:bg-blue-500/25 sm:inline-flex"
              aria-label="Open bookmarks"
            >
              <BookmarkCheck className="h-3 w-3" /> {state.bookmarks.length} bookmarked
            </button>
          )}
          <div className="hidden items-center gap-2 sm:flex">
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-blue-400 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="font-mono text-micro text-eyebrow-strong">{pct}%</span>
          </div>
          <Link
            to="/courses/$slug"
            params={{ slug: course.slug }}
            className="text-xs font-semibold text-eyebrow hover:text-white"
          >
            Exit
          </Link>
        </div>
      </header>

      {/* Free preview banner */}
      {isFreePreview(module, lIdx) && (
        <div className="border-b border-blue-400/30 bg-blue-400/10 px-4 py-2 text-center text-micro font-semibold text-blue-100">
          <Sparkles className="mr-1 inline h-3.5 w-3.5" />
          Free preview lesson, no card required to watch
        </div>
      )}

      <div className="grid lg:grid-cols-[280px_1fr_300px]">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "block" : "hidden"
            } border-r border-white/10 bg-[#0b1220] lg:block`}
        >
          <ModuleList
            course={course}
            currentModule={mIdx}
            currentLesson={lIdx}
            completed={state.completed}
            bookmarks={state.bookmarks}
            onToggleBookmark={toggleBookmark}
            onPick={(m, l) => {
              setMIdx(m);
              setLIdx(l);
              setSidebarOpen(false);
            }}
          />
        </aside>

        {/* Lesson viewport */}
        <main className="min-w-0 px-4 py-6 sm:px-8 sm:py-8">
          {/* Resume banner */}
          {!resumeDismissed &&
            state.lastVisited &&
            (state.lastVisited.moduleIndex !== mIdx || state.lastVisited.lessonIndex !== lIdx) && (
              <ResumeBanner
                course={course}
                moduleIndex={state.lastVisited.moduleIndex}
                lessonIndex={state.lastVisited.lessonIndex}
                onResume={(m, l) => {
                  setMIdx(m);
                  setLIdx(l);
                  setResumeDismissed(true);
                }}
                onDismiss={() => setResumeDismissed(true)}
              />
            )}

          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow">
            {module.weeks} · Module {mIdx + 1} · Lesson {lIdx + 1} of {lessons.length}
          </p>
          <h1 className="mt-2 font-display text-h3 font-bold text-white sm:text-h2">
            {lesson.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              {(() => {
                const Icon = TYPE_ICON[lesson.type];
                return <Icon className="h-3.5 w-3.5" />;
              })()}
              {lesson.type}
            </span>
            <span>·</span>
            <span>{lesson.durationMin} min</span>
            <span>·</span>
            <span className="text-eyebrow">Satisfies JD: {module.jdSkill}</span>
          </div>

          {isLocked ? (
            <LockedCard course={course} onEnrol={enrol} />
          ) : (
            <LessonViewport course={course} lesson={lesson} module={module} />
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={goPrev}
                className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                ← Previous
              </Button>
              <Button
                variant="outline"
                onClick={goNext}
                className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                Next →
              </Button>
              <Button
                variant="outline"
                onClick={() => toggleBookmark(lkey)}
                className={`rounded-full border-white/20 bg-white/5 ${isBookmarked ? "text-eyebrow" : "text-white"
                  } hover:bg-white/10`}
              >
                {isBookmarked ? (
                  <>
                    <BookmarkCheck className="mr-1 h-4 w-4" /> Bookmarked
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-1 h-4 w-4" /> Bookmark
                  </>
                )}
              </Button>
            </div>
            <Button
              onClick={() => {
                toggleComplete(lkey);
                if (!isComplete) setTimeout(goNext, 250);
              }}
              className={`rounded-full ${isComplete
                  ? "bg-sky-500 text-white hover:bg-sky-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              style={{ boxShadow: "0 8px 24px -8px rgba(59,130,246,0.6)" }}
            >
              {isComplete ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Completed
                </>
              ) : (
                <>Mark complete (M)</>
              )}
            </Button>
          </div>

          {/* Module-level assignment */}
          {lIdx === lessons.length - 1 && !isLocked && (
            <AssignmentCard
              moduleKey={moduleId}
              module={module}
              existing={state.assignments[moduleId]}
              onSubmit={(score) => submitAssignment(moduleId, { score })}
            />
          )}

          {/* Capstone, visible on last lesson of last module */}
          {isLastLesson && !isLocked && (
            <CapstoneCard
              existing={state.capstone}
              onSubmit={(payload) => submitCapstone(payload)}
            />
          )}
        </main>

        {/* Right rail: notes */}
        <aside className="hidden border-l border-white/10 bg-[#0b1220] p-5 lg:block">
          <NotesPanel value={state.notes[lkey] ?? ""} onChange={(v) => setNote(lkey, v)} />
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow">
              Stuck?
            </p>
            <p className="mt-2 text-xs text-slate-300">
              Mentors reply within an hour during cohort hours.
            </p>
            <WhatsAppLink
              source="learn_player_stuck"
              program_slug={course.slug}
              message={`Hi, I'm stuck on "${lesson.title}" in ${course.title}`}
              trackProps={{ course_slug: course.slug, lesson_id: lesson.id }}
              className="mt-3 inline-flex h-9 items-center justify-center rounded-full bg-sky-500 px-4 text-xs font-semibold text-white hover:bg-sky-600"
            >
              Ask on WhatsApp
            </WhatsAppLink>
          </div>
        </aside>
      </div>

      <div className="border-t border-white/10">
        <TrustBar compact />
      </div>

      {/* Bookmarks drawer */}
      <BookmarksDrawer
        open={bookmarksOpen}
        onOpenChange={setBookmarksOpen}
        course={course}
        bookmarks={state.bookmarks}
        onPick={(m, l) => {
          setMIdx(m);
          setLIdx(l);
          setBookmarksOpen(false);
        }}
        onRemove={(k) => toggleBookmark(k)}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────── resume banner ─── */

function ResumeBanner({
  course,
  moduleIndex,
  lessonIndex,
  onResume,
  onDismiss,
}: {
  course: Course;
  moduleIndex: number;
  lessonIndex: number;
  onResume: (m: number, l: number) => void;
  onDismiss: () => void;
}) {
  const m = course.syllabus[moduleIndex];
  if (!m) return null;
  const lessons = getLessons(m);
  const l = lessons[lessonIndex];
  if (!l) return null;
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-400/30 bg-blue-500/10 p-4">
      <div className="min-w-0">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow-strong">
          Continue where you left off
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-white">
          {m.title} · <span className="text-white/80">{l.title}</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onResume(moduleIndex, lessonIndex)}
          className="inline-flex h-9 items-center rounded-full bg-blue-500 px-4 text-xs font-semibold text-white hover:bg-blue-600"
        >
          Resume <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </button>
        <button
          onClick={onDismiss}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
          aria-label="Dismiss resume banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────── bookmarks drawer ─── */

function BookmarksDrawer({
  open,
  onOpenChange,
  course,
  bookmarks,
  onPick,
  onRemove,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  course: Course;
  bookmarks: string[];
  onPick: (m: number, l: number) => void;
  onRemove: (k: string) => void;
}) {
  const grouped = useMemo(() => {
    const groups: {
      module: SyllabusModule;
      mIdx: number;
      items: { l: Lesson; lIdx: number; k: string }[];
    }[] = [];
    course.syllabus.forEach((module, mIdx) => {
      const lessons = getLessons(module);
      const items = lessons
        .map((l, lIdx) => ({ l, lIdx, k: lessonKey(`m${mIdx + 1}`, l.id) }))
        .filter((it) => bookmarks.includes(it.k));
      if (items.length) groups.push({ module, mIdx, items });
    });
    return groups;
  }, [course, bookmarks]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full border-l border-white/10 bg-[#0b1220] text-white sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-white">
            <BookmarkCheck className="h-4 w-4 text-eyebrow" /> Your bookmarks
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-5 overflow-y-auto pr-1">
          {grouped.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <Bookmark className="mx-auto h-6 w-6 text-eyebrow" />
              <p className="mt-2 text-sm font-semibold text-white">No bookmarks yet</p>
              <p className="mt-1 text-xs text-white/60">
                Tap the bookmark icon on any lesson to save it here.
              </p>
            </div>
          )}
          {grouped.map((g) => (
            <div key={g.mIdx}>
              <p className="px-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow">
                Module {g.mIdx + 1} · {g.module.weeks}
              </p>
              <p className="mt-0.5 px-1 text-sm font-semibold text-white">{g.module.title}</p>
              <ul className="mt-2 space-y-1.5">
                {g.items.map((it) => (
                  <li
                    key={it.k}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                  >
                    <button
                      onClick={() => onPick(g.mIdx, it.lIdx)}
                      className="flex-1 truncate text-left text-xs text-white hover:text-eyebrow"
                    >
                      {it.l.title}
                    </button>
                    <button
                      onClick={() => onRemove(it.k)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded text-white/60 hover:bg-white/10 hover:text-white"
                      aria-label="Remove bookmark"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ──────────────────────────────────────────────── helpers ─── */

function ModuleList({
  course,
  currentModule,
  currentLesson,
  completed,
  bookmarks,
  onToggleBookmark,
  onPick,
}: {
  course: Course;
  currentModule: number;
  currentLesson: number;
  completed: string[];
  bookmarks: string[];
  onToggleBookmark: (k: string) => void;
  onPick: (m: number, l: number) => void;
}) {
  return (
    <nav className="max-h-[calc(100vh-3.5rem)] overflow-y-auto p-3 text-sm">
      {course.syllabus.map((m, mi) => {
        const lessons = getLessons(m);
        return (
          <div key={m.weeks} className="mb-3">
            <p className="px-2 py-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow">
              {m.weeks} · Module {mi + 1}
            </p>
            <p className="px-2 pb-1 text-meta font-semibold text-white">{m.title}</p>
            <ul>
              {lessons.map((l, li) => {
                const k = lessonKey(`m${mi + 1}`, l.id);
                const done = completed.includes(k);
                const bm = bookmarks.includes(k);
                const active = mi === currentModule && li === currentLesson;
                const free = isFreePreview(m, li);
                const Icon = TYPE_ICON[l.type];
                return (
                  <li key={l.id}>
                    <div
                      className={`group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${active
                          ? "bg-blue-500/15 text-white ring-1 ring-blue-400/40"
                          : "text-slate-300 hover:bg-white/5"
                        }`}
                    >
                      <button
                        onClick={() => onPick(mi, li)}
                        className="flex flex-1 items-center gap-2 text-left"
                      >
                        {done ? (
                          <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-sky-400" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 flex-shrink-0 text-slate-500" />
                        )}
                        <Icon className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
                        <span className="flex-1 truncate">{l.title}</span>
                        {free && (
                          <span className="rounded bg-blue-400/20 px-1.5 py-0.5 font-mono text-micro font-semibold uppercase tracking-wider text-eyebrow-strong">
                            Free
                          </span>
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(k);
                        }}
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-slate-500 hover:text-eyebrow"
                        aria-label={bm ? "Remove bookmark" : "Add bookmark"}
                      >
                        {bm ? (
                          <BookmarkCheck className="h-3.5 w-3.5 text-eyebrow" />
                        ) : (
                          <Bookmark className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

function LessonViewport({
  course,
  lesson,
  module,
}: {
  course: Course;
  lesson: Lesson;
  module: SyllabusModule;
}) {
  return (
    <div className="mt-6">
      {lesson.type === "video" ? (
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-[#0a0c10] ring-1 ring-white/10">
          {lesson.videoUrl ? (
            <iframe
              src={lesson.videoUrl}
              title={lesson.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-slate-400">
              <PlayCircle className="h-12 w-12 text-blue-400" />
              <p className="text-sm">Video uploads when cohort starts</p>
              <p className="text-micro">Lesson notes and resources are below.</p>
            </div>
          )}
        </div>
      ) : null}

      <article className="prose prose-invert mt-6 max-w-none rounded-2xl bg-white/5 p-6 text-sm text-slate-200 ring-1 ring-white/10">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow">
          What you'll learn
        </p>
        <p className="mt-2 text-base text-white">{lesson.title}</p>
        <p className="mt-4 leading-relaxed">
          {lesson.body ??
            `In this lesson we cover ${lesson.title} as part of ${module.title}. You'll work through real examples drawn from ${course.jd.sampleEmployers
              .slice(0, 2)
              .join(
                " & ",
              )} job descriptions, then apply it to the module deliverable: ${module.deliverable}.`}
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {module.topics.map((t) => (
            <div
              key={t}
              className="flex items-start gap-2 rounded-lg bg-white/5 p-3 ring-1 ring-white/5"
            >
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-blue-400" />
              <span className="text-xs text-slate-200">{t}</span>
            </div>
          ))}
        </div>
      </article>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow">
          Resources
        </p>
        <ul className="mt-3 space-y-2">
          {(lesson.resources && lesson.resources.length
            ? lesson.resources
            : [
              {
                label: `${lesson.title}, worksheet (PDF)`,
                kind: "pdf" as const,
                href: "#",
              },
              {
                label: `${module.title}, sample dataset (CSV)`,
                kind: "csv" as const,
                href: "#",
              },
            ]
          ).map((r) => (
            <li
              key={r.label}
              className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200 ring-1 ring-white/5"
            >
              <span>{r.label}</span>
              <a
                href={r.href}
                className="rounded-full bg-blue-500/20 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-wider text-eyebrow-strong hover:bg-blue-500/30"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LockedCard({ course, onEnrol }: { course: Course; onEnrol: () => void }) {
  return (
    <div className="mt-6 rounded-2xl border border-blue-400/30 bg-blue-500/5 p-8 text-center">
      <Lock className="mx-auto h-10 w-10 text-eyebrow" />
      <h3 className="mt-3 font-display text-h4 font-bold text-white">
        Lock your seat to unlock the rest
      </h3>
      <p className="mt-2 text-sm text-slate-300">
        Lesson 1 of every module is free. Reserve your seat to unlock
        all lessons, assignments, mentor support and your certificate.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Link
          to="/apply"
          onClick={onEnrol}
          className="inline-flex h-11 items-center rounded-full bg-blue-500 px-6 text-sm font-semibold text-white hover:bg-blue-600"
          style={{ boxShadow: "0 8px 24px -8px rgba(59,130,246,0.6)" }}
        >
          Start application
        </Link>
        <button
          onClick={onEnrol}
          className="inline-flex h-11 items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-5 text-sm font-semibold text-blue-100 hover:bg-blue-500/15"
        >
          Try preview mode
        </button>
        <WhatsAppLink
          source="learn_preview_counsellor"
          program_slug={course.slug}
          message={`Hi, I'm previewing ${course.title} and want to enrol.`}
          trackProps={{ course_slug: course.slug }}
          className="inline-flex h-11 items-center rounded-full border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10"
        >
          Talk to counsellor
        </WhatsAppLink>
      </div>
    </div>
  );
}

function CapstoneCard({
  existing,
  onSubmit,
}: {
  existing?: { link: string; summary: string; submittedAt: string; score?: number };
  onSubmit: (payload: { link: string; summary: string }) => void;
}) {
  const [link, setLink] = useState(existing?.link ?? "");
  const [summary, setSummary] = useState(existing?.summary ?? "");

  const submit = () => {
    if (!link.trim() || !summary.trim()) return;
    onSubmit({ link: link.trim(), summary: summary.trim() });
  };

  return (
    <div className="mt-10 rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-blue-500/5 p-6 ring-1 ring-amber-400/10">
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-amber-300" />
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-amber-200">
          Capstone submission
        </p>
      </div>
      <h3 className="mt-2 font-display text-h4 font-bold text-white">
        Ship your final capstone, earn the performance LOR
      </h3>
      <p className="mt-2 text-xs text-slate-300">
        Submit a public link (Drive, GitHub, Notion, Loom) and a 3-line summary. Mentors review
        within 5 days. Score ≥85 unlocks your performance-based LOR + interview track.
      </p>

      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="3-line summary: problem, what you built, outcome…"
        className="mt-4 h-28 w-full resize-none rounded-xl border border-white/10 bg-[#0b1220] p-3 text-xs text-white outline-none ring-amber-300/30 placeholder:text-slate-500 focus:ring-2"
      />
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://link-to-your-capstone"
        className="mt-3 h-11 w-full rounded-full border border-white/10 bg-[#0b1220] px-4 text-xs text-white outline-none ring-amber-300/30 placeholder:text-slate-500 focus:ring-2"
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-micro text-slate-400">You can resubmit any time before scoring.</p>
        <Button
          onClick={submit}
          disabled={!link.trim() || !summary.trim()}
          className="rounded-full bg-amber-400 text-[#1A1300] hover:bg-amber-300"
        >
          <Send className="mr-2 h-4 w-4" />
          {existing ? "Resubmit capstone" : "Submit capstone"}
        </Button>
      </div>

      {existing && (
        <div className="mt-5 rounded-xl bg-accent-glow/10 p-4 ring-1 ring-accent-glow/30">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow">
            Submitted
          </p>
          <p className="mt-2 text-xs text-eyebrow-strong">
            On {new Date(existing.submittedAt).toLocaleString()}.
            {existing.score ? ` Mentor score: ${existing.score}/100.` : " Awaiting mentor review."}
          </p>
        </div>
      )}
    </div>
  );
}

function NotesPanel({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <StickyNote className="h-4 w-4 text-eyebrow" />
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow">
          Your notes
        </p>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type notes, saved on this device"
        className="mt-3 h-44 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none ring-blue-400/30 placeholder:text-slate-500 focus:ring-2"
      />
      <p className="mt-2 text-micro text-slate-500">
        Saved locally · syncs to your account when cohort starts.
      </p>
    </div>
  );
}

function AssignmentCard({
  moduleKey,
  module,
  existing,
  onSubmit,
}: {
  moduleKey: string;
  module: SyllabusModule;
  existing?: { score: number; submittedAt: string };
  onSubmit: (score: number) => void;
}) {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    // mock evaluator: keyword scoring against jdSkill + topics + length
    const corpus = (text + " " + link).toLowerCase();
    const keywords = [
      ...module.jdSkill.toLowerCase().split(/\W+/),
      ...module.topics.flatMap((t) => t.toLowerCase().split(/\W+/)),
    ].filter((w) => w.length > 3);
    const hits = new Set(keywords.filter((k) => corpus.includes(k))).size;
    const lengthBonus = Math.min(20, Math.floor(text.length / 40));
    const linkBonus = link.startsWith("http") ? 15 : 0;
    const score = Math.max(0, Math.min(100, hits * 6 + lengthBonus + linkBonus + 35));
    onSubmit(score);
  };

  return (
    <div className="mt-10 rounded-2xl border border-blue-400/30 bg-white/5 p-6 ring-1 ring-white/5">
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow">
        Module assignment · Module {moduleKey.replace("m", "")}
      </p>
      <h3 className="mt-2 font-display text-h4 font-bold text-white">{module.deliverable}</h3>
      <p className="mt-2 text-xs text-slate-300">
        Submit a short summary plus a link to your work (Drive, GitHub, Notion, etc). The
        auto-evaluator scores keyword coverage and rubric fit. Mentor review follows within 48h.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Brief description of what you built and why…"
        className="mt-4 h-28 w-full resize-none rounded-xl border border-white/10 bg-[#0b1220] p-3 text-xs text-white outline-none ring-blue-400/30 placeholder:text-slate-500 focus:ring-2"
      />
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://link-to-your-deliverable"
        className="mt-3 h-11 w-full rounded-full border border-white/10 bg-[#0b1220] px-4 text-xs text-white outline-none ring-blue-400/30 placeholder:text-slate-500 focus:ring-2"
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-micro text-slate-400">
          Rubric: JD-skill keywords · clarity · evidence link · depth.
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!text.trim() && !link.trim()}
          className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
        >
          <Send className="mr-2 h-4 w-4" />
          Submit for evaluation
        </Button>
      </div>

      {existing && (
        <div className="mt-5 rounded-xl bg-accent-glow/10 p-4 ring-1 ring-accent-glow/30">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow">
            Auto-evaluator score
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-h2 font-bold text-white">{existing.score}</span>
            <span className="text-xs text-eyebrow-strong">/ 100</span>
          </div>
          <p className="mt-2 text-micro text-eyebrow-strong">
            Submitted {new Date(existing.submittedAt).toLocaleString()} · feeds into your
            performance LOR eligibility (≥85% needed).
          </p>
        </div>
      )}
    </div>
  );
}
