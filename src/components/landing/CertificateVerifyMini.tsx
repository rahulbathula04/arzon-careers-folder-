import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Search, ArrowRight } from "lucide-react";

const SAMPLE_ID = "AG-PV-2026-001";

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
      className="flex flex-col gap-4 rounded-[24px] border border-slate-200/90 bg-white p-5 sm:p-6 md:flex-row md:items-center md:justify-between shadow-sm"
      aria-label="Verify any Arzon certificate"
    >
      <div className="flex items-start gap-3.5 md:flex-1">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-[#2563EB]">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#707C90]">
            LIVE · PUBLIC VERIFIER
          </p>
          <p className="font-serif text-base sm:text-lg font-bold leading-snug text-[#151C2E] mt-0.5">
            Verify any Arzon certificate, right now.
          </p>
          <p className="text-xs text-[#5B6472] mt-0.5 leading-relaxed">
            Recruiters and parents can audit a certificate by ID, no login. Try sample{" "}
            <code className="font-mono font-bold text-[#151C2E]">{SAMPLE_ID}</code>.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
        <label htmlFor="cert-id-mini" className="sr-only">
          Certificate ID
        </label>
        <input
          id="cert-id-mini"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder={SAMPLE_ID}
          className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-xs font-mono font-bold text-[#151C2E] outline-none placeholder:text-slate-400 focus:border-blue-500 shadow-sm md:w-[220px]"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#1E293B] hover:bg-[#151C2E] px-5 text-xs font-bold text-white shadow-sm transition-colors"
        >
          <Search className="h-3.5 w-3.5 text-white" />
          <span>Verify</span>
          <ArrowRight className="h-3.5 w-3.5 text-white" />
        </button>
      </div>
    </form>
  );
}
