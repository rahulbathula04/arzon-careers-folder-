-- Public share cards for assessment results
CREATE TABLE public.assessment_shares (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  archetype TEXT NOT NULL,
  archetype_name TEXT NOT NULL,
  top_track_slug TEXT,
  top_track_title TEXT,
  acri_overall INTEGER NOT NULL DEFAULT 0,
  band_label TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  referral_code TEXT,
  views INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_assessment_shares_slug ON public.assessment_shares(slug);
CREATE INDEX idx_assessment_shares_referral ON public.assessment_shares(referral_code) WHERE referral_code IS NOT NULL;

ALTER TABLE public.assessment_shares ENABLE ROW LEVEL SECURITY;

-- Public can read share cards by slug (needed for share landing pages)
CREATE POLICY "Anyone can view share cards"
ON public.assessment_shares
FOR SELECT
USING (true);

-- Only server-side service role can insert/update (no client policy = denied)

-- Referral attribution (which share brought in which lead)
CREATE TABLE public.referral_attributions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referral_code TEXT NOT NULL,
  lead_id UUID,
  landing_path TEXT,
  user_agent TEXT,
  attributed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_referral_attributions_code ON public.referral_attributions(referral_code);
CREATE INDEX idx_referral_attributions_lead ON public.referral_attributions(lead_id) WHERE lead_id IS NOT NULL;

ALTER TABLE public.referral_attributions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert attributions (visit tracking) - server validates code
CREATE POLICY "Anyone can record an attribution"
ON public.referral_attributions
FOR INSERT
WITH CHECK (true);

-- Aggregate read for leaderboard (no PII exposed since lead_id is opaque)
CREATE POLICY "Anyone can read attributions"
ON public.referral_attributions
FOR SELECT
USING (true);
