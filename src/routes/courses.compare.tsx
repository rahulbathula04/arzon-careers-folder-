import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { CTAButton } from "@/components/landing/CTAButton";
import { Check, X } from "lucide-react";
import { pageSeo } from "@/lib/seo";

interface Row {
  feature: string;
  arzon: string | boolean;
  generic: string | boolean;
  youtube: string | boolean;
}
const ROWS: Row[] = [
  { feature: "ISO 9001 certified provider", arzon: true, generic: false, youtube: false },
  { feature: "Govt-recognised (MSME · MCA)", arzon: true, generic: "Sometimes", youtube: false },
  {
    feature: "Verifiable performance certificate",
    arzon: "ACRI 0–100",
    generic: "Participation",
    youtube: false,
  },
  { feature: "JD-derived live syllabus", arzon: true, generic: false, youtube: false },
  { feature: "Argus-style PV simulation", arzon: true, generic: "Rare", youtube: false },
  { feature: "1:1 counsellor on WhatsApp", arzon: true, generic: "Bot", youtube: false },
  {
    feature: "Break-even inside month one (₹3.2 LPA entry)",
    arzon: true,
    generic: false,
    youtube: false,
  },
  {
    feature: "Pay-after-offer for top scorers",
    arzon: "ACRI ≥ 80",
    generic: false,
    youtube: false,
  },
  {
    feature: "Mentors who currently work in industry",
    arzon: true,
    generic: "Mixed",
    youtube: false,
  },
  {
    feature: "Live cohort + recorded lifetime access",
    arzon: true,
    generic: "One or other",
    youtube: "Recorded only",
  },
];

export const Route = createFileRoute("/courses/compare")({
  head: () => {
    const ps = pageSeo({
      path: "/courses/compare",
      title: "Compare Arzon Global vs typical online courses",
      description:
        "Compare Arzon Global vs generic ed-tech and YouTube self-study for healthcare workforce readiness.",
      image: "/og/internships.jpg",
    });
    return {
      meta: [{ title: "Compare Arzon Global vs typical online courses" }, ...ps.meta],
      links: ps.links,
    };
  },
  component: ComparePage,
});

function Cell({ v }: { v: string | boolean }) {
  if (v === true)
    return (
      <span className="inline-flex items-center gap-1 text-eyebrow">
        <Check className="h-4 w-4" /> Yes
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex items-center gap-1 text-white/60">
        <X className="h-4 w-4" /> No
      </span>
    );
  return <span className="text-white/80">{v}</span>;
}

function ComparePage() {
  return (
    <main className="min-h-app text-white">
      <section className="mx-auto max-w-5xl px-5 pb-20 pt-16 sm:px-6 lg:px-8">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold">
          Side-by-side
        </p>
        <h1 className="h-display mt-3">Arzon vs typical alternatives</h1>
        <p className="body-lg mt-4 max-w-2xl">
          The clearest way to evaluate any programme is to put it next to its alternatives. Here is
          how Arzon Global compares with typical online ed-tech and YouTube self-study.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="bg-white/[0.04] font-mono text-micro uppercase tracking-[0.18em] text-white/80">
              <tr>
                <th className="px-5 py-4">Feature</th>
                <th className="px-5 py-4 text-gold">Arzon Global</th>
                <th className="px-5 py-4">Typical online ed-tech</th>
                <th className="px-5 py-4">YouTube self-study</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {ROWS.map((r) => (
                <tr key={r.feature}>
                  <td className="px-5 py-4 font-medium text-white/85">{r.feature}</td>
                  <td className="px-5 py-4">
                    <Cell v={r.arzon} />
                  </td>
                  <td className="px-5 py-4">
                    <Cell v={r.generic} />
                  </td>
                  <td className="px-5 py-4">
                    <Cell v={r.youtube} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="btn btn-primary">
            Take the 3-min ACRI Preview →
          </Link>
          <CTAButton asChild variant="ghost">
            <Link to="/courses">Browse all programmes</Link>
          </CTAButton>
        </div>
      </section>
      <Footer />
    </main>
  );
}
