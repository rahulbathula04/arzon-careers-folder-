import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { J as JD_PROVENANCE } from "./jdProvenance-C_dgELW0.mjs";
import { d as Sparkles, p as BookOpen, a3 as MapPin, I as CircleCheck, au as RefreshCw, q as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
function formatRefreshDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}
const TRACK_THEMES = {
  pharmacovigilance: {
    gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",
    accent: "#38bdf8",
    barColor: "#38bdf8",
    emoji: "💊"
  },
  "medical-coding": {
    gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",
    accent: "#fb923c",
    barColor: "#fb923c",
    emoji: "🩺"
  },
  "clinical-data-management": {
    gradient: "from-[#047857] via-[#059669] to-[#0d9488]",
    accent: "#34d399",
    barColor: "#34d399",
    emoji: "📊"
  },
  "sas-clinical": {
    gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",
    accent: "#a78bfa",
    barColor: "#a78bfa",
    emoji: "💻"
  },
  "regulatory-affairs": {
    gradient: "from-[#be185d] via-[#db2777] to-[#e11d48]",
    accent: "#f472b6",
    barColor: "#f472b6",
    emoji: "📋"
  },
  "medical-writing": {
    gradient: "from-[#1e40af] via-[#2563eb] to-[#0284c7]",
    accent: "#60a5fa",
    barColor: "#60a5fa",
    emoji: "✍️"
  }
};
const DEFAULT_THEME = TRACK_THEMES.pharmacovigilance;
function JDMirror({
  variant: _variant = "full",
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "jd-mirror",
      className: `py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] ${className ?? ""}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[28px] border border-slate-200/90 bg-white p-6 sm:p-8 max-w-3xl space-y-4 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold text-[#0F172A]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-[#2563EB]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0F172A] font-bold", children: "THE JD MIRROR · LIVE CREDIBILITY" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight", children: [
            '" The exact lines from real Indian JDs',
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-[#8A6D1F]", children: "and the module we built to train for each one." }),
            " ",
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-[#334155] leading-relaxed font-medium", children: "Recruiters write JDs in a very specific language. We read thousands of them, extract what actually repeats, and turn each recurring requirement into a graded week of training with a real deliverable. Nothing in our syllabus is academic filler." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: JD_PROVENANCE.map((p) => {
          const theme = TRACK_THEMES[p.slug] ?? DEFAULT_THEME;
          const phrases = p.topJdPhrases.slice(0, 3);
          const avgCoverage = Math.round(
            phrases.reduce((s, x) => s + x.coverage, 0) / phrases.length * 100
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "article",
            {
              className: "flex flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200/90 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `relative bg-gradient-to-r ${theme.gradient} p-5 text-white overflow-hidden min-h-[115px] flex flex-col justify-between`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 relative z-10", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 bg-white/95 text-[#0F172A] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-2.5 w-2.5 text-[#2563EB]" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0F172A]", children: "TRACK" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-white/95 text-[#0F172A] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "h-1.5 w-1.5 rounded-full",
                              style: { backgroundColor: theme.accent }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#0F172A]", children: [
                            avgCoverage,
                            "% match"
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md", children: p.roleTitle }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 -bottom-2 text-5xl opacity-30 select-none pointer-events-none", children: theme.emoji })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex-1 flex flex-col justify-between space-y-4 bg-white", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-[#475569] font-semibold", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-[#0F172A]", children: [
                        p.jdCount.toLocaleString("en-IN"),
                        " JDs"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[#334155]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-[#64748B]" }),
                        p.topMetros.slice(0, 2).join(" · ")
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: phrases.map((phr) => {
                      const pct = Math.round(phr.coverage * 100);
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: "tone-dark bg-[#0F172A] text-slate-100 rounded-xl p-3.5 space-y-2 shadow-sm border border-slate-800",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                CircleCheck,
                                {
                                  style: { color: "#38bdf8" },
                                  className: "h-4 w-4 shrink-0 mt-0.5 text-sky-400"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "p",
                                {
                                  style: { color: "#F8FAFC" },
                                  className: "text-xs font-bold text-[#F8FAFC] leading-snug tracking-tight",
                                  children: [
                                    '"',
                                    phr.phrase,
                                    '"'
                                  ]
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-0.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 flex-1 overflow-hidden rounded-full bg-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "h-full rounded-full transition-all duration-500",
                                  style: { width: `${pct}%`, backgroundColor: "#38bdf8" }
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "span",
                                {
                                  style: { color: "#38bdf8" },
                                  className: "font-mono text-xs font-bold text-sky-300 shrink-0",
                                  children: [
                                    pct,
                                    "%"
                                  ]
                                }
                              )
                            ] })
                          ]
                        },
                        phr.phrase
                      );
                    }) }),
                    p.lastChange && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#FEF3C7] border border-[#FDE68A] text-[#78350F] p-3 rounded-xl flex items-start gap-2 text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5 text-[#78350F] shrink-0 mt-0.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "leading-snug text-[#78350F] font-medium", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "font-bold text-[#78350F]", children: [
                          "Updated ",
                          formatRefreshDate(p.lastChange.dateISO),
                          ":"
                        ] }),
                        " ",
                        p.lastChange.note
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/courses/$slug",
                      params: { slug: p.slug },
                      className: "text-xs h-10 px-4 w-full flex items-center justify-center gap-2 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0F172A]", children: "Explore track" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 text-[#64748B]" })
                      ]
                    }
                  ) })
                ] })
              ]
            },
            p.slug
          );
        }) })
      ] })
    }
  );
}
export {
  JDMirror
};
