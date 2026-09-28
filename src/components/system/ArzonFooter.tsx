import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { ArzonLogo } from "../acri/ArzonLogo";

const groups = [
  {
    title: "Careers",
    links: [
      ["Explore careers", "/healthcare-careers"],
      ["Role profiles", "/roles"],
      ["Healthcare jobs", "/healthcare-jobs-for-freshers"],
      ["Career assessment", "/career-engine"],
      ["Reviews & feedback", "/reviews" as any],
    ],
  },
  {
    title: "Programmes",
    links: [
      ["All programmes", "/courses"],
      ["Compare programmes", "/courses/compare"],
      ["Upcoming cohorts", "/cohorts"],
      ["Verify credential", "/verify"],
    ],
  },
  {
    title: "Intelligence",
    links: [
      ["Research", "/research"],
      ["Role matrix", "/tools/role-matrix"],
      ["Skill gap analyzer", "/tools/skill-gap-analyzer"],
      ["For employers", "/recruiters"],
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
    toast.success("You are subscribed to Arzon Career Intelligence.");
  };

  return (
    <footer role="contentinfo" className="arzon-site-footer tone-light border-t border-[var(--arzon-border)] bg-white text-[var(--arzon-ink-soft)]">
      <div className="arzon-site-container py-16 sm:py-20">
        <div className="grid gap-10 border-b border-[var(--arzon-border)] pb-10 lg:grid-cols-[1.25fr_2fr_1fr]">
          <div className="max-w-sm">
            <Link to="/" className="inline-block">
              <ArzonLogo variant="light" size="md" />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7">
              Career intelligence for healthcare and life sciences. Explore roles, understand requirements, build skills and create evidence for your next step.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--arzon-border)] bg-[var(--arzon-surface)] px-3 py-2 text-xs font-medium">
              <ShieldCheck className="h-4 w-4 text-[var(--arzon-teal-700)]" />
              <span>Evidence-led career preparation</span>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--arzon-ink-strong)]">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map(([label, to]) => (
                    <li key={to}>
                      <Link to={to} className="text-sm hover:text-[var(--arzon-blue-700)]">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--arzon-ink-strong)]">Career updates</h2>
            <p className="mt-3 text-sm leading-6">
              Hiring trends, role research and useful career updates.
            </p>
            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-[var(--arzon-success-border)] bg-[var(--arzon-success-bg)] p-3 text-sm font-semibold text-[var(--arzon-success)]">
                <Check className="h-4 w-4" />
                Subscribed
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="tone-light h-11 w-full rounded-full border border-[var(--arzon-border)] bg-white px-3 text-sm text-[var(--arzon-ink-strong)] outline-none focus:border-[var(--arzon-blue-600)] focus:ring-2 focus:ring-blue-100"
                />
                <label className="flex items-start gap-2 text-[11px] leading-4 text-[var(--arzon-ink-muted)]">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(event) => setAgreed(event.target.checked)}
                    className="mt-0.5"
                  />
                  <span>I agree to receive Arzon updates.</span>
                </label>
                <button type="submit" className="arzon-button-primary w-full rounded-full">
                  Subscribe <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-[var(--arzon-ink-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Arzon Global. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/about" className="hover:text-[var(--arzon-ink-strong)]">About</Link>
            <Link to="/contact" className="hover:text-[var(--arzon-ink-strong)]">Contact</Link>
            <Link to="/legal/privacy" className="hover:text-[var(--arzon-ink-strong)]">Privacy</Link>
            <Link to="/legal/terms" className="hover:text-[var(--arzon-ink-strong)]">Terms</Link>
            <Link to="/refund" className="hover:text-[var(--arzon-ink-strong)]">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
