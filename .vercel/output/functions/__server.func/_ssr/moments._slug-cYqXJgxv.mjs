import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { y as Route$1r } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { a6 as ArrowLeft, ay as Calendar, a3 as MapPin, X } from "../_libs/lucide-react.mjs";
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
function MomentDetailPage() {
  const {
    moment
  } = Route$1r.useLoaderData();
  const m = moment;
  const [lightbox, setLightbox] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => i === null ? null : Math.min(m.images.length - 1, i + 1));
      if (e.key === "ArrowLeft") setLightbox((i) => i === null ? null : Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, m.images.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tone-dark min-h-screen bg-[oklch(0.14_0.04_245)] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-5 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/moments", className: "inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
        " Arzon Moments"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 font-mono text-micro font-bold uppercase tracking-[0.22em] text-sky-300", children: m.category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2 text-h1", children: m.title }),
      m.subtitle ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base text-white/80", children: m.subtitle }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
          " ",
          formatDate(m.event_date)
        ] }),
        m.location ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
          " ",
          m.location
        ] }) : null
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-5 py-10", children: [
      m.body ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-invert mb-10 max-w-3xl whitespace-pre-wrap text-white/85", children: m.body }) : null,
      m.images.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/55", children: "Photos will be added here soon." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: m.images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLightbox(i), className: "block w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img.url, alt: img.alt || m.title, className: "aspect-square w-full object-cover transition hover:scale-[1.02]", loading: "lazy" }) }) }, img.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    lightbox !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbox, { image: m.images[lightbox], onClose: () => setLightbox(null) }) : null
  ] });
}
function Lightbox({
  image,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "dialog", "aria-modal": "true", className: "fixed inset-0 z-50 flex items-center justify-center bg-[#0a0c10]/90 p-4", onClick: onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white", "aria-label": "Close", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "max-h-full max-w-full", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image.url, alt: image.alt, className: "max-h-[85vh] max-w-full rounded-lg object-contain" }),
      image.caption ? /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "mx-auto mt-3 max-w-2xl text-center text-sm text-white/80", children: image.caption }) : null
    ] })
  ] });
}
function formatDate(iso) {
  try {
    return (/* @__PURE__ */ new Date(iso + "T00:00:00")).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch {
    return iso;
  }
}
export {
  MomentDetailPage as component
};
