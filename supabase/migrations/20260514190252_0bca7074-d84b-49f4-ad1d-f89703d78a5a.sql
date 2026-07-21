
-- Trust ledger entries (refunds, complaints, ACRI outcomes, placements)
CREATE TABLE public.trust_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  occurred_on DATE NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('refund','complaint','acri','placement','incident')),
  headline TEXT NOT NULL,
  detail TEXT,
  amount_inr INTEGER,
  resolved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.trust_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY "trust_ledger public read" ON public.trust_ledger FOR SELECT USING (true);
CREATE INDEX idx_trust_ledger_occurred ON public.trust_ledger (occurred_on DESC);

-- Changelog releases
CREATE TABLE public.changelog_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  released_on DATE NOT NULL,
  area TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.changelog_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "changelog public read" ON public.changelog_entries FOR SELECT USING (true);
CREATE INDEX idx_changelog_released ON public.changelog_entries (released_on DESC);

-- Operational status
CREATE TABLE public.status_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL CHECK (state IN ('operational','degraded','down','maintenance')),
  note TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.status_components ENABLE ROW LEVEL SECURITY;
CREATE POLICY "status public read" ON public.status_components FOR SELECT USING (true);

-- Referral codes
CREATE TABLE public.referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  referrer_name TEXT,
  referrer_phone TEXT,
  referrer_payout_inr INTEGER NOT NULL DEFAULT 3000,
  referee_discount_inr INTEGER NOT NULL DEFAULT 1000,
  active BOOLEAN NOT NULL DEFAULT true,
  uses INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "referral_codes public read active" ON public.referral_codes FOR SELECT USING (active = true);

-- Seed minimum content
INSERT INTO public.status_components (name, state, note) VALUES
  ('Website', 'operational', null),
  ('Career Engine', 'operational', null),
  ('Payments (Razorpay)', 'operational', null),
  ('Learning Dashboard', 'operational', null),
  ('Email + WhatsApp', 'operational', null),
  ('Certificate Verification', 'operational', null);

INSERT INTO public.changelog_entries (released_on, area, title, body) VALUES
  (CURRENT_DATE, 'Career Engine', 'Tiered fit labels replace percentages', 'Result page now shows Top match / Best match / Strong match instead of raw scores so candidates focus on direction, not numbers.'),
  (CURRENT_DATE - 3, 'Trust', 'Public trust ledger live', 'Refunds, complaints, and ACRI outcomes now publish to a public ledger.'),
  (CURRENT_DATE - 7, 'Curriculum', 'Pharmacovigilance module v3', 'Updated to MedDRA 27.0 with two new sample ICSR cases.'),
  (CURRENT_DATE - 14, 'Platform', 'Cohort waitlist + EMI flow', 'Razorpay no-cost EMI now visible at checkout for orders above ₹20,000.');
