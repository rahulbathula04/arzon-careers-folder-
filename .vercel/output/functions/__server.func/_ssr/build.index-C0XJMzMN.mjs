import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { S as Section } from "./Section-DK9GN_Ac.mjs";
import { S as SectionHeader } from "./SectionHeader-o59advsO.mjs";
import { o as listDemandTracks } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { U as Users, b6 as Hammer, I as CircleCheck, aS as ArrowUpRight, Y as Timer, d as Sparkles } from "../_libs/lucide-react.mjs";
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
const TABS = [{
  key: "voting",
  label: "Demand forming",
  icon: Users,
  blurb: "Verified requests are stacking up. 25 unlock a build."
}, {
  key: "building",
  label: "Under build",
  icon: Hammer,
  blurb: "Curriculum, mentors, assessments and internships shipping in public."
}, {
  key: "live",
  label: "Live tracks",
  icon: CircleCheck,
  blurb: "Built on verified demand. Now open for enrolment."
}];
function pct(t) {
  return Math.min(100, Math.round(t.votes_count / Math.max(1, t.vote_threshold) * 100));
}
function daysLeft(t) {
  if (!t.launch_eta) return null;
  const diff = new Date(t.launch_eta).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 864e5));
}
function BuildPipelinePage() {
  const fetcher = useServerFn(listDemandTracks);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["demand", "all"],
    queryFn: () => fetcher(),
    staleTime: 6e4
  });
  const tracks = data?.tracks ?? [];
  const [tab, setTab] = reactExports.useState("building");
  const counts = reactExports.useMemo(() => ({
    voting: tracks.filter((t) => t.status === "voting").length,
    building: tracks.filter((t) => t.status === "building").length,
    live: tracks.filter((t) => t.status === "live").length
  }), [tracks]);
  const filtered = tracks.filter((t) => t.status === tab);
  const activeTab = TABS.find((t) => t.key === tab);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-dvh bg-white text-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", containerSize: "lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "The Arzon build pipeline", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic-accent not-italic", children: "We build workforce infrastructure where verified demand exists." }) }), sub: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Every track here passed through the same three stages:",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "demand forming → under build → live" }),
      ". Public timelines, named mentors, dated milestones. No vapourware."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "tablist", "aria-label": "Pipeline stage", className: "inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-ink/10 bg-white/80 p-1.5 shadow-sm backdrop-blur", children: TABS.map((t) => {
        const Icon = t.icon;
        const active = tab === t.key;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { role: "tab", "aria-selected": active, onClick: () => setTab(t.key), className: `inline-flex items-center gap-2 rounded-full px-4 py-2 text-meta font-semibold transition-all sm:text-caption ${active ? "bg-ink text-white shadow-[0_6px_18px_-8px_rgba(15,23,42,0.6)]" : "text-ink/70 hover:bg-ink/5 hover:text-ink"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
          t.label,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 font-mono text-micro ${active ? "bg-white/20 text-white" : "bg-ink/8 text-ink/70"}`, children: counts[t.key] })
        ] }, t.key);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xl text-center text-caption leading-relaxed text-ink/65", children: activeTab.blurb })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3", children: isLoading ? Array.from({
      length: 3
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 motion-safe:animate-pulse rounded-2xl border border-ink/5 bg-ink/[0.03]" }, i)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full rounded-2xl border border-dashed border-ink/15 bg-white p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg text-ink", children: "Nothing in this stage yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-caption text-ink/65", children: [
        "Don’t see what you need?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/build/request", className: "font-semibold text-primary underline-offset-4 hover:underline", children: "Request a track" }),
        " ",
        "and we’ll open voting."
      ] })
    ] }) : filtered.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TrackCard, { t }, t.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 flex flex-col items-center gap-3 rounded-2xl border border-ink/8 bg-gradient-to-br from-white to-[oklch(0.97_0.01_220)] p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-bold uppercase tracking-[0.18em] text-[color:var(--teal-ink)]", children: "Don’t see your role?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "max-w-xl font-display text-h3 font-semibold leading-tight text-ink sm:text-h2", children: "Request a track. If 25 verified peers want the same thing, we build it." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/build/request", className: "btn btn-primary btn-md mt-2", children: [
        "Request a track ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
      ] })
    ] })
  ] }) });
}
function TrackCard({
  t
}) {
  const isBuilding = t.status === "building";
  const isLive = t.status === "live";
  const left = daysLeft(t);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_60px_-24px_rgba(15,23,42,0.25)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-ink/5 p-4 sm:p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-micro font-bold uppercase tracking-[0.16em] ${isLive ? "bg-sky-50 text-sky-800 ring-1 ring-sky-200" : isBuilding ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200" : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"}`, children: [
        isLive ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }) : isBuilding ? /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
        isLive ? "Live" : isBuilding ? "Under build" : "Voting open"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro uppercase tracking-[0.16em] text-ink/55", children: t.category })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-body font-bold leading-tight text-ink sm:text-body-lg", children: t.title }),
      t.pitch && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-caption leading-relaxed text-slate-600 line-clamp-3", children: t.pitch }),
      !isLive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-micro font-medium text-ink/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            t.votes_count,
            " / ",
            t.vote_threshold,
            " verified"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            pct(t),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.14_220)]", style: {
          width: `${pct(t)}%`
        } }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between pt-5 text-micro text-ink/65", children: [
        isLive ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.14em]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
          " Enrolment open"
        ] }) : isBuilding && left !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.14em]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-3 w-3" }),
          " ",
          left,
          " days to launch"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.14em]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
          " Founding cohort open"
        ] }),
        isLive && t.live_course_slug ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses/$slug", params: {
          slug: t.live_course_slug
        }, className: "inline-flex items-center gap-1 text-meta font-semibold text-primary", children: [
          "View track ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/build/$slug", params: {
          slug: t.slug
        }, className: "inline-flex items-center gap-1 text-meta font-semibold text-primary", children: [
          isBuilding ? "Watch build" : "Apply",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5" })
        ] })
      ] })
    ] })
  ] });
}
export {
  BuildPipelinePage as component
};
