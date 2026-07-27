import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { an as getFunnel, ao as getRecentEvents, ap as getConversionFunnel, aq as getExperimentLift, ar as getFunnelDropoff, as as getWhatsAppConversion, at as getSsrErrors, u as useAdminGate, au as EXPERIMENTS } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { a4 as LoaderCircle } from "../_libs/lucide-react.mjs";
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
const STEP_LABEL = {
  quiz_started: "Quiz started",
  quiz_completed: "Quiz completed",
  lead_submitted: "Lead submitted",
  apply_started: "Apply started",
  apply_programme_selected: "Programme selected",
  apply_profile_completed: "Profile completed",
  apply_submitted: "Application submitted",
  apply_success_viewed: "Success page viewed",
  admin_application_viewed: "Reviewer opened application",
  admin_application_status_changed: "Status changed",
  enrol_intent_created: "Enrol intent created",
  checkout_started: "Checkout started",
  payment_started: "Payment started",
  payment_success: "Payment success",
  apply_cta_click: "Apply CTA clicked",
  page_view: "Page view"
};
function FunnelPage() {
  const navigate = useNavigate();
  const fn = useServerFn(getFunnel);
  const recent = useServerFn(getRecentEvents);
  const conv = useServerFn(getConversionFunnel);
  const lift = useServerFn(getExperimentLift);
  const dropoff = useServerFn(getFunnelDropoff);
  const waConv = useServerFn(getWhatsAppConversion);
  const ssrErrFn = useServerFn(getSsrErrors);
  const {
    status: gate
  } = useAdminGate(["admin", "reviewer", "support"]);
  const [days, setDays] = reactExports.useState(30);
  const [data, setData] = reactExports.useState(null);
  const [events, setEvents] = reactExports.useState([]);
  const [convData, setConvData] = reactExports.useState(null);
  const [lifts, setLifts] = reactExports.useState({});
  const [dropoffData, setDropoffData] = reactExports.useState(null);
  const [waConvData, setWaConvData] = reactExports.useState(null);
  const [ssrErrData, setSsrErrData] = reactExports.useState(null);
  const [tab, setTab] = reactExports.useState("funnel");
  const [loading, setLoading] = reactExports.useState(false);
  const [live, setLive] = reactExports.useState("off");
  const refetchTimer = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const f = await fn({
          data: {
            fromDays: days
          }
        });
        if (!cancelled) setData(f);
      } catch {
      }
      try {
        const e = await recent();
        if (!cancelled) setEvents(e.events);
      } catch {
      }
      try {
        const c = await conv({
          data: {
            fromDays: days
          }
        });
        if (!cancelled) setConvData(c);
      } catch {
      }
      try {
        const d = await dropoff({
          data: {
            fromDays: days
          }
        });
        if (!cancelled) setDropoffData(d);
      } catch {
      }
      try {
        const w = await waConv({
          data: {
            fromDays: days
          }
        });
        if (!cancelled) setWaConvData(w);
      } catch {
      }
      try {
        const s = await ssrErrFn({
          data: {
            fromDays: Math.min(days, 30)
          }
        });
        if (!cancelled) setSsrErrData(s);
      } catch {
      }
      try {
        const liftEntries = await Promise.all(Object.keys(EXPERIMENTS).map(async (exp) => {
          try {
            const l = await lift({
              data: {
                experiment: exp,
                fromDays: days
              }
            });
            return [exp, l];
          } catch {
            return [exp, null];
          }
        }));
        if (!cancelled) {
          const obj = {};
          for (const [k, v] of liftEntries) if (v) obj[k] = v;
          setLifts(obj);
        }
      } catch {
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [gate, days, fn, recent, conv, lift, dropoff, waConv, ssrErrFn]);
  reactExports.useEffect(() => {
    if (gate !== "ready") return;
    setLive("connecting");
    const channel = supabase.channel("analytics_events:live").on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "analytics_events"
    }, (payload) => {
      const row = payload.new;
      setEvents((prev) => [row, ...prev].slice(0, 200));
      if (refetchTimer.current) clearTimeout(refetchTimer.current);
      refetchTimer.current = setTimeout(async () => {
        try {
          const f = await fn({
            data: {
              fromDays: days
            }
          });
          setData(f);
        } catch {
        }
      }, 1500);
    }).subscribe((status) => {
      if (status === "SUBSCRIBED") setLive("on");
      else if (status === "CHANNEL_ERROR" || status === "CLOSED") setLive("off");
    });
    return () => {
      if (refetchTimer.current) clearTimeout(refetchTimer.current);
      supabase.removeChannel(channel);
    };
  }, [gate, days, fn]);
  if (gate === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
      " Loading…"
    ] });
  }
  if (gate === "unauth") {
    navigate({
      to: "/admin/login"
    });
    return null;
  }
  if (gate === "forbidden") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100", children: "No staff role assigned." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin · Analytics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2", children: "Funnel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Where users drop off across quiz, apply and admin review." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-micro font-mono uppercase tracking-widest ${live === "on" ? "border-accent-glow/30 bg-accent-glow/10 text-eyebrow" : live === "connecting" ? "border-border bg-muted text-foreground" : "border-amber-400/30 bg-amber-400/5 text-amber-200"}`, title: "Real-time updates", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${live === "on" ? "bg-accent-glow motion-safe:animate-pulse" : live === "connecting" ? "bg-slate-50/40" : "bg-amber-400"}` }),
          live === "on" ? "Live" : live === "connecting" ? "Connecting" : "Offline"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/funnel-test", className: "rounded-lg border border-border bg-muted px-3 py-2 text-xs text-foreground hover:bg-accent", children: "QA bench" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: days, onChange: (e) => setDays(Number(e.target.value)), className: "rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 1, children: "Last 24h" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 7, children: "Last 7 days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 30, children: "Last 30 days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 90, children: "Last 90 days" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex rounded-lg border border-border bg-muted text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `px-3 py-2 ${tab === "funnel" ? "bg-accent text-foreground" : "text-foreground"}`, onClick: () => setTab("funnel"), children: "Funnel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `px-3 py-2 ${tab === "dropoff" ? "bg-accent text-foreground" : "text-foreground"}`, onClick: () => setTab("dropoff"), children: "Drop-off" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `px-3 py-2 ${tab === "conversion" ? "bg-accent text-foreground" : "text-foreground"}`, onClick: () => setTab("conversion"), children: "Conversion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `px-3 py-2 ${tab === "experiments" ? "bg-accent text-foreground" : "text-foreground"}`, onClick: () => setTab("experiments"), children: "Experiments" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `px-3 py-2 ${tab === "events" ? "bg-accent text-foreground" : "text-foreground"}`, onClick: () => setTab("events"), children: "Live events" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `px-3 py-2 ${tab === "ssr" ? "bg-accent text-foreground" : "text-foreground"}`, onClick: () => setTab("ssr"), children: [
            "SSR errors",
            ssrErrData && ssrErrData.total > 0 ? ` (${ssrErrData.total})` : ""
          ] })
        ] })
      ] })
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: "Loading data…" }),
    tab === "funnel" && data && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2 xl:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelCard, { title: "Career-engine quiz", steps: data.quiz }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelCard, { title: "Apply flow", steps: data.apply }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelCard, { title: "Payment flow", steps: data.payment }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelCard, { title: "Admin review", steps: data.admin })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppCard, { data: data.whatsapp }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentOutcomeCard, { data: data.payment_outcomes })
      ] })
    ] }),
    tab === "conversion" && convData && /* @__PURE__ */ jsxRuntimeExports.jsx(ConversionTab, { data: convData, wa: waConvData }),
    tab === "dropoff" && dropoffData && /* @__PURE__ */ jsxRuntimeExports.jsx(DropoffTab, { data: dropoffData }),
    tab === "experiments" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: Object.keys(EXPERIMENTS).map((exp) => {
      const l = lifts[exp];
      if (!l) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5 text-sm text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-[0.22em] text-foreground", children: exp }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "No assignments recorded yet for this window." })
      ] }, exp);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ExperimentCard, { lift: l }, exp);
    }) }),
    tab === "events" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted text-micro uppercase tracking-widest text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "When" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Path" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Programme" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "UTM" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Anon" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground", children: new Date(e.created_at).toLocaleTimeString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-foreground", children: e.event_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground", children: e.path ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground", children: e.program_slug ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground", children: e.utm_source ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-micro text-muted-foreground", children: e.anon_id?.slice(0, 8) ?? "—" })
        ] }, e.id)),
        events.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-3 py-6 text-center text-foreground", children: "No events yet." }) })
      ] })
    ] }) }),
    tab === "ssr" && /* @__PURE__ */ jsxRuntimeExports.jsx(SsrErrorsTab, { data: ssrErrData, loading })
  ] });
}
function FunnelCard({
  title,
  steps
}) {
  const top = steps[0]?.users ?? 0;
  const overall = reactExports.useMemo(() => {
    if (!steps.length || !steps[0].users) return 0;
    const last = steps[steps.length - 1].users;
    return Math.round(last / steps[0].users * 100);
  }, [steps]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-h4 text-primary-glow", children: [
        overall,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-4 space-y-3", children: steps.map((s, i) => {
      const pct = top ? Math.round(s.users / top * 100) : 0;
      const prev = i > 0 ? steps[i - 1].users : null;
      const drop = prev !== null && prev > 0 ? Math.max(0, Math.round((prev - s.users) / prev * 100)) : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: STEP_LABEL[s.step] ?? s.step }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-base text-foreground tabular-nums", children: [
            s.users,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-micro font-normal text-muted-foreground", children: "users" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary-glow", style: {
          width: `${pct}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-between text-micro text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            pct,
            "% of step 1"
          ] }),
          drop !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: drop > 50 ? "text-amber-300" : "", children: [
            "−",
            drop,
            "% from previous"
          ] })
        ] })
      ] }, s.step);
    }) })
  ] });
}
function WhatsAppCard({
  data
}) {
  const entries = Object.entries(data.by_source).sort((a, b) => b[1] - a[1]);
  const max = entries[0]?.[1] ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "WhatsApp clicks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-h4 text-sky-300", children: data.total_clicks })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-micro text-muted-foreground", children: [
      data.unique_users,
      " unique users"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "mt-4 space-y-2", children: [
      entries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm text-foreground", children: "No WhatsApp clicks yet." }),
      entries.map(([src, n]) => {
        const pct = max ? Math.round(n / max * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: src }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-foreground tabular-nums", children: n })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-sky-400/80", style: {
            width: `${pct}%`
          } }) })
        ] }, src);
      })
    ] })
  ] });
}
function PaymentOutcomeCard({
  data
}) {
  const total = data.success + data.failure;
  const successPct = total ? Math.round(data.success / total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "Payment outcomes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-h4 text-primary-glow", children: [
        successPct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-micro text-muted-foreground", children: [
      total,
      " attempts · success rate"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-sky-400/20 bg-sky-400/[0.05] p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-widest text-sky-300", children: "Success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-h3 text-foreground tabular-nums", children: data.success })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-rose-400/20 bg-rose-400/[0.05] p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-widest text-rose-300", children: "Failure / cancelled" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-h3 text-foreground tabular-nums", children: data.failure })
      ] })
    ] })
  ] });
}
function ConversionTab({
  data,
  wa
}) {
  const steps = data.steps;
  const top = steps[0]?.users ?? 0;
  const maxSpark = Math.max(1, ...data.sparkline);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "End-to-end conversion (unique users)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "mt-4 w-full text-left text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-micro uppercase tracking-widest text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2", children: "Step" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "Users" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "% of top" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "Drop from prev" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: steps.map((s, i) => {
          const pct = top ? Math.round(s.users / top * 100) : 0;
          const prev = i > 0 ? steps[i - 1].users : null;
          const drop = prev !== null && prev > 0 ? Math.max(0, Math.round((prev - s.users) / prev * 100)) : null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-foreground", children: STEP_LABEL[s.step] ?? s.step }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right font-display text-foreground tabular-nums", children: s.users }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right text-foreground tabular-nums", children: [
              pct,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `py-2 text-right tabular-nums ${drop !== null && drop > 50 ? "text-amber-300" : "text-foreground"}`, children: drop === null ? "—" : `−${drop}%` })
          ] }, s.step);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-sky-400/20 bg-sky-400/[0.05] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-widest text-sky-300", children: "WhatsApp clicks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-h3 text-foreground tabular-nums", children: data.whatsapp_total })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-accent-glow/20 bg-accent-glow/[0.05] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-widest text-eyebrow", children: "/apply WhatsApp handoffs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-h3 text-foreground tabular-nums", children: data.whatsapp_handoff })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-rose-400/20 bg-rose-400/[0.05] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-widest text-rose-300", children: "Payment failures" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-h3 text-foreground tabular-nums", children: data.payment_failed })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "Payments · last 14 days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex h-20 items-end gap-1", children: data.sparkline.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 rounded-t bg-primary-glow/70", style: {
        height: `${Math.round(n / maxSpark * 100)}%`,
        minHeight: n ? 4 : 1
      }, title: `${n} payments` }, i)) })
    ] }),
    wa && /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppConversionCard, { wa })
  ] });
}
function WhatsAppConversionCard({
  wa
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-sky-400/20 bg-sky-400/[0.04] p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-sky-300", children: "WhatsApp → Payment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-h4 text-foreground tabular-nums", children: [
        (wa.cvr * 100).toFixed(1),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-micro text-foreground", children: [
      wa.unique_clickers,
      " unique clickers · ",
      wa.message_created,
      " likely sent ·",
      " ",
      wa.paid_within_7d,
      " paid within 7 days"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "mt-4 w-full text-left text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-micro uppercase tracking-widest text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2", children: "Source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "Clicks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "Clickers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "Msg sent (proxy)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "Paid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "CVR" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        wa.by_source.slice(0, 10).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 font-mono text-foreground", children: s.source }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right tabular-nums text-foreground", children: s.clicks }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right tabular-nums text-foreground", children: s.clickers }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right tabular-nums text-foreground", children: s.message_created }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right tabular-nums text-foreground", children: s.paid }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right tabular-nums text-sky-200", children: [
            (s.cvr * 100).toFixed(1),
            "%"
          ] })
        ] }, s.source)),
        wa.by_source.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "py-4 text-center text-muted-foreground", children: "No WhatsApp clicks yet." }) })
      ] })
    ] })
  ] });
}
function DropoffTab({
  data
}) {
  const top = data.funnel[0]?.users ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "End-to-end drop-off · career-engine → apply → payment" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-micro text-muted-foreground", children: "Unique users per step. Red rows lose >50% to the next step. Median time is event-to-event for users who completed." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-4 space-y-3", children: data.funnel.map((s) => {
      const widthPct = top ? Math.max(2, Math.round(s.users / top * 100)) : 0;
      const dropPct = s.drop_rate != null ? Math.round(s.drop_rate * 100) : null;
      const isBad = dropPct != null && dropPct > 50;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: STEP_LABEL[s.step] ?? s.step }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-base text-foreground tabular-nums", children: [
            s.users,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-micro font-normal text-muted-foreground", children: "users" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${isBad ? "bg-rose-400/80" : "bg-primary-glow"}`, style: {
          width: `${widthPct}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center justify-between gap-x-3 text-micro text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            widthPct,
            "% of step 1"
          ] }),
          dropPct != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: isBad ? "text-rose-300" : "text-foreground", children: [
            "−",
            dropPct,
            "% drop · ",
            s.drop_users,
            " users",
            s.median_to_next_ms != null ? ` · median ${formatDuration(s.median_to_next_ms)}` : ""
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "final step" })
        ] }),
        s.top_exits.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "mt-1.5 rounded-lg border border-border/60 bg-muted/40 px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "cursor-pointer text-micro uppercase tracking-widest text-muted-foreground", children: [
            "Top exit pages (",
            s.top_exits.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1 text-micro text-foreground", children: s.top_exits.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-baseline justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono", children: e.path }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-muted-foreground", children: e.count })
          ] }, e.path)) })
        ] }) : null
      ] }, s.step);
    }) })
  ] }) });
}
function formatDuration(ms) {
  if (ms < 6e4) return `${Math.round(ms / 1e3)}s`;
  if (ms < 60 * 6e4) return `${Math.round(ms / 6e4)}m`;
  return `${(ms / (60 * 6e4)).toFixed(1)}h`;
}
function ExperimentCard({
  lift
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: lift.experiment }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-micro text-muted-foreground", children: [
        "since ",
        new Date(lift.since).toLocaleDateString()
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "mt-4 w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-micro uppercase tracking-widest text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2", children: "Variant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "Assignments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "CTA clicks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "Submitted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "Paid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "CVR" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right", children: "Lift vs control" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        lift.variants.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 font-mono text-foreground", children: v.variant }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right tabular-nums text-foreground", children: v.assignments }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right tabular-nums text-foreground", children: v.cta_clicks }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right tabular-nums text-foreground", children: v.submitted }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right tabular-nums text-foreground", children: v.paid }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right tabular-nums text-foreground", children: [
            (v.cvr * 100).toFixed(1),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `py-2 text-right tabular-nums ${v.lift_vs_control === null ? "text-muted-foreground" : v.lift_vs_control >= 0 ? "text-sky-300" : "text-rose-300"}`, children: v.lift_vs_control === null ? "—" : `${v.lift_vs_control >= 0 ? "+" : ""}${(v.lift_vs_control * 100).toFixed(1)}%` })
        ] }, v.variant)),
        lift.variants.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "py-4 text-center text-muted-foreground", children: "No assignments recorded." }) })
      ] })
    ] })
  ] });
}
const KIND_LABEL = {
  hydration_invariant: {
    label: "Hydration invariant",
    tone: "bg-rose-500/15 text-rose-200 ring-rose-400/30"
  },
  missing_dehydration: {
    label: "Missing dehydration",
    tone: "bg-rose-500/15 text-rose-200 ring-rose-400/30"
  },
  seroval_serialization: {
    label: "Loader serialization",
    tone: "bg-amber-500/15 text-amber-200 ring-amber-400/30"
  },
  hydration_mismatch: {
    label: "Hydration mismatch",
    tone: "bg-amber-500/15 text-amber-200 ring-amber-400/30"
  },
  unknown: {
    label: "Unknown",
    tone: "bg-accent text-foreground ring-border"
  }
};
function SsrErrorsTab({
  data,
  loading
}) {
  if (loading && !data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: "Loading SSR error data…" });
  }
  if (!data) return null;
  const max24h = Math.max(1, ...data.sparkline24h.map((b) => b.count));
  const last24h = data.sparkline24h.reduce((acc, b) => acc + b.count, 0);
  const alertLevel = last24h === 0 ? "ok" : last24h < 10 ? "warn" : "crit";
  const alertCopy = alertLevel === "ok" ? "All clear — no SSR hydration errors in the last 24h." : alertLevel === "warn" ? `${last24h} SSR error${last24h === 1 ? "" : "s"} in the last 24h — investigate.` : `Critical: ${last24h} SSR errors in the last 24h. Pages are blanking for users.`;
  const alertTone = alertLevel === "ok" ? "border-sky-400/30 bg-sky-400/5 text-sky-200" : alertLevel === "warn" ? "border-amber-400/30 bg-amber-400/5 text-amber-200" : "border-rose-400/40 bg-rose-500/10 text-rose-200";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border p-5 ${alertTone}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em]", children: "SSR alert" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-semibold", children: alertCopy }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-end gap-1", children: data.sparkline24h.map((b) => {
        const h = Math.max(2, Math.round(b.count / max24h * 48));
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { title: `${new Date(b.hour).toLocaleString()} · ${b.count}`, className: "w-1.5 rounded-sm bg-current/40", style: {
          height: `${h}px`,
          opacity: b.count === 0 ? 0.25 : 1
        } }, b.hour);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-micro text-current/70", children: [
        "Last 24 hours · bucketed per hour · total events ",
        data.total,
        " over",
        " ",
        Math.round((Date.now() - Date.parse(data.since)) / 864e5),
        "d"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "Affected routes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          data.groups.length,
          " unique (path × kind) groups"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-micro uppercase tracking-widest text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2", children: "Path" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2", children: "Class" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-right", children: "Events" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-right", children: "Users" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2", children: "Last seen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2", children: "Sample message" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          data.groups.map((g) => {
            const k = KIND_LABEL[g.kind] ?? KIND_LABEL.unknown;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60 align-top", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-2 py-2 font-mono text-foreground/90", children: [
                g.path,
                g.slug && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-muted-foreground", children: [
                  "· ",
                  g.slug
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex rounded-full px-2 py-0.5 font-mono text-micro font-semibold ring-1 ${k.tone}`, children: k.label }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2 text-right font-display text-sm text-foreground tabular-nums", children: g.total }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2 text-right tabular-nums text-foreground", children: g.unique_users }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2 text-muted-foreground", children: new Date(g.last_seen).toLocaleString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2 max-w-[28ch] truncate text-foreground", title: g.sample_message, children: g.sample_message || "—" })
            ] }, `${g.path}-${g.kind}`);
          }),
          data.groups.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-2 py-8 text-center text-foreground", children: "No SSR hydration errors recorded in this window. 🎉" }) })
        ] })
      ] }) })
    ] }),
    data.recent.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "cursor-pointer font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: [
        "Recent raw events (",
        data.recent.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-micro", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-micro uppercase tracking-widest text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5", children: "When" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5", children: "Path" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5", children: "Kind" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5", children: "Source" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5", children: "Message" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data.recent.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-muted-foreground", children: new Date(r.at).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 font-mono text-foreground", children: r.path ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-foreground", children: (KIND_LABEL[r.kind] ?? KIND_LABEL.unknown).label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-foreground", children: r.source }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-foreground max-w-[40ch] truncate", title: r.message, children: r.message })
        ] }, r.id)) })
      ] }) })
    ] })
  ] });
}
export {
  FunnelPage as component
};
