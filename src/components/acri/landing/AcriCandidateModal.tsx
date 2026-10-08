import { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Copy,
  RefreshCw,
  Search,
  Sparkles,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { applyAcriCandidateFn, checkAcriCandidateStatusFn } from "@/lib/acri-core.functions";
import { submitApplication } from "@/lib/applications.functions";
import { toast } from "sonner";

interface AcriCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUALIFICATIONS = [
  "B.Pharm (Bachelor of Pharmacy)",
  "M.Pharm (Pharmacology / Clinical / Pharmaceutics)",
  "Pharm.D (Doctor of Pharmacy)",
  "MBBS / Medical Graduate",
  "BDS / Dental Graduate",
  "B.Sc / M.Sc Life Sciences / Biotechnology",
  "B.Sc / M.Sc Nursing",
  "Other Healthcare / Science Degree",
];

interface RecognizedState {
  candidateName: string;
  email: string;
  phone: string;
  qualification: string;
  college: string;
  status: "accepted" | "invited" | "in_progress" | "certified" | "pending" | "rejected";
  inviteCode?: string | null;
  inviteUrl?: string | null;
}

export function AcriCandidateModal({ isOpen, onClose }: AcriCandidateModalProps) {
  const navigate = useNavigate();
  const applyCandidate = useServerFn(applyAcriCandidateFn);
  const submitApp = useServerFn(submitApplication);
  const checkStatusFn = useServerFn(checkAcriCandidateStatusFn);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [highestQualification, setHighestQualification] = useState(QUALIFICATIONS[0]);
  const [collegeUniversity, setCollegeUniversity] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState<"yes" | "no">("no");

  // Legal Consent State
  const [consentAccuracy, setConsentAccuracy] = useState(true);
  const [consentCommunications, setConsentCommunications] = useState(true);

  // Recognition & Flow State: "form" | "accepted" | "pending" | "lookup" | "submitted"
  const [step, setStep] = useState<"form" | "accepted" | "pending" | "lookup" | "submitted">("form");
  const [recognizedCandidate, setRecognizedCandidate] = useState<RecognizedState | null>(null);
  const [isCheckingRecognition, setIsCheckingRecognition] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manual lookup state
  const [lookupQuery, setLookupQuery] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Automatic Candidate Recognition on Modal Open
  useEffect(() => {
    if (!isOpen) return;

    let storedProfile: any = null;
    try {
      const raw =
        sessionStorage.getItem("arzon_acri_candidate_profile") ||
        localStorage.getItem("arzon_acri_candidate_profile");
      if (raw) storedProfile = JSON.parse(raw);
    } catch {}

    if (storedProfile) {
      if (storedProfile.fullName) setFullName(storedProfile.fullName);
      if (storedProfile.email) setEmail(storedProfile.email);
      if (storedProfile.mobile) setMobile(storedProfile.mobile);
      if (storedProfile.qualification) setHighestQualification(storedProfile.qualification);
      if (storedProfile.college) setCollegeUniversity(storedProfile.college);

      // Probe backend to see if applicant was accepted in Admin Dashboard
      if (storedProfile.email || storedProfile.mobile) {
        setIsCheckingRecognition(true);
        checkStatusFn({
          data: {
            email: storedProfile.email || undefined,
            phone: storedProfile.mobile || undefined,
          },
        })
          .then((res) => {
            if (res && res.found) {
              const rec: RecognizedState = {
                candidateName: res.candidateName || storedProfile.fullName || "Candidate",
                email: res.email || storedProfile.email || "",
                phone: res.phone || storedProfile.mobile || "",
                qualification: res.qualification || storedProfile.qualification || QUALIFICATIONS[0],
                college: res.college || storedProfile.college || "Affiliated College",
                status: (res.status as RecognizedState["status"]) || "pending",
                inviteCode: res.inviteCode || storedProfile.code || null,
                inviteUrl: res.inviteUrl || null,
              };

              setRecognizedCandidate(rec);

              // Update storage with authoritative status & invite code
              try {
                const updated = {
                  ...storedProfile,
                  code: rec.inviteCode || storedProfile.code || "",
                  status: rec.status,
                };
                sessionStorage.setItem("arzon_acri_candidate_profile", JSON.stringify(updated));
                localStorage.setItem("arzon_acri_candidate_profile", JSON.stringify(updated));
              } catch {}

              if (rec.status === "accepted" || rec.status === "invited" || rec.inviteCode) {
                setStep("accepted");
              } else if (rec.status === "pending") {
                setStep("pending");
              }
            }
          })
          .catch((err) => {
            console.warn("[AcriCandidateModal] recognition check error:", err);
          })
          .finally(() => {
            setIsCheckingRecognition(false);
          });
      }
    }
  }, [isOpen, checkStatusFn]);

  if (!isOpen) return null;

  // Manual Status Lookup Handler
  const handleManualLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = lookupQuery.trim();
    if (!clean) {
      setLookupError("Please enter your registered mobile number or email.");
      return;
    }

    setLookupError(null);
    setIsLookingUp(true);

    const isEmail = clean.includes("@");
    try {
      const res = await checkStatusFn({
        data: {
          email: isEmail ? clean : undefined,
          phone: !isEmail ? clean : undefined,
        },
      });

      if (!res || !res.found) {
        setLookupError("No application was found matching this contact. Please submit an application below.");
        return;
      }

      const rec: RecognizedState = {
        candidateName: res.candidateName || "Candidate",
        email: res.email || "",
        phone: res.phone || "",
        qualification: res.qualification || QUALIFICATIONS[0],
        college: res.college || "Affiliated College",
        status: (res.status as RecognizedState["status"]) || "pending",
        inviteCode: res.inviteCode || null,
        inviteUrl: res.inviteUrl || null,
      };

      setRecognizedCandidate(rec);

      // Pre-fill form fields
      setFullName(rec.candidateName);
      if (rec.email) setEmail(rec.email);
      if (rec.phone) setMobile(rec.phone);
      if (rec.college) setCollegeUniversity(rec.college);
      if (rec.qualification) setHighestQualification(rec.qualification);

      // Save to local storage for persistent recognition
      try {
        const payload = {
          fullName: rec.candidateName,
          email: rec.email,
          mobile: rec.phone,
          qualification: rec.qualification,
          college: rec.college,
          code: rec.inviteCode || "",
          status: rec.status,
          consentedAt: new Date().toISOString(),
          legalConsentAccepted: true,
        };
        sessionStorage.setItem("arzon_acri_candidate_profile", JSON.stringify(payload));
        localStorage.setItem("arzon_acri_candidate_profile", JSON.stringify(payload));
      } catch {}

      if (rec.status === "accepted" || rec.status === "invited" || rec.inviteCode) {
        setStep("accepted");
        toast.success(`Welcome back, ${rec.candidateName}! Application Accepted.`);
      } else {
        setStep("pending");
        toast.info(`Application on file for ${rec.candidateName}. Admissions review is pending.`);
      }
    } catch (err: any) {
      setLookupError(err?.message || "Status check temporarily unavailable. Please try again.");
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleCopyCode = () => {
    if (!recognizedCandidate?.inviteCode) return;
    navigator.clipboard.writeText(recognizedCandidate.inviteCode);
    setCopiedCode(true);
    toast.success("Copied invite code to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleLaunchAssessment = () => {
    const code = recognizedCandidate?.inviteCode;
    if (code) {
      onClose();
      navigate({
        to: "/acri/invite",
        search: { code },
      });
    } else {
      onClose();
      navigate({ to: "/acri/invite" });
    }
  };

  const handleResetIdentity = () => {
    try {
      sessionStorage.removeItem("arzon_acri_candidate_profile");
      localStorage.removeItem("arzon_acri_candidate_profile");
    } catch {}
    setRecognizedCandidate(null);
    setFullName("");
    setEmail("");
    setMobile("");
    setCollegeUniversity("");
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !mobile.trim() || !collegeUniversity.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!consentAccuracy || !consentCommunications) {
      toast.error("Please verify and accept the required legal declarations.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Proactively check if this candidate was ALREADY accepted by admissions
      const existingStatus = await checkStatusFn({
        data: { email: email.trim(), phone: mobile.trim() },
      }).catch(() => null);

      if (existingStatus?.found && (existingStatus.status === "accepted" || existingStatus.inviteCode)) {
        const rec: RecognizedState = {
          candidateName: existingStatus.candidateName || fullName.trim(),
          email: existingStatus.email || email.trim(),
          phone: existingStatus.phone || mobile.trim(),
          qualification: existingStatus.qualification || highestQualification,
          college: existingStatus.college || collegeUniversity.trim(),
          status: "accepted",
          inviteCode: existingStatus.inviteCode || null,
          inviteUrl: existingStatus.inviteUrl || null,
        };
        setRecognizedCandidate(rec);
        setStep("accepted");
        toast.success(`You are already accepted! Welcome, ${rec.candidateName}.`);
        return;
      }

      // 2. Register candidate in ACRI database
      const serverRes = await applyCandidate({
        data: {
          fullName: fullName.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          highestQualification,
          collegeUniversity: collegeUniversity.trim(),
          currentlyWorking,
        },
      });

      if (!serverRes?.success || !serverRes.candidateId) {
        throw new Error("ACRI registration was not persisted.");
      }

      // 3. Persist session context
      const candidateProfileData = {
        fullName: fullName.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        qualification: highestQualification,
        college: collegeUniversity.trim(),
        code: "",
        status: "pending",
        consentedAt: new Date().toISOString(),
        legalConsentAccepted: true,
      };
      sessionStorage.setItem("arzon_acri_candidate_profile", JSON.stringify(candidateProfileData));
      localStorage.setItem("arzon_acri_candidate_profile", JSON.stringify(candidateProfileData));

      // 4. Register application into core Admin Applications Pipeline
      try {
        await submitApp({
          data: {
            name: fullName.trim(),
            email: email.trim(),
            phone: mobile.trim(),
            programSlug: "acri-pharmacovigilance",
            programName: "ACRI Pharmacovigilance Certification · Pending Review",
            whatsappOptin: true,
            college: collegeUniversity.trim(),
            degree: highestQualification,
          },
        });
      } catch (err) {
        console.warn("Applications pipeline sync warn:", err);
      }

      setStep("submitted");
      toast.success("Application submitted. Admissions review is pending.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to process application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white card-light border border-stone-200 shadow-2xl overflow-hidden font-sans"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Brand Strip */}
        <div className="bg-[#005B4F] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-100">
              ACRI PHARMACOVIGILANCE · ADMISSIONS GATEWAY
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-[#00473E] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-7 max-h-[85vh] overflow-y-auto">
          {/* Checking Recognition Spinner Banner */}
          {isCheckingRecognition && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900 motion-safe:animate-pulse">
              <RefreshCw className="h-4 w-4 motion-safe:animate-spin text-[#005B4F]" />
              <span>Checking candidate admissions record…</span>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              VIEW 1: RECOGNIZED & ACCEPTED CANDIDATE SCREEN (THE CORE FIX!)
          ════════════════════════════════════════════════════════════════════ */}
          {step === "accepted" && recognizedCandidate ? (
            <div className="space-y-6 text-center animate-in fade-in duration-200">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#E8F7F1] text-[#005B4F] mx-auto border-2 border-[#005B4F]/20 shadow-xs">
                <CheckCircle2 className="h-9 w-9 text-[#005B4F]" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3.5 py-1 rounded-full border border-[#005B4F]/20">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
                  <span>APPLICATION ACCEPTED · ACCESS GRANTED</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1325] mt-2.5">
                  Welcome Back, {recognizedCandidate.candidateName}!
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto leading-relaxed">
                  Your candidate application for the <strong>ACRI Pharmacovigilance Certification</strong> has been reviewed and <strong className="text-emerald-700">ACCEPTED</strong> by Arzon Admissions.
                </p>
              </div>

              {/* Authorized Invite Code Card */}
              <div className="bg-[#FAF8F5] border-2 border-dashed border-[#005B4F]/30 rounded-2xl p-5 space-y-2 text-center">
                <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest block">
                  YOUR OFFICIAL ACRI ACCESS KEY
                </span>
                <div className="flex items-center justify-center gap-2.5">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-[#005B4F] tracking-wider select-all">
                    {recognizedCandidate.inviteCode || "ACRI-PV-ACTIVE"}
                  </span>
                  {recognizedCandidate.inviteCode && (
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="p-2 rounded-lg bg-white card-light border border-stone-200 text-stone-600 hover:text-[#005B4F] transition-colors cursor-pointer"
                      title="Copy Key"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {copiedCode && (
                  <span className="text-xs text-emerald-600 font-semibold block animate-in fade-in">
                    ✓ Access key copied to clipboard!
                  </span>
                )}
              </div>

              {/* Candidate Dossier Summary */}
              <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 text-left text-xs space-y-1.5">
                <div className="flex items-center justify-between text-stone-600">
                  <span>Candidate:</span>
                  <strong className="text-stone-900">{recognizedCandidate.candidateName}</strong>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span>College:</span>
                  <strong className="text-stone-900 truncate max-w-[240px]">
                    {recognizedCandidate.college}
                  </strong>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span>Qualification:</span>
                  <strong className="text-stone-900">{recognizedCandidate.qualification}</strong>
                </div>
              </div>

              {/* Direct Launch Assessment CTA */}
              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={handleLaunchAssessment}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer group"
                >
                  <span>LAUNCH ACRI ASSESSMENT TERMINAL →</span>
                  <ArrowRight className="h-4 w-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                  <button
                    type="button"
                    onClick={handleResetIdentity}
                    className="hover:text-stone-800 underline cursor-pointer"
                  >
                    Not you? Apply as someone else
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="hover:text-stone-800 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : step === "pending" && recognizedCandidate ? (
            /* ═══════════════════════════════════════════════════════════════════
               VIEW 2: RECOGNIZED PENDING REVIEW SCREEN
            ════════════════════════════════════════════════════════════════════ */
            <div className="space-y-6 text-center animate-in fade-in duration-200">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-50 text-amber-700 mx-auto border border-amber-200">
                <Clock className="h-7 w-7 text-amber-600" />
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                  ● APPLICATION ON FILE · PENDING REVIEW
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-2.5">
                  Welcome Back, {recognizedCandidate.candidateName}!
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto leading-relaxed">
                  We already have your admissions application for <strong>{recognizedCandidate.college}</strong> on file. Your candidate dossier is currently under admissions review.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left space-y-1.5 text-xs text-amber-900 leading-relaxed">
                <p>
                  <strong>No further action is required from you:</strong> You do not need to re-enter your details. Once an admissions counsellor marks your file as accepted, your access key will appear here automatically.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCheckingRecognition(true);
                    checkStatusFn({
                      data: {
                        email: recognizedCandidate.email,
                        phone: recognizedCandidate.phone,
                      },
                    })
                      .then((res) => {
                        if (res && res.found && (res.status === "accepted" || res.inviteCode)) {
                          setRecognizedCandidate({
                            ...recognizedCandidate,
                            status: "accepted",
                            inviteCode: res.inviteCode,
                            inviteUrl: res.inviteUrl,
                          });
                          setStep("accepted");
                          toast.success("Application accepted! Invite code issued.");
                        } else {
                          toast.info("Status still in review. Please check again shortly.");
                        }
                      })
                      .finally(() => setIsCheckingRecognition(false));
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  <RefreshCw className={`h-4 w-4 ${isCheckingRecognition ? "motion-safe:animate-spin" : ""}`} />
                  <span>Check Admissions Status Again</span>
                </button>

                <div className="flex items-center justify-between text-xs text-stone-500">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="hover:text-stone-800 underline cursor-pointer"
                  >
                    Edit / Update My Details
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="hover:text-stone-800 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : step === "lookup" ? (
            /* ═══════════════════════════════════════════════════════════════════
               VIEW 3: LOOKUP APPLICATION BY PHONE OR EMAIL
            ════════════════════════════════════════════════════════════════════ */
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-2.5 py-1 rounded-full">
                  APPLICANT SELF-IDENTIFICATION
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B1325] mt-2">
                  Check Your ACRI Acceptance
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  Enter your registered mobile number or email address to retrieve your admissions status and access key.
                </p>
              </div>

              <form onSubmit={handleManualLookup} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Number or Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={lookupQuery}
                    onChange={(e) => setLookupQuery(e.target.value)}
                    placeholder="e.g. 9876543210 or name@university.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:border-[#005B4F] transition-all"
                  />
                  {lookupError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1.5">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{lookupError}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={isLookingUp}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isLookingUp ? (
                      <span>Searching admissions records…</span>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        <span>RECOGNIZE ME &amp; RETRIEVE KEY →</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="w-full text-center text-xs text-stone-500 hover:text-stone-800 font-mono py-1 cursor-pointer"
                  >
                    ← Back to Application Form
                  </button>
                </div>
              </form>
            </div>
          ) : step === "form" ? (
            /* ═══════════════════════════════════════════════════════════════════
               VIEW 4: APPLICATION FORM WITH PRE-FILL & LOOKUP LINK
            ════════════════════════════════════════════════════════════════════ */
            <div>
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-2.5 py-1 rounded-full">
                    APPLICATIONS OPEN · 100 COHORT SEATS
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B1325] mt-2">
                    Claim Your ACRI Invite
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                    Apply for the ACRI Pharmacovigilance Certification. Access is issued after admissions review.
                  </p>
                </div>
              </div>

              {/* Already Applied Shortcut Banner */}
              <div className="mb-5 p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                <span className="text-stone-600">Already applied earlier?</span>
                <button
                  type="button"
                  onClick={() => setStep("lookup")}
                  className="font-mono font-bold text-[#005B4F] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Search className="h-3 w-3" />
                  <span>Check status / Retrieve key →</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:border-[#005B4F] transition-all"
                  />
                </div>

                {/* 2. Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@university.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:border-[#005B4F] transition-all"
                  />
                </div>

                {/* 3. Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:border-[#005B4F] transition-all"
                  />
                </div>

                {/* 4. Highest Qualification */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Highest Qualification <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={highestQualification}
                    onChange={(e) => setHighestQualification(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white card-light focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:border-[#005B4F] transition-all"
                  >
                    {QUALIFICATIONS.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. College / University */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    College / University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={collegeUniversity}
                    onChange={(e) => setCollegeUniversity(e.target.value)}
                    placeholder="e.g. Bombay College of Pharmacy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:border-[#005B4F] transition-all"
                  />
                </div>

                {/* 6. Are you currently working? */}
                <div className="pt-1">
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Are you currently working?
                  </label>
                  <div className="flex items-center gap-6 text-sm text-stone-800">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="working"
                        value="no"
                        checked={currentlyWorking === "no"}
                        onChange={() => setCurrentlyWorking("no")}
                        className="text-[#005B4F] focus:ring-[#005B4F]"
                      />
                      <span>No (Student / Fresher)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="working"
                        value="yes"
                        checked={currentlyWorking === "yes"}
                        onChange={() => setCurrentlyWorking("yes")}
                        className="text-[#005B4F] focus:ring-[#005B4F]"
                      />
                      <span>Yes (Employed)</span>
                    </label>
                  </div>
                </div>

                {/* Mandatory Legal & Educational Consent Process */}
                <div className="pt-2 pb-1 space-y-2 rounded-xl bg-stone-50 border border-stone-200/80 p-3 text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-stone-800 uppercase tracking-wider">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>Candidate Declaration &amp; Consent</span>
                  </div>

                  <label className="flex items-start gap-2 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consentAccuracy}
                      onChange={(e) => setConsentAccuracy(e.target.checked)}
                      className="mt-0.5 rounded border-stone-300 text-[#005B4F] focus:ring-[#005B4F]"
                    />
                    <span className="leading-tight">
                      <strong>Educational Accuracy:</strong> I certify my educational details are authentic. I consent to assessment evaluation under the{" "}
                      <a href="/terms" target="_blank" className="text-[#005B4F] underline hover:text-[#00473E]">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" target="_blank" className="text-[#005B4F] underline hover:text-[#00473E]">
                        Privacy Policy
                      </a>.
                    </span>
                  </label>

                  <label className="flex items-start gap-2 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consentCommunications}
                      onChange={(e) => setConsentCommunications(e.target.checked)}
                      className="mt-0.5 rounded border-stone-300 text-[#005B4F] focus:ring-[#005B4F]"
                    />
                    <span className="leading-tight">
                      <strong>Admissions Dispatch:</strong> I authorize Arzon Admissions to dispatch my access key via WhatsApp and Email.
                    </span>
                  </label>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !consentAccuracy || !consentCommunications}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Executing candidate registration…</span>
                    ) : (
                      <>
                        <span>EXECUTE REGISTRATION &amp; CLAIM INVITE →</span>
                      </>
                    )}
                  </button>
                  <span className="block text-center text-[11px] text-stone-500 mt-1.5 font-mono">
                    No payment required. Access is issued after admissions review.
                  </span>
                </div>
              </form>
            </div>
          ) : (
            /* ═══════════════════════════════════════════════════════════════════
               VIEW 5: NEW SUBMISSION COMPLETE SCREEN
            ════════════════════════════════════════════════════════════════════ */
            <div className="text-center py-2 space-y-4 font-sans animate-in fade-in duration-200">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#E8F7F1] text-[#005B4F] mx-auto border border-[#005B4F]/20">
                <CheckCircle2 className="h-7 w-7 text-[#005B4F]" />
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full border border-[#005B4F]/20">
                  ● APPLICATION LOGGED · PENDING REVIEW
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-2">
                  Application Logged
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your application has been recorded. An access invitation will be issued after admissions review.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-700" />
                  <span className="font-mono text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Assessment access: pending review
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-amber-900">
                  Your application reference is stored in Arzon's admissions ledger. A real, single-use ACRI invite code will appear here after admissions approval. No assessment access is created at registration time.
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>CLOSE</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="font-mono text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                  >
                    Return to Overview
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
