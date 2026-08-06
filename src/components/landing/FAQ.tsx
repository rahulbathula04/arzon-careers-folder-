import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const INSTITUTIONAL_FAQS = [
  {
    q: "Is this a real internship or another online course?",
    a: "Both parts are real and distinct. Weeks 1–8 are live instructor-led classes with graded weekly homework on actual data files — not a pre-recorded course you watch at your own pace. Weeks 9–12 are an applied internship where you work on bank-domain and healthcare capstone projects. You receive a verifiable internship certificate at the end, not a course completion badge. The certificate ID can be checked by any recruiter.",
  },
  {
    q: "What exactly does the HSBC and JPMorgan partnership mean for me?",
    a: "When you complete the programme and clear our internal mock assessment threshold of 75 out of 100, your application is submitted through the Arzon certified partner desk directly to the HSBC or JPMorgan recruitment team. Your profile is not in the general applicant queue. It comes with our partner introduction. HSBC has committed to a 7-day fast-track review of Arzon-submitted profiles. JPMorgan's review SLA is documented in our partnership agreement. We cannot guarantee an offer — the hiring decision is theirs. We guarantee that your application reaches the right people with verified preparation behind it.",
  },
  {
    q: "Do you guarantee a job?",
    a: "No. Any EdTech company that guarantees a job is either deceiving you or building a financial structure around that guarantee that will cost you more than the programme is worth. What we guarantee is documented and specific: certified partner-desk submission to HSBC and JPMorgan, 7-day fast-track review, and for Elite tier, 3 confirmed hiring manager introduction calls. The rest is your performance. We think that is more honest than a job guarantee backed by fine print.",
  },
  {
    q: "I am in 1st or 2nd year. Can I still join?",
    a: "Yes. The programme does not require prior work experience. It does require basic familiarity with Python — if you have never written a line of code, we recommend spending 2 weeks on free Python basics before applying. Our pre-screening call will tell you honestly whether you are ready to start or should prepare first.",
  },
  {
    q: "How is this different from YouTube, Udemy, or a general data science bootcamp?",
    a: "The curriculum difference is the HSBC and JPMorgan hiring brief. We built this programme from the actual requirements in their July 2026 fresher hiring documents. Generic courses cover AI/ML broadly. This programme covers specifically what HSBC's HackerRank assessment tests, what JPMorgan's GCC technical interviewers ask, and what artefacts their recruiters expect to see. The difference shows up on Day 1 of the screening process.",
  },
  {
    q: "How do I pay? Are there EMI options?",
    a: "Payment is processed via Razorpay. We issue a GST tax invoice immediately. We do not offer or encourage income share agreements or education loan tie-ins. If you need flexibility, standard bank EMIs on debit or credit cards apply through Razorpay. We do not earn from financing arrangements.",
  },
];

export function FAQ({ limit }: { limit?: number } = {}) {
  const [open, setOpen] = useState<number | null>(0);
  const shown = typeof limit === "number" ? INSTITUTIONAL_FAQS.slice(0, limit) : INSTITUTIONAL_FAQS;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] text-[#1A1A1A] border-b border-stone-300"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3F8B]">
            QUICK ANSWERS BEFORE YOU APPLY
          </p>
          <h2
            id="faq-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight"
          >
            The questions everyone asks before committing.
          </h2>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-stone-300 rounded-2xl border border-stone-300 bg-white shadow-xs overflow-hidden">
          {shown.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={isOpen ? "bg-[#F7F5F0]/50" : "bg-white"}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-[64px] w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-stone-100/60 focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#1A1A1A] leading-snug">
                    {f.q}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-stone-300 text-[#1B3F8B] bg-white">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-stone-700 leading-relaxed font-sans border-t border-stone-200/60">
                    {f.a}
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
