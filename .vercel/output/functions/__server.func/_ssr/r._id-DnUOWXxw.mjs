import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { s as Route$1s, v as recordReferralVisit, x as absUrl } from "./router-CvdLERTV.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { C as CTAButton } from "./CTAButton-iRVca3vr.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { A as Activity, aA as Trophy, d as Sparkles, q as ArrowRight, aq as Share2 } from "../_libs/lucide-react.mjs";
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
function ShareLanding() {
  const card = Route$1s.useLoaderData();
  const params = Route$1s.useParams();
  const recordVisit = useServerFn(recordReferralVisit);
  reactExports.useEffect(() => {
    if (typeof document === "undefined") return;
    const code = card.referral_code || card.slug;
    document.cookie = `ref=${encodeURIComponent(code)}; Path=/; Max-Age=2592000; SameSite=Lax`;
    try {
      window.localStorage.setItem("arz_ref", code);
    } catch {
    }
    recordVisit({
      data: {
        referralCode: code,
        landingPath: `/r/${params.id}`,
        userAgent: navigator.userAgent.slice(0, 480)
      }
    }).catch(() => void 0);
  }, [card.referral_code, card.slug, params.id, recordVisit]);
  const score = card.acri_overall;
  const track = card.top_track_title ?? card.archetype_name;
  const trackSlug = card.top_track_slug ?? "pharmacovigilance";
  const ringPct = Math.max(0, Math.min(100, score));
  const dash = ringPct / 100 * 264;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-dvh bg-[#070A14] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-5 pb-20 pt-14 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-[0.22em] text-primary-glow", children: "A friend shared their result · Arzon Careers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-grotesk mt-3 text-h1 font-bold", children: [
        "They scored ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-glow", children: score }),
        " on the ACRI scale."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-base text-white/70 sm:text-lg", children: [
        "Their top-matched career: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: track }),
        ". The full breakdown — strengths, watch-outs, 5-year package projection — comes from a 4-minute, 28-question assessment calibrated against real cohort outcomes."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid items-center gap-6 sm:grid-cols-[auto_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 w-44 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "h-full w-full -rotate-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "42", stroke: "rgba(255,255,255,0.08)", strokeWidth: "6", fill: "none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "42", fill: "none", stroke: "currentColor", strokeWidth: "6", strokeLinecap: "round", className: "text-primary-glow", strokeDasharray: `${dash} 264` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-grotesk text-h2 font-bold", children: score }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro uppercase tracking-[0.18em] text-white/80", children: "/ 100 ACRI" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-primary-glow/40 bg-primary/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-primary-glow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3 w-3" }),
            " ",
            card.band_label ?? "Career-ready preview"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 inline-flex items-center gap-2 text-sm text-white/75", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-gold" }),
            " Archetype ·",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: card.archetype_name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-white/60 font-mono uppercase tracking-[0.16em]", children: [
            card.views ?? 0,
            " people viewed this card"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.10] to-gold/[0.02] p-6 sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-grotesk text-h3 font-bold", children: "Take yours. 4 minutes. Free." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-sm text-white/70", children: "28 micro-questions. Get your ACRI score, top archetype, 5-year and 10-year package projection, AI-risk verdict per role, and a recommended cohort track. Calibrated against 12,400+ real healthcare outcomes." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/career-engine", className: "btn btn-primary", children: [
            "Start the assessment ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CTAButton, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/industry/$role", params: {
            role: trackSlug
          }, children: [
            "Explore ",
            track,
            " careers"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 inline-flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-white/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3 w-3" }),
          " Share code · ",
          card.referral_code || card.slug
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.18em] text-white/80", children: "Methodology" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-caption leading-relaxed text-white/75", children: "Scoring fuses four signals — aptitude, interest, background, commitment — against archetype prototypes built from JD aggregation (Naukri + LinkedIn + AmbitionBox), NASSCOM/IQVIA sector reports, and Arzon's own cohort placement data. Refreshed quarterly." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center font-mono text-micro uppercase tracking-[0.18em] text-white/60", children: [
        "Card · ",
        card.slug,
        " · ",
        absUrl(`/r/${params.id}`).replace(/^https?:\/\//, "")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ShareLanding as component
};
