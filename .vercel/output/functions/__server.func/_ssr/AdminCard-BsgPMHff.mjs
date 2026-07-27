import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-CvdLERTV.mjs";
function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 border-b border-border pb-5 sm:mb-8 sm:gap-4 sm:pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      eyebrow ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1.5 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary", children: eyebrow }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-h3 font-bold leading-tight tracking-tight text-foreground sm:text-h2 lg:text-h1", children: title }),
      description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base", children: description }) : null
    ] }),
    actions ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-start-1 row-start-2 flex flex-wrap items-center gap-2 sm:col-start-2 sm:row-start-1 sm:justify-end", children: actions }) : null
  ] });
}
function AdminCard({
  title,
  eyebrow,
  description,
  actions,
  footer,
  density = "comfortable",
  className,
  bodyClassName,
  children
}) {
  const pad = density === "compact" ? "p-4" : "p-5 sm:p-6";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: cn(
        "rounded-2xl border border-border bg-card text-card-foreground shadow-sm",
        className
      ),
      children: [
        (title || eyebrow || description || actions) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "header",
          {
            className: cn(
              "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border",
              density === "compact" ? "px-4 py-3" : "px-5 py-4 sm:px-6"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                eyebrow ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground", children: eyebrow }) : null,
                title ? /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "truncate text-lg font-semibold tracking-tight text-foreground", children: title }) : null,
                description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: description }) : null
              ] }),
              actions ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 items-center gap-2", children: actions }) : null
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(pad, bodyClassName), children }),
        footer ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "footer",
          {
            className: cn(
              "border-t border-border bg-muted/40 text-sm text-muted-foreground",
              density === "compact" ? "px-4 py-2.5" : "px-5 py-3 sm:px-6"
            ),
            children: footer
          }
        ) : null
      ]
    }
  );
}
function AdminKpi({
  label,
  value,
  delta,
  trend,
  icon,
  helper,
  accent
}) {
  const trendClass = trend === "up" ? "text-sky-700 bg-sky-100" : trend === "down" ? "text-rose-700 bg-rose-100" : "text-muted-foreground bg-muted";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-2xl border bg-card p-5 shadow-sm transition",
        accent ? "border-primary/40 ring-1 ring-primary/15" : "border-border"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-muted-foreground", children: [
            icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 shrink-0 place-items-center rounded-md bg-muted text-foreground", children: icon }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: label })
          ] }),
          delta ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 font-mono text-micro font-semibold",
                trendClass
              ),
              children: delta
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-h2 font-bold leading-none tabular-nums text-foreground sm:text-h1", children: value }),
        helper ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: helper }) : null
      ]
    }
  );
}
export {
  AdminPageHeader as A,
  AdminKpi as a,
  AdminCard as b
};
