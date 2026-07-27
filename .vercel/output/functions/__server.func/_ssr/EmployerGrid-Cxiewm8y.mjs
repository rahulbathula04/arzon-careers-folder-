import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function EmployerGrid({ employers }) {
  if (!employers.length) return null;
  const grouped = employers.reduce((acc, e) => {
    (acc[e.tier] ||= []).push(e);
    return acc;
  }, {});
  const tiers = Object.keys(grouped);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: tiers.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 font-mono text-micro uppercase tracking-[0.18em] text-white/60", children: tier }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3", children: grouped[tier].map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-white/10 bg-white/[0.02] p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-white", children: e.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro text-white/55", children: e.cities.join(" · ") }),
      e.typicalBand && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-meta text-white/75", children: e.typicalBand })
    ] }, e.name)) })
  ] }, tier)) });
}
export {
  EmployerGrid as E
};
