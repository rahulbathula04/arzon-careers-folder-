import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { ShieldCheck, ArrowRight, FileCheck } from "lucide-react";
import { listPublicPlacements, type PublicPlacement } from "@/lib/placements.functions";

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
      // DB unreachable — fail closed to 404 rather than expose a shell page.
      throw notFound();
    }
    // Do not expose an empty ledger publicly — reads as vaporware.
    // The page re-appears automatically the first time a hire is verified.
    if (placements.length === 0) throw notFound();
    return { placements };
  },
  component: PlacementsPage,
  errorComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 text-center text-muted-foreground">
      Placement ledger is temporarily unavailable. Please try again in a moment.
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-primary" aria-hidden="true" />
        <h2 className="text-h3 font-bold tracking-tight text-primary">
          Placement ledger opens with the first verified hire
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          We only publish placements once the offer letter is confirmed in writing by the employer.
          No inflated stats, no unverified names. The ledger appears here the moment the first
          verified hire lands.
        </p>
        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          <Link to="/methodology" className="text-primary underline underline-offset-4">
            How we verify placements
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-primary">
            Back to home
          </Link>
        </div>
      </div>
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
  // month_start is a date (YYYY-MM-DD) — treat as local calendar month.
  const [y, m] = iso.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

function PlacementsPage() {
  const { placements } = Route.useLoaderData();
  const count = placements.length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            Public ledger · updated in real time
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
            Verified Placements
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Every hire Arzon places lands here — confirmed in writing by the employer, timestamped,
            and never deleted. No aggregate percentages. No unnamed testimonials. If it isn&rsquo;t
            in this ledger, it didn&rsquo;t happen.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Stat label="Verified placements" value={String(count)} />
            <Stat label="Unverified claims" value="0" />
            <Stat label="Source of truth" value="Employer letter" />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16">
        {count === 0 ? <EmptyLedger /> : <LedgerTable rows={placements} />}
      </section>

      <section className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            How an entry gets on this page
          </h2>
          <ol className="mt-6 space-y-4 text-muted-foreground">
            <Step n={1} title="Employer sends a signed offer or hire confirmation">
              We accept only employer-issued documents. Screenshots and self-reports are not
              evidence.
            </Step>
            <Step n={2} title="Arzon verifies the document and the candidate">
              Two-party check: employer contact + candidate. No third-party intermediaries.
            </Step>
            <Step n={3} title="Entry is published — permanently">
              Rows are append-only. Corrections are versioned in a separate audit trail. Nothing is
              ever quietly deleted.
            </Step>
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/why-arzon"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
            >
              Read our methodology
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/recruiters"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
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
    <div className="rounded-2xl border border-border/60 p-5">
      <div className="font-mono text-4xl font-semibold tabular-nums tracking-tight md:text-5xl">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function EmptyLedger() {
  return (
    <div className="rounded-3xl border border-dashed border-border p-10 text-center md:p-16">
      <FileCheck className="mx-auto h-10 w-10 text-muted-foreground" />
      <h2 className="mt-4 text-2xl font-semibold tracking-tight">
        0 verified placements — for now
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
        This page will populate the moment an employer confirms a hire in writing. We would rather
        publish an empty ledger than an inflated one. That is the difference between a placement
        platform and a marketing page.
      </p>
    </div>
  );
}

function LedgerTable({ rows }: { rows: PublicPlacement[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Month</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">City</th>
            <th className="px-4 py-3 font-medium">Employer</th>
            <th className="px-4 py-3 font-medium">Verified by</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border/60">
              <td className="px-4 py-3 font-mono tabular-nums">{formatMonth(r.month_start)}</td>
              <td className="px-4 py-3">{r.role_title}</td>
              <td className="px-4 py-3">{r.city}</td>
              <td className="px-4 py-3">{r.employer_name}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {EVIDENCE_LABELS[r.evidence_source] ?? r.evidence_source}
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
    <li className="flex gap-4">
      <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-border bg-background font-mono text-sm tabular-nums">
        {n}
      </div>
      <div>
        <div className="font-medium text-foreground">{title}</div>
        <div className="mt-1 text-sm">{children}</div>
      </div>
    </li>
  );
}
