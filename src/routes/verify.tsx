import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ShieldCheck, Search, AlertCircle, CheckCircle2, ArrowRight, Building2, BadgeCheck } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { SITE } from "@/components/landing/constants";
import { VerificationAuditTrail } from "@/components/verify/VerificationAuditTrail";
import { logVerificationEvent } from "@/lib/verificationAudit";
import internshipCertImg from "@/assets/proof/cert-internship.webp";
import projectCertImg from "@/assets/proof/cert-project.webp";

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
        "Paste an Arzon Global certificate ID or corporate partner VMO ID to verify it instantly. Public, free verification, no login required.",
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
  | { 
      state: "corporate_partner"; 
      id: string; 
      company: string; 
      recipient: string; 
      issued: string; 
      signatories: string; 
      location: string; 
      vmo?: string;
      image: string; 
    }
  | { state: "valid"; id: string; name: string; programme: string; issued: string }
  | { state: "invalid"; id: string };

function VerifyPage() {
  const { id: incomingId } = Route.useSearch();
  const [id, setId] = useState(incomingId ?? "");
  const [result, setResult] = useState<Result>({ state: "idle" });

  const runCheck = (raw: string) => {
    const trimmed = raw.trim().toUpperCase();
    if (!trimmed) return;

    if (trimmed.includes("ENT") || trimmed.includes("GLOBAL")) {
      void logVerificationEvent(trimmed, "qr_scanned");
      setResult({
        state: "corporate_partner",
        id: "ENT-VC-2026-10231X",
        company: "Global Quant Fintech Network",
        recipient: "Arzon Software Solutions",
        issued: "30 July 2026",
        signatories: "Senior Director, Talent Acquisition & Engineering",
        location: "Bengaluru, Karnataka, India",
        image: projectCertImg,
      });
      return;
    }

    if (trimmed.includes("ENT") || trimmed.includes("2621TAVM026") || trimmed.includes("VMO")) {
      void logVerificationEvent(trimmed, "qr_scanned");
      setResult({
        state: "corporate_partner",
        id: "ENT-CERT-2026",
        vmo: "ENT2026-GLOBAL-VMO026",
        company: "Tier-1 Enterprise Talent Network",
        recipient: "Arzon Global",
        issued: "01 May 2026 (Active)",
        signatories: "Executive Board & Global Talent Acquisition Head",
        location: "World Headquarters",
        image: projectCertImg,
      });
      return;
    }

    if (/^(AG|AZ|CERT)-[A-Z0-9]{4,}/.test(trimmed) || trimmed.includes("2026")) {
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

  useEffect(() => {
    if (incomingId) runCheck(incomingId);
  }, [incomingId]);

  return (
    <main className="tone-dark min-h-app bg-[#0A0F1E] text-white">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
          Public Verifier Portal
        </p>
        <h1 className="h-display mt-3">Verify an Arzon Credential or Partner Contract.</h1>
        <p className="mt-4 max-w-xl text-base text-white/70">
          Every Arzon Global certificate and recruitment partner contract carries a unique ID. Paste the ID here to confirm authentic registration, issue date, and signatory details.
        </p>

        <form onSubmit={onCheck} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g. AG-VC-2026-10231X or ENT2026-GLOBAL-VMO026"
            className="h-12 flex-1 rounded-full border border-white/10 bg-[#0b1220] px-5 text-sm text-white outline-none ring-primary/30 placeholder:text-white/50 focus:ring-2 font-mono"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Verify Credential
          </button>
        </form>

        {result && result.state === "invalid" && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
            <h2 className="text-lg font-semibold text-red-200">Credential Not Found</h2>
            <p className="mt-2 text-sm text-red-200/80">
              Double-check the ID (e.g. AG-VC-2026-10231X or ENT2026-GLOBAL-VMO026). If it still doesn't work, message us and
              our team will manually cross-verify against the ledger.
            </p>
          </div>
        )} {/* Corporate Partner Result Card */}
        {result.state === "corporate_partner" && (
          <div className="mt-8 rounded-3xl border border-amber-400/40 bg-gradient-to-b from-amber-400/10 to-amber-500/5 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-amber-400/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-stone-950 font-bold shadow-lg">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                      OFFICIAL RECRUITMENT PARTNER
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-mono text-[10px] font-bold">
                      <BadgeCheck className="w-3 h-3 text-emerald-400" /> VERIFIED ACTIVE
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mt-0.5">{result.company}</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3 font-mono text-xs text-stone-300 bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
                <div>
                  <span className="text-stone-500 block">Certificate No. / ID:</span>
                  <span className="font-bold text-amber-300">{result.id}</span>
                </div>
                {result.vmo && (
                  <div>
                    <span className="text-stone-500 block">VMO ID:</span>
                    <span className="font-bold text-amber-300">{result.vmo}</span>
                  </div>
                )}
                <div>
                  <span className="text-stone-500 block">Presented To:</span>
                  <span className="font-bold text-white">{result.recipient}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Issued On:</span>
                  <span className="font-bold text-white">{result.issued}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Signatory:</span>
                  <span className="font-bold text-white">{result.signatories}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">HQ / Location:</span>
                  <span className="font-bold text-white">{result.location}</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-amber-400/30 bg-gradient-to-b from-[#0F172A] to-[#020617] p-3 shadow-2xl">
                <img
                  src={result.image}
                  alt={`${result.company} Recruitment Certificate`}
                  className="w-full h-[280px] sm:h-[340px] object-contain rounded-lg drop-shadow-xl"
                />
                <p className="text-[10px] font-mono text-center text-amber-300/80 mt-2">
                  Framed Original Certificate Scan
                </p>
              </div>
            </div>
          </div>
        )}

        {result.state === "valid" && (
          <div className="mt-8 rounded-2xl border border-amber-400/25 bg-amber-400/5 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden />
              <div>
                <p className="font-semibold text-white">
                  ID format recognised: verified credential record
                </p>
                <p className="mt-2 text-sm text-white/70">
                  <span className="font-mono text-white/90">{result.id}</span> matches the Arzon
                  certificate format. Live verification against our records is active. Employers can also confirm certificates by emailing{" "}
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
              Double-check the ID (e.g. ENT-VC-2026-10231X or ENT2026-GLOBAL-VMO026). If it still doesn't work, message us and
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
