import { useState } from "react";
import { CheckCircle2, Calendar, Clock, Video, Copy, Check, Download, ShieldCheck, ArrowRight } from "lucide-react";
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

  const handleDownload = () => {
    setDownloading(true);
    try {
      generateWorkshopBrochurePDF({
        institutionName: "Pharmacovigilance & Drug Safety Unit",
        recipientName: name || "Candidate",
        recipientTitle: `${qualificationStatus || "Healthcare Graduate"} · Seat #${passId}`,
      });
    } catch {
      try {
        generateStarterKitPDF({
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
    <div className="py-12 sm:py-20 max-w-2xl mx-auto px-4 sm:px-6">
      {/* Confirmation Badge */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Seat Confirmed
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#081F38] mt-3 mb-2 font-serif">
          You're in, {name.split(" ")[0] || "Candidate"}.
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Your seat has been reserved for the Pharmacovigilance Masterclass.
        </p>
      </div>

      {/* Admission Pass Card */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-md p-6 sm:p-8 tone-light card-light relative overflow-hidden mb-8">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Admission Pass
            </span>
            <div className="font-mono text-base font-bold text-[#081F38]">
              {passId}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Session
            </span>
            <div className="text-xs font-semibold text-blue-600">
              Live Interactive
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="py-6 border-b border-slate-100 space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-slate-500 font-medium">Date</div>
              <div className="text-sm font-bold text-[#081F38]">
                Tuesday, October 20th, 2026
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-slate-500 font-medium">Time</div>
              <div className="text-sm font-bold text-[#081F38]">
                6:00 PM IST (Prompt)
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Video className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-xs text-slate-500 font-medium">Meeting Room</div>
              <div className="text-sm font-bold text-[#081F38] break-all">
                {meetUrl}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Copy Meeting Link</span>
              </>
            )}
          </button>

          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
          >
            <Calendar className="w-4 h-4" />
            <span>Add to Google Calendar</span>
          </a>
        </div>
      </div>

      {/* WhatsApp Reassurance Note */}
      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 mb-6 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong>WhatsApp Confirmation:</strong> We have noted your WhatsApp number (+91 {cleanPhone}). Your joining reminder and meeting room link will be sent prior to the session start.
        </p>
      </div>

      {/* Download Brochure / Field Guide Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? "Preparing Document..." : "Download Pharmacovigilance Field Guide (PDF)"}</span>
        </button>
      </div>
    </div>
  );
}
