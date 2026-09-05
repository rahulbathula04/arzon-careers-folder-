import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { track } from "@/lib/track";

export function ArzonEventFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is the workshop really free?",
      a: "Yes. The 75-minute live working session on Sunday, 6 September 2026 is completely free of charge. There are no hidden fees or paywalls required to join the Google Meet room or download the Field Guide.",
    },
    {
      q: "Do I need prior Pharmacovigilance experience?",
      a: "No prior experience is necessary. The session is specifically designed for healthcare freshers and life sciences graduates to help you understand how adverse event intake, triage, and coding are conducted in enterprise environments.",
    },
    {
      q: "Is this only for B.Pharm?",
      a: "No. While B.Pharm graduates are a core audience, this working session is equally valuable for M.Pharm, Pharm.D, MBBS, BDS, and Life Sciences graduates (B.Sc / M.Sc Biotechnology, Biochemistry, Microbiology, and Bioinformatics).",
    },
    {
      q: "What happens during the session?",
      a: "Mohamed Kumail Abbas will share his screen and walk through a simulated adverse event report (Metformin ER 500 mg). You will see the 4 ICH-E2D validity checks, seriousness evaluation, MedDRA SOC/PT coding, and regulatory reporting timeline calculation in real-time, followed by open Q&A.",
    },
    {
      q: "Will there be a sales pitch?",
      a: "The vast majority of the 75 minutes is dedicated entirely to live operational training: processing the Metformin ICSR case, walking through MedDRA coding, analyzing regulatory timelines, and answering candidate questions. At the very end, we briefly explain our role-readiness program for candidates who want guided mentorship.",
    },
    {
      q: "What if I cannot attend live?",
      a: "Because this is an interactive simulation with live Q&A and screen-sharing of enterprise workflows, we strongly encourage attending live. However, all registered candidates will receive operational follow-ups and the 2026 Career Field Guide dossier directly via WhatsApp and email.",
    },
    {
      q: "Where will I receive the joining details?",
      a: "Immediately upon submitting your registration, you will see your direct Google Meet room access link. Additionally, we send a calendar confirmation and an operational reminder with the direct link to your registered WhatsApp number before the session starts.",
    },
  ];

  const handleToggle = (idx: number) => {
    const next = openIdx === idx ? null : idx;
    setOpenIdx(next);
    if (next !== null) {
      track("faq_open", {
        props: {
          question: faqs[idx].q,
        },
      });
    }
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-[var(--color-warm-white)] border-b border-[var(--color-border-warm)] text-left">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with Arzon Signature Marker */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 bg-[var(--color-editorial-amber)] rounded-sm"></div>
            <span className="font-mono text-[10px] sm:text-xs font-bold text-[var(--color-arzon-ink)] uppercase tracking-widest">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-arzon-ink)] tracking-tight">
            Clear answers before you join
          </h2>
          <p className="font-sans text-sm text-stone-700 leading-relaxed">
            Everything you need to know about the format, eligibility, and operational structure of this session.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--color-border-warm)] bg-[var(--color-warm-paper)] overflow-hidden shadow-sm tone-light transition-all"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-[var(--color-warm-white)] transition-colors cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[var(--color-arzon-ink)]">
                    {faq.q}
                  </span>
                  <span className="p-1 rounded-md bg-[var(--color-warm-white)] text-[var(--color-medical-navy)] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm font-sans text-[var(--color-arzon-ink)]/80 leading-relaxed border-t border-[var(--color-border-warm)]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
