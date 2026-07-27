import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
function TrackNotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-dvh bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 py-20 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-meta font-semibold uppercase tracking-[0.18em] text-black/60", children: "404 · track not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-h2 font-semibold text-black", children: "This track isn’t in the pipeline." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-body-sm leading-relaxed text-black/70", children: "It may have been renamed or it hasn’t been requested yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/build", className: "btn btn-secondary btn-md", children: "All tracks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/build/request", className: "btn btn-primary btn-md", children: "Request a track" })
    ] })
  ] }) });
}
export {
  TrackNotFound as notFoundComponent
};
