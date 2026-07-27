import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as Section } from "./Section-DK9GN_Ac.mjs";
import { C as CTAButton } from "./CTAButton-iRVca3vr.mjs";
import { A as ACTIVE_COHORT_ID, g as getCohortStatus, c as cohortWaitlistUrl } from "./cohort.functions-BCUND4Jp.mjs";
import { trackCohort } from "./cohortAnalytics-kVJz8ZIv.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { a6 as ArrowLeft, a7 as Lock, r as CalendarDays, a8 as UsersRound, s as MessageCircle } from "../_libs/lucide-react.mjs";
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
import "./router-CvdLERTV.mjs";
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
import "./createSsrRpc-BV3sOdh8.mjs";
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
function formatStart(iso) {
  if (!iso) return "next batch";
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata"
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
function WaitlistPage() {
  const q = useQuery({
    queryKey: ["cohort-status", ACTIVE_COHORT_ID],
    queryFn: () => getCohortStatus({
      data: {
        id: ACTIVE_COHORT_ID
      }
    }),
    staleTime: 3e4
  });
  const status = q.data;
  const label = status?.displayLabel ?? "Upcoming cohort";
  const seatsCap = status?.seatsCap ?? 60;
  const startsAt = formatStart(status?.startsAt);
  const waitlistHref = cohortWaitlistUrl(label);
  reactExports.useEffect(() => {
    trackCohort("waitlist_page_viewed", {
      cohort_id: status?.id ?? ACTIVE_COHORT_ID,
      effective_locked: status?.effectiveLocked ?? false
    });
  }, [status?.id]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "waitlist", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-meta text-slate-500 transition hover:text-slate-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " Back to home"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 font-mono text-micro uppercase tracking-[0.22em] text-rose-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
      " Cohort locked"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-display text-h1 font-bold leading-tight text-ink", children: [
      "The ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic-accent not-italic", children: label }),
      " cohort is full."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-body text-slate-600", children: [
      "We cap every batch at ",
      seatsCap,
      " seats so mentors stay reachable. The next batch opens shortly — message us on WhatsApp and we'll hold a seat for you first."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-light rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-mono text-micro uppercase tracking-[0.22em] text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
          " Original start"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-h3 font-bold text-ink", children: startsAt })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-light rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-mono text-micro uppercase tracking-[0.22em] text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UsersRound, { className: "h-3.5 w-3.5" }),
          " Capacity"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-display text-h3 font-bold text-ink", children: [
          seatsCap,
          " / ",
          seatsCap
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CTAButton, { asChild: true, variant: "primary", size: "lg", glow: true, trailingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: waitlistHref, target: "_blank", rel: "noopener noreferrer", "data-testid": "waitlist-whatsapp", onClick: () => trackCohort("waitlist_whatsapp_clicked", {
        cohort_id: status?.id ?? ACTIVE_COHORT_ID
      }), children: "Message on WhatsApp" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CTAButton, { asChild: true, variant: "secondary", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", children: "Browse other programmes" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-meta text-slate-500", children: "We reply within a few hours on weekdays. No spam, no auto-DMs." })
  ] }) });
}
export {
  WaitlistPage as component
};
