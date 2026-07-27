import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a0 as NEXT_COHORT, a3 as getLeadId, M as getProfile, j as trackCEFunnelStep, e as COHORTS, k as CareerShell, S as SEAT_FEE, w as waLink, X as saveProfile, n as trackCECtaClicked, t as track, a5 as setCohort, a6 as humanizeCareerEngineError } from "./router-CvdLERTV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { d as Sparkles, r as CalendarDays, I as CircleCheck, s as MessageCircle, bH as Pencil, a4 as LoaderCircle, q as ArrowRight, m as ShieldCheck, u as RefreshCcw } from "../_libs/lucide-react.mjs";
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
const RZP = "https://rzp.io/rzp/rTrWHwjx";
const STATUS_COPY = {
  open: {
    label: "Open",
    tone: "border-accent-glow/30 bg-accent-glow/10 text-eyebrow-strong"
  },
  filling: {
    label: "Filling fast",
    tone: "border-amber-300/30 bg-amber-300/10 text-amber-200"
  },
  waitlist: {
    label: "Waitlist",
    tone: "border-white/15 bg-white/[0.04] text-white/65"
  }
};
function formatCloseDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch {
    return iso;
  }
}
function EnrolPage() {
  const [leadId, setLeadId] = reactExports.useState(null);
  const [selectedCohortId, setSelectedCohortId] = reactExports.useState(NEXT_COHORT.id);
  const [profile, setProfile] = reactExports.useState(null);
  const [editing, setEditing] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState({
    name: "",
    phone: "",
    email: "",
    whatsappOptin: true
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setLeadId(getLeadId());
    const p = getProfile();
    if (p) {
      setProfile(p);
      setDraft(p);
    } else {
      setEditing(true);
    }
    trackCEFunnelStep({
      step: "enrol",
      leadId: getLeadId()
    });
  }, []);
  const selectedCohort = reactExports.useMemo(() => COHORTS.find((c) => c.id === selectedCohortId) ?? NEXT_COHORT, [selectedCohortId]);
  const detailsValid = draft.name.trim().length >= 2 && /^\d{10}$/.test(draft.phone.replace(/\D/g, "")) && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(draft.email.trim());
  const canPay = selectedCohort.status !== "waitlist" && !!profile && !editing && !submitting;
  const saveDetails = () => {
    if (!detailsValid) {
      toast.error("Please fill in your name, 10-digit phone and email.");
      return;
    }
    const cleaned = {
      name: draft.name.trim(),
      phone: draft.phone.replace(/\D/g, ""),
      email: draft.email.trim().toLowerCase(),
      whatsappOptin: draft.whatsappOptin
    };
    saveProfile(cleaned);
    setProfile(cleaned);
    setEditing(false);
    toast.success("Details saved.");
  };
  const handlePay = async () => {
    if (!canPay) return;
    setSubmitting(true);
    trackCECtaClicked({
      step: "enrol",
      target: "pay",
      leadId: leadId ?? null
    });
    track("ce_pay_clicked", {
      lead_id: leadId ?? null,
      props: {
        cohort_id: selectedCohortId,
        amount_label: SEAT_FEE,
        cohort_status: selectedCohort.status
      }
    });
    track("payment_started", {
      lead_id: leadId ?? null,
      props: {
        cohort_id: selectedCohortId,
        amount_label: SEAT_FEE,
        provider: "razorpay",
        funnel: "career_engine"
      },
      dedupeKey: `payment_started:${leadId ?? "anon"}:${selectedCohortId}`
    });
    try {
      const url = `${RZP}#lead=${leadId ?? "anon"}&cohort=${selectedCohortId}`;
      const payWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (!payWindow) {
        toast.error("Your browser blocked the payment page. Tap the link below to pay.", {
          action: {
            label: "Open payment",
            onClick: () => window.open(url, "_blank", "noopener,noreferrer")
          },
          duration: 15e3
        });
      }
      track("razorpay_handoff", {
        lead_id: leadId ?? null,
        props: {
          cohort_id: selectedCohortId,
          amount_label: SEAT_FEE
        }
      });
      if (leadId) {
        setCohort(leadId, selectedCohortId).then(() => {
          track("cohort_selected", {
            lead_id: leadId ?? null,
            props: {
              cohort_id: selectedCohortId
            }
          });
        }).catch((err) => {
          console.warn("setCohort failed", err);
        });
      }
    } catch (err) {
      try {
        track("payment_failed", {
          lead_id: leadId ?? null,
          props: {
            cohort_id: selectedCohortId,
            stage: "handoff",
            provider: "razorpay",
            message: err instanceof Error ? err.message.slice(0, 200) : String(err).slice(0, 200)
          }
        });
      } catch {
      }
      toast.error(humanizeCareerEngineError(err, "We couldn't open the payment page. Please retry."));
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CareerShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
        " Final step"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-4", children: "Pick your cohort & lock your seat" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "body-lg mx-auto mt-3 max-w-md text-white/75", children: [
        "Choose a batch, confirm your details, then pay ",
        SEAT_FEE,
        " to reserve. Fully adjusted in your programme fee."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-mono text-micro font-semibold text-white/80", children: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-grotesk text-base font-bold text-white", children: "Choose your cohort" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3", children: COHORTS.map((c) => {
        const isSelected = selectedCohortId === c.id;
        const isDisabled = c.status === "waitlist";
        const statusCopy = STATUS_COPY[c.status];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: isDisabled, onClick: () => setSelectedCohortId(c.id), className: ["group relative flex w-full items-center justify-between rounded-2xl border p-4 text-left transition", isSelected ? "border-primary-glow/60 bg-primary/[0.08] shadow-[0_0_0_1px_var(--primary-glow)]" : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]", isDisabled && "cursor-not-allowed opacity-60"].filter(Boolean).join(" "), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4 text-primary-glow" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-grotesk text-base font-bold text-white", children: c.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full border px-2 py-0.5 font-mono text-micro font-semibold uppercase tracking-[0.14em] ${statusCopy.tone}`, children: statusCopy.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-white/65", children: [
              "Starts ",
              c.startsLabel
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-micro text-white/60", children: [
              "Applications close ",
              formatCloseDate(c.applicationsCloseISO)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: ["flex h-5 w-5 items-center justify-center rounded-full border", isSelected ? "border-primary-glow bg-primary-glow text-[#0A0F1E]" : "border-white/25"].join(" "), children: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }) })
        ] }, c.id);
      }) }),
      selectedCohort.status === "waitlist" && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink(`Hi Arzon, please add me to the waitlist for the ${selectedCohort.label} cohort.`), target: "_blank", rel: "noreferrer", className: "mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-eyebrow hover:underline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
        " Join the waitlist on WhatsApp"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-mono text-micro font-semibold text-white/80", children: "2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-grotesk text-base font-bold text-white", children: "Confirm your details" })
      ] }),
      !editing && profile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Name", value: profile.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Phone", value: `+91 ${profile.phone.replace(/^91/, "")}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Email", value: profile.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setEditing(true), className: "mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-glow hover:underline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
          " Edit details"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", autoComplete: "name", value: draft.name, onChange: (e) => setDraft({
            ...draft,
            name: e.target.value
          }), className: "ce-input", placeholder: "Your full name" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone (10 digits)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] focus-within:border-primary-glow/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center px-3 font-mono text-xs text-white/80", children: "+91" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", inputMode: "numeric", autoComplete: "tel-national", value: draft.phone.replace(/^91/, ""), onChange: (e) => setDraft({
              ...draft,
              phone: e.target.value.replace(/\D/g, "").slice(0, 10)
            }), className: "w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/55 focus:outline-none", placeholder: "98xxxxxxxx" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", autoComplete: "email", value: draft.email, onChange: (e) => setDraft({
            ...draft,
            email: e.target.value
          }), className: "ce-input", placeholder: "you@example.com" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-1 flex items-start gap-2 text-xs text-white/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: draft.whatsappOptin, onChange: (e) => setDraft({
              ...draft,
              whatsappOptin: e.target.checked
            }), className: "mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-white/5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Send me cohort updates and the welcome kit on WhatsApp." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: saveDetails, disabled: !detailsValid, className: "btn btn-primary btn-block mt-4 disabled:cursor-not-allowed disabled:opacity-60", children: "Save details" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-mono text-micro font-semibold text-white/80", children: "3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-grotesk text-base font-bold text-white", children: "Pay & lock your seat" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm text-white/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "• Seat reserved in the ",
          selectedCohort.label,
          " cohort (starts",
          " ",
          selectedCohort.startsLabel,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 1-on-1 onboarding call with a counsellor inside 24h" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Pre-batch English + basics warm-up modules" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Welcome kit with cohort group access" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Fully adjusted in your full programme fee, you don't pay this twice" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handlePay, disabled: !canPay, className: "btn btn-primary btn-block btn-glow-pulse mt-5 disabled:cursor-not-allowed disabled:opacity-60", children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
        " Opening payment…"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Pay ",
        SEAT_FEE,
        " & lock seat ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
      ] }) }),
      !profile && !editing && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-micro text-amber-300/85", children: "Confirm your details above to continue." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 inline-flex w-full items-center justify-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-white/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3 text-gold" }),
        " Razorpay · UPI / Card / Netbanking"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-accent-glow/25 bg-accent-glow/[0.05] p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "h-4 w-4 text-eyebrow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-grotesk text-sm font-bold text-white", children: "Break-even in ~28 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/70", children: "₹24,999 ÷ ₹26,667 median first-month salary. Everything after is upside." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-grotesk text-sm font-bold text-white", children: "Compliance-registered" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/70", children: "ISO 9001 certified · MSME · MCA registered Pvt. Ltd." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink(`Hi Arzon, I'm about to pay ${SEAT_FEE} for the ${selectedCohort.label} cohort but I have a quick question.`), target: "_blank", rel: "noreferrer", className: "mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-accent-glow/30 bg-accent-glow/[0.06] px-4 py-3 text-sm font-semibold text-eyebrow-strong hover:bg-accent-glow/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
      " Talk to a counsellor on WhatsApp first"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/career-engine/result", search: leadId ? {
      id: leadId
    } : {}, className: "text-xs text-white/80 hover:text-white", children: "← Back to my result" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .ce-input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgb(255 255 255 / 0.10);
          background: rgb(255 255 255 / 0.03);
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          color: white;
        }
        .ce-input::placeholder { color: rgb(255 255 255 / 0.30); }
        .ce-input:focus { outline: none; border-color: color-mix(in oklab, var(--primary-glow) 50%, transparent); }
      ` })
  ] });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-mono text-micro uppercase tracking-[0.18em] text-white/50", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-right font-grotesk text-sm font-semibold text-white", children: value })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block font-mono text-micro font-semibold uppercase tracking-[0.18em] text-white/80", children: label }),
    children
  ] });
}
export {
  EnrolPage as component
};
