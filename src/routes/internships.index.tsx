import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, FileText, ChevronRight } from "lucide-react";
import { pageSeo } from "@/lib/seo";

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
    domain: "Biostatistics & SAS",
    duration: "4 Weeks (Post 8-Week Training)",
    format: "Applied Remote / Hybrid Lab",
    supervision: "Senior Statistical Programmer Reviewed",
    deliverables: [
      "Generate CDISC SDTM & ADaM standard analysis datasets from raw trial data",
      "Produce Tables, Listings, and Figures (TLFs) using PROC REPORT and PROC TABULATE",
      "Validate clinical study reports (CSR) against statistical analysis plans (SAP)"
    ],
    eligibleDegrees: ["B.Pharm", "M.Pharm", "B.Sc/M.Sc Statistics", "Life Sciences"],
    keyTools: ["Base SAS 9.4", "SAS/STAT", "SAS/GRAPH", "CDISC SDTM/ADaM"],
    certificateType: "ISO 9001 Verifiable Clinical SAS Internship Credential",
    courseRoute: "/courses/clinical-sas"
  }
];

export const Route = createFileRoute("/internships/")({
  head: () => {
    const seo = pageSeo({
      path: "/internships",
      title: "Applied Healthcare Capstone Internships · Arzon Global",
      description:
        "Gain verified practical experience before job applications. 4-week applied capstone internships in Pharmacovigilance, Medical Coding, CDM, and SAS.",
      image: "/og/internships.jpg",
    });
    return {
      meta: [{ title: "Applied Healthcare Capstone Internships · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: InternshipsIndexComponent,
});

function InternshipsIndexComponent() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">
      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white tone-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              ARZON APPLIED INTERNSHIP ARCHITECTURE
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Gain Practical Work Exposure Before Entering Job Search
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed font-sans font-normal">
            Arzon internships are structured capstone modules where students process de-identified clinical safety files, audit medical charts, validate eCRF datasets, and write SAS data programs under trainer evaluation.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-bold">
              APPLIED CAPSTONE DELIVERABLES
            </span>
            <span>&bull;</span>
            <span>PUBLIC QR VERIFICATION (/verify)</span>
            <span>&bull;</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
              ISO 9001 VERIFIABLE CREDENTIAL
            </span>
          </div>
        </div>
      </section>

      {/* Internship Tracks Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INTERNSHIP_TRACKS.map((track) => (
            <div
              key={track.slug}
              className="rounded-xl border border-stone-200 bg-white tone-light p-6 sm:p-8 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 border border-blue-100 px-2.5 py-0.5 rounded">
                    {track.duration}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#8A6D1F]">
                    {track.domain}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                    {track.title}
                  </h2>
                  <p className="text-xs text-stone-500 font-mono mt-1 font-bold">
                    Supervision: {track.supervision}
                  </p>
                </div>

                {/* Practical Deliverables */}
                <div className="space-y-2 pt-3 border-t border-stone-100">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    CAPSTONE WORK DELIVERABLES
                  </span>
                  <ul className="space-y-1.5">
                    {track.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="text-xs text-stone-700 font-medium flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Software Tools */}
                <div className="space-y-1.5 pt-2 border-t border-stone-100">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    SOFTWARE &amp; DATABASES USED
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {track.keyTools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-800 text-xs font-mono font-bold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-3">
                <Link
                  to={track.courseRoute as any}
                  className="inline-flex items-center justify-between w-full h-10 px-4 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <span>Explore Track &amp; Capstone Batch</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-50" />
                </Link>

                <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span>Credential: {track.certificateType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Disclaimer */}
        <section className="rounded-2xl bg-white tone-light border border-stone-200 p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-stone-900 font-mono text-xs font-bold uppercase">
            <AlertCircle className="h-4 w-4 text-[#1B3F8B]" />
            <span>INTERNSHIP TRANSPARENCY &amp; RECOGNITION DISCLOSURE</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            Arzon internships are structured applied practical learning modules where students complete verified case deliverables under evaluation. Each completion certificate carries a cryptographic unique ID, QR verifier, and public verification link at arzoncareers.in/verify. Completion does not guarantee employer hiring or selection.
          </p>
        </section>
      </main>
    </div>
  );
}
