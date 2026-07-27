import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { aj as listLeads, ak as markLeadContacted, al as getLeadDetail, u as useAdminGate, B as Button } from "./router-CvdLERTV.mjs";
import { I as Input } from "./input-BXbB9R4U.mjs";
import { r as recordAdminExport, e as exportCsvAudited, d as dateStampedFilename } from "./admin-export.functions-BoaqXv52.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { a4 as LoaderCircle, ak as Download, s as MessageCircle, aj as Phone, I as CircleCheck, bb as Circle, ad as Eye, X, a2 as Mail } from "../_libs/lucide-react.mjs";
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
function AdminLeads() {
  const navigate = useNavigate();
  const list = useServerFn(listLeads);
  const mark = useServerFn(markLeadContacted);
  const detail = useServerFn(getLeadDetail);
  const recordExport = useServerFn(recordAdminExport);
  const {
    status: gate,
    userId: actorId
  } = useAdminGate(["admin", "reviewer", "support"]);
  const [rows, setRows] = reactExports.useState([]);
  const [filter, setFilter] = reactExports.useState("all");
  const [query, setQuery] = reactExports.useState("");
  const [savingId, setSavingId] = reactExports.useState(null);
  const [openId, setOpenId] = reactExports.useState(null);
  const [detailData, setDetailData] = reactExports.useState(null);
  const [detailLoading, setDetailLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    (async () => {
      try {
        const res = await list({
          data: {
            contacted: filter
          }
        });
        if (!cancelled) setRows(res.leads);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load leads");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gate, filter, list]);
  const visible = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      const name = (r.name ?? "").toLowerCase();
      const email = (r.email ?? "").toLowerCase();
      const fit = r.fit_score == null ? "" : String(r.fit_score);
      return name.includes(q) || email.includes(q) || fit.includes(q);
    });
  }, [rows, query]);
  const leadColumns = [{
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
    key: "top_paths",
    header: "top_paths",
    accessor: (r) => JSON.stringify(r.top_paths ?? null)
  }, {
    key: "contacted_at",
    header: "contacted_at"
  }];
  const downloadCsv = async () => {
    try {
      await exportCsvAudited(recordExport, "career_engine_leads", dateStampedFilename("arzon-leads"), visible, leadColumns);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export blocked");
    }
  };
  const toggle = async (lead) => {
    setSavingId(lead.id);
    try {
      await mark({
        data: {
          id: lead.id,
          contacted: !lead.contacted_at,
          actorId
        }
      });
      setRows((cur) => cur.map((r) => r.id === lead.id ? {
        ...r,
        contacted_at: lead.contacted_at ? null : (/* @__PURE__ */ new Date()).toISOString()
      } : r));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setSavingId(null);
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin · Leads" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2", children: "Career-engine leads" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-foreground", children: [
          visible.length,
          " shown",
          query.trim() ? ` · filtered from ${rows.length}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "search", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search name, email, fit…", "aria-label": "Search leads by name, email, or fit score", maxLength: 120, className: "h-10 w-56 rounded-full border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "h-10 rounded-full border border-border bg-muted px-4 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "no", children: "Uncontacted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "yes", children: "Contacted" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: downloadCsv, variant: "secondary", className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " Export CSV"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted text-micro uppercase tracking-[0.22em] text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Archetype" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Fit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        visible.map((r) => {
          const minutesAgo = (Date.now() - new Date(r.created_at).getTime()) / (1e3 * 60);
          const isSlaBreached = !r.contacted_at && minutesAgo > 5;
          const waText = encodeURIComponent(`Hi ${r.name}, this is your Arzon Career Counsellor regarding your ACRI assessment.`);
          const waUrl = `https://wa.me/${r.phone.replace(/\D/g, "")}?text=${waText}`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60 align-top hover:bg-muted/30 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: new Date(r.created_at).toLocaleDateString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-micro text-muted-foreground", children: new Date(r.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground font-medium", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: r.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.phone }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: waUrl, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center p-1 rounded bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20", title: "Instant WhatsApp Chat", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${r.phone}`, className: "inline-flex items-center p-1 rounded bg-sky-500/10 text-sky-600 hover:bg-sky-500/20", title: "Direct Phone Call", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: r.archetype ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground font-semibold", children: r.fit_score != null ? `${r.fit_score}%` : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggle(r), disabled: savingId === r.id, className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground hover:bg-accent disabled:opacity-50", children: r.contacted_at ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500" }),
                  " Contacted"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                  " Mark contacted"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => openDetail(r.id), className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground hover:bg-accent", "aria-label": `View details for ${r.name}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-foreground" }),
                  " Details"
                ] })
              ] }),
              isSlaBreached && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded text-micro font-semibold bg-red-500/10 text-red-600 border border-red-500/20", children: [
                "⚡ SLA Alert: ",
                Math.round(minutesAgo),
                "m uncontacted"
              ] })
            ] }) })
          ] }, r.id);
        }),
        visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "px-4 py-12 text-center text-muted-foreground", children: query.trim() ? `No leads match "${query.trim()}".` : "No leads match this filter." }) })
      ] })
    ] }) }),
    openId && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadDetailDrawer, { loading: detailLoading, data: detailData, onClose: () => {
      setOpenId(null);
      setDetailData(null);
    } })
  ] });
}
function LeadDetailDrawer({
  loading,
  data,
  onClose
}) {
  const lead = data?.lead;
  const session = data?.session ?? null;
  const trace = data?.trace ?? [];
  const waLink = lead ? `https://wa.me/${lead.phone.replace(/\D/g, "")}` : "#";
  const mailLink = lead ? `mailto:${lead.email}` : "#";
  const telLink = lead ? `tel:${lead.phone}` : "#";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex justify-end", role: "dialog", "aria-modal": "true", "aria-label": "Lead detail", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute inset-0 bg-[#0a0c10]/60", onClick: onClose, "aria-label": "Close detail" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "relative ml-auto h-full w-full max-w-xl overflow-y-auto bg-[#0b0f1c] p-6 text-foreground shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold", children: "Lead detail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "rounded-full p-1.5 text-foreground hover:bg-accent", "aria-label": "Close", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-2 text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
        " Loading…"
      ] }),
      !loading && lead && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-micro font-mono uppercase tracking-[0.22em] text-primary-glow", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg font-medium", children: lead.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: lead.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground", children: [
            lead.phone,
            lead.whatsapp_optin ? " · WhatsApp ok" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1.5 rounded-full bg-sky-500/15 px-3 py-1 text-xs text-sky-200 hover:bg-sky-500/25", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
              " WhatsApp"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: mailLink, className: "inline-flex items-center gap-1.5 rounded-full bg-accent-glow/15 px-3 py-1 text-xs text-eyebrow-strong hover:bg-accent-glow/25", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
              " Email"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: telLink, className: "inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs text-foreground hover:bg-slate-50/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
              " Call"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-micro font-mono uppercase tracking-[0.22em] text-primary-glow", children: "Result" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-foreground", children: [
            "Archetype: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: lead.archetype ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground", children: [
            "Fit score: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: lead.fit_score ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground", children: [
            "Cohort interest: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: lead.cohort_id ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer text-xs text-foreground", children: "Top paths JSON" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-2 max-h-64 overflow-auto rounded bg-[#0a0c10]/50 p-3 text-micro leading-snug text-foreground", children: JSON.stringify(lead.top_paths, null, 2) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer text-xs text-foreground", children: "Result payload (ACRI etc.)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-2 max-h-64 overflow-auto rounded bg-[#0a0c10]/50 p-3 text-micro leading-snug text-foreground", children: JSON.stringify(lead.result_payload, null, 2) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-micro font-mono uppercase tracking-[0.22em] text-primary-glow", children: "Session" }),
          session ? /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-2 space-y-1 text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Stream: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: session.stream ?? "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Device: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: session.device ?? "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "UTM source: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: session.utm_source ?? "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Started:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: session.started_at ? new Date(session.started_at).toLocaleString() : "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Completed:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: session.completed_at ? new Date(session.completed_at).toLocaleString() : "—" })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "No session linked." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-micro font-mono uppercase tracking-[0.22em] text-primary-glow", children: [
            "Session trace (",
            trace.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "mt-2 space-y-1 text-micro leading-snug", children: [
            trace.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded bg-muted/60 p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
                new Date(t.at).toLocaleTimeString(),
                " · ",
                t.source,
                " · ",
                t.event
              ] }),
              t.question_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-foreground", children: [
                "Q: ",
                t.question_id,
                " →",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: t.answer ?? "—" })
              ] })
            ] }, i)),
            trace.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-muted-foreground", children: "No trace events." })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminLeads as component
};
