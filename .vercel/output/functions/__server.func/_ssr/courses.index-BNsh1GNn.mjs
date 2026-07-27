import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { aW as COURSES, a0 as NEXT_COHORT, b1 as getAIRisk, b6 as CATEGORIES$1, b2 as getSalaryBand, b3 as getLastBatch, b4 as getCourseMeta, aZ as thumbFor, b5 as aiRiskMeta } from "./router-CvdLERTV.mjs";
import { g as getTrackTheme } from "./trackTheme-K0XYOa_i.mjs";
import { D as DOMAIN_CARDS } from "./trackDomains-D0VNISQp.mjs";
import { P as PageCTA } from "./PageCTA-gJCA8ZR3.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { a6 as ArrowLeft, q as ArrowRight, a9 as Search, X, b1 as SlidersHorizontal, am as Wrench, J as Building2, aS as ArrowUpRight, b2 as Clock3, U as Users, V as Briefcase, d as Sparkles } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
function CourseCard({ course }) {
  const { Icon } = course;
  const risk = getAIRisk(course);
  const riskMeta = aiRiskMeta(risk);
  const salary = getSalaryBand(course);
  const batch = getLastBatch(course);
  const meta = getCourseMeta(course);
  const thumb = thumbFor(course.slug, course.category);
  const theme = getTrackTheme(course.slug);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/courses/$slug",
      params: { slug: course.slug },
      "data-track": course.slug,
      style: { "--track-from": theme.hex.from, "--track-to": theme.hex.to },
      className: "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_var(--track-from),0_18px_38px_-22px_var(--track-from)]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: `absolute inset-x-0 top-0 z-10 h-[3px] ${theme.accent}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative aspect-[16/9] w-full overflow-hidden",
            style: {
              background: `
            radial-gradient(circle at 10% 20%, color-mix(in srgb, var(--track-from) 40%, transparent) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, color-mix(in srgb, var(--track-to) 40%, transparent) 0%, transparent 50%),
            #0a0c10
          `
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" }),
              thumb && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: thumb,
                  alt: `${course.title} programme cover`,
                  loading: "lazy",
                  className: "relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "aria-hidden": true,
                  className: "absolute inset-0 z-20 bg-gradient-to-t from-[#0a0c10]/80 via-transparent to-transparent"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-[#0a0c10]/80 px-2.5 py-1 shadow-sm ring-1 backdrop-blur ${theme.ring}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-3.5 w-3.5 ${theme.accentText}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro font-bold uppercase tracking-[0.18em] text-white", children: course.category.split(" ")[0] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "absolute right-3 top-3 h-5 w-5 text-white/70 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 p-5 sm:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-white/55", children: course.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 font-mono text-micro text-white/60", children: [
              course.jd.demand,
              " demand · Difficulty ",
              meta.difficulty,
              "/5"
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "h-card text-white", children: course.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 line-clamp-2 text-sm leading-relaxed text-white/65", children: course.blurb })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-[0.2em] text-white/60", children: "Salary band" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm font-semibold text-white", children: [
                salary.y1,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30", children: "→" }),
                " ",
                salary.y3
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-mono text-micro text-white/60", children: "Y1 → Y3" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-[0.2em] text-white/60", children: "AI posture" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `mt-1 inline-flex rounded-full border px-2 py-0.5 text-micro font-semibold ${riskMeta.tone}`,
                  children: riskMeta.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-mono text-micro text-white/60", children: [
                "Last batch · ",
                batch.placed,
                "/",
                batch.total
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
            course.tools.slice(0, 4).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-micro text-white/75",
                children: t
              },
              t
            )),
            course.tools.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full px-2 py-0.5 font-mono text-micro text-white/60", children: [
              "+",
              course.tools.length - 4
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-micro text-white/55", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "h-3.5 w-3.5" }),
              " 12 wk"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-rose-400 font-semibold bg-rose-400/10 px-2 py-0.5 rounded-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
              " Only 8 seats left"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1.5 font-semibold ${theme.accentText} truncate max-w-[120px]`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3.5 w-3.5 shrink-0" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: course.jd.hiringRoles[0]?.split("(")[0].trim() })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Sparkles,
            {
              className: `pointer-events-none absolute right-4 top-4 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60 ${theme.accentText}`
            }
          )
        ] })
      ]
    }
  );
}
const CATEGORY_TABS = ["All", ...CATEGORIES$1];
const RISK_FILTERS = [
  { id: "all", label: "All AI postures" },
  { id: "resistant", label: "AI-resistant" },
  { id: "audit", label: "AI-audit" },
  { id: "augmented", label: "AI-augmented" }
];
const DEMAND_RANK = { "Very High": 3, High: 2, Steady: 1 };
function salaryUpper(salary) {
  const m = salary.match(/[\d.]+/g);
  if (!m) return 0;
  return Number(m[m.length - 1]);
}
function CourseGrid() {
  const [category, setCategory] = reactExports.useState("All");
  const [risk, setRisk] = reactExports.useState("all");
  const [query, setQuery] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState("default");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = COURSES.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (risk !== "all" && getAIRisk(c) !== risk) return false;
      if (q) {
        const hay = `${c.title} ${c.blurb} ${c.tools.join(" ")} ${c.jd.hiringRoles.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sort === "salary-high")
      list = [...list].sort((a, b) => salaryUpper(b.jd.salary) - salaryUpper(a.jd.salary));
    else if (sort === "demand")
      list = [...list].sort((a, b) => DEMAND_RANK[b.jd.demand] - DEMAND_RANK[a.jd.demand]);
    else if (sort === "alpha") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [category, risk, query, sort]);
  const clear = () => {
    setCategory("All");
    setRisk("all");
    setQuery("");
    setSort("default");
  };
  const isFiltered = category !== "All" || risk !== "all" || query.length > 0 || sort !== "default";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#707C90]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "Search by role, tool, or skill (e.g. 'Argus', 'ICSR', 'SAS')",
            className: "h-12 w-full rounded-full border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold text-[#151C2E] placeholder:text-[#707C90] outline-none focus:border-blue-500 shadow-sm"
          }
        ),
        query && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setQuery(""),
            className: "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#707C90] hover:text-[#151C2E]",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: sort,
            onChange: (e) => setSort(e.target.value),
            className: "h-12 min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#151C2E] outline-none focus:border-blue-500 shadow-sm sm:flex-initial",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "default", children: "Sort: Featured" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "salary-high", children: "Salary (high → low)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "demand", children: "Demand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "alpha", children: "A → Z" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowFilters((v) => !v),
            className: "flex h-12 shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#151C2E] hover:bg-slate-50 shadow-sm sm:hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
              " Filters"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-5 space-y-3 ${showFilters ? "" : "hidden sm:block"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CATEGORY_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setCategory(tab),
          className: `rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${category === tab ? "border-white/30 bg-white/15 text-white shadow-[0_8px_24px_-12px_rgba(255,255,255,0.25)]" : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"}`,
          children: tab
        },
        tab
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: RISK_FILTERS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setRisk(r.id),
          className: `rounded-full border px-3 py-1 text-micro font-semibold transition-all ${risk === r.id ? "border-primary-glow bg-primary/15 text-primary-glow" : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white"}`,
          children: r.label
        },
        r.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between text-xs text-white/55", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Showing ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: filtered.length }),
        " of",
        " ",
        COURSES.length,
        " programmes"
      ] }),
      isFiltered && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: clear,
          className: "font-semibold text-white hover:underline",
          children: "Clear filters"
        }
      )
    ] }),
    filtered.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { course: c }, c.slug)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-h4 text-white", children: "No programmes match those filters." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/55", children: "Try widening your search or clearing filters." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: clear,
          className: "mt-4 inline-flex h-10 items-center rounded-full bg-white px-5 text-sm font-semibold text-black",
          children: "Clear filters"
        }
      )
    ] })
  ] });
}
function TrackDomainGrid({
  title,
  subtitle,
  source = "domain-grid",
  coreOnly = false,
  tone = "dark",
  className = ""
}) {
  const cards = coreOnly ? DOMAIN_CARDS.filter((c) => c.slug !== "digital-health-fhir") : DOMAIN_CARDS;
  const isLight = tone === "light";
  const tk = isLight ? {
    title: "text-ink",
    body: "text-ink/75",
    meta: "text-ink/60",
    metricBox: "border-ink/10 bg-white/70",
    dt: "text-ink/55",
    dd: "text-ink",
    divider: "border-ink/10",
    primary: "bg-ink !text-white hover:bg-ink/90",
    secondary: "border-ink/25 bg-white !text-ink hover:bg-ink/[0.04]",
    cardBorder: "border-ink/10"
  } : {
    title: "text-white",
    body: "text-white/75",
    meta: "text-white/55",
    // Track cards sit on light/mid gradient backdrops, so the metric
    // pill needs a much darker wash + higher-opacity ink for the dt/dd
    // labels to hit AA. bg-[#0a0c10]/40 backdrop-blur-md shadow-sm over a mid-gray gradient composites
    // to ~#808494, which drops white/55 to 1.26:1.
    metricBox: "border-white/15 bg-[#0a0c10]/65 backdrop-blur-sm",
    dt: "text-white/80",
    dd: "text-white",
    divider: "border-white/10",
    primary: "bg-white !text-black hover:bg-white/90",
    secondary: "border-white/35 bg-white/[0.04] !text-white hover:bg-white/10",
    cardBorder: "border-white/25"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className, children: [
    (title || subtitle) && /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6 sm:mb-8", children: [
      title ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: `text-[clamp(1.4rem,3.4vw,2rem)] font-semibold leading-tight ${tk.title}`,
          children: title
        }
      ) : null,
      subtitle ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-2 max-w-2xl text-caption leading-relaxed sm:text-body-sm ${tk.body}`, children: subtitle }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3", children: cards.map((c) => {
      const t = getTrackTheme(c.slug);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "article",
        {
          "data-testid": "track-hero",
          "data-track": c.slug,
          className: `group relative flex flex-col overflow-hidden rounded-2xl border bg-gradient-to-br ${t.grad} p-4 ring-1 ${t.ring} transition hover:-translate-y-0.5 sm:p-5 ${tk.cardBorder}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: `absolute inset-x-0 top-0 h-[3px] ${t.accent}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a0c10]/40 text-h4 ring-1 sm:h-12 sm:w-12 sm:text-h3 ${t.ring}`,
                  "aria-hidden": true,
                  children: t.emoji
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `mb-1.5 inline-flex items-center rounded-full px-2 py-0.5 font-mono text-micro uppercase tracking-[0.18em] ${t.chip}`,
                    children: c.eyebrow
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: `text-body-sm font-semibold leading-tight sm:text-body ${tk.title}`,
                    children: c.label
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-3 text-caption leading-relaxed sm:text-caption ${tk.body}`, children: c.blurb }),
            c.bestFor ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `mt-2 font-mono text-micro ${tk.meta}`, children: [
              "Best for: ",
              c.bestFor
            ] }) : null,
            c.decision ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "dl",
              {
                className: `mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border p-3 ${tk.metricBox}`,
                children: [
                  ["Salary", c.decision.salary, 0],
                  ["Hiring", c.decision.hiring, 1],
                  ["Difficulty", c.decision.difficulty, 2],
                  ["Demand", c.decision.demand, 3]
                ].map(([k, v, i]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `min-w-0 pr-2 ${i >= 2 ? `border-t pt-3 ${tk.divider}` : ""}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "dt",
                        {
                          className: `font-mono text-[0.6rem] uppercase tracking-[0.04em] leading-tight ${tk.dt}`,
                          children: k
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: `mt-1 text-[0.8125rem] font-semibold leading-snug ${tk.dd}`, children: v })
                    ]
                  },
                  k
                ))
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/apply",
                  search: { programme: c.slug, source },
                  "data-apply-surface": "track-domain-grid",
                  "data-programme-slug": c.slug,
                  "aria-label": `Apply for ${c.label} internship`,
                  className: `inline-flex min-h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:w-auto ${tk.primary}`,
                  children: [
                    "Apply now",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/courses/$slug",
                  params: { slug: c.slug },
                  "aria-label": `See full ${c.label} programme`,
                  className: `inline-flex min-h-11 w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:w-auto ${tk.secondary}`,
                  children: "See full programme"
                }
              )
            ] })
          ]
        },
        c.slug
      );
    }) })
  ] });
}
const RECRUITERS = {
  Pharmacovigilance: "IQVIA · Cognizant · Accenture · Parexel",
  "Medical Coding": "Optum · Cognizant · Omega Healthcare · AGS Health",
  "Clinical Research": "IQVIA · ICON · Syneos · Parexel",
  "SAS Clinical": "Cytel · ICON · IQVIA · Novartis"
};
const TRACKS = [
  { name: "Pharmacovigilance", tools: ["Argus Safety", "ARISg", "MedDRA", "WHO-DD", "E2B(R3)"] },
  { name: "Medical Coding", tools: ["ICD-10-CM", "CPT", "HCPCS", "3M Encoder", "EncoderPro"] },
  {
    name: "Clinical Research",
    tools: ["Medidata Rave", "Veeva Vault", "Oracle InForm", "eCRF", "ICH-GCP"]
  },
  { name: "SAS Clinical", tools: ["SAS 9.4", "SDTM", "ADaM", "Define-XML", "OpenCDISC"] }
];
function ToolsYouTouchStrip() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      "aria-label": "Tools you'll touch in each programme",
      className: "tone-light rounded-3xl border border-border bg-gradient-to-b from-white to-slate-50 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]", children: "Tools you'll touch" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-h3 font-bold leading-tight text-ink sm:text-h2", children: "The exact software fresh hires open on day one." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground", children: 'Every tool below is the literal stack pulled from 100–200 live Indian JDs per role. No "industry-standard" hand-waving — these are the strings the recruiter is grepping your CV for.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: TRACKS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "tone-light rounded-2xl border border-border bg-white p-5 shadow-[0_4px_14px_-6px_rgba(15,23,42,0.12)] transition hover:border-border hover:shadow-[0_10px_24px_-12px_rgba(15,23,42,0.2)]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-body-sm font-bold text-ink", children: t.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-accent-emerald-soft px-2 py-0.5 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-accent-emerald-deep ring-1 ring-sky-200", children: "Day one" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 flex flex-wrap gap-1.5", children: t.tools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "li",
                {
                  className: "rounded-full bg-muted px-2.5 py-1 font-mono text-micro font-semibold text-ink ring-1 ring-border",
                  children: tool
                },
                tool
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 inline-flex items-center gap-1.5 font-mono text-micro font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3" }),
                " Hired by · ",
                RECRUITERS[t.name]
              ] })
            ]
          },
          t.name
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-center font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground", children: "Stack refreshed every quarter from the live JD pool" })
      ]
    }
  );
}
const QUOTES = [
  {
    quote: "I don't care about a course certificate. Show me a candidate who has triaged ten ICSRs in Argus and I'll take the call.",
    who: "Talent lead",
    role: "Mid-size CRO, Hyderabad"
  },
  {
    quote: "Freshers who know ICD-10 conventions cold save us a month of ramp-up. That's the bar.",
    who: "Coding manager",
    role: "US healthcare BPO, Bengaluru"
  },
  {
    quote: "We screen for eCRF and protocol-deviation fluency on the first call. Most candidates can't get past it.",
    who: "Clinical operations",
    role: "Global CRO, Bengaluru"
  }
];
function RecruiterQuoteStrip() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "What recruiters say they screen for", className: "mt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "What recruiters say" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 grid gap-4 sm:grid-cols-3", children: QUOTES.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "rounded-2xl border border-white/10 bg-white/[0.03] p-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-sm leading-relaxed text-white/85", children: [
            "“",
            q.quote,
            "”"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-3 text-xs text-white/55", children: [
            q.who,
            " · ",
            q.role
          ] })
        ]
      },
      q.who + q.role
    )) })
  ] });
}
function CoursesIndex() {
  const total = COURSES.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-app bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-slate-200/80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-xs font-bold text-[#707C90] transition hover:text-[#151C2E]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
        " Back to home"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#707C90]", children: [
        total,
        " PROGRAMMES · ",
        NEXT_COHORT?.label ?? "UPCOMING",
        " COHORT"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151C2E] tracking-tight leading-tight mt-3 max-w-3xl", children: [
        "Pick the role first.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-[#8A6D1F]", children: "The syllabus follows the JD." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-sm sm:text-base text-[#5B6472] leading-relaxed", children: "Every programme below is reverse-engineered from current Indian fresher job descriptions on Naukri, LinkedIn India, Foundit and company careers pages." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl max-w-3xl space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-[#151C2E]", children: "Not sure where to start? Tell us your goal." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/career-engine/start", className: "inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4 py-2 text-xs sm:text-sm font-bold text-[#151C2E] border border-slate-200 transition-colors", children: "🚀 I want to start my career fast" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/career-engine/start", className: "inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4 py-2 text-xs sm:text-sm font-bold text-[#151C2E] border border-slate-200 transition-colors", children: "📈 I want to upskill in my current role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/career-engine/start", className: "inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4 py-2 text-xs sm:text-sm font-bold text-[#151C2E] border border-slate-200 transition-colors", children: "🔄 I want to transition to a new field" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#5B6472]", children: "Take a 3-minute assessment to get a personalized, data-driven learning path." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrackDomainGrid, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 border-t border-slate-200/80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#707C90]", children: [
          "ALL ",
          total,
          " PROGRAMMES"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl sm:text-3xl font-bold text-[#151C2E] mt-1", children: "Browse full catalog by domain" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CourseGrid, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolsYouTouchStrip, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RecruiterQuoteStrip, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageCTA, { title: "Ready to pick your track?", subtitle: "Reserve your seat for the next intake or take the free 3-minute assessment.", primary: {
      label: "Get my industry-fit score →",
      to: "/career-engine/start"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CoursesIndex as component
};
