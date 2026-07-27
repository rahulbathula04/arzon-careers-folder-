import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { w as waLink } from "./router-CvdLERTV.mjs";
import { aa as CircleAlert, au as RefreshCw, s as MessageCircle, a6 as ArrowLeft } from "../_libs/lucide-react.mjs";
function EnrolErrorFallback({
  error,
  reset,
  where
}) {
  const router = useRouter();
  const label = where ?? "enrolment";
  const rawMsg = error?.message ?? "";
  const friendly = friendlyEnrolError(rawMsg);
  const waMsg = `Hi Arzon, I'm stuck on the ${label} page (${friendly.title}). Can you help me complete enrolment manually?`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-danger/30 bg-danger/5 p-6 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-danger/15 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-danger", "aria-hidden": "true" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-h3 text-[color:var(--ink)]", children: friendly.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]", children: friendly.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[color:var(--ink)]", children: "What to do: " }),
        friendly.retry
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              router.invalidate();
              reset();
            },
            className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5" }),
              " Try again"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: waLink(waMsg),
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-[color:var(--ink)] transition hover:bg-ink/5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
              " WhatsApp counsellor"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/enrol",
            className: "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-[color:var(--ink-soft)] hover:text-[color:var(--ink)]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
              " Back to enrolment"
            ]
          }
        )
      ] }),
      false
    ] })
  ] }) }) });
}
function friendlyEnrolError(raw) {
  const m = raw.toLowerCase();
  if (m.includes("not found") || m.includes("intent not found")) {
    return {
      title: "We couldn't find your enrolment",
      message: "Your enrolment session may have expired or the link is incomplete.",
      retry: "Start a fresh enrolment. Your details are safe — no card was charged."
    };
  }
  if (m.includes("invalid") && (m.includes("token") || m.includes("uuid"))) {
    return {
      title: "This enrolment link isn't valid",
      message: "The link you followed appears to be malformed or truncated.",
      retry: "Please start enrolment again from the pricing page."
    };
  }
  if (m.includes("unauthorized") || m.includes("401")) {
    return {
      title: "Please sign in again",
      message: "Your session expired while loading this page.",
      retry: "Refresh the page or go back to enrolment to continue."
    };
  }
  if (m.includes("network") || m.includes("fetch") || m.includes("failed to fetch")) {
    return {
      title: "Connection interrupted",
      message: "We couldn't reach our servers to load your enrolment.",
      retry: "Check your internet connection and tap Try again."
    };
  }
  return {
    title: "Something went wrong",
    message: "We hit an unexpected issue while loading this page. No card was charged and your details are safe.",
    retry: "Tap Try again. If it keeps failing, message us on WhatsApp and we'll complete enrolment manually."
  };
}
export {
  EnrolErrorFallback as E
};
