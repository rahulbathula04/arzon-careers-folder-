import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { ArrowLeft } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { SITE } from "@/components/landing/constants";

export const Route = createFileRoute("/legal/privacy")({
  head: () => {
    const ps = pageSeo({
      path: "/legal/privacy",
      title: "Privacy notice. Arzon Global",
      description:
        "Plain-English privacy notice covering what we collect, how we use it, and your rights. We never sell your data.",
      image: SITE.ogImages.legal,
    });
    return {
      meta: [{ title: "Privacy notice. Arzon Global" }, ...ps.meta],
      links: ps.links,
    };
  },
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="tone-dark min-h-app bg-[#0A0F1E] text-white">
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>
        <h1 className="h-display mt-6">Privacy notice</h1>
        <p className="mt-3 text-sm text-white/80">Last updated: April 2026</p>

        <div className="prose prose-invert mt-10 max-w-none space-y-6 text-sm leading-relaxed text-white/75">
          <Section title="What we collect">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                Application info you submit (name, email, phone, city, year, background, goal).
              </li>
              <li>Programme + cohort selection.</li>
              <li>
                Learning progress (lessons completed, bookmarks, notes, stored locally on your
                device).
              </li>
              <li>Standard server logs (IP, user-agent, timestamps) for security.</li>
            </ul>
          </Section>
          <Section title="How we use it">
            <p>
              To process your application, run your cohort, support you during the programme, and
              issue your certificate.
            </p>
            <p>
              Aggregated statistics may be published (e.g. "23 of 28 placed") but never with
              personal identifiers.
            </p>
          </Section>
          <Section title="What we never do">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Sell your data to third parties.</li>
              <li>Share your contact info with anyone outside the Arzon team without consent.</li>
              <li>Send marketing SMS without explicit opt-in.</li>
            </ul>
          </Section>
          <Section title="Your rights">
            <p>
              You can request a copy or deletion of your data at any time by emailing{" "}
              <a href="mailto:privacy@arzonglobal.com" className="text-primary-glow underline">
                privacy@arzonglobal.com
              </a>
              . We respond within 7 working days.
            </p>
          </Section>
          <Section title="Cookies & local storage">
            <p>
              We use localStorage to remember your application progress and learning state on this
              device. We do not use third-party tracking cookies for advertising.
            </p>
          </Section>
          <Section title="Contact">
            <p>
              Privacy questions:{" "}
              <a href="mailto:privacy@arzonglobal.com" className="text-primary-glow underline">
                privacy@arzonglobal.com
              </a>
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
