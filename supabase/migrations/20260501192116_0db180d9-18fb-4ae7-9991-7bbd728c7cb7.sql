
DROP FUNCTION IF EXISTS public.apply_enrolment_coupon(uuid, text);
DROP FUNCTION IF EXISTS public.get_enrolment_intent(uuid);

CREATE TABLE IF NOT EXISTS public.coupon_tier_prices (
  code text NOT NULL REFERENCES public.coupons(code) ON DELETE CASCADE,
  tier text NOT NULL CHECK (tier IN ('essential','career','elite')),
  override_price_inr integer NOT NULL CHECK (override_price_inr > 0),
  PRIMARY KEY (code, tier)
);

ALTER TABLE public.coupon_tier_prices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read coupon tier prices for active coupons" ON public.coupon_tier_prices;
CREATE POLICY "Anyone can read coupon tier prices for active coupons"
  ON public.coupon_tier_prices FOR SELECT
  TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM public.coupons c WHERE c.code = coupon_tier_prices.code AND c.is_active = true));

DROP POLICY IF EXISTS "Admins manage coupon tier prices" ON public.coupon_tier_prices;
CREATE POLICY "Admins manage coupon tier prices"
  ON public.coupon_tier_prices FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.enrolment_intents
  ADD COLUMN IF NOT EXISTS final_price_inr integer,
  ADD COLUMN IF NOT EXISTS razorpay_order_id text,
  ADD COLUMN IF NOT EXISTS razorpay_payment_id text;

CREATE INDEX IF NOT EXISTS idx_enrolment_intents_razorpay_order
  ON public.enrolment_intents(razorpay_order_id);

INSERT INTO public.coupons (code, discount_pct, window_minutes, max_uses_per_email, is_active)
VALUES ('AGLELITE', 1, 120, 1, true)
ON CONFLICT (code) DO UPDATE SET is_active = true, window_minutes = 120;

INSERT INTO public.coupon_tier_prices (code, tier, override_price_inr) VALUES
  ('AGLELITE','essential',5999),
  ('AGLELITE','career',7999),
  ('AGLELITE','elite',14999)
ON CONFLICT (code, tier) DO UPDATE SET override_price_inr = EXCLUDED.override_price_inr;

CREATE FUNCTION public.apply_enrolment_coupon(p_intent_id uuid, p_code text)
 RETURNS TABLE(coupon_code text, discount_pct integer, coupon_expires_at timestamp with time zone, status text, final_price_inr integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_code text := upper(trim(coalesce(p_code,'')));
  v_coupon public.coupons%ROWTYPE;
  v_intent public.enrolment_intents%ROWTYPE;
  v_uses integer;
  v_expires timestamptz;
  v_override integer;
  v_pct integer;
BEGIN
  IF p_intent_id IS NULL THEN RAISE EXCEPTION 'intent_id required'; END IF;
  SELECT * INTO v_intent FROM public.enrolment_intents WHERE id = p_intent_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'intent not found'; END IF;

  IF v_intent.coupon_code = v_code AND v_intent.coupon_expires_at IS NOT NULL THEN
    RETURN QUERY SELECT v_intent.coupon_code, v_intent.discount_pct, v_intent.coupon_expires_at,
      CASE WHEN v_intent.coupon_expires_at > now() THEN 'coupon_applied' ELSE 'expired' END,
      v_intent.final_price_inr;
    RETURN;
  END IF;

  SELECT * INTO v_coupon FROM public.coupons WHERE code = v_code AND is_active = true;
  IF NOT FOUND THEN RAISE EXCEPTION 'invalid coupon'; END IF;

  SELECT override_price_inr INTO v_override
    FROM public.coupon_tier_prices
   WHERE code = v_code AND tier = v_intent.tier;
  IF v_override IS NULL THEN RAISE EXCEPTION 'coupon not valid for this tier'; END IF;
  IF v_override > v_intent.base_price_inr THEN v_override := v_intent.base_price_inr; END IF;

  SELECT count(*) INTO v_uses
    FROM public.enrolment_intents
   WHERE email = v_intent.email
     AND coupon_code = v_code
     AND status IN ('coupon_applied','paid');
  IF v_uses >= v_coupon.max_uses_per_email THEN
    RAISE EXCEPTION 'coupon already used for this email';
  END IF;

  v_expires := now() + make_interval(mins => v_coupon.window_minutes);
  v_pct := round((1.0 - (v_override::numeric / v_intent.base_price_inr::numeric)) * 100);

  UPDATE public.enrolment_intents
     SET coupon_code = v_code,
         coupon_applied_at = now(),
         coupon_expires_at = v_expires,
         discount_pct = v_pct,
         final_price_inr = v_override,
         status = 'coupon_applied'
   WHERE id = p_intent_id;

  RETURN QUERY SELECT v_code, v_pct, v_expires, 'coupon_applied'::text, v_override;
END; $function$;

CREATE FUNCTION public.get_enrolment_intent(p_intent_id uuid)
 RETURNS TABLE(id uuid, tier text, name text, email text, phone text, base_price_inr integer, coupon_code text, discount_pct integer, coupon_expires_at timestamp with time zone, status text, final_price_inr integer, razorpay_order_id text)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT id, tier, name, email, phone, base_price_inr, coupon_code, discount_pct, coupon_expires_at, status, final_price_inr, razorpay_order_id
    FROM public.enrolment_intents
   WHERE id = p_intent_id;
$function$;

CREATE OR REPLACE FUNCTION public.attach_razorpay_order(p_intent_id uuid, p_order_id text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF p_intent_id IS NULL OR p_order_id IS NULL OR length(p_order_id) = 0 OR length(p_order_id) > 64 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;
  UPDATE public.enrolment_intents SET razorpay_order_id = p_order_id WHERE id = p_intent_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'intent not found'; END IF;
END; $function$;

CREATE OR REPLACE FUNCTION public.mark_enrolment_paid_with_payment(p_intent_id uuid, p_payment_id text, p_order_id text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF p_intent_id IS NULL OR p_payment_id IS NULL OR length(p_payment_id) = 0 OR length(p_payment_id) > 64 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;
  UPDATE public.enrolment_intents
     SET status = 'paid',
         paid_at = COALESCE(paid_at, now()),
         razorpay_payment_id = p_payment_id,
         razorpay_order_id = COALESCE(razorpay_order_id, p_order_id)
   WHERE id = p_intent_id
     AND (status <> 'paid' OR razorpay_payment_id IS NULL);
END; $function$;
