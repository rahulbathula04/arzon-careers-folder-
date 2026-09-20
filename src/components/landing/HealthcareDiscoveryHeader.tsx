import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Stethoscope, ChevronRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ArzonLogo } from "@/components/acri/ArzonLogo";

interface HealthcareDiscoveryHeaderProps {
  onOpenAdvisorBooking: () => void;
}

export function HealthcareDiscoveryHeader({
  onOpenAdvisorBooking,
}: HealthcareDiscoveryHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#070D1B]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Official Brand Logo & Subtitle */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-hidden">
          <ArzonLogo variant="dark" size="md" />
          <div className="hidden sm:flex flex-col border-l border-slate-700/80 pl-3">
            <span className="font-mono text-[10px] text-sky-400 font-bold tracking-wide uppercase leading-none">
              HEALTHCARE INTELLIGENCE
            </span>
            <span className="font-sans text-[9px] text-slate-400 font-medium mt-0.5">
              Verified Career Readiness
            </span>
          </div>
        </Link>

        {/* Limited Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs font-semibold text-slate-300">
          <a href="#interactive-explorer" className="hover:text-sky-300 transition-colors">
            Explore Careers
          </a>
          <a href="#company-roles" className="hover:text-sky-300 transition-colors">
            Find Jobs
          </a>
          <a href="#skills-tools" className="hover:text-sky-300 transition-colors">
            Skills
          </a>
          <a href="#company-roles" className="hover:text-sky-300 transition-colors">
            Companies
          </a>
          <a href="#salary-insights" className="hover:text-sky-300 transition-colors">
            Salary
          </a>
          <a href="#expert-guidance" className="hover:text-sky-300 transition-colors">
            Career Guidance
          </a>
        </nav>

        {/* Primary CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/apply"
            className="hidden sm:inline-flex h-10 sm:h-11 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/40 px-4 sm:px-5 font-mono text-xs font-bold uppercase tracking-wider text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800/70"
          >
            Apply now
          </Link>
          <Button
            onClick={onOpenAdvisorBooking}
            className="h-10 sm:h-11 px-4 sm:px-6 rounded-xl bg-[#1B3F8B] hover:bg-[#2552b3] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#1B3F8B]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
          >
            <PhoneCall className="h-4 w-4 shrink-0 text-slate-50" />
            <span>Talk to a Career Expert</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
