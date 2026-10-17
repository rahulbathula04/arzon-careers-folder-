import { Compass, CheckCircle2, QrCode, ShieldCheck } from "lucide-react";
import taskImg from "@/assets/proof/task-partnership.jpg";
import recognitionsImg from "@/assets/recognitions.webp";

export function MasterclassWhyArzon() {
  return (
    <section id="why-arzon" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white tone-light card-light">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#BFDBFE] bg-[#EEF6FF]/95 text-[#1D4ED8] text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>05 · Why Arzon Careers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-[-0.03em] leading-tight mb-3">
            Career decisions deserve{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              verified institutional proof.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-xl mx-auto">
            Arzon Careers helps healthcare graduates navigate clinical data careers with real operational training and verified state recognitions.
          </p>
        </div>

        {/* 3 Visual Pillars Grid with Homepage Accents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12">
          
          {/* Pillar 1: Learners Guided */}
          <div className="relative rounded-3xl bg-slate-50/70 border border-[#E2E8F0] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#2563EB]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between tone-light card-light group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA]" />
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src="/images/pv-career-graduate.jpg"
                alt="Healthcare student career transition"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="font-mono text-2xl font-bold text-white">
                  12,000+
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#081F38] mb-1 group-hover:text-[#2563EB] transition-colors">
                  Pharmacy Learners Guided
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Students and graduates guided through structured clinical data transitions across India.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] font-mono text-[#2563EB] font-semibold">
                Documented Career Reach
              </div>
            </div>
          </div>

          {/* Pillar 2: TASK Government Partnership */}
          <div className="relative rounded-3xl bg-slate-50/70 border border-[#E2E8F0] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#0284C7]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between tone-light card-light group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0284C7] to-[#38BDF8]" />
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={taskImg}
                alt="Telangana Academy for Skill and Knowledge (TASK) partnership"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                  TASK Partnership
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#081F38] mb-1 group-hover:text-[#0284C7] transition-colors">
                  State Skilling Relationship
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Telangana Academy for Skill and Knowledge official institutional skill development framework.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] font-mono text-[#0284C7] font-semibold">
                State Institutional Verification
              </div>
            </div>
          </div>

          {/* Pillar 3: ISO 9001:2015 Certification */}
          <div className="relative rounded-3xl bg-slate-50/70 border border-[#E2E8F0] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#10B981]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between tone-light card-light group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#10B981] to-[#34D399]" />
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 flex items-center justify-center p-4">
              <img
                src={recognitionsImg}
                alt="ISO 9001:2015 and Government Recognitions"
                className="max-h-full max-w-full object-contain filter contrast-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                <span className="font-mono text-sm font-bold text-white">
                  ISO 9001:2015
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#081F38] mb-1 group-hover:text-[#059669] transition-colors">
                  Certified Quality Standard
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Certified quality management system for educational content delivery &amp; candidate guidance.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] font-mono text-[#059669] font-semibold">
                Global Quality Assurance
              </div>
            </div>
          </div>

        </div>

        {/* Visual Certificate of Participation Showcase — Apple Specimen Frame */}
        <div className="rounded-3xl border border-slate-200/90 bg-slate-50/50 p-6 sm:p-9 shadow-sm tone-light card-light">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center">
            
            {/* Left: Real Arzon Participation Certificate Preview */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden border border-slate-200 bg-white tone-light card-light shadow-md group">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                <img
                  src="/images/arzon-masterclass-certificate.jpg"
                  alt="Official Arzon Global Certificate of Participation awarded to Divya Dharshini V, signed by Mohamed Kumail Abbas"
                  className="w-full h-full object-contain p-1.5 group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="bg-slate-50 px-3.5 py-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <QrCode className="w-3.5 h-3.5 text-blue-600" />
                  QR-Verifiable at arzoncareers.in
                </span>
                <span className="font-medium text-slate-500">Executive Division</span>
              </div>
            </div>

            {/* Right: Certificate Value Proposition */}
            <div className="md:col-span-7 space-y-3.5 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-[11px] font-mono font-bold tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>OFFICIAL ARZON GLOBAL CREDENTIAL</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#081F38] tracking-tight">
                Official Certificate of Participation
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Every attendee who completes the live masterclass receives an individual QR-verifiable credential signed directly by mentor <strong className="text-[#081F38] font-semibold">Mohamed Kumail Abbas</strong>, certifying hands-on exposure to:
              </p>

              {/* Verified Competencies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono font-medium text-slate-700">
                <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] tone-light card-light flex items-center gap-2 shadow-2xs hover:border-[#10B981]/40 transition-colors">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>ICH-E2D Case Triage</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] tone-light card-light flex items-center gap-2 shadow-2xs hover:border-[#10B981]/40 transition-colors">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>Clinical Terminology Coding</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] tone-light card-light flex items-center gap-2 shadow-2xs hover:border-[#10B981]/40 transition-colors">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>Safety Database Workflow</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] tone-light card-light flex items-center gap-2 shadow-2xs hover:border-[#10B981]/40 transition-colors">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>21 CFR Part 11 Audit Principles</span>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-[#EEF6FF] text-[#1D4ED8] border border-[#BFDBFE] font-semibold">
                  Signed by Mentor Mohamed Kumail Abbas
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#EEF6FF] text-[#1D4ED8] border border-[#BFDBFE] font-semibold">
                  ISO 9001:2015 Educational Standard
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
