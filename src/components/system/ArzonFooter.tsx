import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { ArzonLogo } from "../acri/ArzonLogo";

export function ArzonFooter() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to receive updates from Arzon");
      return;
    }
    setSubscribed(true);
    toast.success("Thank you for subscribing to Arzon Career Intelligence!");
    setEmail("");
  };

  return (
    <footer role="contentinfo" className="arzon-v2-page border-t border-[var(--arzon-border)] bg-white tone-light pt-16 pb-12 text-[var(--arzon-ink-soft)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E4EAF2]">
          {/* Brand & Mission Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <ArzonLogo variant="light" size="md" />
            </Link>
            <p className="text-xs sm:text-sm text-[#69758A] leading-relaxed max-w-sm">
              India&apos;s authoritative healthcare career intelligence and role-readiness platform. Calibrating B.Pharm, Pharm.D, and Life Sciences graduates for high-trust clinical data careers.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#69758A]">
              <ShieldCheck className="h-4 w-4 text-[#1557D6]" />
              <span>ICH E2B(R3) &bull; FDA 21 CFR 314.80 &bull; EMA GVP</span>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://linkedin.com/company/arzon-global"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] hover:bg-[#EEF6FF] hover:border-[#1557D6] transition-colors"
                aria-label="Arzon Global LinkedIn"
              >
                <span className="font-bold text-xs">in</span>
              </a>
              <a
                href="https://instagram.com/arzonglobal"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] hover:bg-[#EEF6FF] hover:border-[#1557D6] transition-colors"
                aria-label="Arzon Global Instagram"
              >
                <span className="font-bold text-xs">ig</span>
              </a>
              <a
                href="https://youtube.com/@arzonglobal"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] hover:bg-[#EEF6FF] hover:border-[#1557D6] transition-colors"
                aria-label="Arzon Global YouTube"
              >
                <span className="font-bold text-xs">yt</span>
              </a>
              <a
                href="https://x.com/arzonglobal"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] hover:bg-[#EEF6FF] hover:border-[#1557D6] transition-colors"
                aria-label="Arzon Global X"
              >
                <span className="font-bold text-xs">X</span>
              </a>
            </div>
          </div>

          {/* Career Discovery Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#071A4A]">
              Careers
            </h4>
            <ul className="space-y-2 text-xs text-[#69758A]">
              <li>
                <Link to={"/industry/pharmacovigilance" as any} className="hover:text-[#1557D6] transition-colors font-medium">
                  PV Associate Track
                </Link>
              </li>
              <li>
                <Link to="/roles" className="hover:text-[#1557D6] transition-colors">
                  Clinical Data Management
                </Link>
              </li>
              <li>
                <Link to="/roles" className="hover:text-[#1557D6] transition-colors">
                  Medical Coding
                </Link>
              </li>
              <li>
                <Link to="/degrees" className="hover:text-[#1557D6] transition-colors">
                  Degrees Directory
                </Link>
              </li>
              <li>
                <Link to="/students/4th-year" className="hover:text-[#1557D6] transition-colors">
                  4th-Year Students
                </Link>
              </li>
              <li>
                <Link to="/students/graduates" className="hover:text-[#1557D6] transition-colors">
                  Graduates
                </Link>
              </li>
            </ul>
          </div>

          {/* Programmes Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#071A4A]">
              Programmes
            </h4>
            <ul className="space-y-2 text-xs text-[#69758A]">
              <li>
                <Link to={"/industry/pharmacovigilance" as any} className="hover:text-[#1557D6] transition-colors">
                  12-Week Role Readiness
                </Link>
              </li>
              <li>
                <Link to="/acri" className="hover:text-[#1557D6] transition-colors">
                  ACRI Certification
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#1557D6] transition-colors">
                  Applied Internships
                </Link>
              </li>
              <li>
                <Link to="/career-engine" className="hover:text-[#1557D6] transition-colors">
                  Work Simulation Lab
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-[#1557D6] transition-colors">
                  Verify Credential
                </Link>
              </li>
              <li>
                <Link to="/why-arzon" className="hover:text-[#1557D6] transition-colors">
                  Placements &amp; Outcomes
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Intel Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#071A4A]">
              Career Intelligence
            </h4>
            <ul className="space-y-2 text-xs text-[#69758A]">
              <li>
                <Link to="/research" className="hover:text-[#1557D6] transition-colors">
                  Research Reports
                </Link>
              </li>
              <li>
                <Link to="/tools/skill-gap-analyzer" className="hover:text-[#1557D6] transition-colors">
                  Skill Gap Analyzer
                </Link>
              </li>
              <li>
                <Link to="/tools/role-matrix" className="hover:text-[#1557D6] transition-colors">
                  Role Matrix
                </Link>
              </li>
              <li>
                <Link to="/tools/cost-calculator" className="hover:text-[#1557D6] transition-colors">
                  ROI Calculator
                </Link>
              </li>
              <li>
                <Link to="/recruiters" className="hover:text-[#1557D6] transition-colors">
                  For Institutions
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#1557D6] transition-colors">
                  Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#071A4A]">
              Career Intel
            </h4>
            <p className="text-xs text-[#69758A] leading-relaxed">
              Quarterly clinical hiring trends and regulatory updates.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <Check className="h-4 w-4 shrink-0" />
                <span>Subscribed to Intel</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full px-3.5 py-2 text-xs rounded-full border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] placeholder:text-[#69758A] focus:outline-none focus:ring-1 focus:ring-[#1557D6]"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 bg-[var(--arzon-navy-950)] hover:bg-[var(--arzon-blue-700)] text-white py-2 rounded-full text-xs font-semibold tracking-wide transition-colors"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Strip: Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#69758A]">
          <div>
            &copy; {new Date().getFullYear()} Arzon Global (A unit of Arzon Group). All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/about" className="hover:text-[#071A4A] transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-[#071A4A] transition-colors">
              Contact
            </Link>
            <Link to="/legal/privacy" className="hover:text-[#071A4A] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal/terms" className="hover:text-[#071A4A] transition-colors">
              Terms of Service
            </Link>
            <Link to="/refund" className="hover:text-[#071A4A] transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
