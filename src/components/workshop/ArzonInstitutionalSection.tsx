import { Building2, GraduationCap, ShieldCheck, FileCheck2, Phone, Sparkles, Download, ArrowRight } from "lucide-react";
import { WorkshopBrochureDownloadButton } from "@/components/workshop/WorkshopBrochureDownloadButton";

export function ArzonInstitutionalSection() {
  const whatsappLiaisonUrl =
    "https://wa.me/919121283638?text=Hi%20Arzon%20Team%2C%20I%20am%20a%20Placement%20Officer%20%2F%20Principal%20interested%20in%20arranging%20the%20Healthcare%20Career%20Masterclass%20for%20our%20students.";

  return (
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--color-border-warm)] bg-white tone-light text-left">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#1B3F8B]" />
            <span>FOR TPOS, PRINCIPALS &amp; COLLEGE CHAIRMEN</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-950 tracking-tight leading-tight">
            Bring This Clinical Masterclass to Your Campus.
          </h2>

          <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
            Bridge the gap between your academic syllabus and global CRO / MNC recruitment tests. Conducted under Arzon's Educational Access Charter — <strong>100% free of commercial cost</strong> to your university, department, or students.
          </p>
        </div>

        {/* 4 Pillar Institutional Deliverables */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#1B3F8B]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-sm">
              Zero Commercial Cost
            </h3>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              No hidden fees, paid upselling, or sales pitches. A pure technical masterclass in ICH-E2D adverse event case triage.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-sm">
              Student Certifications
            </h3>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              Every verified student attendee receives an official Arzon Workshop Credential with online verification for their CV.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-sm">
              TPO Readiness Audit
            </h3>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              Your placement cell receives an aggregated diagnostic audit assessing student strengths across core hiring rubrics.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-sm">
              Dedicated Seat Quota
            </h3>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              Lock 50 to 200 priority seats for your college batch, or schedule an exclusive webinar aligned with your college timetable.
            </p>
          </div>
        </div>

        {/* Action Banner: Download Brochure & Contact Academic Partnerships */}
        <div className="mt-8 rounded-2xl sm:rounded-3xl border-2 border-[#1B3F8B] bg-gradient-to-br from-blue-50/70 via-white to-stone-50 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider block">
              OFFICIAL INSTITUTIONAL PROSPECTUS · 2026 EDITION
            </span>
            <h3 className="font-serif font-bold text-lg sm:text-2xl text-stone-950">
              Download the Complete Masterclass &amp; Webinar Brochure
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Comprehensive 5-page dossier including full technical syllabus, case study files, faculty background, salary benchmarks, and institutional onboarding guidelines for placement officers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <WorkshopBrochureDownloadButton
              variant="outline"
              label="Download Brochure (PDF) ↓"
              showSubtext={false}
              className="w-full sm:w-auto"
            />

            <a
              href={whatsappLiaisonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-emerald-500 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer text-center"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Contact TPO Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
