import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { ROLES_BY_SLUG } from "@/data/industry/roles";
import { CITIES, CITIES_BY_SLUG, findPayBand } from "@/data/industry/cities";
import { employersForRole } from "@/data/industry/employers";
import { pageSeo } from "@/lib/seo";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  GraduationCap,
  HelpCircle,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

/**
 * Programmatic city × role landing page. 16 cities × 7 roles = 112 long-tail
 * programmatic pages targeting high-intent queries like
 * "pharmacovigilance jobs Hyderabad salary" or "medical coding jobs Coimbatore".
 * Built with Arzon Home V2 design doctrine and verified JD intelligence.
 */
export const Route = createFileRoute("/industry/$role/$city")({
  loader: ({ params }) => {
    const role = ROLES_BY_SLUG[params.role];
    const city = CITIES_BY_SLUG[params.city];
    if (!role || !city) throw notFound();
    const band = findPayBand(role.pay, city);
    if (!band) throw notFound();
    const employersInCity = employersForRole(role.slug).filter((e) =>
      e.cities.some((c) => city.matchKeys.some((k) => c.toLowerCase() === k.toLowerCase())),
    );
    return { role, city, band, employers: employersInCity };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { role, city, band, employers } = loaderData;
    const title = `${role.shortName} Jobs in ${city.name} · Salary, Top Employers, 2026`;
    const description = `${role.name} compensation & hiring in ${city.name}: fresher ₹${band.fresher[0]}–${band.fresher[1]} LPA, mid ₹${band.midY3[0]}–${band.midY3[1]}, senior ₹${band.seniorY5[0]}–${band.seniorY5[1]} LPA. ${city.liveNote}`;
    const keywords = `${role.name} jobs ${city.name}, ${role.shortName} salary in ${city.name}, ${role.name} employers in ${city.name}, fresher ${role.shortName} jobs ${city.name}, healthcare careers ${city.name}`;
    const ps = pageSeo({
      path: `/industry/${params.role}/${params.city}`,
      title,
      description,
      ogType: "article",
    });

    const topEmployerNames = employers.slice(0, 4).map((e: any) => e.name).join(", ");

    return {
      meta: [
        { title },
        { name: "keywords", content: keywords },
        // Do not ask search engines to index a city page that cannot name any
        // role-matched local employers. These pages remain useful to users,
        // but the generic fallback copy is not a strong standalone search result.
        ...(employers.length === 0 ? [{ name: "robots", content: "noindex,follow" }] : []),
        ...ps.meta,
      ],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${role.name} in ${city.name} - 2026 Salary & Hiring Directory`,
            description,
            inLanguage: "en-IN",
            url: `https://arzoncareers.in/industry/${params.role}/${params.city}`,
            about: {
              "@type": "Occupation",
              name: role.name,
              occupationLocation: {
                "@type": "City",
                name: city.name,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: city.name,
                  addressCountry: "IN",
                },
              },
              estimatedSalary: {
                "@type": "MonetaryAmountDistribution",
                name: "Annual salary (INR)",
                currency: "INR",
                duration: "P1Y",
                minValue: band.fresher[0] * 100000,
                maxValue: band.leadY8[1] * 100000,
                median: ((band.midY3[0] + band.midY3[1]) / 2) * 100000,
              },
            },
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
                name: `What is the salary of a fresher ${role.name} in ${city.name}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `The starting salary for a fresher ${role.name} in ${city.name} typically ranges from ₹${band.fresher[0]} to ₹${band.fresher[1]} LPA based on JD aggregation across regional hiring.`,
                },
              },
              {
                "@type": "Question",
                name: `Which companies are hiring ${role.name} professionals in ${city.name}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Active employers hiring ${role.name} talent in ${city.name} include ${topEmployerNames || "leading regional pharma and life-sciences organizations"}.`,
                },
              },
              {
                "@type": "Question",
                name: `What qualifications are required for ${role.name} in ${city.name}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Eligible degrees for ${role.name} include ${role.who}. Candidates benefit from verifiable case processing and clinical workflow simulation.`,
                },
              },
              {
                "@type": "Question",
                name: `How does living in ${city.name} affect fresher savings in ${role.name}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `${city.costOfLivingNote}`,
                },
              },
            ],
          }),
        },
      ],
    };
  },
  component: CityRolePage,
  pendingComponent: () => (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-16 sm:px-6 tone-light card-light">
      <div className="mx-auto max-w-6xl animate-pulse space-y-8">
        <div className="h-4 w-48 rounded-full bg-[#E2E8F0]" />
        <div className="h-12 w-3/4 rounded-2xl bg-[#E2E8F0]" />
        <div className="h-6 w-2/3 rounded-xl bg-[#E2E8F0]" />
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="h-28 rounded-2xl bg-[#E2E8F0]" />
          <div className="h-28 rounded-2xl bg-[#E2E8F0]" />
          <div className="h-28 rounded-2xl bg-[#E2E8F0]" />
          <div className="h-28 rounded-2xl bg-[#E2E8F0]" />
        </div>
      </div>
    </div>
  ),
});

