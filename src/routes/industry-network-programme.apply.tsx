import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Printer,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import {
  submitIndustryNetworkAppFn,
  type IndustryNetworkApplicationRecord,
} from "@/lib/industryNetwork.functions";
import { SITE, absUrl, COUNSELLOR_PHONE } from "@/components/landing/constants";

export const Route = createFileRoute("/industry-network-programme/apply")({
  head: () => ({
    meta: [
      { title: "Apply · Arzon Global Industry Network Programme" },
      {
        name: "description",
        content:
          "Submit your application to become an Industry Network Lead for your college. Gain professional training, mentorship, and recruiter connections.",
      },
      { property: "og:title", content: "Apply · Arzon Global Industry Network Programme" },
      {
        property: "og:description",
        content:
          "Submit your application to become an Industry Network Lead for your college.",
      },
      { property: "og:image", content: absUrl("/images/industry-network/hero-students.webp") },
    ],
    links: [{ rel: "canonical", href: absUrl("/industry-network-programme/apply") }],
  }),
  component: IndustryNetworkApplyPage,
});

const COURSE_OPTIONS = [
  "B.Pharm (Bachelor of Pharmacy)",
  "M.Pharm (Master of Pharmacy)",
  "Pharm.D (Doctor of Pharmacy)",
  "D.Pharm (Diploma in Pharmacy)",
  "Biotechnology (B.Sc / B.Tech / M.Sc)",
  "Life Sciences (Microbiology, Biochemistry, Genetics)",
  "Other Healthcare Course",
  "Engineering",
  "Other",
] as const;

const ACADEMIC_YEAR_OPTIONS = [
  "First Year",
  "Second Year",
  "Third Year",
  "Final Year",
] as const;

