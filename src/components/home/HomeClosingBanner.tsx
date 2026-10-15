import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HomeClosingBanner() {
  const benefits = [
    "Personalised career report",
    "Role-specific training",
    "Interview preparation, where included",
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
                Your degree is the start.<br />
                <span className="text-[#38BDF8]">
                  Build skills for the role you want.
                </span>
              </h2>

              <p className="text-xs sm:text-base text-slate-200 max-w-xl leading-relaxed font-normal">
                Explore healthcare roles, understand their requirements, and choose a practical preparation path.
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

            {/* Concrete next steps instead of a generic stock-style visual */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-white/8 p-5 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#BAE6FD]">Before you choose a programme</p>
                <h3 className="mt-3 text-xl font-serif font-bold text-white sm:text-2xl">Make the decision with clearer information.</h3>
                <div className="mt-5 space-y-4">
                  <div className="border-b border-white/15 pb-3">
                    <p className="text-sm font-semibold text-white">1. Understand the role</p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">Review responsibilities, common skills and tools.</p>
                  </div>
                  <div className="border-b border-white/15 pb-3">
                    <p className="text-sm font-semibold text-white">2. Explore your fit</p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">Use the assessment as guidance, not a hiring prediction.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">3. Compare preparation options</p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">Check programme details and learning activities before enrolling.</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link to="/roles" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#071A4A] hover:bg-slate-100">
                    Explore roles <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link to="/courses" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10">
                    View programmes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
