import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as fetchVerificationAudit } from "./verificationAudit-BO_-cmet.mjs";
import { m as ShieldCheck, ab as Clock, ac as FileText, ad as Eye, ae as QrCode, d as Sparkles } from "../_libs/lucide-react.mjs";
const EVENT_META = {
  id_generated: { label: "ID & QR generated", icon: Sparkles },
  qr_scanned: { label: "QR / ID verified", icon: QrCode },
  rubric_viewed: { label: "Recruiter viewed rubric", icon: Eye },
  artifact_unlocked: { label: "Graded artifact unlocked", icon: FileText },
  portfolio_viewed: { label: "Portfolio opened", icon: ShieldCheck }
};
function fmt(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}
function VerificationAuditTrail({
  candidateRef,
  tone = "light"
}) {
  const [rows, setRows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let active = true;
    setLoading(true);
    fetchVerificationAudit(candidateRef).then((r) => {
      if (active) setRows(r);
    }).finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [candidateRef]);
  const isDark = tone === "dark";
  const shellClass = isDark ? "rounded-2xl border border-white/10 bg-white/[0.03] p-5" : "rounded-2xl border border-ink/10 bg-white p-5";
  const titleClass = isDark ? "font-grotesk text-body-sm font-bold text-white" : "font-grotesk text-body-sm font-bold text-ink";
  const subClass = isDark ? "text-meta text-white/65" : "text-meta text-slate-600";
  const rowClass = isDark ? "flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3" : "flex items-start gap-3 rounded-xl border border-ink/10 bg-slate-50 p-3";
  const eventLabelClass = isDark ? "text-caption font-semibold text-white" : "text-caption font-semibold text-ink";
  const timestampClass = isDark ? "font-mono text-micro text-white/55" : "font-mono text-micro text-slate-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: shellClass, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ShieldCheck,
        {
          className: isDark ? "h-4 w-4 text-primary-glow" : "h-4 w-4 text-[color:var(--teal-deep)]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `font-mono text-micro font-semibold uppercase tracking-[0.2em] ${isDark ? "text-primary-glow" : "text-[color:var(--teal-deep)]"}`,
          children: "Public verification audit trail"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `mt-1.5 ${titleClass}`, children: "What's happened on this candidate" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1 ${subClass}`, children: "De-identified. Shows when the ID was generated, when recruiters viewed the rubric, and when graded artifacts were unlocked. No PII." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "mt-4 space-y-2.5", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: rowClass, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: isDark ? "h-4 w-4 text-white/60" : "h-4 w-4 text-slate-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: subClass, children: "Loading audit trail…" })
      ] }),
      !loading && rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: rowClass, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: isDark ? "h-4 w-4 text-white/60" : "h-4 w-4 text-slate-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: subClass, children: [
          "No public events yet for ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: candidateRef }),
          ". This page logs the first one when a recruiter opens it."
        ] })
      ] }),
      rows.map((r) => {
        const meta = EVENT_META[r.event_type];
        const Icon = meta?.icon ?? ShieldCheck;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: rowClass, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Icon,
            {
              className: isDark ? "mt-0.5 h-4 w-4 shrink-0 text-primary-glow" : "mt-0.5 h-4 w-4 shrink-0 text-[color:var(--teal-deep)]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: eventLabelClass, children: meta?.label ?? r.event_type }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: timestampClass, children: fmt(r.occurred_at) }),
            r.viewer_org_tag && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: timestampClass, children: [
              "by ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: r.viewer_org_tag })
            ] })
          ] })
        ] }, r.id);
      })
    ] })
  ] });
}
export {
  VerificationAuditTrail as V
};
