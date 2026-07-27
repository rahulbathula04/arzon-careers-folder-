import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { T as TIER_META } from "./enrolmentTiers-CKOrj6Lb.mjs";
import { u as useEnrolProgress } from "./useEnrolProgress-BU665q_a.mjs";
import { t as track } from "./router-CvdLERTV.mjs";
import { ab as Clock, q as ArrowRight, n as RotateCcw } from "../_libs/lucide-react.mjs";
function ResumeBanner() {
  const { state, clear } = useEnrolProgress();
  reactExports.useEffect(() => {
    if (state?.intentId) {
      track("enrol_resume_shown", {
        program_slug: state.tier ?? null,
        props: { intent_id: state.intentId, step: state.step }
      });
    }
  }, [state?.intentId, state?.step, state?.tier]);
  if (!state?.intentId || !state.intentToken || !state.tier) return null;
  const meta = TIER_META[state.tier];
  const name = state.contact?.name?.split(" ")[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      role: "status",
      className: "tone-light card-light mb-6 rounded-2xl border border-[color:var(--teal-deep)]/25 bg-[color:var(--teal-soft)] p-4 shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mt-0.5 h-5 w-5 shrink-0 text-[color:var(--teal-deep)]", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-[color:var(--ink)]", children: name ? `Welcome back, ${name}` : "Continue your enrolment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-[color:var(--ink-soft)]", children: [
              meta.name,
              " programme · your seat is still held. Pick up at secure payment."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-col items-stretch gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/enrol/$tier/pay",
              params: { tier: state.tier },
              search: { intent: state.intentId, t: state.intentToken },
              onClick: () => track("enrol_resume_clicked", {
                program_slug: state.tier ?? null,
                props: { intent_id: state.intentId, step: state.step }
              }),
              className: "cta-navy inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold shadow-md ring-1 ring-[color:var(--teal-deep)]/30 transition hover:opacity-95",
              children: [
                "Resume payment ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                track("enrol_resume_cleared", {
                  program_slug: state.tier ?? null,
                  props: { intent_id: state.intentId }
                });
                clear();
              },
              className: "inline-flex items-center justify-center gap-1 self-center rounded-md px-3 py-1.5 text-xs font-medium text-[color:var(--ink-mute)] underline-offset-4 hover:text-[color:var(--ink-soft)] hover:underline",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3", "aria-hidden": true }),
                " Start over"
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ResumeBanner as R
};
