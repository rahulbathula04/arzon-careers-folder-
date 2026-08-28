import { useState } from "react";
import { UserCheck, CheckCircle2, ArrowRight, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trackPQAEvent } from "@/lib/pqa";

interface LowFrictionProfileRegistrationProps {
  selectedDegree: string;
  onProfileCreated?: (data: { name: string; whatsapp: string }) => void;
}

// Validates an Indian-format WhatsApp number (10 digits, optionally prefixed with +91 or 91)
function isValidWhatsApp(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return (
    digits.length === 10 ||
    (digits.length === 12 && digits.startsWith("91")) ||
    (digits.length === 13 && digits.startsWith("091"))
  );
}

export function LowFrictionProfileRegistration({
  selectedDegree,
  onProfileCreated,
}: LowFrictionProfileRegistrationProps) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!isValidWhatsApp(whatsapp)) {
      setError("Please enter a valid 10-digit WhatsApp number.");
      return;
    }

    setIsSubmitting(true);

    // Persist lead to localStorage so it survives session and can be
    // synced to a backend (Supabase, Google Sheets, etc.) at any point.
    try {
      const leads = JSON.parse(localStorage.getItem("arzon_leads") ?? "[]") as unknown[];
      leads.push({
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        degree: selectedDegree,
        ts: new Date().toISOString(),
        source: "landing_whatsapp_optin",
      });
      localStorage.setItem("arzon_leads", JSON.stringify(leads));
    } catch {
      // localStorage unavailable — continue without persisting
    }

    trackPQAEvent("WHATSAPP_SUBMITTED");
    if (onProfileCreated) onProfileCreated({ name: name.trim(), whatsapp: whatsapp.trim() });

    setIsSaved(true);
    setIsSubmitting(false);

    toast.success(`Got it, ${name.trim()}! We'll send your career map to WhatsApp within 2 hours.`, {
      duration: 6000,
    });
  };

  return (
    <section id="career-profile-registration" className="py-16 sm:py-24 bg-[#0B152C] text-slate-100 tone-dark border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Save Your Career Map</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-50">
            Get your custom career map{" "}
            <br />
            <span className="italic text-emerald-400">sent to your WhatsApp.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
            We'll send your explored roles, job requirement breakdowns, and 30-day skill roadmap
            directly to WhatsApp — so you can review them anytime.
          </p>
        </div>

        {/* Form + Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* Left: 2-Field Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#070D1B] border border-slate-800 space-y-5 shadow-2xl">
            {!isSaved ? (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <label htmlFor="wa-name" className="font-mono text-xs font-bold text-slate-300 block">
                    First Name
                  </label>
                  <input
                    id="wa-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul"
                    autoComplete="given-name"
                    className="w-full h-11 px-4 rounded-xl bg-[#0B152C] border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="wa-number" className="font-mono text-xs font-bold text-slate-300 block">
                    WhatsApp Number
                  </label>
                  <input
                    id="wa-number"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className="w-full h-11 px-4 rounded-xl bg-[#0B152C] border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    required
                  />
                </div>

                {error && (
                  <p className="text-[11px] font-sans text-red-400 -mt-2">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? "Saving…" : "Send My Career Map on WhatsApp"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="flex items-start gap-2 pt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <p className="text-[11px] font-sans text-slate-400 leading-relaxed">
                    We send your career map within <strong className="text-slate-300">2 hours</strong> on WhatsApp.
                    No spam — only your career report.
                  </p>
                </div>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-slate-50">
                  Request Received!
                </h3>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  Hi {name} — we'll send your {selectedDegree} career map to{" "}
                  <strong className="text-slate-200">{whatsapp}</strong> within 2 hours.
                </p>
                <p className="text-[11px] font-mono text-emerald-400">
                  Check your WhatsApp around {new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            )}
          </div>

          {/* Right: What They'll Receive */}
          <div className="p-6 rounded-3xl bg-[#070D1B] border border-slate-800 space-y-4">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              What you'll receive on WhatsApp
            </span>
            <div className="space-y-3">
              {[
                { icon: "📋", title: "Your career map", desc: "All roles you explored with key job requirements and companies." },
                { icon: "💰", title: "Salary benchmarks", desc: `City-wise entry, mid, and senior salary tiers for ${selectedDegree} roles.` },
                { icon: "🛠️", title: "Priority skill gaps", desc: "The exact 3 tools or skills most needed to qualify for target roles." },
                { icon: "📅", title: "30-day roadmap", desc: "Week-by-week focus areas based on your target role and current gaps." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-[#0B152C] border border-slate-800">
                  <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-100 block">{item.title}</span>
                    <span className="font-sans text-[11px] text-slate-400">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
              <UserCheck className="w-4 h-4 text-sky-400" />
              <span className="font-mono text-[10px] text-slate-400">
                Sent by our team · Not automated · Always accurate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
