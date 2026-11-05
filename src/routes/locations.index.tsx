import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  ArrowRight,
  Building2,
  TrendingUp,
  Wallet,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { CITIES, type CityRegion } from "@/data/industry/cities";
import { employersForRole } from "@/data/industry/employers";

export const Route = createFileRoute("/locations/")({
  head: () => {
    const seo = pageSeo({
      path: "/locations",
      title: "Healthcare Career Hubs in India · 16 Metros · Arzon Global",
      description:
        "Explore 16 strategic healthcare career & training hubs across India. Salary trends, hiring density & GCC employers in Hyderabad, Bangalore, Pune & more.",
      image: "/og/about.jpg",
    });
    return {
      meta: [
        { title: "Healthcare Career Hubs in India · 16 Metros · Arzon Global" },
        { name: "geo.region", content: "IN" },
        { name: "geo.placename", content: "India" },
        {
          name: "keywords",
          content:
            "healthcare career hubs india, pharmacovigilance jobs india, medical coding cities india, clinical research hubs india, hyderabad life sciences gcc, bangalore cro companies, chennai medical coding",
        },
        ...seo.meta,
      ],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Strategic Healthcare & Life Science Career Hubs Across India",
            description:
              "Directory of 16 strategic Indian metropolitan and regional hubs for Pharmacovigilance, Medical Coding, Clinical Data Management, and Regulatory Affairs.",
            url: "https://arzoncareers.in/locations",
            inLanguage: "en-IN",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "India Healthcare Career Hubs",
            itemListElement: CITIES.map((city, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              item: {
                "@type": "Place",
                name: `${city.name} Healthcare & Life Sciences Hub`,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: city.name,
                  addressRegion: city.state,
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: city.latitude,
                  longitude: city.longitude,
                },
                url:
                  city.slug === "hyderabad"
                    ? "https://arzoncareers.in/locations/hyderabad"
                    : `https://arzoncareers.in/industry/pharmacovigilance/${city.slug}`,
              },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://arzoncareers.in/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Locations",
                item: "https://arzoncareers.in/locations",
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Which city is best for Pharmacovigilance careers in India?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Hyderabad and Bengaluru are India's premier Pharmacovigilance capitals. Hyderabad houses the Genome Valley bio-cluster and major GCCs (Novartis, IQVIA, Cognizant, Parexel), while offering the lowest cost of living among Tier-1 metros.",
                },
              },
              {
                "@type": "Question",
                name: "Which city is the medical coding capital of India?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Chennai and Coimbatore represent India's largest medical coding corridor, with companies like Omega Healthcare, Access Healthcare, and AGS Health hiring thousands of freshers annually, accompanied by expanding GCCs in Hyderabad.",
                },
              },
              {
                "@type": "Question",
                name: "Can freshers from Tier-2 and Tier-3 colleges get hired in Tier-1 GCCs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Major life sciences GCCs and CROs evaluate candidates based on verifiable competency in safety databases (Argus), clinical coding (ICD-10-CM), or EDC systems rather than college pedigree.",
                },
              },
              {
                "@type": "Question",
                name: "How do salaries compare across Indian healthcare hubs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Entry-level salaries across Tier-1 hubs (Hyderabad, Bengaluru, Mumbai, Pune, Chennai) range from ₹3.5 LPA to ₹6.5 LPA, with Hyderabad providing the highest net savings rate due to lower living expenses.",
                },
              },
            ],
          }),
        },
      ],
    };
  },
  component: LocationsIndexComponent,
});

type FilterZone = "All" | CityRegion;

