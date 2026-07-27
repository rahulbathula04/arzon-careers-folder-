import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { i as isTier, f as formatInr, T as TIER_META } from "./enrolmentTiers-CKOrj6Lb.mjs";
import { e as expireEnrolmentCoupon, g as getEnrolmentIntent, m as markPreRegistrationInitiated, a as applyEnrolmentCoupon } from "./enrolment.functions-Cs_77DUe.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { bx as Route$l, t as track, by as PREREG_AMOUNT_INR, bz as PREREG_URL, c as cn, bw as buttonVariants } from "./router-CvdLERTV.mjs";
import { e as enrolProgressStore } from "./useEnrolProgress-BU665q_a.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as Toaster } from "./sonner-DeNSN9-c.mjs";
import { R as Root2$1, I as Item, H as Header, T as Trigger2, C as Content2$1 } from "../_libs/radix-ui__react-accordion.mjs";
import { R as Root2, P as Portal2, C as Content2, T as Title2, D as Description2, a as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { m as ShieldCheck, a4 as LoaderCircle, q as ArrowRight, aa as CircleAlert, a7 as Lock, I as CircleCheck, bQ as Tag, af as GraduationCap, V as Briefcase, F as FileCheckCorner, B as BrainCircuit, ac as FileText, T as Target, bZ as CreditCard, s as MessageCircle, b_ as Monitor, b$ as CalendarCheck, bx as Rocket, aZ as TrendingUp, aX as Star, O as BadgeCheck, b0 as ChevronDown } from "../_libs/lucide-react.mjs";
import { p as objectType, q as stringType, x as numberType, v as enumType, w as booleanType } from "../_libs/zod.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
import "../_libs/uncrypto.mjs";
import "node:crypto";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-direction.mjs";
const inputSchema = objectType({
  intentId: stringType().uuid(),
  intentToken: stringType().min(16).max(64)
});
const createRazorpayOrder = createServerFn({
  method: "POST"
}).inputValidator((i) => inputSchema.parse(i)).handler(createSsrRpc("a6f1a7df2dd032270b33ae7f01da2576971e1b7652c3d182f28f0f762ce126d4"));
let loadingPromise = null;
function loadRazorpay() {
  if (typeof window === "undefined") return Promise.reject(new Error("no_window"));
  if (window.Razorpay) return Promise.resolve();
  if (loadingPromise) return loadingPromise;
  loadingPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loadingPromise = null;
      reject(new Error("Failed to load Razorpay. Check your internet connection."));
    };
    document.head.appendChild(s);
  });
  return loadingPromise;
}
async function openRazorpayCheckout(args) {
  await loadRazorpay();
  if (!window.Razorpay) throw new Error("Razorpay unavailable");
  const rzp = new window.Razorpay({
    key: args.keyId,
    order_id: args.orderId,
    amount: args.amount,
    currency: args.currency,
    name: args.name,
    description: args.description,
    prefill: args.prefill,
    notes: args.notes ?? {},
    theme: { color: args.themeColor ?? "#3B82F6" },
    modal: { ondismiss: args.onDismiss },
    handler: args.onSuccess
  });
  if (args.onFailed) {
    rzp.on("payment.failed", (payload) => {
      const err = payload?.error ?? {};
      args.onFailed?.({
        code: err.code,
        description: err.description,
        reason: err.reason,
        source: err.source,
        step: err.step
      });
    });
  }
  rzp.open();
}
function mapServerOrderError(raw) {
  const s = raw.toLowerCase();
  if (s.includes("not yet configured")) {
    return {
      title: "Payments aren't ready yet",
      message: "Our payment gateway isn't connected on our side right now — this isn't a problem with your card or account.",
      retry: "Message your counsellor on WhatsApp to complete enrolment manually.",
      canRetry: false,
      contactSupport: true
    };
  }
  if (s.includes("401") || s.includes("authentication")) {
    return {
      title: "Payment gateway authentication failed",
      message: "We couldn't reach Razorpay with valid credentials. Your card has not been charged.",
      retry: "Please try again in a minute. If it keeps failing, message your counsellor — we'll send you a direct payment link.",
      canRetry: true,
      contactSupport: true
    };
  }
  if (s.includes("order not found") || s.includes("could not load")) {
    return {
      title: "We couldn't load your order",
      message: "Your enrolment details didn't load correctly.",
      retry: "Refresh this page and try again.",
      canRetry: true,
      contactSupport: true
    };
  }
  if (s.includes("could not create payment order")) {
    return {
      title: "Couldn't start payment",
      message: "Razorpay didn't accept the order. Your card has not been charged.",
      retry: "Tap Retry payment. If it fails twice, switch to UPI or contact your counsellor.",
      canRetry: true,
      contactSupport: true
    };
  }
  return {
    title: "Couldn't start payment",
    message: raw || "Something went wrong while starting your payment.",
    retry: "Please try again. Your card has not been charged.",
    canRetry: true,
    contactSupport: true
  };
}
function mapPaymentFailed(err) {
  const reason = (err.reason ?? "").toLowerCase();
  const code = (err.code ?? "").toLowerCase();
  if (reason.includes("payment_cancelled") || reason.includes("cancelled")) {
    return {
      title: "Payment cancelled",
      message: "You cancelled the payment before it completed. No money was deducted.",
      retry: "Tap Retry payment whenever you're ready.",
      canRetry: true,
      contactSupport: false
    };
  }
  if (reason.includes("insufficient")) {
    return {
      title: "Insufficient funds",
      message: "Your bank declined the charge for insufficient balance.",
      retry: "Try another card, UPI, or net banking. Your counsellor can also share alternate options.",
      canRetry: true,
      contactSupport: true
    };
  }
  if (reason.includes("authentication") || code.includes("auth")) {
    return {
      title: "Card authentication failed",
      message: err.description || "Your bank couldn't verify the payment (OTP / 3D-Secure failed). No money was deducted.",
      retry: "Retry with the correct OTP, or use UPI / a different card.",
      canRetry: true,
      contactSupport: true
    };
  }
  if (reason.includes("network") || code.includes("network")) {
    return {
      title: "Network interrupted",
      message: "The connection dropped before payment could complete.",
      retry: "Check your internet and retry. If your bank shows a debit, it will auto-reverse within 5–7 working days.",
      canRetry: true,
      contactSupport: true
    };
  }
  if (err.source === "bank" || reason.includes("bank")) {
    return {
      title: "Bank declined the payment",
      message: err.description || "Your bank refused the transaction. This is usually a card limit or risk filter.",
      retry: "Try UPI or a different card. If it keeps failing, message your counsellor for a direct link.",
      canRetry: true,
      contactSupport: true
    };
  }
  return {
    title: "Payment failed",
    message: err.description || "Your payment didn't go through. No money was deducted.",
    retry: "Tap Retry payment. If the issue persists, contact your counsellor on WhatsApp.",
    canRetry: true,
    contactSupport: true
  };
}
function useCountdown(targetIso) {
  const target = targetIso ? new Date(targetIso).getTime() : 0;
  const [now, setNow] = reactExports.useState(() => Date.now());
  reactExports.useEffect(() => {
    if (!target) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1e3);
    return () => window.clearInterval(id);
  }, [target]);
  if (!target) return 0;
  return Math.max(0, target - now);
}
function useCountdownWithSync(targetIso) {
  const target = targetIso ? new Date(targetIso).getTime() : 0;
  const [now, setNow] = reactExports.useState(() => Date.now());
  reactExports.useEffect(() => {
    if (!target) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1e3);
    return () => window.clearInterval(id);
  }, [target]);
  if (!target) return { remaining: 0, syncedAt: null };
  return { remaining: Math.max(0, target - now), syncedAt: now };
}
function safeEmit(eventName, schema, args, emit) {
  const result = schema.safeParse(args);
  if (!result.success) {
    if (typeof console !== "undefined") {
      console.warn(
        `[analytics] dropped ${eventName}: invalid payload`,
        result.error.flatten().fieldErrors
      );
    }
    return;
  }
  try {
    emit(result.data);
  } catch (err) {
    if (typeof console !== "undefined") {
      console.warn(`[analytics] emit threw for ${eventName}`, err);
    }
  }
}
const Slug = stringType().min(1).max(80).regex(/^[a-z0-9-]+$/, "lowercase slug");
const NonNegInt = numberType().int().min(0).max(1e4);
const PositiveMs = numberType().finite().min(0).max(7 * 24 * 60 * 60 * 1e3);
const UrgencyTarget = enumType(["readiness_assessment", "whatsapp_counsellor"]);
objectType({
  cohortId: Slug,
  daysToClose: NonNegInt,
  hoursToClose: numberType().int().min(0).max(23),
  counsellorsOnline: booleanType(),
  seatsLabel: stringType().min(1).max(64).optional(),
  closed: booleanType()
});
objectType({
  target: UrgencyTarget,
  cohortId: Slug,
  daysToClose: NonNegInt,
  hoursToClose: numberType().int().min(0).max(23)
});
const CouponLowTimeSchema = objectType({
  intentId: stringType().uuid(),
  tier: enumType(["essential", "career", "elite"]),
  remainingMs: PositiveMs
});
function trackUrgencyCouponLowTime(args) {
  safeEmit("urgency_coupon_low_time", CouponLowTimeSchema, args, (a) => {
    track("urgency_coupon_low_time", {
      program_slug: a.tier,
      props: {
        intent_id: a.intentId,
        tier: a.tier,
        remaining_ms: a.remainingMs
      }
    });
  });
}
const STORAGE_KEY = "arzonprime60.session.v1";
const INTENT_KEY_PREFIX = "arzonprime60.intent.v1.";
function readSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.expiresAt) return null;
    return parsed;
  } catch {
    return null;
  }
}
function recordPrime60Window(session) {
  if (typeof window === "undefined") return;
  try {
    const existing = readSession();
    const next = existing && new Date(existing.expiresAt).getTime() > new Date(session.expiresAt).getTime() ? existing : session;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("arzonprime60:changed"));
  } catch {
  }
}
const intentKey = (intentId) => `${INTENT_KEY_PREFIX}${intentId}`;
function readIntentExpiry(intentId) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(intentKey(intentId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.expiresAt || !parsed?.couponCode) return null;
    return parsed;
  } catch {
    return null;
  }
}
function recordIntentExpiry(intentId, entry) {
  if (typeof window === "undefined") return;
  try {
    const existing = readIntentExpiry(intentId);
    let next = entry;
    if (existing && existing.couponCode === entry.couponCode) {
      const a = new Date(existing.expiresAt).getTime();
      const b = new Date(entry.expiresAt).getTime();
      next = a <= b ? existing : entry;
    }
    window.localStorage.setItem(intentKey(intentId), JSON.stringify(next));
  } catch {
  }
}
function clearIntentExpiry(intentId) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(intentKey(intentId));
  } catch {
  }
}
function resolvePersistentExpiry(intentId, couponCode, serverExpiresAt) {
  if (!couponCode) return serverExpiresAt;
  const stored = readIntentExpiry(intentId);
  const sameCoupon = stored?.couponCode === couponCode;
  if (!serverExpiresAt) return sameCoupon ? stored?.expiresAt ?? null : null;
  if (sameCoupon && stored) {
    const a = new Date(stored.expiresAt).getTime();
    const b = new Date(serverExpiresAt).getTime();
    return a <= b ? stored.expiresAt : serverExpiresAt;
  }
  return serverExpiresAt;
}
const Accordion = Root2$1;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2$1,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2$1.displayName;
function WhatYouGet() {
  const items = [
    {
      icon: GraduationCap,
      label: "Live Mentor Sessions (8 Weeks)",
      desc: "Interactive live classes with Senior PV & Medical Coding leads"
    },
    {
      icon: Briefcase,
      label: "Real-Data Capstone Projects",
      desc: "Work on live anonymized medical charts & safety reports"
    },
    {
      icon: FileCheckCorner,
      label: "Verifiable Internship Credential",
      desc: "ISO 9001 certified completion & QR-verified credential"
    },
    {
      icon: BrainCircuit,
      label: "24×7 AI Learning Portal Access",
      desc: "Unlimited practice labs & medical coding question bank"
    },
    {
      icon: FileText,
      label: "Recruiter-Ready ATS Resume Rebuild",
      desc: "Custom resume & LinkedIn optimization by hiring leads"
    },
    {
      icon: Target,
      label: "Direct Hiring Partner Referrals",
      desc: "Direct interview scheduling with Optum, Omega & Access"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 space-y-6 text-white shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] font-bold uppercase tracking-widest text-sky-400", children: "INCLUDED PROGRAMME INFRASTRUCTURE" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-sans text-2xl font-bold text-slate-50 tracking-tight", children: "Everything that unlocks upon payment confirmation" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3.5 sm:grid-cols-2", children: items.map(({ icon: Icon, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 transition-all hover:border-slate-700",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sky-400 border border-blue-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-slate-100 leading-snug", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 leading-relaxed font-medium", children: desc })
          ] })
        ]
      },
      label
    )) })
  ] });
}
function AfterPaymentTimeline() {
  const steps = [
    {
      icon: CreditCard,
      title: "Payment Verified",
      sub: "Instant digital receipt & GST tax invoice issued to your email"
    },
    {
      icon: MessageCircle,
      title: "Admissions Orientation",
      sub: "Academic counsellor outreach on WhatsApp within 30 minutes"
    },
    {
      icon: Monitor,
      title: "Portal Credential Provisioning",
      sub: "Personal LMS login, courseware & ACRI skill radar unlocked"
    },
    {
      icon: CalendarCheck,
      title: "Cohort Allocation",
      sub: "Live batch schedule, team assignment & mentor pairing locked"
    },
    {
      icon: Rocket,
      title: "Programme Kickoff",
      sub: "First live mentor class & hands-on capstone project launch"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 space-y-6 text-white shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] font-bold uppercase tracking-widest text-sky-400", children: "FIRST 72 HOURS ROADMAP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-sans text-2xl font-bold text-slate-50 tracking-tight", children: "What happens immediately after payment" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-4", children: steps.map((s, i) => {
      const isLast = i === steps.length - 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sky-400 border border-blue-500/20 font-bold font-mono text-xs", children: i + 1 }),
          !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "mt-2 h-6 w-px bg-slate-800" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 pt-0.5 space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-slate-100 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 leading-relaxed font-medium", children: s.sub })
        ] })
      ] }, s.title);
    }) })
  ] });
}
function TrustStrip() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-slate-800 bg-[#0F172A] p-6 text-center space-y-4 text-white shadow-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 text-amber-400", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-amber-400 text-amber-400", "aria-hidden": true }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-sans text-lg font-bold text-slate-100 tracking-tight", children: "Trusted by pharmacy & engineering candidates across India" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 leading-relaxed max-w-lg mx-auto font-medium", children: "Processed via Razorpay Payments · PCI-DSS Level 1 Compliant · 256-bit TLS Encrypted Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-amber-400" }),
        " TLS Encrypted"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5 text-sky-400" }),
        " Official GST Invoice"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-emerald-400" }),
        " ISO 9001 Issuer"
      ] })
    ] })
  ] });
}
function RoiCalculator({
  totalInr,
  monthlySalaryInr = 26667
}) {
  const dailySalary = monthlySalaryInr / 30;
  const days = Math.max(1, Math.ceil(totalInr / dailySalary));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-slate-800 bg-[#0F172A] p-6 space-y-2.5 text-white shadow-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-amber-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-sans text-base font-bold text-slate-100 tracking-tight", children: "Career Investment ROI Benchmark" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-300 leading-relaxed font-medium", children: [
      "Based on an average entry placement salary of",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "font-mono text-amber-300 font-bold", children: [
        formatInr(monthlySalaryInr),
        "/month"
      ] }),
      ", your programme fee of",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-mono text-slate-100 font-bold", children: formatInr(totalInr) }),
      " is recovered in approximately",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "font-mono text-emerald-400 text-xs font-bold", children: [
        days,
        " working days"
      ] }),
      "."
    ] })
  ] });
}
function PayFaq() {
  const faqs = [
    {
      q: "When do I get access to the curriculum & live sessions?",
      a: "Instant access to portal courseware is granted as soon as payment clears. Your counsellor will onboard you into the live cohort workspace within 30 minutes."
    },
    {
      q: "Can I upgrade my tier later?",
      a: "Yes, you can upgrade to a higher tier or add 1-on-1 mentorship sessions at any point during weeks 1 to 4 by paying the price difference."
    },
    {
      q: "What payment options are supported?",
      a: "We support UPI (GPay, PhonePe, Paytm, BHIM), all major Indian Credit/Debit cards, Net Banking across 50+ banks, and popular Wallets via Razorpay."
    },
    {
      q: "How do I receive my official tax receipt?",
      a: "An official GST tax invoice with full payment breakdown is automatically generated and emailed to your registered address upon checkout completion."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 space-y-4 text-white shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] font-bold uppercase tracking-widest text-sky-400", children: "ASSURANCE & CLARITY" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-sans text-2xl font-bold text-slate-50 tracking-tight", children: "Frequently Asked Checkout Questions" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `faq-${i}`, className: "border-b border-slate-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-left font-sans text-sm font-bold text-slate-200 hover:no-underline py-3.5", children: faq.q }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-xs text-slate-400 leading-relaxed pb-4 font-medium", children: faq.a })
    ] }, i)) })
  ] });
}
function FinalCtaBlock({
  totalInr,
  paying,
  disabled,
  onPay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-6 sm:p-8 space-y-4 text-center text-white shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-sans text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight", children: "Confirm & launch your career transition" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-300 max-w-md mx-auto leading-relaxed font-medium", children: [
      "Complete your payment now for",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-mono text-white text-sm font-bold", children: formatInr(totalInr) }),
      ". Admissions onboarding starts immediately."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onPay,
        disabled: disabled || paying,
        style: { color: "#FFFFFF" },
        className: "w-full sm:w-auto px-8 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-900/40 transition-all cursor-pointer disabled:opacity-60",
        children: paying ? "Opening Checkout…" : `1-Click Pay ${formatInr(totalInr)} →`
      }
    ) })
  ] });
}
const AlertDialog = Root2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-[#0a0c10]/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
function EnrolPay() {
  const initial = Route$l.useLoaderData();
  const {
    tier
  } = Route$l.useParams();
  const {
    t: token
  } = Route$l.useSearch();
  const navigate = useNavigate();
  const applyCoupon = useServerFn(applyEnrolmentCoupon);
  const createOrder = useServerFn(createRazorpayOrder);
  const expireCoupon = useServerFn(expireEnrolmentCoupon);
  const getIntent = useServerFn(getEnrolmentIntent);
  const markPrereg = useServerFn(markPreRegistrationInitiated);
  const [intent, setIntent] = reactExports.useState(initial);
  const [showCouponInput, setShowCouponInput] = reactExports.useState(false);
  const [code, setCode] = reactExports.useState("");
  const [applying, setApplying] = reactExports.useState(false);
  const [removing, setRemoving] = reactExports.useState(false);
  const [removeError, setRemoveError] = reactExports.useState(null);
  const [confirmRemoveOpen, setConfirmRemoveOpen] = reactExports.useState(false);
  const [paying, setPaying] = reactExports.useState(false);
  const [couponError, setCouponError] = reactExports.useState(null);
  const [payError, setPayError] = reactExports.useState(null);
  const [checkingStatus, setCheckingStatus] = reactExports.useState(false);
  const [expired, setExpired] = reactExports.useState(false);
  const [expiredAck, setExpiredAck] = reactExports.useState(false);
  const [expireSyncError, setExpireSyncError] = reactExports.useState(false);
  const [preregLocked, setPreregLocked] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!initial.paidAt && initial.status !== "paid" && !preregLocked) {
        navigator.sendBeacon("/api/public/hooks/payment-recovery", JSON.stringify({
          intentId: initial.id
        }));
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [initial.id, initial.paidAt, initial.status, preregLocked]);
  const [preregBalanceDueAt, setPreregBalanceDueAt] = reactExports.useState(initial.balanceDueAt ?? null);
  const [preregLockedAmountInr, setPreregLockedAmountInr] = reactExports.useState(initial.preRegistrationAmountInr ?? null);
  const [preregLockedBalanceInr, setPreregLockedBalanceInr] = reactExports.useState(initial.balanceDueInr ?? null);
  const [preregBusy, setPreregBusy] = reactExports.useState(false);
  const hadCouponRef = reactExports.useRef(!!initial.couponCode);
  reactExports.useEffect(() => {
    if (!isTier(tier)) return;
    enrolProgressStore.set({
      intentId: intent.id,
      intentToken: token,
      tier,
      step: intent.status === "paid" ? "confirmed" : "payment",
      contact: {
        name: intent.name,
        email: intent.email,
        phone: intent.phone
      },
      coupon: intent.couponCode && intent.couponExpiresAt ? {
        code: intent.couponCode,
        appliedAt: (/* @__PURE__ */ new Date()).toISOString(),
        expiresAt: intent.couponExpiresAt
      } : void 0
    });
  }, [intent.id, intent.status, intent.couponCode, intent.couponExpiresAt, intent.name, intent.email, intent.phone, tier, token]);
  reactExports.useEffect(() => {
    if (initial.preRegistrationInitiatedAt && !initial.paidAt) {
      setPreregLocked(true);
    }
  }, [initial.preRegistrationInitiatedAt, initial.paidAt]);
  const meta = isTier(tier) ? TIER_META[tier] : TIER_META.career;
  const effectiveExpiresAt = intent.couponCode ? resolvePersistentExpiry(intent.id, intent.couponCode, intent.couponExpiresAt) : intent.couponExpiresAt;
  const {
    remaining,
    syncedAt
  } = useCountdownWithSync(effectiveExpiresAt);
  reactExports.useEffect(() => {
    if (intent.couponCode && intent.couponExpiresAt) {
      recordIntentExpiry(intent.id, {
        couponCode: intent.couponCode,
        expiresAt: intent.couponExpiresAt
      });
    } else if (!intent.couponCode) {
      clearIntentExpiry(intent.id);
    }
  }, [intent.id, intent.couponCode, intent.couponExpiresAt]);
  const couponActive = !!intent.couponCode && remaining > 0 && intent.finalPriceInr != null;
  const couponJustExpired = !!intent.couponCode && remaining === 0;
  reactExports.useEffect(() => {
    if (intent.couponCode) hadCouponRef.current = true;
  }, [intent.couponCode]);
  reactExports.useEffect(() => {
    if (hadCouponRef.current && remaining === 0 && !expired) {
      setExpired(true);
    }
  }, [remaining, expired]);
  const expireFiredRef = reactExports.useRef(false);
  const tryExpire = reactExports.useCallback(async () => {
    try {
      const refreshed = await expireCoupon({
        data: {
          intentId: intent.id,
          intentToken: token
        }
      });
      setIntent(refreshed);
      setExpireSyncError(false);
    } catch (err) {
      console.error("[expireCoupon]", err);
      setIntent((prev) => ({
        ...prev,
        couponCode: null,
        couponExpiresAt: null,
        discountPct: null,
        finalPriceInr: null,
        status: "started"
      }));
      setExpireSyncError(true);
      track("coupon_expire_sync_failed", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          message: err instanceof Error ? err.message : String(err)
        }
      });
    }
  }, [expireCoupon, intent.id, tier, token]);
  reactExports.useEffect(() => {
    if (couponJustExpired && !expireFiredRef.current) {
      expireFiredRef.current = true;
      track("coupon_expired", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          code: intent.couponCode
        }
      });
      if (intent.couponCode?.toUpperCase() === "ARZONPRIME60") {
        track("prime60_countdown_expired", {
          program_slug: tier,
          props: {
            intent_id: intent.id,
            expires_at: intent.couponExpiresAt
          }
        });
      }
      void tryExpire();
    }
  }, [couponJustExpired]);
  const total = couponActive && intent.finalPriceInr != null ? intent.finalPriceInr : intent.basePriceInr;
  const discount = intent.basePriceInr - total;
  const onRemoveCoupon = async () => {
    if (removing || paying) return;
    const previousCode = intent.couponCode;
    setRemoving(true);
    setRemoveError(null);
    try {
      const refreshed = await expireCoupon({
        data: {
          intentId: intent.id,
          intentToken: token
        }
      });
      setIntent(refreshed);
      setCode("");
      setCouponError(null);
      setExpired(false);
      setExpiredAck(false);
      setExpireSyncError(false);
      hadCouponRef.current = false;
      expireFiredRef.current = false;
      track("coupon_removed", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          code: previousCode,
          result: "success",
          was_expired: expired
        }
      });
      setConfirmRemoveOpen(false);
      toast.success("Coupon removed", {
        description: previousCode ? `${previousCode} is no longer applied.` : void 0
      });
    } catch (err) {
      console.error("[removeCoupon]", err);
      const message = err instanceof Error ? err.message : String(err);
      const reason = classifyRemoveError(message);
      setRemoveError("Couldn't remove the code. Try again.");
      toast.error("Couldn't remove coupon", {
        description: "Please try again."
      });
      track("coupon_remove_failed", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          code: previousCode,
          result: "error",
          reason,
          message: message.slice(0, 200),
          was_expired: expired
        }
      });
    } finally {
      setRemoving(false);
    }
  };
  const onApplyCoupon = async (e) => {
    e.preventDefault();
    const validationError = validateCouponInput(code);
    if (validationError) {
      setCouponError(validationError);
      return;
    }
    setApplying(true);
    setCouponError(null);
    try {
      const res = await applyCoupon({
        data: {
          intentId: intent.id,
          intentToken: token,
          code
        }
      });
      if (!res.ok) {
        const msg = friendlyCouponError(res.error);
        setCouponError(msg);
        toast.error("Couldn't apply coupon", {
          description: msg
        });
      } else {
        setIntent((prev) => ({
          ...prev,
          ...intent,
          couponCode: res.couponCode,
          discountPct: res.discountPct,
          couponExpiresAt: res.couponExpiresAt,
          status: res.status,
          finalPriceInr: res.finalPriceInr
        }));
        hadCouponRef.current = true;
        setExpired(false);
        setExpiredAck(false);
        setExpireSyncError(false);
        if (res.couponCode?.toUpperCase() === "ARZONPRIME60") {
          recordPrime60Window({
            expiresAt: res.couponExpiresAt,
            email: intent.email,
            intentId: intent.id
          });
        }
        track("coupon_applied", {
          program_slug: tier,
          props: {
            intent_id: intent.id,
            code: res.couponCode,
            final_price: res.finalPriceInr
          }
        });
        toast.success("Coupon applied", {
          description: res.couponCode ? `${res.couponCode} · New total ${formatInr(res.finalPriceInr ?? intent.basePriceInr)}` : void 0
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? friendlyCouponError(err.message) : "Could not apply code.";
      setCouponError(msg);
      toast.error("Couldn't apply coupon", {
        description: msg
      });
    } finally {
      setApplying(false);
    }
  };
  const onPay = async () => {
    let outcomeFired = false;
    const fireOutcome = (result, extra = {}) => {
      if (outcomeFired) return;
      outcomeFired = true;
      track("pay_click_outcome", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          tier,
          amount_inr: total,
          coupon: couponActive ? intent.couponCode : null,
          result,
          ...extra
        }
      });
    };
    if (prime60Expired) {
      setPayError({
        title: "ARZONPRIME60 offer expired",
        message: "Your 60-minute window has ended, so checkout at this price is no longer available.",
        retry: "Message your counsellor on WhatsApp to discuss next steps or re-issue an offer.",
        canRetry: false,
        contactSupport: true
      });
      fireOutcome("blocked_prime60_expired");
      return;
    }
    setPaying(true);
    setPayError(null);
    const couponForEvent = couponActive ? intent.couponCode : null;
    track("checkout_started", {
      program_slug: tier,
      props: {
        intent_id: intent.id,
        tier,
        amount_inr: total,
        coupon: couponForEvent
      }
    });
    try {
      const order = await createOrder({
        data: {
          intentId: intent.id,
          intentToken: token
        }
      });
      if (!order.ok) {
        if (order.code === "coupon_expired") {
          const expiredCode = order.couponCode ?? intent.couponCode ?? "Your";
          setIntent((prev) => ({
            ...prev,
            // Snap the timer to 0 so the live countdown reflects reality.
            couponExpiresAt: order.couponExpiresAt ?? (/* @__PURE__ */ new Date(0)).toISOString()
          }));
          setExpired(true);
          setExpiredAck(false);
          setPayError({
            title: `${expiredCode} coupon expired`,
            message: "We checked with our server and your coupon window had already ended, so we did not create a payment order. No money was charged.",
            retry: expiredCode.toUpperCase() === "ARZONPRIME60" ? "This offer can't be reused. Message your counsellor on WhatsApp for next steps." : `Continue at the regular price of ₹${order.basePriceInr?.toLocaleString("en-IN") ?? intent.basePriceInr.toLocaleString("en-IN")} or contact your counsellor.`,
            canRetry: false,
            contactSupport: true
          });
          track("coupon_expired_at_checkout", {
            program_slug: tier,
            props: {
              intent_id: intent.id,
              tier,
              coupon: expiredCode,
              base_price_inr: order.basePriceInr ?? intent.basePriceInr
            }
          });
          track("payment_failure", {
            program_slug: tier,
            props: {
              intent_id: intent.id,
              tier,
              coupon: expiredCode,
              stage: "order_create",
              error: "coupon_expired"
            }
          });
          void tryExpire();
          fireOutcome("coupon_expired_server");
          setPaying(false);
          return;
        }
        if (order.code === "cohort_locked") {
          setPayError({
            title: `${order.cohortLabel} cohort is locked`,
            message: "All seats for this cohort are taken or the lock window has closed. We did not create a payment order, so nothing was charged.",
            retry: "Tap below to join the WhatsApp waitlist for the next batch.",
            canRetry: false,
            contactSupport: true,
            waitlistUrl: order.waitlistUrl
          });
          try {
            const {
              trackCohort
            } = await import("./cohortAnalytics-kVJz8ZIv.mjs");
            trackCohort("checkout_blocked_locked", {
              cohort_label: order.cohortLabel,
              tier,
              intent_id: intent.id
            });
          } catch {
          }
          track("payment_failure", {
            program_slug: tier,
            props: {
              intent_id: intent.id,
              tier,
              coupon: couponForEvent,
              stage: "order_create",
              error: "cohort_locked"
            }
          });
          fireOutcome("cohort_locked");
          setPaying(false);
          return;
        }
        setPayError(mapServerOrderError(order.error));
        track("payment_failure", {
          program_slug: tier,
          props: {
            intent_id: intent.id,
            tier,
            coupon: couponForEvent,
            stage: "order_create",
            error: order.error
          }
        });
        fireOutcome("order_create_failed", {
          error: order.error
        });
        setPaying(false);
        return;
      }
      track("payment_started", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          amount_inr: total,
          order_id: order.orderId
        }
      });
      fireOutcome("order_created", {
        order_id: order.orderId
      });
      await openRazorpayCheckout({
        keyId: order.keyId,
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "Arzon Global",
        description: `${meta.name} programme enrolment`,
        prefill: {
          name: order.name,
          email: order.email,
          contact: order.phone
        },
        notes: {
          intent_id: intent.id,
          tier
        },
        themeColor: "#3B82F6",
        onSuccess: async (resp) => {
          try {
            const verifyRes = await fetch("/api/public/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                intent_id: intent.id,
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_signature: resp.razorpay_signature
              })
            });
            const verified = await verifyRes.json();
            if (!verified.ok) {
              setPayError({
                title: "Payment received — verification pending",
                message: "Your payment went through, but we couldn't verify it automatically. Don't pay again.",
                retry: "Your counsellor will confirm enrolment within a few minutes on WhatsApp.",
                canRetry: false,
                contactSupport: true
              });
              track("payment_failure", {
                program_slug: tier,
                props: {
                  intent_id: intent.id,
                  tier,
                  coupon: couponForEvent,
                  order_id: order.orderId,
                  payment_id: resp.razorpay_payment_id,
                  stage: "verify",
                  error: verified.error ?? "verify_failed"
                }
              });
              setPaying(false);
              return;
            }
            track("enrol_paid", {
              program_slug: tier,
              props: {
                intent_id: intent.id,
                amount_inr: total,
                payment_id: resp.razorpay_payment_id,
                coupon: couponForEvent
              }
            });
            track("payment_success", {
              program_slug: tier,
              props: {
                intent_id: intent.id,
                tier,
                amount_inr: total,
                coupon: couponForEvent,
                order_id: order.orderId,
                payment_id: resp.razorpay_payment_id
              }
            });
            if (couponForEvent?.toUpperCase() === "ARZONPRIME60") {
              track("prime60_checkout_success", {
                program_slug: tier,
                props: {
                  intent_id: intent.id,
                  tier,
                  amount_inr: total,
                  base_price_inr: intent.basePriceInr,
                  discount_inr: discount,
                  order_id: order.orderId,
                  payment_id: resp.razorpay_payment_id,
                  remaining_ms_at_pay: remaining
                }
              });
            }
            navigate({
              to: "/enrol/success",
              search: {
                intent: intent.id,
                t: token
              }
            });
          } catch (err) {
            console.error("[verify] error", err);
            setPayError({
              title: "Payment received — verification failed",
              message: "We received your payment but verification didn't complete. Please do not retry payment.",
              retry: "Your counsellor will confirm your enrolment shortly on WhatsApp.",
              canRetry: false,
              contactSupport: true
            });
            track("payment_failure", {
              program_slug: tier,
              props: {
                intent_id: intent.id,
                tier,
                coupon: couponForEvent,
                order_id: order.orderId,
                stage: "verify_exception",
                error: err instanceof Error ? err.message : "unknown"
              }
            });
            setPaying(false);
          }
        },
        onDismiss: () => {
          track("payment_cancelled", {
            program_slug: tier,
            props: {
              intent_id: intent.id,
              order_id: order.orderId
            }
          });
          setPaying(false);
        },
        onFailed: (err) => {
          console.warn("[razorpay] payment.failed", err);
          track("payment_failed", {
            program_slug: tier,
            props: {
              intent_id: intent.id,
              order_id: order.orderId,
              code: err.code,
              reason: err.reason,
              source: err.source,
              step: err.step
            }
          });
          track("payment_failure", {
            program_slug: tier,
            props: {
              intent_id: intent.id,
              tier,
              coupon: couponForEvent,
              order_id: order.orderId,
              stage: "razorpay_modal",
              code: err.code,
              reason: err.reason,
              source: err.source,
              step: err.step
            }
          });
          setPayError(mapPaymentFailed(err));
          setPaying(false);
        }
      });
      track("razorpay_modal_opened", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          tier,
          amount_inr: total,
          coupon: couponForEvent,
          order_id: order.orderId
        }
      });
    } catch (err) {
      console.error("[pay] error", err);
      setPayError(mapServerOrderError(err instanceof Error ? err.message : "Could not start payment."));
      track("payment_failure", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          tier,
          coupon: couponForEvent,
          stage: "checkout_open",
          error: err instanceof Error ? err.message : "unknown"
        }
      });
      const msg = err instanceof Error ? err.message : "unknown";
      fireOutcome(msg.toLowerCase().includes("razorpay") || msg.toLowerCase().includes("script") ? "script_load_failed" : "checkout_open_exception", {
        error: msg
      });
      setPaying(false);
    }
  };
  const lowTime = remaining > 0 && remaining < 10 * 60 * 1e3;
  reactExports.useCallback(async () => {
    if (checkingStatus) return;
    setCheckingStatus(true);
    try {
      const refreshed = await getIntent({
        data: {
          intentId: intent.id,
          intentToken: token
        }
      });
      track("pay_status_recheck", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          status: refreshed.status,
          paid: !!refreshed.paidAt
        }
      });
      if (refreshed.paidAt || refreshed.status === "paid") {
        navigate({
          to: "/enrol/success",
          search: {
            intent: intent.id,
            t: token
          }
        });
        return;
      }
      setIntent(refreshed);
      toast.message("No payment recorded yet", {
        description: "If you completed payment, your counsellor will confirm on WhatsApp within a few minutes."
      });
    } catch (err) {
      console.error("[checkStatus]", err);
      toast.error("Couldn't check payment status", {
        description: "Please try again or message your counsellor on WhatsApp."
      });
    } finally {
      setCheckingStatus(false);
    }
  }, [checkingStatus, getIntent, intent.id, navigate, tier, token]);
  const prime60Expired = intent.couponCode?.toUpperCase() === "ARZONPRIME60" && remaining === 0;
  const payLocked = prime60Expired || expired && !expiredAck;
  const preregBalance = Math.max(0, total - PREREG_AMOUNT_INR);
  const preregDueRemaining = useCountdown(preregBalanceDueAt);
  const preregWindowExpired = !!preregBalanceDueAt && preregDueRemaining === 0;
  const preregEligible = !payLocked && total > PREREG_AMOUNT_INR && !preregWindowExpired;
  const onPrereg = reactExports.useCallback(async () => {
    if (preregBusy || preregLocked || !preregEligible) return;
    setPreregBusy(true);
    try {
      let freshTotal = total;
      let freshBalance = preregBalance;
      try {
        const fresh = await getIntent({
          data: {
            intentId: intent.id,
            intentToken: token
          }
        });
        setIntent(fresh);
        const couponStillActive = !!fresh.couponCode && fresh.finalPriceInr != null && (!fresh.couponExpiresAt || new Date(fresh.couponExpiresAt).getTime() > Date.now());
        freshTotal = couponStillActive && fresh.finalPriceInr != null ? fresh.finalPriceInr : fresh.basePriceInr;
        freshBalance = Math.max(0, freshTotal - PREREG_AMOUNT_INR);
        if (freshTotal <= PREREG_AMOUNT_INR) {
          toast.error("Seat-lock unavailable", {
            description: "Your current total is at or below the pre-registration amount. Please pay in full."
          });
          return;
        }
      } catch (refreshErr) {
        console.error("[prereg] refresh failed", refreshErr);
        toast.error("Couldn't verify latest price", {
          description: "Please refresh the page and try again."
        });
        return;
      }
      const res = await markPrereg({
        data: {
          intentId: intent.id,
          intentToken: token,
          preregAmountInr: PREREG_AMOUNT_INR,
          balanceInr: freshBalance
        }
      });
      if (!res.ok) {
        toast.error("Couldn't lock your seat", {
          description: res.error
        });
        track("payment_prereg_click", {
          program_slug: tier,
          props: {
            intent_id: intent.id,
            tier,
            coupon: couponActive ? intent.couponCode : null,
            prereg_amount_inr: PREREG_AMOUNT_INR,
            balance_due_inr: freshBalance,
            result: "server_error"
          }
        });
        return;
      }
      setPreregLocked(true);
      setPreregBalanceDueAt(res.balanceDueAt);
      setPreregLockedAmountInr(res.preRegistrationAmountInr);
      setPreregLockedBalanceInr(res.balanceDueInr);
      track("payment_prereg_click", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          tier,
          coupon: couponActive ? intent.couponCode : null,
          prereg_amount_inr: PREREG_AMOUNT_INR,
          balance_due_inr: freshBalance,
          balance_due_at: res.balanceDueAt,
          result: "opened"
        }
      });
      if (typeof window !== "undefined") {
        window.open(PREREG_URL, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      console.error("[prereg]", err);
      toast.error("Couldn't lock your seat", {
        description: "Please try again or message your counsellor on WhatsApp."
      });
    } finally {
      setPreregBusy(false);
    }
  }, [preregBusy, preregLocked, preregEligible, markPrereg, getIntent, intent.id, intent.couponCode, token, preregBalance, total, tier, couponActive]);
  const payBtnRef = reactExports.useRef(null);
  const expiredClickAtRef = reactExports.useRef(0);
  reactExports.useCallback((surface) => {
    if (!payLocked) return;
    const now = Date.now();
    if (now - expiredClickAtRef.current < 750) return;
    expiredClickAtRef.current = now;
    track("arzonprime60_expired_claim_click", {
      program_slug: tier,
      props: {
        surface,
        tier,
        intent_id: intent.id,
        coupon: intent.couponCode ?? null,
        reason: prime60Expired ? "prime60_expired" : "coupon_expired",
        remaining_ms: remaining,
        ack: expiredAck
      }
    });
  }, [payLocked, tier, intent.id, intent.couponCode, prime60Expired, remaining, expiredAck]);
  const lowTimeFiredRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!couponActive || !lowTime || lowTimeFiredRef.current) return;
    if (!isTier(tier)) return;
    lowTimeFiredRef.current = true;
    trackUrgencyCouponLowTime({
      intentId: intent.id,
      tier,
      remainingMs: remaining
    });
  }, [couponActive, lowTime, tier, intent.id, remaining]);
  reactExports.useEffect(() => {
    if (!couponActive) return;
    if (intent.couponCode?.toUpperCase() !== "ARZONPRIME60") return;
    if (remaining <= 0) return;
    if (!isTier(tier)) return;
    if (typeof window === "undefined") return;
    const key = `prime60.started.${intent.id}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
    }
    track("prime60_countdown_started", {
      program_slug: tier,
      props: {
        intent_id: intent.id,
        expires_at: intent.couponExpiresAt,
        remaining_ms: remaining,
        final_price: intent.finalPriceInr
      }
    });
  }, [couponActive, intent.couponCode, intent.couponExpiresAt, intent.finalPriceInr, intent.id, remaining, tier]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0B0F17] text-white p-4 sm:p-6 lg:p-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1728px] w-full space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold uppercase tracking-wider text-sky-400", children: "Step 2 of 2 · Secure Tuition Investment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-50 tracking-tight", children: "Confirm & Launch Your Transition" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-sky-400 border border-slate-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-sky-400" }),
            "MCA & MSME Verified Portal"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-300 leading-relaxed font-medium", children: [
          "Welcome,",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-slate-100 font-bold", children: intent.name.split(" ")[0] }),
          ". Review your order details below and complete payment securely via Razorpay."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.4fr_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-blue-500/40 bg-[#0F172A] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-5 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-bold uppercase tracking-wider", children: "🔥 MOST POPULAR CHOICE · SEAT RESERVATION" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-sans text-2xl sm:text-3xl font-bold text-slate-50 mt-2 tracking-tight", children: [
                  "Lock Your Cohort Seat for",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-extrabold font-mono", children: "₹1,000" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 font-mono text-xs font-bold text-amber-300", children: "⚡ Guaranteed Batch Spot" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs sm:text-sm text-slate-300 leading-relaxed font-medium", children: [
              "Don't want to pay full tuition today? Pay just",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-slate-100 font-mono font-bold", children: "₹1,000" }),
              " now to secure your seat and lock the current",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-amber-300 font-bold", children: formatInr(total) }),
              " tuition rate. Pay the remaining balance of",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-sky-300 font-mono font-bold", children: formatInr(preregBalance) }),
              " ",
              "within 7 days."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-2 font-mono text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Today's Reservation Fee:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-amber-400", children: "₹1,000" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Remaining Balance Due (7 Days):" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-200", children: formatInr(preregBalance) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-400 pt-1 border-t border-slate-800", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Tuition (No Extra Fees):" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatInr(total) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onPrereg, disabled: !preregEligible || preregBusy, style: {
              color: "#FFFFFF"
            }, className: "w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60", children: preregBusy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 motion-safe:animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reserving Seat…" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-sky-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reserve Seat Now for ₹1,000" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 text-white" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] font-bold uppercase tracking-widest text-sky-400", children: "Tuition Investment Breakdown" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-sans text-2xl font-bold text-slate-50 mt-0.5 tracking-tight", children: meta.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1 font-mono text-xs font-bold text-sky-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-sky-400" }),
                " Server Verified"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `${meta.name} programme standard tuition`, value: formatInr(intent.basePriceInr), strike: couponActive }),
              couponActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Scholarship / Coupon (${intent.couponCode})`, value: `−${formatInr(Math.max(0, intent.basePriceInr - total))}`, accent: "text-amber-300 font-bold" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-3 h-px bg-slate-800" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Total Payable Tuition", value: formatInr(total), bold: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "pt-2 text-xs text-slate-400 leading-relaxed font-medium", children: [
                "You'll be charged exactly",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-mono text-slate-100 font-bold", children: formatInr(total) }),
                " ",
                "on the next screen via Razorpay. Official GST tax invoice and instant receipt issued upon confirmation."
              ] })
            ] }),
            payError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "alert", "aria-live": "assertive", className: "rounded-2xl border border-rose-500/50 bg-rose-950/60 p-4 text-sm text-rose-200 space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-5 w-5 shrink-0 text-rose-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-rose-100", children: payError.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-200", children: payError.message }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-300 font-medium", children: payError.retry })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", ref: payBtnRef, onClick: onPay, disabled: payLocked || paying, style: {
                color: "#FFFFFF"
              }, className: "w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60", children: paying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 motion-safe:animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Opening Secure Razorpay Gateway…" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5 text-amber-300" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Complete Enrolment — Pay ",
                  formatInr(total)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 text-white" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-xs text-slate-300 px-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-amber-400" }),
                  " 256-Bit TLS Secured"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Razorpay Payments · UPI, Cards, NetBanking" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-white/10", children: couponActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-blue-500/30 bg-blue-950/40 p-4 flex items-center justify-between text-xs text-blue-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4.5 w-4.5 text-blue-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Coupon ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white font-mono", children: intent.couponCode }),
                  " ",
                  "applied (save ",
                  formatInr(discount),
                  ")"
                ] })
              ] }),
              !paying && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setConfirmRemoveOpen(true), className: "text-xs font-semibold text-rose-300 hover:underline", children: "Remove" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setShowCouponInput((v) => !v), className: "text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 text-amber-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: showCouponInput ? "Hide promo code input" : "Have a promo / counsellor code?" })
              ] }),
              showCouponInput && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onApplyCoupon, className: "mt-3 flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: code, onChange: (e) => setCode(e.target.value.toUpperCase()), placeholder: "ENTER CODE", className: "h-11 flex-1 rounded-xl border border-slate-700 bg-white/[0.04] px-3.5 text-xs font-mono text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: applying || code.trim().length < 3, className: "h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md disabled:opacity-50", children: applying ? "Applying…" : "Apply" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WhatYouGet, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AfterPaymentTimeline, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6 lg:sticky lg:top-6 lg:self-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoiCalculator, { totalInr: total }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrustStrip, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PayFaq, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FinalCtaBlock, { totalInr: total, paying, disabled: payLocked, onPay })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: confirmRemoveOpen, onOpenChange: (open) => {
      if (removing) return;
      setConfirmRemoveOpen(open);
      if (!open) setRemoveError(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: expired ? "This coupon has already expired" : "Remove this coupon?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: expired ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "The",
          " ",
          intent.couponCode ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold", children: intent.couponCode }) : "discount",
          " ",
          "window ran out, so the discount is no longer active and your total is already back to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formatInr(intent.basePriceInr) }),
          ". Clearing it just removes the expired badge — your payment amount won't change."
        ] }) : intent.couponCode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold", children: intent.couponCode }),
          " will be removed and your total will go back to",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formatInr(intent.basePriceInr) }),
          ". You can re-apply a code afterwards."
        ] }) : "The applied coupon will be removed and your total will go back to the original price." })
      ] }),
      removeError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", "aria-live": "polite", className: "text-xs text-danger", children: removeError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: removing, children: expired ? "Close" : "Keep coupon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { disabled: removing, onClick: (e) => {
          e.preventDefault();
          void onRemoveCoupon();
        }, children: removing ? "Removing…" : expired ? "Clear expired coupon" : "Remove coupon" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center", theme: "dark" })
  ] });
}
function Row({
  label,
  value,
  accent,
  muted,
  bold,
  strike
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: muted ? "text-white/70" : "text-white/75", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${accent ?? "text-white"} ${bold ? "font-display text-h3" : ""} ${strike ? "text-white/70 line-through" : ""}`, children: value })
  ] });
}
function friendlyCouponError(msg) {
  const m = msg.toLowerCase();
  if (m.includes("invalid coupon")) return "That code isn't valid. Check it and try again.";
  if (m.includes("not valid for this tier")) return "This code doesn't apply to this programme.";
  if (m.includes("already used")) return "This code has already been used for this email. Ask your counsellor for a fresh one.";
  if (m.includes("coupon expired") || m.includes("expired")) return "This code has expired. Ask your counsellor for a current one.";
  if (m.includes("intent not found")) return "Your checkout session expired. Refresh the page and try again.";
  if (m.includes("intent_id required") || m.includes("network") || m.includes("fetch") || m.includes("failed")) {
    return "Couldn't reach the server. Check your connection and try again.";
  }
  return "Could not apply code. Please try again.";
}
function validateCouponInput(raw) {
  const code = raw.trim();
  if (!code) return "Enter a coupon or counsellor code.";
  if (code.length < 3 || code.length > 32) return "Codes are 3–32 characters.";
  if (!/^[A-Z0-9_-]+$/i.test(code)) {
    return "Codes can only contain letters, numbers, hyphens and underscores.";
  }
  return null;
}
function classifyRemoveError(message) {
  const m = message.toLowerCase();
  if (m.includes("intent not found")) return "intent_not_found";
  if (m.includes("network") || m.includes("fetch") || m.includes("failed to fetch")) return "network";
  if (m.includes("timeout") || m.includes("timed out")) return "timeout";
  if (m.includes("unauthorized") || m.includes("401")) return "unauthorized";
  if (m.includes("forbidden") || m.includes("403")) return "forbidden";
  if (m.includes("500") || m.includes("server error")) return "server_error";
  return "unknown";
}
export {
  EnrolPay as component
};
