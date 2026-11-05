import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  Building2,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Clock,
  ArrowRight,
  Phone,
  Compass,
  Bus,
  Train,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { ADDRESS, COUNSELLOR_PHONE_DISPLAY, NEXT_COHORT, waLink } from "@/components/landing/constants";
import { HyderabadCampusScheduler } from "@/components/locations/HyderabadCampusScheduler";

export const Route = createFileRoute("/locations/hyderabad")({
  head: () => {
    const seo = pageSeo({
      path: "/locations/hyderabad",
      title: "Hyderabad Healthcare Training & Career Hub · Arzon Global",
      description:
        "Hyderabad healthcare role training & internships in PV, Medical Coding, CDM & SAS. Madhapur campus aligned with HITEC City GCC hiring. Offline lab & hybrid.",
      image: "/og/about.jpg",
    });
    return {
      meta: [
        { title: "Hyderabad Healthcare Training & Career Hub · Arzon Global" },
        { name: "geo.region", content: "IN-TG" },
        { name: "geo.placename", content: "Hyderabad, Telangana, India" },
        { name: "geo.position", content: "17.4485;78.3908" },
        { name: "ICBM", content: "17.4485, 78.3908" },
        {
          name: "keywords",
          content:
            "pharmacovigilance course in hyderabad, medical coding training hyderabad, clinical data management hyderabad, clinical sas course hyderabad, hitec city life sciences jobs, madhapur healthcare training, arzon global hyderabad",
        },
        ...seo.meta,
      ],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["EducationalOrganization", "LocalBusiness"],
            name: "Arzon Global — Hyderabad Training Hub & Headquarters",
            description:
              "Role-focused healthcare training and practical internships in Madhapur, Hyderabad for Pharmacovigilance, Medical Coding, CDM, and Clinical SAS.",
            url: "https://arzoncareers.in/locations/hyderabad",
            telephone: COUNSELLOR_PHONE_DISPLAY,
            email: "info@arzonglobal.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: `${ADDRESS.street}, ${ADDRESS.area}`,
              addressLocality: ADDRESS.locality,
              addressRegion: ADDRESS.region,
              postalCode: ADDRESS.postalCode,
              addressCountry: ADDRESS.countryCode,
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 17.4485,
              longitude: 78.3908,
            },
            hasMap: ADDRESS.mapsUrl,
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "19:00",
              },
            ],
            priceRange: "₹₹",
            paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking",
            currenciesAccepted: "INR",
            areaServed: [
              { "@type": "City", name: "Hyderabad" },
              { "@type": "City", name: "Secunderabad" },
              { "@type": "AdministrativeArea", name: "Telangana" },
              { "@type": "AdministrativeArea", name: "Andhra Pradesh" },
              { "@type": "Country", name: "India" },
            ],
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
              {
                "@type": "ListItem",
                position: 3,
                name: "Hyderabad Hub",
                item: "https://arzoncareers.in/locations/hyderabad",
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
                name: "Where is the Arzon Global campus located in Hyderabad?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Arzon Global is located at 1st floor, S Chandra Reddy Towers, 100 Feet Rd, Ayyappa Society, Madhapur, Hyderabad, Telangana 500081 — 5 minutes from Madhapur Metro Station and 10 minutes from HITEC City Cyber Towers.",
                },
              },
              {
                "@type": "Question",
                name: "What courses and internships are offered at Arzon Hyderabad?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Arzon Global conducts role-readiness tracks in Pharmacovigilance (ICSR, Argus Safety, MedDRA), Medical Coding (ICD-10-CM, CPT, CPC Prep), Clinical Data Management (EDC, Oracle InForm, CDASH), and Clinical SAS Programming.",
                },
              },
              {
                "@type": "Question",
                name: "Which companies hire life sciences freshers in Hyderabad?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Over 14 major healthcare GCCs and CROs hire in Hyderabad including Novartis, IQVIA, Parexel, Cognizant Life Sciences, Access Healthcare, Tech Mahindra, Dr. Reddy's Laboratories, and Biological E.",
                },
              },
              {
                "@type": "Question",
                name: "Is training offline or online at the Hyderabad center?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Learners can select in-person offline workstation labs at our Madhapur campus, interactive live hybrid batches, or full online cohorts with recorded case drills.",
                },
              },
              {
                "@type": "Question",
                name: "What degrees qualify for healthcare training in Hyderabad?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Graduates of B.Pharm, M.Pharm, Pharm.D, MBBS, BDS, B.Sc and M.Sc in Biotechnology, Microbiology, Biochemistry, BAMS, BHMS, and allied life sciences are eligible.",
                },
              },
              {
                "@type": "Question",
                name: "What is the starting salary for healthcare freshers in Hyderabad?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Starting packages for entry-level Pharmacovigilance, Medical Coding, and CDM associates in Hyderabad range between ₹3.5 LPA and ₹5.5 LPA, benefiting from Hyderabad's low cost-of-living.",
                },
              },
            ],
          }),
        },
      ],
    };
  },
  component: HyderabadLocationComponent,
});

