import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, FileText, Compass, Sparkles, Building2 } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

export interface InternshipTrack {
  slug: string;
  title: string;
  domain: string;
  duration: string;
  format: string;
  supervision: string;
  deliverables: string[];
  eligibleDegrees: string[];
  keyTools: string[];
  certificateType: string;
  courseRoute: string;
}

export const INTERNSHIP_TRACKS: InternshipTrack[] = [
  {
    slug: "pharmacovigilance",
    title: "Pharmacovigilance Applied Capstone Internship",
    domain: "Drug Safety & PV",
    duration: "4 Weeks (Post 8-Week Training)",
    format: "Applied Remote / Hybrid Lab",
    supervision: "Practitioner Safety Lead Reviewed",
    deliverables: [
      "Process 50+ de-identified ICSR case safety reports in Oracle Argus",
      "Perform MedDRA medical dictionary coding & seriousness criteria evaluation",
      "Draft MedWatch 3500A & CIOMS-I narrative summaries for global compliance"
    ],
    eligibleDegrees: ["B.Pharm", "Pharm.D", "M.Pharm", "B.Sc/M.Sc Life Sciences"],
    keyTools: ["Oracle Argus Safety 8.2", "MedDRA 26.0", "E2B(R3) XML", "WHO-ART"],
    certificateType: "ISO 9001 Verifiable Applied Internship Credential",
    courseRoute: "/courses/pharmacovigilance"
  },
  {
    slug: "medical-coding",
    title: "Medical Coding & RCM Applied Internship",
    domain: "Healthcare Billing & RCM",
    duration: "4 Weeks (Post 8-Week Training)",
    format: "Applied Remote / Hybrid Lab",
    supervision: "AHIMA/AAPC Certified Auditor Reviewed",
    deliverables: [
      "Audit & code 100+ multi-specialty clinical charts (Inpatient & Outpatient)",
      "Assign ICD-10-CM diagnostic & CPT-4 procedural codes with appropriate modifiers",
      "Resolve claim query rejections and denial management scenarios"
    ],
    eligibleDegrees: ["B.Pharm", "Pharm.D", "B.Sc Life Sciences", "Biotechnology"],
    keyTools: ["ICD-10-CM 2026", "CPT 2026", "HCPCS Level II", "EncoderPro"],
    certificateType: "ISO 9001 Verifiable Medical Coding Internship Credential",
    courseRoute: "/courses/medical-coding"
  },
  {
    slug: "clinical-data-management",
    title: "Clinical Data Management (CDM) Capstone Internship",
    domain: "Clinical Operations",
    duration: "4 Weeks (Post 8-Week Training)",
    format: "Applied Remote / Hybrid Lab",
    supervision: "Lead Data Manager Reviewed",
    deliverables: [
      "Build eCRF data collection schemas in Medidata RAVE environment",
      "Perform data validation, discrepancy generation, and query resolution",
      "Execute database lock procedures and final clinical trial data audit"
    ],
    eligibleDegrees: ["B.Pharm", "M.Pharm", "B.Sc/M.Sc Life Sciences", "Biostatistics"],
    keyTools: ["Medidata RAVE", "Oracle InForm", "CDISC ODM", "Data Validation Rules"],
    certificateType: "ISO 9001 Verifiable CDM Internship Credential",
    courseRoute: "/courses/clinical-data-management"
  },
  {
    slug: "clinical-sas",
    title: "Clinical SAS Programming Capstone Internship",
    domain: "Healthcare Data Analytics",
    duration: "4 Weeks (Post 8-Week Training)",
    format: "Applied Remote / Hybrid Lab",
    supervision: "Senior Biostatistical Programmer Reviewed",
    deliverables: [
      "Convert raw clinical data into CDISC SDTM domain structures",
      "Create ADaM analysis datasets using PROC SQL and SAS Macros",
      "Generate FDA-standard Tables, Listings, and Figures (TLFs) for study reports"
    ],
    eligibleDegrees: ["M.Sc Life Sciences", "B.Tech Biotech", "M.Pharm", "Statistics"],
    keyTools: ["SAS Studio", "PROC SQL", "CDISC SDTM v1.7", "ADaM v2.1"],
    certificateType: "ISO 9001 Verifiable Clinical SAS Internship Credential",
    courseRoute: "/courses/healthcare-analytics"
  }
];

