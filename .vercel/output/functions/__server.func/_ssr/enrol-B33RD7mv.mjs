import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { aN as arzonIcon } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { a6 as ArrowLeft, Z as Check } from "../_libs/lucide-react.mjs";
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
const PHASES = [
  { id: "profile", label: "Your profile", short: "Profile" },
  { id: "programme", label: "Pick programme", short: "Program" },
  { id: "seat", label: "Apply", short: "Seat" },
  { id: "payment", label: "Payment", short: "Pay" },
  { id: "confirmed", label: "Confirmed", short: "Done" }
];
function phaseFromPath(pathname) {
  if (pathname === "/enrol/success" || pathname === "/apply/success") return "confirmed";
  if (pathname.endsWith("/pay")) return "payment";
  if (pathname === "/enrol") return "programme";
  if (/^\/enrol\/[^/]+$/.test(pathname)) return "seat";
  if (pathname === "/apply/confirm") return "seat";
  if (pathname === "/apply/review") return "programme";
  return "profile";
}
function FunnelProgress({ pathnameOverride, compact = false }) {
  const livePath = useRouterState({ select: (s) => s.location.pathname });
  const pathname = pathnameOverride ?? livePath;
  const currentId = phaseFromPath(pathname);
  const currentIndex = PHASES.findIndex((p) => p.id === currentId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      "aria-label": "Enrolment progress",
      className: "border-b border-white/10 bg-[#0B132B]/80 backdrop-blur-xl text-white w-full",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `mx-auto max-w-[1728px] w-full px-4 sm:px-8 lg:px-12 ${compact ? "py-3" : "py-4 sm:py-5"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "sr-only", children: [
              "Step ",
              currentIndex + 1,
              " of ",
              PHASES.length,
              ": ",
              PHASES[currentIndex]?.label
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex items-center gap-1 sm:gap-4", children: PHASES.map((phase, i) => {
              const done = i < currentIndex;
              const active = i === currentIndex;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex min-w-0 flex-1 items-center gap-2 sm:gap-3",
                  "aria-current": active ? "step" : void 0,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: `flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-7 sm:w-7 transition-all ${done ? "bg-emerald-500 text-slate-950 font-bold" : active ? "bg-blue-600 text-white ring-2 ring-blue-400/50 shadow-lg shadow-blue-900/50" : "bg-white/10 text-slate-400"}`,
                        children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 stroke-[3]" }) : i + 1
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `hidden text-xs font-semibold md:inline tracking-wide ${active ? "text-white font-bold" : done ? "text-slate-300" : "text-slate-500"}`,
                        children: phase.label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `truncate text-[11px] font-semibold md:hidden ${active ? "text-white font-bold" : done ? "text-slate-300" : "text-slate-500"}`,
                        children: phase.short
                      }
                    ),
                    i < PHASES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: `hidden h-0.5 flex-1 sm:mx-2 sm:inline-block rounded-full ${done ? "bg-emerald-500/60" : "bg-white/10"}`
                      }
                    )
                  ]
                },
                phase.id
              );
            }) })
          ]
        }
      )
    }
  );
}
function EnrolLayout() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  const isPayStep = pathname.endsWith("/pay");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-[#070B19] text-white w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-white/10 bg-[#0A1024]/90 backdrop-blur-xl w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1728px] w-full items-center justify-between px-4 sm:px-8 lg:px-12 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#070B17] ring-1 ring-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: arzonIcon, alt: "", className: "h-full w-full object-contain" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-semibold tracking-[0.28em] text-white", children: "ARZON" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] tracking-[0.42em] text-slate-400", children: "GLOBAL" })
        ] })
      ] }),
      !isPayStep && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-medium transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
        " Back to home"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1728px] w-full px-4 sm:px-8 lg:px-12 pb-16 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  EnrolLayout as component
};
