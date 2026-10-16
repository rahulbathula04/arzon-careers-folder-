import { Users, Award, ShieldCheck, Compass, CheckCircle2, QrCode } from "lucide-react";
import taskImg from "@/assets/proof/task-partnership.jpg";
import recognitionsImg from "@/assets/recognitions.webp";

export function MasterclassWhyArzon() {
  return (
    <section id="why-arzon" className="py-14 sm:py-20 border-b border-slate-200/80 bg-white tone-light card-light">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5">
            <Compass className="w-3.5 h-3.5" />
            <span>05 · Why Arzon Careers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#081F38] tracking-tight leading-snug mb-2">
            Career decisions deserve verified institutional proof.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            Arzon Careers helps healthcare graduates navigate clinical data careers with real operational training and verified state recognitions.
          </p>
        </div>

        {/* 3 Visual Pillars Grid with Real Institutional Evidence Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          
          {/* Pillar 1: Learners Guided */}
          <div className="rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all overflow-hidden flex flex-col justify-between tone-light card-light group">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src="/images/pv-career-graduate.jpg"
                alt="Healthcare student career transition"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081F38]/80 via-transparent to-transparent flex items-end p-3">
                <span className="font-mono text-xl sm:text-2xl font-black text-white">
                  12,000+
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#081F38] mb-1">
                  Pharmacy Learners Guided
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Students and graduates guided through structured clinical data transitions across India.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[10.5px] font-mono text-blue-700 font-semibold">
                Documented Career Reach
              </div>
            </div>
          </div>

          {/* Pillar 2: TASK Government Partnership */}
          <div className="rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all overflow-hidden flex flex-col justify-between tone-light card-light group">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={taskImg}
                alt="Telangana Academy for Skill and Knowledge (TASK) partnership"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081F38]/80 via-transparent to-transparent flex items-end p-3">
                <span className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  TASK Partnership
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#081F38] mb-1">
                  State Skilling Relationship
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Telangana Academy for Skill and Knowledge official institutional skill development framework.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[10.5px] font-mono text-blue-700 font-semibold">
                State Institutional Verification
              </div>
            </div>
          </div>

          {/* Pillar 3: ISO 9001:2015 Certification */}
          <div className="rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all overflow-hidden flex flex-col justify-between tone-light card-light group">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 flex items-center justify-center p-4">
              <img
                src={recognitionsImg}
                alt="ISO 9001:2015 and Government Recognitions"
                className="max-h-full max-w-full object-contain filter contrast-125"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081F38]/80 via-transparent to-transparent flex items-end p-3">
                <span className="font-mono text-sm sm:text-base font-bold text-white">
                  ISO 9001:2015
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#081F38] mb-1">
                  Certified Quality Standard
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Certified quality management system for educational content delivery &amp; candidate guidance.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[10.5px] font-mono text-blue-700 font-semibold">
                Global Quality Assurance
              </div>
            </div>
          </div>

        </div>

        {/* Visual Certificate of Participation Showcase */}
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 sm:p-7 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Certificate Real Image Preview */}
            <div className="md:col-span-5 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-white tone-light card-light group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="/proof/cert-internship.webp"
                  alt="Verified Arzon Certificate of Participation Preview"
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="bg-slate-100 px-3 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span className="flex items-center gap-1.5 font-bold text-blue-700">
                  <QrCode className="w-3.5 h-3.5" />
                  QR-Verifiable Credential
                </span>
                <span>ISO &amp; MSME Recognized</span>
              </div>
            </div>

            {/* Right: Certificate Value Proposition */}
            <div className="md:col-span-7 space-y-3 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/70 text-blue-800 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>INCLUDED FOR ALL LIVE ATTENDEES</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#081F38]">
                Receive a Verified Certificate of Participation
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Every attendee who participates in the live interactive masterclass receives a verified digital Certificate of Participation from Arzon Global, signed by industry faculty with online credential verification.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600">
                <span className="px-2 py-1 rounded-md bg-white border border-slate-200 tone-light">
                  ✓ Signed by Mohamed Kumail Abbas
                </span>
                <span className="px-2 py-1 rounded-md bg-white border border-slate-200 tone-light">
                  ✓ Shareable on LinkedIn Profile
                </span>
                <span className="px-2 py-1 rounded-md bg-white border border-slate-200 tone-light">
                  ✓ 100% Free
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
