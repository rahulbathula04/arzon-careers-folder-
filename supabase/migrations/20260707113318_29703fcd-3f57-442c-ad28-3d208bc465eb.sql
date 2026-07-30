
-- =========================================================
-- PROMOTION ENGINE - PHASE 1 (schema foundation, backward compatible)
-- =========================================================

-- 1. Extensible promotion type catalog
CREATE TABLE public.promotion_types (
  code text PRIMARY KEY,
  label text NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.promotion_types TO authenticated, anon;
GRANT ALL ON public.promotion_types TO service_role;
ALTER TABLE public.promotion_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "promotion_types public read active"
  ON public.promotion_types FOR SELECT TO authenticated, anon
  USING (is_active = true);
CREATE POLICY "promotion_types admin all"
  ON public.promotion_types FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.promotion_types (code, label, sort_order) VALUES
  ('coupon_code','Coupon Code',10),
  ('automatic_discount','Automatic Discount',20),
  ('referral_reward','Referral Reward',30),
  ('campus_offer','Campus Offer',40),
  ('webinar_offer','Webinar Offer',50),
  ('email_campaign','Email Campaign',60),
  ('whatsapp_campaign','WhatsApp Campaign',70),
  ('influencer_campaign','Influencer Campaign',80),
  ('scholarship','Scholarship',90),
  ('flash_sale','Flash Sale',100),
  ('early_bird','Early Bird',110),
  ('last_chance','Last Chance Offer',120),
  ('festival','Festival Campaign',130),
  ('employer_sponsored','Employer Sponsored Offer',140);

-- 2. Campaigns
CREATE TABLE public.promotion_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  type_code text NOT NULL REFERENCES public.promotion_types(code),
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','active','paused','archived')),
  starts_at timestamptz,
  ends_at timestamptz,
  budget_inr integer,
  priority integer NOT NULL DEFAULT 100,
  banner_image_url text,
  internal_notes text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.promotion_campaigns TO authenticated, anon;
GRANT ALL ON public.promotion_campaigns TO service_role;
ALTER TABLE public.promotion_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "campaigns public read active"
  ON public.promotion_campaigns FOR SELECT TO authenticated, anon
  USING (status = 'active');
CREATE POLICY "campaigns admin all"
  ON public.promotion_campaigns FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE INDEX idx_campaigns_status ON public.promotion_campaigns(status);
CREATE INDEX idx_campaigns_type ON public.promotion_campaigns(type_code);

CREATE OR REPLACE FUNCTION public.tg_promotion_touch_updated()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at := now(); RETURN NEW; END; $$;
CREATE TRIGGER trg_promotion_campaigns_updated
  BEFORE UPDATE ON public.promotion_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.tg_promotion_touch_updated();

-- 3. Rule tables - one row per campaign, JSON payloads keep it extensible
CREATE TABLE public.promotion_audience_rules (
  campaign_id uuid PRIMARY KEY REFERENCES public.promotion_campaigns(id) ON DELETE CASCADE,
  rules jsonb NOT NULL DEFAULT '{"audiences":["everyone"]}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.promotion_pricing_rules (
  campaign_id uuid PRIMARY KEY REFERENCES public.promotion_campaigns(id) ON DELETE CASCADE,
  model text NOT NULL DEFAULT 'tier_override'
    CHECK (model IN ('tier_override','fixed_amount','percentage','fee_waiver','bonus_credits','bundle','free_service')),
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.promotion_time_rules (
  campaign_id uuid PRIMARY KEY REFERENCES public.promotion_campaigns(id) ON DELETE CASCADE,
  starts_at timestamptz,
  ends_at timestamptz,
  countdown_minutes integer,
  weekdays smallint[],
  time_of_day_start time,
  time_of_day_end time,
  flash boolean NOT NULL DEFAULT false,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.promotion_usage_rules (
  campaign_id uuid PRIMARY KEY REFERENCES public.promotion_campaigns(id) ON DELETE CASCADE,
  per_email integer,
  per_phone integer,
  per_user integer,
  per_referral integer,
  per_campaign integer,
  global_limit integer,
  monthly_limit integer,
  yearly_limit integer,
  unlimited boolean NOT NULL DEFAULT false,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.promotion_stacking_rules (
  campaign_id uuid PRIMARY KEY REFERENCES public.promotion_campaigns(id) ON DELETE CASCADE,
  mode text NOT NULL DEFAULT 'none'
    CHECK (mode IN ('none','all','referral_only','automatic_only')),
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Common grants + RLS for the 5 rule tables
DO $$ DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'promotion_audience_rules','promotion_pricing_rules','promotion_time_rules',
    'promotion_usage_rules','promotion_stacking_rules'
  ] LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO authenticated, anon;', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role;', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format('CREATE POLICY "%s admin all" ON public.%I FOR ALL TO authenticated USING (public.has_role(auth.uid(),''admin'')) WITH CHECK (public.has_role(auth.uid(),''admin''));', t, t);
    EXECUTE format('CREATE POLICY "%s public read" ON public.%I FOR SELECT TO authenticated, anon USING (EXISTS (SELECT 1 FROM public.promotion_campaigns c WHERE c.id = campaign_id AND c.status = ''active''));', t, t);
    EXECUTE format('CREATE TRIGGER trg_%s_updated BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.tg_promotion_touch_updated();', t, t);
  END LOOP;
END $$;

-- 4. Attribution (source channels, sales reps, campus owners, referral partners)
CREATE TABLE public.promotion_attributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES public.promotion_campaigns(id) ON DELETE CASCADE,
  source text NOT NULL,
  channel text,
  owner_type text CHECK (owner_type IN ('sales_exec','campus','partner','influencer','ambassador','system')),
  owner_ref text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  qr_slug text UNIQUE,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.promotion_attributions TO authenticated, anon;
GRANT ALL ON public.promotion_attributions TO service_role;
ALTER TABLE public.promotion_attributions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "attributions admin all"
  ON public.promotion_attributions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "attributions read active campaign"
  ON public.promotion_attributions FOR SELECT TO authenticated, anon
  USING (campaign_id IS NULL OR EXISTS (SELECT 1 FROM public.promotion_campaigns c WHERE c.id = campaign_id AND c.status = 'active'));
CREATE INDEX idx_attr_campaign ON public.promotion_attributions(campaign_id);
CREATE INDEX idx_attr_source ON public.promotion_attributions(source);

-- 5. Lifecycle event log (append-only)
CREATE TABLE public.promotion_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES public.promotion_campaigns(id) ON DELETE SET NULL,
  attribution_id uuid REFERENCES public.promotion_attributions(id) ON DELETE SET NULL,
  coupon_code text,
  intent_id uuid REFERENCES public.enrolment_intents(id) ON DELETE SET NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text,
  event_type text NOT NULL CHECK (event_type IN (
    'created','activated','viewed','applied','removed','expired',
    'checkout_started','payment_initiated','payment_successful','payment_failed','refunded'
  )),
  amount_inr integer,
  discount_inr integer,
  source text,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.promotion_events TO authenticated;
GRANT ALL ON public.promotion_events TO service_role;
ALTER TABLE public.promotion_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events admin read"
  ON public.promotion_events FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR user_id = auth.uid());
-- rls-check: allow-true reason: Superseded by 20260707113523 which scopes inserts to auth.uid()=user_id; kept permissive here so historical replay succeeds before the follow-up migration runs.
CREATE POLICY "events service insert"
  ON public.promotion_events FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE INDEX idx_promo_events_campaign_time ON public.promotion_events(campaign_id, occurred_at DESC);
CREATE INDEX idx_promo_events_coupon_time ON public.promotion_events(coupon_code, occurred_at DESC);
CREATE INDEX idx_promo_events_intent ON public.promotion_events(intent_id);
CREATE INDEX idx_promo_events_type_time ON public.promotion_events(event_type, occurred_at DESC);

-- 6. Link existing coupons (backward compatible - nullable columns)
ALTER TABLE public.coupons
  ADD COLUMN campaign_id uuid REFERENCES public.promotion_campaigns(id) ON DELETE SET NULL,
  ADD COLUMN attribution_id uuid REFERENCES public.promotion_attributions(id) ON DELETE SET NULL;
CREATE INDEX idx_coupons_campaign ON public.coupons(campaign_id);

-- 7. Seed a Legacy Coupons campaign and backfill all existing coupons into it
WITH ins AS (
  INSERT INTO public.promotion_campaigns (slug, name, description, type_code, status, priority, internal_notes)
  VALUES ('legacy-coupons','Legacy Coupons','Auto-created wrapper for coupons that existed before the Promotion Engine.','coupon_code','active',1000,'Preserves original coupon behaviour. Do not archive.')
  RETURNING id
)
UPDATE public.coupons SET campaign_id = (SELECT id FROM ins) WHERE campaign_id IS NULL;

-- Seed default rule rows for the legacy campaign so admin UI can edit later
INSERT INTO public.promotion_audience_rules (campaign_id, rules)
  SELECT id, '{"audiences":["everyone"]}'::jsonb FROM public.promotion_campaigns WHERE slug='legacy-coupons';
INSERT INTO public.promotion_pricing_rules (campaign_id, model, config)
  SELECT id, 'tier_override', '{"source":"coupon_tier_prices"}'::jsonb FROM public.promotion_campaigns WHERE slug='legacy-coupons';
INSERT INTO public.promotion_time_rules (campaign_id, config)
  SELECT id, '{"source":"coupons.window_minutes"}'::jsonb FROM public.promotion_campaigns WHERE slug='legacy-coupons';
INSERT INTO public.promotion_usage_rules (campaign_id, per_email, config)
  SELECT id, 1, '{"source":"coupons.max_uses_per_email"}'::jsonb FROM public.promotion_campaigns WHERE slug='legacy-coupons';
INSERT INTO public.promotion_stacking_rules (campaign_id, mode)
  SELECT id, 'none' FROM public.promotion_campaigns WHERE slug='legacy-coupons';

-- 8. Convenience view - one row per active coupon with campaign metadata
CREATE OR REPLACE VIEW public.v_active_promotions AS
SELECT
  c.code,
  c.discount_pct,
  c.window_minutes,
  c.max_uses_per_email,
  c.is_active,
  camp.id AS campaign_id,
  camp.slug AS campaign_slug,
  camp.name AS campaign_name,
  camp.type_code,
  camp.status AS campaign_status,
  camp.starts_at,
  camp.ends_at,
  camp.priority
FROM public.coupons c
LEFT JOIN public.promotion_campaigns camp ON camp.id = c.campaign_id
WHERE c.is_active = true;
GRANT SELECT ON public.v_active_promotions TO authenticated, anon;

-- 9. Helper: append a lifecycle event (used by server functions later)
CREATE OR REPLACE FUNCTION public.log_promotion_event(
  p_event_type text,
  p_coupon_code text DEFAULT NULL,
  p_intent_id uuid DEFAULT NULL,
  p_email text DEFAULT NULL,
  p_amount_inr integer DEFAULT NULL,
  p_discount_inr integer DEFAULT NULL,
  p_source text DEFAULT NULL,
  p_meta jsonb DEFAULT '{}'::jsonb
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_campaign_id uuid;
  v_id uuid;
BEGIN
  IF p_coupon_code IS NOT NULL THEN
    SELECT campaign_id INTO v_campaign_id FROM public.coupons WHERE code = upper(p_coupon_code);
  END IF;
  INSERT INTO public.promotion_events(
    campaign_id, coupon_code, intent_id, email, event_type,
    amount_inr, discount_inr, source, meta
  ) VALUES (
    v_campaign_id, upper(p_coupon_code), p_intent_id, p_email, p_event_type,
    p_amount_inr, p_discount_inr, p_source, COALESCE(p_meta,'{}'::jsonb)
  ) RETURNING id INTO v_id;
  RETURN v_id;
END; $$;
REVOKE ALL ON FUNCTION public.log_promotion_event(text,text,uuid,text,integer,integer,text,jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.log_promotion_event(text,text,uuid,text,integer,integer,text,jsonb) TO authenticated, service_role;
