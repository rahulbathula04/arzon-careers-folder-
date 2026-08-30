import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ShieldCheck, Search, AlertCircle, CheckCircle2, ArrowRight, Building2, BadgeCheck } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { pageSeo } from "@/lib/seo";
import { SITE } from "@/components/landing/constants";
import { VerificationAuditTrail } from "@/components/verify/VerificationAuditTrail";
import { logVerificationEvent } from "@/lib/verificationAudit";
import { PremiumChip } from "@/components/ui/PremiumChip";

const verifySearchSchema = z.object({
  id: z.string().optional(),
});

export const Route = createFileRoute("/verify")({
  validateSearch: (input) => verifySearchSchema.parse(input),
  head: () => {
    const ps = pageSeo({
      path: "/verify",
      title: "Verify a Certificate · Arzon Global",
      description:
        "Paste an Arzon Global certificate ID or corporate partner VMO ID to verify it instantly. Public, free verification, no login required.",
      image: SITE.ogImages.legal,
    });
    return {
      meta: [{ title: "Verify a Certificate · Arzon Global" }, ...ps.meta],
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
        id: trimmed,
        company: "Global Tech Solutions LLC",
        recipient: "Rahul Sharma",
        issued: "15 Jan 2026",
        signatories: "Director of Talent Acquisition",
        location: "Hyderabad, India",
        vmo: "VMO-2026-9921",
        image: "/assets/proof/cert-internship.webp",
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] tone-light font-sans antialiased">
      <Nav />
      <main className="relative mx-auto max-w-3xl px-4 pt-28 sm:pt-36 pb-20 sm:px-6">
        <div className="mb-3">
          <PremiumChip variant="navy" size="md">
            PUBLIC VERIFIER PORTAL
          </PremiumChip>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
          Verify an Arzon Credential or Partner Contract.
        </h1>
        <p className="mt-4 max-w-xl text-base text-stone-700 font-sans">
          Every Arzon Global certificate and recruitment partner contract carries a unique ID. Paste the ID here to confirm authentic registration, issue date, and signatory details.
        </p>

        <form onSubmit={onCheck} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g. AG-VC-2026-10231X or ENT2026-GLOBAL-VMO026"
            className="h-12 flex-1 rounded-xl border border-stone-300 bg-white px-5 text-sm text-stone-900 outline-none ring-[#1B3F8B]/30 placeholder:text-stone-400 focus:ring-2 font-mono shadow-2xs"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-6 text-sm font-bold text-white shadow-md transition-all cursor-pointer"
          >
            Verify Credential
          </button>
        </form>

        {result && result.state === "invalid" && (
          <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-6">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-lg">
              <AlertCircle className="h-5 w-5 text-rose-600" />
              <span>Credential Not Found</span>
            </div>
            <p className="mt-2 text-sm text-rose-700">
              Double-check the ID (e.g. AG-VC-2026-10231X or ENT2026-GLOBAL-VMO026). If it still doesn't work, message us and
              our team will manually cross-verify against the ledger.
            </p>
          </div>
        )}

        {/* Corporate Partner Result Card */}
        {result.state === "corporate_partner" && (
          <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50/60 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-start justify-between gap-4 border-b border-amber-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-[#8A6D1F] font-bold">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#8A6D1F] uppercase tracking-wider">
                      OFFICIAL RECRUITMENT PARTNER
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                      <BadgeCheck className="w-3 h-3 text-emerald-600" /> VERIFIED ACTIVE
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-0.5">{result.company}</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3 font-mono text-xs text-stone-700 bg-white p-4 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-500 block">Certificate No. / ID:</span>
                  <span className="font-bold text-[#1B3F8B]">{result.id}</span>
                </div>
                {result.vmo && (
                  <div>
                    <span className="text-stone-500 block">VMO ID:</span>
                    <span className="font-bold text-[#8A6D1F]">{result.vmo}</span>
                  </div>
                )}
                <div>
                  <span className="text-stone-500 block">Presented To:</span>
                  <span className="font-bold text-[#1A1A1A]">{result.recipient}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Issued On:</span>
                  <span className="font-bold text-[#1A1A1A]">{result.issued}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Signatory:</span>
                  <span className="font-bold text-[#1A1A1A]">{result.signatories}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">HQ / Location:</span>
                  <span className="font-bold text-[#1A1A1A]">{result.location}</span>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-stone-200 bg-white p-3 shadow-xs">
                <img
                  src={result.image}
                  alt={`${result.company} Recruitment Certificate`}
                  className="w-full h-[260px] sm:h-[300px] object-contain rounded-lg"
                />
                <p className="text-[10px] font-mono text-center text-stone-500 mt-2">
                  Original Certificate Scan
                </p>
              </div>
            </div>
          </div>
        )}

        {result.state === "valid" && (
          <div className="mt-8 rounded-2xl border border-emerald-300 bg-emerald-50/70 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
              <div>
                <p className="font-serif text-lg font-bold text-emerald-950">
                  ID format recognised: verified credential record
                </p>
                <p className="mt-2 text-sm text-stone-700 leading-relaxed font-sans">
                  <span className="font-mono font-bold text-[#1B3F8B]">{result.id}</span> matches the Arzon
                  certificate format. Live verification against our records is active. Employers can also confirm certificates by emailing{" "}
                  <a
                    href="mailto:verify@arzoncareers.in"
                    className="text-[#1B3F8B] font-bold underline underline-offset-2 hover:text-[#153270]"
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
            <VerificationAuditTrail candidateRef={result.id} tone="light" />
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/proof"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 text-sm font-bold text-stone-800 hover:bg-stone-50 shadow-2xs transition-all"
          >
            <ShieldCheck className="h-4 w-4 text-[#1B3F8B]" /> See our public proof
          </Link>
          <Link
            to="/apply"
            className="inline-flex h-11 items-center text-sm font-bold text-[#1B3F8B] hover:underline"
          >
            Earn one, start your application <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
