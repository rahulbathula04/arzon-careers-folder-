import { useState } from "react";
import { ArrowRight, CheckCircle2, Download, Mail, Phone, User, GraduationCap } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitCareerStarterKitLead } from "@/lib/careerStarterKit.functions";
import { toast } from "sonner";

const QUALIFICATIONS = [
  "B.Pharm / M.Pharm / Pharm.D",
  "MBBS / BDS",
  "B.Sc / M.Sc Life Sciences",
  "Biotechnology / Biochemistry",
  "Nursing / Allied Health",
  "Other healthcare or science degree",
];

export function CareerStarterKitLeadMagnet() {
  const submit = useServerFn(submitCareerStarterKitLead);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: QUALIFICATIONS[0],
    whatsappOptin: true,
  });

  const update = (key: keyof typeof form, value: string | boolean) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await submit({ data: { ...form, sourcePath: typeof window !== "undefined" ? window.location.pathname : "/careers" } });
      setSubmitted(true);
      toast.success("Your starter kit is ready.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We could not save your details. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="arzon-v2-container pb-10 sm:pb-14" aria-labelledby="career-starter-kit">
      <div className="overflow-hidden rounded-2xl border border-blue-200 bg-[#EEF5FF]">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-6 sm:p-8">
            <span className="arzon-v2-eyebrow">FREE CAREER STARTER KIT</span>
            <h2 id="career-starter-kit" className="mt-3 max-w-2xl text-2xl font-extrabold tracking-tight text-[var(--arzon-ink-strong)] sm:text-3xl">
              Get the 2026 Healthcare Career Starter Kit before you choose a programme.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              A practical guide to healthcare roles, employer expectations, skills to build and questions to ask before spending money on training.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                "Healthcare role map",
                "Skills employers ask for",
                "Preparation checklist",
                "Career decision worksheet",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8">
            {submitted ? (
              <div className="flex h-full min-h-56 flex-col justify-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                <h3 className="mt-3 text-xl font-extrabold text-[var(--arzon-ink-strong)]">Your kit is ready.</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  We have saved your details so your career activity can stay connected to your plan.
                </p>
                <a
                  href="/Arzon_2026_Healthcare_Career_Starter_Kit.pdf"
                  download="Arzon_2026_Healthcare_Career_Starter_Kit.pdf"
                  className="arzon-v2-button-primary mt-5 w-full justify-center sm:w-fit"
                >
                  <Download className="h-4 w-4" /> Download Starter Kit
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="text-base font-extrabold text-[var(--arzon-ink-strong)]">Where should we send it?</h3>
                <label className="block">
                  <span className="sr-only">Full name</span>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900" />
                  </div>
                </label>
                <label className="block">
                  <span className="sr-only">Email address</span>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email address" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900" />
                  </div>
                </label>
                <label className="block">
                  <span className="sr-only">WhatsApp number</span>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input required inputMode="numeric" pattern="[0-9]{10,15}" value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 15))} placeholder="WhatsApp number" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900" />
                  </div>
                </label>
                <label className="block">
                  <span className="sr-only">Qualification</span>
                  <select value={form.qualification} onChange={(e) => update("qualification", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900">
                    {QUALIFICATIONS.map((q) => <option key={q}>{q}</option>)}
                  </select>
                </label>
                <label className="flex items-start gap-2 text-[11px] leading-4 text-slate-500">
                  <input type="checkbox" checked={form.whatsappOptin} onChange={(e) => update("whatsappOptin", e.target.checked)} className="mt-0.5" />
                  <span>Send useful career updates on WhatsApp. You can opt out later.</span>
                </label>
                <button type="submit" disabled={busy} className="arzon-v2-button-primary w-full justify-center">
                  {busy ? "Saving..." : <>Get My Free Kit <ArrowRight className="h-4 w-4" /></>}
                </button>
                <p className="text-[10px] leading-4 text-slate-400">Your details are used to deliver the kit and connect your career activity. See our Privacy Policy for details.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
