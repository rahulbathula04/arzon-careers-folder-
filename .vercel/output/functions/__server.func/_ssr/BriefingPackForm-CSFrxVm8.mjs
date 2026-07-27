import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as COUNSELLOR_PHONE_DISPLAY, d as COUNSELLOR_PHONE, w as waLink, aM as PROOF } from "./router-CvdLERTV.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { I as CircleCheck, ak as Download, aj as Phone, s as MessageCircle, a2 as Mail, K as Landmark, m as ShieldCheck, al as FileBadge, J as Building2, O as BadgeCheck, q as ArrowRight } from "../_libs/lucide-react.mjs";
import { p as objectType, y as literalType, q as stringType } from "../_libs/zod.mjs";
function GovtTrustBlock() {
  const chips = [
    {
      icon: ShieldCheck,
      label: "ISO 9001",
      value: "Certified",
      hash: "iso"
    },
    { icon: FileBadge, label: "MCA", value: "Registered", hash: "mca" },
    {
      icon: Building2,
      label: "MSME",
      value: "Verified",
      hash: "msme"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tone-dark w-full border-y border-slate-200/10 bg-[#0B1325]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1 ring-gold/30",
          style: { background: "rgba(245,196,81,0.10)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "h-5 w-5 text-gold" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[#7FB0D8]", children: [
          "TASK · Govt of Telangana · ",
          PROOF.inaugurationDate
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption font-semibold text-slate-50", children: "TASK officials joined as chief guests at our public launch." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-col gap-2.5 sm:mt-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-wrap items-center gap-1.5 sm:gap-2", children: chips.map(({ icon: Icon, label, value, hash }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/proof",
        hash,
        className: "group inline-flex items-center gap-1.5 rounded-full border border-slate-200/15 bg-white/[0.06] px-2.5 py-1 text-micro font-medium text-slate-100 transition hover:border-slate-200/30 hover:bg-white/[0.1]",
        title: value,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-[#7FB0D8]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "hidden h-3 w-3 text-sky-400 sm:inline" })
        ]
      }
    ) }, label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between gap-3 border-t border-slate-200/10 pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hidden text-meta text-slate-300 sm:block", children: "Cohort filling — apply to lock the early-bird seat fee." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/apply",
          className: "inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-gold px-4 text-caption font-semibold text-gold-ink shadow-sm transition hover:bg-gold/90 active:scale-[0.98] sm:w-auto",
          children: [
            "Apply now ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ]
        }
      )
    ] })
  ] }) }) });
}
const schema = objectType({
  contact_name: stringType().trim().min(1, "Your name").max(120),
  work_email: stringType().trim().toLowerCase().email("Use a work email").max(200),
  org_name: stringType().trim().min(1, "Organisation").max(200),
  role: stringType().trim().max(120).optional().or(literalType("")),
  year: stringType().trim().max(32).optional().or(literalType("")),
  domain: stringType().trim().max(80).optional().or(literalType("")),
  consent: literalType("on", {
    errorMap: () => ({ message: "Please confirm consent to be contacted" })
  })
});
const COPY = {
  tpo: {
    eyebrow: "Request the partner briefing pack",
    title: "We email it to your work address",
    orgLabel: "College / institution",
    yearLabel: "Graduating batch year",
    pdf: "/arzon-tpo-briefing.pdf",
    pdfLabel: "Arzon TPO briefing (PDF)",
    waMessage: "Hi, I'm a TPO and I just requested the Arzon partner briefing pack. Can you walk me through it?"
  },
  recruiter: {
    eyebrow: "Request the recruiter pack",
    title: "We email the de-identified pack to your work address",
    orgLabel: "Company",
    yearLabel: "Hiring year / cohort",
    pdf: "/arzon-recruiter-pack.pdf",
    pdfLabel: "Arzon recruiter pack (PDF)",
    waMessage: "Hi, I'm a recruiter and I just requested the Arzon recruiter pack. Can you walk me through it?"
  }
};
function BriefingPackForm({ audience }) {
  const copy = COPY[audience];
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const parsed = schema.safeParse({
      contact_name: fd.get("contact_name"),
      work_email: fd.get("work_email"),
      org_name: fd.get("org_name"),
      role: fd.get("role") ?? "",
      year: fd.get("year") ?? "",
      domain: fd.get("domain") ?? "",
      consent: fd.get("consent") ?? ""
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the fields and try again");
      return;
    }
    setSubmitting(true);
    const { error: dbError } = await supabase.from("briefing_requests").insert({
      audience,
      contact_name: parsed.data.contact_name,
      work_email: parsed.data.work_email,
      org_name: parsed.data.org_name,
      role: parsed.data.role || null,
      year: parsed.data.year || null,
      domain: parsed.data.domain || null,
      consent_given: true,
      consent_at: (/* @__PURE__ */ new Date()).toISOString(),
      source: typeof window !== "undefined" ? window.location.pathname : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 240) : null
    });
    setSubmitting(false);
    if (dbError) {
      setError("Couldn't send the request. Try again, or email partnerships directly.");
      return;
    }
    setSubmitted(true);
    formEl.reset();
  }
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-sky-300/50 bg-sky-50 p-5 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-sky-700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-grotesk text-body font-bold text-sky-900", children: "You're in. Your pack is below." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption leading-relaxed text-sky-900/80", children: "We also emailed it to your work address. A counsellor follows up within 4 working hours." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: copy.pdf,
          download: true,
          className: "mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--teal-deep)] px-5 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            " Download ",
            copy.pdfLabel
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-2.5 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `tel:+${COUNSELLOR_PHONE}`,
            className: "flex items-center gap-2 rounded-xl border border-ink/10 bg-white p-3 text-meta font-semibold text-ink hover:border-[color:var(--teal-deep)]/40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
              " ",
              COUNSELLOR_PHONE_DISPLAY
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: waLink(copy.waMessage),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-2 rounded-xl border border-ink/10 bg-white p-3 text-meta font-semibold text-ink hover:border-[color:var(--teal-deep)]/40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
              " WhatsApp"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `mailto:${audience === "tpo" ? "info@arzonglobal.com" : "hire@arzoncareers.in"}?subject=${encodeURIComponent(audience === "tpo" ? "TPO partnership enquiry" : "Recruiter enquiry")}`,
            className: "flex items-center gap-2 rounded-xl border border-ink/10 bg-white p-3 text-meta font-semibold text-ink hover:border-[color:var(--teal-deep)]/40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
              " Email counsellor"
            ]
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit,
      className: "rounded-2xl border border-ink/10 bg-white p-5 sm:p-6",
      noValidate: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]", children: copy.eyebrow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-grotesk text-body font-bold text-ink", children: copy.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "contact_name", label: "Your name", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "org_name", label: copy.orgLabel, required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "work_email", type: "email", label: "Work email", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "role", label: "Your role (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "year", label: copy.yearLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Field,
            {
              name: "domain",
              label: audience === "tpo" ? "Primary domain (e.g. CR, PV)" : "Hiring domain (e.g. CR, PV)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 flex items-start gap-2.5 text-meta leading-relaxed text-slate-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              name: "consent",
              required: true,
              className: "mt-0.5 h-4 w-4 rounded border-ink/30 text-[color:var(--teal-deep)] focus:ring-[color:var(--teal-deep)]/40"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "I agree to be contacted by an Arzon counsellor about this request. We won't add you to any marketing list." })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-meta font-semibold text-rose-600", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: submitting,
            className: "mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--teal-deep)] px-5 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)] disabled:opacity-50",
            children: submitting ? "Sending…" : "Send me the pack"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-micro leading-relaxed text-slate-500", children: "We use your email only to send the pack and have a counsellor follow up. No marketing list." })
      ]
    }
  );
}
function Field({
  name,
  label,
  type = "text",
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro font-semibold uppercase tracking-[0.16em] text-slate-500", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        name,
        type,
        required,
        maxLength: 200,
        className: "mt-1.5 h-11 w-full rounded-xl border border-ink/15 bg-white px-3 text-body-sm text-ink outline-none ring-[color:var(--teal-deep)]/30 focus:ring-2"
      }
    )
  ] });
}
export {
  BriefingPackForm as B,
  GovtTrustBlock as G
};
