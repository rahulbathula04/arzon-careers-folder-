import { Award, ShieldCheck, QrCode, CheckCircle2 } from "lucide-react";

export function WorkshopCertificatePreview() {
  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 bg-white tone-light">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 font-mono text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            PARTICIPATION CREDENTIAL
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold text-stone-950 leading-[1.18]">
            Receive an Official Certificate of Participation
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Attendees who join live and complete the 75-minute working session receive an official Certificate of Participation, signed by Mohamed Kumail Abbas, with a QR link to verification for their LinkedIn and professional profile.
          </p>
        </div>

        {/* Visual Certificate Card Preview */}
        <div className="max-w-3xl mx-auto rounded-3xl border-4 border-double border-stone-300 bg-gradient-to-b from-stone-50 via-white to-stone-50 p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle Background Seal */}
          <div className="absolute right-6 -bottom-8 opacity-5 pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-stone-900" />
          </div>

          <div className="space-y-6 text-center relative z-10">
            {/* Certificate Header */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div className="text-left">
                <span className="font-mono text-[10px] text-stone-500 font-bold uppercase tracking-widest block">
                  INSTITUTIONAL CREDENTIAL
                </span>
                <span className="font-serif text-lg font-black text-stone-900 tracking-wider">
                  ARZON GLOBAL
                </span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[10px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>OFFICIAL PARTICIPATION PASS</span>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="space-y-2 py-2">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500 block">
                THIS IS TO CERTIFY THAT
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 italic border-b-2 border-dashed border-stone-300 pb-2 max-w-md mx-auto">
                [Candidate Name]
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-xl mx-auto pt-2 leading-relaxed">
                has successfully participated in the 75-minute live working masterclass on{" "}
                <strong className="text-stone-900 font-semibold">Healthcare Industry Careers &amp; Adverse Drug Reaction Case Triage (ICH-GCP / ICSR)</strong>{" "}
                hosted by Arzon Global.
              </p>
            </div>

            {/* Certificate Signatories & Validation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200 items-end text-left">
              <div className="space-y-1">
                <div className="font-serif text-sm font-bold text-stone-900 italic">
                  Mohamed Kumail Abbas
                </div>
                <div className="text-[10px] font-mono text-stone-500 uppercase">
                  Lead Mentor · Ex-Accenture PV Practice
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-stone-100/80 border border-stone-200">
                <QrCode className="w-8 h-8 text-stone-700" />
                <span className="font-mono text-[9px] text-stone-500 mt-1">SCAN TO VERIFY</span>
              </div>

              <div className="sm:text-right space-y-1">
                <span className="font-mono text-[10px] text-stone-500 uppercase block">CREDENTIAL ID</span>
                <span className="font-mono text-xs font-bold text-[#1B3F8B] block">ARZ-2026-HC-XXXX</span>
                <span className="text-[10px] text-stone-500 font-sans block">Official Verification URL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges below certificate */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-stone-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Add to LinkedIn Certifications</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Verifiable Certificate URL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Issued within 24 Hours of Live Session</span>
          </div>
        </div>
      </div>
    </section>
  );
}
