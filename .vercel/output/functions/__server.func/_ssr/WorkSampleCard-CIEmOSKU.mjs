import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { ac as FileText, a7 as Lock, q as ArrowRight } from "../_libs/lucide-react.mjs";
const WORK_SAMPLES = [
  {
    trackSlug: "pharmacovigilance",
    track: "Pharmacovigilance",
    artifact: "ICSR case file (de-identified)",
    excerpt: "Spontaneous report · 64F · suspected SAE post-anticoagulant initiation",
    bullets: [
      "Full E2B(R3) intake — primary source, reporter, dates",
      "MedDRA LLT coding with PT roll-up + WHO-DD product mapping",
      "Mentor-reviewed narrative; 3 graded passes before sign-off"
    ]
  },
  {
    trackSlug: "medical-coding",
    track: "Medical Coding",
    artifact: "Multi-specialty chart (de-identified)",
    excerpt: "Outpatient cardiology consult · ICD-10 + CPT + E/M level 4",
    bullets: [
      "ICD-10-CM primary + 4 comorbidities, NCCI edits checked",
      "CPT with modifiers; E/M leveled with MDM justification",
      "Mock CPC audit form attached — accuracy 96%"
    ]
  },
  {
    trackSlug: "clinical-data-management",
    track: "Clinical Data Management",
    artifact: "eCRF + edit-check spec (Rave study)",
    excerpt: "Phase II oncology · Demographics, AE, ConMed forms",
    bullets: [
      "CDASH-aligned CRF build in Medidata Rave (study build screenshot)",
      "Edit-check spec written + executed; query log attached",
      "SAE reconciliation report from mock database lock"
    ]
  }
];
function WorkSampleCard({ sample }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]", children: sample.track })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-grotesk text-body font-bold text-ink", children: sample.artifact }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-micro text-slate-500", children: sample.excerpt }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5 text-caption leading-relaxed text-slate-700", children: sample.bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--teal-deep)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b })
    ] }, b)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 rounded-lg border border-ink/10 bg-slate-50 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-slate-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro leading-snug text-slate-600", children: "Full artifact (redacted PDF + auditor scoring sheet) sent on recruiter request — student consent recorded." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/contact",
        className: "mt-4 inline-flex items-center gap-1.5 self-start text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline",
        children: [
          "Request the full sample ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
        ]
      }
    )
  ] });
}
export {
  WORK_SAMPLES as W,
  WorkSampleCard as a
};
