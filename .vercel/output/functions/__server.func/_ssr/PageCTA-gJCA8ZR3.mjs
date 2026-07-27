import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { q as ArrowRight } from "../_libs/lucide-react.mjs";
function PageCTA({
  eyebrow = "Next step",
  title,
  subtitle,
  primary,
  secondary
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-5xl px-4 pb-20 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tone-dark relative overflow-hidden rounded-3xl border border-slate-200/15 bg-[#0F1B3A] bg-gradient-to-br from-[#0F1B3A] to-[#111A2E] p-8 text-center sm:p-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "pointer-events-none absolute inset-0",
        style: { background: "var(--gradient-glow)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative font-mono text-micro font-semibold uppercase tracking-[0.28em] text-[#9EC4FF]", children: eyebrow }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "h-section mt-3 text-slate-50", children: title }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mx-auto mt-3 max-w-xl text-body-sm leading-relaxed text-slate-100/85", children: subtitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-6 flex flex-wrap justify-center gap-3", children: [
      primary.external ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: primary.to,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]",
          children: [
            primary.label,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: primary.to,
          search: primary.search,
          className: "inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]",
          children: [
            primary.label,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
          ]
        }
      ),
      secondary && (secondary.external ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: secondary.to,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex h-12 items-center rounded-md border border-slate-200/40 bg-slate-50/10 px-6 text-sm font-bold text-slate-50 transition-colors hover:border-slate-200/70 hover:bg-slate-50/20",
          children: secondary.label
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: secondary.to,
          search: secondary.search,
          className: "inline-flex h-12 items-center rounded-md border border-slate-200/40 bg-slate-50/10 px-6 text-sm font-bold text-slate-50 transition-colors hover:border-slate-200/70 hover:bg-slate-50/20",
          children: secondary.label
        }
      ))
    ] })
  ] }) });
}
export {
  PageCTA as P
};