export function IndustryNetworkApplyPage() {
  const submitApp = useServerFn(submitIndustryNetworkAppFn);

  // 4 Essential Fields Only - Frictionless
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [collegeName, setCollegeName] = useState("");

  // UI States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] =
    useState<IndustryNetworkApplicationRecord | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full legal name";
    }

    const cleanMobile = mobileNumber.replace(/[\s\-\+]/g, "").replace(/^91/, "");
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      errs.mobileNumber = "Enter a valid 10-digit Indian WhatsApp mobile number (starting with 6-9)";
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!collegeName.trim() || collegeName.trim().length < 2) {
      errs.collegeName = "Please enter your college / university name";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all 4 fields correctly.");
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanMobile = mobileNumber.replace(/[\s\-\+]/g, "").replace(/^91/, "");
      const res = await submitApp({
        data: {
          fullName: fullName.trim(),
          mobileNumber: cleanMobile,
          email: email.trim(),
          collegeName: collegeName.trim(),
        },
      });

      if (res.isDuplicate) {
        toast.info(res.message);
      } else {
        toast.success(res.message || "Application submitted successfully!");
      }
      setSubmittedRecord(res.record);
    } catch (err: any) {
      console.error("[ApplyPage] Submission error:", err);
      toast.error(err.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#081F38] font-sans selection:bg-[#2563EB]/20 selection:text-[#081F38]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E4EAF2] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link
          to="/industry-network"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 hover:text-[#081F38] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Programme Overview</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#EEF6FF] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
            Official Application Portal
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        {submittedRecord ? (
          /* ─── SUCCESS CONFIRMATION SCREEN ────────────────────────────── */
          <div className="rounded-3xl border border-[#BFDBFE] bg-white tone-light card-light p-6 sm:p-12 shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-400">
            <div className="text-center space-y-3">
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center ring-8 ring-emerald-50/50">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-mono text-xs font-bold uppercase tracking-wider">
                ● APPLICATION RECORDED · {submittedRecord.status.toUpperCase()}
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#081F38]">
                Application Successfully Submitted!
              </h1>
              <p className="text-sm text-[#475569] max-w-lg mx-auto leading-relaxed">
                Thank you for applying to represent your institution as an{" "}
                <strong>Industry Network Lead</strong> at Arzon Global.
              </p>
            </div>

            {/* Application Dossier Card */}
            <div className="rounded-2xl border border-slate-200 bg-[#FAF8F5] p-6 space-y-5">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-slate-200">
                {submittedRecord.photoUrl ? (
                  <img
                    src={submittedRecord.photoUrl}
                    alt={submittedRecord.fullName}
                    className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white shadow-sm shrink-0"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                    <User className="h-8 w-8" />
                  </div>
                )}
                <div className="space-y-1 text-center sm:text-left flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-lg font-bold text-[#081F38]">
                      {submittedRecord.fullName}
                    </h2>
                    <span className="font-mono text-xs font-bold text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded-md border border-[#BFDBFE]">
                      {submittedRecord.applicationNumber}
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] truncate">
                    {submittedRecord.collegeName} · {submittedRecord.collegeCity}
                  </p>
                  <p className="font-mono text-[11px] text-slate-500">
                    {submittedRecord.course} ({submittedRecord.academicYear})
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] uppercase text-slate-400 block font-bold">
                    Email Address
                  </span>
                  <span className="font-medium text-slate-700">{submittedRecord.email}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-slate-400 block font-bold">
                    WhatsApp Number
                  </span>
                  <span className="font-medium text-slate-700">+91 {submittedRecord.mobileNumber}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-mono text-[10px] uppercase text-slate-400 block font-bold">
                    Submitted At
                  </span>
                  <span className="font-mono text-[11px] text-slate-600">
                    {new Date(submittedRecord.submittedAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps Timeline */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                WHAT HAPPENS NEXT?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    step: "1. Review",
                    desc: "Our student leadership panel screens eligible candidates per college.",
                    status: "Active Now",
                  },
                  {
                    step: "2. Interaction",
                    desc: "Shortlisted candidates will receive a personal WhatsApp notification.",
                    status: "Upcoming",
                  },
                  {
                    step: "3. Appointment",
                    desc: "Formal Appointment Letters are issued directly to the selected 8 leads.",
                    status: "Final Stage",
                  },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white tone-light p-3.5 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#081F38]">{s.step}</p>
                      <span className="font-mono text-[9px] font-bold text-[#2563EB] bg-[#EEF6FF] px-1.5 py-0.5 rounded">
                        {s.status}
                      </span>
                    </div>
                    <p className="text-[#64748B] text-[11px] leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
              <a
                href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(
                  `Hi Arzon Campus Directorate! I just submitted my Industry Network Lead application (${submittedRecord.applicationNumber}) for ${submittedRecord.collegeName}. My name is ${submittedRecord.fullName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-11 px-6 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat with Coordinator</span>
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto h-11 px-5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer tone-light"
              >
                <Printer className="h-3.5 w-3.5 text-slate-600" />
                <span>Print Confirmation</span>
              </button>
              <Link
                to="/industry-network"
                className="w-full sm:w-auto h-11 px-6 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Return to Overview</span>
                <ArrowRight className="h-3.5 w-3.5 text-sky-400" />
              </Link>
            </div>
          </div>
        ) : (
          /* ─── MAIN APPLICATION FORM (4 FIELDS ONLY) ─────────────────── */
          <div className="space-y-6">
            {/* Header Title */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1D4ED8]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                <span>APPOINTMENT COHORT 2026 · QUICK APPLY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#081F38] tracking-tight">
                Apply for Industry Network Lead
              </h1>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
                Represent your campus at Arzon Global. Earn an official Appointment Offer Letter, 6-Month Experience Certificate, and Executive Director LOR. Takes 30 seconds.
              </p>
            </div>

            {/* Frictionless 4-Field Form Card */}
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-10 shadow-lg space-y-6"
              noValidate
            >
              <div className="space-y-4">
                {/* Field 1: Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#081F38] mb-1.5">
                    Full Legal Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                    }}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full h-11 px-3.5 rounded-xl border ${
                      errors.fullName
                        ? "border-rose-400 bg-rose-50/20"
                        : "border-[#CBD5E1] bg-white tone-light"
                    } text-sm text-[#081F38] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* Field 2: Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-[#081F38] mb-1.5">
                    WhatsApp Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 font-mono text-xs text-slate-500 font-bold select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value.replace(/\D/g, ""));
                        if (errors.mobileNumber)
                          setErrors((prev) => ({ ...prev, mobileNumber: "" }));
                      }}
                      placeholder="98765 43210"
                      className={`w-full h-11 pl-12 pr-3.5 rounded-xl border ${
                        errors.mobileNumber
                          ? "border-rose-400 bg-rose-50/20"
                          : "border-[#CBD5E1] bg-white tone-light"
                      } text-sm font-mono text-[#081F38] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all`}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>

                {/* Field 3: Email */}
                <div>
                  <label className="block text-xs font-bold text-[#081F38] mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder="e.g. rahul@example.com"
                    className={`w-full h-11 px-3.5 rounded-xl border ${
                      errors.email
                        ? "border-rose-400 bg-rose-50/20"
                        : "border-[#CBD5E1] bg-white tone-light"
                    } text-sm text-[#081F38] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Field 4: College Name */}
                <div>
                  <label className="block text-xs font-bold text-[#081F38] mb-1.5">
                    College / University Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={collegeName}
                    onChange={(e) => {
                      setCollegeName(e.target.value);
                      if (errors.collegeName)
                        setErrors((prev) => ({ ...prev, collegeName: "" }));
                    }}
                    placeholder="e.g. Manipal College of Pharmaceutical Sciences"
                    className={`w-full h-11 px-3.5 rounded-xl border ${
                      errors.collegeName
                        ? "border-rose-400 bg-rose-50/20"
                        : "border-[#CBD5E1] bg-white tone-light"
                    } text-sm text-[#081F38] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all`}
                  />
                  {errors.collegeName && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium">
                      {errors.collegeName}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-70 text-white font-bold text-sm shadow-md shadow-blue-600/15 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 motion-safe:animate-spin text-white" />
                      <span>Submitting Application…</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] font-sans text-slate-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>100% Free · No registration fee · 8 Selected Leads Per College</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
