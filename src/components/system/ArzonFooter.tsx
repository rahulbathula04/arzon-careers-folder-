import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { ArzonLogo } from "../acri/ArzonLogo";
import { ArzonInstagramButton } from "../common/ArzonInstagramButton";
import { ArzonLinkedInButton } from "../common/ArzonLinkedInButton";
import { ArzonWhatsAppButton } from "../common/ArzonWhatsAppButton";
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
      ["Industry Network Programme", "/industry-network" as any],
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
      className="arzon-site-footer tone-light border-t border-arzon-seafoam/30 bg-white text-ink-mute"
    >
      {/* Top brand accent bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-arzon-seafoam/50 to-transparent" />

      <div className="arzon-site-container py-14 sm:py-20">
        {/* Main grid */}
        <div className="grid gap-10 border-b border-arzon-seafoam/30 pb-10 lg:grid-cols-[1.2fr_2fr_1fr]">

          {/* Brand column */}
          <div className="max-w-sm">
            <Link to="/" className="inline-block">
              <ArzonLogo variant="light" size="md" />
            </Link>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              Healthcare talent intelligence for students and employers. Understand role requirements, assess practical capabilities and make better-informed career decisions.
            </p>

            {/* Trust badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-arzon-seafoam/30 bg-arzon-ice px-3 py-2 text-xs font-semibold text-ink-soft">
              <ShieldCheck className="h-3.5 w-3.5 text-arzon-teal" />
              <span>Student-first · Employer-validated · Evidence-led</span>
            </div>

            {/* Social links - Uiverse animated social suite */}
            <div className="mt-5 flex items-center gap-4">
              <ArzonLinkedInButton source="global_footer" />
              <ArzonInstagramButton source="global_footer" />
              <ArzonWhatsAppButton source="global_footer" />
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
                        className="text-xs sm:text-sm text-ink-mute hover:text-arzon-teal transition-colors inline-block py-0.5"
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
            <p className="mt-3 text-sm leading-6 text-ink-soft">
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
                  className="tone-light h-10 w-full rounded-full border border-arzon-seafoam/30 bg-white px-4 text-sm text-arzon-deep-teal outline-none focus:border-arzon-teal focus:ring-2 focus:ring-arzon-teal/10 transition-all"
                />
                <label className="flex items-start gap-2 text-[11px] leading-4 text-ink-mute cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(event) => setAgreed(event.target.checked)}
                    className="mt-0.5 accent-arzon-teal"
                  />
                  <span>I agree to receive Arzon career intelligence updates.</span>
                </label>
                <button type="submit" className="arzon-btn-subscribe-expand w-full cursor-pointer" aria-label="Subscribe to updates">
                  <span>Subscribe</span>
                  <div className="icon" aria-hidden="true">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 pt-6 text-xs text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Arzon Global. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-medium">
            <Link to="/about" className="hover:text-arzon-deep-teal transition-colors">About</Link>
            <Link to="/contact" className="hover:text-arzon-deep-teal transition-colors">Contact</Link>
            <Link to="/legal" className="text-arzon-teal hover:underline font-bold transition-colors">Legal & Compliance</Link>
            <Link to="/legal/privacy" className="hover:text-arzon-deep-teal transition-colors">Privacy</Link>
            <Link to="/legal/terms" className="hover:text-arzon-deep-teal transition-colors">Terms</Link>
            <Link to="/refund" className="hover:text-arzon-deep-teal transition-colors">Refunds</Link>
          </div>
        </div>

        {/* Statutory Compliance & Regulatory Disclaimers */}
        <div className="mt-6 pt-6 border-t border-arzon-seafoam/30 text-[10.5px] leading-relaxed text-ink-mute space-y-1.5 font-sans">
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
