import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { g as getLearningPath } from "./learningPath.functions-Cy_8HX9g.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import { aZ as TrendingUp, b8 as CirclePlay, ad as Eye, T as Target, a4 as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const getWeeklyGoal = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("582ede857c83c008849d2d2f0e10fd648866b51c77682d5166f9247ccdf36d97"));
const toggleWeeklyGoal = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("111312abf8406356bcf313d16e7ef40e84bbcd8341731c7d2dde466359f519ff"));
const getRecruiterViews = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("8c863bc08a58f4ab37d4b2afefd49bf54fcdd4cc15b588829bdfd89bcef6fe8b"));
const EMPLOYABILITY_BAND = (score) => score < 55 ? "Emerging" : score < 70 ? "Ready" : score < 85 ? "Strong" : "Elite";
function DashboardPage() {
  const fetchPath = useServerFn(getLearningPath);
  const fetchGoal = useServerFn(getWeeklyGoal);
  const fetchViews = useServerFn(getRecruiterViews);
  const mutateGoal = useServerFn(toggleWeeklyGoal);
  const queryClient = useQueryClient();
  const pathQ = useQuery({
    queryKey: ["learning-path"],
    queryFn: () => fetchPath()
  });
  const goalQ = useQuery({
    queryKey: ["weekly-goal"],
    queryFn: () => fetchGoal()
  });
  const viewsQ = useQuery({
    queryKey: ["recruiter-views"],
    queryFn: () => fetchViews()
  });
  const goalToggle = useMutation({
    mutationFn: (done) => mutateGoal({
      data: {
        done
      }
    }),
    onMutate: async (done) => {
      await queryClient.cancelQueries({
        queryKey: ["weekly-goal"]
      });
      const prev = queryClient.getQueryData(["weekly-goal"]);
      if (prev) queryClient.setQueryData(["weekly-goal"], {
        ...prev,
        done
      });
      return {
        prev
      };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["weekly-goal"], ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({
      queryKey: ["weekly-goal"]
    })
  });
  const projected = pathQ.data?.projected ?? 62;
  const currentScore = pathQ.data?.currentScore ?? 62;
  const delta = Math.max(0, projected - currentScore);
  const nextModule = pathQ.data?.modules.find((m) => m.status === "current") ?? null;
  const goalDone = goalQ.data?.done ?? false;
  const goalPct = goalDone ? 100 : 0;
  const week = viewsQ.data?.week ?? 0;
  const total = viewsQ.data?.total ?? 0;
  const trend = viewsQ.data?.trendVsLastWeek ?? 0;
  const actions = viewsQ.data?.actions ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Post-assessment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 text-2xl font-semibold md:text-3xl", children: "Your dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Four numbers that matter this week. Nothing else." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Widget, { icon: TrendingUp, label: "Employability Score", hint: EMPLOYABILITY_BAND(currentScore), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-semibold tabular-nums", children: currentScore }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/ 100" }),
          delta > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs font-medium text-primary", children: [
            "+",
            delta,
            " projected"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: currentScore })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Widget, { icon: CirclePlay, label: "Next Module", hint: nextModule ? `${nextModule.pillar} · +${nextModule.lift} pts` : void 0, children: pathQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetSkeleton, {}) : nextModule ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium leading-snug", children: nextModule.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "~",
            nextModule.minutes,
            " min"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/learning-path", hash: nextModule.slug, className: "inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90", children: "Resume →" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "🎉 You've completed every module. Retake ASSAY to unlock the next path." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Widget, { icon: Eye, label: "Recruiter Views", hint: "Last 7 days", children: viewsQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-semibold tabular-nums", children: week }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            "· ",
            total,
            " all-time"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: week === 0 ? "No recruiter views yet. Do these three things first:" : trend === 0 ? "Same as last week" : trend > 0 ? `+${trend} vs last week` : `${trend} vs last week` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5 text-xs text-muted-foreground", children: actions.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" }),
          a
        ] }, a)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Widget, { icon: Target, label: "Weekly Goal", hint: "This week", children: goalQ.isLoading || !goalQ.data ? /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "mt-1 h-4 w-4 rounded border-border accent-primary", checked: goalDone, disabled: goalToggle.isPending, onChange: (e) => goalToggle.mutate(e.target.checked) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm leading-snug ${goalDone ? "text-muted-foreground line-through" : "text-foreground"}`, children: goalQ.data.task })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: goalDone ? "Nice — logged for this week." : "Auto-generated from your current module." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
            goalPct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: goalPct })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-center text-xs text-muted-foreground", children: [
      "Want the full cohort view?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "text-primary hover:underline", children: "Open your cohort workspace →" })
    ] })
  ] }) });
}
function Widget({
  icon: Icon,
  label,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: label })
      ] }),
      hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.14em] text-muted-foreground", children: hint })
    ] }),
    children
  ] });
}
function WidgetSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Loading…" })
  ] });
}
function ProgressBar({
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary transition-[width] duration-500", style: {
    width: `${Math.max(0, Math.min(100, value))}%`
  } }) });
}
export {
  DashboardPage as component
};
