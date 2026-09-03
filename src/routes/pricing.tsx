import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Crown,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonLd";
import { SITE } from "@/components/landing/constants";
import { trackEvent } from "@/lib/analytics";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { MemoizedHealthcare3dCanvas } from "@/components/3d/Healthcare3dCanvas";
import { BorderBeam } from "@/components/magicui/border-beam";

const TIERS = [
  {
    id: "essential" as const,
    name: "Foundation Track",
    priceInr: 14999,
    priceLabel: "₹14,999",
    blurb: "Self-paced core curriculum for graduates who want the labs, verifier certificate, and portal access without live mentoring.",
    audience: "Self-Paced Core",
    features: [
      "Recorded workforce-readiness modules & codebook labs",
      "Course completion certificate with public verifier URL",
      "Community cohort group access",
      "Transparent fee — paid once, zero EMI paperwork",
    ],
  },
  {
    id: "career" as const,
    name: "Recruiter Track",
    priceInr: 24999,
    priceLabel: "₹24,999",
    popular: true,
    blurb: "Mentor-led cohort with live cases, mock interviews, and partner-desk routing for healthcare and pharma freshers.",
    audience: "Mentor-Led + Live Cases",
    features: [
      "Everything in Foundation Track",
      "Live mentor sessions and case walkthroughs (8 weeks)",
      "24-hour mentor resolution during the cohort",
      "Partner desk candidate routing & 1:1 interview mocks",
    ],
  },
  {
    id: "elite" as const,
    name: "1-on-1 Track",
    priceInr: 39999,
    priceLabel: "₹39,999",
    blurb: "Comprehensive 1:1 mentorship plus enterprise referral desk — dedicated pairing and confirmed hiring-manager introductions.",
    audience: "1:1 + Enterprise Referral Desk",
    features: [
      "Everything in Recruiter Track",
      "1:1 dedicated senior director mentor pairing",
      "Three confirmed decision-maker introductions (Elite SLA)",
      "ATS-optimised resume & LinkedIn profile rewrite",
    ],
  },
];

const MATRIX = [
  { label: "Learning portal & labs", essential: true, career: true, elite: true },
  { label: "Verified certificate + public verifier", essential: true, career: true, elite: true },
  { label: "Live mentor sessions & case work", essential: false, career: true, elite: true },
  { label: "Partner desk routing", essential: false, career: true, elite: true },
  { label: "1:1 dedicated mentor", essential: false, career: false, elite: true },
  { label: "Enterprise referral desk (3 intros)", essential: false, career: false, elite: true },
];

const PRICING_FAQS = [
  {
    q: "Are there hidden fees, loans, or EMI traps?",
    a: "No. Listed programme fees are all-inclusive. We do not sell education loans, income-share agreements, or third-party EMI products. You pay the published tier fee. There is no later 'certificate fee' or 'placement fee'.",
  },
  {
    q: "What do Foundation Track, Recruiter Track, and 1-on-1 Track include?",
    a: "Foundation Track (₹14,999) is self-paced core access. Recruiter Track (₹24,999) adds mentor-led live cases and partner-desk routing. 1-on-1 Track (₹39,999) adds 1:1 senior director mentoring and the enterprise referral desk with three confirmed hiring-manager introductions.",
  },
  {
    q: "How do refunds work?",
    a: "Pre-registration deposits are credited against the programme fee. If Arzon cannot fulfil the 1-on-1 three-introduction SLA within the written window, we refund the difference between Recruiter Track and 1-on-1 Track. Full cancellation terms are on the refund policy page.",
  },
  {
    q: "Can I talk to a counsellor before enrolling?",
    a: "Yes. WhatsApp the counsellor with your degree and city. There is no charge for that conversation, and it does not lock you into a tier.",
  },
];

