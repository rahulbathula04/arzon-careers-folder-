import { Users, Award, ShieldCheck, Compass, CheckCircle2, QrCode } from "lucide-react";
import taskImg from "@/assets/proof/task-partnership.jpg";
import recognitionsImg from "@/assets/recognitions.webp";

export function MasterclassWhyArzon() {
  return (
    <section id="why-arzon" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white tone-light card-light">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/90 border border-blue-200/70 text-blue-700 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>05 · Why Arzon Careers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-[-0.03em] leading-tight mb-3">
            Career decisions deserve verified institutional proof.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-xl mx-auto">
            Arzon Careers helps healthcare graduates navigate clinical data careers with real operational training and verified state recognitions.
          </p>
        </div>

        {/* 3 Visual Pillars Grid with Real Institutional Evidence Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12">
          
          {/* Pillar 1: Learners Guided */}
          <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col justify-between tone-light card-light group">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src="/images/pv-career-graduate.jpg"
                alt="Healthcare student career transition"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081F38]/85 via-transparent to-transparent flex items-end p-4">
                <span className="font-mono text-2xl sm:text-3xl font-black text-white">
                  12,000+
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#081F38] mb-1.5">
                  Pharmacy Learners Guided
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  Students and graduates guided through structured clinical data transitions across India.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-mono text-blue-700 font-semibold">
                Documented Career Reach
              </div>
            </div>
          </div>

          {/* Pillar 2: TASK Government Partnership */}
          <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col justify-between tone-light card-light group">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={taskImg}
                alt="Telangana Academy for Skill and Knowledge (TASK) partnership"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081F38]/85 via-transparent to-transparent flex items-end p-4">
                <span className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  TASK Partnership
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#081F38] mb-1.5">
                  State Skilling Relationship
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  Telangana Academy for Skill and Knowledge official institutional skill development framework.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-mono text-blue-700 font-semibold">
                State Institutional Verification
              </div>
            </div>
          </div>

          {/* Pillar 3: ISO 9001:2015 Certification */}
          <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col justify-between tone-light card-light group">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 flex items-center justify-center p-4">
              <img
                src={recognitionsImg}
                alt="ISO 9001:2015 and Government Recognitions"
                className="max-h-full max-w-full object-contain filter contrast-125"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081F38]/85 via-transparent to-transparent flex items-end p-4">
                <span className="font-mono text-sm sm:text-base font-bold text-white">
                  ISO 9001:2015
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#081F38] mb-1.5">
                  Certified Quality Standard
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  Certified quality management system for educational content delivery &amp; candidate guidance.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-mono text-blue-700 font-semibold">
                Global Quality Assurance
              </div>
            </div>
          </div>

        </div>

        {/* Visual Certificate of Participation Showcase — Apple Specimen Frame */}
        <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6 sm:p-9 shadow-sm tone-light card-light">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center">
            
            {/* Left: Real Arzon Participation Certificate Preview */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg bg-white tone-light card-light group">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                <img
                  src="/images/arzon-masterclass-certificate.jpg"
                  alt="Official Arzon Global Certificate of Participation awarded to Divya Dharshini V, signed by Mohamed Kumail Abbas"
                  className="w-full h-full object-contain p-1.5 group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="bg-slate-100/90 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-700">
                <span className="flex items-center gap-1.5 font-bold text-blue-700">
                  <QrCode className="w-3.5 h-3.5" />
                  QR-Verifiable at arzoncareers.in
                </span>
                <span className="font-semibold text-slate-600">Executive Division</span>
              </div>
            </div>

            {/* Right: Certificate Value Proposition */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>OFFICIAL ARZON GLOBAL CREDENTIAL</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight">
                Official Certificate of Participation
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Every attendee who completes the live 90-minute masterclass receives an individual QR-verifiable credential signed directly by mentor <strong className="text-[#081F38]">Mohamed Kumail Abbas</strong>, certifying hands-on exposure to:
              </p>

              {/* Verified Competencies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono font-medium text-slate-700">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 tone-light flex items-center gap-2 shadow-2xs">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>ICH-E2D Case Triage</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 tone-light flex items-center gap-2 shadow-2xs">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Clinical Terminology Coding</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 tone-light flex items-center gap-2 shadow-2xs">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Safety Database Workflow</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 tone-light flex items-center gap-2 shadow-2xs">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>21 CFR Part 11 Audit Principles</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-500">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 font-semibold">
                  Signed by Mentor Mohamed Kumail Abbas
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium">
                  Addable to LinkedIn Licenses &amp; Certifications
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
