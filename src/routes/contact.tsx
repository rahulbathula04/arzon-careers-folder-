import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { Button } from "@/components/ui/button";
import { waLink } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/jsonLd";
import { COUNSELLOR_PHONE, COUNSELLOR_PHONE_DISPLAY, SITE, ADDRESS } from "@/components/landing/constants";
import { PremiumChip } from "@/components/ui/PremiumChip";

export const Route = createFileRoute("/contact")({
  head: () => {
    const ps = pageSeo({
      path: "/contact",
      title: "Contact Arzon Global · Talk to a Counsellor",
      description:
        "Talk to an Arzon Global counsellor about pharmacovigilance, medical coding or clinical research courses & internships. WhatsApp, email or call · Hyderabad.",
      image: SITE.ogImages.about,
    });
    return {
      meta: [{ title: "Contact Arzon Global · Talk to a Counsellor" }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: localBusinessSchema({
            telephone: COUNSELLOR_PHONE_DISPLAY,
            email: "info@arzonglobal.com",
            address: {
              streetAddress: `${ADDRESS.street}, ${ADDRESS.area}`,
              addressLocality: `${ADDRESS.locality}, ${ADDRESS.city}`,
              addressRegion: ADDRESS.region,
              postalCode: ADDRESS.postalCode,
              addressCountry: ADDRESS.countryCode,
            },
          }),
        },
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        },
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [programme, setProgramme] = useState("");
  const [waUrl, setWaUrl] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = waLink(
      `Hi Arzon. I'm ${name} (${phone}). Programme: ${programme || "Not sure yet"}. ${msg}`,
    );
    setWaUrl(url);
    const opened = window.open(url, "_blank");
    setDone(!opened ? false : true);
    if (!opened) {
      setDone(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] tone-light font-sans antialiased">
      <Nav />
      <main className="relative mx-auto max-w-5xl px-4 pt-28 sm:pt-36 pb-20 sm:px-6">
        <div className="mb-3">
          <PremiumChip variant="navy" size="md">
            GET IN TOUCH
          </PremiumChip>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
          Talk to a real counsellor.
        </h1>
        <p className="mt-4 max-w-xl text-base sm:text-lg text-stone-700 font-sans">
          Pick the channel that's easiest for you. WhatsApp is fastest. Our team replies within an
          hour during 10 AM–8 PM IST.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <a
              href={waLink("Hi Arzon. I'd like to know more about your programmes.")}
              target="_blank" rel="noopener noreferrer"
              className="group block rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition-all hover:border-emerald-500/50 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200">
                  Fastest
                </span>
              </div>
              <p className="mt-4 font-serif text-lg font-bold text-[#1A1A1A]">WhatsApp</p>
              <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans">
                {COUNSELLOR_PHONE_DISPLAY} · usually replies in 5 min
              </p>
            </a>

            <a
              href="mailto:info@arzonglobal.com"
              className="group block rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition-all hover:border-[#1B3F8B]/40 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#1B3F8B]">
                <Mail className="h-5 w-5" />
              </div>
              <p className="mt-4 font-serif text-lg font-bold text-[#1A1A1A]">Email</p>
              <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans">
                info@arzonglobal.com · reply within 1 working day
              </p>
            </a>

            <a
              href={`tel:+${COUNSELLOR_PHONE}`}
              className="group block rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition-all hover:border-[#1B3F8B]/40 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#1B3F8B]">
                <Phone className="h-5 w-5" />
              </div>
              <p className="mt-4 font-serif text-lg font-bold text-[#1A1A1A]">Call</p>
              <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans">
                {COUNSELLOR_PHONE_DISPLAY} · 10 AM – 8 PM IST · Mon–Sat
              </p>
            </a>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700">
                <MapPin className="h-5 w-5" />
              </div>
              <p className="mt-4 font-serif text-lg font-bold text-[#1A1A1A]">Visit</p>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-stone-600 font-sans">
                {ADDRESS.company}
                <br />
                {ADDRESS.street},<br />
                {ADDRESS.area},<br />
                {ADDRESS.locality}, {ADDRESS.city},<br />
                {ADDRESS.region} {ADDRESS.postalCode}, {ADDRESS.country}
              </p>
              <a
                href={ADDRESS.mapsUrl}
                target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#1B3F8B] hover:underline"
              >
                Get directions →
              </a>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div>
              <PremiumChip variant="gold" size="sm">
                CALLBACK REQUEST
              </PremiumChip>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-2">Send us a callback request</h2>
              <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans">
                One real counsellor (not a bot) will message you back within an hour. Your details are never shared.
              </p>
            </div>

            {done ? (
              <div className="pt-6 text-center space-y-4">
                <p className="font-serif text-2xl font-bold text-emerald-900">Thanks, we're on it!</p>
                <p className="text-sm text-stone-600">
                  If WhatsApp didn't open automatically, tap the button below.
                </p>
                {waUrl && (
                  <a
                    href={waUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 text-sm font-bold text-white shadow-md transition"
                  >
                    <MessageCircle className="h-4 w-4" /> Open WhatsApp
                  </a>
                )}
                <div className="pt-2">
                  <Link
                    to="/apply"
                    className="inline-flex h-11 items-center rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-5 text-sm font-bold text-white shadow-xs"
                  >
                    Or start your application <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Field label="Your name" hint="So we know who to greet.">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Priya R."
                    className="h-11 w-full rounded-xl border border-stone-300 bg-stone-50/50 px-3.5 text-sm font-medium text-stone-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#1B3F8B]/30"
                  />
                </Field>
                <Field label="WhatsApp number" hint="We only use this to text you a callback time.">
                  <input
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+91 98xxx xxxxx"
                    className="h-11 w-full rounded-xl border border-stone-300 bg-stone-50/50 px-3.5 text-sm font-medium text-stone-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#1B3F8B]/30"
                  />
                </Field>
                <Field
                  label="Which programme are you exploring?"
                  hint="Helps us route you to the right counsellor."
                >
                  <select
                    value={programme}
                    onChange={(e) => setProgramme(e.target.value)}
                    className="h-11 w-full rounded-xl border border-stone-300 bg-stone-50/50 px-3 text-sm font-medium text-stone-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#1B3F8B]/30"
                  >
                    <option value="">Not sure yet - help me decide</option>
                    <option value="Pharmacovigilance">Pharmacovigilance</option>
                    <option value="Medical Coding">Medical Coding</option>
                    <option value="Clinical Research">Clinical Research</option>
                    <option value="SAS Clinical">SAS Clinical</option>
                  </select>
                </Field>
                <Field
                  label="How can we help?"
                  hint="Optional - a sentence about your background helps a lot."
                >
                  <textarea
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="e.g. I'm a final-year B.Pharm student exploring PV…"
                    className="h-24 w-full resize-none rounded-xl border border-stone-300 bg-stone-50/50 p-3 text-sm leading-relaxed text-stone-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#1B3F8B]/30"
                  />
                </Field>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Send &amp; open WhatsApp
                </Button>
                <p className="text-center text-xs text-stone-500 font-sans">
                  By submitting you agree to be contacted by an Arzon counsellor. No spam, ever.
                </p>
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-stone-800">{label}</span>
      {hint && <span className="mt-0.5 block text-[11px] text-stone-500">{hint}</span>}
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}
