import { useState } from "react";
import { GraduationCap, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type InstitutionItem = {
  name: string;
  shortName?: string;
  region: "Karnataka" | "Tamil Nadu" | "Telangana" | "Andhra Pradesh" | "North India";
  city: string;
  isNirfRanked?: boolean;
};

export const ALL_INSTITUTIONS: InstitutionItem[] = [
  // Karnataka
  { name: "JSS College of Pharmacy, Mysuru", shortName: "JSS Mysuru", region: "Karnataka", city: "Mysuru", isNirfRanked: true },
  { name: "KLE College of Pharmacy", shortName: "KLE Pharmacy", region: "Karnataka", city: "Belagavi", isNirfRanked: true },
  { name: "Sharada Vilas College of Pharmacy", shortName: "Sharada Vilas", region: "Karnataka", city: "Mysuru" },
  { name: "Cauvery College of Pharmacy", shortName: "Cauvery Pharmacy", region: "Karnataka", city: "Mysuru" },
  { name: "Manipal College of Pharmaceutical Sciences", shortName: "Manipal MCOPS", region: "Karnataka", city: "Manipal", isNirfRanked: true },

  // Tamil Nadu
  { name: "JSS College of Pharmacy, Ooty", shortName: "JSS Ooty", region: "Tamil Nadu", city: "Ooty", isNirfRanked: true },
  { name: "PSG College of Pharmacy", shortName: "PSG Pharmacy", region: "Tamil Nadu", city: "Coimbatore", isNirfRanked: true },
  { name: "SRM Institute of Science and Technology", shortName: "SRM IST", region: "Tamil Nadu", city: "Chennai", isNirfRanked: true },
  { name: "Saveetha Institute of Medical and Technical Sciences", shortName: "Saveetha SIMATS", region: "Tamil Nadu", city: "Chennai", isNirfRanked: true },
  { name: "Sathyabama Institute of Science and Technology", shortName: "Sathyabama", region: "Tamil Nadu", city: "Chennai" },
  { name: "Vels University", shortName: "VISTAS", region: "Tamil Nadu", city: "Chennai" },
  { name: "Amrita Vishwa Vidyapeetham", shortName: "Amrita University", region: "Tamil Nadu", city: "Coimbatore", isNirfRanked: true },
  { name: "Kalasalingam Academy of Research and Education", shortName: "KARE", region: "Tamil Nadu", city: "Krishnankoil" },
  { name: "Karpagam Academy of Higher Education", shortName: "KAHE", region: "Tamil Nadu", city: "Coimbatore" },
  { name: "Chettinad Academy of Research and Education", shortName: "CARE", region: "Tamil Nadu", city: "Kelambakkam" },

  // Telangana
  { name: "Malla Reddy College of Pharmacy", shortName: "MRCP", region: "Telangana", city: "Hyderabad" },
  { name: "NIPER Hyderabad", shortName: "NIPER Hyd", region: "Telangana", city: "Hyderabad", isNirfRanked: true },
  { name: "Osmania University", shortName: "OU Hyderabad", region: "Telangana", city: "Hyderabad", isNirfRanked: true },
  { name: "Jawaharlal Nehru Technological University Hyderabad", shortName: "JNTU Hyderabad", region: "Telangana", city: "Hyderabad" },
  { name: "Woxsen University", shortName: "Woxsen", region: "Telangana", city: "Hyderabad" },

  // Andhra Pradesh
  { name: "Andhra University", shortName: "AU Visakhapatnam", region: "Andhra Pradesh", city: "Visakhapatnam", isNirfRanked: true },
  { name: "Acharya Nagarjuna University", shortName: "ANU Guntur", region: "Andhra Pradesh", city: "Guntur" },
  { name: "Jawaharlal Nehru Technological University Anantapur", shortName: "JNTU Anantapur", region: "Andhra Pradesh", city: "Anantapur" },
  { name: "GITAM University", shortName: "GITAM", region: "Andhra Pradesh", city: "Visakhapatnam" },
  { name: "KL University", shortName: "KLEF Vijayawada", region: "Andhra Pradesh", city: "Vijayawada" },
  { name: "Sri Padmavati Mahila Visvavidyalayam", shortName: "SPMVV Tirupati", region: "Andhra Pradesh", city: "Tirupati" },

  // North India
  { name: "Lovely Professional University (LPU)", shortName: "LPU Punjab", region: "North India", city: "Phagwara", isNirfRanked: true },
  { name: "Chandigarh University", shortName: "CU Mohali", region: "North India", city: "Mohali", isNirfRanked: true },
];

const REGIONS = ["All India", "Karnataka", "Tamil Nadu", "Telangana", "Andhra Pradesh", "North India"] as const;
type RegionFilter = (typeof REGIONS)[number];

export function InstitutionalReachWall() {
  const [activeRegion, setActiveRegion] = useState<RegionFilter>("All India");

  const filteredInstitutions =
    activeRegion === "All India"
      ? ALL_INSTITUTIONS
      : ALL_INSTITUTIONS.filter((inst) => inst.region === activeRegion);

  // Duplicate list for infinite smooth marquee looping
  const marqueeRow1 = [...ALL_INSTITUTIONS.slice(0, 14), ...ALL_INSTITUTIONS.slice(0, 14)];
  const marqueeRow2 = [...ALL_INSTITUTIONS.slice(14), ...ALL_INSTITUTIONS.slice(14)];

  return (
    <section
      id="institutional-reach"
      className="py-16 sm:py-24 bg-[#070B14] border-y border-slate-800/80 text-slate-50 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-sky-400 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-sky-400" />
            <span>ACADEMIC PARTICIPATION & CAMPUS REACH</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-50 tracking-tight leading-tight">
            Used by Students from Leading Pharmacy and Healthcare Institutions Across India
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Students from India's leading pharmacy colleges, universities, and healthcare
            institutions are using the AI Industry Readiness Assessment to benchmark their skills and
            prepare for industry careers.
          </p>

          <div className="inline-flex items-center gap-2 pt-1 text-xs text-slate-400 font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              Assessment participation from leading colleges across India. Institutional names reflect student participant representation.
            </span>
          </div>
        </div>

        {/* Continuous Horizontal Infinite Marquee */}
        <div className="relative w-full space-y-4 pt-2">
          {/* Edge Blur Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#070B14] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#070B14] to-transparent z-10 pointer-events-none" />

          {/* Marquee Track 1 (Left to Right) */}
          <div className="group flex overflow-hidden select-none gap-4">
            <div className="flex shrink-0 motion-safe:animate-marquee items-center gap-4 group-hover:[animation-play-state:paused] duration-300">
              {marqueeRow1.map((item, idx) => (
                <div
                  key={`${item.name}-${idx}`}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-[#0F172A] px-4 py-2.5 shadow-sm transition hover:border-slate-700 hover:bg-slate-900"
                >
                  <GraduationCap className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="font-sans text-xs font-bold text-slate-100 whitespace-nowrap">
                    {item.name}
                  </span>
                  {item.isNirfRanked && (
                    <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      NIRF Ranked
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="flex shrink-0 motion-safe:animate-marquee items-center gap-4 group-hover:[animation-play-state:paused] duration-300"
            >
              {marqueeRow1.map((item, idx) => (
                <div
                  key={`dup1-${item.name}-${idx}`}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-[#0F172A] px-4 py-2.5 shadow-sm transition hover:border-slate-700 hover:bg-slate-900"
                >
                  <GraduationCap className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="font-sans text-xs font-bold text-slate-100 whitespace-nowrap">
                    {item.name}
                  </span>
                  {item.isNirfRanked && (
                    <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      NIRF Ranked
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Track 2 (Right to Left) */}
          <div className="group flex overflow-hidden select-none gap-4">
            <div className="flex shrink-0 motion-safe:animate-marquee-reverse items-center gap-4 group-hover:[animation-play-state:paused] duration-300">
              {marqueeRow2.map((item, idx) => (
                <div
                  key={`${item.name}-${idx}`}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-[#0F172A] px-4 py-2.5 shadow-sm transition hover:border-slate-700 hover:bg-slate-900"
                >
                  <GraduationCap className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="font-sans text-xs font-bold text-slate-100 whitespace-nowrap">
                    {item.name}
                  </span>
                  {item.isNirfRanked && (
                    <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      NIRF Ranked
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="flex shrink-0 motion-safe:animate-marquee-reverse items-center gap-4 group-hover:[animation-play-state:paused] duration-300"
            >
              {marqueeRow2.map((item, idx) => (
                <div
                  key={`dup2-${item.name}-${idx}`}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-[#0F172A] px-4 py-2.5 shadow-sm transition hover:border-slate-700 hover:bg-slate-900"
                >
                  <GraduationCap className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="font-sans text-xs font-bold text-slate-100 whitespace-nowrap">
                    {item.name}
                  </span>
                  {item.isNirfRanked && (
                    <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      NIRF Ranked
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Participation Wall */}
        <div className="pt-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-sans text-xl font-bold text-slate-100 tracking-tight">
                Nationwide Student Participation Breakdown
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Explore colleges represented by state and zone.
              </p>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setActiveRegion(region)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeRegion === region
                      ? "bg-blue-600 text-slate-50 shadow-md font-extrabold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Regional Grid Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredInstitutions.map((inst) => (
                <div
                  key={inst.name}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0F172A] p-4 shadow-sm transition hover:border-slate-700 hover:bg-slate-900 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4.5 w-4.5 text-sky-400 shrink-0" />
                      <h4 className="font-sans text-sm font-bold text-slate-100 leading-snug">
                        {inst.name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80 text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-500" />
                      {inst.city}, {inst.region}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-sky-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      Assessment Active
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
