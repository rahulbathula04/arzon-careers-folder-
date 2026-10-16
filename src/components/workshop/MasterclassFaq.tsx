import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is the masterclass free?",
    answer: "Yes. There is no fee to attend this introductory session.",
  },
  {
    question: "Will attending help me get a job?",
    answer:
      "The session can help you understand pharmacovigilance and its career requirements. It does not guarantee employment. Hiring depends on your qualifications, skills, experience and employer selection.",
  },
  {
    question: "Will I use Oracle Argus Safety?",
    answer:
      "Access to licensed Oracle Argus Safety software is not included unless explicitly confirmed. Any demonstration or simulated exercise will be described accurately before registration.",
  },
  {
    question: "Do I need prior pharmacovigilance knowledge?",
    answer:
      "No. The session is intended to introduce the fundamentals and the typical ICSR workflow.",
  },
  {
    question: "When will I receive the joining link?",
    answer:
      "The joining information will be sent through WhatsApp once your registration is confirmed.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Certificate availability has not been confirmed. We will communicate the details if a certificate is included in the session.",
  },
];

export function MasterclassFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white tone-light card-light">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>07 · Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-tight leading-snug">
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? "border-blue-300 bg-white tone-light card-light shadow-2xs"
                    : "border-slate-200/90 bg-slate-50/50 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#081F38]">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 bg-white tone-light card-light">
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
