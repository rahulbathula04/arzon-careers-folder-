import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { TrustBar } from "@/components/courses/TrustBar";
import { DarkBackdrop } from "@/components/courses/DarkBackdrop";
import { Certificate, makeCertId } from "@/components/courses/Certificate";
import { COURSES_BY_SLUG } from "@/data/courses";
import { ArrowRight, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/components/landing/constants";

export const Route = createFileRoute("/certificates/sample/$slug")({
  loader: ({ params }) => {
    const c = COURSES_BY_SLUG[params.slug];
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `Sample certificate · ${loaderData.title}, Arzon Global` },
            {
              name: "description",
              content: `See exactly what your Arzon Global certificate for ${loaderData.title} will look like. ISO-certified, QR-verifiable.`,
            },
            {
              property: "og:title",
              content: `Sample certificate · ${loaderData.title}, Arzon Global`,
            },
            {
              property: "og:description",
              content: "Type your name, see your certificate, share with your parents in 2 taps.",
            },
          ],
        }
      : {},
  notFoundComponent: () => (
    <DarkBackdrop>
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <h2 className="h-display">Programme not found</h2>
        <Link
          to="/courses"
          className="mt-8 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          See all programmes
        </Link>
      </div>
      <Footer />
    </DarkBackdrop>
  ),
  component: SampleCertPage,
});

function SampleCertPage() {
  const course = Route.useLoaderData();
  const [name, setName] = useState("");
  const id = makeCertId(course.slug, name);
  const shareMsg = `Hi, sharing a sample of the Arzon Global certificate for ${course.title}. Verifiable on /verify with ID ${id}.`;

  return (
    <DarkBackdrop>
      <TrustBar />

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
        <Link
          to="/courses/$slug"
          params={{ slug: course.slug }}
          className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow hover:underline"
        >
          ← Back to {course.title}
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.28em] text-eyebrow">
              Sample certificate
            </p>
            <h1 className="h-display mt-3">See your name on it.</h1>
            <p className="mt-3 max-w-xl text-base text-slate-300">
              Type your name below, the certificate updates live with a unique ID and a QR code that
              lands recruiters on <span className="font-semibold text-white">/verify</span>.
            </p>

            <div className="mt-8">
              <Certificate course={course} holderName={name} certificateId={id} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-20">
            <div
              className="rounded-3xl border border-border bg-card p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <label className="block">
                <span className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Your full name
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 40))}
                  placeholder="e.g. Aditi Sharma"
                  className="mt-2 h-11 w-full rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none ring-primary/30 focus:ring-2"
                />
              </label>
              <p className="mt-3 text-micro text-muted-foreground">
                Certificate ID: <span className="font-mono text-foreground">{id}</span>
              </p>

              <div className="mt-5 space-y-2.5">
                <Button
                  type="button"
                  onClick={() => window.print()}
                  className="h-11 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  style={{ boxShadow: "var(--shadow-glow)" }}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print / save as PDF
                </Button>
                <a
                  href={waLink(shareMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-semibold text-foreground hover:bg-muted"
                >
                  <Share2 className="h-4 w-4 text-primary" />
                  Share on WhatsApp
                </a>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground">
                <p className="font-semibold text-foreground">Issuance rules</p>
                <ul className="mt-2 space-y-1.5">
                  <li>≥80% modules completed → Internship Certificate</li>
                  <li>≥1 capstone graded → Project Certificate</li>
                  <li>≥85% overall + mentor nod → Performance LOR</li>
                </ul>
                <p className="mt-3 italic">Sample only, not a valid credential.</p>
              </div>

              <Link
                to="/career-engine"
                className="mt-5 inline-flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Take the 3-min fit test <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </DarkBackdrop>
  );
}