function CityRolePage() {
  const { role, city, band, employers } = Route.useLoaderData();

  const payStages = [
    {
      stage: "Fresher (Y0)",
      title: "Entry Associate / Trainee",
      range: band.fresher,
      barWidth: `${Math.min(100, (band.fresher[1] / band.leadY8[1]) * 100)}%`,
      desc: "Starting package for campus graduates with core domain competency.",
    },
    {
      stage: "Mid-Level (Y3)",
      title: "Specialist / QC Reviewer",
      range: band.midY3,
      barWidth: `${Math.min(100, (band.midY3[1] / band.leadY8[1]) * 100)}%`,
      desc: "Unlocked after 2–3 years of live case handling or trial audit experience.",
    },
    {
      stage: "Senior (Y5–6)",
      title: "Senior Associate / Lead",
      range: band.seniorY5,
      barWidth: `${Math.min(100, (band.seniorY5[1] / band.leadY8[1]) * 100)}%`,
      desc: "Ownership of high-complexity regulatory submissions, audits, or trial portfolios.",
    },
    {
      stage: "Leadership (Y8+)",
      title: "Delivery Manager / Principal",
      range: band.leadY8,
      barWidth: "100%",
      desc: "Cross-functional operations leadership, sponsor liaison, and audit defense.",
    },
  ];

  const faqs = [
    {
      q: `What is the realistic starting salary for a fresher in ${role.name} in ${city.name}?`,
      a: `In ${city.name}, starting pay for ${role.name} freshers typically ranges from ₹${band.fresher[0]} to ₹${band.fresher[1]} LPA. Candidates with verified hands-on tool proficiencies (such as ${role.skills.slice(0, 3).join(", ")}) and strong clinical documentation standards consistently benchmark near the upper end of the fresher band.`,
    },
    {
      q: `Which companies are hiring ${role.name} talent in ${city.name}?`,
      a: employers.length > 0
        ? `Leading employers hiring for ${role.name} in ${city.name} include ${employers.slice(0, 5).map((e: any) => e.name).join(", ")}. Both multinational CROs and specialized pharmaceutical facilities operate dedicated delivery teams in this corridor.`
        : `Hiring in ${city.name} is driven by regional clinical trial hubs, domestic formulation companies, and remote-first MNC CRO pods servicing European and US life-sciences sponsors.`,
    },
    {
      q: `What academic degrees qualify for ${role.name} positions?`,
      a: `Standard eligibility includes: ${role.who}. While degrees provide foundational biology and pharmacology knowledge, recruiters prioritize demonstrable case handling, adherence to regulatory standards, and verified procedural accuracy.`,
    },
    {
      q: `How does the cost of living in ${city.name} affect a fresher's take-home savings?`,
      a: `${city.costOfLivingNote} This living cost structure directly impacts monthly net savings, making ${city.name} an attractive destination for early-career healthcare professionals seeking an optimal income-to-expense ratio.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#081F38] relative selection:bg-[#2563EB]/10 selection:text-[#2563EB] tone-light card-light">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(37,99,235,0.06),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] mb-6"
        >
          <Link to="/" className="inline-flex items-center gap-1 hover:text-[#081F38] transition-colors">
            <Home className="h-3.5 w-3.5 text-[#94A3B8]" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3 w-3 text-[#CBD5E1]" />
          <Link to="/industry" className="hover:text-[#081F38] transition-colors">
            Industry
          </Link>
          <ChevronRight className="h-3 w-3 text-[#CBD5E1]" />
          <Link
            to="/industry/$role"
            params={{ role: role.slug }}
            className="hover:text-[#081F38] transition-colors"
          >
            {role.name}
          </Link>
          <ChevronRight className="h-3 w-3 text-[#CBD5E1]" />
          <span className="font-bold text-[#081F38]">{city.name}</span>
        </nav>

        {/* Hero Header Section */}
        <header className="rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden tone-light card-light">
          <div className="max-w-3xl">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1D4ED8] mb-4">
              <span className="relative flex h-2 w-2">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>{city.name} Capability Corridor · 2026 Workforce Benchmark</span>
            </div>

            <h1 className="font-grotesk text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#081F38] leading-tight">
              {role.name} Jobs & Salary in {city.name}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
              {city.liveNote}
            </p>

            {/* Quick Metadata Badges */}
            <div className="mt-6 flex flex-wrap gap-2.5 text-xs font-medium text-[#334155]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F1F5F9] px-3.5 py-1.5 shadow-2xs">
                <MapPin className="h-3.5 w-3.5 text-[#2563EB]" />
                <span>Hiring Density: <strong className="text-[#081F38] font-bold">{city.hiringDensity}</strong></span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F1F5F9] px-3.5 py-1.5 shadow-2xs">
                <TrendingUp className="h-3.5 w-3.5 text-[#10B981]" />
                <span>Market Demand: <strong className="text-[#081F38] font-bold">{role.demand}</strong></span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F1F5F9] px-3.5 py-1.5 shadow-2xs">
                <Briefcase className="h-3.5 w-3.5 text-[#7C3AED]" />
                <span>Mode: <strong className="text-[#081F38] font-bold">{role.workMode}</strong></span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F1F5F9] px-3.5 py-1.5 shadow-2xs">
                <Calendar className="h-3.5 w-3.5 text-[#64748B]" />
                <span>Verified: Q1 2026 JD Sample</span>
              </span>
            </div>
          </div>
        </header>

        {/* 4-Column Metric Stat Strip */}
        <section aria-label="Key Compensation Metrics" className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs tone-light card-light">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">Fresher Entry (Y0)</span>
              <span className="rounded-full bg-[#EEF6FF] p-1.5 text-[#2563EB]">
                <DollarSign className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-2 font-grotesk text-2xl sm:text-3xl font-extrabold text-[#081F38]">
              ₹{band.fresher[0]} – {band.fresher[1]} <span className="text-sm font-semibold text-[#64748B]">LPA</span>
            </p>
            <p className="mt-1 text-xs text-[#64748B]">Base starting offer across regional JDs</p>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs tone-light card-light">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">Mid Velocity (Y3)</span>
              <span className="rounded-full bg-[#ECFDF5] p-1.5 text-[#10B981]">
                <TrendingUp className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-2 font-grotesk text-2xl sm:text-3xl font-extrabold text-[#081F38]">
              ₹{band.midY3[0]} – {band.midY3[1]} <span className="text-sm font-semibold text-[#64748B]">LPA</span>
            </p>
            <p className="mt-1 text-xs text-[#64748B]">Specialist promotion band (+50% leap)</p>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs tone-light card-light">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">Senior Range (Y5–8)</span>
              <span className="rounded-full bg-[#F5F3FF] p-1.5 text-[#7C3AED]">
                <ShieldCheck className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-2 font-grotesk text-2xl sm:text-3xl font-extrabold text-[#081F38]">
              ₹{band.seniorY5[0]} – {band.leadY8[1]} <span className="text-sm font-semibold text-[#64748B]">LPA</span>
            </p>
            <p className="mt-1 text-xs text-[#64748B]">Team leadership & audit accountability</p>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs tone-light card-light">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">City Hiring Index</span>
              <span className="rounded-full bg-[#EFF6FF] p-1.5 text-[#2563EB]">
                <Building2 className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-2 font-grotesk text-2xl sm:text-3xl font-extrabold text-[#081F38]">
              {city.hiringDensity}
            </p>
            <p className="mt-1 text-xs text-[#64748B]">{employers.length} top employers profiled</p>
          </div>
        </section>

        {/* Section 1: Detailed Pay Bands Progression */}
        <section className="mt-10 rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm tone-light card-light">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E2E8F0] pb-5">
            <div>
              <h2 className="font-grotesk text-xl sm:text-2xl font-bold text-[#081F38]">
                Career Compensation Progression in {city.name}
              </h2>
              <p className="mt-1 text-sm text-[#64748B]">
                All compensation figures in INR Lakhs Per Annum (LPA). Derived from real job postings across Naukri, LinkedIn, and AmbitionBox.
              </p>
            </div>
            <span className="inline-flex self-start sm:self-auto rounded-full bg-[#F1F5F9] px-3 py-1 font-mono text-xs font-bold text-[#475569]">
              Annual CTC
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {payStages.map((stage) => (
              <div
                key={stage.stage}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 hover:border-[#2563EB]/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
                    {stage.stage}
                  </span>
                  <span className="font-grotesk text-lg sm:text-xl font-bold text-[#081F38]">
                    ₹{stage.range[0]} – {stage.range[1]} LPA
                  </span>
                </div>
                <h3 className="mt-1 font-grotesk text-sm font-semibold text-[#081F38]">
                  {stage.title}
                </h3>
                <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                  {stage.desc}
                </p>
                {/* Visual Scale Bar */}
                <div className="mt-4 h-2 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#2563EB]"
                    style={{ width: stage.barWidth }}
                  />
                </div>
              </div>
            ))}
          </div>

          {band.note && (
            <div className="mt-5 rounded-xl border border-[#BFDBFE]/60 bg-[#EFF6FF] p-3.5 text-xs text-[#1E40AF]">
              <strong>City Note:</strong> {band.note}
            </div>
          )}
        </section>

        {/* Section 2: Local Cost-of-Living & Fresh Take-Home Economics */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm tone-light card-light flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
                <Home className="h-4 w-4" />
                <span>Living Economics & Accommodation</span>
              </div>
              <h2 className="mt-2 font-grotesk text-xl font-bold text-[#081F38]">
                Cost of Living in {city.name}
              </h2>
              <p className="mt-3 text-sm text-[#475569] leading-relaxed">
                {city.costOfLivingNote}
              </p>
            </div>
            <div className="mt-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-4 text-xs text-[#64748B] space-y-2">
              <div className="flex justify-between font-medium">
                <span>Single PG / Shared Flat:</span>
                <span className="font-bold text-[#081F38]">₹6,000 – ₹14,000 / mo</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Key Employment Zones:</span>
                <span className="font-bold text-[#081F38]">{city.hubFor.slice(0, 2).join(", ")} hubs</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Fresher Disposable Savings:</span>
                <span className="font-bold text-[#10B981]">High to Very High</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm tone-light card-light flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
                <GraduationCap className="h-4 w-4" />
                <span>Hiring & Eligibility Reality</span>
              </div>
              <h2 className="mt-2 font-grotesk text-xl font-bold text-[#081F38]">
                Who Recruits in {city.name}?
              </h2>
              <p className="mt-3 text-sm text-[#475569] leading-relaxed">
                {role.whyHiring}
              </p>
            </div>
            <div className="mt-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-4 text-xs text-[#64748B]">
              <span className="font-semibold text-[#081F38] block mb-1">Eligible Degrees:</span>
              <p className="leading-relaxed">{role.who}</p>
            </div>
          </div>
        </section>

        {/* Section 3: Employers Hiring in City */}
        {employers.length > 0 && (
          <section className="mt-10 rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm tone-light card-light">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E2E8F0] pb-5">
              <div>
                <h2 className="font-grotesk text-xl sm:text-2xl font-bold text-[#081F38] inline-flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#2563EB]" /> Top Employers Hiring in {city.name}
                </h2>
                <p className="mt-1 text-sm text-[#64748B]">
                  Verified corporate campuses and clinical facilities actively recruiting {role.shortName} candidates in this corridor.
                </p>
              </div>
              <span className="inline-flex self-start sm:self-auto rounded-full bg-[#EFF6FF] px-3 py-1 font-mono text-xs font-bold text-[#1D4ED8]">
                {employers.length} Verified Firms
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {employers.map((e: any) => (
                <div
                  key={e.name}
                  className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 hover:border-[#2563EB]/40 hover:shadow-xs transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-grotesk text-base font-bold text-[#081F38]">{e.name}</p>
                    <span className="rounded-full bg-[#E2E8F0] px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#334155]">
                      {e.tier}
                    </span>
                  </div>
                  {e.typicalBand && (
                    <p className="mt-2 text-xs font-semibold text-[#2563EB]">
                      Entry CTC: {e.typicalBand}
                    </p>
                  )}
                  {e.note && (
                    <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                      {e.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Critical Tools & Competencies */}
        <section className="mt-10 rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm tone-light card-light">
          <div className="border-b border-[#E2E8F0] pb-5">
            <h2 className="font-grotesk text-xl sm:text-2xl font-bold text-[#081F38] inline-flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#2563EB]" /> Core Tools & Methodologies Required
            </h2>
            <p className="mt-1 text-sm text-[#64748B]">
              Top keywords and procedural frameworks evaluated during technical screenings in {city.name}.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {role.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#CBD5E1] bg-[#F1F5F9] px-4 py-2 text-xs font-semibold text-[#1E293B] shadow-2xs"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                {skill}
              </span>
            ))}
          </div>

          {role.certs && role.certs.length > 0 && (
            <div className="mt-6 border-t border-[#E2E8F0] pt-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] mb-3">
                High-Impact Certifications & Salary Lift
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {role.certs.map((c) => (
                  <div key={c.name} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs">
                    <p className="font-bold text-[#081F38]">{c.name}</p>
                    <p className="mt-1 font-semibold text-[#10B981]">{c.pays}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Section 5: Frequent City Questions (FAQs) */}
        <section className="mt-10 rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm tone-light card-light">
          <div className="border-b border-[#E2E8F0] pb-5">
            <h2 className="font-grotesk text-xl sm:text-2xl font-bold text-[#081F38] inline-flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[#2563EB]" /> Frequently Asked Questions · {role.name} in {city.name}
            </h2>
            <p className="mt-1 text-sm text-[#64748B]">
              Direct empirical answers to candidate queries regarding hiring requirements, salaries, and careers.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5"
              >
                <h3 className="font-grotesk text-base font-bold text-[#081F38]">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm text-[#475569] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Sister Cities Explorer */}
        <section className="mt-10 rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm tone-light card-light">
          <div className="border-b border-[#E2E8F0] pb-4">
            <h2 className="font-grotesk text-lg font-bold text-[#081F38]">
              {role.name} Salaries in Other Indian Hubs
            </h2>
            <p className="mt-1 text-xs text-[#64748B]">
              Explore verified compensation benchmarks across other Tier-1 and regional capability corridors.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {CITIES.filter((c) => c.slug !== city.slug).map((c) => (
              <Link
                key={c.slug}
                to="/industry/$role/$city"
                params={{ role: role.slug, city: c.slug }}
                className="inline-flex items-center gap-1 rounded-full border border-[#CBD5E1] bg-[#F8FAFC] px-3.5 py-1.5 text-xs font-semibold text-[#334155] hover:border-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#2563EB] transition-colors"
              >
                <MapPin className="h-3 w-3 text-[#64748B]" />
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 7: Home V2 Dark Closing Hero Banner */}
        <section
          aria-label="Career Diagnostic Call to Action"
          className="mt-14 rounded-3xl bg-[#0B1528] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-white/10"
        >
          {/* Ambient Royal Accent */}
          <div
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#2563EB]/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider"
              style={{ color: "#93C5FD" }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Arzon Career Engine Diagnostic</span>
            </span>

            <h2
              className="mt-4 font-grotesk text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight"
              style={{ color: "#FFFFFF" }}
            >
              Are you qualified for {role.name} roles in {city.name}?
            </h2>

            <p
              className="mt-3 text-sm sm:text-base leading-relaxed"
              style={{ color: "rgba(255, 255, 255, 0.85)" }}
            >
              Take the free 4-minute Arzon Career Engine assessment. Receive your verified ACRI readiness score, hiring archetype, and a personalized 5-year salary trajectory mapped to {city.name} employers.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/career-engine"
                data-cta="primary"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#1D4ED8] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Take the free career assessment</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/industry/$role"
                params={{ role: role.slug }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors"
                style={{ color: "#FFFFFF" }}
              >
                <span>Explore Full {role.shortName} Intelligence</span>
              </Link>
            </div>

            <div
              className="mt-6 flex flex-wrap gap-4 text-xs font-medium"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" /> 10,000+ candidates assessed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" /> Verified Indian JD benchmarks
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" /> Zero obligation diagnostic
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
