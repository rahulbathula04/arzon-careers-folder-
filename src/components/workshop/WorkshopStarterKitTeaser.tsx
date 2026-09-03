import { FileText, Gift, MessageCircle, ArrowRight, Check } from "lucide-react";

export function WorkshopStarterKitTeaser({ onClaimClick }: { onClaimClick: () => void }) {
  const kitItems = [
    {
      title: "Top 20 Global CRO Interview Questions & Model Answers",
      desc: "Exactly what technical interviewers at Novartis, IQVIA, and Parexel ask freshers regarding ICSR and GCP.",
    },
    {
      title: "Enterprise Software Workflow Cheat-Sheet",
      desc: "High-resolution diagram comparing Oracle Argus 8.4 case processing vs. Medidata RAVE eCRF query management.",
    },
    {
      title: "ATS-Optimized Resume Keywords for Healthcare Roles",
      desc: "The 35+ industry keywords required to bypass automated HR screening filters for entry-level roles.",
    },
    {
      title: "2026 Healthcare Fresher Salary Benchmark",
      desc: "City-by-city starting CTC guide for Hyderabad, Bengaluru, Mumbai, Pune, and Chennai delivery centers.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 bg-gradient-to-b from-stone-50 to-white tone-light">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="rounded-3xl border-2 border-[#1B3F8B]/20 bg-white tone-light p-7 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Kit Value Stack */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5" />
                <span>FREE REGISTRATION BONUS (WORTH ₹2,999)</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 leading-tight">
                  Get the 2026 Healthcare Career Starter Kit
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  Delivered straight to your WhatsApp immediately after reserving your free workshop seat. Zero waiting, zero cost.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {kitItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-stone-200/90 bg-stone-50/70 space-y-1.5 hover:bg-stone-50 transition-all"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                        {idx + 1}
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 font-sans">{item.title}</h4>
                    </div>
                    <p className="text-[11px] text-stone-600 font-sans leading-relaxed pl-7">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Instant Claim Button */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4 p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1325] text-emerald-400 flex items-center justify-center shadow-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-stone-900 block">
                  Instant WhatsApp Dispatch
                </span>
                <span className="text-[11px] text-stone-500 font-sans block">
                  Reserve your seat below to unlock the complete Starter Kit PDF &amp; Cheat-sheets.
                </span>
              </div>
              <button
                type="button"
                onClick={onClaimClick}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reserve Seat &amp; Claim Kit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono text-stone-400">
                100% Free · No sales spam
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
