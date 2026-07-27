import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { C as CTAButton } from "./CTAButton-iRVca3vr.mjs";
import { az as Route$m, aA as CITIES_BY_SLUG } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { a3 as MapPin, aZ as TrendingUp, J as Building2, q as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "./analytics-Do62eWB1.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./createSsrRpc-BV3sOdh8.mjs";
import "./auth-middleware-CGVBerDj.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
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
function CityRolePage() {
  const {
    role,
    city,
    band,
    employers
  } = Route$m.useLoaderData();
  const rows = [["Fresher (Y0)", band.fresher], ["Mid (Y3)", band.midY3], ["Senior (Y5–6)", band.seniorY5], ["Lead (Y8+)", band.leadY8]];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-[#070A14] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-micro uppercase tracking-[0.22em] text-white/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industry", className: "hover:text-white/70", children: "Industry" }),
        " / ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industry/$role", params: {
          role: role.slug
        }, className: "hover:text-white/70", children: role.shortName }),
        " / ",
        city.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-2 text-h1 font-semibold", children: [
        role.name,
        " in ",
        city.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-base text-white/70", children: city.liveNote }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-2 text-meta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tag, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
          " Hiring density: ",
          city.hiringDensity
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tag, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
          " ",
          role.demand,
          " demand"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tag, { children: [
          "As of ",
          role.asOf
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-grotesk text-lg font-bold", children: [
          "Pay bands · ",
          city.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption text-white/80", children: "All values in LPA. Source: JD aggregation across Naukri + LinkedIn + AmbitionBox, refreshed quarterly." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-2 sm:grid-cols-2", children: rows.map(([label, range]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-[0.18em] text-white/80", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-grotesk text-h3 font-bold text-white", children: [
            "₹",
            range[0],
            " – ",
            range[1],
            " LPA"
          ] })
        ] }, label)) }),
        band.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-meta text-white/80", children: band.note })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-xl border border-primary-glow/25 bg-primary/[0.05] p-4 text-caption text-white/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro font-semibold uppercase tracking-[0.18em] text-primary-glow", children: "Live + cost" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: city.costOfLivingNote })
      ] }),
      employers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-grotesk text-lg font-bold inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-primary-glow" }),
          " Top employers hiring in",
          " ",
          city.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid gap-3 sm:grid-cols-2", children: employers.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-grotesk text-sm font-bold text-white", children: e.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-mono text-micro uppercase tracking-[0.18em] text-white/80", children: e.tier }),
          e.typicalBand && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-meta text-white/70", children: e.typicalBand }),
          e.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-meta text-white/80", children: e.note })
        ] }, e.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.10] to-gold/[0.02] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-grotesk text-h4 font-bold", children: [
          "Are you the right fit for ",
          role.shortName,
          " in ",
          city.name,
          "?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/75", children: "Take the 4-min Arzon Career Engine assessment. Get your ACRI score, archetype, and a personalised 5-year package projection." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/career-engine", className: "btn btn-primary", children: [
            "Start the assessment ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CTAButton, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/industry/$role", params: {
            role: role.slug
          }, children: [
            "Full ",
            role.shortName,
            " profile"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.18em] text-white/80", children: [
          role.shortName,
          " in other cities"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: Object.values(CITIES_BY_SLUG).filter((c) => c.slug !== city.slug).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industry/$role/$city", params: {
          role: role.slug,
          city: c.slug
        }, className: "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-meta text-white/80 hover:border-primary-glow/40 hover:text-white", children: c.name }, c.slug)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Tag({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/75", children });
}
export {
  CityRolePage as component
};
