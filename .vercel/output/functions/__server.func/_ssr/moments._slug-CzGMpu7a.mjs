import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { aY as ImageOff, a6 as ArrowLeft } from "../_libs/lucide-react.mjs";
function FallbackState({
  message
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tone-dark min-h-screen bg-[oklch(0.14_0.04_245)] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-5 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "mx-auto mb-3 h-10 w-10 text-white/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display", children: "Arzon moment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-white/70", children: message }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/moments", className: "mt-6 inline-flex items-center gap-2 text-sm text-sky-300 underline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to all moments"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  FallbackState as F
};
