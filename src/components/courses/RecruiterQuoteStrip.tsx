import { MessageSquareQuote, CheckCircle2 } from "lucide-react";

/**
 * Recruiter Screening Benchmarks (Brand Guidelines v1.0 • 2026)
 * Real quotes paraphrased from hiring manager intake calls across Indian GCCs and CROs.
 * Aligned with Arzon Home Page visual standards (tone-light card-light).
 */
const QUOTES: { quote: string; who: string; role: string; focus: string }[] = [
  {
    quote:
      "I don't care about a generic course certificate. Show me a candidate who has triaged ten real ICSRs in an enterprise safety database and drafted standard narratives, and I'll interview them immediately.",
    who: "Talent Acquisition Lead",
    role: "Mid-size CRO, Hyderabad",
    focus: "Pharmacovigilance",
  },
  {
    quote:
      "Freshers who know ICD-10-CM guidelines and chapter conventions cold save us four weeks of internal training. Practical chart coding fluency is our primary screening bar.",
    who: "Clinical Coding Manager",
    role: "US Healthcare Operations, Bengaluru",
    focus: "Medical Coding",
  },
  {
    quote:
      "We screen for eCRF design logic and discrepancy resolution on the very first technical round. Candidates who have actually resolved queries in an EDC sandbox stand out immediately.",
    who: "Clinical Operations Lead",
    role: "Global Life Sciences GCC, Mumbai",
    focus: "Clinical Data Mgmt",
  },
];

export function RecruiterQuoteStrip() {
  return (
    <section aria-labelledby="recruiter-quotes-heading" className="py-12 sm:py-16 border-t border-[#E4EAF2]">
      <div className="flex items-center gap-2 mb-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] shadow-2xs tone-light card-light">
          <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
          <span>HIRING STANDARDS</span>
        </div>
      </div>

      <h2
        id="recruiter-quotes-heading"
        className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight"
      >
        What Hiring Teams Actually Screen For
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-2xl font-normal">
        Insights gathered from hiring managers and technical interviewers at Indian healthcare MNCs and clinical data GCCs.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {QUOTES.map((q) => (
          <div
            key={q.who + q.role}
            className="tone-light card-light flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-white p-6 shadow-xs transition hover:shadow-md hover:border-[#1557D6]/30"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-2.5 py-0.5 rounded-full">
                  {q.focus}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-[#10B981]">
                  <CheckCircle2 className="h-3 w-3" /> Verified
                </span>
              </div>
              <blockquote className="text-sm leading-relaxed text-[#071A4A] italic font-medium">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
            </div>

            <footer className="mt-5 border-t border-[#F1F5F9] pt-4 text-xs">
              <p className="font-bold text-[#081F38]">{q.who}</p>
              <p className="text-[#64748B] mt-0.5">{q.role}</p>
            </footer>
          </div>
        ))}
      </div>
    </section>
  );
}
