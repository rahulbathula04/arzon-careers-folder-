import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Award, CheckCircle2, ShieldCheck, Download, Share2, Sparkles, User } from "lucide-react";
import arzonIcon from "@/assets/arzon-icon.webp";

export interface WorkshopCertificatePreviewProps {
  initialName?: string;
  degree?: string;
  onRegisterClick?: () => void;
}

export function WorkshopCertificatePreview({
  initialName = "Ananya Sharma",
  degree = "B.Pharm Graduate",
  onRegisterClick,
}: WorkshopCertificatePreviewProps) {
  const [holderName, setHolderName] = useState(initialName);
  const [qrUrl, setQrUrl] = useState<string>("");

  const certId = "ARZON-WS-2026-8492";
  const verifyUrl = `https://arzoncareers.in/verify?id=${certId}`;

  useEffect(() => {
    QRCode.toDataURL(verifyUrl, { width: 160, margin: 1 })
      .then(setQrUrl)
      .catch(() => setQrUrl(""));
  }, [verifyUrl]);

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 bg-stone-50 tone-light">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>VERIFIABLE WORKSHOP CREDENTIAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950 leading-tight">
            Earn an Executive Certificate of Participation
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            Every candidate who attends the 90-minute live session and completes the interactive ICSR simulation receives an official, QR-verifiable certificate to highlight on LinkedIn and resume profiles.
          </p>
        </div>

        {/* Live Name Customizer Input */}
        <div className="max-w-md mx-auto p-2 bg-white tone-light rounded-2xl border border-stone-200 shadow-xs flex items-center gap-2">
          <div className="pl-3 text-stone-400">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            placeholder="Type your name to preview certificate..."
            className="flex-1 py-2 text-xs font-sans text-stone-900 focus:outline-none bg-transparent"
          />
          <span className="font-mono text-[10px] text-[#1B3F8B] font-bold pr-3 uppercase">
            LIVE PREVIEW
          </span>
        </div>

        {/* Certificate Mockup Canvas */}
        <div className="relative mx-auto max-w-3xl rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-stone-200 via-stone-100 to-stone-200 shadow-2xl border border-stone-300">
          <div className="relative rounded-2xl border-4 border-double border-[#1B3F8B]/30 bg-white tone-light p-6 sm:p-10 space-y-6 text-center shadow-inner overflow-hidden">
            {/* Watermark Background */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]"
            >
              <span className="select-none font-serif text-8xl font-black tracking-widest text-[#0B1325]">
                ARZON
              </span>
            </div>

            {/* Top Certificate Header */}
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
              <div className="flex items-center gap-2.5 text-left">
                <img src={arzonIcon} alt="Arzon Global" className="w-9 h-9 rounded-lg object-contain" />
                <div>
                  <span className="font-serif font-bold text-sm tracking-tight text-stone-950 block leading-none">
                    ARZON GLOBAL
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#1B3F8B] font-extrabold block mt-0.5">
                    Executive Career Intelligence Division
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-[9px] text-stone-400 block">CREDENTIAL ID</span>
                <span className="font-mono text-xs font-bold text-stone-800 block">{certId}</span>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="space-y-1.5 pt-2">
              <span className="font-mono text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#1B3F8B] uppercase block">
                EXECUTIVE CERTIFICATE OF PARTICIPATION
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-stone-700 font-medium">
                This is proudly presented to
              </h3>
              <div className="pt-2 pb-1">
                <span className="font-serif text-2xl sm:text-4xl font-bold text-[#0B1325] tracking-tight border-b-2 border-amber-500/60 pb-1 inline-block px-4">
                  {holderName || "Candidate Name"}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans max-w-xl mx-auto pt-2 leading-relaxed">
                For active participation in the 90-minute live working session covering enterprise Drug Safety &amp; Pharmacovigilance triage, ICH-E2D regulatory compliance criteria, MedDRA 26.0 coding hierarchy, and Oracle Argus Safety ICSR case workflows.
              </p>
            </div>

            {/* Skills Badges Grid */}
            <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
              <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[10px] font-semibold">
                ✓ ICH-E2D Case Triage
              </span>
              <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[10px] font-semibold">
                ✓ MedDRA 26.0 Coding
              </span>
              <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[10px] font-semibold">
                ✓ Oracle Argus 8.4 Simulation
              </span>
              <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[10px] font-semibold">
                ✓ 21 CFR Part 11 Audit Principles
              </span>
            </div>

            {/* Footer Signatures & QR Seal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-6 border-t border-stone-200/80">
              {/* Mentor Signature */}
              <div className="space-y-1 text-left sm:text-center">
                <div className="font-serif italic text-base text-[#1B3F8B] font-bold leading-none">
                  Mohamed Kumail Abbas
                </div>
                <div className="w-32 h-0.5 bg-stone-300 sm:mx-auto mt-1" />
                <span className="text-[11px] font-bold text-stone-900 block font-sans">
                  Mohamed Kumail Abbas
                </span>
                <span className="text-[10px] text-stone-500 font-sans block leading-tight">
                  Manager, Pharmacovigilance<br />Ex-Accenture &amp; Cognizant
                </span>
              </div>

              {/* QR Verification Seal */}
              <div className="flex flex-col items-center justify-center space-y-1">
                {qrUrl ? (
                  <img src={qrUrl} alt="Verify Certificate" className="w-16 h-16 rounded border border-stone-200" />
                ) : (
                  <div className="w-16 h-16 bg-stone-100 rounded border border-stone-200" />
                )}
                <span className="text-[9px] font-mono text-stone-500">Scan to Verify Authenticity</span>
              </div>

              {/* Quality Seal */}
              <div className="space-y-1 text-right sm:text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-stone-900 block font-sans">
                  Arzon Global Academic Seal
                </span>
                <span className="text-[10px] text-stone-500 font-sans block">
                  ISO 9001:2015 Standards Aligned
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        {onRegisterClick && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onRegisterClick}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <span>Attend Workshop to Unlock Your Certificate</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
