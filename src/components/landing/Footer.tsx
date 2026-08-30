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
    <footer
      role="contentinfo"
      className="bg-[#1B2B4B] tone-dark text-slate-50 border-t border-slate-800 pt-16 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Emotional Finale Close & Low-Risk Conversion Box */}
        <div className="rounded-2xl border border-sky-400/40 bg-[#162648] p-8 space-y-6 text-center max-w-4xl mx-auto shadow-xl">
          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-sky-400">
              ONE YEAR FROM NOW…
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-50 leading-tight">
              You can still be watching YouTube playlists and applying to black-hole job boards.
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              Or you can be preparing for interviews with recruiters who already know your verified
              assessment scorecard.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto text-left">
            <div>
              <p className="font-serif text-lg font-bold text-amber-300">Still deciding?</p>
              <p className="text-xs text-slate-300 font-sans">
                Book a 15-minute eligibility review. No payment required. Just clarity.
              </p>
            </div>
            <a
              href="#apply"
              className="h-11 px-6 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shrink-0 inline-flex items-center justify-center font-sans"
            >
              Book 15-Min Eligibility Review
            </a>
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-xs">
          {/* Col 1: Company Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-slate-50/10 ring-1 ring-slate-50/20">
                <img
                  src={arzonIcon}
                  alt="Arzon Global"
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="leading-none">
                <p className="font-mono text-sm font-extrabold tracking-[0.24em] text-slate-50">
                  ARZON
                </p>
                <p className="font-mono text-[9px] font-bold tracking-[0.36em] text-slate-300">
                  GLOBAL
                </p>
              </div>
            </div>

            <p className="text-slate-200 leading-relaxed font-sans max-w-sm">
              India's premier Healthcare Career Intelligence &amp; Workforce Readiness Platform. Bridging academic qualifications to Tier-1 Global Capability Centers (GCCs) in Pharmacovigilance, Medical Coding, and Clinical Research.
            </p>
            <p className="text-slate-300 font-mono text-[11px]">
              Hyderabad, India · WhatsApp Community: 10,000+ Aspirants
            </p>
          </div>

          {/* Col 2: Healthcare Tracks */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-sky-400">
              CAREER TRACKS
            </p>
            <ul className="space-y-2 text-slate-200">
              <li>
                <Link to="/pharmacovigilance-jobs" className="hover:text-slate-50 transition-colors font-medium">
                  Pharmacovigilance (Argus 8.4)
                </Link>
              </li>
              <li>
                <Link to="/medical-coding-jobs" className="hover:text-slate-50 transition-colors font-medium">
                  Medical Coding (CPC &amp; ICD-10)
                </Link>
              </li>
              <li>
                <Link to="/healthcare-jobs-for-freshers" className="hover:text-slate-50 transition-colors font-medium">
                  Clinical Data Management (RAVE)
                </Link>
              </li>
              <li>
                <Link to="/healthcare-careers" className="hover:text-slate-50 transition-colors font-medium">
                  Clinical SAS &amp; CDISC Programming
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-slate-50 transition-colors font-medium">
                  View All 6 Career Tracks →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Proof & Intelligence */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-sky-400">
              INTELLIGENCE &amp; PROOF
            </p>
            <ul className="space-y-2 text-slate-200">
              <li>
                <Link to="/why-arzon" className="hover:text-slate-50 transition-colors font-medium">
                  300+ JD Empirical Study
                </Link>
              </li>
              <li>
                <Link to="/healthcare-career-workshop" className="hover:text-slate-50 transition-colors font-medium text-amber-300">
                  Free Live Workshop (Quarterly)
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-slate-50 transition-colors font-medium">
                  Public Certificate Verifier (/verify)
                </Link>
              </li>
              <li>
                <Link to="/career-engine/start" className="hover:text-slate-50 transition-colors font-medium">
                  90-Sec ACRI Fit Diagnostic
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-sky-400">
              COMMUNITY &amp; LEGAL
            </p>
            <ul className="space-y-2 text-slate-200">
              <li>
                <a
                  href="https://chat.whatsapp.com/Ltg8V4sGOgbK8kbgYMuaHz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-50 transition-colors font-medium text-emerald-400 flex items-center gap-1"
                >
                  <span>WhatsApp Network</span>
                  <span>↗</span>
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-slate-50 transition-colors font-medium">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/privacy"
                  className="hover:text-slate-50 transition-colors font-medium"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/terms"
                  className="hover:text-slate-50 transition-colors font-medium"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Disclosure & Trust Strip */}
        <div className="border-t border-slate-800 pt-6 text-[11px] font-sans text-slate-300 leading-relaxed space-y-2">
          <p>
            Arzon Global is India's dedicated Healthcare Workforce Readiness &amp; Career Intelligence Platform. Training syllabi are mapped directly to public enterprise requisitions across Novartis, IQVIA, Parexel, and Optum. All hiring decisions remain at the sole discretion of partner employer teams. ISO 9001:2015 certified processes. MCA incorporated.
          </p>
          <p className="font-mono text-[9px] text-slate-500">
            © 2026 Arzon Global Labs. All rights reserved. Registered under Ministry of Corporate Affairs, Govt of India.
          </p>
        </div>
      </div>
    </footer>
  );
}