export const Route = createFileRoute("/pricing")({
  head: () => {
    const title = "Programme Pricing & Fee Structure · Arzon Global";
    const description =
      "Transparent workforce readiness fees: Foundation Track ₹14,999, Recruiter Track ₹24,999, 1-on-1 Track ₹39,999. No hidden loans. Compare tiers and enrol.";
    const seo = pageSeo({
      path: "/pricing",
      title,
      description,
      noindex: false,
      image: SITE.ogImages.internships,
    });
    return {
      meta: [{ title }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        },
        {
          type: "application/ld+json",
          children: faqSchema(PRICING_FAQS),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Arzon Global workforce readiness tiers",
            itemListElement: TIERS.map((tier, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: `Arzon ${tier.name} workforce readiness`,
                description: tier.blurb,
                brand: { "@type": "Organization", name: "Arzon Global" },
                offers: {
                  "@type": "Offer",
                  priceCurrency: "INR",
                  price: String(tier.priceInr),
                  availability: "https://schema.org/InStock",
                  url: "https://arzonglobal.com/pricing",
                  category: "Paid",
                },
              },
            })),
          }),
        },
      ],
    };
  },
  component: PricingPage,
});

function Cell({ on }: { on: boolean }) {
  return (
    <td className="py-3 px-3 text-center text-xs font-bold">
      {on ? <span className="text-emerald-700">Included</span> : <span className="text-stone-400">—</span>}
    </td>
  );
}

