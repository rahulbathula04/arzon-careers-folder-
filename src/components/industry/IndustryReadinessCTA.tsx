import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { FEATURE_FLAGS } from "@/config/featureFlags";

/**
 * Closing CTA for industry pages. Numbers don't convert by themselves,
 * graduates need to know "what does this mean for me?". One primary action
 * (the free 3-min ACRI or direct course exploration), one quiet text-link to talk to a human.
 */
export function IndustryReadinessCTA({
  context,
  source,
}: {
  /** Plain-language one-liner above the headline, e.g. "These numbers are real. So is the gap." */
  context?: string;
  /** Analytics + WhatsApp source tag. */
  source: string;
}) {
  return (
    <section
      aria-labelledby="industry-readiness-cta"
      className="mt-12 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.08] via-primary/[0.05] to-transparent p-6 sm:p-8"
    >
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold">
        <Sparkles className="mr-1 inline h-3 w-3" />
        What does this mean for you?
      </p>
      {context ? <p className="mt-2 max-w-xl text-sm text-white/70">{context}</p> : null}
      <h2
        id="industry-readiness-cta"
        className="mt-3 max-w-2xl font-grotesk text-h4 font-bold leading-snug text-white sm:text-h3"
      >
        {FEATURE_FLAGS.ENABLE_ASSESSMENT
          ? "See if you're ready for these roles — in 3 minutes, free."
          : "Prepare for these high-demand industry roles."}
      </h2>
      <p className="mt-2 max-w-xl text-sm text-white/65">
        {FEATURE_FLAGS.ENABLE_ASSESSMENT
          ? "Take the ACRI Readiness Preview. You'll get a score across the 5 dimensions recruiters screen for, the track that fits, and the next step you can take today."
          : "Explore our job-linked 12-week programmes with live industry mentorship, hands-on projects, and placement assistance."}
      </p>

      <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          to={FEATURE_FLAGS.ENABLE_ASSESSMENT ? "/career-engine" : "/courses"}
          data-source={source}
          className="btn btn-primary btn-block btn-block-sm-auto"
        >
          {FEATURE_FLAGS.ENABLE_ASSESSMENT ? (
            <>
              Take the free 3-min assessment <ArrowRight className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Explore Industry Programmes <ArrowRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Link>
        <WhatsAppLink
          source="industry_readiness_cta"
          message="Hi Arzon, I'm exploring healthcare roles on the industry pages. Can a counsellor guide me?"
          trackProps={{ industry_source: source }}
          className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-eyebrow hover:text-eyebrow-strong"
        >
          <MessageCircle className="h-4 w-4" /> Or talk to a counsellor on WhatsApp
        </WhatsAppLink>
      </div>

      <p className="mt-3 font-mono text-micro uppercase tracking-[0.18em] text-white/60">
        {FEATURE_FLAGS.ENABLE_ASSESSMENT
          ? "Free · 3 minutes · yours forever · no login"
          : "12-week programmes · 100% job-aligned · Mentor led"}
      </p>
    </section>
  );
}
