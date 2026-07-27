import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { Z as Route$15, _ as ARCHETYPES, $ as getResult, k as CareerShell, w as waLink } from "./router-CvdLERTV.mjs";
import { C as CTAButton } from "./CTAButton-iRVca3vr.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { d as Sparkles, r as CalendarDays, T as Target, bG as ClipboardList, q as ArrowRight, s as MessageCircle, I as CircleCheck, p as BookOpen } from "../_libs/lucide-react.mjs";
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
const TRACK_BY_ARCHETYPE = {
  coder: {
    title: "Medical Coding",
    slug: "medical-coding"
  },
  sentinel: {
    title: "Pharmacovigilance",
    slug: "pharmacovigilance"
  },
  data_storyteller: {
    title: "Clinical Data Management",
    slug: "clinical-data-management"
  },
  regulatory_architect: {
    title: "Regulatory Affairs",
    slug: "regulatory-affairs"
  },
  operator: {
    title: "Pharmacovigilance",
    slug: "pharmacovigilance"
  },
  ai_builder: {
    title: "AI in Healthcare",
    slug: "ai-intelligence"
  }
};
function PlanPage() {
  const {
    id
  } = Route$15.useSearch();
  const [ctx, setCtx] = reactExports.useState({
    archetypeId: null,
    archetypeName: "Healthcare Graduate",
    primaryTrack: "Pharmacovigilance",
    primarySlug: "pharmacovigilance"
  });
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const cached = JSON.parse(sessionStorage.getItem("ce_result") || "null");
      if (cached?.archetypeId && ARCHETYPES[cached.archetypeId]) {
        applyArchetype(cached.archetypeId);
        return;
      }
    } catch {
    }
    if (id) {
      getResult(id).then((row) => {
        if (row?.archetype && ARCHETYPES[row.archetype]) {
          applyArchetype(row.archetype);
        }
      }).catch(() => {
      });
    }
    function applyArchetype(aId) {
      const arche = ARCHETYPES[aId];
      const t = TRACK_BY_ARCHETYPE[aId];
      setCtx({
        archetypeId: aId,
        archetypeName: arche.name,
        primaryTrack: t.title,
        primarySlug: t.slug
      });
    }
  }, [id]);
  const days = buildDays(ctx);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CareerShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-primary-glow/30 bg-gradient-to-br from-primary/[0.10] to-primary/[0.02] p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary-glow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Your free 7-day plan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-h1 text-white", children: [
        "Seven days to confirm ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic-accent not-italic", children: ctx.primaryTrack }),
        " ",
        "is the right fit."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-sm text-white/70", children: "A short, honest plan based on your ACRI result. ~20 minutes a day. No payment. By day 7 you'll know whether to enrol — or whether a different path fits you better." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-3 text-micro text-white/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5 text-primary-glow" }),
          " 7 days · ~20 min/day"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-3.5 w-3.5 text-gold" }),
          " Tuned for ",
          ctx.archetypeName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-3.5 w-3.5 text-eyebrow" }),
          " No login required"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-8 space-y-3", children: days.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DayCard, { day: d, index: i, primarySlug: ctx.primarySlug }, d.day)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.08] to-transparent p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold", children: "When you're ready" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 font-display text-h3 text-white", children: [
        "Skip ahead. Lock your seat in the next ",
        ctx.primaryTrack,
        " cohort."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/65", children: "Most students who finish day 3 of the plan apply by day 5. Counsellors hold launch codes for graduates who've actually engaged." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CTAButton, { asChild: true, variant: "gold", size: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/apply", search: {
          programme: ctx.primarySlug,
          source: "career-engine-plan"
        }, children: [
          "Apply ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink(`Hi Arzon, I'm working through the 7-day plan for ${ctx.primaryTrack}. Can you walk me through what's next?`), target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1.5 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-4 py-2 text-sm font-semibold text-eyebrow-strong hover:bg-accent-glow/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          " Ask my counsellor"
        ] })
      ] })
    ] })
  ] });
}
function buildDays(ctx) {
  const track = ctx.primaryTrack;
  const WORKFLOW_BY_TRACK = {
    Pharmacovigilance: {
      workflow: "Walk through one ICSR case study end-to-end. Note where you got stuck.",
      tool: "Argus, Veeva, Excel macros",
      toolAction: "Watch the Argus tour video and complete the free interactive demo."
    },
    "Medical Coding": {
      workflow: "Code a set of 10 sample diagnoses using ICD-10. Compare your codes against the answer sheet.",
      tool: "Optum360, 3M CodeFinder, Excel",
      toolAction: "Explore the free ICD-10 browser at ICD10Data.com for 20 minutes, then code 5 real diagnoses."
    },
    "Clinical Data Management": {
      workflow: "Review a sample Case Report Form (CRF) and identify 5 data discrepancies.",
      tool: "Medidata Rave, Oracle InForm, OpenClinica",
      toolAction: "Create a free OpenClinica account and navigate through a sample study database."
    },
    "Regulatory Affairs": {
      workflow: "Read a real CDSCO submission checklist and map it to an eCTD module structure.",
      tool: "Veeva Vault, eCTD Builder, eRegulatory",
      toolAction: "Download and review a public FDA drug approval document from Drugs@FDA. Map the sections to eCTD modules."
    },
    "AI in Healthcare": {
      workflow: "Trace how a single patient record flows from EHR entry to an AI prediction model output.",
      tool: "Python, FHIR APIs, Google Health AI",
      toolAction: "Run a pre-built Colab notebook on a sample clinical dataset and interpret one model output."
    }
  };
  const wf = WORKFLOW_BY_TRACK[track] ?? WORKFLOW_BY_TRACK["Pharmacovigilance"];
  return [{
    day: 1,
    title: "Map the territory",
    why: `Understand what a ${track} role actually does day-to-day in an Indian CRO.`,
    action: `Read the "What is ${track}?" overview and write 3 bullets in your own words.`,
    minutes: 20
  }, {
    day: 2,
    title: "Meet a real workflow",
    why: "Real workflows are unglamorous. We want you to see them before you commit.",
    action: wf.workflow,
    minutes: 25
  }, {
    day: 3,
    title: "Salary + market reality",
    why: "Decide with eyes open. Most students skip this and regret it later.",
    action: "Read the salary report for your region. Pick a 12-month target band.",
    minutes: 15
  }, {
    day: 4,
    title: "Tools you'll touch",
    why: `${wf.tool} — pick one and explore it for 20 minutes.`,
    action: wf.toolAction,
    minutes: 30
  }, {
    day: 5,
    title: "Talk to someone in the role",
    why: "Nothing replaces a 10-minute call with someone two years ahead of you.",
    action: "Book a 15-min call with an Arzon alumnus working in the field.",
    minutes: 20
  }, {
    day: 6,
    title: "Stress-test the fit",
    why: "Re-read your ACRI honesty section. Is anything still bothering you?",
    action: "List your 3 biggest doubts. Bring them to your counsellor call.",
    minutes: 15
  }, {
    day: 7,
    title: "Decide",
    why: "By now you have data, not vibes. Make the call.",
    action: "Pick one: apply for the cohort, ask for a launch code, or save the plan for later.",
    minutes: 10
  }];
}
function DayCard({
  day,
  index,
  primarySlug
}) {
  const [done, setDone] = reactExports.useState(false);
  const storageKey = `ce_plan_d${day.day}_${primarySlug}`;
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    setDone(window.localStorage.getItem(storageKey) === "1");
  }, [storageKey]);
  const toggle = () => {
    if (typeof window === "undefined") return;
    const next = !done;
    setDone(next);
    if (next) window.localStorage.setItem(storageKey, "1");
    else window.localStorage.removeItem(storageKey);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: `rounded-2xl border p-5 transition ${done ? "border-accent-glow/30 bg-accent-glow/[0.06]" : index === 0 ? "border-primary-glow/30 bg-primary/[0.04]" : "border-white/10 bg-white/[0.03]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: toggle, "aria-label": done ? `Mark day ${day.day} as not done` : `Mark day ${day.day} as done`, className: `mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${done ? "border-accent-glow/60 bg-accent-glow/20 text-eyebrow-strong" : "border-white/15 bg-white/5 text-white/65 hover:border-white/40"}`, children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: [
          "Day ",
          day.day
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-micro text-white/60", children: [
          "~",
          day.minutes,
          " min"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-grotesk text-base font-bold text-white sm:text-lg", children: day.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/65", children: day.why }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 inline-flex items-start gap-2 text-caption text-white/85", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }),
        " ",
        day.action
      ] })
    ] })
  ] }) });
}
export {
  PlanPage as component
};