function PricingPage() {
  return (
    <main className="tone-light min-h-app bg-[#F7F5F0] text-[#1A1A1A] pb-28 md:pb-0 relative overflow-hidden">
      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200 bg-white tone-light overflow-hidden">
        {/* 3D Particle Canvas Ambient Glow */}
        <MemoizedHealthcare3dCanvas className="absolute inset-0 pointer-events-none opacity-40 z-0" />
        
        <div className="relative mx-auto max-w-3xl text-center space-y-4 z-10">
          <PremiumChip variant="navy" size="md">
            TRANSPARENT PROGRAMME FEES
          </PremiumChip>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Three workforce readiness tiers.{" "}
            <span className="italic text-[#1B3F8B]">One published price each.</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Foundation Track ₹14,999 · Recruiter Track ₹24,999 · 1-on-1 Track ₹39,999. No education loans, no income-share
            agreements, no hidden EMI partners. You pay the listed fee. You own the outcome.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="tier-cards-heading">
        <h2 id="tier-cards-heading" className="sr-only">
          Compare Foundation Track, Recruiter Track, and 1-on-1 Track
        </h2>
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => (
            <Interactive3dCard
              key={tier.id}
              maxTilt={10}
              depthScale={tier.popular ? 1.04 : 1.02}
              containerClassName="h-full"
              className={`relative flex flex-col justify-between rounded-3xl border bg-white tone-light card-light p-6 sm:p-8 space-y-6 shadow-md transition-all h-full ${
                tier.popular
                  ? "border-2 border-[#1B3F8B] shadow-2xl ring-4 ring-[#1B3F8B]/10 lg:-translate-y-2"
                  : "border-stone-300 shadow-sm"
              }`}
            >
              {tier.popular && <BorderBeam size={220} duration={12} delay={1} colorFrom="#1B3F8B" colorTo="#0D9488" />}

              {tier.popular ? (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                  <Floating3dBadge duration={3.5} delay={0.2}>
                    <div className="bg-[#1B3F8B] text-white font-mono text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-amber-300" />
                      <span>Most chosen ✦</span>
                    </div>
                  </Floating3dBadge>
                </div>
              ) : null}
              {tier.id === "elite" ? (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                  <Floating3dBadge duration={4} delay={0.4}>
                    <div className="bg-amber-600 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <Crown className="h-3 w-3 text-amber-200" />
                      <span>Referral desk ✦</span>
                    </div>
                  </Floating3dBadge>
                </div>
              ) : null}

              <div className="space-y-4 pt-2">
                <Card3dLayer translateZ={20}>
                  <span className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-mono text-[10px] font-bold uppercase tracking-wider border border-stone-200 shadow-2xs">
                    {tier.audience}
                  </span>
                </Card3dLayer>
                <Card3dLayer translateZ={30}>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">{tier.name}</h2>
                </Card3dLayer>
                <Card3dLayer translateZ={35}>
                  <p className="font-serif text-4xl font-bold text-[#1A1A1A]">{tier.priceLabel}</p>
                </Card3dLayer>
                <Card3dLayer translateZ={15}>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">{tier.blurb}</p>
                </Card3dLayer>
                <Card3dLayer translateZ={20}>
                  <ul className="space-y-3 pt-4 border-t border-stone-200 text-xs text-stone-700 font-medium">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </Card3dLayer>
              </div>

              <Card3dLayer translateZ={25} className="space-y-2 pt-4">
                <Link
                  to="/enrol/$tier/pay"
                  params={{ tier: tier.id }}
                  onClick={() => trackEvent("pricing_cta_click", { tier: tier.id, surface: "pricing_page" })}
                  className={`h-12 w-full flex items-center justify-center gap-2 text-sm font-bold rounded-xl transition-all shadow-md active:scale-[0.98] ${
                    tier.popular
                      ? "text-white bg-[#1B3F8B] hover:bg-[#153270] shadow-blue-950/20"
                      : "text-white bg-stone-900 hover:bg-black"
                  }`}
                  style={
                    tier.popular
                      ? { color: "#FFFFFF", backgroundColor: "#1B3F8B" }
                      : { color: "#FFFFFF", backgroundColor: "#1C1917" }
                  }
                >
                  <span>Reserve my seat</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppLink
                  source={`pricing_${tier.id}`}
                  message={`Hi Arzon, I want a counsellor walkthrough of the ${tier.name} tier (₹${tier.priceInr.toLocaleString("en-IN")}) before I enrol.`}
                  className="h-11 w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-emerald-800 rounded-xl bg-emerald-50 tone-light border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp a counsellor
                </WhatsAppLink>
              </Card3dLayer>
            </Interactive3dCard>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-12" aria-labelledby="matrix-heading">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-stone-300 bg-white tone-light card-light shadow-md">
          <div className="px-6 pt-6">
            <h2 id="matrix-heading" className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
              Master comparison
            </h2>
            <p className="text-sm text-stone-600 mt-1">Same three fees. Different intensity of support.</p>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="py-3 px-3 font-mono font-bold text-stone-500 uppercase">Deliverable</th>
                  <th className="py-3 px-3 font-mono font-bold text-stone-700 uppercase text-center">Foundation Track</th>
                  <th className="py-3 px-3 font-mono font-bold text-[#1B3F8B] uppercase text-center bg-[#1B3F8B]/5">
                    Recruiter Track
                  </th>
                  <th className="py-3 px-3 font-mono font-bold text-amber-900 uppercase text-center">1-on-1 Track</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="py-3 px-3 font-medium text-stone-800">Published fee (INR)</td>
                  <td className="py-3 px-3 text-center font-bold">₹14,999</td>
                  <td className="py-3 px-3 text-center font-bold bg-[#1B3F8B]/5">₹24,999</td>
                  <td className="py-3 px-3 text-center font-bold">₹39,999</td>
                </tr>
                {MATRIX.map((row) => (
                  <tr key={row.label}>
                    <td className="py-3 px-3 font-medium text-stone-800">{row.label}</td>
                    <Cell on={row.essential} />
                    <td className="bg-[#1B3F8B]/5">
                      <Cell on={row.career} />
                    </td>
                    <Cell on={row.elite} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl rounded-3xl border border-stone-300 bg-white tone-light card-light p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 shrink-0">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">Fee disclosure &amp; refunds</h2>
              <p className="font-mono text-xs text-stone-500 font-bold uppercase tracking-wider">
                No loan traps · written SLA
              </p>
            </div>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed font-sans">
            The three prices above are the full programme fees. We do not package bank loans or
            third-party EMIs. The 1-on-1 Track&apos;s three introductions are confirmed calendar calls with
            decision-makers in the partner network — not a guaranteed offer. If we cannot fulfil
            those introductions in the written window, we refund the difference between Recruiter Track and
            1-on-1 Track. Details live on the{" "}
            <Link to="/refund" className="font-bold text-[#1B3F8B] underline underline-offset-2">
              refund policy
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-16" aria-labelledby="pricing-faq-heading">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 id="pricing-faq-heading" className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Pricing questions
          </h2>
          <dl className="space-y-3">
            {PRICING_FAQS.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-stone-300 bg-white tone-light card-light p-5 space-y-2 shadow-2xs"
              >
                <dt className="font-serif text-base font-bold text-[#1A1A1A]">{item.q}</dt>
                <dd className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Footer />
    </main>
  );
}
