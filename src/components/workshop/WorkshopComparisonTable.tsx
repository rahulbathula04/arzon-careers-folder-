import { XCircle, CheckCircle2, Zap } from "lucide-react";

export function WorkshopComparisonTable() {
  const comparison = [
    {
      typical: "Generic 'career guidance' talk with high-level motivational theory",
      arzon: "You watch a real adverse event case processed end-to-end on enterprise systems",
    },
    {
      typical: "Vague 'endless opportunities in pharma' claims without CTC numbers",
      arzon: "Exact roles, sourced salary bands (₹3.8L–₹6.5L), and actual JD skills from 1,000+ postings",
    },
    {
      typical: "No working materials or templates until you pay to enroll",
      arzon: "Career Starter Kit (4 PDFs + triage cheat sheet) sent on WhatsApp immediately upon registration",
    },
    {
      typical: "Hard commercial sales pitch starting from minute 5",
      arzon: "Pure hands-on practical case walkthrough for 65 of the 75 minutes",
    },
    {
      typical: "Generic attendance certificate with zero verification credibility",
      arzon: "QR-verifiable Certificate of Participation signed by enterprise VP faculty, ready for LinkedIn",
    },
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 bg-white tone-light">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            RADICAL TRANSPARENCY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold text-stone-950 leading-[1.18]">
            What Makes This Workshop Different
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Most "career webinars" are 60 minutes of slides and 15 minutes of selling. Here is the operational difference:
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200">
            {/* Column 1: Typical Webinar */}
            <div className="p-6 sm:p-8 bg-stone-50/60 space-y-6">
              <div className="flex items-center gap-2 text-stone-500 font-mono text-xs font-bold uppercase tracking-wider">
                <XCircle className="w-4 h-4 text-stone-400" />
                <span>TYPICAL FREE WEBINARS</span>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-stone-600 font-sans">
                {comparison.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span>{c.typical}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Arzon Workshop */}
            <div className="p-6 sm:p-8 bg-blue-50/30 space-y-6">
              <div className="flex items-center gap-2 text-[#1B3F8B] font-mono text-xs font-black uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>THIS ARZON GLOBAL WORKSHOP</span>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-stone-900 font-sans font-medium">
                {comparison.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{c.arzon}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
