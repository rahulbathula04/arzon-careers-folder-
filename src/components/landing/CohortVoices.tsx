import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { LiveProofCounter } from "@/components/proof/LiveProofCounter";
import { CTAButton } from "./CTAButton";

/**
 * Cohort Voices — the honest answer to "where are your student testimonials?"
 *
 * We deliberately do NOT publish curated quote-and-headshot testimonials.
 * Reasons, in order of weight:
 *  1. Trust spine: the rest of the site promises "everything here is
 *     independently verifiable" (ISO/MSME/MCA registrations, public refund
 *     ledger, per-certificate /verify URL). A photo-and-quote card is the
 *     one element a parent or recruiter CANNOT verify, so it would be the
 *     weakest link in the whole proof chain.
 *  2. ASCI + Google policy: fabricated or composite testimonials breach
 *     ASCI guidelines and trigger manual Google penalties on Review schema.
 *  3. Founding-cohort reality: placement outcomes from the current cohort
 *     are still being logged into the public ledger — we'd rather under-claim
 *     and let the ledger speak than seed paid quotes.
 *
 * What we DO show: the auditable surrogates a serious candidate can click
 * into (sample certificate verification, internship work samples via JD
 * Mirror, live placement counter from the public ledger).
 */
export function CohortVoices() {
  return (
    <Section size="md" data-testid="reviews-section">
      <SectionHeader
        tone="dark"
        eyebrow="Student outcomes"
        title={
          <>
            We don't publish testimonials.{" "}
            <em className="italic-accent not-italic">Here's what we publish instead.</em>
          </>
        }
        sub="Quotes and headshots are the one thing on this site you couldn't verify. So we replaced them with three things any recruiter or parent can audit in under a minute."
      />

      <div className="tone-dark mt-10">
        <LiveProofCounter />
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-accent-glow/25 bg-accent-glow/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-body-sm leading-relaxed text-slate-200">
          <span className="font-semibold text-slate-50">Past student of ours? </span>
          Your offer letter goes into the public placements ledger on request — with your consent
          and a verifiable employer reference, never as an anonymous quote.
        </p>
        <CTAButton
          asChild
          variant="ghost"
          size="md"
          trailingIcon={<ExternalLink className="h-3.5 w-3.5" />}
          className="shrink-0"
        >
          <Link to="/contact">Log your outcome</Link>
        </CTAButton>
      </div>
    </Section>
  );
}
