import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ArrowRight, ShieldCheck, GraduationCap, Briefcase, ExternalLink } from "lucide-react";
import { pageSeo } from "@/lib/seo";

interface DegreePathway {
  slug: string;
  title: string;
  degreeName: string;
  headline: string;
  description: string;
  metaDescription: string;
  recommendedRoles: Array<{
    title: string;
    roleSlug: string;
    courseSlug: string;
    whyFit: string;
    entrySalary: string;
    demand: string;
    keySoftware: string[];
  }>;
  nonCoreOptions: string[];
  faq: Array<{ q: string; a: string }>;
}

const DEGREE_PATHWAYS: Record<string, DegreePathway> = {
  "after-bpharm": {
    slug: "after-bpharm",
    title: "Career Options & Non-Core Industry Jobs After B.Pharm (2026)",
    degreeName: "Bachelor of Pharmacy (B.Pharm)",
    headline: "High-Growth Clinical Data, PV, and Coding Careers After B.Pharm",
    description: "Discover non-retail, high-salary career options in Pharmacovigilance, Medical Coding, Clinical Data Management, and Regulatory Affairs for B.Pharm freshers in India.",
    metaDescription: "Explore 2026 career options after B.Pharm in India. Detailed roadmap for Pharmacovigilance, Medical Coding, CDM & Regulatory Affairs starting ₹3.8-6.5 LPA.",
    recommendedRoles: [
      {
        title: "Drug Safety Associate (Pharmacovigilance)",
        roleSlug: "drug-safety-associate",
        courseSlug: "pharmacovigilance",
        whyFit: "B.Pharm pharmacology & therapeutics knowledge directly applies to ICSR adverse event case triage.",
        entrySalary: "₹3.8 LPA – ₹6.5 LPA",
        demand: "High",
        keySoftware: ["Oracle Argus Safety", "MedDRA v27.0", "WHO-DD"],
      },
      {
        title: "Medical Coder (CPC Certified)",
        roleSlug: "medical-coder",
        courseSlug: "medical-coding",
        whyFit: "Anatomy & pathology coursework enables fast mastery of ICD-10-CM diagnosis & CPT surgical coding.",
        entrySalary: "₹3.6 LPA – ₹5.8 LPA",
        demand: "High",
        keySoftware: ["ICD-10-CM", "CPT", "HCPCS Level II"],
      },
      {
        title: "Clinical Data Associate (CDM)",
        roleSlug: "clinical-data-coordinator",
        courseSlug: "clinical-data-management",
        whyFit: "Understanding trial protocols helps design clean eCRFs and manage query resolutions.",
        entrySalary: "₹4.0 LPA – ₹5.5 LPA",
        demand: "High",
        keySoftware: ["Medidata Rave", "Veeva Vault", "CDASH"],
      },
      {
        title: "Regulatory Affairs Associate",
        roleSlug: "regulatory-affairs-associate",
        courseSlug: "regulatory-affairs",
        whyFit: "Pharmaceutical chemistry & pharmaceutics grounding supports Module 1-5 eCTD compilation.",
        entrySalary: "₹4.0 LPA – ₹6.0 LPA",
        demand: "Moderate",
        keySoftware: ["eCTDmanager", "Veeva RIM", "Sugam CDSCO"],
      },
    ],
    nonCoreOptions: [
      "Clinical Trial CRA Monitoring",
      "Medical Writing & Narrative Authoring",
      "Healthcare Business Analytics (SQL + Power BI)",
      "Pharmacopoeial Monograph Compliance",
    ],
    faq: [
      {
        q: "Is Pharmacovigilance better than retail pharmacy for B.Pharm freshers?",
        a: "PV offers structured 5-day work weeks, office/hybrid environments in GCCs (Hyderabad, Bangalore, Pune), and 3x faster salary growth compared to retail pharmacy.",
      },
      {
        q: "Do I need a Master's degree (M.Pharm) to enter Clinical Data Management?",
        a: "No. Tier-1 CROs hire B.Pharm freshers for Clinical Data Associate roles provided they demonstrate practical EDC tool proficiency on platforms like Medidata Rave.",
      },
    ],
  },
  "after-pharmd": {
    slug: "after-pharmd",
    title: "Career Options After Pharm.D & M.Pharm (2026)",
    degreeName: "Doctor of Pharmacy (Pharm.D) & M.Pharm",
    headline: "Executive Pharmacovigilance, Clinical Research & Medical Writing Roles",
    description: "How Pharm.D and M.Pharm graduates transition into high-tier Signal Detection, Aggregate Reporting, Medical Writing, and Clinical Data Science roles.",
    metaDescription: "Pharm.D & M.Pharm career pathways in 2026. Transition into Signal Detection, Medical Writing, Regulatory Affairs & Clinical SAS starting ₹4.5-8.0 LPA.",
    recommendedRoles: [
      {
        title: "Aggregate Reporting Associate",
        roleSlug: "drug-safety-associate",
        courseSlug: "pharmacovigilance",
        whyFit: "Deep clinical pharmacology training allows authoring of complex PSUR, PBRER, and DSUR periodic safety reports.",
        entrySalary: "₹4.5 LPA – ₹7.5 LPA",
        demand: "High",
        keySoftware: ["Oracle Argus Safety", "MedDRA", "EudraVigilance"],
      },
      {
        title: "Medical Writer (Regulatory & Clinical)",
        roleSlug: "medical-writer",
        courseSlug: "regulatory-affairs",
        whyFit: "Doctoral clinical insight aligns perfectly with authoring Clinical Study Reports (ICH E3) & trial protocols.",
        entrySalary: "₹4.8 LPA – ₹7.2 LPA",
        demand: "High",
        keySoftware: ["EndNote", "PubMed", "ICH E3 Templates"],
      },
      {
        title: "Clinical SAS Programmer",
        roleSlug: "clinical-sas-programmer",
        courseSlug: "sas-clinical",
        whyFit: "Biostatistics modules enable fast mastery of Base SAS macro programming, SDTM mapping & ADaM dataset creation.",
        entrySalary: "₹4.5 LPA – ₹6.5 LPA",
        demand: "High",
        keySoftware: ["Base SAS 9.4", "PROC SQL", "Pinnacle 21"],
      },
    ],
    nonCoreOptions: [
      "Signal Detection & Disproportionality Mining",
      "EU QPPV Office Support & Compliance",
      "Medical Science Liaison (MSL)",
      "Global Regulatory Strategy",
    ],
    faq: [
      {
        q: "Why do Pharm.D graduates prefer Aggregate Reporting over basic ICSR triage?",
        a: "Aggregate reporting involves high-level scientific evaluation and authoring of PSURs/PBRERs, commanding higher entry starting salaries.",
      },
    ],
  },
  "life-sciences": {
    slug: "life-sciences",
    title: "Life Sciences & Biotech Careers in India (2026)",
    degreeName: "B.Sc / M.Sc Life Sciences & Biotechnology",
    headline: "Transition From Lab Academics to Global Healthcare Capability Centers",
    description: "A complete operational roadmap for B.Sc/M.Sc Biochemistry, Microbiology, Biotechnology, and Life Science graduates entering Medical Coding, PV, and CDM.",
    metaDescription: "Life Sciences & Biotech career options 2026. Breakdown of entry-level jobs in Medical Coding, Pharmacovigilance & CDM starting ₹3.5-5.5 LPA in India.",
    recommendedRoles: [
      {
        title: "Medical Coder (Outpatient & Specialty)",
        roleSlug: "medical-coder",
        courseSlug: "medical-coding",
        whyFit: "Strong background in human biology enables rapid decoding of medical documentation & ICD-10-CM code assignment.",
        entrySalary: "₹3.5 LPA – ₹5.5 LPA",
        demand: "High",
        keySoftware: ["ICD-10-CM", "CPT", "AAPC CPC"],
      },
      {
        title: "Clinical Data Associate",
        roleSlug: "clinical-data-coordinator",
        courseSlug: "clinical-data-management",
        whyFit: "Methodical lab research habits translate into thorough clinical trial data validation & query management.",
        entrySalary: "₹3.8 LPA – ₹5.2 LPA",
        demand: "High",
        keySoftware: ["Medidata Rave", "Veeva EDC", "CDASH"],
      },
    ],
    nonCoreOptions: [
      "Pharmacovigilance Data Entry & Triage",
      "Healthcare IT & Business Data Analytics",
      "Clinical Trial Site Coordination",
    ],
    faq: [
      {
        q: "Can B.Sc Biotechnology freshers get jobs in top CROs without a Pharmacy degree?",
        a: "Yes. Major employers like Optum, Omega, IQVIA, and Cognizant actively recruit B.Sc/M.Sc Life Science graduates for Medical Coding and CDM positions.",
      },
    ],
  },
};

