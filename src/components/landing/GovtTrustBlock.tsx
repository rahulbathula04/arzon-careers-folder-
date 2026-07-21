import { Link } from "@tanstack/react-router";
import { Landmark, ShieldCheck, Building2, FileBadge2, ArrowRight, BadgeCheck } from "lucide-react";
import { PROOF } from "./constants";

/**
 * Trust spine, anchored above-the-fold beneath the nav.
 * Replaces the legacy TrustBar with verifiable, clickable proof.
 */
export function GovtTrustBlock() {
  const showNums = PROOF.showCredentialNumbers;
  const chips = [
    {
      icon: ShieldCheck,
      label: "ISO 9001",
      value: showNums ? PROOF.iso.number : "Certified",
      hash: "iso",
    },
    { icon: FileBadge2, label: "MCA", value: showNums ? PROOF.mca.cin : "Registered", hash: "mca" },
    {
      icon: Building2,
      label: "MSME",
      value: showNums ? PROOF.msme.udyam : "Verified",
      hash: "msme",
    },
  ];

  return (
    <>
      <div className="tone-dark w-full border-y border-slate-200/10 bg-[#0B1325]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5">
          {/* Row 1 — TASK badge + copy + watch button */}
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 sm:items-center">
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1 ring-gold/30"
              style={{ background: "rgba(245,196,81,0.10)" }}
            >
              <Landmark className="h-5 w-5 text-gold" />
            </span>
            <div className="min-w-0 leading-tight">
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[#7FB0D8]">
                TASK · Govt of Telangana · {PROOF.inaugurationDate}
              </p>
              <p className="mt-1 text-caption font-semibold text-slate-50">
                TASK officials joined as chief guests at our public launch.
              </p>
            </div>
          </div>

          {/* Row 2 — credential chips */}
          <div className="mt-3 flex flex-col gap-2.5 sm:mt-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
            <ul className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {chips.map(({ icon: Icon, label, value, hash }) => (
                <li key={label}>
                  <Link
                    to="/proof"
                    hash={hash}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200/15 bg-white/[0.06] px-2.5 py-1 text-micro font-medium text-slate-100 transition hover:border-slate-200/30 hover:bg-white/[0.1]"
                    title={value}
                  >
                    <Icon className="h-3.5 w-3.5 text-[#7FB0D8]" />
                    <span className="font-semibold">{label}</span>
                    <BadgeCheck className="hidden h-3 w-3 text-sky-400 sm:inline" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Row 3 — Apply CTA, its own block so it never collides with the strip */}
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200/10 pt-3">
            <p className="hidden text-meta text-slate-300 sm:block">
              Cohort filling — apply to lock the early-bird seat fee.
            </p>
            <Link
              to="/apply"
              className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-gold px-4 text-caption font-semibold text-gold-ink shadow-sm transition hover:bg-gold/90 active:scale-[0.98] sm:w-auto"
            >
              Apply now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
