import { GraduationCap, ShieldCheck, CheckCircle2, Award } from "lucide-react";

export type InstitutionItem = {
  name: string;
  region: "Karnataka" | "Tamil Nadu" | "Telangana" | "Andhra Pradesh" | "North India";
  city: string;
  isNirfRanked?: boolean;
};

export const ALL_INSTITUTIONS: InstitutionItem[] = [
  // Karnataka
  {
    name: "JSS College of Pharmacy, Mysuru",
    region: "Karnataka",
    city: "Mysuru",
    isNirfRanked: true,
  },
  { name: "KLE College of Pharmacy", region: "Karnataka", city: "Belagavi", isNirfRanked: true },
  { name: "Sharada Vilas College of Pharmacy", region: "Karnataka", city: "Mysuru" },
  { name: "Cauvery College of Pharmacy", region: "Karnataka", city: "Mysuru" },
  {
    name: "Manipal College of Pharmaceutical Sciences",
    region: "Karnataka",
    city: "Manipal",
    isNirfRanked: true,
  },

  // Tamil Nadu
  { name: "JSS College of Pharmacy, Ooty", region: "Tamil Nadu", city: "Ooty", isNirfRanked: true },
  { name: "PSG College of Pharmacy", region: "Tamil Nadu", city: "Coimbatore", isNirfRanked: true },
  {
    name: "SRM Institute of Science and Technology",
    region: "Tamil Nadu",
    city: "Chennai",
    isNirfRanked: true,
  },
  {
    name: "Saveetha Institute of Medical & Tech Sciences",
    region: "Tamil Nadu",
    city: "Chennai",
    isNirfRanked: true,
  },
  { name: "Sathyabama Institute of Science & Technology", region: "Tamil Nadu", city: "Chennai" },
  { name: "Vels University", region: "Tamil Nadu", city: "Chennai" },
  {
    name: "Amrita Vishwa Vidyapeetham",
    region: "Tamil Nadu",
    city: "Coimbatore",
    isNirfRanked: true,
  },
  {
    name: "Kalasalingam Academy of Research & Education",
    region: "Tamil Nadu",
    city: "Krishnankoil",
  },
  { name: "Karpagam Academy of Higher Education", region: "Tamil Nadu", city: "Coimbatore" },
  { name: "Chettinad Academy of Research & Education", region: "Tamil Nadu", city: "Kelambakkam" },

  // Telangana
  { name: "Malla Reddy College of Pharmacy", region: "Telangana", city: "Hyderabad" },
  { name: "NIPER Hyderabad", region: "Telangana", city: "Hyderabad", isNirfRanked: true },
  { name: "Osmania University", region: "Telangana", city: "Hyderabad", isNirfRanked: true },
  { name: "JNTU Hyderabad", region: "Telangana", city: "Hyderabad" },
  { name: "Woxsen University", region: "Telangana", city: "Hyderabad" },

  // Andhra Pradesh
  {
    name: "Andhra University",
    region: "Andhra Pradesh",
    city: "Visakhapatnam",
    isNirfRanked: true,
  },
  { name: "Acharya Nagarjuna University", region: "Andhra Pradesh", city: "Guntur" },
  { name: "JNTU Anantapur", region: "Andhra Pradesh", city: "Anantapur" },
  { name: "GITAM University", region: "Andhra Pradesh", city: "Visakhapatnam" },
  { name: "KL University", region: "Andhra Pradesh", city: "Vijayawada" },
  { name: "Sri Padmavati Mahila Visvavidyalayam", region: "Andhra Pradesh", city: "Tirupati" },

  // North India
  {
    name: "Lovely Professional University (LPU)",
    region: "North India",
    city: "Phagwara",
    isNirfRanked: true,
  },
  { name: "Chandigarh University", region: "North India", city: "Mohali", isNirfRanked: true },
];

