import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
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
function TrackErrorComponent({
  error
}) {
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-dvh bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-h3 font-semibold text-black", children: "Couldn’t load this track." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-body-sm leading-relaxed text-black/70", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => router.invalidate(), className: "btn btn-primary btn-md mt-5", children: "Try again" })
  ] }) });
}
export {
  TrackErrorComponent as errorComponent
};
