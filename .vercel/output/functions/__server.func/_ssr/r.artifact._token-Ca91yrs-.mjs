import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as Section } from "./Section-DK9GN_Ac.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { l as logVerificationEvent } from "./verificationAudit-BO_-cmet.mjs";
import { W as WORK_SAMPLES } from "./WorkSampleCard-CIEmOSKU.mjs";
import { ax as Route$p } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { ab as Clock, o as TriangleAlert, a7 as Lock, q as ArrowRight, m as ShieldCheck, ac as FileText } from "../_libs/lucide-react.mjs";
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
import "./analytics-Do62eWB1.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
function ArtifactViewRoute() {
  const {
    token
  } = Route$p.useParams();
  const [state, setState] = reactExports.useState({
    kind: "loading"
  });
  reactExports.useEffect(() => {
    let active = true;
    (async () => {
      const {
        data,
        error
      } = await supabase.rpc("get_artifact_request_by_token", {
        p_token: token
      }).maybeSingle();
      if (!active) return;
      if (error || !data) {
        setState({
          kind: "missing"
        });
        return;
      }
      const req = data;
      const expired = new Date(req.expires_at).getTime() < Date.now();
      if (expired) {
        setState({
          kind: "expired",
          req
        });
      } else {
        setState({
          kind: "valid",
          req
        });
        void logVerificationEvent(req.candidate_ref, "artifact_unlocked", req.recruiter_org);
      }
    })();
    return () => {
      active = false;
    };
  }, [token]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-app bg-[#F7F9FC] pb-24 text-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", className: "pt-14 sm:pt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]", children: "Recruiter verification link · time-bound" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-grotesk text-h1 font-bold text-ink", children: "Artifact verification" }),
      state.kind === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-2 text-body-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
        " Checking link…"
      ] }),
      state.kind === "missing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-amber-300/50 bg-gold-soft p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-warning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-semibold text-amber-900", children: "Link not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption text-amber-900/80", children: "This verification link is invalid or has been revoked. Request a fresh one from the candidate's portfolio." })
      ] }),
      state.kind === "expired" && /* @__PURE__ */ jsxRuntimeExports.jsx(ExpiredView, { req: state.req }),
      state.kind === "valid" && /* @__PURE__ */ jsxRuntimeExports.jsx(ValidView, { req: state.req })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function ExpiredView({
  req
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-border/60 bg-muted p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-semibold text-ink", children: "Link expired" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-caption text-ink", children: [
      "This verification link was issued for ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: req.candidate_ref }),
      " ",
      "on ",
      new Date(req.created_at).toLocaleString(),
      " and has now expired. Request a fresh link from the candidate portfolio."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/recruiters/candidate/$id", params: {
      id: req.candidate_ref
    }, className: "mt-3 inline-flex items-center gap-1.5 text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline", children: [
      "Open candidate portfolio ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
    ] })
  ] });
}
function ValidView({
  req
}) {
  const trackPrefix = req.candidate_ref.match(/^AG-([A-Z]+)-/)?.[1] ?? "";
  const trackSlugMap = {
    PV: "pharmacovigilance",
    MC: "medical-coding",
    CDM: "clinical-data-management",
    SAS: "sas-clinical",
    RA: "regulatory-affairs",
    MW: "medical-writing"
  };
  const sample = WORK_SAMPLES.find((s) => s.trackSlug === trackSlugMap[trackPrefix]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-sky-300/40 bg-accent-emerald-soft p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-accent-emerald-deep" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 font-semibold text-sky-900", children: [
        "Verified link · expires ",
        new Date(req.expires_at).toLocaleString()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-3 grid gap-2 text-caption sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Candidate", v: req.candidate_ref }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Recruiter", v: `${req.recruiter_org}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Requested task", v: req.jd_task }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Status", v: req.status })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-ink/10 bg-white p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]", children: "De-identified artifact preview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-grotesk text-body font-bold text-ink", children: sample ? sample.artifact : "Track artifact" }),
      sample ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-micro text-muted-foreground", children: sample.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5 text-caption leading-relaxed text-ink", children: sample.bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--teal-deep)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b })
        ] }, b)) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-caption text-ink", children: [
        "The candidate's full graded deliverable is being prepared. We email a redacted PDF + auditor scoring sheet to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: req.recruiter_email }),
        " within 1 working day."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-meta text-muted-foreground", children: [
        "This access is logged to the public audit trail for",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: req.candidate_ref }),
        ". The candidate sees that you opened it; no PII is exposed."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/recruiters/candidate/$id", params: {
      id: req.candidate_ref
    }, className: "inline-flex items-center gap-1.5 text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline", children: [
      "Back to candidate portfolio ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
    ] })
  ] });
}
function Row({
  k,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-mono text-micro uppercase tracking-wider text-sky-900/60", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 font-mono text-sky-950", children: v })
  ] });
}
export {
  ArtifactViewRoute as component
};
