import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  FileCheck2,
  Microscope,
  Network,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonLd";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";
import { CAREER_ROLES } from "@/data/careerRoles";
import { CareerRoleGrid } from "@/components/career/CareerRoleGrid";
import { CareerDayInLife } from "@/components/career/CareerDayInLife";
import { CareerRecruiterFunnel } from "@/components/career/CareerRecruiterFunnel";
import { CareerStarterKitLeadMagnet } from "@/components/career/CareerStarterKitLeadMagnet";

const ROLE_TICKER = [
  "ICSR Associate (Drug Safety)",
  "Clinical Data Associate (CDM)",
  "Inpatient Medical Coder (DRG)",
  "Clinical SAS Programmer (CDISC)",
  "Regulatory Affairs Specialist",
  "Health Informatics Analyst",
  "Safety Narrative Writer",
  "Clinical Research Coordinator",
];

export const Route = createFileRoute("/careers")({
  headers: () => {
    return {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    };
  },
  head: () => {
    const seoData = pageSeo({
      path: "/careers",
      title: "Healthcare Careers & Salary Bands · Arzon Global",
      description:
        "Brainstorm 60 healthcare career pathways, entry-level starting CTCs (₹3.5L–₹7.0L), recruiter screening checklists, and day-in-the-life workflows across Indian GCCs & CROs.",
      image: "/og/about.jpg",
    });

    return {
      meta: [{ title: "Healthcare Careers & Salary Bands · Arzon Global" }, ...seoData.meta],
      links: seoData.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Healthcare Careers", path: "/careers" },
          ]),
        },
        {
          type: "application/ld+json",
          children: itemListSchema({
            name: "Healthcare Career Pathways",
            items: CAREER_ROLES.slice(0, 15).map((r) => ({
              name: r.name,
              path: `/roles/${r.slug.split(".").pop() ?? r.slug}`,
              description: r.blurb,
            })),
          }),
        },
      ],
    };
  },
  component: HealthcareCareersPage,
});

const CORE_DOMAINS = [
  {
    title: "Pharmacovigilance & Drug Safety",
    slug: "pharmacovigilance",
    courseSlug: "pharmacovigilance",
    icon: ShieldCheck,
    description: "Catch, document, and report adverse drug reactions to global health authorities under ICH-E2B(R3) standards.",
    salaryBand: "₹3.8L – ₹5.5L",
    keyTools: ["Enterprise Safety Database", "MedDRA", "WHODrug", "ICSR Triage"],
    topRoles: ["ICSR Associate", "Safety Data Specialist", "Narrative Writer"],
  },
  {
    title: "Clinical Data Management (CDM)",
    slug: "clinical-data-management",
    courseSlug: "clinical-data-management",
    icon: BriefcaseBusiness,
    description: "Oversee the lifecycle of clinical trial data from electronic case report forms (eCRFs) to audit-ready database lock.",
    salaryBand: "₹3.5L – ₹5.2L",
    keyTools: ["EDC Platforms", "Oracle InForm", "Data Management Plan", "Discrepancy SOPs"],
    topRoles: ["Clinical Data Associate", "eCRF Coordinator", "CDM Specialist"],
  },
  {
    title: "Medical Coding & Revenue Cycle",
    slug: "medical-coding",
    courseSlug: "medical-coding",
    icon: Stethoscope,
    description: "Translate medical records, surgical operative reports, and physician charts into standardized alphanumeric diagnostic codes.",
    salaryBand: "₹3.5L – ₹5.0L",
    keyTools: ["ICD-10-CM / PCS", "CPT-4 Manuals", "HCPCS Level II", "EncoderPro"],
    topRoles: ["Outpatient Coder", "Inpatient Specialist", "DRG Auditor"],
  },
  {
    title: "Clinical SAS & Biostatistical Programming",
    slug: "sas-clinical",
    courseSlug: "sas-clinical",
    icon: BarChart3,
    description: "Transform raw clinical study databases into CDISC-compliant SDTM and ADaM datasets for USFDA regulatory submissions.",
    salaryBand: "₹4.5L – ₹7.0L",
    keyTools: ["Base SAS", "PROC SQL", "CDISC SDTM", "ADaM Datasets", "TLF Generation"],
    topRoles: ["Clinical SAS Programmer", "Statistical Analyst", "CDISC Specialist"],
  },
  {
    title: "Regulatory Affairs & Medical Writing",
    slug: "regulatory-affairs",
    courseSlug: "regulatory-affairs",
    icon: BookOpenCheck,
    description: "Compile and audit technical dossiers, investigator brochures, and Common Technical Document (eCTD) modules for market authorization.",
    salaryBand: "₹3.8L – ₹5.8L",
    keyTools: ["eCTD Software", "USFDA 21 CFR", "EMA Guidelines", "CMC Dossiers"],
    topRoles: ["RA Associate", "CMC Specialist", "Clinical Medical Writer"],
  },
  {
    title: "Health Informatics & Clinical AI",
    slug: "healthcare-analytics",
    courseSlug: "healthcare-analytics",
    icon: Microscope,
    description: "Leverage clinical records, hospital EHR systems, and health data pipelines to extract epidemiological and operational intelligence.",
    salaryBand: "₹4.0L – ₹6.2L",
    keyTools: ["SQL Databases", "HL7 FHIR", "Power BI / Tableau", "Python for Healthcare"],
    topRoles: ["Health Data Analyst", "Clinical Informatics Associate", "EHR Specialist"],
  },
];