export const Route = createFileRoute("/internships/")({
  head: () => {
    const seo = pageSeo({
      path: "/internships",
      title: "Applied Healthcare Internships & Capstones · Arzon Global",
      description:
        "Applied capstone internships in Pharmacovigilance (Oracle Argus), Medical Coding (ICD-10), CDM (RAVE), and Clinical SAS. Aligned with ISO 9001 verifier.",
      image: "/og/internships.jpg",
    });
    return {
      meta: [{ title: "Applied Healthcare Internships & Capstones · Arzon Global" }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Arzon Global — Applied Internship Tracks",
            numberOfItems: INTERNSHIP_TRACKS.length,
            itemListElement: INTERNSHIP_TRACKS.map((t, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "EducationalOccupationalCredential",
                name: t.title,
                description: t.deliverables.join(". "),
                url: `https://www.arzoncareers.in/internships/${t.slug}`,
                credentialCategory: "Applied Internship",
              },
            })),
          }),
        },
      ],
    };
  },
  component: InternshipsIndexComponent,
});

function InternshipsIndexComponent() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24 relative overflow-hidden">
      {/* Background Dot Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B3F8B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />

      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white/95 tone-light backdrop-blur-md py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              ARZON APPLIED INTERNSHIP ARCHITECTURE
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Gain Practical Work Exposure{" "}
            <AnimatedGradientText className="font-serif italic font-bold">
              Before Entering Job Search
            </AnimatedGradientText>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed font-sans font-normal">
            Arzon internships are structured capstone modules where students process de-identified clinical safety files, audit medical charts, validate eCRF datasets, and write SAS data programs under trainer evaluation.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <Floating3dBadge duration={4} delay={0.2}>
              <span className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-[#1B3F8B] font-bold">
                APPLIED CAPSTONE DELIVERABLES
              </span>
            </Floating3dBadge>
            <span>·</span>
            <span>PUBLIC QR VERIFICATION (/verify)</span>
            <span>·</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
              ISO 9001 VERIFIABLE CREDENTIAL
            </span>
          </div>
        </div>
      </section>

      {/* Internship Tracks Grid */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INTERNSHIP_TRACKS.map((track) => (
            <Interactive3dCard
              key={track.slug}
              maxTilt={8}
              className="rounded-3xl border border-stone-300 bg-white/95 tone-light p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <Card3dLayer translateZ={25} className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                    {track.duration}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#8A6D1F]">
                    {track.domain}
                  </span>
                </Card3dLayer>

                <Card3dLayer translateZ={35}>
                  <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                    {track.title}
                  </h2>
                  <p className="text-xs text-stone-600 font-mono mt-1 font-bold">
                    Supervision: {track.supervision}
                  </p>
                </Card3dLayer>

                {/* Practical Deliverables */}
                <Card3dLayer translateZ={40} className="space-y-2 pt-3 border-t border-stone-200">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    CAPSTONE WORK DELIVERABLES
                  </span>
                  <ul className="space-y-1.5">
                    {track.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="text-xs text-stone-800 font-medium flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </Card3dLayer>

                {/* Software Tools */}
                <Card3dLayer translateZ={45} className="space-y-1.5 pt-2 border-t border-stone-200">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    SOFTWARE &amp; DATABASES USED
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {track.keyTools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded bg-stone-100/90 border border-stone-300 text-stone-900 text-xs font-mono font-bold shadow-2xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </Card3dLayer>
              </div>

              <Card3dLayer translateZ={50} className="pt-4 border-t border-stone-200 space-y-3">
                <Link
                  to={track.courseRoute as any}
                  className="inline-flex items-center justify-between w-full h-11 px-5 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-colors shadow-sm hover:shadow-md cursor-pointer"
                >
                  <span>Explore Training &amp; Internship Batch</span>
                  <ArrowRight className="h-4 w-4 text-slate-50" />
                </Link>

                <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span>Credential: {track.certificateType}</span>
                </div>
              </Card3dLayer>
            </Interactive3dCard>
          ))}
        </div>
      </section>

      {/* Transparency Disclaimer */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 z-10">
        <div className="rounded-2xl bg-white/90 tone-light border border-stone-300 p-6 space-y-3 shadow-md">
          <div className="flex items-center gap-2 text-stone-900 font-mono text-xs font-bold uppercase">
            <AlertCircle className="h-4 w-4 text-[#1B3F8B]" />
            <span>INTERNSHIP TRANSPARENCY &amp; RECOGNITION DISCLOSURE</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
            Arzon internships are structured applied practical learning modules where students complete verified case deliverables under evaluation. Each completion certificate carries a cryptographic unique ID, QR verifier, and public verification link at arzoncareers.in/verify. Completion does not guarantee employer hiring or selection.
          </p>
        </div>
      </section>
    </div>
  );
}