export const Route = createFileRoute("/careers/$slug")({
  loader: async ({ params }) => {
    const pathway = DEGREE_PATHWAYS[params.slug];
    if (!pathway) throw notFound();
    return { pathway };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.pathway) return {};
    const { pathway } = loaderData;

    const seo = pageSeo({
      path: `/careers/${pathway.slug}`,
      title: `${pathway.title} · Arzon Global`,
      description: pathway.metaDescription,
    });

    return {
      meta: [{ title: `${pathway.title} · Arzon Global` }, ...seo.meta],
      links: seo.links,
    };
  },
  component: DegreePathwayComponent,
});

function DegreePathwayComponent() {
  const { pathway } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">
      {/* Top Header */}
      <div className="border-b border-stone-200 bg-white tone-light card-light py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-stone-700 hover:text-stone-900 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> ALL CAREER TRACKS
          </Link>
          <div className="font-mono text-[10px] text-stone-500 uppercase tracking-widest hidden sm:block">
            DEGREE-TO-ROLE CAREER ROADMAP
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="border-b border-stone-200 bg-white tone-light card-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-4 h-4 text-[#1B3F8B]" />
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">
              {pathway.degreeName} GRADUATES
            </span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
            {pathway.headline}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-700 leading-relaxed font-sans border-l-2 border-[#1B3F8B] pl-4">
            {pathway.description}
          </p>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Recommended Roles */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-300 pb-3">
            <h2 className="font-serif font-bold text-2xl text-stone-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#1B3F8B]" /> Recommended High-Growth Role Tracks
            </h2>
            <span className="font-mono text-[11px] font-bold text-stone-500">
              {pathway.recommendedRoles.length} MATCHING ROLES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pathway.recommendedRoles.map((role, idx) => (
              <div
                key={idx}
                className="bg-white tone-light card-light border border-stone-300 p-6 flex flex-col justify-between hover:border-[#1B3F8B] transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] font-bold text-[#1B3F8B] border border-stone-200 bg-stone-50 px-2 py-0.5 uppercase">
                      STARTING CTC: {role.entrySalary}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                      DEMAND: {role.demand.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-stone-900 mb-2">
                    {role.title}
                  </h3>

                  <p className="font-sans text-xs text-stone-700 leading-relaxed mb-4">
                    {role.whyFit}
                  </p>

                  <div className="pt-3 border-t border-stone-100">
                    <span className="font-mono text-[10px] text-stone-500 block uppercase mb-1">KEY SOFTWARE OPERATED:</span>
                    <div className="flex flex-wrap gap-1">
                      {role.keySoftware.map((sw, i) => (
                        <span key={i} className="font-mono text-[9px] text-stone-600 bg-stone-100 px-1.5 py-0.5">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                  <Link
                    to="/roles/$slug"
                    params={{ slug: role.roleSlug }}
                    className="font-mono text-xs font-bold text-stone-900 hover:text-[#1B3F8B] uppercase tracking-wider flex items-center gap-1"
                  >
                    ROLE COMPETENCY <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    to="/courses/$slug"
                    params={{ slug: role.courseSlug }}
                    className="font-mono text-xs font-bold text-[#1B3F8B] hover:underline uppercase tracking-wider flex items-center gap-1"
                  >
                    COHORT SYLLABUS <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Non-Core Options Dossier */}
        <section className="bg-white tone-light card-light border border-stone-300 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-2">
            <ShieldCheck className="w-4 h-4 text-[#1B3F8B]" /> Additional Non-Retail Career Opportunities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {pathway.nonCoreOptions.map((opt, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-stone-50 p-3 border border-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-sans text-xs text-stone-800 font-semibold">{opt}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        {pathway.faq.length > 0 && (
          <section className="bg-white tone-light card-light border border-stone-300 p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="font-serif font-bold text-xl text-stone-900 border-b border-stone-200 pb-2">
              Frequently Asked Career Questions
            </h2>
            <div className="space-y-4 pt-2">
              {pathway.faq.map((item, i) => (
                <div key={i} className="space-y-1">
                  <h3 className="font-sans text-sm font-bold text-stone-900">{item.q}</h3>
                  <p className="font-sans text-xs text-stone-700 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Diagnostic CTA */}
        <section className="bg-[#0B1325] text-white p-8 sm:p-10 border border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              CAREER ENGINE FIT TEST
            </span>
            <h3 className="font-serif font-bold text-2xl text-white">
              Unsure Which Track Best Fits Your Specific Subject Strengths?
            </h3>
            <p className="font-sans text-xs text-stone-300 max-w-xl">
              Take the 90-second Arzon diagnostic fit test. Evaluates 300+ live Tier-1 GCC job descriptions to calculate your personalized percentile match.
            </p>
          </div>

          <Link
            to="/career-engine/start"
            className="shrink-0 bg-white tone-light text-stone-900 hover:bg-stone-100 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-white"
          >
            START FIT TEST →
          </Link>
        </section>
      </main>
    </div>
  );
}
