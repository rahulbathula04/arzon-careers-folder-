import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { g as getEnrolmentIntent } from "./enrolment.functions-Cs_77DUe.mjs";
import { T as TIER_META, f as formatInr } from "./enrolmentTiers-CKOrj6Lb.mjs";
import { aT as Route$1g, a0 as NEXT_COHORT, w as waLink, B as Button } from "./router-CvdLERTV.mjs";
import { e as enrolProgressStore } from "./useEnrolProgress-BU665q_a.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { I as CircleCheck, a2 as Mail, s as MessageCircle, q as ArrowRight, d as Sparkles, m as ShieldCheck, aq as Share2, a4 as LoaderCircle, bb as Circle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "./createSsrRpc-BV3sOdh8.mjs";
import "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-CMxFZmfM.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-CGVBerDj.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./moments.types-CDdnLKsa.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/workflow__serde.mjs";
import "../_libs/ai-sdk__openai.mjs";
import "../_libs/lovable.dev__webhooks-js.mjs";
import "../_libs/lovable.dev__email-js.mjs";
import "./client.server-DUn3rRvm.mjs";
import "./redis.server-jD5sLB4g.mjs";
import "../_libs/react-email__render.mjs";
import "../_libs/prettier.mjs";
import "../_libs/html-to-text.mjs";
import "../_libs/selderee__plugin-htmlparser2.mjs";
import "../_libs/selderee.mjs";
import "../_libs/parseley.mjs";
import "../_libs/leac.mjs";
import "../_libs/peberminta.mjs";
import "../_libs/domhandler.mjs";
import "../_libs/domelementtype.mjs";
import "../_libs/htmlparser2.mjs";
import "../_libs/entities.mjs";
import "../_libs/deepmerge.mjs";
import "../_libs/dom-serializer.mjs";
import "../_libs/react-email__html.mjs";
import "../_libs/react-email__head.mjs";
import "../_libs/react-email__preview.mjs";
import "../_libs/react-email__body.mjs";
import "../_libs/react-email__container.mjs";
import "../_libs/react-email__heading.mjs";
import "../_libs/react-email__text.mjs";
import "../_libs/react-email__section.mjs";
import "../_libs/react-email__button.mjs";
import "../_libs/react-email__hr.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/uncrypto.mjs";
import "node:crypto";
const STEPS = [
  {
    id: 1,
    title: "Verify WhatsApp & Contact",
    subtitle: "Confirm your phone to receive instant batch updates & LMS magic login",
    actionText: "Confirm Contact Details"
  },
  {
    id: 2,
    title: "Upload Profile & Qualification",
    subtitle: "Submit your degree details so your mentor can tailor your learning path",
    actionText: "Upload Qualification / Resume"
  },
  {
    id: 3,
    title: "Join Private Cohort Community",
    subtitle: "Connect with fellow peers & instructors in your WhatsApp batch group",
    actionText: "Join WhatsApp Batch Group"
  },
  {
    id: 4,
    title: "Schedule 1-on-1 Mentor Intro",
    subtitle: "Book your 15-minute 1-on-1 onboarding orientation call with an industry expert",
    actionText: "Book Orientation Call"
  }
];
function OnboardingWizard({
  studentName = "Student",
  studentPhone,
  tierName = "Career Master"
}) {
  const [completed, setCompleted] = reactExports.useState([1]);
  const [activeStep, setActiveStep] = reactExports.useState(2);
  const [isDone, setIsDone] = reactExports.useState(false);
  const progressPct = Math.round(completed.length / STEPS.length * 100);
  const completeStep = (stepId) => {
    if (!completed.includes(stepId)) {
      const nextCompleted = [...completed, stepId];
      setCompleted(nextCompleted);
      toast.success(`Step ${stepId} completed! 🎉`);
      if (nextCompleted.length === STEPS.length) {
        setIsDone(true);
        toast.success("🔥 Day-0 Onboarding Complete! Welcome to Arzon Global.");
      } else {
        const nextId = STEPS.find((s) => !nextCompleted.includes(s.id))?.id ?? 2;
        setActiveStep(nextId);
      }
    }
  };
  const handleStepAction = (stepId) => {
    if (stepId === 1) {
      completeStep(1);
    } else if (stepId === 2) {
      toast.info("Uploading qualification profile...");
      setTimeout(() => completeStep(2), 800);
    } else if (stepId === 3) {
      const text = `Hi Arzon! I have confirmed my enrolment for the ${tierName} programme (${NEXT_COHORT.label} batch). Please add me to the private cohort WhatsApp group!`;
      window.open(waLink(text), "_blank", "noopener");
      completeStep(3);
    } else if (stepId === 4) {
      window.open("https://cal.com/arzon-onboarding/15min", "_blank", "noopener");
      completeStep(4);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          " Day-0 Activation Wizard"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-grotesk text-2xl font-bold text-white", children: [
          "Welcome aboard, ",
          studentName,
          "! 🚀"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 mt-1", children: "Complete your 4-step onboarding checklist to unlock instant LMS access & mentor scheduling." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-12 w-12 flex items-center justify-center font-bold text-sm text-emerald-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 h-12 w-12 -rotate-90 transform", viewBox: "0 0 36 36", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                className: "text-slate-800",
                strokeWidth: "3",
                stroke: "currentColor",
                fill: "none",
                d: "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                className: "text-emerald-500 transition-all duration-500 ease-out",
                strokeDasharray: `${progressPct}, 100`,
                strokeWidth: "3",
                strokeLinecap: "round",
                stroke: "currentColor",
                fill: "none",
                d: "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              }
            )
          ] }),
          progressPct,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-slate-300", children: "Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-micro text-slate-500", children: [
            completed.length,
            " of 4 Completed"
          ] })
        ] })
      ] })
    ] }),
    isDone ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold mb-3", children: "✓" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-grotesk text-xl font-bold text-white", children: "All Onboarding Steps Complete!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300 mt-1 max-w-md mx-auto", children: "Your LMS account is active. Your mentor orientation details & WhatsApp cohort group link have been dispatched." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-full",
          onClick: () => window.location.href = "/dashboard",
          children: [
            "Enter Student LMS Dashboard ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
          ]
        }
      )
    ] }) : (
      /* Checklist Steps */
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-3", children: STEPS.map((step) => {
        const isCompleted = completed.includes(step.id);
        const isActive = activeStep === step.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${isCompleted ? "border-emerald-500/30 bg-emerald-950/10 opacity-90" : isActive ? "border-emerald-500 bg-slate-900/90 shadow-lg ring-1 ring-emerald-500/50" : "border-slate-800 bg-slate-950/40 opacity-70"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => completeStep(step.id),
                    className: "mt-0.5 text-emerald-400 transition-transform active:scale-95",
                    children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6 text-emerald-400 fill-emerald-500/20" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-6 w-6 text-slate-600 hover:text-emerald-400" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-grotesk text-base font-semibold text-white", children: [
                      "Step ",
                      step.id,
                      ": ",
                      step.title
                    ] }),
                    isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-emerald-500/20 px-2 py-0.5 text-micro font-medium text-emerald-400", children: "Completed" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-slate-400 mt-0.5", children: step.subtitle })
                ] })
              ] }),
              !isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => handleStepAction(step.id),
                  className: "shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 rounded-xl text-xs",
                  children: [
                    step.actionText,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 h-3.5 w-3.5" })
                  ]
                }
              )
            ] })
          },
          step.id
        );
      }) })
    )
  ] });
}
function EnrolSuccess() {
  const initial = Route$1g.useLoaderData();
  const {
    intent,
    t: token
  } = Route$1g.useSearch();
  const fetchIntent = useServerFn(getEnrolmentIntent);
  const [data, setData] = reactExports.useState(initial);
  const [polling, setPolling] = reactExports.useState(false);
  const status = data?.status ?? null;
  const isPaid = status === "paid";
  const isFailed = status === "failed";
  const isPending = !!data && !isPaid && !isFailed;
  reactExports.useEffect(() => {
    if (isPaid) enrolProgressStore.clear();
  }, [isPaid]);
  reactExports.useEffect(() => {
    if (!intent || !token || !isPending) return;
    let cancelled = false;
    setPolling(true);
    const start = Date.now();
    const tick = async () => {
      if (cancelled) return;
      try {
        const next = await fetchIntent({
          data: {
            intentId: intent,
            intentToken: token
          }
        });
        if (cancelled) return;
        setData(next);
        if (next.status === "paid" || next.status === "failed") {
          setPolling(false);
          return;
        }
      } catch {
      }
      if (Date.now() - start < 2e4) {
        setTimeout(tick, 2e3);
      } else {
        setPolling(false);
      }
    };
    const t = setTimeout(tick, 2e3);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [intent, token, isPending, fetchIntent]);
  const refresh = async () => {
    if (!intent || !token) return;
    setPolling(true);
    try {
      const next = await fetchIntent({
        data: {
          intentId: intent,
          intentToken: token
        }
      });
      setData(next);
    } finally {
      setPolling(false);
    }
  };
  const tierMeta = data && data.tier in TIER_META ? TIER_META[data.tier] : null;
  const amount = data?.finalPriceInr ?? data?.basePriceInr;
  const rawFirst = data?.name?.split(" ")[0];
  const firstName = rawFirst && rawFirst.trim().length > 0 ? rawFirst.trim() : null;
  const cohortLabel = NEXT_COHORT.label;
  const cohortStarts = NEXT_COHORT.startsLabel;
  if (isFailed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FailureView, { firstName: firstName ?? "there", tierName: tierMeta?.name ?? null, reason: data?.failureReason ?? null });
  }
  if (isPending) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingView, { firstName: firstName ?? "there", polling, onRefresh: refresh });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen editorial-page-bg p-4 sm:p-6 lg:p-10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl editorial-card p-6 sm:p-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-12 w-12 text-emerald-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-widest text-[#707C90]", children: "Payment Verified · Seat Locked" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl font-bold text-[#151C2E] tracking-tight", children: firstName ? `Welcome aboard, ${firstName}.` : "Welcome to Arzon Global." }),
      data && tierMeta ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#5B6472]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#151C2E]", children: tierMeta.name }),
        " programme",
        amount != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          " ",
          "·",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[#151C2E] font-semibold", children: formatInr(amount) }),
          " ",
          "paid"
        ] }) : null
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#5B6472]", children: "Your enrolment record has been confirmed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#5B6472]", children: [
        "Cohort: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#151C2E]", children: cohortLabel }),
        " · Starts",
        " ",
        cohortStarts
      ] }),
      data?.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-xs text-[#5B6472] editorial-stat-tile px-3 py-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5 text-[#707C90]" }),
        " Digital receipt sent to ",
        data.email
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OnboardingWizard, { studentName: data?.name ?? "Student", studentPhone: data?.phone, tierName: tierMeta?.name ?? "Career Master" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink(`Hi Arzon, I just enrolled in the ${tierMeta?.name ?? ""} programme. My cohort is ${cohortLabel}. Here to confirm onboarding.`), target: "_blank", rel: "noreferrer", className: "flex items-center justify-between editorial-btn-blue p-4 text-white hover:bg-[#1e40af]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5 text-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Connect with Admissions on WhatsApp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/90", children: "Confirms your phone number and accelerates cohort orientation." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 shrink-0" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editorial-stat-tile p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-[#8A6D1F]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-base font-bold text-[#151C2E]", children: "First 7 Days Execution Schedule" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3.5 text-xs text-[#5B6472]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-medium", children: "1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#151C2E]", children: "Admissions Outreach (within 30 min)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5", children: "Your counsellor will verify profile details and send cohort invitations." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-medium", children: "2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#151C2E]", children: "Credential Onboarding (within 2 hours)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5", children: "Learning portal credentials, syllabus documentation, and preparatory reading." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-medium", children: "3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-[#151C2E]", children: [
              "Cohort Kickoff (",
              cohortStarts,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5", children: "First live technical briefing invite. Save the schedule to your calendar." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "flex items-center gap-3 editorial-stat-tile p-4 text-[#151C2E] hover:bg-slate-200/60 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-[#1D4ED8] shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-[#151C2E]", children: "Open Student Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#5B6472]", children: "Track progress & module milestones." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 editorial-stat-tile p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-emerald-600 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-[#151C2E]", children: "ISO 9001 Certified" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#5B6472]", children: "Arzon Global Pvt. Ltd. · MCA & MSME Registered." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink(`Hey, I just enrolled with Arzon Careers for ${tierMeta?.name ?? "their programme"}. They have a free 3-min fit test you should try: https://arzoncareers.in/career-engine/start`), target: "_blank", rel: "noreferrer", className: "flex items-center justify-center gap-2 text-xs text-[#5B6472] hover:text-[#151C2E] transition-colors pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5 text-[#8A6D1F]" }),
      " Share career assessment link with a peer"
    ] })
  ] }) });
}
function PendingView({
  firstName,
  polling,
  onRefresh
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen editorial-page-bg p-4 sm:p-6 lg:p-10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md editorial-card p-8 text-center space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-10 w-10 animate-spin text-[#1D4ED8]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-widest text-[#707C90]", children: "Verifying Payment with Razorpay" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-2xl font-bold text-[#151C2E]", children: firstName ? `Hang tight, ${firstName}.` : "Confirming your seat..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#5B6472]", children: "We're matching your payment receipt. This page updates automatically once verified." })
  ] }) });
}
function FailureView({
  firstName,
  tierName,
  reason
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen editorial-page-bg p-4 sm:p-6 lg:p-10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md editorial-card p-8 text-center space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-2xl font-bold text-[#151C2E]", children: "Payment Processing Issue" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#5B6472]", children: reason || "The payment transaction could not be completed. No funds were debited." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/enrol", className: "editorial-btn-blue text-xs font-semibold px-4 py-2.5 inline-block", children: "Return to Programme Selection" })
  ] }) });
}
export {
  EnrolSuccess as component
};
