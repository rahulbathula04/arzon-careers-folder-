import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Stethoscope, ChevronRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HealthcareDiscoveryHeaderProps {
  onOpenAdvisorBooking: () => void;
}

export function HealthcareDiscoveryHeader({ onOpenAdvisorBooking }: HealthcareDiscoveryHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#070D1B]/90 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <Link to="/" className="flex items-center gap-2.5 group focus:outline-hidden">
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-slate-50">
                Arzon<span className="text-sky-400 italic font-sans font-extrabold ml-0.5">Global</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider">
                HEALTHCARE
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
              Healthcare Career Intelligence
            </p>
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
          <Button
            onClick={onOpenAdvisorBooking}
            className="h-10 sm:h-11 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-sans font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
          >
            <PhoneCall className="h-4 w-4 shrink-0 text-slate-950" />
            <span>Talk to a Career Expert</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