function HealthcareCareersPage() {
  useFunnelTracking({ pageName: "careers_hub", category: "catalog" });

  return (
    <main className="min-h-screen bg-white tone-light card-light overflow-x-clip text-[#081F38]">
      {/* ─── SECTION 1: HERO (HOME V2 BRAND GUIDELINES & PEAK UI DETAILING) ─── */}
      <section className="relative overflow-hidden bg-white pt-10 sm:pt-16 pb-14 sm:pb-20 border-b border-[#E4EAF2] tone-light card-light">
        {/* Ambient Radial Accent */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.06),rgba(255,255,255,0))] pointer-events-none"
          aria-hidden="true"
        />

        <div className="ap-shell relative z-10">
          <div className="mx-auto flex max-w-5xl xl:max-w-6xl flex-col items-center text-center">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] mb-5"
            >
              <Link to="/" className="hover:text-[#081F38] transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-[#94A3B8]" />
              <span className="text-[#081F38] font-bold">Healthcare Careers</span>
            </nav>

            {/* Clear Healthcare Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EEF6FF]/95 backdrop-blur-xs px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[#1D4ED8] shadow-2xs mb-4 sm:mb-6">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>
                60 CAREER ROLES &bull; 6 HEALTHCARE DOMAINS &bull; 2,000+ JDS ANALYSED
              </span>
            </div>

            {/* High-Impact Typography Scale with Home Page Gradient */}
            <h1 className="text-[26px] min-[390px]:text-[30px] sm:text-[46px] md:text-[54px] lg:text-[62px] font-extrabold tracking-[-0.035em] text-[#081F38] leading-[1.12] sm:leading-[1.05] max-w-5xl mx-auto mb-4 sm:mb-6 px-1">
              <span>Navigate Healthcare Careers with</span>{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Auditable Hiring Evidence.
              </span>
            </h1>

            {/* Arzon Slate Subtitle */}
            <p className="text-[15px] sm:text-lg md:text-[19px] text-[#475569] leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 font-normal">
              Brainstorm and explore verified salary bands (₹3.5L–₹7.0L), recruiter screening benchmarks, and role roadmaps reverse-engineered from 2,000+ job descriptions across Indian GCCs and global CROs.
            </p>

            {/* Healthcare Roles Marquee Ticker Pill */}
            <div className="w-full max-w-sm sm:max-w-2xl mx-auto mb-6 sm:mb-8 px-1">
              <div className="flex items-center gap-2 sm:gap-3 py-1 sm:py-1.5 px-2.5 sm:px-3 rounded-full border border-[#E2E8F0] bg-white tone-light card-light shadow-2xs overflow-hidden">
                <span className="shrink-0 text-[9.5px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-[#2563EB] bg-[#EEF6FF] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-[#D0E1FD]">
                  ROLES
                </span>
                <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <Marquee className="py-0 [--gap:0.75rem] [--duration:28s]" pauseOnHover repeat={4}>
                    {ROLE_TICKER.map((r) => (
                      <span
                        key={r}
                        className="inline-flex items-center text-[11px] sm:text-xs font-semibold text-[#081F38] bg-[#F8FAFC] hover:bg-[#EEF6FF] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#E2E8F0] transition-colors whitespace-nowrap cursor-default"
                      >
                        {r}
                      </span>
                    ))}
                  </Marquee>
                </div>
              </div>
            </div>

            {/* Rebuilt Credibility Grid (Zero Negative Claims, High Institutional Trust) */}
            <div className="pt-6 sm:pt-8 w-full max-w-4xl mx-auto border-t border-[#E4EAF2]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 sm:p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 hover:bg-white hover:border-[#BFDBFE] hover:shadow-xs transition-all tone-light card-light group">
                  <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-[#EEF6FF] text-[#2563EB] border border-[#D0E1FD] mb-2 group-hover:scale-105 transition-transform">
                    <BarChart3 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">2,000+ Verified JDs</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug">Reverse-engineered skills</div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 sm:p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 hover:bg-white hover:border-[#A7F3D0] hover:shadow-xs transition-all tone-light card-light group">
                  <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2 group-hover:scale-105 transition-transform">
                    <Building2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">Recognized by TASK</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug">Govt. of Telangana alignment</div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 sm:p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 hover:bg-white hover:border-[#FED7AA] hover:shadow-xs transition-all tone-light card-light group">
                  <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200 mb-2 group-hover:scale-105 transition-transform">
                    <Users className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">10,000+ Assessed</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug">Calibrated role benchmarks</div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 sm:p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 hover:bg-white hover:border-[#DDD6FE] hover:shadow-xs transition-all tone-light card-light group">
                  <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">Practical Work Samples</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug">Audit-ready clinical outputs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: CAREER DECISION RAIL (DIAGNOSTIC FIRST) ─────────────── */}
      <section className="py-8 sm:py-12 bg-[#F8FAFC]/70 border-b border-[#E4EAF2]">
        <div className="ap-shell">
          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EEF6FF]/90 p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 tone-light card-light shadow-2xs">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#1D4ED8] border border-[#BFDBFE] mb-2 tone-light card-light">
                <Compass className="h-3 w-3 text-[#2563EB]" />
                <span>BEFORE YOU CHOOSE A DIRECTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#081F38] tracking-tight">
                Not sure which healthcare career track matches your qualification?
              </h2>
              <p className="mt-1.5 text-sm sm:text-[15px] text-[#475569] max-w-2xl font-normal leading-relaxed">
                Take the free 3-minute Career Assessment to match your degree and clinical interests to calibrated starting salary bands and specific corporate role requirements.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                to="/career-engine"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 text-sm font-bold shadow-md shadow-blue-600/15 transition-all"
              >
                <span>Find my career path</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: CORE HEALTHCARE CAREER TRACKS (6 DOMAINS) ─────────── */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E4EAF2] tone-light card-light">
        <div className="ap-shell">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-2 shadow-2xs tone-light card-light">
              <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
              <span>CORE FUNCTIONAL TRACKS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight">
              High-Growth Career Domains in{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Healthcare &amp; Clinical Data
              </span>
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#475569] max-w-2xl font-normal">
              Select a primary functional track to view corporate role hierarchy, typical starting CTC bands, and core database tool requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {CORE_DOMAINS.map((domain) => {
              const Icon = domain.icon;
              return (
                <article
                  key={domain.slug}
                  className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs hover:border-[#2563EB]/40 hover:shadow-lg transition-all group tone-light card-light relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#2563EB] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100 group-hover:scale-105 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-800">
                        <span>Starting:</span>
                        <span>{domain.salaryBand}</span>
                      </span>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-lg font-bold text-[#081F38] group-hover:text-[#2563EB] transition-colors">
                        {domain.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3">
                        {domain.description}
                      </p>
                    </div>

                    {/* Core Tools */}
                    <div className="mt-4 pt-3.5 border-t border-[#F1F5F9]">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                        Standard Database Tools
                      </span>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {domain.keyTools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-md bg-slate-50 border border-slate-200/80 px-2 py-0.5 font-mono text-[10px] font-medium text-[#475569]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sample Roles */}
                    <div className="mt-3.5 pt-2.5 border-t border-[#F1F5F9]">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                        Key Roles in this Track
                      </span>
                      <div className="mt-1 flex flex-wrap gap-1.5 text-xs text-[#081F38] font-medium">
                        {domain.topRoles.map((role) => (
                          <span key={role} className="inline-flex items-center gap-1">
                            <span className="text-[#10B981] font-bold">&bull;</span>
                            <span>{role}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E4EAF2] flex items-center justify-between">
                    <Link
                      to={`/courses/${domain.courseSlug}` as never}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors"
                    >
                      <span>Explore Programme Track</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: A DAY IN THE LIFE OF A HEALTHCARE SPECIALIST ───────── */}
      <div className="ap-shell">
        <CareerDayInLife />
      </div>

      {/* ─── SECTION 5: THE 3-STAGE RECRUITER SCREENING FUNNEL ─────────────── */}
      <div className="ap-shell">
        <CareerRecruiterFunnel />
      </div>

      {/* ─── SECTION 6: INTERACTIVE 60-ROLE DIRECTORY (SEARCH & CARDS) ────── */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E4EAF2] tone-light card-light">
        <div className="ap-shell">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-2 shadow-2xs tone-light card-light">
              <TrendingUp className="h-3 w-3 text-[#10B981]" />
              <span>COMPREHENSIVE ROLE TAXONOMY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight">
              Browse 60 Healthcare &amp; Clinical Data Role Profiles
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#475569] max-w-2xl font-normal">
              Filter by functional domain, seniority level, or search directly for specific enterprise tools, clinical requirements, and hiring organizations.
            </p>
          </div>

          <CareerRoleGrid />
        </div>
      </section>

      {/* ─── SECTION 7: HEALTHCARE GCC & CRO HIRING ECOSYSTEM ──────────────── */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC]/80 border-b border-[#E4EAF2] tone-light card-light">
        <div className="ap-shell">
          <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
              <Network className="h-3 w-3 text-[#2563EB]" />
              <span>CORPORATE HIRING LANDSCAPE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081F38] tracking-tight">
              Where Healthcare Careers Actually Scale{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Across India &amp; Global Hubs
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
              Understand the 3 distinct employer archetypes that hire Indian pharmacy, life science, and clinical graduates for high-value offshore operations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Column 1: GCCs */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs tone-light card-light">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100">
                    <Building2 className="h-4.5 w-4.5" />
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-[#1D4ED8]">
                    In-House Pharma Hubs
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#081F38]">
                  Global Capability Centers (GCCs)
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Owned directly by multinational pharmaceutical sponsors (Novartis, Pfizer, GSK, AstraZeneca, Sanofi).
                </p>
                <div className="mt-4 space-y-2 text-xs text-[#334155]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Direct drug product ownership &amp; safety signal governance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Higher starting compensation bands (₹4.5L – ₹7.0L)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Rigorous multi-round technical screening on database standards</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3.5 border-t border-[#F1F5F9] font-mono text-[11px] text-[#64748B]">
                Key Hubs: Hyderabad, Bangalore, Mumbai
              </div>
            </div>

            {/* Column 2: CROs */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs tone-light card-light">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <FileCheck2 className="h-4.5 w-4.5" />
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-emerald-800">
                    Clinical Research
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#081F38]">
                  Contract Research Orgs (CROs)
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Specialized clinical trial execution organizations (IQVIA, Parexel, Syneos Health, PPD, ICON).
                </p>
                <div className="mt-4 space-y-2 text-xs text-[#334155]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>High case volume across Phase I–IV multi-sponsor trials</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Rapid lateral progression across safety, data, and monitoring</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Hiring heavily values verified work samples &amp; tool fluency</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3.5 border-t border-[#F1F5F9] font-mono text-[11px] text-[#64748B]">
                Key Hubs: Bangalore, Pune, Hyderabad, Chennai
              </div>
            </div>

            {/* Column 3: Healthcare IT */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs tone-light card-light">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                    <Building2 className="h-4.5 w-4.5" />
                  </div>
                  <span className="rounded-full bg-purple-50 px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-purple-800">
                    Enterprise IT &amp; RCM
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#081F38]">
                  Healthcare IT &amp; RCM Providers
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Global operational delivery powerhouses (Cognizant, Accenture, Omega Healthcare, Wipro, TCS).
                </p>
                <div className="mt-4 space-y-2 text-xs text-[#334155]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Massive annual intake cycles for entry-level graduates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Specialized hospital billing, medical coding, and triage desks</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Fast placement turnarounds for pre-trained candidate pools</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3.5 border-t border-[#F1F5F9] font-mono text-[11px] text-[#64748B]">
                Key Hubs: Hyderabad, Chennai, Noida, Coimbatore
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: LEAD MAGNET / STARTER KIT ──────────────────────────── */}
      <CareerStarterKitLeadMagnet />

      {/* ─── SECTION 9: HOME-STYLE CLOSING HERO BANNER ──────────────────────── */}
      <section className="py-10 sm:py-20 bg-white border-t border-[#E4EAF2] tone-light card-light">
        <div className="ap-shell">
          <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-[#071A4A] via-[#0A1F56] to-[#040E29] p-6 sm:p-12 lg:p-16 text-white shadow-xl">
            {/* Ambient glow */}
            <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#1557D6]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#93C5FD]">
                  <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
                  <span>YOUR NEXT STEP</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
                  Know the role first. Then build what hiring managers evaluate.
                </h2>
                <p
                  className="text-sm sm:text-base text-slate-200 max-w-xl font-normal leading-relaxed"
                  style={{ color: "#E2E8F0" }}
                >
                  Take the free 3-minute Career Engine diagnostic to receive your personalised role-fit report, or explore our degree-specific pathways reverse-engineered from 2,000+ job descriptions.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    to="/career-engine/start"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 text-sm font-bold shadow-md shadow-blue-600/20 transition-all"
                  >
                    <span>Get my industry-fit score</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/degrees"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 hover:bg-white/15 text-white px-6 py-3.5 text-sm font-bold transition-all"
                    style={{ color: "#FFFFFF" }}
                  >
                    <span>Browse Degree Pathways</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-2.5">
                {[
                  "Personalised career fit report",
                  "Reverse-engineered from 2,000+ JDs",
                  "Audit-ready clinical case samples",
                  "Recognized by TASK, Govt. of Telangana",
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center gap-2.5 rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                    <span className="text-white font-medium" style={{ color: "#FFFFFF" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
