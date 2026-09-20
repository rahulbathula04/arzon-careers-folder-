import { useState } from "react";
import { X, CheckCircle2, AlertCircle, Award, ShieldCheck, QrCode, ExternalLink, ArrowRight, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArzonLogo } from "./ArzonLogo";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 1. Sample Report Modal for Ananya Sharma (ACRI 82/100)
 */
export function SampleReportModal({
  isOpen,
  onClose,
  onOpenCertificate,
}: ModalProps & { onOpenCertificate: () => void }) {
  if (!isOpen) return null;

  const competencies = [
    { name: "PV Knowledge", score: 86, desc: "Understanding of core PV concepts, adverse reaction mechanisms, and triage" },
    { name: "Case Processing", score: 83, desc: "Ability to work through safety cases and identify 4 minimum ICSR criteria" },
    { name: "Analytical Reasoning", score: 84, desc: "Interpreting clinical lab results and assessing causality" },
    { name: "Attention to Detail", score: 92, desc: "Identifying discrepancies, duplicate reports, and missing safety data" },
    { name: "Documentation", score: 78, desc: "Structuring MedWatch 3500A and CIOMS I narrative drafts" },
    { name: "Situational Judgment", score: 80, desc: "Handling expedited timeline trade-offs and escalation protocols" },
    { name: "Regulatory Awareness", score: 85, desc: "ICH E2B(R3), FDA 21 CFR 314.80, and EMA GVP Module VI comprehension" },
    { name: "Applied PV Skills", score: 82, desc: "Simulated safety database navigation and MedDRA LLT coding" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-stone-200 bg-white tone-light p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close Report"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="border-b border-stone-100 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200 uppercase tracking-wider mb-2">
                <span>ACRI Audited Report</span>
              </div>
              <h2 className="font-sans text-2xl font-extrabold text-[#0B1325]">
                Candidate Assessment Report
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Version: ACRI-PV-PA-1.0 · Evaluated under global PV benchmarks
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                  Composite ACRI
                </span>
                <span className="font-sans text-3xl font-extrabold text-[#0B1325]">82</span>
                <span className="text-xs font-semibold text-stone-400">/100</span>
              </div>
              <div className="rounded-full bg-emerald-100 p-2 text-emerald-800">
                <Award className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Summary */}
        <div className="mt-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/avatar-ananya.jpg"
              alt="Ananya Sharma"
              className="h-12 w-12 rounded-full object-cover border border-stone-300"
            />
            <div>
              <h3 className="font-sans text-sm font-bold text-[#0B1325]">Ananya Sharma</h3>
              <p className="text-xs text-stone-500">Pharm.D Graduate (2025) · Hyderabad, India</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-900">
              ● INDUSTRY READY
            </span>
            <button
              type="button"
              onClick={onOpenCertificate}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white tone-light px-3 py-1 text-xs font-semibold text-stone-800 hover:bg-stone-50"
            >
              <Award className="h-3.5 w-3.5 text-amber-600" />
              <span>View Certificate</span>
            </button>
          </div>
        </div>

        {/* 8 Competencies Capability Breakdown */}
        <div className="mt-6">
          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
            Capability Breakdown (8 Core Dimensions)
          </h4>
          <div className="space-y-3">
            {competencies.map((comp) => (
              <div key={comp.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-800">{comp.name}</span>
                  <span className="font-mono font-bold text-stone-900">{comp.score}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${comp.score}%` }}
                  />
                </div>
                <p className="text-[10px] text-stone-500">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Development Areas */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
              Top 3 Strengths
            </span>
            <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                Attention to Detail (92%)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                PV Knowledge &amp; Triage (86%)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                Regulatory Timelines (85%)
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-900 block">
              Top 3 Development Gaps
            </span>
            <ul className="space-y-1.5 text-xs text-rose-950 font-medium">
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                Documentation &amp; CIOMS I (78%)
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                Situational Escalation (80%)
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                Argus Simulator Interface (82%)
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-stone-500">
            Want to see your own ACRI score and skill breakdown?
          </span>
          <Link
            to="/career-engine/start"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0B1325] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342] transition-colors"
          >
            <span>Take Your Assessment</span>
            <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Certificate Modal with Verification and QR Code
 */
export function CertificateModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-stone-200 bg-white tone-light p-6 sm:p-8 shadow-2xl my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close Certificate"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Certificate Card Preview */}
        <div className="rounded-2xl border-4 border-[#0B1325] p-6 sm:p-8 bg-[#FAF8F5] relative overflow-hidden text-center space-y-4">
          {/* Top Seal & Brand */}
          <div className="flex items-center justify-between border-b border-stone-300 pb-4">
            <div className="flex items-center gap-3 text-left">
              <ArzonLogo variant="light" size="md" />
              <span className="hidden sm:inline-block text-[10px] text-stone-500 font-mono tracking-widest uppercase border-l border-stone-300 pl-3">
                Assessment Credential Registry
              </span>
            </div>

            <div className="rounded-full bg-emerald-50 border border-emerald-300 px-3 py-1 text-[10px] font-bold text-emerald-800">
              ACRI CERTIFIED
            </div>
          </div>

          <div className="py-2 space-y-1">
            <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
              This certifies that
            </p>
            <h3 className="font-sans text-2xl font-extrabold text-[#0B1325]">
              Ananya Sharma
            </h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto pt-1">
              has successfully completed the calibrated evaluation and demonstrated the defined industry competency threshold for
            </p>
            <div className="pt-2">
              <span className="inline-block font-sans text-lg font-bold text-[#0B1325] border-b-2 border-emerald-500 pb-1">
                Pharmacovigilance Associate · Industry Ready
              </span>
            </div>
          </div>

          {/* Credentials Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-stone-300 text-[11px]">
            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[9px]">ACRI Score</span>
              <span className="font-bold text-[#0B1325]">82 / 100</span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[9px]">Standard</span>
              <span className="font-bold text-emerald-800">Industry Ready</span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[9px]">Credential ID</span>
              <span className="font-mono font-bold text-stone-800">AZ-ACRI-2026-8291</span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[9px]">Evaluated</span>
              <span className="font-medium text-stone-700">18 Sep 2026</span>
            </div>
          </div>

          {/* Verification Bar */}
          <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-2 text-left">
              <div className="h-10 w-10 border border-stone-300 rounded bg-white tone-light flex items-center justify-center p-1">
                <QrCode className="h-full w-full text-stone-800" />
              </div>
              <div className="text-[10px] leading-tight">
                <span className="font-semibold text-stone-700 block">Instant Verification:</span>
                <span className="font-mono text-stone-500">arzoncareers.in/verify</span>
              </div>
            </div>

            <Link
              to="/verify"
              search={{ id: "AZ-ACRI-2026-8291" }}
              target="_blank"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900"
            >
              <span>Verify on Registry</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Employer & Recruiter Partnership Modal
 */
export function RecruiterModal({ isOpen, onClose }: ModalProps) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    roleInterest: "Pharmacovigilance Associate",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.company || !form.email) {
      toast.error("Please fill in the required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Enquiry received! Our enterprise partnerships team will contact you within 24 hours.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-stone-200 bg-white tone-light p-6 sm:p-8 shadow-2xl my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close Partner Form"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-sans text-2xl font-bold text-[#0B1325]">
              Partnership Request Received
            </h3>
            <p className="text-sm text-stone-600 max-w-sm mx-auto">
              Thank you, {form.name}. Our talent intelligence lead will reach out to schedule an executive walkthrough of the ACRI candidate database.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-[#0B1325] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-800 mb-1">
                <span>TALENT PARTNERSHIP DESK</span>
              </div>
              <h3 className="font-sans text-2xl font-extrabold text-[#0B1325]">
                Hire ACRI-Certified Talent
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Access verified Pharmacovigilance, CDM, and Clinical Data candidates evaluated on real case processing.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Dr. Rajesh Kumar"
                  className="w-full rounded-lg border border-stone-300 bg-white tone-light px-3 py-2 text-xs text-stone-900 focus:border-[#0B1325] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Organization / Company *
                </label>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Cognizant / Novartis / IQVIA"
                  className="w-full rounded-lg border border-stone-300 bg-white tone-light px-3 py-2 text-xs text-stone-900 focus:border-[#0B1325] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="rajesh@company.com"
                    className="w-full rounded-lg border border-stone-300 bg-white tone-light px-3 py-2 text-xs text-stone-900 focus:border-[#0B1325] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border border-stone-300 bg-white tone-light px-3 py-2 text-xs text-stone-900 focus:border-[#0B1325] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Primary Role Requirement
                </label>
                <select
                  value={form.roleInterest}
                  onChange={(e) => setForm({ ...form, roleInterest: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 bg-white tone-light px-3 py-2 text-xs text-stone-900 focus:border-[#0B1325] focus:outline-none"
                >
                  <option value="Pharmacovigilance Associate">Pharmacovigilance Associate</option>
                  <option value="Clinical Data Management">Clinical Data Management</option>
                  <option value="Medical Coding (AAPC/AHIMA)">Medical Coding (AAPC/AHIMA)</option>
                  <option value="Regulatory Affairs Associate">Regulatory Affairs Associate</option>
                  <option value="Multiple Healthcare Roles">Multiple Healthcare Roles</option>
                </select>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full rounded-xl bg-[#0B1325] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342] transition-colors"
              >
                Submit Hiring Enquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/**
 * 4. Video Explainer Modal
 */
export function VideoModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-stone-200 bg-white tone-light p-6 shadow-2xl my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close Video"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 block">
              1-Minute Video Explainer
            </span>
            <h3 className="font-sans text-xl font-bold text-[#0B1325]">
              How the ACRI Pharmacovigilance Assessment Works
            </h3>
          </div>

          {/* Video Mock/Player */}
          <div className="relative aspect-video rounded-2xl bg-[#0B1325] flex flex-col items-center justify-center text-white overflow-hidden p-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white mb-3 shadow-lg">
              <Play className="h-8 w-8 fill-white ml-1" />
            </div>
            <h4 className="font-sans text-lg font-bold">
              Arzon Clinical Readiness Index (ACRI)
            </h4>
            <p className="text-xs text-stone-300 max-w-sm mt-1">
              Watch how our 40-question calibrated scenario test evaluates real ICSR workflow competencies for Pharmacovigilance roles.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
