import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { aL as isReducedMotion } from "./router-CvdLERTV.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as ACTIVE_COHORT_ID, g as getCohortStatus } from "./cohort.functions-BCUND4Jp.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { trackCohort } from "./cohortAnalytics-kVJz8ZIv.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { ab as Clock, r as CalendarDays, a8 as UsersRound, a7 as Lock, s as MessageCircle, q as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "./createSsrRpc-BV3sOdh8.mjs";
import "./auth-middleware-CGVBerDj.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
import "./enrolment.functions-Cs_77DUe.mjs";
import "../_libs/zod.mjs";
import "./enrolmentTiers-CKOrj6Lb.mjs";
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
import "./analytics-Do62eWB1.mjs";
const BATCH_START_ISO_FALLBACK = "2026-07-30T09:00:00+05:30";
const BATCH_START_LABEL_FALLBACK = "30 July 2026";
const SEATS_CAP_FALLBACK = 60;
const SEATS_TAKEN_FALLBACK = 57;
function diff(target) {
  const ms = Math.max(0, target - Date.now());
  const days = Math.floor(ms / 864e5);
  const hours = Math.floor(ms % 864e5 / 36e5);
  const minutes = Math.floor(ms % 36e5 / 6e4);
  const seconds = Math.floor(ms % 6e4 / 1e3);
  return { days, hours, minutes, seconds, done: ms === 0 };
}
const ZERO_DIFF = { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };
function formatLockLabel(iso) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
      timeZoneName: "short"
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
function LimitedSeatsCountdown() {
  const q = useQuery({
    queryKey: ["cohort-status", ACTIVE_COHORT_ID],
    queryFn: () => getCohortStatus({ data: { id: ACTIVE_COHORT_ID } }),
    staleTime: 15e3,
    refetchOnWindowFocus: true,
    refetchInterval: 6e4
  });
  reactExports.useEffect(() => {
    const ch = supabase.channel(`cohort:${ACTIVE_COHORT_ID}`).on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "cohorts",
        filter: `id=eq.${ACTIVE_COHORT_ID}`
      },
      () => void q.refetch()
    ).subscribe();
    return () => {
      void supabase.removeChannel(ch);
    };
  }, [q]);
  const status = q.data;
  const seatsCap = status?.seatsCap ?? SEATS_CAP_FALLBACK;
  const seatsTaken = status?.seatsTaken ?? SEATS_TAKEN_FALLBACK;
  const seatsLeft = status ? status.seatsLeft : Math.max(0, seatsCap - seatsTaken);
  const lockAtIso = status?.lockAt ?? BATCH_START_ISO_FALLBACK;
  const label = status?.displayLabel ?? BATCH_START_LABEL_FALLBACK;
  const locked = !!status?.effectiveLocked;
  const target = new Date(lockAtIso).getTime();
  const [t, setT] = reactExports.useState(ZERO_DIFF);
  const [didFireView, setDidFireView] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!status || didFireView) return;
    trackCohort("seat_availability_viewed", {
      cohort_id: status.id,
      seats_left: status.seatsLeft,
      seats_cap: status.seatsCap,
      effective_locked: status.effectiveLocked
    });
    setDidFireView(true);
  }, [status, didFireView]);
  const [didFireCountdown, setDidFireCountdown] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (didFireCountdown || locked) return;
    const msLeft = Math.max(0, target - Date.now());
    if (msLeft > 0 && msLeft <= 24 * 36e5) {
      trackCohort("lock_countdown_visible", {
        cohort_id: status?.id ?? ACTIVE_COHORT_ID,
        ms_to_lock: msLeft
      });
      setDidFireCountdown(true);
    }
  }, [t, target, locked, status?.id, didFireCountdown]);
  reactExports.useEffect(() => {
    setT(diff(target));
    if (isReducedMotion()) return;
    const id = setInterval(() => setT(diff(target)), 1e3);
    return () => clearInterval(id);
  }, [target]);
  const fillPct = Math.min(100, Math.round(seatsTaken / Math.max(1, seatsCap) * 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "limited-seats", className: "editorial-page-bg py-16 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-widest text-[#707C90]", children: locked ? "Cohort Locked" : "Cohort Closing Soon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-3xl sm:text-4xl font-bold text-[#151C2E] tracking-tight", children: [
        locked ? "This cohort is now full —" : "Next batch begins",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-[#8A6D1F]", children: label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#5B6472] max-w-xl mx-auto", children: [
        "We cap every cohort at ",
        seatsCap,
        " seats. Applications close once seats are full or at",
        " ",
        formatLockLabel(lockAtIso),
        ", whichever comes first."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-[1.2fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editorial-card p-6 flex flex-col justify-between space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#707C90]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-[#1D4ED8]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: locked ? "Cohort locked" : "TIME UNTIL LOCK" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2.5", children: [
          { v: t.days, l: "Days" },
          { v: t.hours, l: "Hours" },
          { v: t.minutes, l: "Min" },
          { v: t.seconds, l: "Sec" }
        ].map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editorial-stat-tile p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-2xl sm:text-3xl font-bold text-[#151C2E] tabular-nums block", children: String(u.v).padStart(2, "0") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-widest text-[#707C90] mt-1 block", children: u.l })
        ] }, u.l)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-[#5B6472]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4 text-[#1D4ED8] shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Live classes start ",
            label,
            ", 7:30 PM IST · Lock at ",
            formatLockLabel(lockAtIso)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editorial-card p-6 flex flex-col justify-between space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#707C90]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UsersRound, { className: "h-4 w-4 text-[#1D4ED8]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "COHORT CAPACITY" })
            ] }),
            locked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-medium text-rose-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
              " Locked"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "editorial-badge-warning px-2.5 py-0.5 rounded-full text-xs font-semibold", children: "Closing soon" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-3xl font-bold text-[#151C2E]", children: seatsLeft }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#5B6472]", children: [
              "of ",
              seatsCap,
              " seats remaining"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-full rounded-full transition-all duration-700 ${locked ? "bg-rose-600" : "editorial-urgency-bar"}`,
              style: { width: `${fillPct}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-[#5B6472] leading-relaxed", children: locked ? `All ${seatsCap} seats are taken. Join the waitlist for the upcoming batch.` : `${seatsTaken} confirmed enrolments. Only ${seatsLeft} seats left before batch caps.` })
        ] }),
        locked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/waitlist",
            className: "editorial-btn-blue text-xs font-bold h-11 w-full flex items-center justify-center gap-2 text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Join Cohort Waitlist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/apply",
            className: "editorial-btn-blue text-xs font-bold h-11 w-full flex items-center justify-center gap-2 text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Apply for this cohort" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  LimitedSeatsCountdown
};
