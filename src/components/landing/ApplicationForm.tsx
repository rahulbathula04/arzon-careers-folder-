import React, { useState, useId } from "react";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { MessageCircle, ExternalLink, ArrowRight } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { COUNSELLOR_PHONE, COUNSELLOR_PHONE_DISPLAY, GOOGLE_FORM_URL, GOOGLE_FORM_EMBED_URL } from "./constants";
import { trackEvent } from "@/lib/analytics";

/**
 * Section Nine — Official Google Form Registration Section
 * Design: White background (#FFFFFF). Embedded official Google Form
 * for 65+ Live Openings registration, plus direct window redirect button.
 */
export function ApplicationForm({ isLocked = false }: { isLocked?: boolean }) {
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  return (
    <section
      id="apply"
      aria-labelledby="apply-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <PremiumChip variant="navy" pulse size="md">
            🔥 75+ OPENINGS LIVE · 3 ROLES · REGISTRATION OPEN
          </PremiumChip>
          <h2
            id="apply-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            Submit Your Profile in Under 2 Minutes.{" "}
            <span className="italic text-[#1B3F8B]">Free. No payment. No catch.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans max-w-2xl mx-auto">
            Fill out the official Arzon Careers registration form below to get matched directly with live hiring requirements at HSBC, JPMorgan, and top tech partners.
          </p>

          <div className="pt-2">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("google_form_external_click", { surface: "apply_header" })}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3F8B] focus-visible:ring-offset-2"
            >
              <span>Open Registration Form in Google Forms</span>
              <ExternalLink className="h-4 w-4 text-slate-50" />
            </a>
          </div>
        </div>

        {/* Embedded Google Form Container */}
        <div className="rounded-2xl border border-stone-300 bg-[#FAF8F5] tone-light p-3 sm:p-6 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#1B3F8B] p-4 rounded-xl shadow-xs">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              OFFICIAL REGISTRATION FORM · ARZON CAREERS
            </span>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("google_form_external_click", { surface: "embed_header" })}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold font-sans bg-white hover:bg-slate-100 text-slate-900 border border-white shadow-xs transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3F8B]"
              style={{ color: "#0F172A", backgroundColor: "#FFFFFF", WebkitTextFillColor: "#0F172A" }}
            >
              <span className="font-extrabold text-slate-900" style={{ color: "#0F172A", WebkitTextFillColor: "#0F172A", fontWeight: 800 }}>Open in New Window</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-900" style={{ color: "#0F172A" }} />
            </a>
          </div>

          <div className="relative w-full overflow-hidden rounded-xl bg-white tone-light border border-stone-200 min-h-[750px] sm:min-h-[850px]">
            {isIframeLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FAF8F5] p-6 text-center space-y-3">
                <AiThinkingLoader label="Thinking & loading Official Registration Form…" size="lg" variant="card" textClassName="text-stone-700 font-mono text-xs font-bold uppercase tracking-wider" />
                <p className="text-xs text-stone-500 max-w-sm">
                  Connecting to secure form portal. If taking longer than 5 seconds, tap below.
                </p>
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#1B3F8B] rounded-lg shadow-xs"
                >
                  <span>Open directly in Google Forms ↗</span>
                </a>
              </div>
            )}
            <iframe
              src={GOOGLE_FORM_EMBED_URL}
              title="Arzon Careers Registration Google Form"
              width="100%"
              height="850"
              onLoad={() => setIsIframeLoading(false)}
              className="w-full min-h-[750px] sm:min-h-[850px] border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* WhatsApp & Counsellor Fallback Strip */}
        <div className="rounded-2xl border border-stone-300 bg-[#F7F5F0] tone-light p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A]">
              Having trouble submitting or have questions?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Chat directly with our admissions desk to register instantly or check eligibility.
            </p>
          </div>

          <a
            href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent("Hi Arzon Admissions — I'd like help registering for live openings.")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_cta_click", { surface: "google_form_footer" })}
            className="shrink-0 h-12 px-6 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-colors font-sans shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3F8B] focus-visible:ring-offset-2"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            <span>Speak with a Counsellor</span>
          </a>
        </div>
      </div>
    </section>
  );
}