function HyderabadLocationComponent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const hyderabadFaqs = [
    {
      q: "Where is the Arzon Global campus located in Hyderabad?",
      a: "Arzon Global is located at 1st floor, S Chandra Reddy Towers, 100 Feet Rd, Ayyappa Society, Madhapur, Hyderabad, Telangana 500081 — 5 minutes from Madhapur Metro Station and 10 minutes from HITEC City Cyber Towers.",
    },
    {
      q: "What courses and internships are offered at Arzon Hyderabad?",
      a: "Arzon Global conducts role-readiness tracks in Pharmacovigilance (ICSR, Argus Safety, MedDRA), Medical Coding (ICD-10-CM, CPT, CPC Prep), Clinical Data Management (EDC, Oracle InForm, CDASH), and Clinical SAS Programming.",
    },
    {
      q: "Which companies hire life sciences freshers in Hyderabad?",
      a: "Over 14 major healthcare GCCs and CROs hire in Hyderabad including Novartis, IQVIA, Parexel, Cognizant Life Sciences, Access Healthcare, Tech Mahindra, Dr. Reddy's Laboratories, and Biological E.",
    },
    {
      q: "Is training offline or online at the Hyderabad center?",
      a: "Learners can select in-person offline workstation labs at our Madhapur campus, interactive live hybrid batches, or full online cohorts with recorded case drills.",
    },
    {
      q: "What degrees qualify for healthcare training in Hyderabad?",
      a: "Graduates of B.Pharm, M.Pharm, Pharm.D, MBBS, BDS, B.Sc and M.Sc in Biotechnology, Microbiology, Biochemistry, BAMS, BHMS, and allied life sciences are eligible.",
    },
    {
      q: "What is the starting salary for healthcare freshers in Hyderabad?",
      a: "Starting packages for entry-level Pharmacovigilance, Medical Coding, and CDM associates in Hyderabad range between ₹3.5 LPA and ₹5.5 LPA, benefiting from Hyderabad's low cost-of-living.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#081F38] font-sans pb-24">
      {/* Header Banner */}
      <section className="relative border-b border-stone-200 bg-white tone-light card-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-xs font-bold uppercase tracking-wider">
              <MapPin className="h-3.5 w-3.5 text-[#2563EB]" />
              HYDERABAD HEADQUARTERS &amp; TRAINING HUB · MADHAPUR
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
              LIVE BATCH: {NEXT_COHORT?.label ?? "UPCOMING"}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#081F38] tracking-tight leading-tight max-w-4xl">
            Healthcare Role Training &amp; Internships in Hyderabad
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed">
            Hyderabad is Asia&apos;s primary life sciences capital, housing 14+ major global capability centers (GCCs) and CROs across HITEC City, Gachibowli, and Shamirpet. Prepare directly for local industry hiring requirements with physical lab workstations and blended training.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-bold">
              HITEC CITY &amp; GACHIBOWLI ALIGNED
            </span>
            <span>&bull;</span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-bold">
              MADHAPUR METRO 500M
            </span>
            <span>&bull;</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md font-mono">
              ISO 9001:2015 VERIFIABLE CREDENTIAL
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Link
              to="/career-assessment"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <span>Take the free career assessment</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={ADDRESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-stone-300 bg-white tone-light card-light hover:bg-stone-50 text-[#081F38] text-xs sm:text-sm font-bold shadow-2xs transition-all"
            >
              <Compass className="h-4 w-4 text-[#2563EB]" />
              <span>Get Directions to Madhapur Center</span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Physical Campus & Location Card */}
        <section className="rounded-3xl border border-stone-300 bg-white tone-light card-light p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                CAMPUS &amp; PRACTICAL LAB
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#081F38] mt-1">
                Arzon Global Madhapur Learning Center
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
                Walk-in diagnostics, offline practical simulation workstations, and mock audit suites.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={waLink("Hi Arzon Hyderabad, I would like to visit the Madhapur campus for career guidance.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Talk to a counsellor</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <MapPin className="h-4 w-4 text-[#2563EB]" />
                <span>Address</span>
              </div>
              <p className="text-xs text-stone-700 font-sans leading-relaxed">
                {ADDRESS.street}, {ADDRESS.area}, {ADDRESS.locality}, {ADDRESS.city}, {ADDRESS.region} {ADDRESS.postalCode}
              </p>
              <p className="font-mono text-[11px] text-stone-500 pt-1">
                Landmark: Near YSR Statue / Ayyappa Society Circle
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <Train className="h-4 w-4 text-[#2563EB]" />
                <span>Transit Connectivity</span>
              </div>
              <ul className="text-xs text-stone-700 space-y-1 font-sans">
                <li>&bull; <strong>Metro:</strong> Madhapur Metro (Blue Line) — 700m (5 min walk)</li>
                <li>&bull; <strong>Metro:</strong> Durgam Cheruvu Metro — 1 km</li>
                <li>&bull; <strong>HITEC City Cyber Towers:</strong> 1.5 km (5 min auto)</li>
                <li>&bull; <strong>Gachibowli Bio-Corridor:</strong> 4 km (12 mins)</li>
              </ul>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <Clock className="h-4 w-4 text-[#2563EB]" />
                <span>Hours &amp; Helpline</span>
              </div>
              <p className="text-xs text-stone-700 font-sans">
                <strong>Monday &ndash; Saturday:</strong> 9:00 AM &ndash; 7:00 PM IST
              </p>
              <p className="text-xs text-stone-700 font-sans">
                <strong>Helpline:</strong> {COUNSELLOR_PHONE_DISPLAY}
              </p>
              <div className="pt-1">
                <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Open for Walk-In Career Diagnostics
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Campus Walk-In & Demo Slot Booking */}
        <section>
          <HyderabadCampusScheduler />
        </section>

        {/* Local Industry Ecosystem & 5 Hyderabad Corridors */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              HYDERABAD BIO-PHARMA &amp; GCC HUBS
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#081F38] mt-1">
              The 5 Life Sciences Hiring Corridors in Hyderabad
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
              Top global capability centers, CRO campuses, and pharmaceutical MNCs operating across Hyderabad metros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "HITEC City & Cyber Towers Corridor",
                distance: "1.2 km from Center",
                employers: "Novartis GCC, IQVIA, Cognizant Life Sciences, Tech Mahindra Health",
                roles: "ICSR Processing, Aggregate Safety Reports, Clinical Data Management",
                note: "Asia's densest concentration of pharmaceutical GCCs and safety databases.",
              },
              {
                title: "Gachibowli & Financial District",
                distance: "4 km from Center",
                employers: "Access Healthcare, Parexel, Optum, AGS Health, Wipro Health",
                roles: "US Inpatient Medical Coding, CPC Audits, Clinical Trial Operations",
                note: "Premier revenue cycle management and trial monitoring headquarters.",
              },
              {
                title: "Raidurg & Knowledge City",
                distance: "2.5 km from Center",
                employers: "Multinational Safety Units, Global CRO Delivery Centers",
                roles: "Signal Evaluation, Benefit-Risk Analysis, Medical Writing",
                note: "Modern corporate towers running international clinical regulatory filings.",
              },
              {
                title: "Bollaram, Bachupally & Miyapur",
                distance: "14 km from Center",
                employers: "Dr. Reddy's Laboratories, Aurobindo, Hetero Labs, MSN Laboratories",
                roles: "Regulatory Affairs (eCTD Dossiers), QA/QC, Bio-equivalence Monitoring",
                note: "India's largest domestic pharma formulation export cluster.",
              },
              {
                title: "Genome Valley & Shamirpet",
                distance: "35 km from Center",
                employers: "Bharat Biotech, Biological E, Indian Immunologicals, Lonza",
                roles: "Clinical Vaccine Trials, Pre-clinical Monitoring, Biologics Safety",
                note: "World-renowned 200+ company biotech corridor.",
              },
              {
                title: "Madhapur Practical Campus Hub",
                distance: "On-Site (Ayyappa Society)",
                employers: "Arzon Global Dedicated Practical Training & Simulation Labs",
                roles: "Safety Database Case Practice, Coding Encoders, EDC Form Validation",
                note: "Dedicated learner workstations with real ICH guidelines and mock cases.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200 bg-white tone-light card-light p-5 space-y-3 shadow-xs hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[#081F38] font-serif font-bold text-base">
                    <Building2 className="h-4 w-4 text-[#2563EB] shrink-0" />
                    <span>{item.title}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {item.distance}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block">KEY EMPLOYERS</span>
                  <p className="text-xs font-semibold text-stone-800 font-sans">{item.employers}</p>
                </div>

                <div className="space-y-1 pt-1 border-t border-stone-100">
                  <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block">ROLES HIRED</span>
                  <p className="text-[11px] text-stone-600 font-sans">{item.roles}</p>
                </div>

                <p className="text-[11px] text-stone-500 italic pt-1 border-t border-stone-100">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Hyderabad Strategic Role Tracks */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              ROLE CURRICULUM
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#081F38] mt-1">
              Role Preparation Tracks Offered in Hyderabad
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
              Select a specialized track to explore course curriculum, industry software tools, and practical internship structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Pharmacovigilance Training Hyderabad",
                slug: "pharmacovigilance",
                tools: "Enterprise Safety Database, Standardized Medical Coding, E2B(R3), CIOMS",
                startingCtc: "₹3.5L – ₹5.5L",
                blurb: "Learn ICSR case processing, medical triage, and adverse event reporting for Hyderabad GCC hiring.",
              },
              {
                title: "Medical Coding Training Hyderabad",
                slug: "medical-coding",
                tools: "ICD-10-CM, CPT 2026, HCPCS, Clinical Encoders, Optum360",
                startingCtc: "₹3.5L – ₹4.8L",
                blurb: "Master diagnostic and procedural coding for US healthcare revenue cycle companies in Gachibowli.",
              },
              {
                title: "Clinical Data Management (CDM) Hyderabad",
                slug: "clinical-data-management",
                tools: "Electronic Data Capture (EDC), Oracle InForm, eCRF Validation, CDASH",
                startingCtc: "₹3.8L – ₹5.2L",
                blurb: "Hands-on training in electronic case report forms, data validation, and discrepancy management.",
              },
            ].map((track, i) => (
              <div
                key={i}
                className="rounded-2xl border border-stone-200 bg-white tone-light card-light p-6 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2563EB] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full inline-block">
                      HYDERABAD BATCH
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {track.startingCtc}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#081F38]">
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
                    className="inline-flex items-center justify-between w-full h-10 px-4 rounded-xl bg-[#081F38] hover:bg-[#2563EB] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="h-3.5 w-3.5 text-white" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hyderabad Living & Cost of Living Guide for Outstation Candidates */}
        <section className="rounded-3xl border border-stone-200 bg-white tone-light card-light p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                RELOCATION &amp; AFFORDABILITY INDEX
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#081F38] mt-1">
                Relocating to Hyderabad: Cost of Living vs Other Indian Metros
              </h2>
            </div>
            <Link
              to="/tools/cost-calculator"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#081F38] font-mono text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              <span>Cost Calculator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="font-mono text-xs font-bold text-[#2563EB]">1. PG RENT (MADHAPUR / KPHB)</span>
              <p className="font-serif text-2xl font-bold text-[#081F38]">₹8,000 – ₹12,000</p>
              <p className="text-xs text-stone-600 font-sans">
                Includes 3 meals, Wi-Fi, and laundry. 35% cheaper than equivalent PGs in Bengaluru or Mumbai.
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="font-mono text-xs font-bold text-[#2563EB]">2. METRO COMMUTE COST</span>
              <p className="font-serif text-2xl font-bold text-[#081F38]">₹1,200 – ₹1,800/mo</p>
              <p className="text-xs text-stone-600 font-sans">
                Hyderabad Metro Blue Line connects Miyapur, Ameerpet, and Madhapur directly to HITEC City.
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="font-mono text-xs font-bold text-emerald-800">3. NET SAVINGS RATE</span>
              <p className="font-serif text-2xl font-bold text-emerald-700">₹14,000 – ₹22,000/mo</p>
              <p className="text-xs text-stone-600 font-sans">
                Freshers earning ₹3.5–5.5 LPA in Hyderabad retain the highest disposable savings among all Indian Tier-1 hubs.
              </p>
            </div>
          </div>
        </section>

        {/* University Alignment */}
        <section className="rounded-3xl border border-stone-200 bg-white tone-light card-light p-6 sm:p-8 shadow-xs space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            REGIONAL ACADEMIC ALIGNMENT
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#081F38]">
            Welcoming Pharmacy &amp; Life Science Graduates Across Telangana &amp; AP
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed max-w-3xl">
            Arzon prepares students from Osmania University, JNTUH, Kakatiya University, BITS Pilani Hyderabad, Andhra University, Sri Venkateswara University, Sultan-ul-Uloom College of Pharmacy, Anurag University, Geethanjali, Mallareddy, VIPER, and all PCI/AICTE recognized colleges for Tier-1 multinational employment.
          </p>
        </section>

        {/* FAQ Section with Accordion */}
        <section className="space-y-4">
          <div className="border-b border-stone-200 pb-3">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#081F38] mt-1">
              Hyderabad Healthcare Career &amp; Training FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {hyderabadFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200 bg-white tone-light card-light overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
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
              START YOUR HEALTHCARE CAREER IN HYDERABAD
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Assess your role readiness for Hyderabad&apos;s leading GCCs.
            </h2>
            <p className="text-sm text-stone-300 font-sans leading-relaxed">
              Take the free 10-minute diagnostic to determine your fit for Pharmacovigilance, Medical Coding, or Clinical Data Management in Hyderabad.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/career-assessment"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold shadow-sm transition-all"
            >
              <span>Take the free career assessment</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={waLink("Hi Arzon Hyderabad, I want to talk to a counsellor regarding healthcare careers in Hyderabad.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-stone-600 bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-all"
            >
              <Phone className="h-4 w-4" />
              <span>Talk to a counsellor</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
