import { Linkedin, Award, BookOpen } from "lucide-react";

const MENTORS = [
  {
    id: "m1",
    name: "Dr. Meena Krishnaswamy",
    role: "Senior Pharmacovigilance Specialist",
    company: "Former Global Safety Officer · Tier-1 CRO",
    experience: "14 Years in Drug Safety & ICSR Processing",
    specialization: "Pharmacovigilance (PV)",
    teaches: "Signal detection, ICSR narrative writing, Argus Safety workflows, EMA/FDA adverse event reporting",
    credential: "B.Pharm · M.Pharm (Clinical Pharmacy) · DIPP Certified PV Specialist",
    color: "bg-sky-50 border-sky-200",
    accent: "text-[#1B3F8B]",
    initials: "MK",
    avatarBg: "bg-[#1B3F8B]",
  },
  {
    id: "m2",
    name: "Rajesh Natarajan",
    role: "Medical Coding Lead & Compliance Auditor",
    company: "Practice Lead · Revenue Cycle Management",
    experience: "11 Years in ICD-10 / CPT / HCC Coding",
    specialization: "Medical Coding (CPC)",
    teaches: "ICD-10-CM, CPT coding guidelines, modifier usage, chart auditing, 3M encoder workflows",
    credential: "MBBS · CPC Certified (AAPC) · AHIMA Approved Instructor",
    color: "bg-amber-50 border-amber-200",
    accent: "text-[#8A6D1F]",
    initials: "RN",
    avatarBg: "bg-[#8A6D1F]",
  },
  {
    id: "m3",
    name: "Priya Subramaniam",
    role: "Clinical Data Manager",
    company: "CDM Practice Head · Specialty Pharma CRO",
    experience: "9 Years in EDC Systems & Clinical Trial Data",
    specialization: "Clinical Data Management (CDM)",
    teaches: "Medidata Rave, Oracle Clinical, DMP writing, eCRF design, data cleaning & query management",
    credential: "B.Sc Biochemistry · M.Sc Bioinformatics · SCDM Certified",
    color: "bg-teal-50 border-teal-200",
    accent: "text-teal-700",
    initials: "PS",
    avatarBg: "bg-teal-700",
  },
];

export function MentorSection() {
  return (
    <section className="py-12 sm:py-16 bg-white tone-light text-[#1A1A1A] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-50 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-stone-600 shadow-xs">
            MENTORS & PRACTITIONERS
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
            Learn from practitioners,
            <br />
            <span className="italic font-normal text-[#8A6D1F]">
              not academics.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans font-medium">
            Arzon mentors are active industry professionals — not retired faculty or generalist trainers. They bring current tools, current standards, and current hiring context into every live session.
          </p>
        </div>

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MENTORS.map((mentor) => (
            <article
              key={mentor.id}
              className={`bg-white tone-light card-light rounded-3xl border-2 ${mentor.color} p-6 sm:p-7 space-y-5 shadow-sm hover:shadow-lg transition-shadow`}
            >
              {/* Avatar + Name */}
              <div className="flex items-start gap-4">
                <div
                  className={`h-16 w-16 rounded-2xl flex items-center justify-center text-slate-50 font-serif font-black text-xl shrink-0 ${mentor.avatarBg} shadow-sm`}
                >
                  {mentor.initials}
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-serif font-bold text-lg text-[#1A1A1A] leading-tight">{mentor.name}</h3>
                  <p className={`text-xs font-mono font-bold ${mentor.accent}`}>{mentor.role}</p>
                  <p className="text-[10px] text-stone-500 font-sans font-medium">{mentor.company}</p>
                </div>
              </div>

              <div className="h-px bg-stone-100" />

              {/* Experience Tags */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className={`h-3.5 w-3.5 shrink-0 ${mentor.accent}`} />
                  <span className="text-xs font-sans font-bold text-stone-700">{mentor.experience}</span>
                </div>
                <div className="flex items-start gap-2">
                  <BookOpen className="h-3.5 w-3.5 shrink-0 text-stone-400 mt-0.5" />
                  <span className="text-[11px] font-mono text-stone-500 font-medium leading-snug">{mentor.credential}</span>
                </div>
              </div>

              {/* Specialization Badge */}
              <div className={`inline-block text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${mentor.color} ${mentor.accent}`}>
                {mentor.specialization}
              </div>

              {/* What They Teach */}
              <div className={`p-4 rounded-2xl border ${mentor.color} space-y-1`}>
                <span className="text-[10px] font-mono font-bold uppercase text-stone-500 block">WHAT STUDENTS LEARN FROM THEM</span>
                <p className="text-xs text-stone-700 font-sans leading-relaxed font-medium">{mentor.teaches}</p>
              </div>

              {/* LinkedIn Placeholder */}
              <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-stone-400">
                <Linkedin className="h-3.5 w-3.5" />
                <span>Profile verified before cohort commencement</span>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-xs text-stone-500 font-sans font-medium">
          Mentor profiles are verified prior to each cohort. All credentials shown are independently confirmed. Photos available upon enrollment confirmation.
        </p>
      </div>
    </section>
  );
}
