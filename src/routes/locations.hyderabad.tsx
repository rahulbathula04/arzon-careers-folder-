import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Building2, TrendingUp, CheckCircle2, ShieldCheck, Clock, ArrowRight, Phone, Compass, Download } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

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
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24 relative overflow-hidden">
      {/* Background Dot Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B3F8B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />

      {/* Header Banner */}
      <section className="relative border-b border-stone-200 bg-white/95 tone-light backdrop-blur-md py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              HYDERABAD HEALTHCARE CAREER HUB
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Healthcare Role Training &amp; Internships in{" "}
            <AnimatedGradientText className="font-serif italic font-bold">
              Hyderabad
            </AnimatedGradientText>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed">
            Hyderabad is Asia's primary life sciences capital, housing 14+ major global capability centers (GCCs) and CROs in HITEC City, Gachibowli, and Shamirpet. Prepare directly for local industry hiring.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <Floating3dBadge duration={4} delay={0.2}>
              <span className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-[#1B3F8B] font-bold">
                HITEC CITY &amp; GACHIBOWLI ALIGNED
              </span>
            </Floating3dBadge>
            <span>·</span>
            <span>BLENDED &amp; HYBRID DELIVERY</span>
            <span>·</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-mono">
              ISO 9001 VERIFIABLE CREDENTIAL
            </span>
          </div>
        </div>
      </section>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12 z-10">
        {/* Local Industry Ecosystem */}
        <section className="space-y-6">
          <div className="border-b border-stone-300 pb-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
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
              <Interactive3dCard
                key={idx}
                maxTilt={6}
                className="rounded-2xl border border-stone-300 bg-white/95 tone-light p-4 space-y-2 shadow-2xs hover:shadow-md transition-all"
              >
                <Card3dLayer translateZ={20} className="flex items-center gap-1.5 text-stone-900 font-serif font-bold text-sm">
                  <Building2 className="h-4 w-4 text-[#1B3F8B] shrink-0" />
                  <span>{item.company}</span>
                </Card3dLayer>
                <Card3dLayer translateZ={30}>
                  <span className="font-mono text-[10px] font-bold text-[#8A6D1F] bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block w-fit">
                    {item.hub}
                  </span>
                </Card3dLayer>
                <Card3dLayer translateZ={35}>
                  <p className="text-[11px] text-stone-600 font-sans mt-1">
                    {item.roles}
                  </p>
                </Card3dLayer>
              </Interactive3dCard>
            ))}
          </div>
        </section>

        {/* Hyderabad Strategic Role Tracks */}
        <section className="space-y-6">
          <div className="border-b border-stone-300 pb-3">
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
              <Interactive3dCard
                key={i}
                maxTilt={8}
                className="rounded-3xl border border-stone-300 bg-white/95 tone-light p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <Card3dLayer translateZ={25}>
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full inline-block">
                      HYDERABAD BATCH
                    </span>
                  </Card3dLayer>
                  <Card3dLayer translateZ={35}>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      {track.title}
                    </h3>
                    <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1">
                      {track.blurb}
                    </p>
                  </Card3dLayer>
                  <Card3dLayer translateZ={40} className="pt-2 border-t border-stone-200 space-y-1">
                    <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block">SOFTWARE &amp; TOOLS</span>
                    <p className="font-mono text-xs font-bold text-stone-900">{track.tools}</p>
                  </Card3dLayer>
                </div>

                <Card3dLayer translateZ={45}>
                  <Link
                    to={`/courses/${track.slug}` as any}
                    className="inline-flex items-center justify-between w-full h-10 px-4 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-colors shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="h-4 w-4 text-slate-50" />
                  </Link>
                </Card3dLayer>
              </Interactive3dCard>
            ))}
          </div>
        </section>

        {/* Hyderabad Living & Opportunity Cost Calculator Callout */}
        <section className="rounded-3xl bg-white/95 tone-light border border-stone-300 p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                HYDERABAD RELOCATION &amp; PREPARATION COST MODEL
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Calculate Relocation &amp; PG Expenses in Hyderabad
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 font-sans max-w-2xl mt-1">
                Estimate PG rent, food, transport, and course outlays when relocating to Hyderabad for career preparation.
              </p>
            </div>
            <Link
              to="/tools/cost-calculator"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-sm hover:shadow-md shrink-0 cursor-pointer"
            >
              <span>Launch Cost Calculator</span>
              <ArrowRight className="h-4 w-4 text-slate-50" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
