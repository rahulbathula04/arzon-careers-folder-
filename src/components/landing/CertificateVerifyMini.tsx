import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Search, ArrowRight } from "lucide-react";

const SAMPLE_ID = "AG-PV-2026-001";

/**
 * Home-page mini-verifier. One-input card that routes to /verify with the
 * pasted ID prefilled. Pre-loads a real sample ID so students can try it
 * with one click. Trust-by-doing beats trust-by-badge.
 */
export function CertificateVerifyMini() {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = (id.trim() || SAMPLE_ID).toUpperCase();
    navigate({ to: "/verify", search: { id: next } });
  };

  return (
    <form
      onSubmit={submit}
      className="card-light flex flex-col gap-4 rounded-2xl border border-teal-deep/15 p-5 sm:p-6 md:flex-row md:items-center md:gap-6"
      aria-label="Verify any Arzon certificate"
    >
      <div className="flex items-start gap-3 md:flex-1">
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-800 ring-1 ring-inset ring-sky-700/20">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-sky-800">
            Live · public verifier
          </p>
          <p className="mt-1 font-grotesk text-body font-bold leading-snug text-ink sm:text-body">
            Verify any Arzon certificate, right now.
          </p>
          <p className="mt-1 text-caption leading-relaxed text-slate-600">
            Recruiters and parents can audit a certificate by ID, no login. Try sample{" "}
            <code className="font-mono text-meta text-ink">{SAMPLE_ID}</code>.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-stretch">
        <label htmlFor="cert-id-mini" className="sr-only">
          Certificate ID
        </label>
        <input
          id="cert-id-mini"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder={SAMPLE_ID}
          className="h-11 rounded-full border border-ink/15 bg-white px-4 text-sm text-ink outline-none placeholder:text-slate-400 focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20 md:w-[220px]"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-teal-deep px-5 text-sm font-semibold text-slate-50 transition-colors hover:bg-teal-ink"
        >
          <Search className="h-4 w-4" /> Verify <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  );
}
