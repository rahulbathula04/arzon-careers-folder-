import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { aN as arzonIcon, b0 as LINKS, A as ADDRESS, aW as COURSES, a$ as useReducedMotion } from "./router-CvdLERTV.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { t as trackEvent } from "./analytics-Do62eWB1.mjs";
import { q as ArrowRight, s as MessageCircle, O as BadgeCheck, J as Building2, m as ShieldCheck, _ as Heart, l as Globe, $ as Instagram, a0 as Youtube, a1 as Linkedin, a2 as Mail, a3 as MapPin, Z as Check, a4 as LoaderCircle, a5 as Pause, d as Sparkles } from "../_libs/lucide-react.mjs";
function MotionToggle({ className = "" }) {
  const { reduced, toggle } = useReducedMotion();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: toggle,
      "aria-pressed": reduced,
      "aria-label": reduced ? "Reduced motion is on" : "Reduce motion",
      title: reduced ? "Animations are off, click to enable" : "Animations are on, click to reduce",
      className: "inline-flex items-center gap-2 rounded-full border border-slate-200/15 bg-slate-50/5 px-3 py-1.5 text-micro font-medium text-slate-100/75 hover:bg-slate-50/10 hover:text-slate-50 transition-colors " + className,
      children: [
        reduced ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: reduced ? "Reduced motion: On" : "Reduce motion" })
      ]
    }
  );
}
const LEARNER_COUNT_LABEL = "1,200+";
const SISTER_BRANDS = [
  {
    code: "AG",
    name: "Arzon Global",
    url: "https://arzonglobal.com",
    host: "arzonglobal.com",
    desc: "Talent & workforce partner across India."
  },
  {
    code: "AL",
    name: "Assay Labs",
    url: "https://assaylabs.in",
    host: "assaylabs.in",
    desc: "Bio-analytical & CRO services for life sciences."
  }
];
function detectType(value) {
  const v = value.trim();
  if (!v) return null;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "email";
  const digits = v.replace(/[^\d]/g, "");
  if (digits.length >= 7 && digits.length <= 15) return "phone";
  return null;
}
function CounsellorLeadForm() {
  const [name, setName] = reactExports.useState("");
  const [contact, setContact] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("idle");
  const [error, setError] = reactExports.useState(null);
  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    if (trimmedName.length < 1 || trimmedName.length > 120) {
      setError("Please enter your name.");
      return;
    }
    const contactType = detectType(trimmedContact);
    if (!contactType) {
      setError("Enter a valid phone number or email.");
      return;
    }
    setStatus("loading");
    const { error: insertError } = await supabase.from("counsellor_leads").insert({
      name: trimmedName,
      contact: trimmedContact,
      contact_type: contactType,
      source: typeof window !== "undefined" ? window.location.pathname : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null
    });
    if (insertError) {
      setStatus("error");
      setError("Couldn't submit right now. Please try again.");
      return;
    }
    setStatus("success");
    setName("");
    setContact("");
  }
  if (status === "success") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "status",
        "aria-live": "polite",
        className: "rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-white",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-emerald-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-white", children: "Thanks, a counsellor will reach out within 24 hours." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-slate-300", children: "No spam. We only contact you about your enquiry." })
          ] })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit,
      noValidate: true,
      "aria-labelledby": "footer-lead-heading",
      className: "space-y-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "footer-lead-name", className: "sr-only", children: "Your name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "footer-lead-name",
              name: "name",
              type: "text",
              required: true,
              maxLength: 120,
              autoComplete: "name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Your name",
              disabled: status === "loading",
              className: "h-11 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-medium text-white placeholder:text-slate-400 focus:border-sky-400 focus-ring-sky shadow-inner"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "footer-lead-contact", className: "sr-only", children: "Phone or email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "footer-lead-contact",
              name: "contact",
              type: "text",
              inputMode: "email",
              required: true,
              maxLength: 200,
              autoComplete: "email",
              value: contact,
              onChange: (e) => setContact(e.target.value),
              placeholder: "Phone or email",
              disabled: status === "loading",
              className: "h-11 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-medium text-white placeholder:text-slate-400 focus:border-sky-400 focus-ring-sky shadow-inner"
            }
          )
        ] }),
        error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "text-xs font-semibold text-rose-400", children: error }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: status === "loading",
            "aria-label": status === "loading" ? "Submitting callback request" : "Request callback",
            className: "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-4 text-xs font-bold text-white shadow-lg transition-colors disabled:opacity-60 focus-ring-sky",
            children: status === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-white" }),
              " Submitting…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Request callback ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 leading-tight", children: "By submitting, you agree to be contacted by an Arzon counsellor. No spam." })
      ]
    }
  );
}
const SIZE_PX = { sm: 20, md: 32 };
function TaskLogo({
  size = "sm",
  className = ""
}) {
  const px = SIZE_PX[size];
  const alt = "TASK — Telangana Academy for Skill and Knowledge";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      role: "img",
      "aria-label": alt,
      className: `inline-flex items-center justify-center rounded-sm px-1.5 font-mono text-micro font-bold tracking-[0.14em] ${className}`,
      style: {
        height: px,
        background: "#F5C451",
        color: "#0B1220",
        lineHeight: 1
      },
      children: "TASK"
    }
  );
}
const ALL_PROGRAMME_LINKS = COURSES.map((c) => ({ slug: c.slug, title: c.title }));
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] rounded-sm";
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "footer",
    {
      role: "contentinfo",
      "aria-labelledby": "footer-heading",
      className: "tone-dark relative bg-[#0B0F19] text-white px-3 pb-3 pt-0 sm:px-5 sm:pb-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "footer-heading", className: "sr-only", children: "Site footer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto mb-0 max-w-7xl overflow-hidden border border-white/10 bg-[#121723] px-6 py-6 sm:px-8 rounded-t-2xl shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start justify-between gap-4 md:flex-row md:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg sm:text-xl text-white", children: "Not sure which programme fits?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-slate-300", children: "Browse cohorts or talk to a counsellor, no payment required." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/courses",
                "aria-label": "Browse all programmes",
                onClick: () => trackEvent("footer_cta_click", {
                  surface: "footer",
                  target: "courses",
                  label: "Browse programmes"
                }),
                className: `inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg transition-colors ${focusRing}`,
                children: [
                  "Browse programmes",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ArrowRight,
                    {
                      "aria-hidden": "true",
                      focusable: "false",
                      className: "ml-1.5 h-4 w-4 text-white"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/contact",
                "aria-label": "Talk to a counsellor",
                onClick: () => trackEvent("footer_cta_click", {
                  surface: "footer",
                  target: "contact",
                  label: "Talk to counsellor"
                }),
                className: `inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 hover:bg-white/20 px-5 text-sm font-bold text-white transition-colors ${focusRing}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MessageCircle,
                    {
                      "aria-hidden": "true",
                      focusable: "false",
                      className: "mr-2 h-4 w-4 text-blue-400"
                    }
                  ),
                  " ",
                  "Talk to counsellor"
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl grid-cols-1 border border-white/10 bg-[#0B0F19] text-white md:grid-cols-12 rounded-b-2xl shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-white/10 p-8 md:col-span-4 md:border-b-0 md:border-r", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: arzonIcon,
                  alt: "",
                  width: 48,
                  height: 48,
                  loading: "lazy",
                  decoding: "async",
                  className: "h-full w-full object-contain"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-bold tracking-widest text-white", children: "ARZON" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-xs font-bold tracking-widest text-sky-400", children: "CAREERS" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-sm text-sm leading-relaxed text-slate-300", children: "India's workforce-readiness platform across engineering, healthcare, agriculture, business and tech. ISO 9001 certified, MSME and MCA registered." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TaskLogo, { size: "sm" }),
                " TASK-recognised"
              ] }),
              [
                {
                  icon: BadgeCheck,
                  label: "ISO 9001",
                  to: "/proof",
                  hash: "iso",
                  dot: "bg-emerald-400"
                },
                { icon: Building2, label: "MSME", to: "/proof", hash: "msme", dot: "bg-emerald-400" },
                { icon: ShieldCheck, label: "MCA", to: "/proof", hash: "mca", dot: "bg-emerald-400" },
                {
                  icon: ShieldCheck,
                  label: "Razorpay · PCI-DSS",
                  to: "/proof",
                  hash: "razorpay",
                  dot: "bg-blue-400"
                },
                {
                  icon: Heart,
                  label: "Made in Hyderabad with love",
                  to: "/",
                  hash: "",
                  dot: "bg-rose-500"
                }
              ].map(({ icon: Icon, label, to, hash, dot }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to,
                  hash,
                  "aria-label": `Verify ${label} registration`,
                  className: `inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10 ${focusRing}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: `h-2 w-2 rounded-full ${dot}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Icon,
                      {
                        "aria-hidden": "true",
                        focusable: "false",
                        className: "h-3.5 w-3.5 text-sky-400"
                      }
                    ),
                    " ",
                    label
                  ]
                },
                label
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-bold uppercase tracking-wider text-slate-400", children: "Find us" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: [
                {
                  icon: Globe,
                  label: "arzoncareers.in",
                  href: LINKS.website,
                  title: "Visit arzoncareers.in"
                },
                {
                  icon: Instagram,
                  label: "@arzon.global",
                  href: LINKS.instagram,
                  title: "Arzon Global on Instagram"
                },
                {
                  icon: Youtube,
                  label: "ETV feature",
                  href: LINKS.mediaETV.watch,
                  title: "Watch ETV Telangana feature on YouTube"
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: LINKS.linkedin,
                  title: "Arzon Global on LinkedIn"
                }
              ].map(({ icon: Icon, label, href, title }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": `${title} (opens in new tab)`,
                  className: `inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10 ${focusRing}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { "aria-hidden": "true", focusable: "false", className: "h-3.5 w-3.5 text-sky-400" }),
                    " ",
                    label
                  ]
                },
                label
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:col-span-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "nav",
                {
                  "aria-labelledby": "footer-programmes-heading",
                  className: "border-b border-white/10 p-8 sm:border-b-0 sm:border-r",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        id: "footer-programmes-heading",
                        className: "font-mono text-xs font-bold uppercase tracking-wider text-white",
                        children: "Programmes"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { role: "list", className: "mt-6 space-y-3.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400", children: "Flagship" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: "/courses/$slug",
                            params: { slug: "pharmacovigilance" },
                            className: `mt-0.5 inline-block text-sm font-bold text-white hover:text-sky-300 transition-colors ${focusRing}`,
                            style: { color: "#FFFFFF" },
                            children: "Pharmacovigilance"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/courses/medical-coding", children: "Medical Coding" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/courses/clinical-data-management", children: "Clinical Data Management" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/courses/regulatory-affairs", children: "Regulatory Affairs" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/courses/ai-intelligence", children: "AI in Healthcare" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/courses",
                          "aria-label": "View all 25 programmes",
                          className: `inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 underline decoration-1 underline-offset-4 ${focusRing}`,
                          children: [
                            "View all 25 programmes",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              ArrowRight,
                              {
                                "aria-hidden": "true",
                                focusable: "false",
                                className: "h-3 w-3 text-sky-400"
                              }
                            )
                          ]
                        }
                      ) })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "nav",
                {
                  "aria-labelledby": "footer-company-heading",
                  className: "border-b border-white/10 p-8 sm:border-b-0 sm:border-r",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        id: "footer-company-heading",
                        className: "font-mono text-xs font-bold uppercase tracking-wider text-white",
                        children: "Company"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { role: "list", className: "mt-6 space-y-3.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/about", children: "About Arzon" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/deployment-model", children: "Deployment model" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/proof", children: "Proof of impact" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/moments", children: "Arzon moments" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/credibility", children: "Why trust us" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/trust-report", children: "Trust ledger" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/industry", children: "Industry intel" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/cohorts", children: "Upcoming cohorts" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/verify", children: "Verify certificate" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/contact", children: "Contact" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400", children: "For Partners" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/recruiters", children: "For recruiters" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/tpos", children: "For TPOs / colleges" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/acri", children: "ACRI methodology" }) })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { "aria-labelledby": "footer-getstarted-heading", className: "bg-white/5 p-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    id: "footer-lead-heading",
                    className: "font-mono text-xs font-bold uppercase tracking-wider text-white",
                    children: "Talk to a counsellor"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-slate-300", children: "Leave your details, we'll call you back within 24 hours." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CounsellorLeadForm, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    id: "footer-getstarted-heading",
                    className: "mt-8 font-mono text-xs font-bold uppercase tracking-wider text-white",
                    children: "Get started"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { role: "list", className: "mt-4 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/apply", "data-apply-surface": "footer", children: "Start application" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/dashboard", children: "Dashboard" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/refund", children: "Cancellation policy" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/legal/terms", children: "Terms" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FootLink, { to: "/legal/privacy", children: "Privacy" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-3 border-t border-white/10 pt-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Mail,
                      {
                        "aria-hidden": "true",
                        focusable: "false",
                        className: "mt-0.5 h-4 w-4 shrink-0 text-sky-400"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: "mailto:info@arzonglobal.com",
                        "aria-label": "Email info@arzonglobal.com",
                        className: `text-xs font-bold text-white break-all hover:text-sky-300 ${focusRing}`,
                        style: { color: "#FFFFFF" },
                        children: "info@arzonglobal.com"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: ADDRESS.mapsUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": "Open office address in Google Maps (opens in new tab)",
                      className: `flex items-start gap-3 text-xs leading-relaxed text-slate-300 hover:text-white ${focusRing}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          MapPin,
                          {
                            "aria-hidden": "true",
                            focusable: "false",
                            className: "mt-0.5 h-4 w-4 shrink-0 text-sky-400"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          ADDRESS.company,
                          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                          ADDRESS.street,
                          ", ",
                          ADDRESS.area,
                          ",",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                          ADDRESS.locality,
                          ", ",
                          ADDRESS.city,
                          ",",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                          ADDRESS.region,
                          " ",
                          ADDRESS.postalCode,
                          ", ",
                          ADDRESS.country
                        ] })
                      ]
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "All programmes", className: "border-t border-white/10 bg-[#0B0F19] p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "ul",
              {
                role: "list",
                className: "flex flex-wrap gap-x-2 gap-y-1 text-xs uppercase leading-snug tracking-wider text-slate-400 font-mono font-semibold",
                children: ALL_PROGRAMME_LINKS.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "inline", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/courses/${l.slug}`, className: `hover:text-white ${focusRing}`, children: l.title }),
                  i < ALL_PROGRAMME_LINKS.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: " • " }) : null
                ] }, l.slug))
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl border border-t-0 border-white/10 bg-[#0B0F19] p-8 rounded-b-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-bold uppercase tracking-wider text-slate-400", children: "Part of the Arzon group" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-3", children: [
              SISTER_BRANDS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: b.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": `${b.name}, ${b.desc} (opens in new tab)`,
                  className: `group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10 ${focusRing}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white font-mono text-xs font-bold tracking-wider text-slate-900", children: b.code }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs font-bold text-white", children: [
                        b.name,
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "text-sky-400", children: "↗" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-slate-300 leading-snug", children: b.desc }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-[10px] uppercase tracking-wider text-sky-400 font-bold", children: b.host })
                    ] })
                  ]
                },
                b.host
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl border border-sky-400/30 bg-sky-500/10 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 font-mono text-xs font-bold tracking-wider text-sky-300 border border-sky-400/30", children: "AC" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-bold text-white", children: "Arzon Careers" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-slate-300 leading-snug", children: "Workforce-readiness arm, you are here." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-[10px] uppercase tracking-wider text-sky-400 font-bold", children: "arzoncareers.in" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/credibility",
                      "aria-label": "Why choose Arzon Careers",
                      className: `mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 ${focusRing}`,
                      children: [
                        "Why us",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ArrowRight,
                          {
                            "aria-hidden": "true",
                            focusable: "false",
                            className: "h-3 w-3 text-sky-400"
                          }
                        )
                      ]
                    }
                  )
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-fab-avoid": true,
              className: "mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-slate-300",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-bold uppercase tracking-wider text-white", children: "Disclaimer · ASCI compliant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5", children: [
                  "Outcomes vary. Arzon Global does not guarantee employment. The first cohort completes in November 2026; verified placement figures will be published from December 2026 onwards. Until then, see",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/proof", className: `underline text-sky-400 ${focusRing}`, children: "/proof" }),
                  " ",
                  "for the live evidence vault and",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/refund", className: `underline text-sky-400 ${focusRing}`, children: "cancellation policy" }),
                  "."
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col items-start gap-3 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "uppercase tracking-wider", children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " Arzon Global Pvt Ltd · All rights reserved"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/admin/login",
                  "aria-label": "Admin sign in",
                  className: `font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-white ${focusRing}`,
                  children: "Admin"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MotionToggle, {})
            ] })
          ] })
        ] })
      ]
    }
  );
}
function FootLink({
  to,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to,
      className: `text-sm font-semibold text-white hover:text-sky-300 transition-colors ${focusRing}`,
      style: { color: "#FFFFFF" },
      ...rest,
      children
    }
  );
}
export {
  CounsellorLeadForm as C,
  Footer as F,
  LEARNER_COUNT_LABEL as L
};
