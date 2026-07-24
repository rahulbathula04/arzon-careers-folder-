import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { CTAButton } from "@/components/landing/CTAButton";
import { ROLES_BY_SLUG } from "@/data/industry/roles";
import { CITIES_BY_SLUG, findPayBand } from "@/data/industry/cities";
import { employersForRole } from "@/data/industry/employers";
import { pageSeo } from "@/lib/seo";
import { ArrowRight, Building2, MapPin, TrendingUp } from "lucide-react";

/**
 * Programmatic city × role landing page. 6 cities × 6 roles = 36 long-tail
 * pages targeting queries like "pharmacovigilance jobs Hyderabad salary".
 * Built from existing role pay bands + city profiles, no separate data set.
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
    const { role, city, band } = loaderData;
    const title = `${role.shortName} jobs in ${city.name} · Salary, employers, 2026`;
    const description = `${role.name} pay in ${city.name}: fresher ₹${band.fresher[0]}–${band.fresher[1]} LPA, mid ₹${band.midY3[0]}–${band.midY3[1]}, senior ₹${band.seniorY5[0]}–${band.seniorY5[1]}. ${city.liveNote}`;
    const keywords = `${role.name} jobs ${city.name}, ${role.shortName} salary in ${city.name}, ${role.name} employers in ${city.name}, fresher ${role.shortName} jobs ${city.name}`;
    const ps = pageSeo({
      path: `/industry/${params.role}/${params.city}`,
      title,
      description,
      ogType: "article",
    });
    return {
      meta: [{ title }, { name: "keywords", content: keywords }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          // CollectionPage schema: this is a role × city career-profile page
          // (pay bands + employer list), not a specific live job. Using
          // JobPosting here previously caused Google rich-result errors
          // (missing datePosted, validThrough, single hiringOrganization).
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${role.name} in ${city.name} — salary & employers`,
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
                maxValue: band.seniorY5[1] * 100000,
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
                  text: `The starting salary for a fresher ${role.name} in ${city.name} typically ranges from ₹${band.fresher[0]} to ₹${band.fresher[1]} LPA.`,
                },
              },
              {
                "@type": "Question",
                name: `Which top companies are hiring ${role.name}s in ${city.name}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Top employers hiring ${role.name}s in ${city.name} include ${loaderData.employers.slice(0, 3).map((e: any) => e.name).join(", ")} and others.`,
                },
              }
            ],
          }),
        },
      ],
    };
  },
  component: CityRolePage,
  pendingComponent: () => (
    <div className="min-h-dvh animate-pulse bg-[#070A14] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="h-3 w-32 rounded bg-white/10" />
        <div className="mt-4 h-10 w-2/3 rounded-xl bg-white/10" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-48 rounded-2xl bg-white/5" />
            <div className="h-64 rounded-2xl bg-white/5" />
          </div>
          <div className="space-y-4">
            <div className="h-40 rounded-2xl bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  ),
});

function CityRolePage() {
  const { role, city, band, employers } = Route.useLoaderData();
  const rows: Array<[string, [number, number]]> = [
    ["Fresher (Y0)", band.fresher],
    ["Mid (Y3)", band.midY3],
    ["Senior (Y5–6)", band.seniorY5],
    ["Lead (Y8+)", band.leadY8],
  ];

  return (
    <div className="min-h-dvh bg-[#070A14] text-white">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-white/60">
          <Link to="/industry" className="hover:text-white/70">
            Industry
          </Link>
          {" / "}
          <Link to="/industry/$role" params={{ role: role.slug }} className="hover:text-white/70">
            {role.shortName}
          </Link>
          {" / "}
          {city.name}
        </p>
        <h1 className="mt-2 text-h1 font-semibold">
          {role.name} in {city.name}
        </h1>
        <p className="mt-2 text-base text-white/70">{city.liveNote}</p>

        <div className="mt-5 flex flex-wrap gap-2 text-meta">
          <Tag>
            <MapPin className="h-3 w-3" /> Hiring density: {city.hiringDensity}
          </Tag>
          <Tag>
            <TrendingUp className="h-3 w-3" /> {role.demand} demand
          </Tag>
          <Tag>As of {role.asOf}</Tag>
        </div>

        {/* Pay table */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="font-grotesk text-lg font-bold">Pay bands · {city.name}</h2>
          <p className="mt-1 text-caption text-white/80">
            All values in LPA. Source: JD aggregation across Naukri + LinkedIn + AmbitionBox,
            refreshed quarterly.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {rows.map(([label, range]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-4">
                <p className="font-mono text-micro uppercase tracking-[0.18em] text-white/80">
                  {label}
                </p>
                <p className="mt-1 font-grotesk text-h3 font-bold text-white">
                  ₹{range[0]} – {range[1]} LPA
                </p>
              </div>
            ))}
          </div>
          {band.note && <p className="mt-3 text-meta text-white/80">{band.note}</p>}
        </section>

        {/* Cost-of-living strip */}
        <section className="mt-6 rounded-xl border border-primary-glow/25 bg-primary/[0.05] p-4 text-caption text-white/80">
          <span className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-primary-glow">
            Live + cost
          </span>
          <p className="mt-2">{city.costOfLivingNote}</p>
        </section>

        {/* Employers in city */}
        {employers.length > 0 && (
          <section className="mt-10">
            <h2 className="font-grotesk text-lg font-bold inline-flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary-glow" /> Top employers hiring in{" "}
              {city.name}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {employers.map((e: ReturnType<typeof employersForRole>[number]) => (
                <div key={e.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-grotesk text-sm font-bold text-white">{e.name}</p>
                  <p className="mt-0.5 font-mono text-micro uppercase tracking-[0.18em] text-white/80">
                    {e.tier}
                  </p>
                  {e.typicalBand && <p className="mt-2 text-meta text-white/70">{e.typicalBand}</p>}
                  {e.note && <p className="mt-1 text-meta text-white/80">{e.note}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-12 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.10] to-gold/[0.02] p-6">
          <h2 className="font-grotesk text-h4 font-bold">
            Are you the right fit for {role.shortName} in {city.name}?
          </h2>
          <p className="mt-2 text-sm text-white/75">
            Take the 4-min Arzon Career Engine assessment. Get your ACRI score, archetype, and a
            personalised 5-year package projection.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/career-engine" className="btn btn-primary">
              Start the assessment <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <CTAButton asChild variant="ghost">
              <Link to="/industry/$role" params={{ role: role.slug }}>
                Full {role.shortName} profile
              </Link>
            </CTAButton>
          </div>
        </section>

        {/* Sister cities */}
        <section className="mt-10">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-white/80">
            {role.shortName} in other cities
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.values(CITIES_BY_SLUG)
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  to="/industry/$role/$city"
                  params={{ role: role.slug, city: c.slug }}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-meta text-white/80 hover:border-primary-glow/40 hover:text-white"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/75">
      {children}
    </span>
  );
}
