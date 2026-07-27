import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as Sparkles, bm as ClipboardCheck, af as GraduationCap, V as Briefcase, H as Award, aA as Trophy, Z as Check } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const STEPS = [
  {
    i: "01",
    icon: ClipboardCheck,
    weeks: "DAY 0",
    title: "Apply in 1 minute",
    desc: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Fill the form. A counsellor calls you back the ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "same day or next morning." })
    ] }),
    checklist: ["1-minute form", "Same-day callback", "No payment to apply"],
    gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",
    accentColor: "#2563eb",
    xpLabel: "# +1 COUNSELLOR CALL",
    xpBg: "bg-blue-50 border-blue-200",
    xpFg: "text-blue-700"
  },
  {
    i: "02",
    icon: GraduationCap,
    weeks: "WEEKS 1–8",
    title: "Learn live for 8 weeks",
    desc: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Live classes with industry mentors." }),
      " Weekly homework on",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "real medical files." })
    ] }),
    checklist: ["Live industry mentors", "Graded weekly homework", "Real medical files"],
    gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",
    accentColor: "#ea580c",
    xpLabel: "# +8 GRADED LESSONS",
    xpBg: "bg-orange-50 border-orange-200",
    xpFg: "text-orange-700"
  },
  {
    i: "03",
    icon: Briefcase,
    weeks: "WEEKS 9–12",
    title: "Real internship · 4 weeks",
    desc: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Work on ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "actual hospital or CRO projects." }),
      " Get a certificate you can",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "verify online." })
    ] }),
    checklist: ["Hospital / CRO project", "Mentor reviews", "Verifiable certificate"],
    gradient: "from-[#047857] via-[#059669] to-[#0d9488]",
    accentColor: "#059669",
    xpLabel: "# +1 CAPSTONE PROJECT",
    xpBg: "bg-emerald-50 border-emerald-200",
    xpFg: "text-emerald-700"
  },
  {
    i: "04",
    icon: Award,
    weeks: "WEEK 12+",
    title: "Resume + interview help",
    desc: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "We fix your CV, do mock interviews, and connect you to ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "hiring partners." })
    ] }),
    checklist: ["CV rewrite", "Mock interviews", "Direct hiring intros"],
    gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",
    accentColor: "#7c3aed",
    xpLabel: "# +1 SHOT AT AN OFFER",
    xpBg: "bg-purple-50 border-purple-200",
    xpFg: "text-purple-700"
  }
];
function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 240, damping: 22 }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "how",
      className: "py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3 max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl sm:text-5xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-tight", children: "4 simple steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm sm:text-base text-[#5B6472] leading-relaxed", children: "No long lectures. No PDFs to read alone. You learn while you do real work." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[32px] border border-slate-200/90 bg-gradient-to-b from-[#F0F5FF]/70 via-white to-[#F8FAFC] p-6 sm:p-10 space-y-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-white border border-amber-300/80 px-5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#8A6D1F] shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-amber-600" }),
            "12 WEEKS · 4 STAGES · 3+ DELIVERABLES"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:block relative max-w-4xl mx-auto py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-9 left-12 right-12 h-0.5 border-t-2 border-dashed border-slate-300 z-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between relative z-10", children: [
              STEPS.map((s) => {
                const Icon = s.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-4 ring-white",
                      style: { backgroundColor: s.accentColor },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-bold uppercase tracking-wider text-[#707C90]", children: s.weeks })
                ] }, s.i);
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-4 ring-white bg-amber-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-bold uppercase tracking-wider text-[#707C90]", children: "HIRED" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              variants: containerVariants,
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true },
              className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
              children: STEPS.map((step) => {
                const Icon = step.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.article,
                  {
                    variants: itemVariants,
                    className: "flex flex-col justify-between overflow-hidden rounded-[24px] border border-slate-200/90 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: `bg-gradient-to-r ${step.gradient} p-4 text-white relative min-h-[85px] flex flex-col justify-between`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between relative z-10", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 bg-white/95 text-slate-900 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider", children: [
                                "STEP ",
                                step.i
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 bg-white/95 text-slate-900 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider", children: step.weeks })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "absolute right-2 bottom-1 h-12 w-12 opacity-25 select-none pointer-events-none" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex-1 flex flex-col justify-between space-y-4 bg-white", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-lg font-bold text-[#151C2E]", children: step.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#5B6472] leading-relaxed", children: step.desc })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 pt-2 border-t border-slate-100", children: step.checklist.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "li",
                          {
                            className: "flex items-center gap-2 text-xs text-[#151C2E] font-medium",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-emerald-600 shrink-0" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
                            ]
                          },
                          item
                        )) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `inline-block w-full text-center px-3 py-1.5 rounded-xl border text-[10px] font-mono font-bold tracking-wider ${step.xpBg} ${step.xpFg}`,
                            children: step.xpLabel
                          }
                        ) })
                      ] })
                    ]
                  },
                  step.i
                );
              })
            }
          )
        ] })
      ] })
    }
  );
}
export {
  HowItWorks
};
