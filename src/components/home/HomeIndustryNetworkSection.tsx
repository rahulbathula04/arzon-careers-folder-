import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function HomeIndustryNetworkSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="industry-network-programme"
      className="py-16 sm:py-24 border-b border-[#E4EAF2] bg-[#FAF8F5] tone-light card-light relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(37,99,235,0.06),rgba(255,255,255,0))] pointer-events-none"
        aria-hidden="true"
      />

      <div className="ap-shell relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          {/* Tagline */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-[#EEF6FF] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#1D4ED8] shadow-2xs tone-light card-light">
            <Sparkles className="h-3 w-3 text-[#2563EB]" />
            <span>CAMPUS LEADERSHIP · ARZON GLOBAL INDUSTRY NETWORK</span>
          </div>

          <h2 className="text-2xl min-[375px]:text-3xl sm:text-4xl lg:text-[44px] font-sans font-bold text-[#081F38] tracking-tight leading-tight">
            Build Your Industry Connections{" "}
            <span className="font-serif italic font-normal text-[#2563EB]">
              Before You Graduate.
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#475569] leading-relaxed max-w-2xl mx-auto">
            Become an Industry Network Lead at Arzon Global and get access to professional training, industry mentorship, networking and career opportunities.
          </p>

          <div className="inline-flex items-center gap-2 pt-1 text-[11px] font-mono font-semibold text-[#64748B]">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span>Applications Open · Limited Selections (8 Leads Per College)</span>
          </div>
        </div>

        {/* Apple-Grade Visual Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10 max-w-6xl mx-auto">
          {/* Left Column: 4 Feature Highlights */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: BookOpen,
                title: "Complimentary Training",
                desc: "100% complimentary domain training in Pharmacovigilance, CDM, or Medical Writing.",
                badge: "100% SPONSORED",
                meta: "22+ Specializations",
              },
              {
                icon: Users,
                title: "8 Leads Per College",
                desc: "Balanced representation: 2 each from 1st, 2nd, 3rd & Final Year batches.",
                badge: "EQUITABLE COHORT",
                meta: "Select Campus Guild",
              },
              {
                icon: Compass,
                title: "Mentorship & GCC Network",
                desc: "1-on-1 guidance from operational directors across top Tier-1 CROs and GCCs.",
                badge: "DIRECT ACCESS",
                meta: "Senior Directors",
              },
              {
                icon: Award,
                title: "Official Recognition",
                desc: "Embossed Appointment Letter, 6-Month Experience Certificate & National Awards.",
                badge: "VERIFIED MERIT",
                meta: "Digital Validation",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="rounded-3xl border border-[#E4EAF2] bg-white p-5 space-y-3 shadow-xs hover:border-[#2563EB]/40 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between tone-light card-light"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="h-9 w-9 rounded-xl bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] ring-1 ring-[#BFDBFE]">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#1557D6] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-sans text-base font-bold text-[#081F38]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-[#2563EB]">
                    <span className="flex items-center gap-1 font-bold">
                      <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
                      <span>{item.meta}</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: AI Visual Showcase Card */}
          <div className="lg:col-span-5 rounded-3xl border border-[#E4EAF2] bg-white overflow-hidden shadow-sm flex flex-col justify-between tone-light card-light group">
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  CAMPUS SELECTION 2026
                </span>
                <span className="font-mono text-xs font-bold text-[#1557D6]">
                  8 Leads / College
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#081F38] leading-tight">
                Healthcare Career Intelligence in Action
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Join a nationwide leadership guild bridging universities with real biopharma operations, clinical data analytics, and regulatory science.
              </p>
            </div>

            <div className="relative h-48 sm:h-56 overflow-hidden border-t border-slate-200 bg-slate-100">
              <img
                src="/images/industry-network/feature-training.webp"
                alt="Healthcare Clinical Lab and Analytics Training"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width={500}
                height={280}
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 border border-slate-200/80 shadow-md flex items-center justify-between tone-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span className="text-[11px] font-mono font-bold text-[#081F38]">
                    100% Complimentary Domain Training
                  </span>
                </div>
                <Link
                  to="/industry-network"
                  className="text-[10px] font-mono font-bold text-[#1557D6] hover:underline"
                >
                  Details →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-[#BFDBFE] bg-[#EEF6FF]/95 backdrop-blur-xs p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm tone-light card-light">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              REPRESENT YOUR INSTITUTION
            </p>
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#081F38]">
              Ready to represent your college and build your career?
            </h3>
            <p className="text-xs text-[#475569]">
              Open to B.Pharm, M.Pharm, Pharm.D, D.Pharm, Biotech, Life Sciences &amp; Allied disciplines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/industry-network-programme/apply"
              className="w-full sm:w-auto h-11 px-6 rounded-full bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Apply Now</span>
              <ArrowRight className="h-3.5 w-3.5 text-sky-400" />
            </Link>
            <Link
              to="/industry-network"
              className="w-full sm:w-auto h-11 px-5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center tone-light card-light"
            >
              <span>Explore Overview</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
