import { useState } from "react";
import { HelpCircle, ChevronDown, CheckCircle2 } from "lucide-react";

interface FaqItem {
  question: string;
  verdict: string;
  answer: string;
  insight: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Do I need an M.Pharm or an MS abroad to land a ₹5L+ healthcare IT or clinical salary?",
    verdict: "Industry Reality: No. Practical Tool Competency Outweighs Postgraduate Degrees.",
    answer:
      "Global Capability Centers (Novartis, Pfizer, AstraZeneca) and CROs (IQVIA, Parexel) evaluate demonstrated database capability from day one. A B.Pharm graduate with hands-on Enterprise Safety Database case processing and MedDRA coding frequently clears technical screening ahead of an M.Pharm whose thesis was limited to academic wet-lab synthesis.",
    insight: "Recruiters test your operational throughput and error rates on software, not your ability to memorize textbook definitions.",
  },
  {
    question: "Can B.Sc and M.Sc Life Sciences graduates compete directly with Pharmacy graduates for Clinical SAS and CDM roles?",
    verdict: "Industry Reality: Yes. Analytical Science Degrees Are Strongly Preferred in Data Tracks.",
    answer:
      "Clinical Data Management (CDM) and Clinical SAS Programming prioritize data validation rigor, SQL logic, and biostatistical principles. Life Sciences postgraduates (Biotechnology, Biochemistry, Microbiology, Statistics) are prime hiring candidates for CDISC SDTM domain mapping and ADaM dataset creation.",
    insight: "M.Sc postgraduates command top entry CTC bands (₹4.8L–₹7.0L) across pharmaceutical data analytics centers.",
  },
  {
    question: "Can clinical graduates (BDS, B.Sc Nursing, BAMS, BHMS) build high-paying corporate desk careers?",
    verdict: "Industry Reality: Yes. Clinical Diagnostic Acumen Is In High Demand.",
    answer:
      "Clinical graduates possess deep anatomy, surgical procedure, and medical terminology knowledge that standard freshers lack. MNC US healthcare revenue cycle management (RCM) teams and drug safety triage centers recruit BDS and Nursing graduates aggressively for inpatient surgical chart review and adverse event severity scoring.",
    insight: "You transition from hospital bedside shifts to regular corporate hours with structured promotion paths.",
  },
  {
    question: "Will Medical Coding and Pharmacovigilance be automated by AI?",
    verdict: "Industry Reality: No. AI Has Amplified the Need for Audit-Ready Human Specialists.",
    answer:
      "Regulatory bodies like the USFDA and EMA mandate strict human-in-the-loop validation under 21 CFR Part 11 for all safety reporting and clinical trials. While Computer-Assisted Coding (CAC) and intake bots filter simple data, trained specialists are required for complex inpatient surgical auditing, causality assessment, and narrative drafting.",
    insight: "AI tools increase daily case throughput, allowing certified specialists to handle higher-complexity, higher-paying files.",
  },
  {
    question: "How should I choose between Pharmacovigilance, Clinical SAS, and Medical Coding?",
    verdict: "Industry Reality: Match Your Natural Cognitive Strengths to the Role.",
    answer:
      "If you enjoy pharmacology, medical reading, and regulatory compliance, Pharmacovigilance is your direct match. If you have an analytical, coding, or mathematical mindset, Clinical SAS offers the steepest salary curve. If you prefer clinical chart auditing, diagnostics, and anatomy, Medical Coding offers the fastest global certification and hiring turnaround.",
    insight: "Take the 3-minute Career Engine assessment to receive an objective, calibrated compatibility score.",
  },
];

export function DegreeFaqBuster() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFC]/80 border-b border-[#E4EAF2] tone-light card-light">
      <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
          <HelpCircle className="h-3 w-3 text-[#2563EB]" />
          <span>CAREER BRAINSTORMING &amp; REALITY CHECK</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081F38] tracking-tight">
          Common Degree Myths vs.{" "}
          <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
            Empirical Corporate Reality
          </span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
          Clear answers to the most critical career decisions faced by Indian pharmacy, life science, and allied health graduates.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className={`rounded-2xl border transition-all tone-light card-light overflow-hidden ${
                isOpen
                  ? "border-[#2563EB]/40 bg-white shadow-md shadow-blue-600/5"
                  : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-xs font-bold transition-colors mt-0.5 ${
                      isOpen
                        ? "bg-[#2563EB] text-white"
                        : "bg-[#F1F5F9] text-[#64748B]"
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#081F38] tracking-tight">
                      {faq.question}
                    </h3>
                    <div className="mt-1 font-mono text-[11px] font-bold text-emerald-800">
                      {faq.verdict}
                    </div>
                  </div>
                </div>

                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-transform ${
                    isOpen
                      ? "rotate-180 border-[#2563EB] bg-[#EEF6FF] text-[#2563EB]"
                      : "border-slate-200 bg-[#F8FAFC] text-[#64748B]"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-6 border-t border-[#F1F5F9] text-xs sm:text-sm text-[#475569] leading-relaxed space-y-3">
                  <p>{faq.answer}</p>
                  <div className="rounded-xl bg-[#EEF6FF] border border-[#BFDBFE] p-3.5 flex items-start gap-2.5 text-xs text-[#1E3A8A]">
                    <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-[#081F38]">The Recruiter Reality:</strong>{" "}
                      <span>{faq.insight}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
