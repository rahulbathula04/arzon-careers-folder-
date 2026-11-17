import React, { useState, useEffect } from "react";
import { X, CheckCircle, ShieldCheck, Search, Share2, Award, ExternalLink } from "lucide-react";
import {
  OFFICIAL_CERTIFICATES,
  VERIFIED_CREDENTIAL_REGISTRY,
  type OfficialCertificate,
  type StudentCredentialRecord,
} from "@/data/credibility/certifications";
import { buildLinkedInAddUrl } from "@/data/credibility/socialRecognition";

interface CertificateVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCertificate?: OfficialCertificate | null;
}

export function CertificateVerificationModal({
  isOpen,
  onClose,
  selectedCertificate,
}: CertificateVerificationModalProps) {
  const [activeTab, setActiveTab] = useState<"certificates" | "verify-student">("certificates");
  const [searchId, setSearchId] = useState("");
  const [verifiedRecord, setVerifiedRecord] = useState<StudentCredentialRecord | null>(null);
  const [searchError, setSearchError] = useState(false);
  const [activeCert, setActiveCert] = useState<OfficialCertificate>(
    selectedCertificate || OFFICIAL_CERTIFICATES[0]
  );

  useEffect(() => {
    if (selectedCertificate) {
      setActiveCert(selectedCertificate);
      setActiveTab("certificates");
    }
  }, [selectedCertificate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleVerifyLookup = (idToSearch?: string) => {
    const query = (idToSearch || searchId).trim().toUpperCase();
    if (!query) return;
    const found = VERIFIED_CREDENTIAL_REGISTRY[query];
    if (found) {
      setVerifiedRecord(found);
      setSearchError(false);
    } else {
      setVerifiedRecord(null);
      setSearchError(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Certificate and Credential Verification"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#081F38]/85 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-2xl bg-white tone-light card-light rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] bg-[#081F38] text-white">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#60A5FA]" />
            <div>
              <h2 className="text-base sm:text-lg font-bold leading-none text-white">
                Official Credential Verification
              </h2>
              <span className="text-xs text-slate-300">
                Arzon Global Enterprise Trust Registry
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 pt-2">
          <button
            type="button"
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === "certificates"
                ? "border-[#2563EB] text-[#2563EB]"
                : "border-transparent text-[#64748B] hover:text-[#081F38]"
            }`}
            onClick={() => setActiveTab("certificates")}
          >
            Government & ISO Credentials
          </button>
          <button
            type="button"
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === "verify-student"
                ? "border-[#2563EB] text-[#2563EB]"
                : "border-transparent text-[#64748B] hover:text-[#081F38]"
            }`}
            onClick={() => setActiveTab("verify-student")}
          >
            Verify Student Credential ID
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto max-h-[70vh]">
          {activeTab === "certificates" ? (
            <div className="space-y-4">
              {/* Select Certificate Pills */}
              <div className="flex flex-wrap gap-2">
                {OFFICIAL_CERTIFICATES.map((cert) => (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeCert.id === cert.id
                        ? "bg-[#2563EB] text-white shadow-sm"
                        : "bg-white tone-light card-light border border-[#E2E8F0] text-[#081F38] hover:border-[#2563EB]"
                    }`}
                  >
                    {cert.category} • {cert.verificationBadge}
                  </button>
                ))}
              </div>

              {/* Certificate Detail Card */}
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E6F7F1] text-[#10B981] border border-[#10B981]/30">
                      {activeCert.status}
                    </span>
                    <h3 className="mt-1 text-base sm:text-lg font-bold text-[#081F38]">
                      {activeCert.title}
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      Issued by: {activeCert.issuingAuthority}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white tone-light card-light p-2.5 rounded-lg border border-[#E2E8F0]">
                    <span className="text-[#64748B] block">Registration No:</span>
                    <strong className="text-[#081F38] font-mono">{activeCert.registrationNumber}</strong>
                  </div>
                  <div className="bg-white tone-light card-light p-2.5 rounded-lg border border-[#E2E8F0]">
                    <span className="text-[#64748B] block">Validity:</span>
                    <strong className="text-[#081F38]">{activeCert.validity}</strong>
                  </div>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {activeCert.description}
                </p>

                <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Scope: {activeCert.auditScope}</span>
                  {activeCert.verificationUrl && (
                    <a
                      href={activeCert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#2563EB] font-bold hover:underline"
                    >
                      <span>Govt Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Certificate Preview Image */}
              <div className="rounded-xl border border-[#E2E8F0] overflow-hidden bg-black/5 flex items-center justify-center p-2">
                <img
                  src={activeCert.documentImage}
                  alt={activeCert.title}
                  className="max-h-56 object-contain rounded"
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-[#64748B]">
                Verify authentic credentials issued to Arzon Global healthcare candidates. Enter the
                unique Certificate Registration ID printed on the physical or digital certificate.
              </p>

              {/* Search Input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="e.g. ARZ-2025-PV-1042"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB]"
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyLookup()}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleVerifyLookup()}
                  className="px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs sm:text-sm font-bold hover:bg-[#1D4ED8] transition-colors"
                >
                  Verify ID
                </button>
              </div>

              {/* Quick Sample IDs for demo */}
              <div className="flex items-center gap-2 flex-wrap text-xs text-[#64748B]">
                <span>Sample verified IDs:</span>
                {Object.keys(VERIFIED_CREDENTIAL_REGISTRY).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setSearchId(id);
                      handleVerifyLookup(id);
                    }}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[#081F38] font-mono text-[11px] underline"
                  >
                    {id}
                  </button>
                ))}
              </div>

              {/* Verification Result */}
              {verifiedRecord && (
                <div className="p-4 rounded-xl border border-[#10B981]/40 bg-[#E6F7F1]/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
                      <CheckCircle className="w-4 h-4" />
                      {verifiedRecord.credentialStatus}
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">
                      ID: {verifiedRecord.credentialId}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-[#081F38]">
                      {verifiedRecord.studentName}
                    </h4>
                    <p className="text-xs font-semibold text-[#2563EB]">
                      {verifiedRecord.program}
                    </p>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Completed: {verifiedRecord.completionDate} • Grade: {verifiedRecord.grade}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-[#081F38] block mb-1">
                      Validated Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {verifiedRecord.skillsVerified.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] bg-white tone-light card-light border border-[#10B981]/30 text-[#081F38]"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* LinkedIn 1-Click Share Button */}
                  <div className="pt-2 border-t border-[#10B981]/20 flex items-center justify-between">
                    <span className="text-xs text-[#64748B]">Recognized on LinkedIn</span>
                    <a
                      href={buildLinkedInAddUrl({
                        certName: verifiedRecord.program,
                        organizationName: "Arzon Global",
                        issueYear: "2025",
                        issueMonth: "10",
                        certUrl: "https://arzoncareers.in/verify",
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A66C2] text-white text-xs font-bold hover:bg-[#084e96] transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Add to LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              )}

              {searchError && (
                <div className="p-4 rounded-xl border border-[#EF4444]/30 bg-[#FEF2F2] text-xs text-[#EF4444]">
                  No active student credential found matching <strong>{searchId}</strong>. Please check
                  the registration number or contact registry support at verification@arzoncareers.in.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
