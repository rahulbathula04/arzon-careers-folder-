import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { SectionSkeleton } from "@/components/landing/SectionSkeleton";
import { pageSeo } from "@/lib/seo";

const StudentQuestionBank = lazy(() =>
  import("@/components/landing/StudentQuestionBank").then((m) => ({
    default: m.StudentQuestionBank,
  })),
);

export const Route = createFileRoute("/faq")({
  head: () => {
    const ps = pageSeo({
      path: "/faq",
      title: "FAQs · Arzon Careers",
      description:
        "Every question students have asked about our 12-week, deployment-ready programmes - certificate, fees, refunds, batches and placement support.",
    });
    return { meta: [{ title: "FAQs · Arzon Careers" }, ...ps.meta], links: ps.links };
  },
  component: FaqPage,
});

function FaqPage() {
  return (
    <main className="min-h-app overflow-x-clip pb-24 md:pb-0">
      <section className="tone-dark bg-[#0a1430] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-white/55">
            Frequently asked
          </p>
          <h1 className="mt-3 font-display text-h1 font-bold leading-tight text-white">
            Every question students have asked.
          </h1>
          <p className="mt-3 text-body-sm text-white/70">
            If something isn&rsquo;t covered, WhatsApp our counsellor &mdash; replies in 5 minutes
            during 9 AM–9 PM IST.
          </p>
        </div>
      </section>

      <FAQ />

      <Suspense fallback={<SectionSkeleton variant="faq" minH={600} />}>
        <StudentQuestionBank />
      </Suspense>

      <Footer />
    </main>
  );
}
