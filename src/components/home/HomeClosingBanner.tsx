import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HomeClosingBanner() {
  const benefits = [
    "Personalised career report",
    "Role-specific training",
    "ACRI certification",
    "Placement guidance",
  ];

  return (
    <section className="py-10 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light">
      <div className="ap-shell">
        <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-[#071A4A] via-[#0A1F56] to-[#040E29] p-6 sm:p-12 lg:p-16 text-white shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#1557D6]/20 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Copy & Actions */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#BAE6FD]">
                <span>YOUR NEXT CAREER DECISION</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight sm:leading-[1.12]">
                Your degree qualified you.<br />
                <span className="text-[#38BDF8]">
                  Now get the clinical proof that gets you hired.
                </span>
              </h2>

              <p className="text-xs sm:text-base text-slate-200 max-w-xl leading-relaxed font-normal">
                Join thousands of students building real skills and industry-ready profiles in healthcare.
              </p>

              {/* CTAs - Mobile full-width touch ergonomics */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/career-assessment"
                  className="btn-white card-light w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 px-7 text-xs sm:text-sm font-extrabold transition-all shadow-md group active:scale-[0.98]"
                >
                  <span
                    className="text-slate-900 font-extrabold"
                    style={{ color: "#081F38", WebkitTextFillColor: "#081F38" }}
                  >
                    Find My Career Path
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#1557D6] group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to={"/counselling" as any}
                  className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 hover:bg-white/15 text-white px-6 text-xs sm:text-sm font-semibold transition-all backdrop-blur-xs active:scale-[0.98]"
                >
                  <PhoneCall className="h-4 w-4 text-[#7DD3FC]" />
                  <span>Speak with a Career Counsellor</span>
                </Link>
              </div>
            </div>

            {/* Right Doctor Image & Benefit Badges */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
              {/* Doctor Avatar Card */}
              <div className="relative h-36 w-36 sm:h-52 sm:w-52 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shrink-0 bg-slate-800">
                <img
                  src="/images/bpharm-female-graduate-hero.jpg"
                  alt="Healthcare professional graduate"
                  className="h-full w-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/ai-pv.jpg";
                  }}
                />
              </div>

              {/* 4 Benefit Badges */}
              <div className="space-y-2 w-full sm:w-auto">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap shadow-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#34D399] shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
