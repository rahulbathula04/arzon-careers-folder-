import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { faqSchema } from "@/lib/jsonLd";
import { SITE, SEAT_FEE } from "@/components/landing/constants";

const REFUND_FAQS = [
  {
    q: "Do you offer refunds if I change my mind?",
    a: "No. Arzon Global enforces a strict no-refund policy across all programme tiers, seat reservations, and tuition payments. Once registered, fees cannot be refunded under any circumstances.",
  },
  {
    q: "How does the seat reservation fee work?",
    a: `The ${SEAT_FEE} seat reservation fee immediately reserves your dedicated seat and mentor capacity in your chosen cohort. When you complete enrolment, 100% of this fee is credited directly toward your total programme fee. The fee is strictly non-refundable if you choose not to enrol.`,
  },
  {
    q: "What if I cannot attend due to an emergency or exam?",
    a: "While we do not offer refunds, we provide flexibility through cohort rollovers. You may request a one-time rollover to the subsequent scheduled cohort at zero additional charge, provided you give written notice at least 5 business days before your cohort begins.",
  },
  {
    q: "What if Arzon Global reschedules a cohort?",
    a: "In the event a cohort date is rescheduled by Arzon Global, your enrolment and seat reservation are automatically transferred to the confirmed new dates at no extra cost.",
  },
  {
    q: "Do you guarantee a job or minimum salary?",
    a: "No. ASCI guidelines strictly prohibit 100% placement guarantees. We provide practical role-based case processing, portfolio deliverables, ACRI™ verification, and structured introductions to hiring managers.",
  },
];

export const Route = createFileRoute("/refund")({
  head: () => {
    const ps = pageSeo({
      path: "/refund",
      title: "No-Refund & Enrolment Policy · Arzon Global",
      description:
        "Official commercial policy: Arzon Global maintains a strict no-refund policy across all programmes, seat reservations, and tuition payments once enrolled.",
      image: SITE.ogImages.legal,
    });
    return {
      meta: [{ title: "No-Refund & Enrolment Policy · Arzon Global" }, ...ps.meta],
      links: ps.links,
      scripts: [{ type: "application/ld+json", children: faqSchema(REFUND_FAQS) }],
    };
  },
  component: RefundPage,
});

function RefundPage() {
  return (
    <main className="tone-dark min-h-app bg-[#0A0F1E] text-white">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>
        <p className="mt-6 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
          Policy · Plain English
        </p>
        <h1
          className="h-display text-white mt-3"
          style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
        >
          No-Refund &amp; Enrolment Policy
        </h1>
        <p className="mt-4 text-base text-white/80 leading-relaxed">
          Arzon Global operates under a transparent, upfront commercial model: we do not offer any refunds once enrolled or registered. Here is our official policy explained clearly in plain English.
        </p>

        {/* Notice Banner */}
        <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.04] p-5 text-sm leading-relaxed text-white/90">
          <div className="flex items-center gap-2 font-semibold text-white">
            <AlertCircle className="h-4 w-4 text-primary-glow shrink-0" />
            <span>Strict No-Refund Policy Notice</span>
          </div>
          <p className="mt-2 text-xs text-white/70 leading-relaxed">
            All payments made to Arzon Global—including seat reservation fees, module access fees, and complete programme tuition—are strictly non-refundable and non-cancellable once payment is processed.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          <Block title={`1. Seat Reservation Fee (${SEAT_FEE})`}>
            <p>
              The {SEAT_FEE} pre-registration fee immediately reserves your dedicated seat and mentor capacity in your chosen cohort.
            </p>
            <p>
              When you proceed with the programme, 100% of the {SEAT_FEE} is credited directly against your total programme fee—you never pay twice. However, if you choose not to complete your enrolment or decide not to attend, the deposit is strictly non-refundable as it covers allocated administrative onboarding and mentor capacity holds.
            </p>
          </Block>

          <Block title="2. Programme Tuition & Fees">
            <p>
              Programme fees are payable prior to cohort commencement via authorized Razorpay payment links. We do not sell education loans or third-party EMI debt products.
            </p>
            <p>
              Once tuition is paid and cohort laboratory credentials, case study dossiers, and live mentoring schedules are issued, fees are strictly non-refundable under any circumstances. We do not provide partial refunds, pro-rata settlements, or trial-period money-back guarantees.
            </p>
          </Block>

          <Block title="3. Cohort Rollover Policy (Schedule Flexibility)">
            <p>
              While we enforce a strict no-refund policy, we understand that university semester exams, emergency medical situations, or unexpected schedule conflicts can occur.
            </p>
            <p>
              Enrolled learners in good standing are eligible for a <strong className="text-white">one-time cohort rollover</strong> to the subsequent scheduled batch at zero additional penalty, provided written request is submitted to support@arzoncareers.in at least 5 business days prior to cohort kickoff.
            </p>
          </Block>

          <Block title="4. Rescheduling by Arzon Global">
            <p>
              In the rare event that Arzon Global reschedules or postpones a cohort due to mentor availability or operational updates, your seat reservation and tuition are automatically transferred to the confirmed new dates at no extra cost.
            </p>
          </Block>

          <Block title="5. Industry-Ready Support & ASCI Compliance">
            <p>
              In strict accordance with ASCI guidelines, Arzon Global does not make false 100% job guarantee claims. We commit to live expert mentoring, graded case dossiers, verifiable clinical proof, and direct introductions to our corporate hiring partner desks.
            </p>
          </Block>

          <div className="flex items-start gap-3 rounded-2xl border border-accent-glow/20 bg-accent-glow/5 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-eyebrow" />
            <div>
              <p className="font-semibold text-white">Transparent &amp; Legally Binding</p>
              <p className="mt-1 text-sm text-white/70">
                Every policy stated on this page is reflected in your official enrolment terms. We maintain complete clarity so candidates can make informed decisions before registering.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/pricing"
            className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Review Programme Pricing <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <Link
            to="/legal/terms"
            className="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10"
          >
            View Terms of Service
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2
        className="h-section text-white"
        style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
      >
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/75">{children}</div>
    </section>
  );
}
