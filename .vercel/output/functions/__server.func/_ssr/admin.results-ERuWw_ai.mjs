import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a9 as listResults, aa as getResultDetail, u as useAdminGate, B as Button } from "./router-CvdLERTV.mjs";
import { I as Input } from "./input-BXbB9R4U.mjs";
import { r as recordAdminExport, e as exportCsvAudited, d as dateStampedFilename } from "./admin-export.functions-BoaqXv52.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { a4 as LoaderCircle, bP as EyeOff, ak as Download, s as MessageCircle, aj as Phone, a2 as Mail, ad as Eye, X } from "../_libs/lucide-react.mjs";
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
function fitColor(score) {
  if (score == null) return "text-muted-foreground";
  if (score >= 80) return "text-sky-300";
  if (score >= 60) return "text-eyebrow";
  if (score >= 40) return "text-amber-300";
  return "text-rose-300";
}
function topPaths(r) {
  return Array.isArray(r.top_paths) ? r.top_paths : [];
}
function Sparkline({
  payload
}) {
  const p = payload ?? {};
  const b = p.breakdown ?? {};
  const dims = ["aptitude", "background", "commitment", "interest"];
  const vals = dims.map((k) => Math.max(0, Math.min(100, Number(b[k] ?? 0))));
  if (vals.every((v) => v === 0)) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70", children: "—" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-0.5 h-5", title: dims.map((k, i) => `${k}: ${vals[i]}`).join(" · "), children: vals.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 rounded-sm bg-primary-glow/70", style: {
    height: `${Math.max(8, v)}%`,
    minHeight: "2px"
  } }, i)) });
}
function AdminResults() {
  const navigate = useNavigate();
  const list = useServerFn(listResults);
  const detail = useServerFn(getResultDetail);
  const recordExport = useServerFn(recordAdminExport);
  const {
    status: gate
  } = useAdminGate(["admin", "analyst", "exporter", "viewer"]);
  const [rows, setRows] = reactExports.useState([]);
  const [facets, setFacets] = reactExports.useState({
    archetypes: [],
    cohorts: [],
    pathSlugs: []
  });
  const [caps, setCaps] = reactExports.useState({
    showPII: false,
    canExport: false,
    roles: []
  });
  const [confirmExport, setConfirmExport] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [archetype, setArchetype] = reactExports.useState("");
  const [pathSlug, setPathSlug] = reactExports.useState("");
  const [cohort, setCohort] = reactExports.useState("");
  const [minFit, setMinFit] = reactExports.useState(0);
  const [hasResult, setHasResult] = reactExports.useState("yes");
  const [sinceDays, setSinceDays] = reactExports.useState(90);
  const [query, setQuery] = reactExports.useState("");
  const [openId, setOpenId] = reactExports.useState(null);
  const [detailData, setDetailData] = reactExports.useState(null);
  const [detailLoading, setDetailLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const res = await list({
          data: {
            archetype: archetype || void 0,
            pathSlug: pathSlug || void 0,
            cohort: cohort || void 0,
            minFit: minFit > 0 ? minFit : void 0,
            hasResult,
            sinceDays
          }
        });
        if (!cancelled) {
          setRows(res.results);
          setFacets(res.facets);
          const c = res.capabilities;
          if (c) setCaps(c);
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load results");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gate, list, archetype, pathSlug, cohort, minFit, hasResult, sinceDays]);
  const visible = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => (r.name ?? "").toLowerCase().includes(q) || (r.email ?? "").toLowerCase().includes(q) || (r.phone ?? "").toLowerCase().includes(q));
  }, [rows, query]);
  const summary = reactExports.useMemo(() => {
    const scored = visible.filter((r) => r.fit_score != null).map((r) => r.fit_score);
    const median = scored.length ? [...scored].sort((a, b) => a - b)[Math.floor(scored.length / 2)] : null;
    const archetypeCounts = {};
    for (const r of visible) {
      if (r.archetype) archetypeCounts[r.archetype] = (archetypeCounts[r.archetype] ?? 0) + 1;
    }
    const topArch = Object.entries(archetypeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
    const paidCount = visible.filter((r) => r.payment?.status === "paid").length;
    return {
      total: visible.length,
      median,
      topArch,
      paidCount
    };
  }, [visible]);
  const columns = [{
    key: "created_at",
    header: "created_at"
  }, {
    key: "name",
    header: "name"
  }, {
    key: "email",
    header: "email"
  }, {
    key: "phone",
    header: "phone"
  }, {
    key: "whatsapp_optin",
    header: "whatsapp_optin"
  }, {
    key: "archetype",
    header: "archetype"
  }, {
    key: "fit_score",
    header: "fit_score"
  }, {
    key: "cohort_id",
    header: "cohort_id"
  }, {
    key: "top_path_1",
    header: "top_path_1",
    accessor: (r) => topPaths(r)[0]?.slug ?? ""
  }, {
    key: "top_path_2",
    header: "top_path_2",
    accessor: (r) => topPaths(r)[1]?.slug ?? ""
  }, {
    key: "top_path_3",
    header: "top_path_3",
    accessor: (r) => topPaths(r)[2]?.slug ?? ""
  }, {
    key: "payment_status",
    header: "payment_status",
    accessor: (r) => r.payment?.status ?? ""
  }, {
    key: "payment_tier",
    header: "payment_tier",
    accessor: (r) => r.payment?.tier ?? ""
  }, {
    key: "paid_at",
    header: "paid_at",
    accessor: (r) => r.payment?.paid_at ?? ""
  }, {
    key: "contacted_at",
    header: "contacted_at"
  }];
  const downloadCsv = async () => {
    if (!caps.canExport) {
      toast.error("Your role doesn't permit CSV export.");
      return;
    }
    if (visible.length > 200) {
      setConfirmExport(true);
      return;
    }
    await doExport();
  };
  const doExport = async () => {
    setConfirmExport(false);
    try {
      await exportCsvAudited(recordExport, "career_engine_results", dateStampedFilename("arzon-results"), visible, columns);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export blocked");
    }
  };
  const openDetail = async (id) => {
    setOpenId(id);
    setDetailData(null);
    setDetailLoading(true);
    try {
      const res = await detail({
        data: {
          id
        }
      });
      setDetailData(res);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load detail");
      setOpenId(null);
    } finally {
      setDetailLoading(false);
    }
  };
  if (gate === "loading") return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
    " Loading…"
  ] });
  if (gate === "unauth") {
    navigate({
      to: "/admin/login"
    });
    return null;
  }
  if (gate === "forbidden") return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100", children: "No staff access." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin · Results" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2", children: "Student test results" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-foreground", children: [
          "Every completed career-engine test with archetype, fit score, top paths & payment status.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/leads", className: "underline text-primary-glow", children: "View leads instead →" })
        ] }),
        !caps.showPII && caps.roles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/5 px-2.5 py-1 text-micro text-amber-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3 w-3" }),
          " PII masked for your role (",
          caps.roles.join(", "),
          ")"
        ] })
      ] }),
      caps.canExport && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: downloadCsv, variant: "secondary", className: "gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        " Export CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-3 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Results shown", value: summary.total }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Median fit", value: summary.median ?? "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Top archetype", value: summary.topArch }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Paid (matched)", value: summary.paidCount })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-2xl border border-border bg-muted/40 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "search", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search name/email/phone", className: "h-10 rounded-lg border-border bg-muted px-3 text-sm text-foreground placeholder:text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Archetype", value: archetype, onChange: setArchetype, options: facets.archetypes }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Top path", value: pathSlug, onChange: setPathSlug, options: facets.pathSlugs }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Cohort", value: cohort, onChange: setCohort, options: facets.cohorts }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-micro uppercase tracking-[0.18em] text-muted-foreground mb-1", children: [
          "Min fit ",
          minFit > 0 ? minFit : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 0, max: 100, step: 5, value: minFit, onChange: (e) => setMinFit(Number(e.target.value)), className: "w-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectBare, { value: hasResult, onChange: (v) => setHasResult(v), options: [["yes", "Completed"], ["no", "Lead only"], ["all", "All"]] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectBare, { value: String(sinceDays), onChange: (v) => setSinceDays(Number(v)), options: [["7", "7d"], ["30", "30d"], ["90", "90d"], ["365", "1y"]] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted text-micro uppercase tracking-[0.22em] text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Archetype" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Fit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "ACRI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Top path" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Cohort" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Paid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 10, className: "px-4 py-12 text-center text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "inline h-4 w-4 motion-safe:animate-spin" }),
          " Loading…"
        ] }) }),
        !loading && visible.map((r) => {
          const paths = topPaths(r);
          const top1 = paths[0];
          const phoneClean = (r.phone ?? "").replace(/\D/g, "");
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60 align-top hover:bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: new Date(r.created_at).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground font-medium", children: r.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-micro", children: r.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
              phoneClean && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/${phoneClean}`, target: "_blank", rel: "noreferrer", title: "WhatsApp", className: "text-sky-300 hover:text-sky-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }) }),
              phoneClean && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${phoneClean}`, title: "Call", className: "text-eyebrow hover:text-eyebrow-strong", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }) }),
              r.email && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${r.email}`, title: "Email", className: "text-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground text-caption", children: r.archetype ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `px-4 py-3 font-mono font-semibold ${fitColor(r.fit_score)}`, children: r.fit_score ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { payload: r.result_payload }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground text-meta", children: top1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: top1.salary ?? "", children: top1.title ?? top1.slug }) : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-meta", children: r.cohort_id ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: r.payment?.status === "paid" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-sky-400/15 text-sky-200 px-2 py-0.5 text-micro uppercase tracking-wider", children: r.payment.tier }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70 text-micro", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => openDetail(r.id), className: "inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-1 text-micro text-foreground hover:bg-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
              " Detail"
            ] }) })
          ] }, r.id);
        }),
        !loading && visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 10, className: "px-4 py-12 text-center text-muted-foreground", children: "No results match these filters." }) })
      ] })
    ] }) }),
    openId && /* @__PURE__ */ jsxRuntimeExports.jsx(DetailDrawer, { loading: detailLoading, data: detailData, onClose: () => {
      setOpenId(null);
      setDetailData(null);
    } }),
    confirmExport && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#0a0c10]/70 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-2xl border border-border bg-[#0b1020] p-6 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold", children: "Confirm large export" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-foreground", children: [
        "You're about to export ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: visible.length }),
        " student records including",
        caps.showPII ? " names, emails, and phone numbers" : " masked PII",
        ". This action will be logged with your account."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setConfirmExport(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: doExport, children: [
          "Export ",
          visible.length,
          " rows"
        ] })
      ] })
    ] }) })
  ] });
}
function Kpi({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-micro uppercase tracking-[0.22em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-h3 font-semibold text-foreground", children: value })
  ] });
}
function Select({
  label,
  value,
  onChange,
  options
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-micro uppercase tracking-[0.18em] text-muted-foreground mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value, onChange: (e) => onChange(e.target.value), className: "h-10 w-full rounded-lg border border-border bg-muted px-3 text-sm text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All" }),
      options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, children: o }, o))
    ] })
  ] });
}
function SelectBare({
  value,
  onChange,
  options
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value, onChange: (e) => onChange(e.target.value), className: "h-10 flex-1 rounded-lg border border-border bg-muted px-2 text-sm text-foreground", children: options.map(([v, lbl]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v, children: lbl }, v)) });
}
function DetailDrawer({
  loading,
  data,
  onClose
}) {
  const d = data;
  const payload = d?.lead?.result_payload ?? {};
  const breakdown = payload.breakdown ?? {};
  const ranking = payload.ranking ?? [];
  const answers = (d?.trace ?? []).filter((t) => t.source === "answer");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Close", onClick: onClose, className: "flex-1 bg-[#0a0c10]/60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-full max-w-lg overflow-y-auto bg-[#0b1020] border-l border-border p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: d?.lead?.name ?? "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            d?.lead?.email,
            " · ",
            d?.lead?.phone
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
      ] }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "inline h-4 w-4 motion-safe:animate-spin" }),
        " Loading…"
      ] }),
      !loading && d && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-micro uppercase tracking-wider text-muted-foreground", children: "Archetype" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-foreground", children: d.lead.archetype ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-micro uppercase tracking-wider text-muted-foreground", children: "Fit score · Confidence" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-foreground", children: [
            d.lead.fit_score ?? "—",
            " · ",
            payload.confidence ?? "—",
            " (",
            payload.confidenceBand ?? "—",
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-micro uppercase tracking-wider text-muted-foreground mb-2", children: "Breakdown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: Object.entries(breakdown).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-meta", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-24 text-muted-foreground capitalize", children: k }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-accent overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary-glow", style: {
              width: `${Math.max(0, Math.min(100, Number(v)))}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-right text-foreground font-mono", children: v })
          ] }, k)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-micro uppercase tracking-wider text-muted-foreground mb-2", children: "Path ranking" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-1 text-meta text-foreground", children: [
            ranking.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                i + 1,
                ". ",
                r.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground", children: r.fit })
            ] }, r.id)),
            ranking.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-muted-foreground", children: "—" })
          ] })
        ] }),
        payload.risks && payload.risks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-amber-400/30 bg-amber-400/5 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-micro uppercase tracking-wider text-amber-200 mb-2", children: "Risks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-meta text-amber-100", children: payload.risks.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "• [",
            r.level,
            "] ",
            r.text
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-micro uppercase tracking-wider text-muted-foreground mb-2", children: "Session" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-meta text-foreground space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Stream: ",
              d.session?.stream ?? "—"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Device: ",
              d.session?.device ?? "—"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "UTM: ",
              d.session?.utm_source ?? "—"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Started:",
              " ",
              d.session?.started_at ? new Date(d.session.started_at).toLocaleString() : "—"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Completed:",
              " ",
              d.session?.completed_at ? new Date(d.session.completed_at).toLocaleString() : "—"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-micro uppercase tracking-wider text-muted-foreground mb-2", children: [
            "Answers (",
            answers.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-meta text-foreground max-h-72 overflow-y-auto", children: [
            answers.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-28 shrink-0 text-muted-foreground font-mono", children: a.question_id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: a.answer })
            ] }, i)),
            answers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-muted-foreground", children: "No answers recorded." })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminResults as component
};
