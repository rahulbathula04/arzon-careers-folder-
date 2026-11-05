import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
  Phone,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building2,
  ExternalLink,
} from "lucide-react";
import { ADDRESS, COUNSELLOR_PHONE_DISPLAY, waLink } from "@/components/landing/constants";

const DATES = [
  { id: "today", label: "Today", sub: "Walk-In Ready" },
  { id: "tomorrow", label: "Tomorrow", sub: "Scheduled Demo" },
  { id: "saturday", label: "This Saturday", sub: "Weekend Cohort" },
  { id: "next-week", label: "Next Week", sub: "Flexible Slot" },
];

const SLOTS = [
  { id: "morning", time: "10:30 AM – 12:30 PM", label: "Morning Session · Practical Lab Walkthrough" },
  { id: "afternoon", time: "02:30 PM – 04:30 PM", label: "Afternoon Session · 1-on-1 Career Diagnostic" },
  { id: "evening", time: "05:30 PM – 07:00 PM", label: "Evening Session · Industry Mentor Review" },
];

const DOMAINS = [
  "Pharmacovigilance (Argus Safety & ICSR Demo)",
  "Medical Coding (CPC & Encoders Demo)",
  "Clinical Data Management (EDC & eCRF Demo)",
  "Clinical SAS & Regulatory Affairs",
  "General Career Guidance (Not Sure Yet)",
];

export function HyderabadCampusScheduler() {
  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedSlot, setSelectedSlot] = useState("morning");
  const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const ref = `HYD-VISIT-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsBooked(true);

    const dateLabel = DATES.find((d) => d.id === selectedDate)?.label || selectedDate;
    const slotLabel = SLOTS.find((s) => s.id === selectedSlot)?.time || selectedSlot;

    const message = `Hi Arzon Hyderabad! I have scheduled an in-person campus visit at your Madhapur facility.\n\n` +
      `• Ref ID: ${ref}\n` +
      `• Name: ${name.trim()}\n` +
      `• Mobile: ${phone.trim()}\n` +
      `• College/Degree: ${college.trim() || "Life Sciences / Pharmacy"}\n` +
      `• Preferred Date: ${dateLabel}\n` +
      `• Preferred Time: ${slotLabel}\n` +
      `• Domain Interest: ${selectedDomain}\n\n` +
      `Please confirm my slot and share directions from Madhapur Metro.`;

    const url = waLink(message);
    window.open(url, "_blank");
  };

  return (
    <div className="rounded-3xl border border-stone-300 bg-white tone-light card-light p-6 sm:p-8 shadow-sm space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              VISIT MADHAPUR CAMPUS &amp; SIMULATION LAB
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#081F38] mt-1">
              Schedule an In-Person Campus Walkthrough
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
              Inspect our practical case-processing workstations, review ICH safety databases, and get an on-site career diagnostic.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            <span>FREE 1-ON-1 SESSIONS</span>
          </div>
        </div>
      </div>

      {!isBooked ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Select Date */}
          <div className="space-y-2">
            <label className="font-mono text-xs font-bold uppercase text-stone-700 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>1. Choose Preferred Day</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {DATES.map((date) => (
                <button
                  key={date.id}
                  type="button"
                  onClick={() => setSelectedDate(date.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedDate === date.id
                      ? "border-[#2563EB] bg-blue-50/70 ring-2 ring-blue-100 text-[#081F38]"
                      : "border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700"
                  }`}
                >
                  <p className="font-serif font-bold text-sm text-[#081F38]">{date.label}</p>
                  <p className="font-mono text-[10px] text-stone-500">{date.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Time Slot */}
          <div className="space-y-2">
            <label className="font-mono text-xs font-bold uppercase text-stone-700 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>2. Select Time Window</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedSlot === slot.id
                      ? "border-[#2563EB] bg-blue-50/70 ring-2 ring-blue-100 text-[#081F38]"
                      : "border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700"
                  }`}
                >
                  <p className="font-mono text-xs font-bold text-[#2563EB]">{slot.time}</p>
                  <p className="text-[11px] text-stone-600 font-sans mt-0.5 leading-snug">{slot.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Select Domain */}
          <div className="space-y-2">
            <label className="font-mono text-xs font-bold uppercase text-stone-700 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>3. Area of Career Interest</span>
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] font-sans"
            >
              {DOMAINS.map((domain, i) => (
                <option key={i} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          {/* Step 4: Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="font-mono text-[11px] font-bold uppercase text-stone-600 block mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Reddy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] font-sans"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] font-bold uppercase text-stone-600 block mb-1">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] font-sans"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] font-bold uppercase text-stone-600 block mb-1">
                College / Degree
              </label>
              <input
                type="text"
                placeholder="e.g. B.Pharm, Osmania Univ"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] font-sans"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="font-mono text-[11px] text-stone-500">
              Free walk-in consultation &bull; No obligation &bull; Direct access to industry trainers
            </p>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-11 px-7 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <span>Confirm Madhapur Campus Slot</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      ) : (
        /* Booking Confirmation Card */
        <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200 p-6 space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-emerald-950">
                Your Campus Visit Slot Is Confirmed!
              </h3>
              <p className="text-xs text-emerald-800 font-sans">
                Reference ID: <strong className="font-mono text-emerald-900">{bookingRef}</strong> &bull; Our Hyderabad student coordinator will keep your lab workstation ready.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-800 font-sans">
            <div className="p-3 rounded-xl bg-white tone-light card-light border border-emerald-200">
              <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block">CANDIDATE</span>
              <p className="font-bold text-stone-900">{name}</p>
              <p className="text-stone-600 text-[11px]">{phone}</p>
            </div>
            <div className="p-3 rounded-xl bg-white tone-light card-light border border-emerald-200">
              <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block">CAMPUS LOCATION</span>
              <p className="font-bold text-stone-900">S Chandra Reddy Towers</p>
              <p className="text-stone-600 text-[11px]">100 Feet Rd, Ayyappa Society, Madhapur</p>
            </div>
            <div className="p-3 rounded-xl bg-white tone-light card-light border border-emerald-200">
              <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block">TRANSIT PROXIMITY</span>
              <p className="font-bold text-emerald-800">5 min walk from Madhapur Metro</p>
              <p className="text-stone-600 text-[11px]">10 min from HITEC City Cyber Towers</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={ADDRESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[#081F38] hover:bg-[#2563EB] text-white text-xs font-bold transition-all shadow-xs"
            >
              <Compass className="h-4 w-4 text-white" />
              <span>Open in Google Maps Navigation</span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>
            <button
              type="button"
              onClick={() => setIsBooked(false)}
              className="text-xs font-bold text-stone-600 hover:text-stone-900 px-3 py-2"
            >
              Book another slot &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
