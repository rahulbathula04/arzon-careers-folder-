import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Crown,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonLd";
import { SITE } from "@/components/landing/constants";
import { trackEvent } from "@/lib/analytics";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";

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
    a: "No. Listed programme fees are all-inclusive. We do not sell education loans, income-share agreements, or third-party EMI products. You pay the published tier fee. There is no later certificate or placement fee.",
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
      {on ? <span className="text-[var(--arzon-teal-600)]">Included</span> : <span className="text-stone-400">—</span>}
    </td>
  );
}

function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-[var(--arzon-ink)] font-sans pb-24">
      {/* Header Banner */}
      <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-[var(--arzon-border)] bg-white tone-light">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--arzon-blue-700)]">
              TRANSPARENT PROGRAMME FEES
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-[var(--arzon-ink)]">
            Three workforce readiness tiers.{" "}
            <span className="italic text-[var(--arzon-blue-700)]">One published price each.</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--arzon-ink-soft)] font-sans leading-relaxed">
            Foundation Track ₹14,999 · Recruiter Track ₹24,999 · 1-on-1 Track ₹39,999. No education loans, no income-share
            agreements, no hidden EMI partners. You pay the listed fee. The programme defines the work and support included; employment remains dependent on the candidate and hiring market.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="tier-cards-heading">
        <h2 id="tier-cards-heading" className="sr-only">
          Compare Foundation Track, Recruiter Track, and 1-on-1 Track
        </h2>
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between arzon-v2-card relative flex flex-col justify-between p-6 sm:p-8 space-y-6 transition-all ${
                tier.popular
                  ? "border-[#1B3F8B] shadow-sm ring-1 ring-[#1B3F8B]"
                  : "border-[var(--arzon-border)]"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-[var(--arzon-navy-950)] text-white font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-amber-300" />
                    <span>Most Chosen</span>
                  </div>
                </div>
              )}
              {tier.id === "elite" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-stone-900 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                    <Crown className="h-3 w-3 text-amber-300" />
                    <span>Referral Desk</span>
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-2">
                <span className="inline-block px-2.5 py-0.5 rounded bg-stone-100 text-[var(--arzon-ink-soft)] font-mono text-[10px] font-bold uppercase tracking-wider border border-[var(--arzon-border)]">
                  {tier.audience}
                </span>
                <h2 className="font-serif text-2xl font-bold text-[var(--arzon-ink)]">{tier.name}</h2>
                <p className="font-serif text-4xl font-bold text-[var(--arzon-ink)]">{tier.priceLabel}</p>
                <p className="text-xs text-[var(--arzon-ink-soft)] font-sans leading-relaxed">{tier.blurb}</p>
                <ul className="space-y-3 pt-4 border-t border-[var(--arzon-border)] text-xs text-[var(--arzon-ink-soft)] font-medium">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-4 border-t border-[var(--arzon-border)]">
                <Link
                  to="/enrol/$tier/pay"
                  params={{ tier: tier.id }}
                  onClick={() => trackEvent("pricing_cta_click", { tier: tier.id, surface: "pricing_page" })}
                  
                >
                  <span>Reserve my seat</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <WhatsAppLink
                  source={`pricing_${tier.id}`}
                  message={`Hi Arzon, I want a counsellor walkthrough of the ${tier.name} tier (₹${tier.priceInr.toLocaleString("en-IN")}) before I enrol.`}
                  className="h-10 w-full inline-flex items-center justify-center gap-2 text-xs font-medium text-[var(--arzon-teal-600)] rounded-lg bg-[var(--arzon-teal-100)] border border-[#BCE6DE] hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp a counsellor
                </WhatsAppLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12" aria-labelledby="matrix-heading">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-[var(--arzon-border)] bg-white tone-light shadow-xs">
          <div className="px-6 pt-6">
            <h2 id="matrix-heading" className="font-serif text-xl sm:text-2xl font-bold text-[var(--arzon-ink)]">
              Master Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-[var(--arzon-ink-soft)] mt-1">Same three fees. Different intensity of support.</p>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b border-[var(--arzon-border)]">
                  <th className="py-3 px-3 font-mono font-bold text-[var(--arzon-ink-muted)] uppercase">Deliverable</th>
                  <th className="py-3 px-3 font-mono font-bold text-[var(--arzon-ink-soft)] uppercase text-center">Foundation Track</th>
                  <th className="py-3 px-3 font-mono font-bold text-[var(--arzon-blue-700)] uppercase text-center bg-[var(--arzon-blue-100)]">
                    Recruiter Track
                  </th>
                  <th className="py-3 px-3 font-mono font-bold text-[var(--arzon-ink)] uppercase text-center">1-on-1 Track</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="py-3 px-3 font-medium text-stone-800">Published fee (INR)</td>
                  <td className="py-3 px-3 text-center font-bold">₹14,999</td>
                  <td className="py-3 px-3 text-center font-bold bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]">₹24,999</td>
                  <td className="py-3 px-3 text-center font-bold">₹39,999</td>
                </tr>
                {MATRIX.map((row) => (
                  <tr key={row.label}>
                    <td className="py-3 px-3 font-medium text-stone-800">{row.label}</td>
                    <Cell on={row.essential} />
                    <td className="bg-[var(--arzon-blue-100)]">
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

      {/* Fee Disclosure & Refunds */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl rounded-2xl border border-[var(--arzon-border)] bg-white tone-light p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 border-b border-[var(--arzon-border)] pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--arzon-teal-100)] text-[var(--arzon-teal-600)] shrink-0 border border-[#BCE6DE]">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--arzon-ink)]">Fee Disclosure &amp; Refund Policy</h2>
              <p className="font-mono text-xs text-[var(--arzon-ink-muted)] font-bold uppercase tracking-wider">
                No loan traps &bull; Written SLA
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--arzon-ink-soft)] leading-relaxed font-sans">
            The three prices above are the complete programme fees. We do not package bank loans or
            third-party EMIs. The 1-on-1 Track&apos;s three introductions are confirmed calendar calls with
            decision-makers in the partner network — not a guaranteed offer. If we cannot fulfil
            those introductions in the written window, we refund the difference between Recruiter Track and
            1-on-1 Track. Details live on the{" "}
            <Link to="/refund" className="font-bold text-[var(--arzon-blue-700)] underline underline-offset-2">
              refund policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16" aria-labelledby="pricing-faq-heading">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 id="pricing-faq-heading" className="font-serif text-2xl font-bold text-[var(--arzon-ink)]">
            Frequently Asked Pricing Questions
          </h2>
          <dl className="space-y-3">
            {PRICING_FAQS.map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-[var(--arzon-border)] bg-white tone-light p-5 space-y-2 shadow-xs"
              >
                <dt className="font-serif text-base font-bold text-[var(--arzon-ink)]">{item.q}</dt>
                <dd className="text-xs sm:text-sm text-[var(--arzon-ink-soft)] leading-relaxed font-sans">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
