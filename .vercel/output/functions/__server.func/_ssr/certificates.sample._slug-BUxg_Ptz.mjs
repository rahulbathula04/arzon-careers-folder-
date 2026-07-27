import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { T as TrustBar } from "./TrustBar-DbIyef3b.mjs";
import { aU as Route$k, aB as DarkBackdrop, B as Button, w as waLink } from "./router-CvdLERTV.mjs";
import { Q as QRCode } from "../_libs/qrcode.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { c0 as Printer, aq as Share2, q as ArrowRight, m as ShieldCheck, O as BadgeCheck } from "../_libs/lucide-react.mjs";
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
import "../_libs/dijkstrajs.mjs";
import "../_libs/pngjs.mjs";
import "zlib";
import "assert";
import "buffer";
function Certificate({ course, holderName, certificateId, issueDate }) {
  const [qrUrl, setQrUrl] = reactExports.useState("");
  const qrFor = typeof window !== "undefined" ? `${window.location.origin}/verify?id=${certificateId}` : `https://arzonglobal.com/verify?id=${certificateId}`;
  reactExports.useEffect(() => {
    QRCode.toDataURL(qrFor, { width: 220, margin: 1 }).then(setQrUrl).catch(() => setQrUrl(""));
  }, [qrFor]);
  const date = issueDate ?? (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "cert-card",
      className: "tone-light relative flex w-full flex-col overflow-hidden rounded-2xl border-[6px] border-double border-primary/40 bg-white p-5 sm:aspect-[1.45/1] sm:p-10",
      style: { boxShadow: "var(--shadow-card)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 flex items-center justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "select-none font-display text-display font-bold text-primary/[0.04] sm:text-display", children: "ARZON" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.28em] text-primary", children: "Arzon Global · Internship Certificate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 flex flex-wrap items-center gap-2 text-micro text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3 text-primary" }),
              " ISO 9001 · MSME · MCA registered"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-9 w-9 text-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-5 sm:mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro uppercase tracking-wider text-muted-foreground", children: "This is to certify that" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 break-words font-display text-h1 font-bold text-foreground", children: holderName || "Your Name Here" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 max-w-[36ch] text-xs leading-relaxed text-foreground sm:max-w-xl sm:text-sm", children: [
            "has successfully completed the structured 12-week internship in",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: course.title }),
            ", including all six modules, assessments and the capstone project, meeting Arzon's performance standards."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-6 flex flex-wrap items-end justify-between gap-4 sm:absolute sm:inset-x-10 sm:bottom-7 sm:mt-auto sm:flex-nowrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-wider text-muted-foreground", children: "Issued" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro font-semibold text-foreground sm:text-xs", children: date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-micro uppercase tracking-wider text-muted-foreground", children: "Certificate ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold text-foreground sm:text-xs", children: certificateId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-32 border-b border-foreground/40 sm:w-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-micro text-muted-foreground sm:text-micro", children: "Director, Arzon Global" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center overflow-hidden rounded-md border border-border bg-white sm:h-20 sm:w-20", children: qrUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qrUrl, alt: "Verify on /verify", className: "h-full w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-micro text-muted-foreground", children: "QR loading…" }) })
        ] })
      ]
    }
  );
}
function makeCertId(slug, name) {
  const code = slug.slice(0, 3).toUpperCase();
  const seed = (name || "sample").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return `ARZ-${code}-2026-${String(seed * 137 % 99999).padStart(5, "0")}`;
}
function SampleCertPage() {
  const course = Route$k.useLoaderData();
  const [name, setName] = reactExports.useState("");
  const id = makeCertId(course.slug, name);
  const shareMsg = `Hi, sharing a sample of the Arzon Global certificate for ${course.title}. Verifiable on /verify with ID ${id}.`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkBackdrop, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses/$slug", params: {
        slug: course.slug
      }, className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow hover:underline", children: [
        "← Back to ",
        course.title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-8 lg:grid-cols-[1fr_360px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.28em] text-eyebrow", children: "Sample certificate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-3", children: "See your name on it." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 max-w-xl text-base text-slate-300", children: [
            "Type your name below, the certificate updates live with a unique ID and a QR code that lands recruiters on ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: "/verify" }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Certificate, { course, holderName: name, certificateId: id }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:sticky lg:top-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-6", style: {
          boxShadow: "var(--shadow-card)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro font-semibold uppercase tracking-[0.2em] text-muted-foreground", children: "Your full name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value.slice(0, 40)), placeholder: "e.g. Aditi Sharma", className: "mt-2 h-11 w-full rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none ring-primary/30 focus:ring-2" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-micro text-muted-foreground", children: [
            "Certificate ID: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: id })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", onClick: () => window.print(), className: "h-11 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90", style: {
              boxShadow: "var(--shadow-glow)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "mr-2 h-4 w-4" }),
              "Print / save as PDF"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink(shareMsg), target: "_blank", rel: "noopener noreferrer", className: "flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-semibold text-foreground hover:bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4 text-primary" }),
              "Share on WhatsApp"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-xl border border-border bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Issuance rules" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-2 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "≥80% modules completed → Internship Certificate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "≥1 capstone graded → Project Certificate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "≥85% overall + mentor nod → Performance LOR" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 italic", children: "Sample only, not a valid credential." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/career-engine", className: "mt-5 inline-flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:underline", children: [
            "Take the 3-min fit test ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  SampleCertPage as component
};
