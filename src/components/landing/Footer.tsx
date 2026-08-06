import { Link } from "@tanstack/react-router";
import { COUNSELLOR_PHONE } from "./constants";
import arzonIcon from "@/assets/arzon-icon.webp";

/**
 * Section Ten — Institutional Footer
 * Design: Dark Navy background (#1B2B4B). 4 columns of links,
 * trust strip, and full legal disclosure at the bottom.
 */
export function Footer() {
  return (
    <footer className="bg-[#1B2B4B] text-white border-t border-slate-800 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-xs">
          
          {/* Col 1: Company Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/20">
                <img src={arzonIcon} alt="Arzon Global" width={32} height={32} className="h-full w-full object-contain" />
              </div>
              <div className="leading-none">
                <p className="font-mono text-sm font-extrabold tracking-[0.24em] text-white">ARZON</p>
                <p className="font-mono text-[9px] font-bold tracking-[0.36em] text-slate-400">GLOBAL</p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed font-sans max-w-sm">
              India's EdTech career platform. Certified recruitment partner of HSBC Holdings and JPMorgan Chase &amp; Co.
            </p>
            <p className="text-slate-400 font-mono text-[11px]">
              Hyderabad, India · Social: Instagram @arzon.global
            </p>
          </div>

          {/* Col 2: Programmes */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-sky-400">
              PROGRAMMES
            </p>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  HSBC AI/ML Cohort
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  JPMorgan Chase Track
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  Clinical Healthcare Tracks
                </Link>
              </li>
              <li>
                <Link to="/career-engine/start" className="hover:text-white transition-colors">
                  Readiness Test — Take Free
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Trust & Transparency */}
          <div className="lg:col-span-2 space-y-3">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-sky-400">
              TRUST &amp; PROOF
            </p>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/proof" className="hover:text-white transition-colors">
                  Partnership Proof
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-white transition-colors">
                  Certificate Verifier
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-white transition-colors">
                  Public Trust Ledger
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/proof" className="hover:text-white transition-colors">
                  Selectivity Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Apply & Admissions */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-sky-400">
              ADMISSIONS
            </p>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/apply" className="hover:text-white transition-colors font-bold text-white">
                  Apply Now — August 2026
                </Link>
              </li>
              <li>
                <Link to="/waitlist" className="hover:text-white transition-colors">
                  Join Waitlist
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COUNSELLOR_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Speak with a Counsellor
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COUNSELLOR_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Admissions Desk
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Disclosure & Trust Strip */}
        <div className="border-t border-slate-800 pt-6 text-[10px] font-sans text-slate-400 leading-relaxed space-y-2">
          <p>
            Arzon Global is a certified recruitment partner of HSBC Holdings (VMO ID: HSBC2621TAVM026) and JPMorgan Chase and Co.,
            effective July 2026. Recruitment partnership status means Arzon Global supports talent acquisition through candidate sourcing,
            screening, and presentation. All hiring decisions are at the sole discretion of HSBC and JPMorgan Chase. No placement guarantee is
            implied by recruitment partner status. Programme fees and refund policy are published in the public trust ledger. ASCI guidelines
            apply to all marketing communications. ISO 9001:2015 certified. MSME UDYAM registered. MCA incorporated.
          </p>
          <p className="font-mono text-[9px] text-slate-500">
            © 2026 Arzon Global Labs. All rights reserved. Registered under Ministry of Corporate Affairs, Govt of India.
          </p>
        </div>
      </div>
    </footer>
  );
}
