import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useProgress, g as getCourseLessonCount, a as getLessons, l as lessonKey, i as isFreePreview } from "./lessons-BQw0N9wh.mjs";
import { aS as Route$1o, B as Button, W as WhatsAppLink, aO as Sheet, aP as SheetContent, aQ as SheetHeader, aR as SheetTitle } from "./router-CvdLERTV.mjs";
import { T as TrustBar } from "./TrustBar-DbIyef3b.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { X, t as Menu, aw as Flame, b7 as BookmarkCheck, d as Sparkles, b8 as CirclePlay, b9 as Beaker, ac as FileText, ba as Video, ax as Bookmark, I as CircleCheck, bb as Circle, q as ArrowRight, a7 as Lock, aE as Send, H as Award, bc as StickyNote, bd as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-CMxFZmfM.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createSsrRpc-BV3sOdh8.mjs";
import "./auth-middleware-CGVBerDj.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./moments.types-CDdnLKsa.mjs";
import "./enrolment.functions-Cs_77DUe.mjs";
import "../_libs/zod.mjs";
import "./enrolmentTiers-CKOrj6Lb.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/workflow__serde.mjs";
import "../_libs/ai-sdk__openai.mjs";
import "../_libs/lovable.dev__webhooks-js.mjs";
import "../_libs/lovable.dev__email-js.mjs";
import "./client.server-DUn3rRvm.mjs";
import "./redis.server-jD5sLB4g.mjs";
import "../_libs/react-email__render.mjs";
import "../_libs/prettier.mjs";
import "../_libs/html-to-text.mjs";
import "../_libs/selderee__plugin-htmlparser2.mjs";
import "../_libs/selderee.mjs";
import "../_libs/parseley.mjs";
import "../_libs/leac.mjs";
import "../_libs/peberminta.mjs";
import "../_libs/domhandler.mjs";
import "../_libs/domelementtype.mjs";
import "../_libs/htmlparser2.mjs";
import "../_libs/entities.mjs";
import "../_libs/deepmerge.mjs";
import "../_libs/dom-serializer.mjs";
import "../_libs/react-email__html.mjs";
import "../_libs/react-email__head.mjs";
import "../_libs/react-email__preview.mjs";
import "../_libs/react-email__body.mjs";
import "../_libs/react-email__container.mjs";
import "../_libs/react-email__heading.mjs";
import "../_libs/react-email__text.mjs";
import "../_libs/react-email__section.mjs";
import "../_libs/react-email__button.mjs";
import "../_libs/react-email__hr.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/uncrypto.mjs";
import "node:crypto";
const TYPE_ICON = {
  video: Video,
  reading: FileText,
  lab: Beaker,
  live: CirclePlay
};
function PlayerLayout({
  course,
  initialModuleIndex,
  initialLessonIndex
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
    enrol
  } = useProgress(course.slug);
  const [mIdx, setMIdx] = reactExports.useState(initialModuleIndex);
  const [lIdx, setLIdx] = reactExports.useState(initialLessonIndex);
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const [resumed, setResumed] = reactExports.useState(false);
  const [resumeDismissed, setResumeDismissed] = reactExports.useState(false);
  const [bookmarksOpen, setBookmarksOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (resumed) return;
    const lv = state.lastVisited;
    if (lv && (initialModuleIndex !== lv.moduleIndex || initialLessonIndex !== lv.lessonIndex)) {
      if (initialModuleIndex === 0 && initialLessonIndex === 0) {
        setMIdx(lv.moduleIndex);
        setLIdx(lv.lessonIndex);
      }
    }
    setResumed(true);
  }, [state.lastVisited]);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setLastVisited(mIdx, lIdx), 500);
    return () => clearTimeout(t);
  }, [mIdx, lIdx, setLastVisited]);
  const totalLessons = reactExports.useMemo(() => getCourseLessonCount(course), [course]);
  const completedCount = state.completed.length;
  const pct = Math.round(completedCount / Math.max(1, totalLessons) * 100);
  const module = course.syllabus[mIdx];
  const lessons = getLessons(module);
  const lesson = lessons[lIdx];
  const moduleId = `m${mIdx + 1}`;
  const lkey = lessonKey(moduleId, lesson.id);
  const isComplete = state.completed.includes(lkey);
  const isBookmarked = state.bookmarks.includes(lkey);
  const isLocked = !isFreePreview(module, lIdx) && !state.enrolledAt;
  const isLastLesson = mIdx === course.syllabus.length - 1 && lIdx === lessons.length - 1;
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.target?.tagName?.match(/INPUT|TEXTAREA/)) return;
      if (e.key === "j") goNext();
      else if (e.key === "k") goPrev();
      else if (e.key === "m") toggleComplete(lkey);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-app bg-[#0f172a] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-white/10 bg-[#0f172a]/95 px-3 backdrop-blur sm:px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSidebarOpen((v) => !v),
            className: "flex h-9 w-9 items-center justify-center rounded-md text-white lg:hidden",
            "aria-label": "Toggle modules",
            children: sidebarOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/courses/$slug",
            params: { slug: course.slug },
            className: "hidden text-xs font-semibold text-eyebrow hover:underline sm:block",
            children: [
              "← ",
              course.title
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm font-semibold text-white sm:hidden", children: course.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center justify-end gap-3", children: [
        stats.streak > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden items-center gap-1 rounded-full bg-orange-500/15 px-2.5 py-1 text-micro font-semibold text-orange-300 ring-1 ring-orange-400/30 sm:inline-flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3 w-3" }),
          " ",
          stats.streak,
          "-day streak"
        ] }),
        state.bookmarks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setBookmarksOpen(true),
            className: "hidden items-center gap-1 rounded-full bg-blue-500/15 px-2.5 py-1 text-micro font-semibold text-eyebrow-strong ring-1 ring-blue-400/30 transition hover:bg-blue-500/25 sm:inline-flex",
            "aria-label": "Open bookmarks",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-3 w-3" }),
              " ",
              state.bookmarks.length,
              " bookmarked"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-2 sm:flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-40 overflow-hidden rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-blue-400 transition-all", style: { width: `${pct}%` } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-micro text-eyebrow-strong", children: [
            pct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/courses/$slug",
            params: { slug: course.slug },
            className: "text-xs font-semibold text-eyebrow hover:text-white",
            children: "Exit"
          }
        )
      ] })
    ] }),
    isFreePreview(module, lIdx) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-blue-400/30 bg-blue-400/10 px-4 py-2 text-center text-micro font-semibold text-blue-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mr-1 inline h-3.5 w-3.5" }),
      "Free preview lesson, no card required to watch"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[280px_1fr_300px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "aside",
        {
          className: `${sidebarOpen ? "block" : "hidden"} border-r border-white/10 bg-[#0b1220] lg:block`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModuleList,
            {
              course,
              currentModule: mIdx,
              currentLesson: lIdx,
              completed: state.completed,
              bookmarks: state.bookmarks,
              onToggleBookmark: toggleBookmark,
              onPick: (m, l) => {
                setMIdx(m);
                setLIdx(l);
                setSidebarOpen(false);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-w-0 px-4 py-6 sm:px-8 sm:py-8", children: [
        !resumeDismissed && state.lastVisited && (state.lastVisited.moduleIndex !== mIdx || state.lastVisited.lessonIndex !== lIdx) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResumeBanner,
          {
            course,
            moduleIndex: state.lastVisited.moduleIndex,
            lessonIndex: state.lastVisited.lessonIndex,
            onResume: (m, l) => {
              setMIdx(m);
              setLIdx(l);
              setResumeDismissed(true);
            },
            onDismiss: () => setResumeDismissed(true)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow", children: [
          module.weeks,
          " · Module ",
          mIdx + 1,
          " · Lesson ",
          lIdx + 1,
          " of ",
          lessons.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-h3 font-bold text-white sm:text-h2", children: lesson.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            (() => {
              const Icon = TYPE_ICON[lesson.type];
              return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" });
            })(),
            lesson.type
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            lesson.durationMin,
            " min"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-eyebrow", children: [
            "Satisfies JD: ",
            module.jdSkill
          ] })
        ] }),
        isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(LockedCard, { course, onEnrol: enrol }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LessonViewport, { course, lesson, module }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: goPrev,
                className: "rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10",
                children: "← Previous"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: goNext,
                className: "rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10",
                children: "Next →"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => toggleBookmark(lkey),
                className: `rounded-full border-white/20 bg-white/5 ${isBookmarked ? "text-eyebrow" : "text-white"} hover:bg-white/10`,
                children: isBookmarked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "mr-1 h-4 w-4" }),
                  " Bookmarked"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "mr-1 h-4 w-4" }),
                  " Bookmark"
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => {
                toggleComplete(lkey);
                if (!isComplete) setTimeout(goNext, 250);
              },
              className: `rounded-full ${isComplete ? "bg-sky-500 text-white hover:bg-sky-600" : "bg-blue-500 text-white hover:bg-blue-600"}`,
              style: { boxShadow: "0 8px 24px -8px rgba(59,130,246,0.6)" },
              children: isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mr-2 h-4 w-4" }),
                " Completed"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Mark complete (M)" })
            }
          )
        ] }),
        lIdx === lessons.length - 1 && !isLocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
          AssignmentCard,
          {
            moduleKey: moduleId,
            module,
            existing: state.assignments[moduleId],
            onSubmit: (score) => submitAssignment(moduleId, { score })
          }
        ),
        isLastLesson && !isLocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CapstoneCard,
          {
            existing: state.capstone,
            onSubmit: (payload) => submitCapstone(payload)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden border-l border-white/10 bg-[#0b1220] p-5 lg:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NotesPanel, { value: state.notes[lkey] ?? "", onChange: (v) => setNote(lkey, v) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-white/10 bg-white/5 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow", children: "Stuck?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-300", children: "Mentors reply within an hour during cohort hours." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            WhatsAppLink,
            {
              source: "learn_player_stuck",
              program_slug: course.slug,
              message: `Hi, I'm stuck on "${lesson.title}" in ${course.title}`,
              trackProps: { course_slug: course.slug, lesson_id: lesson.id },
              className: "mt-3 inline-flex h-9 items-center justify-center rounded-full bg-sky-500 px-4 text-xs font-semibold text-white hover:bg-sky-600",
              children: "Ask on WhatsApp"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBar, { compact: true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookmarksDrawer,
      {
        open: bookmarksOpen,
        onOpenChange: setBookmarksOpen,
        course,
        bookmarks: state.bookmarks,
        onPick: (m, l) => {
          setMIdx(m);
          setLIdx(l);
          setBookmarksOpen(false);
        },
        onRemove: (k) => toggleBookmark(k)
      }
    )
  ] });
}
function ResumeBanner({
  course,
  moduleIndex,
  lessonIndex,
  onResume,
  onDismiss
}) {
  const m = course.syllabus[moduleIndex];
  if (!m) return null;
  const lessons = getLessons(m);
  const l = lessons[lessonIndex];
  if (!l) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-400/30 bg-blue-500/10 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow-strong", children: "Continue where you left off" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 truncate text-sm font-semibold text-white", children: [
        m.title,
        " · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: l.title })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => onResume(moduleIndex, lessonIndex),
          className: "inline-flex h-9 items-center rounded-full bg-blue-500 px-4 text-xs font-semibold text-white hover:bg-blue-600",
          children: [
            "Resume ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-3.5 w-3.5" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onDismiss,
          className: "inline-flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white",
          "aria-label": "Dismiss resume banner",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
function BookmarksDrawer({
  open,
  onOpenChange,
  course,
  bookmarks,
  onPick,
  onRemove
}) {
  const grouped = reactExports.useMemo(() => {
    const groups = [];
    course.syllabus.forEach((module, mIdx) => {
      const lessons = getLessons(module);
      const items = lessons.map((l, lIdx) => ({ l, lIdx, k: lessonKey(`m${mIdx + 1}`, l.id) })).filter((it) => bookmarks.includes(it.k));
      if (items.length) groups.push({ module, mIdx, items });
    });
    return groups;
  }, [course, bookmarks]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "right",
      className: "w-full border-l border-white/10 bg-[#0b1220] text-white sm:max-w-md",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-2 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4 text-eyebrow" }),
          " Your bookmarks"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-5 overflow-y-auto pr-1", children: [
          grouped.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "mx-auto h-6 w-6 text-eyebrow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-semibold text-white", children: "No bookmarks yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/60", children: "Tap the bookmark icon on any lesson to save it here." })
          ] }),
          grouped.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "px-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow", children: [
              "Module ",
              g.mIdx + 1,
              " · ",
              g.module.weeks
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 px-1 text-sm font-semibold text-white", children: g.module.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1.5", children: g.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => onPick(g.mIdx, it.lIdx),
                      className: "flex-1 truncate text-left text-xs text-white hover:text-eyebrow",
                      children: it.l.title
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => onRemove(it.k),
                      className: "inline-flex h-7 w-7 items-center justify-center rounded text-white/60 hover:bg-white/10 hover:text-white",
                      "aria-label": "Remove bookmark",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                    }
                  )
                ]
              },
              it.k
            )) })
          ] }, g.mIdx))
        ] })
      ]
    }
  ) });
}
function ModuleList({
  course,
  currentModule,
  currentLesson,
  completed,
  bookmarks,
  onToggleBookmark,
  onPick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "max-h-[calc(100vh-3.5rem)] overflow-y-auto p-3 text-sm", children: course.syllabus.map((m, mi) => {
    const lessons = getLessons(m);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "px-2 py-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow", children: [
        m.weeks,
        " · Module ",
        mi + 1
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 pb-1 text-meta font-semibold text-white", children: m.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: lessons.map((l, li) => {
        const k = lessonKey(`m${mi + 1}`, l.id);
        const done = completed.includes(k);
        const bm = bookmarks.includes(k);
        const active = mi === currentModule && li === currentLesson;
        const free = isFreePreview(m, li);
        const Icon = TYPE_ICON[l.type];
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${active ? "bg-blue-500/15 text-white ring-1 ring-blue-400/40" : "text-slate-300 hover:bg-white/5"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => onPick(mi, li),
                  className: "flex flex-1 items-center gap-2 text-left",
                  children: [
                    done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 flex-shrink-0 text-sky-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-3.5 w-3.5 flex-shrink-0 text-slate-500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 flex-shrink-0 text-slate-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate", children: l.title }),
                    free && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-blue-400/20 px-1.5 py-0.5 font-mono text-micro font-semibold uppercase tracking-wider text-eyebrow-strong", children: "Free" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    onToggleBookmark(k);
                  },
                  className: "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-slate-500 hover:text-eyebrow",
                  "aria-label": bm ? "Remove bookmark" : "Add bookmark",
                  children: bm ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-3.5 w-3.5 text-eyebrow" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-3.5 w-3.5" })
                }
              )
            ]
          }
        ) }, l.id);
      }) })
    ] }, m.weeks);
  }) });
}
function LessonViewport({
  course,
  lesson,
  module
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
    lesson.type === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full overflow-hidden rounded-2xl bg-[#0a0c10] ring-1 ring-white/10", children: lesson.videoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "iframe",
      {
        src: lesson.videoUrl,
        title: lesson.title,
        className: "h-full w-full",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full flex-col items-center justify-center gap-3 text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-12 w-12 text-blue-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Video uploads when cohort starts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro", children: "Lesson notes and resources are below." })
    ] }) }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "prose prose-invert mt-6 max-w-none rounded-2xl bg-white/5 p-6 text-sm text-slate-200 ring-1 ring-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow", children: "What you'll learn" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-base text-white", children: lesson.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 leading-relaxed", children: lesson.body ?? `In this lesson we cover ${lesson.title} as part of ${module.title}. You'll work through real examples drawn from ${course.jd.sampleEmployers.slice(0, 2).join(
        " & "
      )} job descriptions, then apply it to the module deliverable: ${module.deliverable}.` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-2 sm:grid-cols-2", children: module.topics.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-2 rounded-lg bg-white/5 p-3 ring-1 ring-white/5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-blue-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-200", children: t })
          ]
        },
        t
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-white/10 bg-white/5 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow", children: "Resources" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2", children: (lesson.resources && lesson.resources.length ? lesson.resources : [
        {
          label: `${lesson.title}, worksheet (PDF)`,
          kind: "pdf",
          href: "#"
        },
        {
          label: `${module.title}, sample dataset (CSV)`,
          kind: "csv",
          href: "#"
        }
      ]).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200 ring-1 ring-white/5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: r.href,
                className: "rounded-full bg-blue-500/20 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-wider text-eyebrow-strong hover:bg-blue-500/30",
                children: "Download"
              }
            )
          ]
        },
        r.label
      )) })
    ] })
  ] });
}
function LockedCard({ course, onEnrol }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-blue-400/30 bg-blue-500/5 p-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "mx-auto h-10 w-10 text-eyebrow" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-h4 font-bold text-white", children: "Lock your seat to unlock the rest" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-slate-300", children: "Lesson 1 of every module is free. Reserve your seat to unlock all lessons, assignments, mentor support and your certificate." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/apply",
          onClick: onEnrol,
          className: "inline-flex h-11 items-center rounded-full bg-blue-500 px-6 text-sm font-semibold text-white hover:bg-blue-600",
          style: { boxShadow: "0 8px 24px -8px rgba(59,130,246,0.6)" },
          children: "Start application"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onEnrol,
          className: "inline-flex h-11 items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-5 text-sm font-semibold text-blue-100 hover:bg-blue-500/15",
          children: "Try preview mode"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        WhatsAppLink,
        {
          source: "learn_preview_counsellor",
          program_slug: course.slug,
          message: `Hi, I'm previewing ${course.title} and want to enrol.`,
          trackProps: { course_slug: course.slug },
          className: "inline-flex h-11 items-center rounded-full border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10",
          children: "Talk to counsellor"
        }
      )
    ] })
  ] });
}
function CapstoneCard({
  existing,
  onSubmit
}) {
  const [link, setLink] = reactExports.useState(existing?.link ?? "");
  const [summary, setSummary] = reactExports.useState(existing?.summary ?? "");
  const submit = () => {
    if (!link.trim() || !summary.trim()) return;
    onSubmit({ link: link.trim(), summary: summary.trim() });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-blue-500/5 p-6 ring-1 ring-amber-400/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-amber-300" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-amber-200", children: "Capstone submission" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-h4 font-bold text-white", children: "Ship your final capstone, earn the performance LOR" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-300", children: "Submit a public link (Drive, GitHub, Notion, Loom) and a 3-line summary. Mentors review within 5 days. Score ≥85 unlocks your performance-based LOR + interview track." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        value: summary,
        onChange: (e) => setSummary(e.target.value),
        placeholder: "3-line summary: problem, what you built, outcome…",
        className: "mt-4 h-28 w-full resize-none rounded-xl border border-white/10 bg-[#0b1220] p-3 text-xs text-white outline-none ring-amber-300/30 placeholder:text-slate-500 focus:ring-2"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        value: link,
        onChange: (e) => setLink(e.target.value),
        placeholder: "https://link-to-your-capstone",
        className: "mt-3 h-11 w-full rounded-full border border-white/10 bg-[#0b1220] px-4 text-xs text-white outline-none ring-amber-300/30 placeholder:text-slate-500 focus:ring-2"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro text-slate-400", children: "You can resubmit any time before scoring." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: submit,
          disabled: !link.trim() || !summary.trim(),
          className: "rounded-full bg-amber-400 text-[#1A1300] hover:bg-amber-300",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-2 h-4 w-4" }),
            existing ? "Resubmit capstone" : "Submit capstone"
          ]
        }
      )
    ] }),
    existing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl bg-accent-glow/10 p-4 ring-1 ring-accent-glow/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow", children: "Submitted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-eyebrow-strong", children: [
        "On ",
        new Date(existing.submittedAt).toLocaleString(),
        ".",
        existing.score ? ` Mentor score: ${existing.score}/100.` : " Awaiting mentor review."
      ] })
    ] })
  ] });
}
function NotesPanel({ value, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "h-4 w-4 text-eyebrow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow", children: "Your notes" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder: "Type notes, saved on this device",
        className: "mt-3 h-44 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none ring-blue-400/30 placeholder:text-slate-500 focus:ring-2"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-micro text-slate-500", children: "Saved locally · syncs to your account when cohort starts." })
  ] });
}
function AssignmentCard({
  moduleKey,
  module,
  existing,
  onSubmit
}) {
  const [text, setText] = reactExports.useState("");
  const [link, setLink] = reactExports.useState("");
  const handleSubmit = () => {
    const corpus = (text + " " + link).toLowerCase();
    const keywords = [
      ...module.jdSkill.toLowerCase().split(/\W+/),
      ...module.topics.flatMap((t) => t.toLowerCase().split(/\W+/))
    ].filter((w) => w.length > 3);
    const hits = new Set(keywords.filter((k) => corpus.includes(k))).size;
    const lengthBonus = Math.min(20, Math.floor(text.length / 40));
    const linkBonus = link.startsWith("http") ? 15 : 0;
    const score = Math.max(0, Math.min(100, hits * 6 + lengthBonus + linkBonus + 35));
    onSubmit(score);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-blue-400/30 bg-white/5 p-6 ring-1 ring-white/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow", children: [
      "Module assignment · Module ",
      moduleKey.replace("m", "")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-h4 font-bold text-white", children: module.deliverable }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-300", children: "Submit a short summary plus a link to your work (Drive, GitHub, Notion, etc). The auto-evaluator scores keyword coverage and rubric fit. Mentor review follows within 48h." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        value: text,
        onChange: (e) => setText(e.target.value),
        placeholder: "Brief description of what you built and why…",
        className: "mt-4 h-28 w-full resize-none rounded-xl border border-white/10 bg-[#0b1220] p-3 text-xs text-white outline-none ring-blue-400/30 placeholder:text-slate-500 focus:ring-2"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        value: link,
        onChange: (e) => setLink(e.target.value),
        placeholder: "https://link-to-your-deliverable",
        className: "mt-3 h-11 w-full rounded-full border border-white/10 bg-[#0b1220] px-4 text-xs text-white outline-none ring-blue-400/30 placeholder:text-slate-500 focus:ring-2"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-micro text-slate-400", children: "Rubric: JD-skill keywords · clarity · evidence link · depth." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleSubmit,
          disabled: !text.trim() && !link.trim(),
          className: "rounded-full bg-blue-500 text-white hover:bg-blue-600",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-2 h-4 w-4" }),
            "Submit for evaluation"
          ]
        }
      )
    ] }),
    existing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl bg-accent-glow/10 p-4 ring-1 ring-accent-glow/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow", children: "Auto-evaluator score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-h2 font-bold text-white", children: existing.score }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-eyebrow-strong", children: "/ 100" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-micro text-eyebrow-strong", children: [
        "Submitted ",
        new Date(existing.submittedAt).toLocaleString(),
        " · feeds into your performance LOR eligibility (≥85% needed)."
      ] })
    ] })
  ] });
}
function PlayerPage() {
  const course = Route$1o.useLoaderData();
  const {
    m,
    l
  } = Route$1o.useSearch();
  const mIdx = Math.min(Math.max(0, m - 1), course.syllabus.length - 1);
  const lIdx = Math.max(0, l - 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerLayout, { course, initialModuleIndex: mIdx, initialLessonIndex: lIdx });
}
export {
  PlayerPage as component
};
