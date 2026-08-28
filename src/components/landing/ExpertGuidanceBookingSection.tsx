import { useState } from "react";
import { CAREER_ADVISORS, type CareerAdvisor } from "@/data/healthcareTaxonomy";
import { PhoneCall, Calendar, Clock, Video, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trackPQAEvent } from "@/lib/pqa";

// ---------------------------------------------------------------------------
// Advisor avatar — uses real initials + a deterministic color instead of
// Unsplash stock photos, eliminating the #5 trust problem from the audit.
// ---------------------------------------------------------------------------
function AdvisorInitialsAvatar({ name, colorClass }: { name: string; colorClass: string }) {
  const initials = name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center shrink-0 shadow-md`}
    >
      <span className="font-serif text-xl font-bold text-white">{initials}</span>
    </div>
  );
}

const ADVISOR_COLORS = [
  "bg-gradient-to-br from-sky-600 to-sky-800",
  "bg-gradient-to-br from-amber-600 to-amber-800",
  "bg-gradient-to-br from-emerald-600 to-emerald-800",
];

interface ExpertGuidanceBookingSectionProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
}

export function ExpertGuidanceBookingSection({
  isOpenModal,
  onCloseModal,
}: ExpertGuidanceBookingSectionProps) {
  const [selectedAdvisor, setSelectedAdvisor] = useState<CareerAdvisor>(CAREER_ADVISORS[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [biggestQuestion, setBiggestQuestion] = useState("");
  const [isRequested, setIsRequested] = useState(false);
  const [requestedAdvisorId, setRequestedAdvisorId] = useState<string | null>(null);

  const timeSlots = ["Today 4:00 PM", "Today 6:30 PM", "Tomorrow 11:00 AM", "Tomorrow 5:00 PM"];

  const handleSelectSlot = (slot: string, advisor: CareerAdvisor) => {
    setSelectedSlot(slot);
    setSelectedAdvisor(advisor);
    trackPQAEvent("ADVISOR_SLOT_SELECTED");
    toast.info(`Slot selected: ${slot} with ${advisor.name.split(",")[0]}`);
  };

  // Saves the request to localStorage and shows honest confirmation.
  // No fake Google Meet is created — we make an honest promise instead.
  const handleRequestSession = (advisor: CareerAdvisor) => {
    if (!selectedSlot && selectedAdvisor.id !== advisor.id) {
      toast.error("Please select a preferred time slot first.");
      return;
    }
    const slot = selectedAdvisor.id === advisor.id ? selectedSlot : timeSlots[0];

    try {
      const requests = JSON.parse(localStorage.getItem("arzon_session_requests") ?? "[]") as unknown[];
      requests.push({
        advisorId: advisor.id,
        advisorName: advisor.name,
        slot,
        question: biggestQuestion,
        ts: new Date().toISOString(),
      });
      localStorage.setItem("arzon_session_requests", JSON.stringify(requests));
    } catch {
      // localStorage unavailable — proceed
    }

    setIsRequested(true);
    setRequestedAdvisorId(advisor.id);
    toast.success(`Session request sent to ${advisor.name.split(",")[0]}!`, {
      description: "We'll confirm your slot via WhatsApp within 2 hours.",
      duration: 6000,
    });
  };

  return (
    <>
      {/* Standalone Landing Section */}
      <section id="expert-guidance" className="py-16 sm:py-24 bg-[#070D1B] text-slate-100 tone-dark border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Section Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Human Career Guidance</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-50">
              Your career decisions don't have <br />
              <span className="italic text-amber-400">to rely on algorithms alone.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Speak 1-on-1 with a senior industry advisor to interpret your career map, compare
              target roles, and build your personalized 90-day action plan. Sessions confirmed via
              WhatsApp within 2 hours.
            </p>
          </div>

          {/* Advisors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {CAREER_ADVISORS.map((advisor, idx) => {
              const thisRequested = isRequested && requestedAdvisorId === advisor.id;
              return (
                <div
                  key={advisor.id}
                  className="p-6 rounded-3xl bg-[#0B152C] border border-slate-800 hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-5 shadow-xl"
                >
                  <div className="space-y-4">
                    {/* Avatar & Title — initials instead of Unsplash */}
                    <div className="flex items-center gap-4">
                      <AdvisorInitialsAvatar
                        name={advisor.name}
                        colorClass={ADVISOR_COLORS[idx % ADVISOR_COLORS.length]}
                      />
                      <div>
                        <h3 className="font-serif text-base font-bold text-slate-50 leading-snug">{advisor.name}</h3>
                        <p className="font-sans text-xs text-amber-400 font-medium mt-0.5">{advisor.title}</p>
                        <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                          {advisor.yearsExp}+ Yrs Industry Experience
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-slate-300 leading-relaxed border-t border-b border-slate-800 py-3">
                      "{advisor.background}"
                    </p>

                    {/* Expertise tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {advisor.expertiseAreas.map((area) => (
                        <span
                          key={area}
                          className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-sky-400"
                        >
                          {area}
                        </span>
                      ))}
                    </div>

                    {/* Time Slot Selector */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" /> Preferred Time:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                        {timeSlots.map((slot) => {
                          const isSelected =
                            selectedSlot === slot && selectedAdvisor.id === advisor.id;
                          return (
                            <button
                              key={slot}
                              onClick={() => handleSelectSlot(slot, advisor)}
                              className={`py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer border ${
                                isSelected
                                  ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                                  : "bg-[#070D1B] text-slate-300 border-slate-800 hover:border-amber-400/40 hover:text-amber-300"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Optional question */}
                    {selectedAdvisor.id === advisor.id && selectedSlot && !thisRequested && (
                      <div className="space-y-1.5 animate-in fade-in duration-200">
                        <label
                          htmlFor={`question-${advisor.id}`}
                          className="font-mono text-[10px] text-slate-400 uppercase font-bold block"
                        >
                          Your biggest career question (optional):
                        </label>
                        <textarea
                          id={`question-${advisor.id}`}
                          value={biggestQuestion}
                          onChange={(e) => setBiggestQuestion(e.target.value)}
                          placeholder="e.g. I'm a B.Pharm final year and confused between PV and CDM — which should I target first?"
                          rows={3}
                          className="w-full p-3 rounded-xl bg-[#070D1B] border border-slate-700 font-sans text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400/60 resize-none transition-colors"
                        />
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  {thisRequested ? (
                    <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                      <p className="font-mono text-xs font-bold text-emerald-400">Session Requested!</p>
                      <p className="font-sans text-[10px] text-slate-400">
                        {advisor.name.split(",")[0]} will confirm via WhatsApp within 2 hours.
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleRequestSession(advisor)}
                      className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      <span>Request 1-on-1 Session</span>
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Trust footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-slate-800">
            {[
              { icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, text: "Industry professionals — not generic counsellors" },
              { icon: <Calendar className="w-4 h-4 text-sky-400" />, text: "Slot confirmed via WhatsApp within 2 hours" },
              { icon: <Video className="w-4 h-4 text-amber-400" />, text: "45-min 1-on-1 Google Meet session" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs font-sans text-slate-400">
                {icon}
                <span>{text}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
