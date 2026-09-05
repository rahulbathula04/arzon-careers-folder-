import { Link } from "@tanstack/react-router";
import arzonIcon from "@/assets/arzon-icon.webp";
import { MessageSquare, Mail, ShieldCheck } from "lucide-react";
import { track } from "@/lib/track";

export function ArzonEventFooter() {
  const handleWhatsAppClick = () => {
    track("whatsapp_click", {
      props: {
        source: "event_footer_support",
      },
    });
  };

  return (
    <footer className="bg-[var(--color-arzon-ink)] text-white border-t border-[var(--color-border-warm)]/10 tone-dark text-left">
      {/* WhatsApp Operational Reminder Strip (Section 21) */}
      <div className="border-b border-white/10 bg-[var(--color-medical-navy)] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-[var(--color-editorial-amber)] block">
              QUESTIONS BEFORE THE SESSION?
            </span>
            <h4 className="font-serif text-lg font-bold text-[var(--color-warm-paper)]">
              Need help choosing the right healthcare path?
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[var(--color-warm-paper)]/70">
              Joining reminders, room updates, and session notes will be delivered to your registered WhatsApp.
            </p>
          </div>

          <a
            href="https://wa.me/919959663456?text=Hi%20Arzon%20Team%2C%20I%20have%20a%20question%20regarding%20the%20Pharmacovigilance%20Working%20Session."
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-clinical-teal)] hover:bg-[var(--color-clinical-teal)]/90 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-colors shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>ASK ON WHATSAPP →</span>
          </a>
        </div>
      </div>

      {/* Main Footer Body (Section 22) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <img
                src={arzonIcon}
                alt="Arzon Global"
                className="w-7 h-7 rounded-lg border border-[var(--color-border-warm)]/20"
              />
              <span className="font-serif font-black text-[var(--color-warm-paper)] text-base tracking-tight">
                ARZON GLOBAL
              </span>
            </div>
            <p className="font-mono text-xs text-stone-400">
              Healthcare Career Intelligence &amp; Role Readiness Infrastructure
            </p>
            <p className="font-sans text-xs text-stone-500 max-w-md">
              Empowering pharmacy, healthcare, and life sciences graduates with verified operational skills.
            </p>
          </div>

          {/* Nav & Contact Links */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-stone-400">
            <a href="#event-overview" className="hover:text-[var(--color-warm-paper)] transition-colors">
              Workshop
            </a>
            <a href="#field-guide" className="hover:text-[var(--color-warm-paper)] transition-colors">
              Career Guide
            </a>
            <Link to="/contact" className="hover:text-[var(--color-warm-paper)] transition-colors">
              Contact
            </Link>
            <Link to="/legal/privacy" className="hover:text-[var(--color-warm-paper)] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal/terms" className="hover:text-[var(--color-warm-paper)] transition-colors">
              Terms
            </Link>
            <a
              href="mailto:support@arzoncareers.in"
              className="inline-flex items-center gap-1.5 hover:text-[var(--color-warm-paper)] transition-colors text-[var(--color-editorial-amber)]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>support@arzoncareers.in</span>
            </a>
          </div>
        </div>

        {/* Legal Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-stone-500">
          <p>© 2026 Arzon Global. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-clinical-teal)]" />
            <span>ISO 9001:2015 Compliant Training Framework · Non-Affiliated Academic Provider</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
