CREATE OR REPLACE FUNCTION public.apply_enrolment_coupon(p_intent_id uuid, p_code text)
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
  v_first_applied_at timestamptz;
  v_anchored_expires timestamptz;
BEGIN
  IF p_intent_id IS NULL THEN RAISE EXCEPTION 'intent_id required'; END IF;
  SELECT * INTO v_intent FROM public.enrolment_intents WHERE id = p_intent_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'intent not found'; END IF;

  -- Idempotent re-apply on the same intent: return the existing window as-is.
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

  -- Hard server-side anchor for ARZONPRIME60: the 60-minute window starts
  -- the FIRST time this email ever applied the code (across any intent),
  -- so clearing localStorage, resetting the intent, or starting a new
  -- intent cannot grant a fresh window.
  IF v_code = 'ARZONPRIME60' THEN
    SELECT min(coupon_applied_at) INTO v_first_applied_at
      FROM public.enrolment_intents
     WHERE email = v_intent.email
       AND coupon_code = v_code
       AND coupon_applied_at IS NOT NULL;

    IF v_first_applied_at IS NOT NULL THEN
      v_anchored_expires := v_first_applied_at + make_interval(mins => v_coupon.window_minutes);
      IF v_anchored_expires <= now() THEN
        RAISE EXCEPTION 'coupon expired';
      END IF;
      -- Always use the earliest expiry — never extend.
      IF v_anchored_expires < v_expires THEN
        v_expires := v_anchored_expires;
      END IF;
    END IF;
  END IF;

  v_pct := round((1.0 - (v_override::numeric / v_intent.base_price_inr::numeric)) * 100);

  UPDATE public.enrolment_intents
     SET coupon_code = v_code,
         coupon_applied_at = COALESCE(v_first_applied_at, now()),
         coupon_expires_at = v_expires,
         discount_pct = v_pct,
         final_price_inr = v_override,
         status = 'coupon_applied'
   WHERE id = p_intent_id;

  RETURN QUERY SELECT v_code, v_pct, v_expires, 'coupon_applied'::text, v_override;
END; $function$;