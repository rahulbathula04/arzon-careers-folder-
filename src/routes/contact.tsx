import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { waLink } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/jsonLd";
import { COUNSELLOR_PHONE, COUNSELLOR_PHONE_DISPLAY, SITE } from "@/components/landing/constants";

import { ADDRESS } from "@/components/landing/constants";
export const Route = createFileRoute("/contact")({
  head: () => {
    const ps = pageSeo({
      path: "/contact",
      title: "Contact Arzon Global. Talk to a counsellor",
      description:
        "Talk to an Arzon Global counsellor about pharmacovigilance, medical coding or clinical research courses & internships. WhatsApp, email or call · Hyderabad.",
      image: SITE.ogImages.about,
    });
    return {
      meta: [{ title: "Contact Arzon Global. Talk to a counsellor" }, ...ps.meta],
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
    // If the browser blocked the popup, `opened` is null.
    // We still set done=true so the form clears, but show a fallback link.
    setDone(!opened ? false : true);
    if (!opened) {
      // Form stays visible but we show the fallback link inline
      setDone(true); // show success-ish state with the fallback link
    }
  };

  return (
    <main className="tone-dark min-h-app bg-[#0A0F1E] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-900/0 to-transparent pointer-events-none" />
      <section className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
          Contact
        </p>
        <h1 className="h-display mt-3 font-serif">Talk to a real counsellor.</h1>
        <p className="mt-4 max-w-xl text-base text-white/70">
          Pick the channel that's easiest for you. WhatsApp is fastest. Our team replies within an
          hour during 10 AM–8 PM IST.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-3">
            <a
              href={waLink("Hi Arzon. I'd like to know more about your programmes.")}
              target="_blank" rel="noopener noreferrer"
              className="group glass-panel-deep block rounded-3xl border border-sky-400/30 bg-sky-400/[0.05] p-5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-sky-400/50 hover:bg-sky-400/[0.08]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/10 ring-1 ring-sky-400/30 transition-transform group-hover:scale-110">
                  <MessageCircle className="h-5 w-5 text-sky-400" />
                </div>
                <span className="rounded-full bg-sky-400/15 px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-sky-300 ring-1 ring-sky-400/30">
                  Fastest
                </span>
              </div>
              <p className="mt-4 font-grotesk text-lg font-bold text-white">WhatsApp</p>
              <p className="mt-1 text-sm text-white/60">
                {COUNSELLOR_PHONE_DISPLAY} · usually replies in 5 min
              </p>
            </a>
            <a
              href="mailto:info@arzonglobal.com"
              className="group glass-panel-deep block rounded-3xl border border-white/10 p-5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-teal-500/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-transform group-hover:scale-110 group-hover:ring-teal-500/50">
                <Mail className="h-5 w-5 text-slate-300 group-hover:text-teal-400" />
              </div>
              <p className="mt-4 font-grotesk text-lg font-bold text-white">Email</p>
              <p className="mt-1 text-sm text-white/60">
                info@arzonglobal.com · reply within 1 working day
              </p>
            </a>
            <a
              href={`tel:+${COUNSELLOR_PHONE}`}
              className="group glass-panel-deep block rounded-3xl border border-white/10 p-5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-teal-500/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-transform group-hover:scale-110 group-hover:ring-teal-500/50">
                <Phone className="h-5 w-5 text-slate-300 group-hover:text-teal-400" />
              </div>
              <p className="mt-4 font-grotesk text-lg font-bold text-white">Call</p>
              <p className="mt-1 text-sm text-white/60">
                {COUNSELLOR_PHONE_DISPLAY} · 10 AM – 8 PM IST · Mon–Sat
              </p>
            </a>
            <div className="glass-panel-deep rounded-3xl border border-white/10 p-5 shadow-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <MapPin className="h-5 w-5 text-slate-300" />
              </div>
              <p className="mt-4 font-grotesk text-lg font-bold text-white">Visit</p>
              <p className="mt-1 text-sm leading-relaxed text-white/60">
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
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-400 transition-colors hover:text-teal-300"
              >
                Get directions →
              </a>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="glass-panel-deep relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl sm:p-8"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-500/10 blur-[40px]" />
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow">
              Or send us a callback request
            </p>
            <p className="mt-2 text-caption text-white/70">
              One real counsellor (not a bot) will message you back within an hour. Your details are
              never sold or shared.
            </p>
            {done ? (
              <div className="mt-6 text-center">
                <p className="font-display text-h3 text-white">Thanks, we're on it.</p>
                <p className="mt-2 text-sm text-white/75">
                  If WhatsApp didn't open automatically, tap the button below.
                </p>
                {waUrl && (
                  <a
                    href={waUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-accent-glow px-5 text-sm font-semibold text-sky-950 transition hover:opacity-90"
                  >
                    <MessageCircle className="h-4 w-4" /> Open WhatsApp
                  </a>
                )}
                <Link
                  to="/apply"
                  className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Or start your application <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <Field label="Your name" hint="So we know who to greet.">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Priya R."
                    className="h-12 w-full rounded-xl border-0 px-3.5 text-body-sm font-medium ring-1 ring-white/15 outline-none transition focus:ring-2 focus:ring-accent-glow"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#F8FAFC" }}
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
                    className="h-12 w-full rounded-xl border-0 px-3.5 text-body-sm font-medium ring-1 ring-white/15 outline-none transition focus:ring-2 focus:ring-accent-glow"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#F8FAFC" }}
                  />
                </Field>
                <Field
                  label="Which programme are you exploring?"
                  hint="Helps us route you to the right counsellor."
                >
                  <select
                    value={programme}
                    onChange={(e) => setProgramme(e.target.value)}
                    className="h-12 w-full rounded-xl border-0 px-3 text-body-sm font-medium ring-1 ring-white/15 outline-none transition focus:ring-2 focus:ring-accent-glow"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#F8FAFC" }}
                  >
                    <option value="" style={{ color: "#0F172A" }}>
                      Not sure yet - help me decide
                    </option>
                    <option value="Pharmacovigilance" style={{ color: "#0F172A" }}>
                      Pharmacovigilance
                    </option>
                    <option value="Medical Coding" style={{ color: "#0F172A" }}>
                      Medical Coding
                    </option>
                    <option value="Clinical Research" style={{ color: "#0F172A" }}>
                      Clinical Research
                    </option>
                    <option value="SAS Clinical" style={{ color: "#0F172A" }}>
                      SAS Clinical
                    </option>
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
                    className="h-28 w-full resize-none rounded-xl border-0 p-3.5 text-body-sm leading-relaxed ring-1 ring-white/15 outline-none transition focus:ring-2 focus:ring-accent-glow"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#F8FAFC" }}
                  />
                </Field>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full rounded-full text-body-sm font-semibold"
                  style={{ background: "#10B981", color: "#FFFFFF" }}
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Send & open WhatsApp
                </Button>
                <p className="text-center text-meta text-white/60">
                  By submitting you agree to be contacted by an Arzon counsellor. No spam, ever.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
      <Footer />
    </main>
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
      <span className="block text-caption font-semibold text-white">{label}</span>
      {hint && <span className="mt-0.5 block text-meta text-white/55">{hint}</span>}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}
