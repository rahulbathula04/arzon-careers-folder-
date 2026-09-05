import { useState } from "react";
import { FileText, Gift, Download, ArrowRight, Check, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { generateStarterKitPDF } from "@/lib/starter-kit-pdf";

export function WorkshopStarterKitTeaser({ onClaimClick }: { onClaimClick: () => void }) {
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleInstantDownload = () => {
    setIsGenerating(true);
    try {
      generateStarterKitPDF();
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 bg-gradient-to-b from-stone-50 to-white tone-light">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="rounded-3xl border-2 border-[#1B3F8B]/20 bg-white tone-light p-7 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Kit Value Stack */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[11px] font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5 text-[#1B3F8B]" />
                <span>INCLUDED AFTER THE SESSION</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 leading-tight">
                  2026 Healthcare Career Starter Kit
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  The session is the main value. These reference materials help you apply what you learned in technical interviews and job applications afterwards.
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

              <div className="flex items-center gap-4 pt-1">
                <Link
                  to="/starter-kit"
                  className="text-xs font-mono font-bold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Interactive Online Reader</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Instant Claim & Download */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3.5 p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1325] text-emerald-400 flex items-center justify-center shadow-md">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-stone-900 block">
                  Instant 7-Page PDF Download
                </span>
                <span className="text-[11px] text-stone-500 font-sans block">
                  Zero waiting. Download the complete printable guide immediately or reserve your workshop seat.
                </span>
              </div>

              <button
                type="button"
                onClick={handleInstantDownload}
                disabled={isGenerating}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isGenerating ? "Building PDF..." : "Download Free PDF"}</span>
              </button>

              <button
                type="button"
                onClick={onClaimClick}
                className="w-full py-3 px-4 rounded-xl border border-stone-300 hover:border-stone-400 bg-white tone-light text-stone-900 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Reserve Free Workshop Seat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-[10px] font-mono text-stone-400">
                100% Free · No credit card required
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
