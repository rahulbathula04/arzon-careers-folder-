import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Section } from "@/components/ui/Section";
import {
  MessageCircle,
  FileDown,
  ShieldCheck,
  Building2,
  FileBadge2,
  IndianRupee,
} from "lucide-react";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";

type Lang = "en" | "hi" | "te";

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    intro: string;
    points: { icon: typeof ShieldCheck; title: string; body: string }[];
    ctaTalk: string;
    ctaBrochure: string;
    whatsappMsg: string;
  }
> = {
  en: {
    eyebrow: "For parents · 90 seconds",
    title: "Is this institute real, and is the salary real?",
    intro: "Four things to know. Each verifiable in the footer.",
    points: [
      {
        icon: Building2,
        title: "Registered Pvt. Ltd. company.",
        body: "MCA CIN published in the footer.",
      },
      {
        icon: ShieldCheck,
        title: "Real compliance registrations.",
        body: "ISO 9001 · MSME · MCA. All verifiable.",
      },
      {
        icon: IndianRupee,
        title: "Salaries are industry-standard.",
        body: "₹3–7 LPA first job. We publish X/Y, not percentages.",
      },
      {
        icon: FileBadge2,
        title: "Break-even in ~28 days.",
        body: "₹24,999 fee ÷ ₹26,667 first-month salary. Everything after is upside.",
      },
    ],
    ctaTalk: "Talk to a counsellor on WhatsApp",
    ctaBrochure: "Download parent brochure (PDF)",
    whatsappMsg:
      "Namaste. I am a parent. I want to understand the programme before my child applies.",
  },
  hi: {
    eyebrow: "अभिभावकों के लिए · 90 सेकंड",
    title: "क्या यह संस्था असली है, और सैलरी असली है?",
    intro: "चार बातें जानिए। हर एक फुटर में जांच लीजिए।",
    points: [
      { icon: Building2, title: "रजिस्टर्ड Pvt. Ltd. कंपनी।", body: "MCA CIN फुटर में।" },
      {
        icon: ShieldCheck,
        title: "असली अनुपालन पंजीकरण।",
        body: "ISO 9001 · MSME · MCA। सब जांचने योग्य।",
      },
      {
        icon: IndianRupee,
        title: "सैलरी इंडस्ट्री-स्टैंडर्ड है।",
        body: "पहली नौकरी ₹3–7 लाख। प्रतिशत नहीं, असली X/Y।",
      },
      {
        icon: FileBadge2,
        title: "लगभग 28 दिनों में ब्रेक-ईवन।",
        body: "₹24,999 फीस ÷ ₹26,667 पहले महीने की सैलरी। उसके बाद सब फायदा।",
      },
    ],
    ctaTalk: "WhatsApp पर काउंसलर से बात करें",
    ctaBrochure: "अभिभावक ब्रोशर डाउनलोड करें (PDF)",
    whatsappMsg: "नमस्ते, मैं एक अभिभावक हूँ। मेरे बच्चे के आवेदन से पहले मुझे प्रोग्राम समझना है।",
  },
  te: {
    eyebrow: "తల్లిదండ్రుల కోసం · 90 సెకన్లు",
    title: "ఈ సంస్థ నిజమేనా, జీతం నిజమేనా?",
    intro: "నాలుగు విషయాలు. ప్రతి ఒకటి ఫుటర్‌లో ధృవీకరించండి.",
    points: [
      { icon: Building2, title: "నమోదైన Pvt. Ltd. కంపెనీ.", body: "MCA CIN ఫుటర్‌లో." },
      {
        icon: ShieldCheck,
        title: "అసలైన కంప్లయన్స్ నమోదులు.",
        body: "ISO 9001 · MSME · MCA. అన్నీ ధృవీకరించగలవి.",
      },
      {
        icon: IndianRupee,
        title: "జీతాలు ఇండస్ట్రీ-స్టాండర్డ్.",
        body: "మొదటి ఉద్యోగం ₹3–7 LPA. శాతాలు కాదు, X/Y.",
      },
      {
        icon: FileBadge2,
        title: "7 రోజుల రీఫండ్. వ్రాతపూర్వకం.",
        body: "మొదటి వారం 100%. తర్వాత ప్రో-రేటెడ్.",
      },
    ],
    ctaTalk: "WhatsApp లో కౌన్సిలర్‌తో మాట్లాడండి",
    ctaBrochure: "తల్లిదండ్రుల బ్రోచర్ డౌన్‌లోడ్ చేయండి (PDF)",
    whatsappMsg:
      "నమస్తే, నేను తల్లిదండ్రిని. నా పిల్లవాడు దరఖాస్తు చేయడానికి ముందు ప్రోగ్రామ్ అర్థం చేసుకోవాలనుకుంటున్నాను.",
  },
};

const LANG_LABELS: Record<Lang, string> = { en: "English", hi: "हिंदी", te: "తెలుగు" };

export function ParentSection() {
  const [lang, setLang] = useState<Lang>("en");
  const t = COPY[lang];

  return (
    <Section size="md" containerSize="md">
      <div className="overflow-hidden rounded-3xl border border-slate-200/10 bg-gradient-to-br from-[#0F1A30] to-[#0B1325] p-6 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow" style={{ color: "var(--primary-glow)" }}>
              {t.eyebrow}
            </p>
            <h2 className="h-section mt-3 max-w-2xl">{t.title}</h2>
          </div>

          <div className="inline-flex rounded-full border border-slate-200/15 bg-white/[0.04] p-1">
            {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1 text-meta font-semibold transition ${
                  lang === l ? "bg-gold text-gold-ink" : "text-slate-100/65 hover:text-slate-50"
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
        </div>

        <p className="body-lg mt-5 max-w-2xl">{t.intro}</p>

        <div className="mt-7 grid gap-4 sm:mt-8 sm:grid-cols-2">
          {t.points.map(({ icon: Icon, title, body }) => (
            <div key={title} className="surface-card">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary-glow ring-1 ring-primary/30">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-sm font-semibold text-slate-50">{title}</p>
              </div>
              <p className="mt-3 text-sm text-slate-100/70">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
          <WhatsAppLink
            source="parent_section_talk"
            message={t.whatsappMsg}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-glow/90 px-5 text-sm font-semibold text-slate-50 transition hover:bg-sky-500"
          >
            <MessageCircle className="h-4 w-4" /> {t.ctaTalk}
          </WhatsAppLink>
          <WhatsAppLink
            source="parent_section_brochure"
            message="Namaste. Please send me the parent brochure (PDF) for the Arzon Global programme."
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200/20 bg-slate-50/5 px-5 text-sm font-semibold text-slate-50 backdrop-blur transition hover:bg-slate-50/10"
          >
            <FileDown className="h-4 w-4 text-primary-glow" /> {t.ctaBrochure}
          </WhatsAppLink>
          <Link
            to="/proof"
            className="inline-flex h-12 items-center justify-center gap-2 px-2 text-sm font-semibold text-gold/90 hover:text-gold sm:justify-start"
          >
            See the Proof Vault →
          </Link>
        </div>
      </div>
    </Section>
  );
}