export function InstitutionalReachWall() {
  const marqueeRow1 = [...ALL_INSTITUTIONS.slice(0, 14), ...ALL_INSTITUTIONS.slice(0, 14)];
  const marqueeRow2 = [...ALL_INSTITUTIONS.slice(14), ...ALL_INSTITUTIONS.slice(14)];

  return (
    <section
      id="institutional-reach"
      className="editorial-page-bg py-12 sm:py-16 border-y border-slate-200 text-[#151C2E] overflow-hidden relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-mono font-bold text-blue-700 shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
            <span>ACADEMIC ADOPTION & CAMPUS PARTICIPATION</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#151C2E] tracking-tight leading-snug">
            Students from India's Leading Pharmacy Colleges and Universities Trust Our JD-Based Role
            Trainings
          </h2>

          <p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed font-medium max-w-2xl mx-auto">
            Students from India's leading pharmacy colleges, universities, and healthcare
            institutions rely on Arzon's JD-based role-readiness assessments and clinical trainings
            to benchmark their skills and prepare for deployment-ready careers.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-[#5B6472] font-medium">
            <span className="flex items-center gap-1.5 bg-white card-light px-3.5 py-1 rounded-full border border-slate-200 text-[11px] shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>
                Students from these institutions have participated in our JD-based role trainings
              </span>
            </span>
          </div>
        </div>

        {/* Compact Continuous Infinite Marquee Strip */}
        <div className="relative w-full space-y-3 pt-2">
          {/* Edge Blur Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8FAFC] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8FAFC] to-transparent z-20 pointer-events-none" />

          {/* Marquee Row 1 */}
          <div className="group flex overflow-hidden select-none gap-3">
            <div className="flex shrink-0 motion-safe:animate-marquee items-center gap-3 group-hover:[animation-play-state:paused] duration-300">
              {marqueeRow1.map((item, idx) => (
                <div
                  key={`r1-${item.name}-${idx}`}
                  className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white card-light px-3.5 py-2 shadow-sm transition-all hover:border-blue-400 hover:bg-slate-50"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />
                  <span className="font-sans text-xs font-bold text-[#151C2E] whitespace-nowrap">
                    {item.name}
                  </span>
                  {item.isNirfRanked && (
                    <span className="inline-flex items-center gap-0.5 font-mono text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      <Award className="h-2.5 w-2.5 text-amber-600" />
                      NIRF
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="flex shrink-0 motion-safe:animate-marquee items-center gap-3 group-hover:[animation-play-state:paused] duration-300"
            >
              {marqueeRow1.map((item, idx) => (
                <div
                  key={`r1d-${item.name}-${idx}`}
                  className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white card-light px-3.5 py-2 shadow-sm transition-all hover:border-blue-400 hover:bg-slate-50"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />
                  <span className="font-sans text-xs font-bold text-[#151C2E] whitespace-nowrap">
                    {item.name}
                  </span>
                  {item.isNirfRanked && (
                    <span className="inline-flex items-center gap-0.5 font-mono text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      <Award className="h-2.5 w-2.5 text-amber-600" />
                      NIRF
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 */}
          <div className="group flex overflow-hidden select-none gap-3">
            <div className="flex shrink-0 motion-safe:animate-marquee-reverse items-center gap-3 group-hover:[animation-play-state:paused] duration-300">
              {marqueeRow2.map((item, idx) => (
                <div
                  key={`r2-${item.name}-${idx}`}
                  className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white card-light px-3.5 py-2 shadow-sm transition-all hover:border-blue-400 hover:bg-slate-50"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />
                  <span className="font-sans text-xs font-bold text-[#151C2E] whitespace-nowrap">
                    {item.name}
                  </span>
                  {item.isNirfRanked && (
                    <span className="inline-flex items-center gap-0.5 font-mono text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      <Award className="h-2.5 w-2.5 text-amber-600" />
                      NIRF
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="flex shrink-0 motion-safe:animate-marquee-reverse items-center gap-3 group-hover:[animation-play-state:paused] duration-300"
            >
              {marqueeRow2.map((item, idx) => (
                <div
                  key={`r2d-${item.name}-${idx}`}
                  className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white card-light px-3.5 py-2 shadow-sm transition-all hover:border-blue-400 hover:bg-slate-50"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />
                  <span className="font-sans text-xs font-bold text-[#151C2E] whitespace-nowrap">
                    {item.name}
                  </span>
                  {item.isNirfRanked && (
                    <span className="inline-flex items-center gap-0.5 font-mono text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      <Award className="h-2.5 w-2.5 text-amber-600" />
                      NIRF
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
