import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { C as CTAButton } from "./CTAButton-iRVca3vr.mjs";
import { w as waLink, B as Button } from "./router-CvdLERTV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { ao as Gift, ap as IndianRupee, U as Users, s as MessageCircle, aq as Share2, q as ArrowRight, Z as Check, ar as Copy } from "../_libs/lucide-react.mjs";
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
import "./analytics-Do62eWB1.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./createSsrRpc-BV3sOdh8.mjs";
import "./auth-middleware-CGVBerDj.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
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
const MOCK_REFERRALS = [
  { id: "1", name: "Rahul Deshmukh", date: "22 Mar 2026", status: "Enrolled", rewardInr: 2e3 },
  { id: "2", name: "Kavita Rao", date: "18 Mar 2026", status: "Enrolled", rewardInr: 2e3 },
  {
    id: "3",
    name: "Amit Kumar",
    date: "15 Mar 2026",
    status: "Assessment Completed",
    rewardInr: 0
  }
];
function ReferralHub() {
  const [copied, setCopied] = reactExports.useState(false);
  const referralCode = "ARZON-GIVE2K-ANANYA";
  const referralLink = `https://arzoncareers.in/career-engine/start?ref=${referralCode}`;
  const totalEarnedInr = 4e3;
  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };
  const shareOnWhatsApp = () => {
    const text = `Hey! I've been learning with Arzon Careers for my Healthcare & Life Sciences career. They're giving ₹2,000 OFF on all career master programs with my referral link. Take their free 3-min career assessment here: ${referralLink}`;
    window.open(waLink(text), "_blank", "noopener");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/20 p-6 sm:p-8 shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-3.5 w-3.5" }),
          " Give ₹2,000 • Get ₹2,000 Referral Program"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-grotesk text-2xl font-bold text-white", children: "Share Success. Earn Cash Rewards." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 mt-1", children: "Give your peers ₹2,000 off their enrolment fee. Get ₹2,000 cash credited via UPI for every friend who joins." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/80 px-5 py-3 rounded-2xl border border-slate-800 text-center sm:text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro font-semibold text-slate-400 uppercase tracking-widest", children: "Total Cashback Earned" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-grotesk text-3xl font-black text-emerald-400", children: [
          "₹",
          totalEarnedInr.toLocaleString("en-IN")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-800 bg-slate-950/50 p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-white font-semibold text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4 text-emerald-400" }),
          " Share via WhatsApp in 1-Tap"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: "Send a pre-filled invitation message with your referral tracking link directly to your college & WhatsApp groups." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: shareOnWhatsApp,
            className: "w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl py-2.5",
            children: [
              "Share on WhatsApp Now ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              readOnly: true,
              value: referralLink,
              className: "h-10 flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3 text-xs text-slate-300 outline-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: copyLink,
              className: "h-10 border-slate-700 text-slate-200 hover:bg-slate-800 text-xs shrink-0",
              children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-800 bg-slate-950/50 p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-emerald-400" }),
            " Your Referred Candidates"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-mono", children: "3 Referred" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pt-1", children: MOCK_REFERRALS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-white", children: item.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro text-slate-500", children: item.date })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-block rounded px-2 py-0.5 text-micro font-bold ${item.status === "Enrolled" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`,
                    children: item.status
                  }
                ),
                item.rewardInr > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-micro font-mono text-emerald-400 font-bold mt-0.5", children: [
                  "+₹",
                  item.rewardInr,
                  " Paid"
                ] })
              ] })
            ]
          },
          item.id
        )) })
      ] })
    ] })
  ] });
}
function ReferPage() {
  const cards = [{
    icon: Gift,
    label: "They save",
    value: "₹1,000",
    sub: "off any tier at checkout"
  }, {
    icon: IndianRupee,
    label: "You earn",
    value: "₹3,000",
    sub: "credited after they pay"
  }, {
    icon: Users,
    label: "No cap",
    value: "Unlimited",
    sub: "refer as many as you like"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-app text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl px-5 pb-20 pt-16 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold", children: "Alumni & friends" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-3", children: "Refer a healthcare graduate." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "body-lg mt-4 max-w-2xl", children: "You know who's stuck job-hunting after B.Pharm or B.Sc. Send them the ACRI Preview. If they enrol, you earn ₹2,000 and they get ₹2,000 off." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReferralHub, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-4 sm:grid-cols-3", children: cards.map(({
        icon: Icon,
        label,
        value,
        sub
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.03] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-mono text-micro uppercase tracking-[0.18em] text-white/80", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-grotesk text-h3 font-bold", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/80", children: sub })
      ] }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-grotesk text-lg font-bold", children: "How it works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "mt-3 list-decimal space-y-2 pl-5 text-sm text-white/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "WhatsApp our counsellor your friend's name and number." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "We send them the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/career-engine", className: "underline", children: "ACRI Readiness Preview" }),
            " ",
            "with your referral tag."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "If they enrol in any tier, you receive ₹3,000 within 7 days." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink("Hi Arzon, I want to refer a friend. Their name is ___ and their phone is ___."), target: "_blank", rel: "noreferrer", className: "btn btn-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          " Refer over WhatsApp"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CTAButton, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/career-engine", children: "Or share the ACRI Preview link →" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-xs text-white/80", children: "Payouts are made via UPI to the referrer's verified number after the referred candidate's enrolment is confirmed and the cohort starts." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ReferPage as component
};
