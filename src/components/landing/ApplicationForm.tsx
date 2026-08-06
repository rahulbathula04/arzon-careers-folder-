import React, { useState } from "react";
import { MessageCircle, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { COUNSELLOR_PHONE, COUNSELLOR_PHONE_DISPLAY } from "./constants";
import { trackEvent } from "@/lib/analytics";

/**
 * Section Nine — Cohort Status and Final Application Form
 * Design: White background (#FFFFFF). Clean 4-field application form,
 * WhatsApp callback fallback option, and clear status confirmation.
 */
export function ApplicationForm({ isLocked = false }: { isLocked?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    degree: "",
    track: "HSBC AI/ML Cohort",
    source: "Google / Search",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setLoading(true);
    trackEvent("application_form_submit", { track: formData.track });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (isLocked) {
    return (
      <section
        id="apply"
        aria-labelledby="apply-heading"
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white text-[#1A1A1A] border-b border-stone-200"
      >
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3F8B]">
            AUGUST 2026 COHORT · LOCKED
          </p>
          <h2 id="apply-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            This cohort is full. 30 July 2026.
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-xl mx-auto">
            The August 2026 HSBC cohort closed at 60 seats as scheduled. Capped at 60 to match HSBC's structured
            intake process. The next cohort date will be announced here. Join the waitlist to be notified first.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3 pt-4">
            <input
              type="text"
              required
              placeholder="Your Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-11 px-4 text-sm rounded-xl border border-stone-300 bg-[#F7F5F0] text-[#1A1A1A] focus:outline-none focus:border-[#1B3F8B]"
            />
            <input
              type="tel"
              required
              placeholder="WhatsApp Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full h-11 px-4 text-sm rounded-xl border border-stone-300 bg-[#F7F5F0] text-[#1A1A1A] focus:outline-none focus:border-[#1B3F8B]"
            />
            <button
              type="submit"
              className="w-full h-12 text-sm font-bold text-white bg-[#1B3F8B] hover:bg-[#153270] rounded-xl transition-all"
            >
              Join the Waitlist
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section
      id="apply"
      aria-labelledby="apply-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3F8B]">
            AUGUST 2026 COHORT · APPLICATIONS OPEN
          </p>
          <h2
            id="apply-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            60 seats. The August 2026 batch starts 30 August.{" "}
            <span className="italic text-[#1B3F8B]">Apply now. A counsellor calls you back the same day.</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
            You are not paying to apply. The application is free. After your application, a counsellor calls you
            to confirm your eligibility and answer any questions. If you are accepted, you receive a formal seat
            confirmation before any payment is required.
          </p>
        </div>

        {/* Success Confirmation Card */}
        {submitted ? (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center space-y-3 max-w-xl mx-auto">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-emerald-950">Application Received</h3>
            <p className="text-sm text-emerald-800 leading-relaxed">
              Thank you. A counsellor will call you within 4 working hours. If you applied after 6pm IST, we call you the next morning by 10am. No automated calls. A real person.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Application Form */}
            <div className="lg:col-span-8 rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 sm:p-8 space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                Direct Application Form
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1B3F8B]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1B3F8B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Degree &amp; Graduation Year *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. B.Tech 2026 or B.Pharm 2025"
                      value={formData.degree}
                      onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1B3F8B]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Which Track *
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1B3F8B]"
                    >
                      <option value="HSBC AI/ML Cohort">HSBC AI/ML Engineer Cohort</option>
                      <option value="JPMorgan Track">JPMorgan Chase SWE Track</option>
                      <option value="Clinical Healthcare Track">Clinical Healthcare / Pharma Track</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    How did you hear about Arzon?
                  </label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1B3F8B]"
                  >
                    <option value="Google / Search">Google / Search</option>
                    <option value="Instagram / Social">Instagram / Social</option>
                    <option value="Friend / Referral">Friend / Referral</option>
                    <option value="College TPO">College TPO / Placement Cell</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-13 text-base font-bold text-white bg-[#1B3F8B] hover:bg-[#153270] rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 motion-safe:animate-spin text-white" />
                  ) : (
                    <>
                      <span>Apply Now — I am interested</span>
                      <ArrowRight className="h-4 w-4 text-white" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right: WhatsApp Fallback & Direct Contact */}
            <div className="lg:col-span-4 rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 space-y-5">
              <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Prefer WhatsApp?
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                You can chat directly with our admissions desk to ask questions about eligibility, batch timing, or syllabus details.
              </p>

              <a
                href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent("Hi Arzon Admissions — I want to inquire about the August 2026 Cohort.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_cta_click", { surface: "application_form" })}
                className="w-full h-11 px-4 flex items-center justify-center gap-2 text-xs font-bold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                <span>Speak with a Counsellor</span>
              </a>

              <div className="pt-3 border-t border-stone-300 text-[11px] font-mono text-stone-600 space-y-1">
                <p><strong>Admissions Line:</strong> {COUNSELLOR_PHONE_DISPLAY}</p>
                <p><strong>Hours:</strong> Mon–Sat, 9:00 AM – 7:00 PM IST</p>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
