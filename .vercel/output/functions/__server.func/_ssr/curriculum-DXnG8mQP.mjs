import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { J as JD_PROVENANCE, R as RESEARCH_REFRESH_QUARTER, r as refreshQuarter, c as coverageBand } from "./jdProvenance-C_dgELW0.mjs";
import { aW as COURSES } from "./router-CvdLERTV.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { T as TRACK_THEME, g as getTrackTheme, N as NEUTRAL_THEME } from "./trackTheme-K0XYOa_i.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { d as Sparkles, q as ArrowRight, ay as Calendar, I as CircleCheck, ac as FileText } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "./analytics-Do62eWB1.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function TrackHeroPanel({
  slug,
  theme,
  eyebrow,
  icon,
  title,
  blurb,
  stats,
  metaRows,
  lastChange,
  footer,
  as = "h2",
  className = ""
}) {
  const t = theme ?? (slug ? getTrackTheme(slug) : NEUTRAL_THEME);
  const Heading = as;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-testid": "track-hero",
      "data-track": slug ?? "neutral",
      className: `rounded-2xl border border-white/10 bg-gradient-to-br ${t.grad} p-5 ring-1 ${t.ring} sm:p-7 lg:p-8 ${className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-start gap-3 sm:gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0a0c10]/40 text-h3 ring-1 sm:h-14 sm:w-14 sm:text-h2 ${t.ring}`,
                children: icon ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: t.emoji })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              eyebrow ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `mb-2 inline-flex items-center gap-1.5 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-eyebrow-strong sm:text-micro sm:tracking-[0.2em]`,
                  children: eyebrow
                }
              ) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { className: "text-[clamp(1.25rem,4.2vw,1.875rem)] font-semibold leading-tight text-white! [overflow-wrap:anywhere]", children: title }),
              blurb ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 max-w-2xl text-caption leading-relaxed text-white/70 sm:text-body-sm", children: blurb }) : null
            ] })
          ] }),
          stats && stats.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid w-full grid-cols-3 gap-2 text-center sm:w-auto sm:gap-3 lg:gap-4", children: stats.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: s.label, value: s.value }, s.label)) }) : null
        ] }),
        metaRows && metaRows.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-col gap-2 text-micro leading-relaxed text-white/60 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 sm:text-meta", children: metaRows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "[overflow-wrap:anywhere]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/60", children: [
            r.label,
            ":"
          ] }),
          " ",
          r.value
        ] }, r.label)) }) : null,
        lastChange ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-3 text-meta leading-relaxed text-white/75 sm:text-meta", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: `mt-0.5 h-3.5 w-3.5 shrink-0 ${t.accentText}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-white", children: [
              "Last change (",
              lastChange.dateISO,
              "):"
            ] }),
            " ",
            lastChange.note
          ] })
        ] }) : null,
        footer ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: footer }) : null
      ]
    }
  );
}
function Stat({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 px-2.5 py-2 sm:px-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-mono text-sm font-semibold tabular-nums text-white sm:text-base", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 truncate font-mono text-micro uppercase tracking-[0.14em] text-eyebrow/80 sm:text-micro sm:tracking-[0.18em]", children: label })
  ] });
}
function TrackModuleCard({
  slug,
  theme,
  eyebrow,
  title,
  bullets,
  deliverable,
  footnote,
  coveragePct,
  chip,
  actions,
  className = "",
  withAccentStrip = false
}) {
  const t = theme ?? (slug ? getTrackTheme(slug) : NEUTRAL_THEME);
  const rightChip = chip ?? (typeof coveragePct === "number" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-mono text-micro sm:text-micro ${t.chip}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: coverageBand(coveragePct) })
      ]
    }
  ) : null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-testid": "track-module",
      "data-track": slug ?? "neutral",
      className: `group relative flex flex-col overflow-hidden rounded-[1.25rem] glass-panel p-4 hover-glass-glow sm:p-5 ${className}`,
      children: [
        withAccentStrip ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: `absolute inset-x-0 top-0 h-[3px] ${t.accent}` }) : null,
        (eyebrow || rightChip) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
          eyebrow ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro uppercase tracking-[0.14em] text-eyebrow/90 sm:text-micro sm:tracking-[0.18em]", children: eyebrow }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
          rightChip
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-body-sm font-semibold leading-snug text-white! [overflow-wrap:anywhere] sm:text-body-sm", children: title }),
        bullets && bullets.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5", children: bullets.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-2 text-meta leading-relaxed text-white/75 [overflow-wrap:anywhere] sm:text-caption",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b })
            ]
          },
          i
        )) }) : null,
        deliverable ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-start gap-2 rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 px-3 py-2 text-micro leading-relaxed sm:text-meta", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: `mt-0.5 h-3.5 w-3.5 shrink-0 ${t.accentText}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 text-white/75 [overflow-wrap:anywhere]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/60", children: [
              deliverable.label ?? "Deliverable",
              ":"
            ] }),
            " ",
            deliverable.value
          ] })
        ] }) : null,
        footnote ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-micro italic leading-relaxed text-white/60 [overflow-wrap:anywhere] sm:text-micro", children: footnote }) : null,
        actions ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: actions }) : null
      ]
    }
  );
}
function CurriculumPage() {
  const tracks = reactExports.useMemo(() => {
    return JD_PROVENANCE.map((p) => {
      const course = COURSES.find((c) => c.slug === p.slug);
      return {
        provenance: p,
        course
      };
    }).filter((t) => t.course);
  }, []);
  const [activeSlug, setActiveSlug] = reactExports.useState(tracks[0]?.provenance.slug ?? "");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tone-dark min-h-dvh bg-[#0a0c10] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.18),transparent_70%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-eyebrow-strong sm:text-micro sm:tracking-[0.2em]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-eyebrow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: "JD-derived curriculum" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "max-w-3xl text-balance text-h1 font-semibold text-white! [overflow-wrap:anywhere] hyphens-auto", children: [
          "Six fresher tracks. Each syllabus written from",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-eyebrow", children: "real Indian JDs" }),
          ", not a textbook."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 max-w-2xl text-pretty text-body-sm leading-relaxed text-white/80 sm:text-base lg:text-lg", children: [
          "Week-by-week modules mapped to the phrases hiring managers in India actually write into job descriptions. We re-read the market every quarter. Last refresh:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: RESEARCH_REFRESH_QUARTER }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scroll-rail -mx-4 mt-6 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-8 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0", children: tracks.map(({
          provenance: p
        }) => {
          const t = TRACK_THEME[p.slug];
          const active = activeSlug === p.slug;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setActiveSlug(p.slug);
            document.getElementById(`track-${p.slug}`)?.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }, className: `group relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-meta font-medium transition sm:shrink sm:px-5 sm:text-meta ${active ? "text-[#06080d]" : "bg-white/5 border border-white/10 text-white hover:text-white/80 hover:bg-white/10"}`, children: [
            active && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layoutId: "active-track", className: "absolute inset-0 rounded-full bg-accent-glow shadow-[0_0_15px_rgba(125,211,252,0.3)]", transition: {
              type: "spring",
              bounce: 0.2,
              duration: 0.6
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: t?.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 whitespace-nowrap font-semibold", children: p.roleTitle })
          ] }, p.slug);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl space-y-12 px-4 py-12 sm:space-y-16 sm:px-6 sm:py-16 lg:px-8 lg:py-20", children: tracks.map(({
      provenance: p,
      course
    }) => {
      if (!course) return null;
      const t = getTrackTheme(p.slug);
      const coverageMap = /* @__PURE__ */ new Map();
      p.topJdPhrases.forEach((ph) => {
        if (ph.satisfiedByModule) coverageMap.set(ph.satisfiedByModule, ph.coverage);
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: `track-${p.slug}`, className: "scroll-mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrackHeroPanel, { slug: p.slug, eyebrow: `Track ${tracks.findIndex((x) => x.provenance.slug === p.slug) + 1} of 6`, title: p.roleTitle, blurb: course.blurb, stats: [{
          label: "Modules",
          value: String(course.syllabus.length)
        }, {
          label: "Refreshed",
          value: refreshQuarter(p.refreshedOn)
        }, {
          label: "Tracks",
          value: "6 of 6"
        }], metaRows: [{
          label: "Hiring metros",
          value: p.topMetros.join(" · ")
        }, {
          label: "JD sources",
          value: p.sources.join(" · ")
        }], lastChange: p.lastChange ?? null }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-6 top-6 bottom-6 w-0.5 bg-white/10 hidden md:block", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: course.syllabus.map((mod, idx) => {
            const coverage = coverageMap.get(mod.title);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              x: -20
            }, whileInView: {
              opacity: 1,
              x: 0
            }, viewport: {
              once: true,
              margin: "-50px"
            }, transition: {
              delay: idx * 0.1,
              duration: 0.5,
              type: "spring"
            }, className: "relative flex flex-col md:flex-row gap-4 md:gap-8 group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex flex-col items-center z-10 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-12 w-12 rounded-full flex items-center justify-center border-2 border-[#0a0c10] shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl ${t.chip}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold", children: idx + 1 }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrackModuleCard, { slug: p.slug, eyebrow: `Module ${idx + 1} · ${mod.weeks}`, title: mod.title, bullets: mod.topics, deliverable: {
                value: mod.deliverable
              }, footnote: `Maps to JD requirement: "${mod.jdSkill}"`, coveragePct: coverage, className: "transition-transform duration-300 md:group-hover:-translate-y-1 shadow-lg md:group-hover:shadow-2xl md:group-hover:border-white/20" }) })
            ] }, idx);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-[1.25rem] glass-panel p-4 sm:p-6 transition-all duration-300 hover:border-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro font-semibold uppercase tracking-[0.18em] text-eyebrow/90", children: "Recurring JD phrases" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: p.topJdPhrases.map((ph, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5 text-meta sm:text-caption", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1 leading-relaxed text-white/90 [overflow-wrap:anywhere]", children: [
              "“",
              ph.phrase,
              "”"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex shrink-0 items-center rounded-full border border-accent-glow/30 bg-accent-glow/10 px-2 py-0.5 font-mono text-micro font-semibold uppercase tracking-[0.16em] text-eyebrow-strong", children: coverageBand(ph.coverage) })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses/$slug", params: {
            slug: course.slug
          }, className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-center text-caption font-semibold text-black transition hover:bg-white/90 sm:w-auto sm:justify-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
              "See full ",
              p.roleTitle,
              " programme"
            ] }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 shrink-0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/apply", className: "inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-caption font-semibold text-white transition hover:bg-white/10 sm:w-auto", children: "Apply for this track" })
        ] })
      ] }, p.slug);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CurriculumPage as component
};
