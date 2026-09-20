import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Building2, TrendingUp, CheckCircle2, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/locations/hyderabad")({
  head: () => {
    const seo = pageSeo({
      path: "/locations/hyderabad",
      title: "Hyderabad Healthcare & Life Science Training Hub · Arzon Global",
      description:
        "Role-focused training and applied internships in Hyderabad for Pharmacovigilance, Medical Coding, CDM, and Clinical SAS. Aligned with HITEC City & Gachibowli GCC hiring.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "Hyderabad Healthcare & Life Science Training Hub · Arzon Global" }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Arzon Global — Hyderabad Training Hub",
            url: "https://www.arzoncareers.in/locations/hyderabad",
            location: {
              "@type": "Place",
              name: "HITEC City & Gachibowli Life Sciences Corridor",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
            },
          }),
        },
      ],
    };
  },
  component: HyderabadLocationComponent,
});

function HyderabadLocationComponent() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">
      {/* Header Banner */}
      <section className="relative border-b border-stone-200 bg-white tone-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              HYDERABAD HEALTHCARE CAREER HUB
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Healthcare Role Training &amp; Internships in Hyderabad
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed">
            Hyderabad is Asia&apos;s primary life sciences capital, housing 14+ major global capability centers (GCCs) and CROs across HITEC City, Gachibowli, and Shamirpet. Prepare directly for local industry hiring requirements.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-bold">
              HITEC CITY &amp; GACHIBOWLI ALIGNED
            </span>
            <span>&bull;</span>
            <span>BLENDED &amp; HYBRID DELIVERY</span>
            <span>&bull;</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md font-mono">
              ISO 9001 VERIFIABLE CREDENTIAL
            </span>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Local Industry Ecosystem */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              EMPLOYER CLUSTER
            </p>
            <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              Hyderabad Life Sciences Hiring Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
              Top global capability centers and pharmaceutical MNCs operating major drug safety and clinical data operations in Hyderabad.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { company: "Novartis GCC", hub: "HITEC City", roles: "PV, CSR Writing, Signal Eval" },
              { company: "Cognizant Healthcare", hub: "Gachibowli", roles: "ICSR Processing, CDM, Medical Coding" },
              { company: "Accenture Life Sciences", hub: "Raidurg", roles: "PV Safety, MedDRA Coding" },
              { company: "Parexel International", hub: "HITEC City", roles: "Clinical SAS, Monitoring, Regulatory" },
              { company: "IQVIA India", hub: "Gachibowli", roles: "eCRF Validation, CDM, Biostats" },
              { company: "Wipro Healthcare", hub: "Financial District", roles: "US Medical Coding, Claims Audit" },
              { company: "Dr. Reddy's Labs", hub: "Shamirpet / Bachupally", roles: "RA, Dossier Submissions, PV" },
              { company: "Biological E.", hub: "Shamirpet", roles: "Quality Assurance, Regulatory" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-stone-200 bg-white tone-light p-4 space-y-2 shadow-xs hover:border-stone-300 transition-all"
              >
                <div className="flex items-center gap-1.5 text-stone-900 font-serif font-bold text-sm">
                  <Building2 className="h-4 w-4 text-[#1B3F8B] shrink-0" />
                  <span>{item.company}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#8A6D1F] bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block w-fit">
                    {item.hub}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 font-sans mt-1">
                  {item.roles}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Hyderabad Strategic Role Tracks */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Role Preparation Tracks Offered in Hyderabad
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
              Select a specialized track to view course syllabus, tool coverage, and internship structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Pharmacovigilance Training Hyderabad",
                slug: "pharmacovigilance",
                tools: "Oracle Argus Safety 8.2, MedDRA 26.0, E2B(R3)",
                startingCtc: "₹3.8L – ₹5.5L",
                blurb: "Learn ICSR case processing, medical triage, and adverse event reporting for Hyderabad GCC hiring."
              },
              {
                title: "Medical Coding Training Hyderabad",
                slug: "medical-coding",
                tools: "ICD-10-CM, CPT 2026, EncoderPro, Optum360",
                startingCtc: "₹3.5L – ₹4.8L",
                blurb: "Master diagnostic and procedural coding for US healthcare revenue cycle companies in Gachibowli."
              },
              {
                title: "Clinical Data Management (CDM) Hyderabad",
                slug: "clinical-data-management",
                tools: "Medidata RAVE, Oracle InForm, eCRF Validation",
                startingCtc: "₹3.8L – ₹5.0L",
                blurb: "Hands-on training in electronic case report forms, data validation, and discrepancy management."
              }
            ].map((track, i) => (
              <div
                key={i}
                className="rounded-xl border border-stone-200 bg-white tone-light p-6 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 border border-blue-100 px-2.5 py-0.5 rounded inline-block">
                      HYDERABAD BATCH
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      {track.title}
                    </h3>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">
                      {track.blurb}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-stone-100 space-y-1">
                    <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block">SOFTWARE &amp; TOOLS</span>
                    <p className="font-mono text-xs font-bold text-stone-900">{track.tools}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <Link
                    to={`/courses/${track.slug}` as any}
                    className="inline-flex items-center justify-between w-full h-10 px-4 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-50" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hyderabad Living & Opportunity Cost Calculator Callout */}
        <section className="rounded-2xl bg-white tone-light border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                HYDERABAD RELOCATION &amp; PREPARATION COST MODEL
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Calculate Relocation &amp; PG Expenses in Hyderabad
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                Estimate PG rent, food, transport, and course outlays when relocating to Hyderabad for career preparation.
              </p>
            </div>
            <Link
              to="/tools/cost-calculator"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs"
            >
              <span>Launch Calculator</span>
              <ArrowRight className="h-4 w-4 text-slate-50" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
