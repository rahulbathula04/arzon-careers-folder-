import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a8 as Route$11 } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { a6 as ArrowLeft, Y as Timer, af as GraduationCap, V as Briefcase, aS as ArrowUpRight, d as Sparkles, I as CircleCheck, b6 as Hammer, U as Users, bb as Circle } from "../_libs/lucide-react.mjs";
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
function fmtDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString(void 0, {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function TrackDetail() {
  const data = Route$11.useLoaderData();
  const track = data.track;
  const milestones = data.milestones;
  const partners = data.partners;
  const mentors = partners.filter((p) => p.type === "mentor");
  const internships = partners.filter((p) => p.type === "internship");
  const isLive = track.status === "live";
  const isBuilding = track.status === "building";
  const donePct = milestones.length ? Math.round(milestones.filter((m) => m.status === "done").length / milestones.length * 100) : 0;
  const launchLabel = fmtDate(track.launch_eta) ?? `${track.eta_days} days`;
  const seatsLeft = Math.max(0, track.founding_cap - track.founding_filled);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-dvh bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-6 py-14 sm:py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/build", className: "inline-flex items-center gap-1.5 text-caption font-semibold text-black/70 hover:text-black", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " All tracks"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: track.status }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro font-semibold uppercase tracking-[0.16em] text-black/60", children: track.category })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-h1 font-bold text-black", children: track.title }),
    track.pitch && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-body leading-relaxed text-black/75", children: track.pitch }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Verified demand", value: `${track.votes_count} / ${track.vote_threshold}`, sub: isLive ? "Threshold met" : `${Math.min(100, Math.round(track.votes_count / Math.max(1, track.vote_threshold) * 100))}% of threshold` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: isLive ? "Launched" : "Launch ETA", value: launchLabel, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-4 w-4 text-black/70" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Founding cohort", value: `${track.founding_filled} / ${track.founding_cap}`, sub: seatsLeft > 0 ? `${seatsLeft} seats left` : "Cohort full" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.18em] text-black/60", children: "Build log" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-display text-h3 font-bold text-black", children: "Milestones · public & dated" })
        ] }),
        milestones.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-meta font-semibold text-black/65", children: [
          donePct,
          "% done"
        ] })
      ] }),
      milestones.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-2xl border border-dashed border-black/15 bg-white p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-black/70", children: "Build log opens when the voting threshold is met. Cast your vote to fast-track it." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-5 space-y-3", children: milestones.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MilestoneIcon, { status: m.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro font-semibold text-black/50", children: String(i + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-semibold text-black", children: m.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-mono text-micro font-semibold uppercase tracking-[0.16em] text-black/60", children: [
            m.status.replace(/_/g, " "),
            m.completed_at && m.status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-black/55", children: [
              "· ",
              fmtDate(m.completed_at)
            ] })
          ] })
        ] })
      ] }, m.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.18em] text-black/60", children: "Confirmed partners" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-display text-h3 font-bold text-black", children: "Mentors & internship hosts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-body-sm leading-relaxed text-black/70", children: "We only ship a track once mentors and internship partners are committed in writing." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-1 gap-5 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PartnerGroup, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4" }), title: "Mentors", partners: mentors, emptyLabel: "Mentor outreach in progress." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PartnerGroup, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4" }), title: "Internship partners", partners: internships, emptyLabel: "Internship MOUs in negotiation." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-14 rounded-2xl border border-black/10 bg-gradient-to-br from-white to-[oklch(0.97_0.01_220)] p-8 text-center", children: isLive && track.live_course_slug ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.18em] text-[color:var(--teal-ink)]", children: "Now live" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-h3 font-bold text-black sm:text-h2", children: "Enrolment is open. Join the next cohort." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses/$slug", params: {
        slug: track.live_course_slug
      }, className: "btn btn-primary btn-md mt-5", children: [
        "View live track ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.18em] text-[color:var(--teal-ink)]", children: isBuilding ? "Reserve a founding seat" : "Cast your verified vote" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-h3 font-bold text-black sm:text-h2", children: isBuilding ? `${seatsLeft > 0 ? seatsLeft + " seats left in the founding cohort." : "Cohort is full — join the waitlist."}` : "25 verified votes unlock the build." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-2 max-w-xl text-body-sm leading-relaxed text-black/70", children: "Verified votes are tied to a phone number and a small refundable hold. No anonymous demand." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/build/request", className: "btn btn-primary btn-md mt-5", children: [
        isBuilding ? "Apply" : "Cast vote",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" })
      ] })
    ] }) })
  ] }) });
}
function StatusBadge({
  status
}) {
  if (status === "live") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.16em] text-sky-800 ring-1 ring-sky-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
      " Live"
    ] });
  }
  if (status === "building") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.16em] text-amber-800 ring-1 ring-amber-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "h-3 w-3" }),
      " Under build"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.16em] text-slate-700 ring-1 ring-slate-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
    " Voting open"
  ] });
}
function MilestoneIcon({
  status
}) {
  if (status === "done") return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-5 w-5 text-primary" });
  if (status === "in_progress") return /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "mt-0.5 h-5 w-5 text-amber-600" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "mt-0.5 h-5 w-5 text-black/30" });
}
function Stat({
  label,
  value,
  sub,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-black/10 bg-white p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.18em] text-black/60", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 inline-flex items-center gap-1.5 font-display text-h4 font-bold text-black", children: [
      icon,
      value
    ] }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-meta text-black/65", children: sub })
  ] });
}
function PartnerGroup({
  icon,
  title,
  partners,
  emptyLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-black/10 bg-white p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-black", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--teal-ink)]", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-bold uppercase tracking-[0.16em]", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-micro font-semibold text-black/55", children: partners.length })
    ] }),
    partners.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-caption text-black/65", children: emptyLabel }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2", children: partners.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 rounded-lg border border-black/8 bg-white p-3", children: [
      p.logo_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.logo_url, alt: "", width: 32, height: 32, loading: "lazy", className: "h-8 w-8 flex-shrink-0 rounded object-contain" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 flex-shrink-0 place-items-center rounded bg-[#0a0c10]/5 text-micro font-bold text-black/60", children: p.name.slice(0, 2).toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-body-sm font-semibold text-black", children: p.name }),
        p.confirmed_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-micro text-black/55", children: [
          "Confirmed · ",
          fmtDate(p.confirmed_at)
        ] })
      ] })
    ] }, p.id)) })
  ] });
}
export {
  TrackDetail as component
};
