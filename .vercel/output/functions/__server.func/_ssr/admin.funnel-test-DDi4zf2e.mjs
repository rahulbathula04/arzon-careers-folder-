import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { u as useAdminGate, t as track } from "./router-CvdLERTV.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import { a4 as LoaderCircle, az as Zap, bd as Trash2 } from "../_libs/lucide-react.mjs";
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
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/uncrypto.mjs";
import "node:crypto";
const clearTestEvents = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("ba002a653b4789a1f8574ccb866a2ebea1bb92ef717e01a2a113262057ed04aa"));
const QUIZ_EVENTS = [{
  name: "quiz_started",
  label: "Quiz started"
}, {
  name: "quiz_completed",
  label: "Quiz completed"
}, {
  name: "lead_submitted",
  label: "Lead submitted"
}];
const APPLY_EVENTS = [{
  name: "apply_started",
  label: "Apply started"
}, {
  name: "apply_programme_selected",
  label: "Programme selected"
}, {
  name: "apply_submitted",
  label: "Application submitted"
}, {
  name: "apply_success_viewed",
  label: "Success viewed"
}];
const ADMIN_EVENTS = [{
  name: "admin_application_viewed",
  label: "Reviewer opened"
}, {
  name: "admin_application_status_changed",
  label: "Status changed"
}];
const PROGRAMS = ["clinical-data-management", "medical-coding", "pharmacovigilance"];
const UTMS = ["qa", "instagram", "whatsapp", "(none)"];
function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : r & 3 | 8).toString(16);
  });
}
function FunnelTestPage() {
  const navigate = useNavigate();
  const clearFn = useServerFn(clearTestEvents);
  const {
    status: gate,
    userId
  } = useAdminGate(["admin", "reviewer", "support"]);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [program, setProgram] = reactExports.useState(PROGRAMS[0]);
  const [utm, setUtm] = reactExports.useState("qa");
  const [fired, setFired] = reactExports.useState([]);
  const [bursting, setBursting] = reactExports.useState(false);
  const [clearing, setClearing] = reactExports.useState(false);
  const counter = reactExports.useRef(0);
  reactExports.useEffect(() => {
    if (gate !== "ready" || !userId) return;
    let cancelled = false;
    supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin"
    }).then(({
      data
    }) => {
      if (!cancelled) setIsAdmin(data === true);
    });
    return () => {
      cancelled = true;
    };
  }, [gate, userId]);
  function fire(eventName, opts = {}) {
    const programSlug = program;
    const utmSource = utm === "(none)" ? null : utm;
    track(eventName, {
      program_slug: programSlug,
      props: {
        test: true,
        qa_run_id: counter.current,
        ...opts.anon_id ? {
          override_anon: opts.anon_id
        } : {}
      }
    });
    counter.current += 1;
    const entry = {
      id: uuid(),
      t: Date.now(),
      name: eventName,
      program: programSlug,
      utm: utmSource ?? "—"
    };
    setFired((prev) => [entry, ...prev].slice(0, 20));
  }
  async function burst() {
    setBursting(true);
    try {
      for (let i = 0; i < 10; i++) {
        const drop = Math.random();
        track("quiz_started", {
          program_slug: program,
          props: {
            test: true,
            mock_user: i
          }
        });
        if (drop > 0.15) track("quiz_completed", {
          program_slug: program,
          props: {
            test: true,
            mock_user: i
          }
        });
        if (drop > 0.35) track("lead_submitted", {
          program_slug: program,
          props: {
            test: true,
            mock_user: i
          }
        });
        if (drop > 0.45) track("apply_started", {
          program_slug: program,
          props: {
            test: true,
            mock_user: i
          }
        });
        if (drop > 0.55) track("apply_programme_selected", {
          program_slug: program,
          props: {
            test: true,
            mock_user: i
          }
        });
        if (drop > 0.7) track("apply_submitted", {
          program_slug: program,
          props: {
            test: true,
            mock_user: i
          }
        });
        if (drop > 0.78) track("apply_success_viewed", {
          program_slug: program,
          props: {
            test: true,
            mock_user: i
          }
        });
        if (drop > 0.6) track("admin_application_viewed", {
          program_slug: program,
          props: {
            test: true,
            mock_user: i
          }
        });
        if (drop > 0.85) track("admin_application_status_changed", {
          program_slug: program,
          props: {
            test: true,
            mock_user: i
          }
        });
        await new Promise((r) => setTimeout(r, 80));
      }
      toast.success("Burst sent: 10 mock users");
    } finally {
      setBursting(false);
    }
  }
  async function onClear() {
    if (!confirm("Delete ALL analytics_events where props.test = true?")) return;
    setClearing(true);
    try {
      const r = await clearFn();
      toast.success(`Deleted ${r.deleted} test events`);
      setFired([]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to clear");
    } finally {
      setClearing(false);
    }
  }
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin · QA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2", children: "Funnel test bench" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-foreground", children: [
          "Fire events on demand to validate instrumentation. Every event carries",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-accent px-1 py-0.5 text-xs", children: "props.test = true" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/funnel", className: "rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground hover:bg-accent", children: "Open funnel report →" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "rounded-2xl border border-border bg-muted/60 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-micro font-semibold uppercase tracking-widest text-foreground", children: "Programme" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: program, onChange: (e) => setProgram(e.target.value), className: "mt-2 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground", children: PROGRAMS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: p }, p)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "rounded-2xl border border-border bg-muted/60 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-micro font-semibold uppercase tracking-widest text-foreground", children: "UTM source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: utm, onChange: (e) => setUtm(e.target.value), className: "mt-2 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground", children: UTMS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u, children: u }, u)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: burst, disabled: bursting, className: "rounded-2xl border border-primary/40 bg-primary/15 p-4 text-left text-sm text-foreground transition hover:bg-primary/25 disabled:opacity-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-micro font-semibold uppercase tracking-widest text-primary-glow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3" }),
          " Burst"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 block font-display text-base", children: "10 mock users · full funnel" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onClear, disabled: !isAdmin || clearing, title: isAdmin ? "" : "Admin role required", className: "rounded-2xl border border-amber-400/30 bg-amber-400/5 p-4 text-left text-sm text-amber-100 transition hover:bg-amber-400/10 disabled:cursor-not-allowed disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-micro font-semibold uppercase tracking-widest text-amber-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
          " Cleanup"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 block font-display text-base", children: "Delete all test events" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EventGroup, { title: "Quiz funnel", events: QUIZ_EVENTS, onFire: fire }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EventGroup, { title: "Apply funnel", events: APPLY_EVENTS, onFire: fire }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EventGroup, { title: "Admin funnel", events: ADMIN_EVENTS, onFire: fire })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "Fired this session" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-h4 text-primary-glow", children: counter.current })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 divide-y divide-border text-xs", children: [
        fired.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "py-3 text-foreground", children: "Nothing fired yet." }),
        fired.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: new Date(f.t).toLocaleTimeString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: f.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: f.program }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: f.utm })
        ] }, f.id))
      ] })
    ] })
  ] });
}
function EventGroup({
  title,
  events,
  onFire
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onFire(e.name), className: "flex w-full items-center justify-between rounded-lg border border-border bg-muted px-3 py-2 text-left text-sm text-foreground transition hover:bg-accent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: e.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro text-muted-foreground", children: e.name })
    ] }, e.name)) })
  ] });
}
export {
  FunnelTestPage as component
};
