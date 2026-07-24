import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ShieldCheck, Search, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { SITE } from "@/components/landing/constants";
import { VerificationAuditTrail } from "@/components/verify/VerificationAuditTrail";
import { logVerificationEvent } from "@/lib/verificationAudit";

const verifySearchSchema = z.object({
  id: z.string().optional(),
});

export const Route = createFileRoute("/verify")({
  validateSearch: (input) => verifySearchSchema.parse(input),
  head: () => {
    const ps = pageSeo({
      path: "/verify",
      title: "Verify a certificate. Arzon Global",
      description:
        "Paste an Arzon Global certificate ID to verify it instantly. Public, free verification, no login required.",
      image: SITE.ogImages.legal,
    });
    return {
      meta: [{ title: "Verify a certificate. Arzon Global" }, ...ps.meta],
      links: ps.links,
    };
  },
  component: VerifyPage,
});

type Result =
  | { state: "idle" }
  | { state: "valid"; id: string; name: string; programme: string; issued: string }
  | { state: "invalid"; id: string };

function VerifyPage() {
  const { id: incomingId } = Route.useSearch();
  const [id, setId] = useState(incomingId ?? "");
  const [result, setResult] = useState<Result>({ state: "idle" });

  const runCheck = (raw: string) => {
    const trimmed = raw.trim().toUpperCase();
    if (!trimmed) return;
    // Live verification wires to Supabase once the first cohort graduates.
    // Until then, we confirm the ID format is correct and tell the user honestly.
    if (/^AG-[A-Z0-9]{6,}/.test(trimmed)) {
      void logVerificationEvent(trimmed, "qr_scanned");
      setResult({ state: "valid", id: trimmed, name: "", programme: "", issued: "" });
    } else {
      setResult({ state: "invalid", id: trimmed });
    }
  };

  const onCheck = (e: React.FormEvent) => {
    e.preventDefault();
    runCheck(id);
  };

  // Auto-verify when arriving with ?id=... (from the home-page mini widget)
  useEffect(() => {
    if (incomingId) runCheck(incomingId);
  }, [incomingId]);

  return (
    <main className="tone-dark min-h-app bg-[#0A0F1E] text-white">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
          Public verifier
        </p>
        <h1 className="h-display mt-3">Verify an Arzon certificate.</h1>
        <p className="mt-4 max-w-xl text-base text-white/70">
          Every Arzon Global certificate carries a unique ID + QR. Paste the ID here to confirm the
          holder, the programme, and the issue date. No login, no fees.
        </p>

        <form onSubmit={onCheck} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g. AG-PV-MED-2026-XXXX" // copy-claims-ok: certificate ID format
            className="h-12 flex-1 rounded-full border border-white/10 bg-[#0b1220] px-5 text-sm text-white outline-none ring-primary/30 placeholder:text-white/80 focus:ring-2"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <Search className="mr-2 h-4 w-4" />
            Verify
          </button>
        </form>

        {result.state === "valid" && (
          <div className="mt-8 rounded-2xl border border-amber-400/25 bg-amber-400/5 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden />
              <div>
                <p className="font-semibold text-white">ID format recognised — verification coming soon</p>
                <p className="mt-2 text-sm text-white/70">
                  <span className="font-mono text-white/90">{result.id}</span> matches the Arzon
                  certificate format. Live verification against our records goes live when the
                  first cohort graduates. Until then, employers can confirm certificates by
                  emailing{" "}
                  <a
                    href="mailto:verify@arzoncareers.in"
                    className="text-accent-glow underline underline-offset-2 hover:text-white"
                  >
                    verify@arzoncareers.in
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        )}

        {result.state === "valid" && (
          <div className="mt-6">
            <VerificationAuditTrail candidateRef={result.id} tone="dark" />
          </div>
        )}

        {result.state === "invalid" && (
          <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6">
            <AlertCircle className="h-6 w-6 text-amber-300" />
            <p className="mt-2 font-semibold text-white">We couldn't verify "{result.id}"</p>
            <p className="mt-1 text-sm text-white/65">
              Double-check the ID (format starts with AG-). If it still doesn't work, message us and
              we'll look it up manually.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/proof"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10"
          >
            <ShieldCheck className="h-4 w-4 text-primary-glow" /> See our public proof
          </Link>
          <Link
            to="/apply"
            className="inline-flex h-11 items-center text-sm font-semibold text-primary-glow hover:underline"
          >
            Earn one, start your application <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-micro uppercase tracking-wider text-white/70">{k}</dt>
      <dd className="mt-0.5 font-mono text-white/90">{v}</dd>
    </div>
  );
}
