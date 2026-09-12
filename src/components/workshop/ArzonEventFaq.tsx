import { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

export function ArzonEventFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: "Is the session free?",
      a: "Yes. The B.Pharm Career Intelligence Session is 100% free of cost. No registration fee or payment information is required to attend.",
    },
    {
      q: "Who can attend?",
      a: "The session is specifically built for B.Pharm students (1st, 2nd, 3rd, and 4th year), recent B.Pharm graduates, unemployed graduates, and candidates looking for career clarity. M.Pharm, Pharm.D, and Life Sciences candidates are also welcome.",
    },
    {
      q: "Is this only for B.Pharm students?",
      a: "While B.Pharm is the primary focus, the hiring intelligence, company mappings, and salary data also apply to M.Pharm, Pharm.D, and Life Sciences graduates.",
    },
    {
      q: "Can final-year students attend?",
      a: "Yes. Final-year students are strongly encouraged to attend before campus placements and graduation, so they do not waste 6 months after passing out.",
    },
    {
      q: "Can recent graduates attend?",
      a: "Yes. If you have already graduated and are looking for a job or considering career domain options (PV, Coding, CDM, RA, QC), this session will help you make a clear decision.",
    },
    {
      q: "Will you explain different healthcare career options?",
      a: "Yes. We cover 15+ healthcare career families including Pharmacovigilance, Medical Coding, Clinical Data Management, Clinical Research, Regulatory Affairs, Quality Control, and Healthcare Analytics.",
    },
    {
      q: "Will you discuss companies hiring freshers?",
      a: "Yes. We present verified employer mapping covering global CROs, IT-Pharma MNCs, healthcare BPOs, and pharmaceutical manufacturers across Hyderabad, Bengaluru, Pune, and Mumbai.",
    },
    {
      q: "Will you explain skills and technologies?",
      a: "Yes. We break down the exact software platforms (Oracle Argus, Medidata Rave, ICD-10-CM, eCTD) and clinical/technical skills employers screen during interviews.",
    },
    {
      q: "Will you discuss salary ranges?",
      a: "Yes. We share realistic entry-level starting salary bands (₹2.28 LPA to ₹6.50 LPA) based on actual hiring records for each career path.",
    },
    {
      q: "Will you explain certifications?",
      a: "Yes. We clarify which certifications (such as AAPC CPC or State Pharmacy Council registration) carry real hiring value versus high-cost commercial certificates.",
    },
    {
      q: "Is this a course-selling webinar?",
      a: "No. The session is designed to help students understand the market and make a better career decision. Any further learning options are separate from the free session.",
    },
  ];

  return (
    <section id="faq" className="w-full bg-white tone-light py-14 sm:py-20 border-b border-[var(--color-border-warm)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-800 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-medical-navy)] tracking-tight">
            EVERYTHING YOU NEED TO KNOW
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-600 mt-2">
            Clear answers regarding the free session, eligibility, and career intelligence dataset.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[var(--color-warm-paper)] rounded-2xl border border-stone-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left font-serif text-sm sm:text-base font-bold text-[var(--color-medical-navy)] flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[var(--color-arzon-blue)]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-stone-200/60 animate-in fade-in duration-150">
                    <p>{faq.a}</p>
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
