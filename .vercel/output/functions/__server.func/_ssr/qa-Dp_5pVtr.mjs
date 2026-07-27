import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const QA_CATEGORY_LABEL = {
  copy: "Copy & content",
  spacing: "Spacing & layout",
  hydration: "Hydration & SSR",
  payment: "Payment flow"
};
const QA_CHECKS = [
  // Copy / content
  {
    id: "coupon-math",
    category: "copy",
    name: "Pre-registration coupon math",
    description: "Unit tests that lock in the ₹1,065 pre-reg number and per-tier remaining balances used in on-page copy.",
    source: "src/lib/__tests__/preregCouponMath.test.ts",
    kind: "unit"
  },
  {
    id: "coupon-invariant",
    category: "copy",
    name: "Coupon split-pay invariant",
    description: "Guarantees Essential / Career / Elite always show ₹5k / ₹7k / ₹9k remaining after any promoted coupon.",
    source: "src/lib/__tests__/couponSplitPayInvariant.test.ts",
    kind: "unit"
  },
  {
    id: "coupon-e2e",
    category: "copy",
    name: "Coupon copy end-to-end",
    description: "Applies each promoted coupon in a real browser and verifies the tier remaining balance and ₹1,065 visibility on the Pay screen.",
    source: "scripts/e2e/couponSplitPay.e2e.py",
    kind: "e2e"
  },
  // Spacing / layout
  {
    id: "visual-regression",
    category: "spacing",
    name: "Stepper & CTA visual regression",
    description: "Desktop + 384px mobile screenshots that fail if stepper pips or CTA chips are clipped, bleached, or missing.",
    source: "scripts/e2e/visualRegression.e2e.py",
    kind: "e2e"
  },
  // Hydration / SSR
  {
    id: "hydration-regression",
    category: "hydration",
    name: "Funnel & shell hydration scan",
    description: "Walks all funnel + shell routes and fails on any real React hydration mismatch, ignoring dev-inspector attribute drift.",
    source: "scripts/e2e/hydrationRegression.e2e.py",
    kind: "e2e"
  },
  // Payment flow
  {
    id: "full-funnel",
    category: "payment",
    name: "Program → Profile → Pay → Success",
    description: "End-to-end walk that submits the profile, triggers seat-hold + Razorpay order creation, and verifies the WhatsApp counsellor CTA on Success.",
    source: "scripts/e2e/fullFunnel.e2e.py",
    kind: "e2e"
  },
  {
    id: "razorpay-verify-contract",
    category: "payment",
    name: "Razorpay verify endpoint contract",
    description: "Direct POSTs to /api/public/razorpay/verify to confirm it rejects invalid signatures and malformed payloads with structured JSON errors.",
    source: "scripts/e2e/fullFunnel.e2e.py",
    kind: "e2e"
  }
];
function getQaBuildInfo() {
  const sha = typeof __QA_BUILD_SHA__ !== "undefined" && __QA_BUILD_SHA__ ? __QA_BUILD_SHA__ : "dev";
  const builtAt = typeof __QA_BUILD_TIME__ !== "undefined" && __QA_BUILD_TIME__ ? __QA_BUILD_TIME__ : (/* @__PURE__ */ new Date()).toISOString();
  return { sha, builtAt };
}
function groupChecks(checks = QA_CHECKS) {
  const groups = {
    copy: [],
    spacing: [],
    hydration: [],
    payment: []
  };
  for (const c of checks) groups[c.category].push(c);
  return groups;
}
const ORDER = ["copy", "spacing", "hydration", "payment"];
const KIND_STYLE = {
  unit: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  // @allow-raw-palette
  e2e: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  // @allow-raw-palette
  script: "bg-amber-500/10 text-amber-300 border-amber-500/30"
  // @allow-raw-palette
};
function QaCoveragePage() {
  const groups = groupChecks(QA_CHECKS);
  const {
    sha,
    builtAt
  } = getQaBuildInfo();
  const total = QA_CHECKS.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto w-full max-w-4xl px-4 py-10 text-neutral-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-neutral-400", children: "Internal · noindex" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-h3 font-semibold", children: "QA coverage" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-neutral-400", children: "Automated validations that run against the latest build. Each entry points to the source of truth in the repo." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Checks", value: String(total) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Categories", value: String(ORDER.length) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Build", value: sha }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Rendered", value: new Date(builtAt).toLocaleString(void 0, {
          dateStyle: "medium",
          timeStyle: "short"
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: ORDER.map((cat) => {
      const items = groups[cat];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-baseline justify-between border-b border-neutral-800 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium", children: QA_CATEGORY_LABEL[cat] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-neutral-500", children: [
            items.length,
            " check",
            items.length === 1 ? "" : "s"
          ] })
        ] }),
        items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-500", children: "No checks registered yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: items.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-lg border border-neutral-800 bg-neutral-900/40 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-medium", children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded border px-1.5 py-0.5 text-micro uppercase tracking-wide ${KIND_STYLE[c.kind] ?? ""}`, children: c.kind })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-neutral-300", children: c.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-xs text-neutral-500", children: c.source })
        ] }, c.id)) })
      ] }, cat);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-10 border-t border-neutral-800 pt-4 text-xs text-neutral-500", children: [
      "Update ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "src/lib/qaCoverage.ts" }),
      " whenever a validation is added or retired so this dashboard stays trustworthy."
    ] })
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-neutral-800 bg-neutral-900/40 px-3 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-micro uppercase tracking-wide text-neutral-500", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 font-mono text-sm text-neutral-200", children: value })
  ] });
}
export {
  QaCoveragePage as component
};
