import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { BadgeCheck, Copy, Check, ExternalLink, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export type CertificateItem = {
  id: string;
  certNo?: string;
  title: string;
  issuer: string;
  recipient: string;
  issueDate: string;
  validity?: string;
  location?: string;
  signatories?: string[];
  address?: string;
  description: string;
  image_url: string;
  pdf_url?: string | null;
  type: "partner" | "graduate";
  vmoId?: string;
};

interface CertificateModalProps {
  cert: CertificateItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateModal({ cert, isOpen, onClose }: CertificateModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!cert) return null;

  const handleCopyId = () => {
    const textToCopy = cert.certNo || cert.vmoId || cert.id;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPartner = cert.type === "partner";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-white tone-light border border-stone-300 shadow-2xl rounded-2xl sm:rounded-3xl">
        <div className="flex flex-col lg:flex-row max-h-[85vh] overflow-y-auto lg:overflow-visible">
          {/* Left Column: Ultra-HD Certificate Display */}
          <div className="lg:w-7/12 bg-stone-900 p-4 sm:p-6 flex flex-col items-center justify-center relative min-h-[320px] sm:min-h-[420px]">
            <div className="absolute top-3 left-3 z-10">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                isPartner 
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-md" 
                  : "bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 backdrop-blur-md"
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                {isPartner ? "Official Institutional Document" : "Verifiable Graduate Credential"}
              </span>
            </div>

            <figure className="relative w-full h-full flex items-center justify-center p-2 group">
              <img
                src={cert.image_url}
                alt={cert.title}
                className="max-h-[60vh] w-auto object-contain rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-stone-300 px-2.5 py-1 rounded-md text-[10px] font-mono">
                Click photo to enlarge
              </div>
            </figure>
          </div>

          {/* Right Column: Verification Metadata Panel */}
          <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-stone-50 tone-light border-t lg:border-t-0 lg:border-l border-stone-200">
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-2 border-b border-stone-200 pb-4">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B] block">
                    {cert.issuer}
                  </span>
                  <DialogTitle className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight mt-1">
                    {cert.title}
                  </DialogTitle>
                </div>
              </div>

              {/* Status Badge */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3">
                <div className="relative flex h-3 w-3 shrink-0">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-950 font-mono">STATUS: VERIFIED AUTHENTIC</p>
                  <p className="text-[11px] text-emerald-800 font-sans">Active recruitment agreement on record</p>
                </div>
              </div>

              {/* Certificate Metadata Grid */}
              <div className="space-y-3 text-xs font-sans text-stone-700">
                <div className="p-3 bg-white tone-light rounded-xl border border-stone-200 space-y-2 font-mono">
                  {(cert.certNo || cert.vmoId) && (
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Credential ID / VMO:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1B3F8B]">{cert.certNo || cert.vmoId}</span>
                        <button
                          onClick={handleCopyId}
                          title="Copy ID"
                          className="p-1 text-stone-400 hover:text-stone-700 rounded transition-colors"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Presented To:</span>
                    <span className="font-bold text-stone-900">{cert.recipient}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Issued On:</span>
                    <span className="font-bold text-stone-900">{cert.issueDate}</span>
                  </div>

                  {cert.location && (
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Location:</span>
                      <span className="font-bold text-stone-900">{cert.location}</span>
                    </div>
                  )}
                </div>

                {cert.signatories && cert.signatories.length > 0 && (
                  <div className="p-3 bg-white tone-light rounded-xl border border-stone-200 space-y-1">
                    <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block">Authorized Signatories</span>
                    <ul className="space-y-1">
                      {cert.signatories.map((sig, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-xs text-stone-800 font-medium">
                          <BadgeCheck className="w-3.5 h-3.5 text-[#1B3F8B] shrink-0" />
                          <span>{sig}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-3 bg-white tone-light rounded-xl border border-stone-200">
                  <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block mb-1">Document Scope</span>
                  <p className="text-xs text-stone-600 leading-relaxed">{cert.description}</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <Link
                to="/verify"
                className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-mono text-xs font-bold shadow-xs transition-colors"
                onClick={onClose}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verify in Live Public Portal</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </Link>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full h-9 rounded-xl border-stone-300 text-stone-600 font-mono text-xs hover:bg-stone-100"
              >
                Close Details
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
