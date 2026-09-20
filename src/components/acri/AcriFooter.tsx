import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { ArzonLogo } from "./ArzonLogo";

export function AcriFooter() {
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
    <footer className="bg-[#FAF8F5] pt-16 pb-12 text-stone-700 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-200">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <ArzonLogo variant="light" size="md" />
            </Link>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-xs">
              India&apos;s Most Trusted Platform for Digital Excellence &amp; Healthcare Career Readiness.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com/company/arzon-global"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-300 bg-white tone-light text-stone-600 hover:text-[#0B1325] hover:border-stone-400 transition-colors"
                aria-label="Arzon Global LinkedIn"
              >
                <span className="font-bold text-xs">in</span>
              </a>
              <a
                href="https://instagram.com/arzonglobal"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-300 bg-white tone-light text-stone-600 hover:text-[#0B1325] hover:border-stone-400 transition-colors"
                aria-label="Arzon Global Instagram"
              >
                <span className="font-bold text-xs">ig</span>
              </a>
              <a
                href="https://youtube.com/@arzonglobal"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-300 bg-white tone-light text-stone-600 hover:text-[#0B1325] hover:border-stone-400 transition-colors"
                aria-label="Arzon Global YouTube"
              >
                <span className="font-bold text-xs">yt</span>
              </a>
              <a
                href="https://x.com/arzonglobal"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-300 bg-white tone-light text-stone-600 hover:text-[#0B1325] hover:border-stone-400 transition-colors"
                aria-label="Arzon Global X"
              >
                <span className="font-bold text-xs">X</span>
              </a>
            </div>
          </div>

          {/* Students Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-900">
              Students
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link to="/career-engine/start" className="hover:text-stone-900 transition-colors">
                  AI Assessment
                </Link>
              </li>
              <li>
                <Link to="/pv-associate" className="hover:text-stone-900 transition-colors">
                  Roles
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-stone-900 transition-colors">
                  Training
                </Link>
              </li>
              <li>
                <Link to="/internships" className="hover:text-stone-900 transition-colors">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/employer/login" className="hover:text-stone-900 transition-colors">
                  Student Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-900">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link to="/blog" className="hover:text-stone-900 transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-stone-900 transition-colors">
                  Career Guides
                </Link>
              </li>
              <li>
                <Link to="/tools/role-matrix" className="hover:text-stone-900 transition-colors">
                  Tools &amp; Research
                </Link>
              </li>
              <li>
                <Link to="/healthcare-career-workshop" className="hover:text-stone-900 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-stone-900 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-900">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link to="/about" className="hover:text-stone-900 transition-colors">
                  About Arzon
                </Link>
              </li>
              <li>
                <Link to="/placements" className="hover:text-stone-900 transition-colors">
                  Our Partners
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-stone-900 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-stone-900 transition-colors">
                  Verify Certificate
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="hover:text-stone-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Updated Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-900">
              Stay Updated
            </h4>
            <p className="text-[11px] text-stone-500">
              Get the latest career insights and opportunities.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-stone-300 bg-white tone-light px-3 py-2 pr-10 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#0B1325] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 flex h-7 w-7 items-center justify-center rounded-md bg-[#0B1325] text-white hover:bg-[#152342] transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <label className="flex items-center gap-1.5 text-[10px] text-stone-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded border-stone-300 text-[#0B1325] focus:ring-0"
                />
                <span>I agree to receive updates from Arzon.</span>
              </label>
            </form>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>&copy; {new Date().getFullYear()} Arzon Global. All rights reserved.</div>
          <div className="font-medium text-stone-600 tracking-wide">
            Skills. People. A Safer Tomorrow.
          </div>
        </div>
      </div>
    </footer>
  );
}
