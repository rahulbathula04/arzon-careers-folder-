import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { g as getLearningPath, m as markModuleComplete } from "./learningPath.functions-Cy_8HX9g.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import { a4 as LoaderCircle, q as ArrowRight, I as CircleCheck, bb as Circle, aZ as TrendingUp, o as TriangleAlert } from "../_libs/lucide-react.mjs";
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
import "./createSsrRpc-BV3sOdh8.mjs";
import "./auth-middleware-CGVBerDj.mjs";
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
const PILLAR_STYLE = {
  Domain: "bg-primary/10 text-primary",
  Process: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Tool: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Workplace: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
};
function LearningPathPage() {
  const fetchPath = useServerFn(getLearningPath);
  const mutateComplete = useServerFn(markModuleComplete);
  const queryClient = useQueryClient();
  const pathQuery = useQuery({
    queryKey: ["learning-path"],
    queryFn: () => fetchPath()
  });
  const completeMutation = useMutation({
    mutationFn: (moduleId) => mutateComplete({
      data: {
        moduleId
      }
    }),
    onMutate: async (moduleId) => {
      await queryClient.cancelQueries({
        queryKey: ["learning-path"]
      });
      const prev = queryClient.getQueryData(["learning-path"]);
      if (prev) {
        const modules2 = prev.modules.map((m) => m.id === moduleId ? {
          ...m,
          status: "done"
        } : m);
        const firstNonDone = modules2.findIndex((m) => m.status !== "done");
        const rebalanced = modules2.map((m, idx) => ({
          ...m,
          status: m.status === "done" ? m.status : idx === firstNonDone ? "current" : "locked"
        }));
        const projected2 = prev.currentScore + rebalanced.reduce((s, m) => m.status === "done" ? s : s + m.lift, 0);
        queryClient.setQueryData(["learning-path"], {
          ...prev,
          modules: rebalanced,
          projected: projected2
        });
      }
      return {
        prev
      };
    },
    onError: (_err, _v, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["learning-path"], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["learning-path"]
      });
      queryClient.invalidateQueries({
        queryKey: ["weekly-goal"]
      });
    }
  });
  reactExports.useEffect(() => {
    if (!pathQuery.data) return;
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, [pathQuery.data]);
  if (pathQuery.isLoading || !pathQuery.data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto flex max-w-4xl items-center justify-center px-4 py-24 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 motion-safe:animate-spin" }),
      " Loading your path…"
    ] }) });
  }
  const {
    modules,
    currentScore,
    targetScore,
    projected
  } = pathQuery.data;
  const remainingGap = Math.max(0, targetScore - projected);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-4xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Prescriptive plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 text-2xl font-semibold md:text-3xl", children: "Your learning path" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Each module is picked to close a specific readiness gap. Complete them in order and your projected employability score is on the right." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8 rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.14em] text-muted-foreground", children: "Employability score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-semibold tabular-nums", children: currentScore }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-semibold tabular-nums text-primary", children: projected }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "/ target ",
              targetScore
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.14em] text-muted-foreground", children: "If you finish this path" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm", children: remainingGap === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-primary", children: "On track to hit target" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "Add ~",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
              remainingGap,
              " pts"
            ] }),
            " ",
            "after this path"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectionBar, { current: currentScore, projected, target: targetScore })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "relative space-y-4 border-l border-border pl-6", children: modules.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { module: m, index: idx + 1, onComplete: () => completeMutation.mutate(m.id), busy: completeMutation.isPending && completeMutation.variables === m.id }, m.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-center text-xs text-muted-foreground", children: [
      "Path updates every time you complete a module or retake ASSAY.",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hub", className: "text-primary hover:underline", children: "Back to your hub →" })
    ] })
  ] }) });
}
function ModuleCard({
  module: m,
  index,
  onComplete,
  busy
}) {
  const isDone = m.status === "done";
  const isCurrent = m.status === "current";
  const isLocked = m.status === "locked";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { id: m.slug, className: "relative scroll-mt-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute -left-[33px] top-4 flex h-6 w-6 items-center justify-center rounded-full border ${isDone ? "border-primary bg-primary text-primary-foreground" : isCurrent ? "border-primary bg-background text-primary" : "border-border bg-background text-muted-foreground"}`, "aria-hidden": true, children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-3 w-3 fill-current" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: `rounded-2xl border p-5 transition-colors ${isCurrent ? "border-primary/50 bg-card shadow-sm" : isDone ? "border-border bg-card/60" : "border-border bg-card"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-[0.14em] text-muted-foreground", children: [
              "Module ",
              index
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] font-medium ${PILLAR_STYLE[m.pillar]}`, children: m.pillar }),
            isDone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-600 dark:text-sky-400", children: "Completed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1.5 text-base font-semibold leading-snug", children: m.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
            "~",
            m.minutes,
            " min"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `shrink-0 rounded-xl px-3 py-2 text-right ${isDone ? "bg-muted/50" : "bg-primary/10"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: `h-3.5 w-3.5 ${isDone ? "text-muted-foreground" : "text-primary"}`, "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-lg font-semibold tabular-nums ${isDone ? "text-muted-foreground line-through" : "text-primary"}`, children: [
              "+",
              m.lift
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.14em] text-muted-foreground", children: "points" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border border-dashed border-border bg-background/40 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5 text-amber-500", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground", children: "Closes these readiness gaps" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 flex flex-wrap gap-1.5", children: m.gaps.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground", children: g }, g)) })
      ] }),
      !isDone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap justify-end gap-2", children: [
        isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: m.deepLink, className: "inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted", children: [
          "Open module ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onComplete, disabled: isLocked || busy, className: `inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-opacity ${isCurrent ? "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-60" : "border border-border text-muted-foreground opacity-60"}`, children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 motion-safe:animate-spin", "aria-hidden": true }),
          " Saving…"
        ] }) : isCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5", "aria-hidden": true }),
          " Mark complete"
        ] }) : "Locked" })
      ] })
    ] })
  ] });
}
function ProjectionBar({
  current,
  projected,
  target
}) {
  const max = Math.max(target, projected, 100);
  const currentPct = current / max * 100;
  const projectedPct = projected / max * 100;
  const targetPct = target / max * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-4 h-2 w-full rounded-full bg-muted", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 rounded-full bg-primary/40", style: {
      width: `${projectedPct}%`
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 rounded-full bg-primary", style: {
      width: `${currentPct}%`
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 h-3 w-0.5 -translate-y-1/2 bg-foreground", style: {
      left: `${targetPct}%`
    }, "aria-label": "target" })
  ] });
}
export {
  LearningPathPage as component
};
