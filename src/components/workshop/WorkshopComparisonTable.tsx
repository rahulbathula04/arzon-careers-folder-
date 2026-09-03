import { XCircle, CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export function WorkshopComparisonTable() {
  const comparisonItems = [
    {
      dimension: "01 · PRACTICAL IMMERSION",
      title: "Core Session Content",
      typical: "Generic 'career guidance' motivational talk with theoretical slides and broad concepts.",
      arzon: "Live end-to-end adverse event triage on enterprise CTMS & safety simulation tools.",
      highlight: "Real Case Execution",
    },
    {
      dimension: "02 · COMPENSATION INTEL",
      title: "Market & Salary Truth",
      typical: "Vague claims of 'huge pharma growth' without specific entry-level CTC or job titles.",
      arzon: "Exact verified entry bands (₹3.8L–₹6.5L CTC) indexed from 1,000+ live job descriptions.",
      highlight: "1,000+ JD Benchmarks",
    },
    {
      dimension: "03 · IMMEDIATE ASSETS",
      title: "Takeaway Materials",
      typical: "No workbooks or case templates provided unless you pay for a full commercial course.",
      arzon: "Instant 4-part Career Starter Kit & Adverse Event Triage Guide delivered to your WhatsApp.",
      highlight: "Zero Cost Takeaways",
    },
    {
      dimension: "04 · TIME ALLOCATION",
      title: "Commercial Pitching",
      typical: "15 minutes of overview followed by 45 minutes of aggressive sales pitches for paid courses.",
      arzon: "65 minutes of pure clinical case work and Q&A; strictly 10 minutes for program orientation.",
      highlight: "87% Practical Work",
    },
    {
      dimension: "05 · CREDENTIAL VERIFICATION",
      title: "Proof of Participation",
      typical: "Unverifiable generic attendance certificate without corporate or mentor backing.",
      arzon: "Tamper-proof, QR-verifiable Certificate signed by 20+ Year Global CRO Leadership.",
      highlight: "QR Verified Credential",
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-stone-200 bg-stone-50/50 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/60 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/90 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1B3F8B] shadow-2xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>RADICAL OPERATIONAL TRANSPARENCY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-stone-950 leading-[1.15] tracking-tight">
            Not Another Webinar. <br className="hidden sm:inline" />
            <span className="italic text-[#1B3F8B]">An Authentic Enterprise Masterclass.</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-sans max-w-2xl mx-auto leading-relaxed">
            Most healthcare "career sessions" are 60 minutes of slides and aggressive selling. Here is the exact technical difference between typical webinars and Arzon Global:
          </p>
        </div>

        {/* YC-Grade Comparative Matrix Card */}
        <div className="rounded-3xl border border-stone-200/90 bg-white tone-light shadow-xl shadow-stone-200/40 overflow-hidden">
          {/* Table Column Headers */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-stone-200 bg-stone-50/80 text-xs font-mono font-bold tracking-wider uppercase">
            <div className="p-4 sm:p-5 md:col-span-5 text-stone-500 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-stone-300" />
              <span>CORE EVALUATION CRITERIA</span>
            </div>
            <div className="p-4 sm:p-5 md:col-span-3 text-rose-800 bg-rose-50/40 border-t md:border-t-0 md:border-l border-stone-200 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>TYPICAL FREE WEBINARS</span>
            </div>
            <div className="p-4 sm:p-5 md:col-span-4 text-[#1B3F8B] bg-blue-50/50 border-t md:border-t-0 md:border-l border-stone-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>ARZON GLOBAL MASTERCLASS</span>
            </div>
          </div>

          {/* Matrix Rows */}
          <div className="divide-y divide-stone-200/80">
            {comparisonItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 transition-colors hover:bg-stone-50/40 group"
              >
                {/* Column 1: Dimension & Title */}
                <div className="p-5 sm:p-6 md:col-span-5 flex flex-col justify-center space-y-1">
                  <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-[#1B3F8B]">
                    {item.dimension}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-stone-950">
                    {item.title}
                  </h3>
                </div>

                {/* Column 2: Typical Webinar (Flawed) */}
                <div className="p-5 sm:p-6 md:col-span-3 bg-stone-50/20 md:border-l border-stone-200 flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    {item.typical}
                  </p>
                </div>

                {/* Column 3: Arzon Masterclass (Superior) */}
                <div className="p-5 sm:p-6 md:col-span-4 bg-blue-50/20 md:border-l border-stone-200 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-stone-950 font-sans font-semibold leading-relaxed">
                      {item.arzon}
                    </p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 font-mono text-[10px] font-bold">
                      ✓ {item.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Bottom Guarantee Strip */}
          <div className="p-4 sm:p-6 bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <div>
                <p className="text-xs sm:text-sm font-sans font-bold text-white">
                  Zero Commercial Pressure Guarantee
                </p>
                <p className="text-[11px] font-sans text-stone-400">
                  65 minutes dedicated exclusively to real case analysis, adverse event workflows &amp; Q&amp;A.
                </p>
              </div>
            </div>

            <a
              href="#registration-card"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white tone-light hover:bg-stone-100 text-stone-950 font-mono text-xs font-bold transition-all shadow-sm shrink-0"
            >
              <span>Reserve Free Masterclass Seat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
