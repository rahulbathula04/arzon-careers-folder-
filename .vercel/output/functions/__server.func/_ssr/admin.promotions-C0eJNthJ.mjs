import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAdminGate, B as Button } from "./router-CvdLERTV.mjs";
import { A as AdminPageHeader, a as AdminKpi } from "./AdminCard-BsgPMHff.mjs";
import { I as Input } from "./input-BXbB9R4U.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { au as RefreshCw, aa as CircleAlert, bQ as Tag, d as Sparkles, aZ as TrendingUp, I as CircleCheck, av as Plus, L as Layers, a9 as Search } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./createSsrRpc-BV3sOdh8.mjs";
import "./auth-middleware-CGVBerDj.mjs";
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
function AdminPromotions() {
  const {
    status: gateStatus
  } = useAdminGate(["admin", "reviewer"]);
  const [coupons, setCoupons] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [newCode, setNewCode] = reactExports.useState("");
  const [discountPct, setDiscountPct] = reactExports.useState("50");
  const [windowMinutes, setWindowMinutes] = reactExports.useState("60");
  const [creating, setCreating] = reactExports.useState(false);
  const [statusMessage, setStatusMessage] = reactExports.useState(null);
  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.from("coupons").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      setCoupons(data || []);
    } catch (err) {
      console.error("[admin/promotions] fetch error:", err);
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to load promotions."
      });
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (gateStatus === "ready") {
      fetchPromotions();
    }
  }, [gateStatus]);
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    setCreating(true);
    setStatusMessage(null);
    try {
      const cleanCode = newCode.trim().toUpperCase();
      const pct = parseInt(discountPct, 10) || 50;
      const mins = parseInt(windowMinutes, 10) || 60;
      const {
        error
      } = await supabase.from("coupons").insert({
        code: cleanCode,
        discount_pct: pct,
        window_minutes: mins,
        is_active: true,
        max_uses_per_email: 1
      });
      if (error) throw error;
      setStatusMessage({
        type: "success",
        text: `Coupon ${cleanCode} (${pct}% off) created!`
      });
      setNewCode("");
      fetchPromotions();
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to create coupon."
      });
    } finally {
      setCreating(false);
    }
  };
  const filteredCoupons = coupons.filter((c) => c.code.toLowerCase().includes(search.toLowerCase()));
  const activeCount = coupons.filter((c) => c.is_active).length;
  if (gateStatus === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[50vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-6 w-6 animate-spin text-[#1D4ED8]" }) });
  }
  if (gateStatus === "unauth" || gateStatus === "forbidden") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md p-8 text-center space-y-2 editorial-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mx-auto h-8 w-8 text-rose-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-lg font-bold text-[#151C2E]", children: "Access Restricted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#5B6472]", children: "Authenticated staff credentials required to view promotions." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen editorial-page-bg p-6 space-y-8 max-w-[1320px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "sr-only", children: "Promotion Engine & Flash Campaigns" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPageHeader, { title: "Promotion Engine & Flash Campaigns", description: "Manage active enrolment coupons, campaign stacking rules, and promotional price overrides.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: fetchPromotions, variant: "outline", size: "sm", className: "bg-white border-slate-300 text-[#151C2E] hover:bg-slate-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-1.5 h-3.5 w-3.5" }),
      " Refresh Data"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminKpi, { label: "Total Active Coupons", value: activeCount.toString(), helper: "Ready for checkout", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-4 w-4 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminKpi, { label: "Campaign Strategy", value: "Phase 1 Active", helper: "Legacy + Flash discounts", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminKpi, { label: "Promotion Rules", value: "Stacking Enforced", helper: "Token & time locked", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-muted-foreground" }) })
    ] }),
    statusMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 rounded-lg p-4 text-xs font-medium ${statusMessage.type === "success" ? "border border-emerald-300 bg-emerald-50 text-emerald-800" : "border border-rose-300 bg-rose-50 text-rose-800"}`, children: [
      statusMessage.type === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 shrink-0 text-emerald-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0 text-rose-600" }),
      statusMessage.text
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editorial-card p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-base font-bold text-[#151C2E] flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 text-[#1D4ED8]" }),
        " Create Promo / Flash Coupon"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateCoupon, className: "grid gap-4 sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-[#707C90] uppercase tracking-wider font-medium", children: "Coupon Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newCode, onChange: (e) => setNewCode(e.target.value), placeholder: "e.g. LAUNCH50", className: "mt-1 uppercase bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E] font-mono", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-[#707C90] uppercase tracking-wider font-medium", children: "Discount %" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: discountPct, onChange: (e) => setDiscountPct(e.target.value), placeholder: "50", className: "mt-1 bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E] font-mono", min: "1", max: "100", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-[#707C90] uppercase tracking-wider font-medium", children: "Validity (Minutes)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: windowMinutes, onChange: (e) => setWindowMinutes(e.target.value), placeholder: "60", className: "mt-1 bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E] font-mono", min: "1", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: creating, className: "w-full editorial-btn-blue text-xs font-semibold h-10", children: [
          creating ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Create Coupon"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editorial-card p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-base font-bold text-[#151C2E] flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4 text-[#1D4ED8]" }),
          " Active Coupons & Campaign Rules (",
          filteredCoupons.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xs w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-[#707C90]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search coupon code...", className: "pl-9 bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E]" })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center text-[#707C90]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mx-auto h-6 w-6 animate-spin text-[#1D4ED8]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs", children: "Loading active rules..." })
      ] }) : filteredCoupons.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-[#707C90] border border-dashed border-slate-200 rounded-lg text-xs", children: "No coupons found matching your query." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs text-[#151C2E]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F2F4F9] uppercase text-[#707C90] border-b border-slate-200 font-sans tracking-wider text-[11px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Discount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Validity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Created" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-200 font-mono", children: filteredCoupons.map((coupon) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-bold text-[#151C2E]", children: coupon.code }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 font-semibold text-emerald-700", children: [
            coupon.discount_pct,
            "% OFF"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 text-[#5B6472]", children: [
            coupon.window_minutes,
            " mins"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-sans font-medium ${coupon.is_active ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-500 border border-slate-200"}`, children: coupon.is_active ? "Active" : "Inactive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-[#5B6472] font-sans", children: new Date(coupon.created_at).toLocaleDateString() })
        ] }, coupon.code)) })
      ] }) })
    ] })
  ] });
}
export {
  AdminPromotions as component
};
