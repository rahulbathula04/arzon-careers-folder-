import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X, ArrowRight } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

type Value = string | boolean;
type Row = { feature: string; arzon: Value; typical: Value; selfStudy: Value };

const ROWS: Row[] = [
  { feature: "Role-first career guidance", arzon: true, typical: "Varies", selfStudy: false },
  { feature: "Structured live cohort", arzon: true, typical: "Varies", selfStudy: false },
  { feature: "Practical projects", arzon: true, typical: "Varies", selfStudy: "Self-managed" },
  { feature: "Mentor or support layer", arzon: true, typical: "Varies", selfStudy: false },
  { feature: "Readiness assessment", arzon: true, typical: "Varies", selfStudy: false },
  { feature: "Career support", arzon: true, typical: "Varies", selfStudy: "Self-managed" },
  { feature: "Healthcare role focus", arzon: true, typical: "Usually broader", selfStudy: "Topic dependent" },
  { feature: "Programme evidence / portfolio work", arzon: true, typical: "Varies", selfStudy: "Depends on learner" },
];

export const Route = createFileRoute("/courses/compare")({
  head: () => {
    const ps = pageSeo({
      path: "/courses/compare",
      title: "Compare programme approaches · Arzon Global",
      description: "Compare role-focused programme elements with common online learning and self-study approaches.",
      image: "/og/internships.jpg",
    });
    return { meta: [{ title: "Compare programme approaches · Arzon Global" }, ...ps.meta], links: ps.links };
  },
  component: ComparePage,
});

function Cell({ value }: { value: Value }) {
  if (value === true) return <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--arzon-teal-600)]"><Check className="h-4 w-4" /> Included</span>;
  if (value === false) return <span className="inline-flex items-center gap-1.5 text-[var(--arzon-ink-muted)]"><X className="h-4 w-4" /> Not inherent</span>;
  return <span className="text-[var(--arzon-ink-soft)]">{value}</span>;
}

function ComparePage() {
  return (
    <div className="arzon-v2-page min-h-screen bg-white tone-light text-[var(--arzon-ink)]">
      <ArzonV2PageHero
        eyebrow="PROGRAMMES · COMPARE"
        title="Compare the learning system before you choose."
        description="Look at the structure around a programme: career guidance, practical work, support, readiness and evidence. Then decide what matters for your own path."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">Get My Career Plan <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/courses" className="arzon-v2-button-secondary">Browse Programmes</Link>
        </div>
      </ArzonV2PageHero>

      <ArzonDecisionHub
        eyebrow="CHOOSE WITH CONTEXT"
        title="Start with the role. Compare the preparation."
        description="The Career Engine can help identify a direction. This comparison helps you inspect how different learning models support execution."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Explore Roles"
        secondaryTo="/roles"
      />

      <main className="arzon-v2-container pb-24 pt-12">
        <section className="arzon-v2-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-[var(--arzon-surface-subtle)]">
                <tr className="border-b border-[var(--arzon-border)]">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[var(--arzon-ink-muted)]">Programme element</th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[var(--arzon-blue-700)]">Arzon</th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[var(--arzon-ink-muted)]">Typical online programme</th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[var(--arzon-ink-muted)]">Self-study</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.feature} className="border-b border-[var(--arzon-border)] last:border-b-0">
                    <th scope="row" className="px-5 py-4 font-semibold text-[var(--arzon-ink)]">{row.feature}</th>
                    <td className="px-5 py-4"><Cell value={row.arzon} /></td>
                    <td className="px-5 py-4"><Cell value={row.typical} /></td>
                    <td className="px-5 py-4"><Cell value={row.selfStudy} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">Start the free assessment <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/courses" className="arzon-v2-button-secondary">See programme catalogue</Link>
        </div>
      </main>
    </div>
  );
}
