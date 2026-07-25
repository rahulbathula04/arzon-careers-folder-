import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { NEXT_COHORT } from "./constants";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { trackEvent } from "@/lib/analytics";

export function FinalCTA() {
  return (
    <section className="editorial-page-bg py-16 px-4 sm:px-6 lg:px-8">
      <div className="editorial-card max-w-3xl mx-auto p-8 sm:p-12 text-center space-y-6">
        <p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">
          Ready to Start Your Journey?
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#151C2E] tracking-tight">
          Start with the <span className="italic text-[#8A6D1F]">3-minute fit test</span>
        </h2>

        <p className="text-sm text-[#5B6472] max-w-xl mx-auto leading-relaxed">
          The {NEXT_COHORT.label} batch starts {NEXT_COHORT.startsLabel}. 30 structured questions tell you which programme matches your career background best.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/career-engine/start"
            className="editorial-btn-blue text-sm h-12 px-8 flex items-center justify-center gap-2 text-white font-bold w-full sm:w-auto"
            onClick={() =>
              trackEvent("final_cta_click", {
                surface: "final-cta",
                target: "career-engine-start",
                label: "Get my industry-fit score",
              })
            }
          >
            <span>Get my industry-fit score</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <WhatsAppLink
            source="final_cta_counsellor"
            message="Hi Arzon, I want to talk to a counsellor before applying."
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-semibold text-[#151C2E] transition-colors w-full sm:w-auto"
            onClick={() =>
              trackEvent("final_cta_whatsapp_click", {
                surface: "final-cta",
                target: "whatsapp",
              })
            }
          >
            <MessageCircle className="h-4 w-4 text-[#1D4ED8]" />
            <span>Speak with Admissions</span>
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
