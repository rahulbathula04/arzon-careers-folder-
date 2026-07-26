import { useState } from "react";
import { GraduationCap, MapPin, CheckCircle2, ShieldCheck, Award, Sparkles, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type InstitutionItem = {
  name: string;
  shortName?: string;
  region: "Karnataka" | "Tamil Nadu" | "Telangana" | "Andhra Pradesh" | "North India";
  city: string;
  isNirfRanked?: boolean;
  category?: string;
};

export const ALL_INSTITUTIONS: InstitutionItem[] = [
  // Karnataka
  { name: "JSS College of Pharmacy, Mysuru", shortName: "JSS Mysuru", region: "Karnataka", city: "Mysuru", isNirfRanked: true, category: "Pharmacy" },
  { name: "KLE College of Pharmacy", shortName: "KLE Pharmacy", region: "Karnataka", city: "Belagavi", isNirfRanked: true, category: "Pharmacy" },
  { name: "Sharada Vilas College of Pharmacy", shortName: "Sharada Vilas", region: "Karnataka", city: "Mysuru", category: "Pharmacy" },
  { name: "Cauvery College of Pharmacy", shortName: "Cauvery Pharmacy", region: "Karnataka", city: "Mysuru", category: "Pharmacy" },
  { name: "Manipal College of Pharmaceutical Sciences", shortName: "Manipal MCOPS", region: "Karnataka", city: "Manipal", isNirfRanked: true, category: "Pharmacy" },

  // Tamil Nadu
  { name: "JSS College of Pharmacy, Ooty", shortName: "JSS Ooty", region: "Tamil Nadu", city: "Ooty", isNirfRanked: true, category: "Pharmacy" },
  { name: "PSG College of Pharmacy", shortName: "PSG Pharmacy", region: "Tamil Nadu", city: "Coimbatore", isNirfRanked: true, category: "Pharmacy" },
  { name: "SRM Institute of Science and Technology", shortName: "SRM IST", region: "Tamil Nadu", city: "Chennai", isNirfRanked: true, category: "University" },
  { name: "Saveetha Institute of Medical & Tech Sciences", shortName: "Saveetha SIMATS", region: "Tamil Nadu", city: "Chennai", isNirfRanked: true, category: "Medical & Tech" },
  { name: "Sathyabama Institute of Science & Technology", shortName: "Sathyabama", region: "Tamil Nadu", city: "Chennai", category: "University" },
  { name: "Vels University", shortName: "VISTAS", region: "Tamil Nadu", city: "Chennai", category: "University" },
  { name: "Amrita Vishwa Vidyapeetham", shortName: "Amrita Univ", region: "Tamil Nadu", city: "Coimbatore", isNirfRanked: true, category: "University" },
  { name: "Kalasalingam Academy of Research & Education", shortName: "KARE", region: "Tamil Nadu", city: "Krishnankoil", category: "University" },
  { name: "Karpagam Academy of Higher Education", shortName: "KAHE", region: "Tamil Nadu", city: "Coimbatore", category: "University" },
  { name: "Chettinad Academy of Research & Education", shortName: "CARE", region: "Tamil Nadu", city: "Kelambakkam", category: "Medical" },

  // Telangana
  { name: "Malla Reddy College of Pharmacy", shortName: "MRCP", region: "Telangana", city: "Hyderabad", category: "Pharmacy" },
  { name: "NIPER Hyderabad", shortName: "NIPER Hyd", region: "Telangana", city: "Hyderabad", isNirfRanked: true, category: "National Inst." },
  { name: "Osmania University", shortName: "OU Hyderabad", region: "Telangana", city: "Hyderabad", isNirfRanked: true, category: "University" },
  { name: "JNTU Hyderabad", shortName: "JNTUH", region: "Telangana", city: "Hyderabad", category: "Tech Univ." },
  { name: "Woxsen University", shortName: "Woxsen", region: "Telangana", city: "Hyderabad", category: "University" },

  // Andhra Pradesh
  { name: "Andhra University", shortName: "AU Visakhapatnam", region: "Andhra Pradesh", city: "Visakhapatnam", isNirfRanked: true, category: "University" },
  { name: "Acharya Nagarjuna University", shortName: "ANU Guntur", region: "Andhra Pradesh", city: "Guntur", category: "University" },
  { name: "JNTU Anantapur", shortName: "JNTUA", region: "Andhra Pradesh", city: "Anantapur", category: "Tech Univ." },
  { name: "GITAM University", shortName: "GITAM", region: "Andhra Pradesh", city: "Visakhapatnam", category: "University" },
  { name: "KL University", shortName: "KLEF Vijayawada", region: "Andhra Pradesh", city: "Vijayawada", category: "University" },
  { name: "Sri Padmavati Mahila Visvavidyalayam", shortName: "SPMVV Tirupati", region: "Andhra Pradesh", city: "Tirupati", category: "Women's Univ." },

  // North India
  { name: "Lovely Professional University (LPU)", shortName: "LPU Punjab", region: "North India", city: "Phagwara", isNirfRanked: true, category: "University" },
  { name: "Chandigarh University", shortName: "CU Mohali", region: "North India", city: "Mohali", isNirfRanked: true, category: "University" },
];

const REGIONS = ["All India", "Karnataka", "Tamil Nadu", "Telangana", "Andhra Pradesh", "North India"] as const;
type RegionFilter = (typeof REGIONS)[number];

export function InstitutionalReachWall() {
  const [activeRegion, setActiveRegion] = useState<RegionFilter>("All India");

  const filteredInstitutions =
    activeRegion === "All India"
      ? ALL_INSTITUTIONS
      : ALL_INSTITUTIONS.filter((inst) => inst.region === activeRegion);

  const marqueeRow1 = [...ALL_INSTITUTIONS.slice(0, 14), ...ALL_INSTITUTIONS.slice(0, 14)];
  const marqueeRow2 = [...ALL_INSTITUTIONS.slice(14), ...ALL_INSTITUTIONS.slice(14)];

  return (
    <section
      id="institutional-reach"
      className="py-20 sm:py-28 bg-[#060A12] border-t border-slate-800/80 text-slate-50 overflow-hidden relative"
    >
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Header Block */}
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono font-bold text-sky-400 shadow-lg">
            <ShieldCheck className="h-4 w-4 text-sky-400" />
            <span>ACADEMIC PARTICIPATION & JD-BASED ROLE TRAINING TRUST</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-50 tracking-tight leading-[1.15]">
            Students from India's Leading Pharmacy Colleges and Universities Trust Our JD-Based Role Trainings
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium max-w-3xl mx-auto">
            Students from India's leading pharmacy colleges, universities, and healthcare
            institutions rely on Arzon's JD-based role-readiness assessments and clinical trainings to benchmark their skills and build deployment-ready careers.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Students from these institutions have participated in our JD-based role trainings</span>
            </span>
            <span className="hidden sm:inline-block text-slate-600">·</span>
            <span className="text-slate-400">Institutional names reflect student participant representation</span>
          </div>
        </div>

        {/* Continuous Dual-Speed Horizontal Marquee */}
        <div className="relative w-full space-y-4 pt-2">
          {/* Edge Blur Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#060A12] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#060A12] to-transparent z-20 pointer-events-none" />

          {/* Marquee Row 1 */}
          <div className="group flex overflow-hidden select-none gap-4">
            <div className="flex shrink-0 motion-safe:animate-marquee items-center gap-4 group-hover:[animation-play-state:paused] duration-300">
              {marqueeRow1.map((item, idx) => (
                <div
                  key={`m1-${item.name}-${idx}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-800/90 bg-[#0C1324]/90 px-4 py-3 shadow-lg backdrop-blur-md transition-all hover:border-sky-500/40 hover:bg-[#111A30]"
                >
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-sky-400">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-xs font-bold text-slate-100 whitespace-nowrap">
                        {item.name}
                      </span>
                      {item.isNirfRanked && (
                        <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                          <Award className="h-2.5 w-2.5 text-amber-400" />
                          NIRF
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 block">
                      {item.city}, {item.region}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="flex shrink-0 motion-safe:animate-marquee items-center gap-4 group-hover:[animation-play-state:paused] duration-300"
            >
              {marqueeRow1.map((item, idx) => (
                <div
                  key={`m1dup-${item.name}-${idx}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-800/90 bg-[#0C1324]/90 px-4 py-3 shadow-lg backdrop-blur-md transition-all hover:border-sky-500/40 hover:bg-[#111A30]"
                >
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-sky-400">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-xs font-bold text-slate-100 whitespace-nowrap">
                        {item.name}
                      </span>
                      {item.isNirfRanked && (
                        <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                          <Award className="h-2.5 w-2.5 text-amber-400" />
                          NIRF
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 block">
                      {item.city}, {item.region}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 */}
          <div className="group flex overflow-hidden select-none gap-4">
            <div className="flex shrink-0 motion-safe:animate-marquee-reverse items-center gap-4 group-hover:[animation-play-state:paused] duration-300">
              {marqueeRow2.map((item, idx) => (
                <div
                  key={`m2-${item.name}-${idx}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-800/90 bg-[#0C1324]/90 px-4 py-3 shadow-lg backdrop-blur-md transition-all hover:border-sky-500/40 hover:bg-[#111A30]"
                >
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-sky-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-xs font-bold text-slate-100 whitespace-nowrap">
                        {item.name}
                      </span>
                      {item.isNirfRanked && (
                        <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                          <Award className="h-2.5 w-2.5 text-amber-400" />
                          NIRF
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 block">
                      {item.city}, {item.region}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="flex shrink-0 motion-safe:animate-marquee-reverse items-center gap-4 group-hover:[animation-play-state:paused] duration-300"
            >
              {marqueeRow2.map((item, idx) => (
                <div
                  key={`m2dup-${item.name}-${idx}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-800/90 bg-[#0C1324]/90 px-4 py-3 shadow-lg backdrop-blur-md transition-all hover:border-sky-500/40 hover:bg-[#111A30]"
                >
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-sky-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-xs font-bold text-slate-100 whitespace-nowrap">
                        {item.name}
                      </span>
                      {item.isNirfRanked && (
                        <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                          <Award className="h-2.5 w-2.5 text-amber-400" />
                          NIRF
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 block">
                      {item.city}, {item.region}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Breakdown Matrix */}
        <div className="pt-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky-400">
                Regional Hub Matrix
              </span>
              <h3 className="font-sans text-2xl font-extrabold text-slate-50 tracking-tight mt-1">
                Nationwide Campus Representation
              </h3>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setActiveRegion(region)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeRegion === region
                      ? "bg-blue-600 text-slate-50 shadow-md font-extrabold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/80"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Institution Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredInstitutions.map((inst) => (
                <div
                  key={inst.name}
                  className="group rounded-3xl border border-slate-800/90 bg-[#0C1324] p-5 shadow-xl transition-all duration-300 hover:border-sky-500/40 hover:bg-[#10182C] space-y-4 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-sky-400 group-hover:border-sky-500/30 transition-all">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-sans text-sm font-bold text-slate-100 leading-snug group-hover:text-sky-300 transition-colors">
                          {inst.name}
                        </h4>
                        <span className="font-mono text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-slate-500" />
                          {inst.city}, {inst.region}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                    {inst.isNirfRanked ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                        <Sparkles className="h-3 w-3 text-amber-400" />
                        NIRF Ranked Institution
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-slate-400">
                        {inst.category ?? "Higher Education"}
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-sky-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                      <CheckCircle2 className="h-3 w-3 text-sky-400" />
                      Active Cohorts
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
