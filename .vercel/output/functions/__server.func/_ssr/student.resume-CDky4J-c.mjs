import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import { a4 as LoaderCircle } from "../_libs/lucide-react.mjs";
import { p as objectType, B as anyType } from "../_libs/zod.mjs";
import "../_libs/tanstack__react-router.mjs";
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
const generateAtsResume = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  result: anyType()
}).parse(data)).handler(createSsrRpc("02528c9d410bb812cc9c7a6e5939df814bbabe9d941e29590f0724e077391dbc"));
function StudentResume() {
  const atsResumeFn = useServerFn(generateAtsResume);
  const [resume, setResume] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadResume() {
      try {
        const savedResult = sessionStorage.getItem("ce_result");
        if (savedResult) {
          const result = JSON.parse(savedResult);
          const res = await atsResumeFn({
            data: {
              result
            }
          });
          if (res.ok) {
            setResume(res.resume);
          }
        }
      } catch (e) {
        console.error("Failed to load resume", e);
      } finally {
        setLoading(false);
      }
    }
    loadResume();
  }, [atsResumeFn]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-screen items-center justify-center bg-zinc-950 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 motion-safe:animate-spin text-primary" }) });
  }
  if (!resume) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-screen items-center justify-center tone-dark bg-surface-dark text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No Career Engine result found. Please complete the assessment first." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen tone-dark bg-surface-dark p-8 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl space-y-8 pt-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display font-bold tracking-tight text-white", children: "AI Resume Builder" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-white/60", children: "Your personalized ATS-optimized profile." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel-deep rounded-2xl p-8 shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-white/50", children: "Goal Gradient" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-2xl font-bold font-display text-white", children: "ATS Compatibility Score" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-24 w-24 items-center justify-center rounded-full bg-white/5 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 h-full w-full -rotate-90 transform", viewBox: "0 0 100 100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "46", className: "fill-none stroke-white/10 stroke-[8]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "46", className: "fill-none stroke-sky-400 stroke-[8] transition-all duration-1000 ease-out", strokeDasharray: "289", strokeDashoffset: 289 - 289 * resume.atsScore / 100, strokeLinecap: "round" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-2xl font-bold text-white", children: [
            resume.atsScore,
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-sky-500/10 px-5 py-4 border border-sky-400/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-sky-100", children: [
          "You are ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-sky-400 font-bold", children: [
            100 - resume.atsScore,
            "%"
          ] }),
          " ",
          "away from a guaranteed interview shortlist."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-full bg-sky-400 px-5 py-2 text-xs font-bold text-slate-950 transition hover:bg-sky-300 hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.4)]", children: "Close the Gap" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel-deep rounded-2xl p-6 shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-xl font-display font-semibold", children: "AI Summary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 leading-relaxed", children: resume.summary })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-lg font-semibold text-emerald-400", children: "Strengths to Highlight" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-white/80", children: resume.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" }),
          skill
        ] }, skill)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-rose-500/20 bg-rose-500/5 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-lg font-semibold text-rose-400", children: "Gaps to Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-white/80", children: resume.gapsToAddress.length > 0 ? resume.gapsToAddress.map((gap) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: gap })
        ] }, gap)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50", children: "No significant gaps detected." }) })
      ] })
    ] })
  ] }) });
}
export {
  StudentResume as component
};
