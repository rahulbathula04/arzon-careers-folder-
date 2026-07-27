import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { W as WhatsAppLink } from "./router-CvdLERTV.mjs";
import { d as Sparkles, q as ArrowRight, s as MessageCircle } from "../_libs/lucide-react.mjs";
function IndustryReadinessCTA({
  context,
  source
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      "aria-labelledby": "industry-readiness-cta",
      className: "mt-12 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.08] via-primary/[0.05] to-transparent p-6 sm:p-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mr-1 inline h-3 w-3" }),
          "What does this mean for you?"
        ] }),
        context ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-sm text-white/70", children: context }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            id: "industry-readiness-cta",
            className: "mt-3 max-w-2xl font-grotesk text-h4 font-bold leading-snug text-white sm:text-h3",
            children: "See if you're ready for these roles — in 3 minutes, free."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-sm text-white/65", children: "Take the ACRI Readiness Preview. You'll get a score across the 5 dimensions recruiters screen for, the track that fits, and the next step you can take today." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/career-engine",
              "data-source": source,
              className: "btn btn-primary btn-block btn-block-sm-auto",
              children: [
                "Take the free 3-min assessment ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            WhatsAppLink,
            {
              source: "industry_readiness_cta",
              message: "Hi Arzon, I'm exploring healthcare roles on the industry pages. Can a counsellor guide me?",
              trackProps: { industry_source: source },
              className: "inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-eyebrow hover:text-eyebrow-strong",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
                " Or talk to a counsellor on WhatsApp"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-mono text-micro uppercase tracking-[0.18em] text-white/60", children: "Free · 3 minutes · yours forever · no login" })
      ]
    }
  );
}
export {
  IndustryReadinessCTA as I
};
