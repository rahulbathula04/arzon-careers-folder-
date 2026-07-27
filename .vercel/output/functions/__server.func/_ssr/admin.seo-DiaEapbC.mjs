import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { u as useAdminGate } from "./router-CvdLERTV.mjs";
import { g as getGscOverview, p as pingGsc, s as submitSitemap, i as inspectUrl, u as updateSeoAlertConfig, r as runSeoAlertSweep, a as acknowledgeSeoAlert, l as listSeoAlerts } from "./seo-gsc.functions-bZ453BzG.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { a4 as LoaderCircle, a6 as ArrowLeft, bI as Settings, o as TriangleAlert, bJ as MousePointerClick, ad as Eye, bK as Percent, aZ as TrendingUp, bL as PlugZap, I as CircleCheck, bM as Upload, a9 as Search, aQ as ExternalLink, aP as Bell, bN as Play, Z as Check } from "../_libs/lucide-react.mjs";
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
function AdminSeo() {
  const navigate = useNavigate();
  const fetchOverview = useServerFn(getGscOverview);
  const fetchAlerts = useServerFn(listSeoAlerts);
  const ackAlert = useServerFn(acknowledgeSeoAlert);
  const saveConfig = useServerFn(updateSeoAlertConfig);
  const runSweep = useServerFn(runSeoAlertSweep);
  const runPing = useServerFn(pingGsc);
  const {
    status: gate
  } = useAdminGate(["admin"]);
  const [days, setDays] = reactExports.useState(28);
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [alerts, setAlerts] = reactExports.useState([]);
  const [alertCfg, setAlertCfg] = reactExports.useState({
    min_impressions: 20,
    drop_pct: 50
  });
  const [showAck, setShowAck] = reactExports.useState(false);
  const [sweeping, setSweeping] = reactExports.useState(false);
  const [sweepMsg, setSweepMsg] = reactExports.useState(null);
  const [editCfg, setEditCfg] = reactExports.useState(false);
  const [cfgDraft, setCfgDraft] = reactExports.useState({
    min_impressions: 20,
    drop_pct: 50
  });
  const [pinging, setPinging] = reactExports.useState(false);
  const [pingResult, setPingResult] = reactExports.useState(null);
  const [pingError, setPingError] = reactExports.useState(null);
  const submitFn = useServerFn(submitSitemap);
  const inspectFn = useServerFn(inspectUrl);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [submitResult, setSubmitResult] = reactExports.useState(null);
  const [submitError, setSubmitError] = reactExports.useState(null);
  const [inspectPath, setInspectPath] = reactExports.useState("/");
  const [inspecting, setInspecting] = reactExports.useState(false);
  const [inspectResult, setInspectResult] = reactExports.useState(null);
  const [inspectError, setInspectError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchOverview({
      data: {
        days
      }
    }).then((d) => {
      if (!cancelled) setData(d);
    }).catch((e) => {
      if (!cancelled) setError(e.message);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [gate, days, fetchOverview]);
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100", children: "Admin role required." });
  }
  async function refreshAlerts() {
    const res = await fetchAlerts({
      data: {
        includeAcknowledged: showAck
      }
    });
    setAlerts(res.alerts);
    setAlertCfg(res.config);
    setCfgDraft(res.config);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "inline-flex items-center gap-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3 w-3" }),
          " Admin"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2", children: "SEO performance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-black/80", children: [
          "Google Search Console · arzoncareers.in",
          data && ` · ${data.range.startDate} → ${data.range.endDate}`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/seo/settings", className: "inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-3 w-3" }),
          " GSC settings"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex rounded-full border border-border bg-muted p-1", children: [7, 28, 90].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDays(d), className: `rounded-full px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] transition ${days === d ? "bg-white text-black" : "text-foreground hover:text-foreground"}`, children: [
          d,
          "d"
        ] }, d)) })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-100 inline-flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectivityPanel, { pinging, result: pingResult, error: pingError, onTest: async () => {
      setPinging(true);
      setPingError(null);
      setPingResult(null);
      try {
        const r = await runPing({});
        setPingResult(r);
      } catch (e) {
        setPingError(e instanceof Error ? e.message : String(e));
      } finally {
        setPinging(false);
      }
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SitemapPanel, { submitting, result: submitResult, error: submitError, onSubmit: async () => {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const r = await submitFn({
          data: {}
        });
        setSubmitResult(r);
      } catch (e) {
        setSubmitError(e instanceof Error ? e.message : String(e));
      } finally {
        setSubmitting(false);
      }
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InspectPanel, { path: inspectPath, setPath: setInspectPath, inspecting, result: inspectResult, error: inspectError, onInspect: async () => {
      setInspecting(true);
      setInspectError(null);
      setInspectResult(null);
      try {
        const url = inspectPath.startsWith("http") ? inspectPath : `https://arzoncareers.in${inspectPath.startsWith("/") ? "" : "/"}${inspectPath}`;
        const r = await inspectFn({
          data: {
            inspectionUrl: url
          }
        });
        setInspectResult(r);
      } catch (e) {
        setInspectError(e instanceof Error ? e.message : String(e));
      } finally {
        setInspecting(false);
      }
    } }),
    loading && !data ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
      " Fetching from Search Console…"
    ] }) : data ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertsPanel, { alerts, config: alertCfg, showAck, sweeping, sweepMsg, editCfg, cfgDraft, setShowAck, setEditCfg, setCfgDraft, onMount: refreshAlerts, onAck: async (id) => {
        await ackAlert({
          data: {
            id
          }
        });
        await refreshAlerts();
      }, onSweep: async () => {
        setSweeping(true);
        setSweepMsg(null);
        try {
          const r = await runSweep({});
          setSweepMsg(typeof r === "object" && "result" in r ? r.result : "Done");
          await refreshAlerts();
        } catch (e) {
          setSweepMsg(e instanceof Error ? e.message : String(e));
        } finally {
          setSweeping(false);
        }
      }, onSaveCfg: async () => {
        await saveConfig({
          data: cfgDraft
        });
        setEditCfg(false);
        await refreshAlerts();
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, { className: "h-4 w-4" }), label: "Clicks", value: fmtInt(data.totals.clicks) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }), label: "Impressions", value: fmtInt(data.totals.impressions) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "h-4 w-4" }), label: "CTR", value: fmtPct(data.totals.ctr) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }), label: "Avg position", value: data.totals.position.toFixed(1) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Clicks & impressions over time", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DailyChart, { daily: data.daily }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: `Top queries (${data.topQueries.length})`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { headers: ["Query", "Clicks", "Impr.", "CTR", "Pos."], rows: data.topQueries.map((q) => [q.query || "(not provided)", fmtInt(q.clicks), fmtInt(q.impressions), fmtPct(q.ctr), q.position.toFixed(1)]) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: `Top pages (${data.topPages.length})`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { headers: ["Page", "Clicks", "Impr.", "CTR", "Pos."], rows: data.topPages.map((p) => [shortPath(p.page), fmtInt(p.clicks), fmtInt(p.impressions), fmtPct(p.ctr), p.position.toFixed(1)]) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Devices", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { headers: ["Device", "Clicks", "Impr.", "CTR"], rows: data.devices.map((d) => [d.device, fmtInt(d.clicks), fmtInt(d.impressions), fmtPct(d.ctr)]) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Countries (top 10)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { headers: ["Country", "Clicks", "Impr."], rows: data.countries.map((c) => [c.country.toUpperCase(), fmtInt(c.clicks), fmtInt(c.impressions)]) }) })
      ] }),
      data.sitemap && /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Sitemap coverage", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Submitted URLs", value: fmtInt(data.sitemap.submitted) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Indexed", value: fmtInt(data.sitemap.indexed), sub: data.sitemap.submitted ? `${Math.round(data.sitemap.indexed / data.sitemap.submitted * 100)}% coverage` : void 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Errors", value: fmtInt(data.sitemap.errors) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Warnings", value: fmtInt(data.sitemap.warnings) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
          data.sitemap.isPending ? "Re-fetch pending · " : "",
          "Last submitted",
          " ",
          fmtDate(data.sitemap.lastSubmitted),
          " · last downloaded",
          " ",
          fmtDate(data.sitemap.lastDownloaded)
        ] })
      ] })
    ] }) : null
  ] });
}
function AlertsPanel(props) {
  const {
    alerts,
    config,
    showAck,
    sweeping,
    sweepMsg,
    editCfg,
    cfgDraft,
    setShowAck,
    setEditCfg,
    setCfgDraft,
    onMount,
    onAck,
    onSweep,
    onSaveCfg
  } = props;
  reactExports.useEffect(() => {
    void onMount();
  }, [showAck]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5" }),
        " Drop alerts (",
        alerts.filter((a) => !a.acknowledged_at).length,
        " open)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowAck(!showAck), className: "rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground hover:bg-accent", children: showAck ? "Hide acknowledged" : "Show acknowledged" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditCfg(!editCfg), className: "inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground hover:bg-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-3 w-3" }),
          " Thresholds"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => void onSweep(), disabled: sweeping, className: "inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black hover:bg-slate-50/90 disabled:opacity-50", children: [
          sweeping ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 motion-safe:animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3" }),
          " ",
          "Run check now"
        ] })
      ] })
    ] }),
    editCfg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 rounded-2xl border border-border bg-muted/60 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-xs text-foreground", children: [
        "Alert when a query's clicks or impressions drop by at least",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          cfgDraft.drop_pct,
          "%"
        ] }),
        " week-over-week, provided the previous week had at least ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: cfgDraft.min_impressions }),
        " impressions."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block mb-1", children: "Min prior impressions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 1e4, value: cfgDraft.min_impressions, onChange: (e) => setCfgDraft({
            ...cfgDraft,
            min_impressions: Number(e.target.value) || 0
          }), className: "w-28 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block mb-1", children: "Drop %" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 5, max: 95, value: cfgDraft.drop_pct, onChange: (e) => setCfgDraft({
            ...cfgDraft,
            drop_pct: Number(e.target.value) || 0
          }), className: "w-24 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void onSaveCfg(), className: "rounded-full bg-primary px-3 py-1 text-xs font-semibold text-foreground hover:bg-primary/90", children: "Save" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
      sweepMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-micro text-muted-foreground", children: sweepMsg }),
      alerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "No alerts. Drops will appear here when a top query loses ≥ ",
        config.drop_pct,
        "% week-over-week (min ",
        config.min_impressions,
        " prior impressions)."
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: alerts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-wrap items-center justify-between gap-3 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium text-foreground", children: a.query || "(not provided)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-micro text-muted-foreground", children: [
            a.metric === "clicks" ? "Clicks" : "Impressions",
            " ",
            fmtInt(a.prev_value),
            " →",
            " ",
            fmtInt(a.curr_value),
            " · ",
            a.curr_window_start,
            " vs ",
            a.prev_window_start
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-red-500/15 px-2.5 py-0.5 text-xs font-semibold text-red-300 tabular-nums", children: [
          a.pct_change.toFixed(1),
          "%"
        ] }),
        a.acknowledged_at ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-micro text-muted-foreground", children: "Acknowledged" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => void onAck(a.id), className: "inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-foreground hover:bg-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
          " Ack"
        ] })
      ] }, a.id)) })
    ] })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children })
  ] });
}
function Stat({
  icon,
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary-glow", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-h2 text-foreground", children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: sub })
  ] });
}
function DataTable({
  headers,
  rows
}) {
  if (rows.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No data in this range." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "text-left", children: headers.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: `pb-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground ${i === 0 ? "" : "text-right"}`, children: h }, h)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-t border-border/60", children: r.map((cell, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `py-2 ${i === 0 ? "pr-3 text-foreground/90 truncate max-w-[260px]" : "text-right tabular-nums text-foreground"}`, children: cell }, i)) }, idx)) })
  ] }) });
}
function DailyChart({
  daily
}) {
  if (daily.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No data in this range." });
  const sorted = [...daily].sort((a, b) => a.date.localeCompare(b.date));
  const maxImp = Math.max(...sorted.map((d) => d.impressions), 1);
  const maxClk = Math.max(...sorted.map((d) => d.clicks), 1);
  const W = 800, H = 200, P = 24;
  const xStep = (W - P * 2) / Math.max(sorted.length - 1, 1);
  const impPath = sorted.map((d, i) => `${i === 0 ? "M" : "L"}${P + i * xStep},${H - P - d.impressions / maxImp * (H - P * 2)}`).join(" ");
  const clkPath = sorted.map((d, i) => `${i === 0 ? "M" : "L"}${P + i * xStep},${H - P - d.clicks / maxClk * (H - P * 2)}`).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-4 text-xs text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-3 rounded-sm bg-primary-glow" }),
        " Impressions (max ",
        fmtInt(maxImp),
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-3 rounded-sm bg-white" }),
        " Clicks (max ",
        fmtInt(maxClk),
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: `0 0 ${W} ${H}`, className: "w-full", preserveAspectRatio: "none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: impPath, fill: "none", stroke: "currentColor", className: "text-primary-glow", strokeWidth: 1.5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: clkPath, fill: "none", stroke: "currentColor", className: "text-foreground", strokeWidth: 1.5 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex justify-between text-micro text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sorted[0]?.date }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sorted[sorted.length - 1]?.date })
    ] })
  ] });
}
function fmtInt(n) {
  return new Intl.NumberFormat("en-IN").format(Math.round(n));
}
function ConnectivityPanel({
  pinging,
  result,
  error,
  onTest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-muted/30 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "inline-flex items-center gap-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlugZap, { className: "h-3.5 w-3.5" }),
          " Connector health"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Live end-to-end check against Google Search Console via the Lovable gateway." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onTest, disabled: pinging, className: "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60", children: [
        pinging ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 motion-safe:animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PlugZap, { className: "h-3.5 w-3.5" }),
        pinging ? "Testing…" : "Test connection"
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words", children: error })
    ] }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-sky-500/15 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-sky-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
        " Connected · ",
        result.latencyMs,
        " ms"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Property" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "truncate", children: result.site })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Sites in account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: result.sitesCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Permission" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: result.permissionLevel ?? "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Sample range" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
            result.sample.range.startDate,
            " → ",
            result.sample.range.endDate
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 text-left font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Top query (last 7d)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: "Clicks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: "Impr." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: "CTR" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: "Pos." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: result.sample.rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-muted-foreground", colSpan: 5, children: "No impressions in the last 7 days — connection works, but the property has no data yet." }) }) : result.sample.rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium", children: r.query || "(unset)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right tabular-nums", children: fmtInt(r.clicks) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right tabular-nums", children: fmtInt(r.impressions) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 text-right tabular-nums", children: [
            (r.ctr * 100).toFixed(1),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right tabular-nums", children: r.position.toFixed(1) })
        ] }, r.query)) })
      ] }) })
    ] })
  ] });
}
function fmtPct(n) {
  return `${(n * 100).toFixed(1)}%`;
}
function fmtDate(s) {
  if (!s) return "—";
  return new Date(s).toISOString().slice(0, 10);
}
function shortPath(url) {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url;
  }
}
function SitemapPanel({
  submitting,
  result,
  error,
  onSubmit
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-muted/30 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "inline-flex items-center gap-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
          " Sitemap submission"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-foreground", children: [
          "Resubmit",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-[#0a0c10]/40 px-1 py-0.5 text-xs", children: "/sitemap.xml" }),
          " to Google and read back its coverage."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onSubmit, disabled: submitting, className: "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60", children: [
        submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 motion-safe:animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
        submitting ? "Submitting…" : "Submit sitemap"
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words", children: error })
    ] }),
    result && result.status && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Submitted URLs", value: fmtInt(result.status.submitted) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Indexed", value: fmtInt(result.status.indexed), sub: result.status.submitted ? `${Math.round(result.status.indexed / result.status.submitted * 100)}% coverage` : void 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Errors", value: fmtInt(result.status.errors) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Warnings", value: fmtInt(result.status.warnings) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "sm:col-span-2 lg:col-span-4 text-xs text-muted-foreground", children: [
        result.status.isPending ? "Re-fetch pending · " : "",
        "Last submitted",
        " ",
        fmtDate(result.status.lastSubmitted),
        " · last downloaded",
        " ",
        fmtDate(result.status.lastDownloaded),
        " · ",
        result.feedpath
      ] })
    ] }),
    result && !result.status && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Submitted. Google hasn't returned status yet — check back in a few minutes." })
  ] });
}
function InspectPanel({
  path,
  setPath,
  inspecting,
  result,
  error,
  onInspect
}) {
  const verdictClass = (v) => v === "PASS" ? "bg-sky-500/15 text-sky-300" : v === "PARTIAL" ? "bg-amber-500/15 text-amber-200" : v === "FAIL" || v === "NEUTRAL" ? "bg-red-500/15 text-red-300" : "bg-muted text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-muted/30 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "inline-flex items-center gap-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5" }),
          " URL indexing status"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Live check against Google's index for a specific page." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: path, onChange: (e) => setPath(e.target.value), placeholder: "/courses/medical-coding", className: "w-64 rounded-full border border-border bg-[#0a0c10]/40 px-3 py-2 text-sm text-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onInspect, disabled: inspecting || !path.trim(), className: "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60", children: [
          inspecting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 motion-safe:animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5" }),
          inspecting ? "Inspecting…" : "Inspect"
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words", children: error })
    ] }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono font-semibold uppercase tracking-[0.18em] ${verdictClass(result.verdict)}`, children: [
          "Index: ",
          result.verdict ?? "—"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono font-semibold uppercase tracking-[0.18em] ${verdictClass(result.mobileVerdict)}`, children: [
          "Mobile: ",
          result.mobileVerdict ?? "—"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono font-semibold uppercase tracking-[0.18em] ${verdictClass(result.richResultsVerdict)}`, children: [
          "Rich results: ",
          result.richResultsVerdict ?? "—"
        ] }),
        result.inspectionResultLink && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: result.inspectionResultLink, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-foreground hover:bg-accent", children: [
          "Open in Search Console ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Coverage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: result.coverageState ?? "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Indexing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: result.indexingState ?? "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Robots.txt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: result.robotsTxtState ?? "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Page fetch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: result.pageFetchState ?? "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Crawled as" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: result.crawledAs ?? "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Last crawl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: fmtDate(result.lastCrawlTime) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Google canonical" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "truncate", children: result.googleCanonical ?? "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "User canonical" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "truncate", children: result.userCanonical ?? "—" })
        ] })
      ] }),
      result.sitemaps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Discovered via sitemap: ",
        result.sitemaps.join(", ")
      ] })
    ] })
  ] });
}
export {
  AdminSeo as component
};
