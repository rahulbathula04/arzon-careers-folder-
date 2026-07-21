-- 1) Add per-intent token for IDOR protection
ALTER TABLE public.enrolment_intents
  ADD COLUMN IF NOT EXISTS intent_token text;

UPDATE public.enrolment_intents
   SET intent_token = encode(extensions.gen_random_bytes(24), 'base64')
 WHERE intent_token IS NULL;

ALTER TABLE public.enrolment_intents
  ALTER COLUMN intent_token SET DEFAULT encode(extensions.gen_random_bytes(24), 'base64'),
  ALTER COLUMN intent_token SET NOT NULL;

-- 2) Token-owner guard
CREATE OR REPLACE FUNCTION public.ei_assert_owner(p_intent_id uuid, p_intent_token text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF p_intent_id IS NULL OR p_intent_token IS NULL OR length(p_intent_token) < 16 THEN
    RAISE EXCEPTION 'intent auth required';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.enrolment_intents
     WHERE id = p_intent_id AND intent_token = p_intent_token
  ) THEN
    RAISE EXCEPTION 'intent auth failed';
  END IF;
END; $$;

-- 3) create_enrolment_intent now returns id + intent_token
DROP FUNCTION IF EXISTS public.create_enrolment_intent(text, text, text, text, text, text, integer, uuid, text, text);
CREATE OR REPLACE FUNCTION public.create_enrolment_intent(
  p_tier text, p_name text, p_email text, p_phone text, p_city text,
  p_background text, p_base_price_inr integer, p_lead_id uuid DEFAULT NULL,
  p_utm_source text DEFAULT NULL, p_user_agent text DEFAULT NULL
)
RETURNS TABLE(id uuid, intent_token text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_id uuid;
  v_token text;
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
  ) RETURNING enrolment_intents.id, enrolment_intents.intent_token INTO v_id, v_token;

  RETURN QUERY SELECT v_id, v_token;
END; $$;

-- 4) get_enrolment_intent: require token
DROP FUNCTION IF EXISTS public.get_enrolment_intent(uuid);
CREATE OR REPLACE FUNCTION public.get_enrolment_intent(p_intent_id uuid, p_intent_token text)
RETURNS TABLE(id uuid, tier text, name text, email text, phone text,
  base_price_inr integer, coupon_code text, discount_pct integer,
  coupon_expires_at timestamptz, status text, final_price_inr integer,
  razorpay_order_id text, razorpay_payment_id text, failure_reason text, paid_at timestamptz)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  PERFORM public.ei_assert_owner(p_intent_id, p_intent_token);
  RETURN QUERY
    SELECT ei.id, ei.tier, ei.name, ei.email, ei.phone, ei.base_price_inr, ei.coupon_code,
           ei.discount_pct, ei.coupon_expires_at, ei.status, ei.final_price_inr,
           ei.razorpay_order_id, ei.razorpay_payment_id, ei.failure_reason, ei.paid_at
      FROM public.enrolment_intents ei WHERE ei.id = p_intent_id;
END; $$;

-- 5) apply_enrolment_coupon: require token
DROP FUNCTION IF EXISTS public.apply_enrolment_coupon(uuid, text);
CREATE OR REPLACE FUNCTION public.apply_enrolment_coupon(p_intent_id uuid, p_code text, p_intent_token text)
RETURNS TABLE(coupon_code text, discount_pct integer, coupon_expires_at timestamptz, status text, final_price_inr integer)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  v_code text := upper(trim(coalesce(p_code,'')));
  v_coupon public.coupons%ROWTYPE;
  v_intent public.enrolment_intents%ROWTYPE;
  v_uses integer;
  v_expires timestamptz;
  v_override integer;
  v_pct integer;
  v_first_applied_at timestamptz;
  v_anchored_expires timestamptz;
