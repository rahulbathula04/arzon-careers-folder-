-- Coupons table
CREATE TABLE public.coupons (
  code text PRIMARY KEY,
  discount_pct integer NOT NULL CHECK (discount_pct > 0 AND discount_pct <= 100),
  window_minutes integer NOT NULL DEFAULT 120 CHECK (window_minutes > 0),
  is_active boolean NOT NULL DEFAULT true,
  max_uses_per_email integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active coupons"
  ON public.coupons FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins manage coupons - all"
  ON public.coupons FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Enrolment intents table
CREATE TABLE public.enrolment_intents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  tier text NOT NULL CHECK (tier IN ('essential','career','elite')),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text,
  background text,
  base_price_inr integer NOT NULL,
  coupon_code text REFERENCES public.coupons(code),
  coupon_applied_at timestamptz,
  coupon_expires_at timestamptz,
  discount_pct integer,
  lead_id uuid,
  status text NOT NULL DEFAULT 'started' CHECK (status IN ('started','coupon_applied','paid','expired')),
  utm_source text,
  user_agent text,
  paid_at timestamptz
);

ALTER TABLE public.enrolment_intents ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_enrolment_intents_email ON public.enrolment_intents(email);
CREATE INDEX idx_enrolment_intents_coupon_expires ON public.enrolment_intents(coupon_expires_at);

CREATE POLICY "Staff can view enrolment intents"
  ON public.enrolment_intents FOR SELECT
  TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin'::app_role,'reviewer'::app_role,'support'::app_role]));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_enrolment_intents_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_enrolment_intents_touch
  BEFORE UPDATE ON public.enrolment_intents
  FOR EACH ROW EXECUTE FUNCTION public.touch_enrolment_intents_updated_at();

-- RPC: create enrolment intent (anon-callable, validates input)
CREATE OR REPLACE FUNCTION public.create_enrolment_intent(
  p_tier text,
  p_name text,
  p_email text,
  p_phone text,
  p_city text,
  p_background text,
  p_base_price_inr integer,
  p_lead_id uuid DEFAULT NULL,
  p_utm_source text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_id uuid;
  v_name text := trim(coalesce(p_name,''));
  v_email text := lower(trim(coalesce(p_email,'')));
  v_phone text := regexp_replace(coalesce(p_phone,''), '\D', '', 'g');
  v_tier text := lower(trim(coalesce(p_tier,'')));
BEGIN
  IF v_tier NOT IN ('essential','career','elite') THEN RAISE EXCEPTION 'invalid tier'; END IF;
  IF length(v_name) < 2 OR length(v_name) > 80 THEN RAISE EXCEPTION 'invalid name'; END IF;
  IF length(v_phone) < 10 OR length(v_phone) > 15 THEN RAISE EXCEPTION 'invalid phone'; END IF;
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(v_email) > 120 THEN RAISE EXCEPTION 'invalid email'; END IF;
  IF p_base_price_inr IS NULL OR p_base_price_inr <= 0 THEN RAISE EXCEPTION 'invalid base price'; END IF;

  INSERT INTO public.enrolment_intents (
    tier, name, email, phone, city, background, base_price_inr, lead_id, utm_source, user_agent
  ) VALUES (
    v_tier, v_name, v_email, v_phone,
    nullif(left(coalesce(p_city,''),80),''),
    nullif(left(coalesce(p_background,''),120),''),
    p_base_price_inr,
    p_lead_id,
    nullif(left(coalesce(p_utm_source,''),64),''),
    nullif(left(coalesce(p_user_agent,''),256),'')
  ) RETURNING id INTO v_id;

  RETURN v_id;
END; $$;

-- RPC: apply coupon to an intent
CREATE OR REPLACE FUNCTION public.apply_enrolment_coupon(
  p_intent_id uuid,
  p_code text
) RETURNS TABLE(coupon_code text, discount_pct integer, coupon_expires_at timestamptz, status text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_code text := upper(trim(coalesce(p_code,'')));
  v_coupon public.coupons%ROWTYPE;
  v_intent public.enrolment_intents%ROWTYPE;
  v_uses integer;
  v_expires timestamptz;
BEGIN
  IF p_intent_id IS NULL THEN RAISE EXCEPTION 'intent_id required'; END IF;
  SELECT * INTO v_intent FROM public.enrolment_intents WHERE id = p_intent_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'intent not found'; END IF;

  -- If this intent already had this coupon applied and not expired, just return it (idempotent)
  IF v_intent.coupon_code = v_code AND v_intent.coupon_expires_at IS NOT NULL THEN
    RETURN QUERY SELECT v_intent.coupon_code, v_intent.discount_pct, v_intent.coupon_expires_at,
      CASE WHEN v_intent.coupon_expires_at > now() THEN 'coupon_applied' ELSE 'expired' END;
    RETURN;
  END IF;

  SELECT * INTO v_coupon FROM public.coupons WHERE code = v_code AND is_active = true;
  IF NOT FOUND THEN RAISE EXCEPTION 'invalid coupon'; END IF;

  -- Check existing window for this email
  SELECT count(*) INTO v_uses
    FROM public.enrolment_intents
   WHERE email = v_intent.email
     AND coupon_code = v_code
     AND status IN ('coupon_applied','paid');

  IF v_uses >= v_coupon.max_uses_per_email THEN
    RAISE EXCEPTION 'coupon already used for this email';
  END IF;

  v_expires := now() + make_interval(mins => v_coupon.window_minutes);

  UPDATE public.enrolment_intents
     SET coupon_code = v_code,
         coupon_applied_at = now(),
         coupon_expires_at = v_expires,
         discount_pct = v_coupon.discount_pct,
         status = 'coupon_applied'
   WHERE id = p_intent_id;

  RETURN QUERY SELECT v_code, v_coupon.discount_pct, v_expires, 'coupon_applied'::text;
END; $$;

-- RPC: read intent by id (anon-callable so the checkout page can re-hydrate)
CREATE OR REPLACE FUNCTION public.get_enrolment_intent(p_intent_id uuid)
RETURNS TABLE(
  id uuid,
  tier text,
  name text,
  email text,
  phone text,
  base_price_inr integer,
  coupon_code text,
  discount_pct integer,
  coupon_expires_at timestamptz,
  status text
) LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT id, tier, name, email, phone, base_price_inr, coupon_code, discount_pct, coupon_expires_at, status
    FROM public.enrolment_intents
   WHERE id = p_intent_id;
$$;

-- RPC: mark paid (placeholder until real payments are wired)
CREATE OR REPLACE FUNCTION public.mark_enrolment_paid(p_intent_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.enrolment_intents
     SET status = 'paid', paid_at = now()
   WHERE id = p_intent_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'intent not found'; END IF;
END; $$;

-- Seed the AGLELITE coupon
INSERT INTO public.coupons (code, discount_pct, window_minutes, is_active, max_uses_per_email)
VALUES ('AGLELITE', 15, 120, true, 1)
ON CONFLICT (code) DO NOTHING;