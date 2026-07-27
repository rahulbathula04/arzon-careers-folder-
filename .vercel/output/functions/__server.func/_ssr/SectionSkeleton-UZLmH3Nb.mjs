import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-CvdLERTV.mjs";
import { S as Section } from "./Section-DK9GN_Ac.mjs";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-skeleton": true,
      className: cn("motion-safe:animate-pulse rounded-md bg-primary/10", className),
      ...props
    }
  );
}
function minHStyle(minH) {
  if (minH == null) return void 0;
  if (typeof minH === "number") return { minHeight: minH };
  const { base, sm, md, lg } = minH;
  return {
    ["--mh-base"]: `${base}px`,
    ["--mh-sm"]: `${sm ?? base}px`,
    ["--mh-md"]: `${md ?? sm ?? base}px`,
    ["--mh-lg"]: `${lg ?? md ?? sm ?? base}px`
  };
}
const RESPONSIVE_MIN_H_CLASS = "min-h-[var(--mh-base)] sm:min-h-[var(--mh-sm)] md:min-h-[var(--mh-md)] lg:min-h-[var(--mh-lg)]";
function SectionSkeleton({ variant = "default", minH }) {
  const isResponsive = !!minH && typeof minH === "object";
  const style = minHStyle(minH);
  const inner = (() => {
    switch (variant) {
      case "strip":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-40 rounded-full" })
        ] });
      case "cta":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[28px] border border-slate-200/10 bg-white/[0.03] px-6 py-12 sm:px-12 sm:py-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-4 h-9 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-3 h-4 w-full max-w-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-2 h-4 w-3/4 max-w-md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-col gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full sm:w-56 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full sm:w-56 rounded-full" })
          ] })
        ] });
      case "faq":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mx-auto h-8 w-64" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mx-auto mt-3 h-4 w-80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-3", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, i)) })
        ] });
      case "form":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200/10 bg-white/[0.03] p-6 sm:p-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-56" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-2 h-4 w-72" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-6 h-12 w-full sm:w-48 rounded-full" })
        ] });
      case "grid":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mx-auto h-8 w-72" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-full rounded-2xl" }, i)) })
        ] });
      case "media":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mx-auto h-7 w-56" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-6 opacity-80", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-32 rounded-md" }, i)) })
        ] });
      case "compare":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 w-full rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 w-full rounded-2xl" })
        ] });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-64" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-3 h-4 w-full max-w-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-2 h-4 w-5/6 max-w-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" })
          ] })
        ] });
    }
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Section,
    {
      size: "md",
      "aria-hidden": true,
      className: isResponsive ? RESPONSIVE_MIN_H_CLASS : void 0,
      style,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-70", children: inner })
    }
  );
}
export {
  SectionSkeleton as S
};
