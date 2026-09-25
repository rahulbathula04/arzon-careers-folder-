import { Link } from "@tanstack/react-router";
import { ArrowRight, Star, ShieldCheck, CheckCircle2, TrendingUp, GraduationCap } from "lucide-react";

interface RoleCard {
  id: string;
  title: string;
  category: string;
  badge?: string;
  image: string;
  description: string;
  eligibleDegrees: string;
  topSkills: string[];
  rolePath: string;
  assessmentPath: string;
}

const ROLES: RoleCard[] = [
  {
    id: "pv-associate",
    title: "Pharmacovigilance Associate",
    category: "Drug Safety & Surveillance",
    badge: "Most Popular",
    image: "/images/pv-clinical-workstation.jpg",
    description: "Process adverse drug reaction reports (ICSRs), apply MedDRA coding, and evaluate serious adverse events.",
    eligibleDegrees: "B.Pharm · M.Pharm · Pharm.D",
    topSkills: ["ICSR Processing", "MedDRA Coding", "WHO-UMC Causality", "GVP Audits"],
    rolePath: "/roles/pv-associate",
    assessmentPath: "/career-engine/test",
  },
  {
    id: "medical-coder",
    title: "Medical Coder",
    category: "Clinical Documentation",
    image: "/assets/thumbs/medical-coding.webp",
    description: "Translate physician clinical notes and operative procedures into standardized alphanumeric codes.",
    eligibleDegrees: "B.Pharm · Life Sciences · Nursing",
    topSkills: ["ICD-10-CM", "CPT-4 Coding", "HCPCS Level II", "HIPAA Compliance"],
    rolePath: "/roles/medical-coder",
    assessmentPath: "/career-engine/test",
  },
  {
    id: "cdm-specialist",
    title: "Clinical Data Management",
    category: "Clinical Trial Operations",
    image: "/assets/thumbs/clinical-data-management.webp",
    description: "Design eCRFs, manage EDC databases, resolve data discrepancies, and ensure audit-ready study locks.",
    eligibleDegrees: "B.Pharm · M.Sc Biotech · Life Sciences",
    topSkills: ["eCRF Design", "EDC Validation", "Discrepancy Triage", "GCP Guidelines"],
    rolePath: "/roles/cdm-specialist",
    assessmentPath: "/career-engine/test",
  },
  {
    id: "regulatory-affairs",
    title: "Regulatory Affairs Associate",
    category: "Global Compliance & Submissions",
    image: "/assets/thumbs/regulatory-affairs.webp",
    description: "Compile and publish electronic Common Technical Documents (eCTD) for US FDA, EMA, and CDSCO approvals.",
    eligibleDegrees: "M.Pharm · Pharm.D · M.Sc",
    topSkills: ["eCTD Submissions", "CMC Dossiers", "FDA 21 CFR", "Regulatory Auditing"],
    rolePath: "/roles/regulatory-affairs",
    assessmentPath: "/career-engine/test",
  },
  {
    id: "clinical-sas",
    title: "Clinical SAS Programmer",
    category: "Biostatistics & Analytics",
    image: "/assets/thumbs/clinical-saas.webp",
    description: "Transform raw clinical study databases into CDISC-compliant SDTM and ADaM tables, listings, and figures.",
    eligibleDegrees: "M.Sc Biostatistics · B.Pharm · IT",
    topSkills: ["SAS Base & Macro", "CDISC SDTM", "ADaM Datasets", "TLF Generation"],
    rolePath: "/roles/clinical-sas",
    assessmentPath: "/career-engine/test",
  },
  {
    id: "medical-writing",
    title: "Medical Writing & Biotechnology",
    category: "Scientific Communication",
    image: "/assets/thumbs/ai-intelligence.webp",
    description: "Author Clinical Study Reports (CSRs), investigator brochures, and peer-reviewed clinical summaries.",
    eligibleDegrees: "Pharm.D · M.Pharm · MBBS",
    topSkills: ["Clinical Study Reports", "ICMJE Standards", "Literature Synthesis", "Protocol Design"],
    rolePath: "/roles",
    assessmentPath: "/career-engine/test",
  },
];

export function AcriRoleSelection() {
  return (
    <section className="bg-white tone-light py-16 lg:py-24 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>6 IN-DEMAND CAREER PATHS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] tracking-tight">
              Which Healthcare Career Are You Preparing For?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl">
              Choose a role to explore industry expectations, hiring salary benchmarks, diagnostic assessments, and job-ready curricula.
            </p>
          </div>

          <Link
            to="/roles"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#005B4F] hover:text-[#00473E] group shrink-0"
          >
            <span>View All Career Paths</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Role Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ROLES.map((role) => (
            <div
              key={role.id}
              className="card-light rounded-2xl border border-stone-200 bg-white tone-light p-5 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative overflow-hidden rounded-xl bg-stone-100 mb-4 aspect-16/9">
                  <img
                    src={role.image}
                    alt={role.title}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {role.badge && (
                    <span className="absolute top-3 right-3 bg-[#005B4F] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{role.badge}</span>
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 bg-[#0B1325]/80 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                    {role.category}
                  </span>
                </div>

                {/* Role Title & Description */}
                <h3 className="font-serif text-xl font-bold text-[#0B1325] group-hover:text-[#005B4F] transition-colors">
                  {role.title}
                </h3>
                <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                  {role.description}
                </p>

                {/* Degree Benchmark */}
                <div className="mt-4 flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200/60 text-xs">
                  <GraduationCap className="h-4 w-4 text-[#005B4F]" />
                  <span className="text-stone-500 font-medium">Eligible Degrees:</span>
                  <span className="font-bold text-stone-900">{role.eligibleDegrees}</span>
                </div>

                {/* Top Skills Tags */}
                <div className="mt-4">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Core Competencies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.topSkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                <Link
                  to={role.rolePath}
                  className="text-xs font-semibold text-stone-700 hover:text-[#005B4F] flex items-center gap-1"
                >
                  <span>Explore Role</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  to={role.assessmentPath}
                  className="px-3.5 py-1.5 rounded-lg bg-[#005B4F] hover:bg-[#00473E] text-white text-xs font-semibold shadow-2xs transition-colors"
                >
                  <span>Take ACRI Test →</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights Bar matching comp */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
            <CheckCircle2 className="h-4 w-4 text-[#005B4F]" />
            <span>Role Data &amp; Market Intelligence</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
            <CheckCircle2 className="h-4 w-4 text-[#005B4F]" />
            <span>Calibrated Skill Standards</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
            <CheckCircle2 className="h-4 w-4 text-[#005B4F]" />
            <span>25-Min ACRI Diagnostic</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
            <CheckCircle2 className="h-4 w-4 text-[#005B4F]" />
            <span>Live Project &amp; Tool Training</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
            <CheckCircle2 className="h-4 w-4 text-[#005B4F]" />
            <span>Direct Hiring Shortlists</span>
          </div>
        </div>
      </div>
    </section>
  );
}
