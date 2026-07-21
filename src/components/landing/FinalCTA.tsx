import { Link } from "@tanstack/react-router";
import { Section } from "@/components/ui/Section";
import { ArrowRight, MessageCircle } from "lucide-react";
import { NEXT_COHORT } from "./constants";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { useTilt, tiltSeed } from "@/hooks/useTilt";
import { CTAButton } from "./CTAButton";
import { trackEvent } from "@/lib/analytics";

export function FinalCTA() {
  const waTilt = useTilt<HTMLAnchorElement>();

  return (
    <Section size="lg" containerSize="md">
      <div
        className="tone-dark card-dark card-hairline-gradient card-accent-strip relative overflow-hidden rounded-2xl border border-slate-200/10 bg-navy-card px-5 py-8 sm:rounded-[28px] sm:px-12 sm:py-16"
        data-accent="gold"
      >
        <div
          aria-hidden
          className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#3b6fa0]/60 to-transparent"
        />
        <div className="relative">
          <p className="font-sans text-micro font-semibold uppercase tracking-[0.16em] text-[#7fb0d8]">
            Ready to start?
          </p>
          <h3 className="h-section mt-3">Start with the 3-min fit test.</h3>
          <p className="body-lg mt-4 max-w-2xl">
            The {NEXT_COHORT.label} batch starts {NEXT_COHORT.startsLabel}. 30 honest questions tell
            you which programme matches you. A counsellor calls you back with the result.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <CTAButton asChild variant="gold" size="xl" block glow>
              <Link
                to="/career-engine/start"
                onClick={() =>
                  trackEvent("final_cta_click", {
                    surface: "final-cta",
                    target: "career-engine-start",
                    label: "Get my industry-fit score",
                  })
                }
              >
                <span data-icon-leading aria-hidden>
                  <span className="inline-block h-2 w-2 rounded-full bg-gold-ink motion-safe:animate-pulse" />
                </span>
                <span>Get my industry-fit score</span>
                <span data-arrow aria-hidden>
                  <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                </span>
              </Link>
            </CTAButton>
            <CTAButton asChild variant="ghost" size="lg" block>
              <WhatsAppLink
                source="final_cta_counsellor"
                message="Hi Arzon, I want to talk to a counsellor before applying."
                style={{ ["--seed" as any]: tiltSeed("wa-counsellor").toFixed(2) }}
                onClick={() =>
                  trackEvent("final_cta_whatsapp_click", {
                    surface: "final-cta",
                    target: "whatsapp",
                  })
                }
                {...waTilt}
              >
                <span data-icon-leading aria-hidden>
                  <MessageCircle className="h-4 w-4 text-[#7fb0d8]" />
                </span>
                <span>WhatsApp counsellor</span>
              </WhatsAppLink>
            </CTAButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
