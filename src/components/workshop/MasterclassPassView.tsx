import { useState } from "react";
import { CheckCircle2, Calendar, Clock, Video, Copy, Check, Download, ShieldCheck } from "lucide-react";
import { WORKSHOP_CONFIG, buildGoogleCalendarUrl } from "@/data/workshopConfig";
import { generateStarterKitPDF } from "@/lib/starter-kit-pdf";
import { generateWorkshopBrochurePDF } from "@/lib/workshop-brochure-pdf";

interface MasterclassPassViewProps {
  name: string;
  phone: string;
  qualificationStatus: string;
}

export function MasterclassPassView({
  name,
  phone,
  qualificationStatus,
}: MasterclassPassViewProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const cleanPhone = phone.replace(/\D/g, "");
  const passSerial = cleanPhone.slice(-4) || "8492";
  const passId = `PV-2026-${passSerial}`;

  const meetUrl = WORKSHOP_CONFIG.meetUrl;
  const calendarUrl = buildGoogleCalendarUrl(WORKSHOP_CONFIG);

  const handleCopy = () => {
    navigator.clipboard.writeText(meetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generateWorkshopBrochurePDF({
        institutionName: "Pharmacovigilance & Drug Safety Unit",
        recipientName: name || "Candidate",
        recipientTitle: `${qualificationStatus || "Healthcare Graduate"} · Seat #${passId}`,
      });
    } catch {
      try {
        await generateStarterKitPDF({
          candidateName: name || "Candidate",
          degree: qualificationStatus || "Healthcare Graduate",
          college: "Pharmacy / Life Sciences",
          branch: "Pharmacovigilance",
        });
      } catch (e) {
        console.error("PDF generation failed:", e);
      }
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  return (
    <div className="py-16 sm:py-24 max-w-2xl mx-auto px-4 sm:px-6">
      {/* Confirmation Badge */}
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mx-auto mb-3.5 border border-[#A7F3D0] shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#065F46] bg-[#ECFDF5] px-3.5 py-1 rounded-full border border-[#A7F3D0]">
          Seat Confirmed · Verified Admission
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#081F38] mt-3 mb-2 tracking-tight">
          You're in, <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">{name.split(" ")[0] || "Candidate"}</span>.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-lg mx-auto">
          Your seat has been reserved for the Live Pharmacovigilance Masterclass & Industry Career Blueprint.
        </p>
      </div>

      {/* Admission Pass Card — Apple Boarding Pass / Ticket */}
      <div className="rounded-3xl bg-white border border-[#E4EAF2] shadow-[0_20px_50px_-15px_rgba(37,99,235,0.08)] p-6 sm:p-9 tone-light card-light relative overflow-hidden mb-7">
        {/* Micro-accent top gradient bar */}
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED]" />

        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-slate-400">
              Admission Pass ID
            </span>
            <div className="font-mono text-lg font-bold text-[#081F38] tracking-tight flex items-center gap-2">
              <span>{passId}</span>
              <span className="text-[10px] font-sans font-semibold text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded-full border border-[#BFDBFE]">
                Day-0 Access
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-slate-400">
              Format
            </span>
            <div className="text-xs sm:text-sm font-bold text-[#2563EB] flex items-center justify-end gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
              Live Interactive
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="py-5 border-b border-slate-100 space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#BFDBFE]/60">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Session Date</div>
              <div className="text-sm sm:text-base font-bold text-[#081F38]">
                Tuesday, October 20th, 2026
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center shrink-0 border border-[#BAE6FD]/60">
              <Clock className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Time Window</div>
              <div className="text-sm sm:text-base font-bold text-[#081F38]">
                6:00 PM IST (Prompt)
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0 border border-[#A7F3D0]/60">
              <Video className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-400 font-medium">Meeting Room (Google Meet)</div>
              <div className="text-xs sm:text-sm font-semibold text-[#081F38] break-all font-mono">
                {meetUrl}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-[#BFDBFE] bg-[#F8FAFC] hover:bg-[#EEF6FF] text-[#081F38] hover:text-[#2563EB] text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#10B981]" />
                <span className="text-[#065F46] font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy Meeting Link</span>
              </>
            )}
          </button>

          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-arzon-dark="true"
            style={{
              backgroundColor: "#2563EB",
              color: "#ffffff",
              WebkitTextFillColor: "#ffffff",
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white !text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" style={{ color: "#ffffff", stroke: "#ffffff" }} />
            <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>Add to Google Calendar</span>
          </a>
        </div>
      </div>

      {/* WhatsApp Reassurance Note */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#EEF6FF]/70 border border-[#BFDBFE]/80 mb-6 flex items-start gap-3 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          <strong className="text-[#081F38] font-bold">WhatsApp Direct Confirmation:</strong> We have recorded your registered phone number (+91 {cleanPhone}). Your calendar invite, live joining link, and workshop preparation pack will be sent directly to your WhatsApp before the session starts.
        </p>
      </div>

      {/* Download Brochure / Field Guide Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] bg-[#EEF6FF]/80 hover:bg-[#EEF6FF] border border-[#BFDBFE]/60 px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? "Preparing Document..." : "Download Pharmacovigilance Field Guide (PDF)"}</span>
        </button>
      </div>
    </div>
  );
}
