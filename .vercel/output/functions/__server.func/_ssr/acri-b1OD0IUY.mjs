import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { S as Section } from "./Section-DK9GN_Ac.mjs";
import { S as SectionHeader } from "./SectionHeader-o59advsO.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { J as JD_PROVENANCE, R as RESEARCH_REFRESH_QUARTER } from "./jdProvenance-C_dgELW0.mjs";
import { m as ACRI_FULL, Q as ACRI_DIMENSIONS } from "./router-CvdLERTV.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { q as ArrowRight, aI as FlaskConical, ac as FileText, o as TriangleAlert } from "../_libs/lucide-react.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
import "../_libs/uncrypto.mjs";
import "node:crypto";
function TraitDimensionMap(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...props });
}
function BandLadder(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...props });
}
const fetchAcriStats = createServerFn({
  method: "GET"
}).handler(createSsrRpc("8a9b736346f6001195f12364f263510771201637f23138cc86f891bd9c33c6f4"));
function AcriPage() {
  const fetch = useServerFn(fetchAcriStats);
  const {
    data
  } = useQuery({
    queryKey: ["acri-stats"],
    queryFn: () => fetch(),
    staleTime: 10 * 60 * 1e3
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-app bg-[#F7F9FC] pb-24 text-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "lg", className: "pt-14 sm:pt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]", children: "Methodology · v1 preview rubric" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-grotesk text-h1 font-bold text-ink", children: "ACRI: the Career Engine score, in public." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 max-w-2xl text-base text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ACRI_FULL }),
        " is the readiness score every Career Engine result page shows. It is not a hiring tool and it is not a placement predictor. This page documents exactly how it is built so recruiters, TPOs and students can audit the same code the result page uses."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "1 · What ACRI measures", title: "Five dimensions, one composite score", sub: "Every ACRI score is the average of five 0–100 dimension scores. Definitions below match the labels students see on their result page.", align: "left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5", children: ACRI_DIMENSIONS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-ink/10 bg-white p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.18em] text-[color:var(--teal-deep)]", children: "Dimension" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-grotesk text-body-sm font-bold text-ink", children: d.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-meta leading-relaxed text-muted-foreground", children: dimensionBlurb(d.id) })
      ] }, d.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "2 · How the score is computed", title: "Trait → dimension weighting matrix", sub: "The table below is rendered live from the same scoring matrix the result page runs. We can't show you one thing here and ship something else.", align: "left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TraitDimensionMap, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-meta leading-relaxed text-muted-foreground", children: "Each row's weights sum to 1.0. The final dimension scores are normalised against the strongest trait-driven dimension so bars remain readable even when traits are sparse." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "3 · The 40 questions", title: "13 traits, scenario + behaviour + profile", sub: "The question bank covers 13 traits (attention, logic, language, screen, patient, data, writing, sales, compliance, tech, lab, empathy, pressure). 40 items per attempt, mixed across scenario, behaviour and profile kinds.", align: "left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/career-engine", preload: "intent", className: "inline-flex h-10 items-center gap-1.5 rounded-full bg-[color:var(--teal-deep)] px-4 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)]", children: [
          "Take the assessment ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:info@arzonglobal.com?subject=ACRI%20question%20bank%20request", className: "inline-flex h-10 items-center text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline", children: "Request the question bank for review →" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "4 · Bands & what they mean", title: "Three readiness bands, not a pass/fail", sub: "Bands map a candidate to the right cohort entry point. They are not a hiring decision and they are not a placement guarantee.", align: "left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BandLadder, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "5 · Calibration & sample size", title: "What we DO and DON'T claim", sub: "Honest accounting of the v1 evidence base. We will not publish a reliability coefficient until the dataset can support a stable estimate.", align: "left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { icon: FlaskConical, title: "Calibration source", tone: "ok", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Trait → dimension weights are derived from current Indian JDs across",
            " ",
            JD_PROVENANCE.length,
            " role tracks, last refreshed ",
            RESEARCH_REFRESH_QUARTER,
            ". Sources are public listings (Naukri, LinkedIn India, Foundit, company careers pages)."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jd-mirror", className: "mt-2 inline-flex text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline", children: "See the JD Mirror →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: FileText, title: "Current sample size", tone: "ok", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Completed Career Engine attempts to date:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: (data?.completedAttempts ?? 0).toLocaleString("en-IN") }),
          ". Leads captured (subset who chose to share contact):",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: (data?.leadsCount ?? 0).toLocaleString("en-IN") }),
          ". Count is live from the public sessions table."
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: TriangleAlert, title: "Reliability (Cronbach α / test-retest)", tone: "warn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Not yet published." }),
          " A stable α estimate needs N ≥",
          " ",
          data?.reliabilityThreshold ?? 500,
          " completions and a within-7-day re-test subset. We will publish the numbers here when both conditions are met. Today:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: data?.reliabilityReady ? "ready to compute" : "below threshold" }),
          "."
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: TriangleAlert, title: "v1 preview rubric", tone: "warn", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The trait → dimension weighting is the v1 preview rubric — derived from JD aggregation, not yet validated against the full ASSAY (Arzon Science and Skill Assessment for Industry Readiness) instrument. ASSAY will replace this map without changing the result page contract." }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "6 · Limits & non-claims", title: "What ACRI is not", sub: "The score answers one question: which cohort entry point fits this candidate today. It deliberately does not try to answer the others.", align: "left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(NonClaim, { title: "Not a hiring decision", children: [
          "ACRI is a cohort-entry signal, not an offer signal. Recruiters should rely on the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/recruiters", className: "font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline", children: "grading rubric" }),
          " ",
          "+ verified work samples instead."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(NonClaim, { title: "Not a placement predictor", children: [
          "We will not correlate ACRI to offer outcomes until the placements ledger is large enough to be statistically meaningful. The",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/trust-report", className: "font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline", children: "public ledger" }),
          " ",
          "is the only outcome surface."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NonClaim, { title: "Not psychometric ASSAY", children: "ASSAY is the full Arzon assessment instrument; ACRI v1 is a JD-derived preview. The naming reflects the difference." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NonClaim, { title: "Not an IQ / personality test", children: "ACRI does not score intelligence, personality, or behavioural archetypes outside the 5 published dimensions." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { size: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-ink/10 bg-white p-5 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-grotesk text-body-sm font-bold text-ink", children: "Spotted an error in this methodology?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-caption leading-relaxed text-muted-foreground", children: [
        "Email",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline", href: "mailto:info@arzonglobal.com?subject=ACRI%20methodology%20issue", children: "info@arzonglobal.com" }),
        " ",
        "with the dimension or trait in question. Every reported issue is logged on the public",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/trust-report", className: "font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline", children: "trust ledger" }),
        ", resolved or not."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function dimensionBlurb(id) {
  switch (id) {
    case "operational":
      return "Translating ambiguous tasks into ordered, executable steps under realistic constraints.";
    case "communication":
      return "Clear written + spoken explanation to clinicians, reviewers and non-specialists.";
    case "documentation":
      return "Accurate, audit-ready written artefacts: case files, narratives, edit-checks, SOPs.";
    case "workflow":
      return "Comfort with software, tickets, queues and structured pipelines that healthcare ops runs on.";
    case "domain":
      return "Working medical / clinical vocabulary, regulatory landscape and patient-system context.";
    default:
      return "";
  }
}
function Card({
  icon: Icon,
  title,
  tone,
  children
}) {
  const ring = tone === "warn" ? "border-amber-300/40 bg-gold-soft/50" : "border-ink/10 bg-white";
  const iconTone = tone === "warn" ? "text-warning" : "text-[color:var(--teal-deep)]";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border p-5 ${ring}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${iconTone}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-grotesk text-body-sm font-bold text-ink", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-2 text-caption leading-relaxed text-ink", children })
  ] });
}
function NonClaim({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl border border-ink/10 bg-white p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-grotesk text-body-sm font-bold text-ink", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption leading-relaxed text-muted-foreground", children })
  ] });
}
export {
  AcriPage as component
};
