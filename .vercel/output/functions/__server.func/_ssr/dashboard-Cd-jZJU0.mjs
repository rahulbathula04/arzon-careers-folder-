import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { u as useProgress, g as getCourseLessonCount } from "./lessons-BQw0N9wh.mjs";
import { aW as COURSES, aX as COURSES_BY_SLUG, aY as COHORT_BY_ID, a0 as NEXT_COHORT, w as waLink, B as Button } from "./router-CvdLERTV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { aw as Flame, ax as Bookmark, I as CircleCheck, p as BookOpen, q as ArrowRight, ay as Calendar, H as Award, s as MessageCircle, T as Target, az as Zap, aA as Trophy } from "../_libs/lucide-react.mjs";
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
import "./analytics-Do62eWB1.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
const KEY = "arzon_application_v1";
const EMPTY = {
  step: "profile",
  profile: {},
  depositPaid: false
};
function read() {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    return EMPTY;
  }
}
function write(state) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
  }
}
function makeId() {
  return `AG-${Date.now().toString(36).toUpperCase()}`;
}
function useApplication(seed) {
  const [state, setState] = reactExports.useState(EMPTY);
  reactExports.useEffect(() => {
    const stored = read();
    let next = stored;
    setState(next);
  }, [seed?.programme, seed?.cohort]);
  const persist = reactExports.useCallback((updater) => {
    setState((prev) => {
      const next = updater(prev);
      write(next);
      return next;
    });
  }, []);
  const updateProfile = reactExports.useCallback(
    (patch) => {
      persist((prev) => ({
        ...prev,
        applicationId: prev.applicationId ?? makeId(),
        createdAt: prev.createdAt ?? (/* @__PURE__ */ new Date()).toISOString(),
        profile: { ...prev.profile, ...patch }
      }));
    },
    [persist]
  );
  const setProgramme = reactExports.useCallback(
    (programmeSlug) => persist((p) => ({ ...p, programmeSlug })),
    [persist]
  );
  const setCohort = reactExports.useCallback(
    (cohortId) => persist((p) => ({ ...p, cohortId })),
    [persist]
  );
  const setStep = reactExports.useCallback((step) => persist((p) => ({ ...p, step })), [persist]);
  const markDepositPaid = reactExports.useCallback(
    () => persist((p) => ({
      ...p,
      depositPaid: true,
      depositAt: (/* @__PURE__ */ new Date()).toISOString(),
      step: "success"
    })),
    [persist]
  );
  const reset = reactExports.useCallback(() => persist(() => EMPTY), [persist]);
  const completion = reactExports.useMemo(() => {
    const p = state.profile;
    const profileDone = !!(p.fullName && p.email && p.phone);
    return {
      profileDone,
      programmeDone: !!state.programmeSlug && !!state.cohortId,
      depositDone: state.depositPaid
    };
  }, [state]);
  return {
    state,
    completion,
    updateProfile,
    setProgramme,
    setCohort,
    setStep,
    markDepositPaid,
    reset
  };
}
const MOCK_LEADERBOARD = [
  { rank: 1, name: "Priya Sharma", xp: 2850, streak: 14 },
  { rank: 2, name: "Rahul Verma", xp: 2600, streak: 11 },
  { rank: 3, name: "Ananya Patel (You)", xp: 2420, streak: 6, isUser: true },
  { rank: 4, name: "Vikram Reddy", xp: 2150, streak: 8 },
  { rank: 5, name: "Sneha Nair", xp: 1980, streak: 5 }
];
function LearningStreakCard() {
  const [streakDays, setStreakDays] = reactExports.useState(6);
  const [todayMinutes, setTodayMinutes] = reactExports.useState(12);
  const targetMinutes = 15;
  const xpPoints = 2420;
  const isTodayComplete = todayMinutes >= targetMinutes;
  const progressPct = Math.min(100, Math.round(todayMinutes / targetMinutes * 100));
  const claimDailyXP = () => {
    if (!isTodayComplete) {
      setTodayMinutes(15);
      setStreakDays((s) => s + 1);
      toast.success("🔥 Daily Learning Target Reached! +50 XP Earned!");
    } else {
      toast.info("You've already claimed today's streak XP! Keep learning for bonus points.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 p-6 sm:p-7 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between space-y-4 lg:border-r lg:border-slate-800 lg:pr-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5 fill-amber-400" }),
          " Active Learning Streak"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-grotesk text-5xl font-black text-white tracking-tight", children: streakDays }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-grotesk text-xl font-bold text-amber-400", children: "Days Active 🔥" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-slate-400 mt-1", children: "Top 8% of your cohort! Complete 3 more minutes today to lock your 7-day streak bonus." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-slate-950/60 border border-slate-800 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-semibold mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-300 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-3.5 w-3.5 text-amber-400" }),
            " Daily Target (15 mins)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400 font-mono", children: [
            todayMinutes,
            " / 15m"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-full rounded-full bg-slate-800 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500",
            style: { width: `${progressPct}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: claimDailyXP,
            className: `mt-3 w-full font-bold text-xs rounded-xl ${isTodayComplete ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30" : "bg-amber-500 hover:bg-amber-400 text-slate-950"}`,
            children: isTodayComplete ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mr-1.5 h-3.5 w-3.5" }),
              " Streak Locked (+50 XP)"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "mr-1.5 h-3.5 w-3.5 fill-slate-950" }),
              " Complete 3 Mins & Claim XP"
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between space-y-4 lg:border-r lg:border-slate-800 lg:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5 text-amber-400" }),
          " Total XP Earned"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-grotesk text-3xl font-bold text-white mt-1", children: [
          xpPoints.toLocaleString(),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-400 font-mono", children: "XP" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro text-slate-500", children: "Unlocks Arzon Alumni Honor Roll at 3,000 XP" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-slate-300", children: "Recent Milestones Unlocked" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-slate-800 bg-slate-950/40 p-2.5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-xs", children: "🏆" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro font-bold text-white", children: "GCP Master" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500", children: "Module 2 Cleared" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-slate-800 bg-slate-950/40 p-2.5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs", children: "🔥" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro font-bold text-white", children: "5-Day Streak" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500", children: "Consistent Learner" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between space-y-3 lg:pl-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-white flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4 text-amber-400" }),
          " Cohort Leaderboard"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-micro text-amber-400 font-semibold", children: "March Batch" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: MOCK_LEADERBOARD.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors ${user.isUser ? "bg-amber-500/15 border border-amber-500/30 text-white font-bold" : "bg-slate-950/40 text-slate-300"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `font-mono text-micro font-bold w-4 ${user.rank === 1 ? "text-amber-400" : user.rank === 2 ? "text-slate-300" : "text-amber-600"}`,
                  children: [
                    "#",
                    user.rank
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-micro", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400/90 font-mono", children: [
                user.xp,
                " XP"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500 font-mono", children: [
                "🔥 ",
                user.streak,
                "d"
              ] })
            ] })
          ]
        },
        user.rank
      )) })
    ] })
  ] }) });
}
function Dashboard() {
  const {
    state
  } = useApplication();
  const slug = state.programmeSlug ?? COURSES[0].slug;
  const course = COURSES_BY_SLUG[slug];
  const cohort = state.cohortId ? COHORT_BY_ID[state.cohortId] : NEXT_COHORT;
  const progress = useProgress(course.slug);
  const totalLessons = getCourseLessonCount(course);
  const pct = Math.round(progress.stats.completedCount / Math.max(1, totalLessons) * 100);
  const lv = progress.state.lastVisited;
  const resumeM = lv?.moduleIndex !== void 0 ? lv.moduleIndex + 1 : 1;
  const resumeL = lv?.lessonIndex !== void 0 ? lv.lessonIndex + 1 : 1;
  const isApplicant = !!state.applicationId;
  const isPaid = state.depositPaid;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "tone-dark min-h-app bg-[#0A0F1E] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: isPaid ? "Welcome back" : isApplicant ? "Application in progress" : "Preview mode" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-3", children: state.profile.fullName ? `Hi ${state.profile.fullName.split(" ")[0]} 👋` : "Your learning home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-sm text-white/65", children: isPaid ? `Your seat in ${cohort.label} is locked. Cohort starts ${cohort.startsLabel}.` : isApplicant ? "Finish your application to lock your seat. You can keep previewing lessons in the meantime." : "You're previewing as a guest. Start your application any time, no payment required." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LearningStreakCard, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.5fr_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/10 bg-gradient-to-br from-[#101A33] to-[#0B1224] p-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Your programme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "h-section mt-2", children: course.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/80", children: course.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-white/65", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Course progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                progress.stats.completedCount,
                "/",
                totalLessons,
                " lessons · ",
                pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-2 overflow-hidden rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary", style: {
              width: `${pct}%`
            } }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Flame, label: "Day streak", value: `${progress.stats.streak}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Bookmark, label: "Bookmarks", value: `${progress.stats.bookmarksCount}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: CircleCheck, label: "Assignments", value: `${progress.stats.assignmentsCount}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/learn/$slug", params: {
              slug: course.slug
            }, search: {
              m: resumeM,
              l: resumeL
            }, className: "inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", style: {
              boxShadow: "var(--shadow-glow)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "mr-2 h-4 w-4" }),
              progress.stats.completedCount > 0 ? "Resume learning" : "Start learning",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses/$slug", params: {
              slug: course.slug
            }, className: "inline-flex h-11 items-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10", children: "See programme overview" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.03] p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Cohort" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-h4 text-white", children: cohort.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 inline-flex items-center gap-1.5 text-xs text-white/65", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
              " Starts ",
              cohort.startsLabel
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-2 text-xs text-white/70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Milestone, { label: "Application", done: !!state.applicationId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Milestone, { label: "Seat reserved", done: isPaid }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Milestone, { label: "Welcome call", done: false, hint: "within 24h of payment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Milestone, { label: "Cohort starts", done: false, hint: cohort.startsLabel })
            ] })
          ] }),
          !isPaid && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/apply", className: "block rounded-2xl border border-primary/40 bg-primary/10 p-5 transition hover:bg-primary/15", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-white", children: "Finish your application" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-white/65", children: [
              "Refundable ₹999 deposit locks your seat in ",
              cohort.label,
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-glow", children: [
              "Continue application ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/certificates/sample/$slug", params: {
            slug: course.slug
          }, className: "block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-semibold text-white", children: "See your certificate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/65", children: "Type your name and preview the verifiable certificate you'll earn." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink(`Hi Arzon, quick question about my ${course.title} cohort.`), target: "_blank", rel: "noopener noreferrer", className: "block rounded-2xl border border-accent-glow/20 bg-accent-glow/5 p-5 transition hover:bg-accent-glow/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5 text-eyebrow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-semibold text-white", children: "Talk to your counsellor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/65", children: "Replies on WhatsApp within an hour during cohort hours." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Stat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-white/5 p-3 ring-1 ring-white/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary-glow" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 font-mono text-h4 font-bold text-white", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro uppercase tracking-wider text-white/60", children: label })
  ] });
}
function Milestone({
  label,
  done,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-4 w-4 items-center justify-center rounded-full ${done ? "bg-sky-500" : "bg-white/10"}`, children: done && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: done ? "text-white" : "text-white/65", children: label })
    ] }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-micro text-white/60", children: hint })
  ] });
}
export {
  Dashboard as component
};
