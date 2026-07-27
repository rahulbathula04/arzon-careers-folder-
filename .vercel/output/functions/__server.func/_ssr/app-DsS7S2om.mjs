import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { T as TIER_META } from "./enrolmentTiers-CKOrj6Lb.mjs";
import { B as Button } from "./router-CvdLERTV.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { aN as LogOut, a4 as LoaderCircle, af as GraduationCap, p as BookOpen, ay as Calendar, bX as Inbox, H as Award, bY as CircleCheckBig, aq as Share2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
const getMyEnrolments = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("1eadefdb5aed79b1fd8e077a7a5dfbdf0ff6b3cb86441f17e8f395116222618b"));
const getMySubmissions = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("a0f94959601c3f74f420d2101f1ae301511c74759e46ab165f8d7effba5a5285"));
function AchievementBadge({ title, category, dateEarned, icon }) {
  const shareToLinkedIn = () => {
    const url = encodeURIComponent(`https://arzoncareers.in/verify?cert=SAMPLE_ID`);
    const text = encodeURIComponent(`I just earned the "${title}" badge from Arzon Careers!`);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`,
      "_blank",
      "width=600,height=600"
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel-deep relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 p-6 text-center shadow-2xl transition-transform hover:scale-[1.02]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 h-32 w-32 rounded-full bg-teal-500/20 blur-[50px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/20 to-teal-900/40 ring-1 ring-teal-500/30", children: [
      icon || /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-10 w-10 text-teal-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 ring-2 ring-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-emerald-400" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-mono text-xs font-semibold tracking-widest text-teal-400 uppercase", children: category }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-grotesk text-lg font-bold text-white", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-white/50", children: [
      "Earned on ",
      dateEarned
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: shareToLinkedIn,
        className: "mt-6 w-full gap-2 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
          "Share to LinkedIn"
        ]
      }
    )
  ] });
}
function LearnerShell() {
  const fetchEnrolments = useServerFn(getMyEnrolments);
  const fetchSubmissions = useServerFn(getMySubmissions);
  const enrolQuery = useQuery({
    queryKey: ["my-enrolments"],
    queryFn: () => fetchEnrolments({})
  });
  const subQuery = useQuery({
    queryKey: ["my-submissions"],
    queryFn: () => fetchSubmissions({})
  });
  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }
  const enrolments = enrolQuery.data ?? [];
  const active = enrolments.find((e) => e.status === "active") ?? enrolments[0];
  const submissions = subQuery.data ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border bg-card/50 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-5xl items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-sm font-semibold tracking-tight", children: "Arzon Careers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: signOut, className: "inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5", "aria-hidden": true }),
        " Sign out"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold md:text-3xl", children: "Your cohort" }),
      enrolQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin", "aria-hidden": true }),
        " Loading your enrolment…"
      ] }) : !active ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl border border-border bg-card p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "mx-auto mb-3 h-8 w-8 text-muted-foreground", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No active enrolment yet. If you just paid, allow a few minutes for provisioning." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/enrol", className: "mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground", children: "See enrolment tiers" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-2xl border border-border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: TIER_META[active.tier]?.name ?? active.tier }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-1 text-xl font-semibold", children: [
            "Cohort ",
            active.cohort_id ?? "—"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
            "Status: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: active.status }),
            active.paid_at && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " · enrolled ",
              new Date(active.paid_at).toLocaleDateString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 border-t border-white/5 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl bg-teal-500/10 border border-teal-500/20 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-teal-400", children: "Arzon Copilot" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60", children: "Practice technical interviews with our voice-ready AI agent." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/copilot", className: "rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-teal-400", children: "Start Mock Interview" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: BookOpen, title: "Syllabus", desc: "40 / 30 / 20 / 10 module map", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/curriculum", className: "text-sm text-primary hover:underline", children: "Open syllabus →" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: Calendar, title: "Next session", desc: "Live cohort call", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Session times are shared in your WhatsApp cohort group. Calendar sync is on the roadmap." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: Inbox, title: "Submissions", desc: `${submissions.length} in inbox`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubmissionSummary, { submissions, loading: subQuery.isLoading }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Your Achievements" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Earn badges as you progress and share them on LinkedIn to attract recruiters." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-4 md:grid-cols-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AchievementBadge, { title: "Medical Coding Fundamentals", category: "Module Completed", dateEarned: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN") }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Recent submissions" }),
          subQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Loading…" }) : submissions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Nothing submitted yet. Your first assignment appears here once a mentor posts it inside the WhatsApp cohort group." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 divide-y divide-border rounded-2xl border border-border bg-card", children: submissions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: s.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Submitted ",
                new Date(s.submitted_at).toLocaleDateString("en-IN"),
                s.reviewed_at && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  " · reviewed ",
                  new Date(s.reviewed_at).toLocaleDateString("en-IN")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusChip, { status: s.status })
          ] }, s.id)) })
        ] })
      ] })
    ] })
  ] });
}
function Card({
  icon: Icon,
  title,
  desc,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mb-3 h-5 w-5 text-primary", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: desc }),
    children
  ] });
}
function SubmissionSummary({
  submissions,
  loading
}) {
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "…" });
  const pending = submissions.filter((s) => s.status === "submitted").length;
  const reviewed = submissions.filter((s) => s.status === "reviewed").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
    pending,
    " awaiting review · ",
    reviewed,
    " reviewed"
  ] });
}
function StatusChip({
  status
}) {
  const cls = status === "reviewed" ? "bg-sky-500/10 text-sky-500" : status === "returned" ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-xs font-medium ${cls}`, children: status });
}
export {
  LearnerShell as component
};