BEGIN
  PERFORM public.ei_assert_owner(p_intent_id, p_intent_token);
  SELECT * INTO v_intent FROM public.enrolment_intents ei WHERE ei.id = p_intent_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'intent not found'; END IF;

  IF v_intent.coupon_code = v_code AND v_intent.coupon_expires_at IS NOT NULL THEN
    RETURN QUERY SELECT v_intent.coupon_code, v_intent.discount_pct, v_intent.coupon_expires_at,
      CASE WHEN v_intent.coupon_expires_at > now() THEN 'coupon_applied' ELSE 'expired' END,
      v_intent.final_price_inr;
    RETURN;
  END IF;

  SELECT * INTO v_coupon FROM public.coupons c WHERE c.code = v_code AND c.is_active = true;
  IF NOT FOUND THEN RAISE EXCEPTION 'invalid coupon'; END IF;

  SELECT ctp.override_price_inr INTO v_override
    FROM public.coupon_tier_prices ctp WHERE ctp.code = v_code AND ctp.tier = v_intent.tier;
  IF v_override IS NULL THEN RAISE EXCEPTION 'coupon not valid for this tier'; END IF;
  IF v_override > v_intent.base_price_inr THEN v_override := v_intent.base_price_inr; END IF;

  SELECT count(*) INTO v_uses FROM public.enrolment_intents ei
   WHERE ei.email = v_intent.email AND ei.coupon_code = v_code AND ei.status IN ('coupon_applied','paid');
  IF v_uses >= v_coupon.max_uses_per_email THEN RAISE EXCEPTION 'coupon already used for this email'; END IF;

  v_expires := now() + make_interval(mins => v_coupon.window_minutes);

  IF v_code = 'ARZONPRIME60' THEN
    SELECT min(ei.coupon_applied_at) INTO v_first_applied_at
      FROM public.enrolment_intents ei
     WHERE ei.email = v_intent.email AND ei.coupon_code = v_code AND ei.coupon_applied_at IS NOT NULL;
    IF v_first_applied_at IS NOT NULL THEN
      v_anchored_expires := v_first_applied_at + make_interval(mins => v_coupon.window_minutes);
      IF v_anchored_expires <= now() THEN RAISE EXCEPTION 'coupon expired'; END IF;
      IF v_anchored_expires < v_expires THEN v_expires := v_anchored_expires; END IF;
    END IF;
  END IF;

  v_pct := round((1.0 - (v_override::numeric / v_intent.base_price_inr::numeric)) * 100);

  UPDATE public.enrolment_intents ei
     SET coupon_code = v_code, coupon_applied_at = COALESCE(v_first_applied_at, now()),
         coupon_expires_at = v_expires, discount_pct = v_pct,
         final_price_inr = v_override, status = 'coupon_applied'
   WHERE ei.id = p_intent_id;

  RETURN QUERY SELECT v_code, v_pct, v_expires, 'coupon_applied'::text, v_override;
END; $$;

-- 6) expire_enrolment_coupon: require token
DROP FUNCTION IF EXISTS public.expire_enrolment_coupon(uuid);
CREATE OR REPLACE FUNCTION public.expire_enrolment_coupon(p_intent_id uuid, p_intent_token text)
RETURNS TABLE(id uuid, tier text, name text, email text, phone text,
  base_price_inr integer, coupon_code text, discount_pct integer,
  coupon_expires_at timestamptz, status text, final_price_inr integer, razorpay_order_id text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  PERFORM public.ei_assert_owner(p_intent_id, p_intent_token);
  UPDATE public.enrolment_intents
     SET coupon_code = NULL, coupon_applied_at = NULL, coupon_expires_at = NULL,
         discount_pct = NULL, final_price_inr = NULL, status = 'started'
   WHERE enrolment_intents.id = p_intent_id
     AND status = 'coupon_applied'
     AND coupon_expires_at IS NOT NULL AND coupon_expires_at < now();

  RETURN QUERY
    SELECT ei.id, ei.tier, ei.name, ei.email, ei.phone, ei.base_price_inr,
           ei.coupon_code, ei.discount_pct, ei.coupon_expires_at, ei.status,
           ei.final_price_inr, ei.razorpay_order_id
      FROM public.enrolment_intents ei WHERE ei.id = p_intent_id;
END; $$;

-- 7) Hide career_engine_sessions.session_token from staff via column grants
REVOKE SELECT ON public.career_engine_sessions FROM authenticated;
GRANT SELECT (
  id, started_at, completed_at, stream, device, utm_source, user_agent
) ON public.career_engine_sessions TO authenticated;