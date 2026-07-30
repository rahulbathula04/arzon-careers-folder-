import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { faqSchema } from "@/lib/jsonLd";
import { SITE, SEAT_FEE } from "@/components/landing/constants";

const REFUND_FAQS = [
  {
    q: "How does the seat fee work?",
    a: `The ${SEAT_FEE} seat fee locks your spot in the next cohort. When you continue with the programme, the full amount is adjusted against your programme fee - you don't pay it twice.`,
  },
  {
    q: "How do I cancel before the cohort starts?",
    a: "Write to support with your registered email. We process the cancellation per the terms in your signed enrolment agreement and confirm in writing within 5 working days.",
  },
  {
    q: "What if Arzon Global cancels or postpones a cohort?",
    a: "You can roll over to the next cohort at no extra cost, or request settlement of any amount you've paid. We settle within 5 working days.",
  },
  {
    q: "Do you guarantee a job?",
    a: "No. ASCI guidelines prohibit guaranteed-placement claims, and we follow them. We commit to live mentoring, graded real-data work, a verifiable certificate, and structured introductions to our hiring partners.",
  },
];

export const Route = createFileRoute("/refund")({
  head: () => {
    const ps = pageSeo({
      path: "/refund",
      title: "Cancellation & enrolment policy · Arzon Global",
      description:
        "Plain-English cancellation policy: how the seat fee works, cohort changes, and what we commit to in writing.",
      image: SITE.ogImages.legal,
    });
    return {
      meta: [{ title: "Cancellation & enrolment policy · Arzon Global" }, ...ps.meta],
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
          Policy · plain English
        </p>
        <h1 className="h-display mt-3">Cancellation & enrolment policy</h1>
        <p className="mt-4 text-base text-white/70">
          We don't promise jobs - anyone who does is breaking ASCI guidelines. Here's how
          cancellation, seat fees, and cohort changes actually work, in plain English.
        </p>

        <div className="mt-10 space-y-6">
          <Block title={`The pre-registration seat fee (${SEAT_FEE})`}>
            <p>
              The pre-registration seat fee holds your spot in your selected cohort and allocates
              dedicated mentor capacity. Pre-registration deposits are non-refundable, but 100% of
              the {SEAT_FEE} is credited directly against your total programme fee upon enrolment.
            </p>
          </Block>

          <Block title="The programme fee">
            <p>
              The full programme fee is due 3 days before your cohort starts via direct Razorpay
              payment. We do not offer consumer EMI financing; there are zero hidden loan traps or
              hidden add-ons.
            </p>
            <p>
              Once your cohort begins, any cancellation is settled per the terms in your signed
              enrolment agreement, based on weeks completed.
            </p>
          </Block>

          <Block title="If we cancel or move your cohort">
            <p>
              You can roll over to the next cohort at no extra cost, or request settlement of any
              amount you've paid. We confirm in writing within 5 working days.
            </p>
          </Block>

          <Block title="Placement support (Career & Elite plans)">
            <p>
              If you complete the programme with grade B+ and don't get a single verified interview
              within 90 days of your capstone, we extend placement support free for 6 more months.
            </p>
            <p>
              We don't promise jobs. We commit to live mentoring, graded real-data work, a
              verifiable certificate, and structured introductions to our 38+ hiring partners.
            </p>
          </Block>

          <div className="flex items-start gap-3 rounded-2xl border border-accent-glow/20 bg-accent-glow/5 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-eyebrow" />
            <div>
              <p className="font-semibold text-white">All in writing</p>
              <p className="mt-1 text-sm text-white/70">
                Every statement on this page is reflected in your signed enrolment agreement. No
                verbal promises, no fine print surprises.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/apply"
            className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Start your application <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <Link
            to="/proof"
            className="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10"
          >
            See our public proof
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
      <h2 className="h-section">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/75">{children}</div>
    </section>
  );
}
