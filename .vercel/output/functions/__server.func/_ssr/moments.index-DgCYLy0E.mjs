import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { l as listPublishedMoments } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { d as Sparkles, q as ArrowRight, z as Camera, aY as ImageOff, ay as Calendar, a3 as MapPin } from "../_libs/lucide-react.mjs";
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
function MomentsIndex() {
  const [moments, setMoments] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let mounted = true;
    listPublishedMoments().then((res) => {
      if (mounted) setMoments(res.moments);
    }).catch((e) => {
      if (mounted) setError(e.message);
    });
    return () => {
      mounted = false;
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tone-dark min-h-screen bg-[oklch(0.14_0.04_245)] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 py-16 sm:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-micro font-bold uppercase tracking-[0.22em] text-sky-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "mr-2 inline h-3.5 w-3.5" }),
        " Arzon Moments"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-3 max-w-3xl text-h1", children: "Our story, told in photos." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-base text-white/75", children: "Every launch, every guest, every campus visit. We publish the ceremony, not just the logo. Each story can hold up to 10 photos." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-6xl px-5 py-12", children: error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-300", children: error }) : moments === null ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/60", children: "Loading moments…" }) : moments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMoments, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: moments.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/moments/$slug", params: {
      slug: m.slug
    }, className: "group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-sky-300/40 hover:bg-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] w-full bg-[#0a0c10]/40 backdrop-blur-md shadow-sm", children: m.cover_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: m.cover_url, alt: m.subtitle ?? m.title, className: "h-full w-full object-cover transition group-hover:scale-[1.02]", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-white/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "h-10 w-10" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-bold uppercase tracking-[0.22em] text-sky-300/90", children: m.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-grotesk text-lg font-semibold leading-snug text-white", children: m.title }),
        m.subtitle ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/70 line-clamp-2", children: m.subtitle }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/55", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            formatDate(m.event_date)
          ] }),
          m.location ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            m.location
          ] }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            m.image_count,
            " photo",
            m.image_count === 1 ? "" : "s"
          ] })
        ] })
      ] })
    ] }) }, m.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function formatDate(iso) {
  try {
    return (/* @__PURE__ */ new Date(iso + "T00:00:00")).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch {
    return iso;
  }
}
const UPCOMING = [{
  tag: "Launch",
  title: "Office inauguration reel",
  hint: "Ribbon cut, first cohort walk-in."
}, {
  tag: "Campus",
  title: "TASK campus visits",
  hint: "Faculty briefings + Q&A."
}, {
  tag: "Media",
  title: "ETV / press coverage",
  hint: "Segments as they publish."
}];
function EmptyMoments({
  tone = "dark"
} = {}) {
  const isLight = tone === "light";
  const t = {
    hairline: isLight ? "border-slate-900/10" : "border-white/10",
    hairlineDashed: isLight ? "border-slate-900/15" : "border-white/12",
    panelBg: isLight ? "bg-gradient-to-br from-sky-50 via-white to-white" : "bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent",
    iconBg: isLight ? "bg-sky-500/10 ring-sky-600/30" : "bg-sky-300/10 ring-sky-300/30",
    iconFg: isLight ? "text-accent-emerald-deep" : "text-sky-300",
    eyebrow: isLight ? "text-accent-emerald-deep" : "text-sky-300",
    eyebrowSoft: isLight ? "text-accent-emerald-deep/80" : "text-sky-300/80",
    heading: isLight ? "text-ink" : "text-white",
    body: isLight ? "text-muted-foreground" : "text-white/70",
    micro: isLight ? "text-muted-foreground" : "text-white/60",
    itemBg: isLight ? "bg-muted/70" : "bg-white/[0.02]",
    iconGhost: isLight ? "text-muted-foreground" : "text-white/25",
    // Buttons are tonal islands. On the light shell the primary CTA is a
    // dark navy button, so it opts into the dark palette via `tone-dark`;
    // on the dark shell it is a white button that opts into `tone-light`.
    primaryBtn: isLight ? "tone-dark bg-[#0A1024] text-white hover:bg-[#0A1024]/90" : "tone-light bg-white text-[#0A1024] hover:bg-white/90",
    secondaryBtn: isLight ? "border-border text-ink hover:border-slate-400 hover:bg-muted" : "border-white/20 text-white hover:border-white/40 hover:bg-white/5"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-testid": "moments-empty-root", "data-tone": tone, className: "mx-auto max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-3xl border ${t.hairline} ${t.panelBg} p-8 sm:p-10`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${t.iconBg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: `h-5 w-5 ${t.iconFg}`, "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-mono text-micro font-bold uppercase tracking-[0.22em] ${t.eyebrow}`, children: "Publishing soon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `mt-1 font-grotesk text-xl font-semibold leading-snug sm:text-2xl ${t.heading}`, children: "The first stories are in edit." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-2 max-w-xl text-sm leading-relaxed ${t.body}`, children: "No stock photos. No placeholders. Every moment we ship is a real event, published with the date, place and the people who were in the room." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-wrap gap-3 sm:w-auto sm:justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses", className: `inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md px-4 text-sm font-semibold transition sm:flex-none ${t.primaryBtn}`, children: [
          "Browse programmes",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: `inline-flex h-10 flex-1 items-center justify-center rounded-md border px-4 text-sm font-semibold transition sm:flex-none ${t.secondaryBtn}`, children: "About Arzon" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3", children: UPCOMING.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: `overflow-hidden rounded-2xl border border-dashed ${t.hairlineDashed} ${t.itemBg}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/3] w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.12),transparent_60%)]", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: `h-8 w-8 ${t.iconGhost}` }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-mono text-micro font-bold uppercase tracking-[0.22em] ${t.eyebrowSoft}`, children: u.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1.5 font-grotesk text-sm font-semibold ${t.heading}`, children: u.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1 text-xs ${t.micro}`, children: u.hint })
      ] })
    ] }, u.title)) })
  ] });
}
export {
  EmptyMoments,
  MomentsIndex as component
};
