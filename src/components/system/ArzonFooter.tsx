import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Instagram, Linkedin, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { ArzonLogo } from "../acri/ArzonLogo";
import { LINKS, waLink } from "@/components/landing/constants";

const groups = [
  {
    title: "Career Intelligence",
    links: [
      ["Explore Careers", "/careers"],
      ["Role Profiles", "/roles"],
      ["Healthcare Jobs", "/healthcare-jobs-for-freshers"],
      ["Career Assessment", "/career-assessment"],
      ["Reviews & Feedback", "/reviews" as any],
    ],
  },
  {
    title: "Programmes",
    links: [
      ["All Programmes", "/courses"],
      ["Compare Programmes", "/courses/compare"],
      ["Upcoming Cohorts", "/cohorts"],
      ["Verify Credential", "/verify"],
      ["Enrol Now", "/enrol"],
    ],
  },
  {
    title: "Intelligence Tools",
    links: [
      ["Research & Insights", "/resources"],
      ["Role Matrix", "/tools/role-matrix"],
      ["Skill Gap Analyzer", "/tools/skill-gap-analyzer"],
      ["Industry Salaries", "/industry/salaries"],
      ["For Employers", "/recruiters"],
    ],
  },
] as const;

export function ArzonFooter() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to receive updates from Arzon");
      return;
    }
    setSubscribed(true);
    setEmail("");
    toast.success("Subscribed to Arzon Career Intelligence.");
  };

  return (
    <footer
      role="contentinfo"
      className="arzon-site-footer tone-light border-t border-[#E4EAF2] bg-white text-[#69758A]"
    >
      {/* Top brand accent bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1557D6]/20 to-transparent" />

      <div className="arzon-site-container py-14 sm:py-20">
        {/* Main grid */}
        <div className="grid gap-10 border-b border-[#E4EAF2] pb-10 lg:grid-cols-[1.2fr_2fr_1fr]">

          {/* Brand column */}
          <div className="max-w-sm">
            <Link to="/" className="inline-block">
              <ArzonLogo variant="light" size="md" />
            </Link>
            <p className="mt-4 text-sm leading-7 text-[#3F4A60]">
              Career intelligence for healthcare and life sciences. Explore roles,
              understand employer requirements, build skills and create verifiable
              evidence for your next step.
            </p>

            {/* Trust badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#E4EAF2] bg-[#F7F9FE] px-3 py-2 text-xs font-semibold text-[#3F4A60]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#27B9B3]" />
              <span>MSME UDYAM · ISO-Aligned · TASK Collaborative</span>
            </div>

            {/* Social links */}
            <div className="mt-5 flex items-center gap-2">
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Arzon Global on LinkedIn"
                className="grid h-8 w-8 place-items-center rounded-full border border-[#E4EAF2] bg-white tone-light text-slate-500 hover:border-[#1557D6] hover:text-[#1557D6] transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Arzon Global on Instagram"
                className="grid h-8 w-8 place-items-center rounded-full border border-[#E4EAF2] bg-white tone-light text-slate-500 hover:border-[#1557D6] hover:text-[#1557D6] transition-colors"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href={waLink("Hi, I'm interested in Arzon career programmes")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on WhatsApp"
                className="inline-flex items-center gap-1.5 h-8 rounded-full border border-[#E4EAF2] bg-white tone-light px-3 text-[11px] font-semibold text-slate-500 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {groups.map((group, idx) => (
              <div key={group.title} className={idx === 2 ? "col-span-2 sm:col-span-1" : ""}>
                <h2 className="ap-kicker-muted">{group.title}</h2>
                <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
                  {group.links.map(([label, to]) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="text-xs sm:text-sm text-[#69758A] hover:text-[#1557D6] transition-colors inline-block py-0.5"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Subscribe column */}
          <div>
            <h2 className="ap-kicker-muted">Career Updates</h2>
            <p className="mt-3 text-sm leading-6 text-[#3F4A60]">
              Hiring trends, role research and useful career intelligence, delivered directly.
            </p>
            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                <Check className="h-4 w-4" />
                Subscribed — thank you!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 space-y-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="tone-light h-10 w-full rounded-full border border-[#E4EAF2] bg-white px-4 text-sm text-[#071A4A] outline-none focus:border-[#1557D6] focus:ring-2 focus:ring-[#1557D6]/10 transition-all"
                />
                <label className="flex items-start gap-2 text-[11px] leading-4 text-[#69758A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(event) => setAgreed(event.target.checked)}
                    className="mt-0.5 accent-[#1557D6]"
                  />
                  <span>I agree to receive Arzon career intelligence updates.</span>
                </label>
                <button type="submit" className="ap-btn-primary w-full rounded-full py-2.5 text-xs">
                  Subscribe <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 pt-6 text-xs text-[#69758A] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Arzon Global. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-medium">
            <Link to="/about" className="hover:text-[#071A4A] transition-colors">About</Link>
            <Link to="/contact" className="hover:text-[#071A4A] transition-colors">Contact</Link>
            <Link to="/legal" className="text-[#1557D6] hover:underline font-bold transition-colors">Legal & Compliance</Link>
            <Link to="/legal/privacy" className="hover:text-[#071A4A] transition-colors">Privacy</Link>
            <Link to="/legal/terms" className="hover:text-[#071A4A] transition-colors">Terms</Link>
            <Link to="/refund" className="hover:text-[#071A4A] transition-colors">Refunds</Link>
          </div>
        </div>

        {/* Statutory Compliance & Regulatory Disclaimers */}
        <div className="mt-6 pt-6 border-t border-[#E4EAF2] text-[10.5px] leading-relaxed text-[#69758A] space-y-1.5 font-sans">
          <p>
            <strong>Statutory Notice:</strong> Arzon Global is an independent healthcare workforce intelligence and skill enablement platform (MSME UDYAM Registered · ISO 9001:2015). Arzon Global is not a university or degree-granting body; programmes do not confer statutory academic degrees governed by UGC/AICTE.
          </p>
          <p>
            <strong>ASCI Compliance & Trademark Notice:</strong> In adherence to ASCI advertising guidelines, Arzon does not offer guaranteed jobs or fixed salaries. All third-party company names, trademarks, and software logos remain the exclusive property of their respective owners and are referenced under Section 30 of the Indian Trade Marks Act, 1999 solely for nominative identification and educational context without implied endorsement.
          </p>
        </div>
      </div>
    </footer>
  );
}
