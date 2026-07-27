import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as Section } from "./Section-DK9GN_Ac.mjs";
import { S as SectionHeader } from "./SectionHeader-o59advsO.mjs";
import { F as Footer, C as CounsellorLeadForm } from "./Footer-C-SVodlH.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { aV as fetchTrustLedger, d as COUNSELLOR_PHONE, C as COUNSELLOR_PHONE_DISPLAY, w as waLink } from "./router-CvdLERTV.mjs";
import { B as BriefingPackForm, G as GovtTrustBlock } from "./BriefingPackForm-CSFrxVm8.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { m as ShieldCheck, af as GraduationCap, F as FileCheckCorner, q as ArrowRight, U as Users, ag as UserCheck, ah as FileExclamationPoint, ai as Undo2, aj as Phone, s as MessageCircle, a2 as Mail } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
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
function BatchOutcomeStrip() {
  const fetch = useServerFn(fetchTrustLedger);
  const { data } = useQuery({
    queryKey: ["trust-ledger-tpo"],
    queryFn: () => fetch(),
    staleTime: 5 * 60 * 1e3
  });
  const counts = data?.counts ?? {
    complaints: 0,
    complaintsResolved: 0,
    placements: 0
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[color:var(--teal-deep)]/20 bg-white p-5 shadow-sm sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]", children: "Live · founding cohort" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-grotesk text-body-lg font-bold text-ink sm:text-h4", children: "What we publish, not what we claim" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption leading-relaxed text-slate-600", children: "We are at the start of our public dataset. The numbers below are written to the public ledger as they happen — no curation, no deleted rows. As cohorts run, this strip becomes per-college on request." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Stat,
        {
          icon: Users,
          value: counts.placements + counts.complaints + 0,
          label: "Ledger entries",
          hint: "all-time"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Stat,
        {
          icon: UserCheck,
          value: counts.placements,
          label: "Placements logged",
          hint: "with employer reference"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Stat,
        {
          icon: FileExclamationPoint,
          value: `${counts.complaintsResolved} / ${counts.complaints}`,
          label: "Complaints resolved",
          hint: "open + closed"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Undo2, value: "0", label: "Open incidents", hint: "audit-grade" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl border border-amber-300/30 bg-amber-50/60 p-3 text-meta leading-relaxed text-amber-900", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Honest note for placement officers:" }),
      " we deliberately do not quote a placement percentage until the dataset is large enough to be stable across batches. The live ledger above is what we have today. When you partner with us, your batch outcomes are added to it — visible to your principal and to recruiters, same URL."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/trust-report",
          preload: "intent",
          className: "inline-flex h-10 items-center gap-1.5 rounded-full bg-[color:var(--teal-deep)] px-4 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)]",
          children: [
            "Open the public ledger ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/refund",
          preload: "intent",
          className: "inline-flex h-10 items-center text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline",
          children: "Cancellation policy"
        }
      )
    ] })
  ] });
}
function Stat({
  icon: Icon,
  value,
  label,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[color:var(--teal-soft)]/30 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-grotesk text-h4 font-bold leading-none text-ink", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-micro uppercase tracking-[0.16em] text-slate-500", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-micro text-slate-500", children: hint })
  ] });
}
function CounsellorLanes() {
  const waMessage = "Hi, I'm a TPO / placement officer enquiring about an Arzon Careers partner briefing for my college.";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-[1fr_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-ink/10 bg-white p-5 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]", children: "Three lanes to the partnerships team" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-grotesk text-body font-bold text-ink", children: "Same person, three ways to reach" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `tel:+${COUNSELLOR_PHONE}`,
            className: "flex items-center gap-3 rounded-xl border border-ink/10 bg-slate-50 p-3 transition hover:border-[color:var(--teal-deep)]/40 hover:bg-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption font-semibold text-ink", children: "Call partnerships" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro text-slate-600", children: COUNSELLOR_PHONE_DISPLAY })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 text-slate-400" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: waLink(waMessage),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-3 rounded-xl border border-ink/10 bg-slate-50 p-3 transition hover:border-[color:var(--teal-deep)]/40 hover:bg-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption font-semibold text-ink", children: "WhatsApp partnerships" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro text-slate-600", children: "Pre-filled TPO context, no script needed" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 text-slate-400" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "mailto:info@arzonglobal.com?subject=TPO%20partnership%20enquiry",
            className: "flex items-center gap-3 rounded-xl border border-ink/10 bg-slate-50 p-3 transition hover:border-[color:var(--teal-deep)]/40 hover:bg-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption font-semibold text-ink", children: "Email partnerships" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro text-slate-600", children: "info@arzonglobal.com" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 text-slate-400" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-micro leading-relaxed text-slate-500", children: "Same counsellor answers all three. Average response: under 4 working hours." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-meta leading-relaxed text-slate-600", children: [
        "Need the partner briefing pack? Ask on any lane — we send a same-day deck tailored to your batch size + course mix.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/credibility",
            className: "font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline",
            children: "See why other colleges trust us first →"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-ink/10 bg-white p-5 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]", children: "Or have us call you back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-grotesk text-body font-bold text-ink", children: "Within 24 hours, partnerships lead" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CounsellorLeadForm, {}) })
    ] })
  ] });
}
function TposPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-app bg-[#F7F9FC] pb-24 text-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "lg", className: "pt-14 sm:pt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]", children: "For training & placement officers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-grotesk text-h1 font-bold text-ink", children: [
        "What your batch gets,",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
        " in writing. Updated live."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-base text-slate-600", children: "A placement officer sending 60 students has asymmetric risk: one bad cohort and it's the principal's office. This page is built to remove that risk — registrations, complaints log, assessment methodology, and the partnerships counsellor's three contact lanes, all on one screen." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { size: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BatchOutcomeStrip, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "The one-pager", title: "Get the briefing pack in your inbox", sub: "A 1-page PDF: ACRI methodology, batch outcome reporting cadence, and your counsellor next steps. We send the link to your work email.", align: "left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BriefingPackForm, { audience: "tpo" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Assessment methodology", title: "ACRI — published, not proprietary", sub: "The Career Engine score uses a public 5-dimension rubric. Recruiters and TPOs can audit the same matrix the result page uses.", align: "left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tile, { icon: ShieldCheck, title: "ACRI in 1 minute", body: "5 dimensions, 13 traits, 40 questions. The trait → dimension matrix is the actual code, not a marketing diagram." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tile, { icon: GraduationCap, title: "What each band means", body: "Industry-ready (≥70), Developing (45–69), Foundation (<45). Bands map to cohort-entry guidance, not pass/fail." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tile, { icon: FileCheckCorner, title: "What we DON'T claim", body: "Not yet ASSAY-validated. Reliability (Cronbach α) will be published once N ≥ 500 completions. We say so on the page." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/acri", preload: "intent", className: "mt-5 inline-flex items-center gap-1.5 text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline", children: [
        "Read the full ACRI methodology page ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GovtTrustBlock, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Partnerships", title: "Three lanes to the same person", sub: "Call, WhatsApp or email — same partnerships counsellor answers all three. Average response: under 4 working hours.", align: "left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CounsellorLanes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Tile({
  icon: Icon,
  title,
  body
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-ink/10 bg-white p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-[color:var(--teal-deep)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-grotesk text-body-sm font-bold text-ink", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption leading-relaxed text-slate-600", children: body })
  ] });
}
export {
  TposPage as component
};
