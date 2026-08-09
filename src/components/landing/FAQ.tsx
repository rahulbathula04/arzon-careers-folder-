import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";

const INSTITUTIONAL_FAQS = [
  {
    q: "Can recruiters verify my internship?",
    a: "Yes. Every Arzon internship comes with a unique public verification URL and QR code. Recruiters at HSBC, JPMorgan, or any other company can enter your Certificate ID on our public verifier (/verify) to instantly confirm your ISO 9001:2015 & MSME registration, project repository, and completion date.",
  },
  {
    q: "Can I get rejected during the eligibility review?",
    a: "Yes. We reject approximately 64% of applicants during our initial screening call. If you have no coding background and are unwilling to complete pre-course preparation, or if your degree timeline does not match partner intake windows, we will tell you frankly and advise alternative preparation paths.",
  },
  {
    q: "Why are there only 60 seats per cohort?",
    a: "We limit each cohort to 60 seats to ensure strict 1:1 code review and match the quarterly intake quota agreed upon with our recruitment partners. Accepting hundreds of students per batch would compromise code quality and destroy our partner desk routing efficiency.",
  },
  {
    q: "How do HSBC and JPMorgan receive candidate profiles?",
    a: "Once you pass our internal benchmark assessment (75/100 threshold), your profile—containing your verified assessment scorecard, GitHub repository, and internship certificate—is routed through Arzon's certified partner desk (VMO ID: HSBC2621TAVM026) directly to partner talent acquisition decision-makers.",
  },
  {
    q: "What happens if I fail the internal mock assessment?",
    a: "You get 2 additional retake opportunities included in your enrollment. Our mentors provide a detailed diagnostic report showing your weak areas (e.g., Python OOP speed, Scikit-learn model tuning) and assign targeted lab exercises before your retake.",
  },
  {
    q: "Is this a real internship or another online course?",
    a: "Both parts are real and distinct. Weeks 1–8 are live instructor-led classes with graded weekly homework on actual data files. Weeks 9–12 are an applied internship where you work on bank-domain and healthcare capstone projects with verifiable certificates.",
  },
  {
    q: "Do you guarantee a job?",
    a: "No. Any company that guarantees a job without testing you is deceiving you. We guarantee certified partner-desk submission to HSBC and JPMorgan, fast-track candidate review, and for Executive VIP tier, 3 direct hiring manager profile deliveries.",
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
          <PremiumChip variant="navy" size="md">
            QUICK ANSWERS BEFORE YOU APPLY
          </PremiumChip>
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