function LocationsIndexComponent() {
  const [activeZone, setActiveZone] = useState<FilterZone>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const zones: FilterZone[] = [
    "All",
    "South India",
    "West India",
    "North India",
    "East India",
    "Central India",
  ];

  const filteredCities =
    activeZone === "All"
      ? CITIES
      : CITIES.filter((city) => city.region === activeZone);

  const panIndiaFaqs = [
    {
      q: "Which city is best for Pharmacovigilance careers in India?",
      a: "Hyderabad and Bengaluru are India's premier Pharmacovigilance capitals. Hyderabad houses the Genome Valley bio-cluster and major GCCs (Novartis, IQVIA, Cognizant, Parexel), while offering the lowest cost of living among Tier-1 metros.",
    },
    {
      q: "Which city is the medical coding capital of India?",
      a: "Chennai and Coimbatore represent India's largest medical coding corridor, with companies like Omega Healthcare, Access Healthcare, and AGS Health hiring thousands of freshers annually, accompanied by expanding GCCs in Hyderabad.",
    },
    {
      q: "Can freshers from Tier-2 and Tier-3 colleges get hired in Tier-1 GCCs?",
      a: "Yes. Major life sciences GCCs and CROs evaluate candidates based on verifiable competency in safety databases (Argus), clinical coding (ICD-10-CM), or EDC systems rather than college pedigree.",
    },
    {
      q: "How do salaries compare across Indian healthcare hubs?",
      a: "Entry-level salaries across Tier-1 hubs (Hyderabad, Bengaluru, Mumbai, Pune, Chennai) range from ₹3.5 LPA to ₹6.5 LPA, with Hyderabad providing the highest net savings rate due to lower living expenses.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#081F38] font-sans pb-24">
      {/* Header Banner */}
      <section className="border-b border-stone-200 bg-white tone-light card-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-xs font-bold uppercase tracking-wider">
              <MapPin className="h-3.5 w-3.5 text-[#2563EB]" />
              PAN-INDIA HEALTHCARE &amp; LIFE SCIENCES HUBS
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold">
              16 STRATEGIC METROS MAPPED
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#081F38] tracking-tight leading-tight max-w-4xl">
            Healthcare Career &amp; Training Hubs Across India
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed">
            India powers over 70% of global drug safety operations and offshore clinical data trials. Explore regional hiring density, cost of living metrics, and top pharmaceutical GCC employers across 16 metropolitan corridors.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-bold">
              510,000+ GCC ROLES NATIONWIDE
            </span>
            <span>&bull;</span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-bold">
              HYDERABAD HEADQUARTERS &amp; LABS
            </span>
            <span>&bull;</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md font-mono">
              REAL-TIME INDUSTRY SALARY BENCHMARKS
            </span>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* National Stats Strip */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-stone-200 bg-white tone-light card-light p-4 space-y-1 shadow-2xs">
            <span className="font-mono text-xs text-stone-500 uppercase font-bold">Total Hubs Mapped</span>
            <p className="font-serif text-3xl font-bold text-[#081F38]">16 Cities</p>
            <p className="text-[11px] text-stone-600 font-sans">Tier-1 &amp; Tier-2 bio-clusters</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white tone-light card-light p-4 space-y-1 shadow-2xs">
            <span className="font-mono text-xs text-stone-500 uppercase font-bold">Global Safety Work</span>
            <p className="font-serif text-3xl font-bold text-[#2563EB]">~70%</p>
            <p className="text-[11px] text-stone-600 font-sans">Processed by Indian CROs</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white tone-light card-light p-4 space-y-1 shadow-2xs">
            <span className="font-mono text-xs text-stone-500 uppercase font-bold">Fresher Package</span>
            <p className="font-serif text-3xl font-bold text-emerald-700">₹3.5–6.5L</p>
            <p className="text-[11px] text-stone-600 font-sans">Starting CTC range at L1</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white tone-light card-light p-4 space-y-1 shadow-2xs">
            <span className="font-mono text-xs text-stone-500 uppercase font-bold">Active GCC Employers</span>
            <p className="font-serif text-3xl font-bold text-[#081F38]">80+ MNCs</p>
            <p className="text-[11px] text-stone-600 font-sans">Novartis, IQVIA, Parexel &amp; more</p>
          </div>
        </section>

        {/* Zone Filter Tabs */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                REGIONAL CORRIDORS
              </p>
              <h2 className="font-serif text-2xl font-bold text-[#081F38] mt-1">
                Explore Life Sciences Hubs by Region
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-stone-100 border border-stone-200">
              {zones.map((zone) => (
                <button
                  key={zone}
                  type="button"
                  onClick={() => setActiveZone(zone)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                    activeZone === zone
                      ? "bg-[#081F38] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city) => {
              const isHq = city.slug === "hyderabad";
              return (
                <div
                  key={city.slug}
                  className={`rounded-3xl border bg-white tone-light card-light p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                    isHq
                      ? "border-[#2563EB] ring-2 ring-blue-100"
                      : "border-stone-200 hover:border-blue-300"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-stone-500 uppercase font-bold">
                        {city.state} &bull; {city.region}
                      </span>
                      {isHq ? (
                        <span className="font-mono text-[10px] font-bold text-blue-800 bg-blue-100/80 border border-blue-200 px-2 py-0.5 rounded-full">
                          NATIONAL HQ &amp; LAB
                        </span>
                      ) : (
                        <span
                          className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            city.hiringDensity === "Very High"
                              ? "text-emerald-800 bg-emerald-50 border-emerald-200"
                              : city.hiringDensity === "High"
                              ? "text-blue-800 bg-blue-50 border-blue-200"
                              : "text-amber-800 bg-amber-50 border-amber-200"
                          }`}
                        >
                          {city.hiringDensity} Density
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#081F38] flex items-center gap-2">
                        <span>{city.name}</span>
                        {isHq && (
                          <span className="h-2 w-2 rounded-full bg-[#2563EB] inline-block" />
                        )}
                      </h3>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">
                        {city.liveNote}
                      </p>
                    </div>

                    {/* Hub Specializations */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block">
                        CORE DOMAINS
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {city.hubFor.map((domain, i) => (
                          <span
                            key={i}
                            className="font-mono text-[11px] font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md"
                          >
                            {domain}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Cost of Living */}
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                      <div className="flex items-center gap-1.5 text-stone-700 font-mono text-[10px] font-bold uppercase">
                        <Wallet className="h-3 w-3 text-stone-500" />
                        <span>LIVING &amp; COMMUTE NOTE</span>
                      </div>
                      <p className="text-[11px] text-stone-600 font-sans leading-snug">
                        {city.costOfLivingNote}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
                    {isHq ? (
                      <Link
                        to="/locations/hyderabad"
                        className="inline-flex items-center justify-between w-full h-10 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                      >
                        <span>Explore Hyderabad Campus</span>
                        <ArrowRight className="h-3.5 w-3.5 text-white" />
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/industry/pharmacovigilance/${city.slug}` as any}
                          className="inline-flex items-center justify-between flex-1 h-9 px-3 rounded-lg bg-[#081F38] hover:bg-[#2563EB] text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
                        >
                          <span>PV Guide</span>
                          <ArrowRight className="h-3 w-3 text-white" />
                        </Link>
                        <Link
                          to={`/industry/medical-coding/${city.slug}` as any}
                          className="inline-flex items-center justify-between flex-1 h-9 px-3 rounded-lg border border-stone-300 hover:border-stone-400 bg-stone-50 hover:bg-stone-100 text-[#081F38] font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
                        >
                          <span>Coding Guide</span>
                          <ArrowRight className="h-3 w-3 text-stone-700" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pan-India FAQs */}
        <section className="space-y-4">
          <div className="border-b border-stone-200 pb-3">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#081F38] mt-1">
              Healthcare Career Hubs in India · FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {panIndiaFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200 bg-white tone-light card-light overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-base font-bold text-[#081F38] hover:text-[#2563EB] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-stone-400 shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180 text-[#2563EB]" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-700 font-sans leading-relaxed border-t border-stone-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="rounded-3xl bg-[#081F38] text-white p-8 sm:p-12 shadow-md space-y-6">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
              NATIONAL CAREER INTELLIGENCE PLATFORM
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Find the right healthcare role and city for your degree.
            </h2>
            <p className="text-sm text-stone-300 font-sans leading-relaxed">
              Whether you are looking to work in Hyderabad, Bengaluru, Chennai, Pune, or remotely, our 10-minute role readiness assessment maps your skills to current employer requirements.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/career-assessment"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold shadow-sm transition-all"
            >
              <span>Take the free career assessment</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
