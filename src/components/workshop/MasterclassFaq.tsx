import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is the masterclass free?",
    answer: "Yes. There is no fee to attend this introductory educational session.",
  },
  {
    question: "Will attending help me get a job?",
    answer:
      "The session helps you understand pharmacovigilance and its career requirements. It does not guarantee employment. Hiring depends on your qualifications, skills, experience, and employer selection.",
  },
  {
    question: "Do I need licensed software to attend?",
    answer:
      "No. The masterclass is an educational session demonstrating the operational workflows and regulatory standards used across global CROs. You do not need to purchase or install any proprietary software.",
  },
  {
    question: "Do I need prior pharmacovigilance knowledge?",
    answer:
      "No. The session is intended to introduce the fundamentals and the typical ICSR workflow to curious pharmacy students.",
  },
  {
    question: "When will I receive the joining link?",
    answer:
      "The joining information will be sent directly through WhatsApp once your registration is confirmed.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. A verified Certificate of Participation is issued to attendees who participate in the live masterclass session.",
  },
];

export function MasterclassFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-b border-[#E4EAF2] bg-[#F8FAFC] tone-light card-light">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#BFDBFE] bg-[#EEF6FF]/95 text-[#1D4ED8] text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>07 · Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-[-0.03em] leading-tight mb-2.5 font-serif">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              questions.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-xl mx-auto">
            Clear, transparent answers about masterclass access, software, and session logistics.
          </p>
        </div>

        {/* FAQ Accordion List with Apple Squircle Cards & Homepage Focus State */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-[#2563EB]/40 bg-white ring-1 ring-[#2563EB]/15 shadow-sm tone-light card-light"
                    : "border-slate-200/80 bg-white hover:border-[#2563EB]/40 tone-light card-light"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 sm:py-4.5 flex items-center justify-between text-left gap-4 cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-semibold shrink-0 ${
                      isOpen ? "text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded-md" : "text-slate-400"
                    }`}>
                      0{idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#081F38]">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#2563EB]" : "text-slate-400"
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white tone-light card-light font-sans">
                    {item.answer}
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
