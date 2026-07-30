import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { ArrowLeft } from "lucide-react";
import { pageSeo } from "@/lib/seo";

import { ADDRESS, ADDRESS_ONE_LINE, SITE } from "@/components/landing/constants";
export const Route = createFileRoute("/legal/terms")({
  head: () => {
    const ps = pageSeo({
      path: "/legal/terms",
      title: "Terms of service. Arzon Global",
      description:
        "Terms of service for using Arzon Global's website and programmes. Plain-English terms covering enrolment, content and use.",
      image: SITE.ogImages.legal,
    });
    return {
      meta: [{ title: "Terms of service. Arzon Global" }, ...ps.meta],
      links: ps.links,
    };
  },
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="tone-dark min-h-app bg-[#0A0F1E] text-white">
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>
        <h1 className="h-display mt-6">Terms of service</h1>
        <p className="mt-3 text-sm text-white/80">Last updated: April 2026</p>

        <div className="prose prose-invert mt-10 max-w-none space-y-6 text-sm leading-relaxed text-white/75">
          <Section title="1. Who we are">
            <p>
              Arzon Global Pvt Ltd ("Arzon", "we", "us") is an Indian company registered with the
              Ministry of Corporate Affairs (CIN U85500TG2024PTC178XXX), with its registered office
              at {ADDRESS_ONE_LINE}.
            </p>
          </Section>
          <Section title="2. Use of the site">
            <p>
              You agree to use this site for lawful purposes only. You may not scrape, resell, or
              attempt to disrupt service.
            </p>
          </Section>
          <Section title="3. Enrolment">
            <p>
              Programme enrolment is governed by the signed enrolment agreement issued at payment.
              The seat fee (₹999) is adjusted against the programme fee - you don't pay it twice.
              See{" "}
              <Link to="/refund" className="text-primary-glow underline">
                our cancellation & enrolment policy
              </Link>{" "}
              for full terms.
            </p>
          </Section>
          <Section title="4. Content & IP">
            <p>
              All curriculum, code, datasets, and materials are © Arzon Global. You may use them for
              personal learning and your portfolio. You may not redistribute or sell them.
            </p>
          </Section>
          <Section title="5. No employment guarantee">
            <p>
              We do not guarantee employment. Anyone who guarantees jobs in India is breaking ASCI
              guidelines. We provide structured introductions to hiring partners and a verifiable
              certificate.
            </p>
          </Section>
          <Section title="6. Disputes">
            <p>
              These terms are governed by the laws of India. Any dispute will be subject to the
              exclusive jurisdiction of the courts in Hyderabad, Telangana.
            </p>
          </Section>
          <Section title="7. Contact">
            <p>
              Questions? Email{" "}
              <a href="mailto:hello@arzonglobal.com" className="text-primary-glow underline">
                hello@arzonglobal.com
              </a>
              .
            </p>
          </Section>
        </div>
      </article>
      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="h-section">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
