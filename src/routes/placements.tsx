import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { pageSeo } from "@/lib/seo";
import { ShieldCheck, ArrowRight, FileCheck } from "lucide-react";
import { listPublicPlacements, type PublicPlacement } from "@/lib/placements.functions";
import { PremiumChip } from "@/components/ui/PremiumChip";

export const Route = createFileRoute("/placements")({
  head: () => {
    const title = "Verified Placements · Arzon Careers";
    const desc =
      "The public ledger of every hire Arzon has placed. Each entry is confirmed in writing by the employer. No unverified claims. No inflated numbers.";
    const seo = pageSeo({
      path: "/placements",
      title,
      description: desc,
      ogType: "article",
    });
    return { meta: [{ title }, ...seo.meta], links: seo.links };
  },
  loader: async () => {
    let placements: PublicPlacement[] = [];
    try {
      const res = await listPublicPlacements({ data: {} });
      placements = res.placements;
    } catch {
      // DB unreachable - fail closed to 404 rather than expose a shell page.
      throw notFound();
    }
    // Do not expose an empty ledger publicly - reads as vaporware.
    // The page re-appears automatically the first time a hire is verified.
    if (placements.length === 0) throw notFound();
    return { placements };
  },
  component: PlacementsPage,
  pendingComponent: () => (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 animate-pulse">
        <div className="h-3 w-28 rounded bg-stone-200" />
        <div className="mt-3 h-10 w-2/3 rounded-xl bg-stone-200" />
        <div className="mt-4 h-4 w-full max-w-xl rounded bg-stone-200" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-stone-200" />
          ))}
        </div>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-8 text-center text-stone-600">
      Placement ledger is temporarily unavailable. Please try again in a moment.
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      <Nav />
      <div className="max-w-md mx-auto my-auto p-8 text-center">
        <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-[#1B3F8B]" aria-hidden="true" />
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
          Placement ledger opens with the first verified hire
        </h2>
        <p className="mt-3 text-sm text-stone-600 font-sans leading-relaxed">
          We only publish placements once the offer letter is confirmed in writing by the employer.
          No inflated stats, no unverified names. The ledger appears here the moment the first
          verified hire lands.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 text-sm font-sans">
          <Link to="/why-arzon" className="text-[#1B3F8B] font-bold underline underline-offset-4 hover:text-[#153270]">
            How we verify placements
          </Link>
          <Link to="/" className="text-stone-500 hover:text-stone-800">
            Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  ),
});

const EVIDENCE_LABELS: Record<string, string> = {
  signed_offer_letter: "Signed offer letter",
  employer_hr_email: "Employer HR email",
  payslip: "Payslip",
  joining_letter: "Joining letter",
  linkedin_confirmation: "LinkedIn confirmation",
};

function formatMonth(iso: string): string {
  const [y, m] = iso.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

function PlacementsPage() {
  const { placements } = Route.useLoaderData();
  const count = placements.length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased">
      <Nav />
      <header className="border-b border-stone-200 bg-white pt-28 sm:pt-36 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-3">
            <PremiumChip variant="navy" size="md">
              PUBLIC VERIFIED LEDGER
            </PremiumChip>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A1A1A]">
            Verified Placements
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
            Every hire Arzon places lands here - confirmed in writing by the employer, timestamped,
            and never deleted. No aggregate percentages. No unnamed testimonials. If it isn't
            in this ledger, it didn't happen.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Stat label="Verified placements" value={String(count)} />
            <Stat label="Unverified claims" value="0" />
            <Stat label="Source of truth" value="Employer letter" />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {count === 0 ? <EmptyLedger /> : <LedgerTable rows={placements} />}
      </section>

      <section className="border-t border-stone-200 bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            How an entry gets on this page
          </h2>
          <ol className="space-y-4 text-stone-700 font-sans">
            <Step n={1} title="Employer sends a signed offer or hire confirmation">
              We accept only employer-issued documents. Screenshots and self-reports are not
              evidence.
            </Step>
            <Step n={2} title="Arzon verifies the document and the candidate">
              Two-party check: employer contact + candidate. No third-party intermediaries.
            </Step>
            <Step n={3} title="Entry is published - permanently">
              Rows are append-only. Corrections are versioned in a separate audit trail. Nothing is
              ever quietly deleted.
            </Step>
          </ol>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link
              to="/why-arzon"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-5 py-3 text-sm font-bold text-white shadow-xs transition"
            >
              Read our methodology
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/recruiters"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 px-5 py-3 text-sm font-bold text-stone-800 shadow-2xs transition"
            >
              Hire from Arzon
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 shadow-2xs">
      <div className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3F8B]">
        {value}
      </div>
      <div className="mt-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-600">{label}</div>
    </div>
  );
}

function EmptyLedger() {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center shadow-2xs md:p-16">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-600">
        <FileCheck className="h-7 w-7" />
      </div>
      <h2 className="mt-5 font-serif text-2xl font-bold text-[#1A1A1A]">
        0 verified placements - for now
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-stone-600 font-sans">
        This page will populate the moment an employer confirms a hire in writing. We would rather
        publish an empty ledger than an inflated one. That is the difference between a placement
        platform and a marketing page.
      </p>
    </div>
  );
}

function LedgerTable({ rows }: { rows: PublicPlacement[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
      <table className="w-full text-left text-sm font-sans">
        <thead className="bg-stone-50 border-b border-stone-200 text-xs font-mono uppercase tracking-wider text-stone-600">
          <tr>
            <th className="px-6 py-4 font-bold">Month</th>
            <th className="px-6 py-4 font-bold">Role</th>
            <th className="px-6 py-4 font-bold">City</th>
            <th className="px-6 py-4 font-bold">Employer</th>
            <th className="px-6 py-4 font-bold">Verified by</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-stone-50 transition-colors">
              <td className="px-6 py-4 font-mono font-semibold text-stone-700">
                {formatMonth(r.month_start)}
              </td>
              <td className="px-6 py-4 font-serif font-bold text-[#1A1A1A]">{r.role_title}</td>
              <td className="px-6 py-4 text-stone-600">{r.city}</td>
              <td className="px-6 py-4 font-semibold text-stone-800">{r.employer_name}</td>
              <td className="px-6 py-4 text-xs">
                <span className="inline-flex items-center rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-1 text-emerald-800 font-mono font-bold text-[10px]">
                  {EVIDENCE_LABELS[r.evidence_source] ?? r.evidence_source}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4 items-start">
      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-sky-100 font-mono text-sm font-bold text-[#1B3F8B]">
        {n}
      </div>
      <div className="pt-0.5">
        <div className="font-serif text-base font-bold text-[#1A1A1A]">{title}</div>
        <div className="mt-1 text-sm text-stone-600 leading-relaxed font-sans">{children}</div>
      </div>
    </li>
  );
}
