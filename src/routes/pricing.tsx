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

const TIERS = [
  {
    id: "essential" as const,
    name: "Essential",
    priceInr: 10000,
    priceLabel: "₹10,000",
    blurb: "Self-paced core curriculum for graduates who want the labs, verifier certificate, and portal access without live mentoring.",
    audience: "Self-paced core",
    features: [
      "Recorded workforce-readiness modules & codebook labs",
      "Course completion certificate with public verifier URL",
      "Community cohort group access",
      "Transparent fee — paid once, no EMI paperwork",
    ],
  },
  {
    id: "career" as const,
    name: "Career",
    priceInr: 18000,
    priceLabel: "₹18,000",
    popular: true,
    blurb: "Mentor-led cohort with live cases, mock interviews, and partner-desk routing for healthcare and pharma freshers.",
    audience: "Mentor-led + live cases",
    features: [
      "Everything in Essential",
      "Live mentor sessions and case walkthroughs",
      "24-hour mentor resolution during the cohort",
      "Partner desk candidate routing & 1:1 mocks",
    ],
  },
  {
    id: "elite" as const,
    name: "Elite",
    priceInr: 28000,
    priceLabel: "₹28,000",
    blurb: "Comprehensive 1:1 mentorship plus enterprise referral desk — dedicated pairing and confirmed hiring-manager introductions.",
    audience: "1:1 + enterprise referral desk",
    features: [
      "Everything in Career",
      "1:1 dedicated senior mentor pairing",
      "Three confirmed decision-maker introductions (Elite SLA)",
      "ATS-optimised resume & LinkedIn rewrite",
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
    q: "What do Essential, Career, and Elite actually include?",
    a: "Essential (₹10,000) is self-paced core access. Career (₹18,000) adds mentor-led live cases and partner-desk routing. Elite (₹28,000) adds 1:1 mentoring and the enterprise referral desk with three confirmed hiring-manager introductions, not a guaranteed job offer.",
  },
  {
    q: "How do refunds work?",
    a: "Pre-registration deposits are credited against the programme fee. If Arzon cannot fulfil the Elite three-introduction SLA within the written window, we refund the difference between Career and Elite. Full cancellation terms are on the refund policy page.",
  },
  {
    q: "Can I talk to a counsellor before enrolling?",
    a: "Yes. WhatsApp the counsellor with your degree and city. There is no charge for that conversation, and it does not lock you into a tier.",
  },
];

export const Route = createFileRoute("/pricing")({
  head: () => {
    const title = "Programme Pricing & Fee Structure · Arzon Careers";
    const description =
      "Transparent workforce readiness fees: Essential ₹10,000, Career ₹18,000, Elite ₹28,000. No hidden loans. Compare tiers and enrol.";
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
    <main className="tone-light min-h-app bg-[#F7F5F0] text-[#1A1A1A] pb-28 md:pb-0">
      <section className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200 bg-white tone-light">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <PremiumChip variant="navy" size="md">
            TRANSPARENT PROGRAMME FEES
          </PremiumChip>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Three workforce readiness tiers.{" "}
            <span className="italic text-[#1B3F8B]">One published price each.</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Essential ₹10,000 · Career ₹18,000 · Elite ₹28,000. No education loans, no income-share
            agreements, no hidden EMI partners. You pay the listed fee. You own the outcome.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="tier-cards-heading">
        <h2 id="tier-cards-heading" className="sr-only">
          Compare Essential, Career, and Elite
        </h2>
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => (
            <article
              key={tier.id}
              className={`relative flex flex-col justify-between rounded-3xl border bg-white tone-light card-light p-6 sm:p-8 space-y-6 shadow-sm ${
                tier.popular
                  ? "border-2 border-[#1B3F8B] shadow-xl ring-4 ring-[#1B3F8B]/10 lg:-translate-y-1"
                  : "border-stone-300"
              }`}
            >
              {tier.popular ? (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1B3F8B] text-white font-mono text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-amber-300" />
                  <span>Most chosen</span>
                </div>
              ) : null}
              {tier.id === "elite" ? (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-600 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Crown className="h-3 w-3 text-amber-200" />
                  <span>Referral desk</span>
                </div>
              ) : null}

              <div className="space-y-4 pt-1">
                <span className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-mono text-[10px] font-bold uppercase tracking-wider border border-stone-200">
                  {tier.audience}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">{tier.name}</h2>
                <p className="font-serif text-4xl font-bold text-[#1A1A1A]">{tier.priceLabel}</p>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">{tier.blurb}</p>
                <ul className="space-y-3 pt-4 border-t border-stone-200 text-xs text-stone-700 font-medium">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <Link
                  to="/enrol/$tier/pay"
                  params={{ tier: tier.id }}
                  onClick={() => trackEvent("pricing_cta_click", { tier: tier.id, surface: "pricing_page" })}
                  className={`h-12 w-full flex items-center justify-center gap-2 text-sm font-bold rounded-xl transition-all active:scale-[0.98] ${
                    tier.popular
                      ? "text-white bg-[#1B3F8B] hover:bg-[#153270]"
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
                  className="h-11 w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-emerald-800 rounded-xl bg-emerald-50 tone-light border border-emerald-200 hover:bg-emerald-100"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp a counsellor
                </WhatsAppLink>
              </div>
            </article>
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
                  <th className="py-3 px-3 font-mono font-bold text-stone-700 uppercase text-center">Essential</th>
                  <th className="py-3 px-3 font-mono font-bold text-[#1B3F8B] uppercase text-center bg-[#1B3F8B]/5">
                    Career
                  </th>
                  <th className="py-3 px-3 font-mono font-bold text-amber-900 uppercase text-center">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="py-3 px-3 font-medium text-stone-800">Published fee (INR)</td>
                  <td className="py-3 px-3 text-center font-bold">₹10,000</td>
                  <td className="py-3 px-3 text-center font-bold bg-[#1B3F8B]/5">₹18,000</td>
                  <td className="py-3 px-3 text-center font-bold">₹28,000</td>
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
            third-party EMIs. Elite&apos;s three introductions are confirmed calendar calls with
            decision-makers in the partner network — not a guaranteed offer. If we cannot fulfil
            those introductions in the written window, we refund the difference between Career and
            Elite. Details live on the{" "}
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
                className="rounded-2xl border border-stone-200 bg-white tone-light card-light p-5"
              >
                <dt className="font-bold text-sm text-[#1A1A1A]">{item.q}</dt>
                <dd className="mt-2 text-sm text-stone-600 leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Footer />
    </main>
  );
}
