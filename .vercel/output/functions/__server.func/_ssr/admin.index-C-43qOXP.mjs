import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { q as adminOverview, u as useAdminGate } from "./router-CvdLERTV.mjs";
import { A as AdminPageHeader, a as AdminKpi } from "./AdminCard-BsgPMHff.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { a4 as LoaderCircle, ac as FileText, U as Users, I as CircleCheck, ap as IndianRupee, d as Sparkles, o as TriangleAlert, aO as ChevronRight, A as Activity, aV as FileSearch, a2 as Mail, aS as ArrowUpRight, ab as Clock } from "../_libs/lucide-react.mjs";
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
class PanelBoundary extends reactExports.Component {
  state = {
    err: null
  };
  static getDerivedStateFromError(err) {
    return {
      err
    };
  }
  componentDidCatch(err) {
    console.error(`[admin/index] panel "${this.props.name}" failed:`, err);
  }
  render() {
    if (this.state.err) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-amber-300/20 bg-amber-300/[0.04] p-4 text-amber-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-micro uppercase tracking-[0.18em] text-amber-200/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mr-1 inline h-3 w-3" }),
          " ",
          this.props.name,
          " unavailable"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-meta text-amber-100/80", children: this.state.err.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => this.setState({
          err: null
        }), className: "mt-2 font-mono text-micro text-amber-200 underline-offset-2 hover:underline", children: "retry" })
      ] });
    }
    return this.props.children;
  }
}
function AdminHome() {
  useNavigate();
  const overview = useServerFn(adminOverview);
  const {
    status: gate,
    userId
  } = useAdminGate(["admin", "reviewer", "support"]);
  const [data, setData] = reactExports.useState(null);
  const [email, setEmail] = reactExports.useState("");
  const [greet, setGreet] = reactExports.useState("Hello");
  const [loadError, setLoadError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const h = (/* @__PURE__ */ new Date()).getHours();
    setGreet(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
  }, []);
  reactExports.useEffect(() => {
    if (!userId) return;
    supabase.auth.getUser().then(({
      data: data2
    }) => {
      setEmail(data2.user?.email ?? "");
    });
  }, [userId]);
  reactExports.useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    (async () => {
      try {
        const c = await overview();
        if (!cancelled) setData(c);
      } catch (e) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : "Failed to load overview";
          setLoadError(msg);
          console.error("[admin/index] overview() failed:", e);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gate, overview]);
  if (gate === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-foreground text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
      " Loading…"
    ] });
  }
  if (gate === "unauth") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RedirectToLogin, {});
  }
  if (gate === "forbidden") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100", children: [
      "You're signed in as ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: email }),
      " but no staff role is assigned. Ask an admin for access."
    ] });
  }
  const firstName = (email?.split("@")[0] || "there").split(/[._-]/)[0];
  data?.timeseries ?? [];
  const k = data?.kpis;
  const fmtINR = (n) => n >= 1e5 ? `₹${(n / 1e5).toFixed(n >= 1e6 ? 1 : 2)}L` : `₹${n.toLocaleString("en-IN")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1320px] space-y-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPageHeader, { eyebrow: "Admin · Overview", title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      greet,
      ", ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: firstName })
    ] }), description: "Last 7 days vs prior 7 — real numbers, no projections.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/applications", className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
        " Review applications"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/leads", className: "inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
        " Open leads"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Key metrics", className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminKpi, { label: "Applications · 7d", value: k?.applications.value ?? "—", delta: kpiDelta(k?.applications.delta), trend: kpiTrend(k?.applications.delta), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }), helper: "vs prior 7 days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminKpi, { label: "New leads · 7d", value: k?.leads.value ?? "—", delta: kpiDelta(k?.leads.delta), trend: kpiTrend(k?.leads.delta), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }), helper: "vs prior 7 days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminKpi, { label: "Paid enrolments · 7d", value: k?.paid.value ?? "—", delta: kpiDelta(k?.paid.delta), trend: kpiTrend(k?.paid.delta), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }), helper: "vs prior 7 days", accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminKpi, { label: "Revenue · 7d", value: k ? fmtINR(k.revenue.value) : "—", delta: kpiDelta(k?.revenue.delta), trend: kpiTrend(k?.revenue.delta), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-4 w-4" }), helper: "vs prior 7 days" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-5 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PanelBoundary, { name: "Funnel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Funnel · last 14 days", hint: "Lead → Apply → Review → Accept → Paid", children: loadError ? /* @__PURE__ */ jsxRuntimeExports.jsx(InlineError, { msg: loadError }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { stages: data?.funnel ?? [] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PanelBoundary, { name: "Stream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Today's stream", hint: "Live across applications, leads, payments", children: loadError ? /* @__PURE__ */ jsxRuntimeExports.jsx(InlineError, { msg: loadError }) : loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { h: "9rem" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Stream, { items: data?.stream ?? [] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PanelBoundary, { name: "Attention queue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Needs your attention", hint: loadError ? "—" : `${(data?.attention?.stalledApplications.length ?? 0) + (data?.attention?.expiringInvites.length ?? 0)} items`, tone: "warn", children: loadError ? /* @__PURE__ */ jsxRuntimeExports.jsx(InlineError, { msg: loadError }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Attention, { stalled: data?.attention?.stalledApplications ?? [], invites: data?.attention?.expiringInvites ?? [] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "Shortcuts", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shortcut, { to: "/admin/applications", label: "Applications", hint: "⌘1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shortcut, { to: "/admin/leads", label: "Leads", hint: "⌘2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shortcut, { to: "/admin/results", label: "Results", hint: "⌘3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shortcut, { to: "/admin/activity", label: "Activity", hint: "⌘4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shortcut, { to: "/admin/seo", label: "SEO", hint: "⌘5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shortcut, { to: "/admin/demand", label: "Demand", hint: "⌘6" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 flex items-center gap-1.5 text-micro text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
            " Press ⌘K from anywhere"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function kpiDelta(d) {
  if (d === void 0 || d === null) return void 0;
  if (d === 0) return "±0%";
  return `${d > 0 ? "+" : ""}${d}%`;
}
function kpiTrend(d) {
  if (d === void 0 || d === null) return void 0;
  if (d > 0) return "up";
  if (d < 0) return "down";
  return "flat";
}
function InlineError({
  msg
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mr-1 inline h-3 w-3 text-amber-700" }),
    " ",
    msg
  ] });
}
function RedirectToLogin() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    navigate({
      to: "/admin/login"
    });
  }, [navigate]);
  return null;
}
function Panel({
  title,
  hint,
  tone = "default",
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: ["rounded-2xl border bg-card p-4 shadow-sm sm:p-5", tone === "warn" ? "border-amber-400/60" : "border-border"].join(" "), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-baseline justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold tracking-tight text-foreground", children: title }),
      hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground", children: hint })
    ] }),
    children
  ] });
}
function Funnel({
  stages
}) {
  if (!stages.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { h: "9rem" });
  const max = Math.max(1, ...stages.map((s) => s.value));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: stages.map((s, i) => {
    const next = stages[i + 1];
    const conv = next && s.value > 0 ? Math.round(next.value / s.value * 100) : null;
    const w = Math.max(6, s.value / max * 100);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 text-meta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground", children: s.stage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-foreground", children: s.value.toLocaleString("en-IN") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-7 overflow-hidden rounded-md bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-primary-glow/70 to-primary-glow/30 transition-[width] duration-500", style: {
        width: `${w}%`
      } }) }),
      conv != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 font-mono text-micro text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: conv >= 30 ? "text-sky-300/80" : conv >= 10 ? "text-amber-200/80" : "text-rose-300/80", children: [
          conv,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "convert to ",
          stages[i + 1].stage.toLowerCase()
        ] })
      ] })
    ] }, s.stage);
  }) });
}
function Stream({
  items
}) {
  if (!items.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4" }), title: "Quiet so far", body: "New activity will appear here in real-time." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-white/[0.06]", children: items.map((it) => {
    const meta = streamMeta(it.kind);
    const Icon = meta.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: ["grid h-7 w-7 shrink-0 place-items-center rounded-md ring-1", meta.bg].join(" "), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-caption text-foreground", children: it.title }),
        it.sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground", children: it.sub })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("time", { className: "shrink-0 font-mono text-micro text-muted-foreground", children: timeAgo(it.created_at) })
    ] }, `${it.kind}-${it.id}`);
  }) });
}
function streamMeta(kind) {
  if (kind === "paid") return {
    icon: CircleCheck,
    bg: "bg-sky-400/10 text-sky-300 ring-sky-400/20"
  };
  if (kind === "application") return {
    icon: FileText,
    bg: "bg-primary-glow/10 text-primary-glow ring-primary-glow/20"
  };
  return {
    icon: Users,
    bg: "bg-muted text-foreground ring-border"
  };
}
function Attention({
  stalled,
  invites
}) {
  if (!stalled.length && !invites.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-sky-300" }), title: "All clear", body: "Nothing stalled, nothing expiring." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    stalled.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AttentionGroup, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSearch, { className: "h-3.5 w-3.5" }), label: "Stalled applications · >48h", to: "/admin/applications", items: stalled.map((a) => ({
      id: a.id,
      title: a.name || a.email,
      sub: a.program_slug,
      when: a.created_at
    })) }),
    invites.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AttentionGroup, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }), label: "Unaccepted staff invites", to: "/admin/invites", items: invites.map((i) => ({
      id: i.id,
      title: i.email,
      sub: i.role,
      when: i.created_at
    })) })
  ] });
}
function AttentionGroup({
  icon,
  label,
  to,
  items
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-white/[0.06] bg-muted/40 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-amber-200/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
        " ",
        label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: "font-mono text-micro text-muted-foreground hover:text-foreground", children: "open →" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: items.slice(0, 4).map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-2 text-meta", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-foreground", children: it.title }),
        it.sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground", children: it.sub })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("time", { className: "shrink-0 font-mono text-micro text-muted-foreground flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
        " ",
        timeAgo(it.when)
      ] })
    ] }, it.id)) })
  ] });
}
function Shortcut({
  to,
  label,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "group flex items-center justify-between gap-2 rounded-lg border border-white/[0.08] bg-muted/40 px-3 py-2 text-meta text-foreground transition hover:border-primary-glow/40 hover:bg-muted hover:text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 font-mono text-micro text-muted-foreground/70", children: [
      hint && /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "rounded border border-border bg-muted px-1 py-0.5", children: hint }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })
    ] })
  ] });
}
function EmptyState({
  icon,
  title,
  body
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-white/[0.015] py-7 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro text-muted-foreground", children: body })
  ] });
}
function Skeleton({
  h
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "motion-safe:animate-pulse rounded-md bg-muted", style: {
    height: h
  } });
}
function timeAgo(iso) {
  const d = new Date(iso).getTime();
  const s = Math.max(1, Math.floor((Date.now() - d) / 1e3));
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}
export {
  AdminHome as component
};
