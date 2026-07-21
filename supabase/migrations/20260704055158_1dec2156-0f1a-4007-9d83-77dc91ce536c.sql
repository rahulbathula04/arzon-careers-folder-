CREATE OR REPLACE FUNCTION public.expire_enrolment_coupon(p_intent_id uuid, p_intent_token text)
 RETURNS TABLE(id uuid, tier text, name text, email text, phone text, base_price_inr integer, coupon_code text, discount_pct integer, coupon_expires_at timestamp with time zone, status text, final_price_inr integer, razorpay_order_id text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.ei_assert_owner(p_intent_id, p_intent_token);
  UPDATE public.enrolment_intents ei
     SET coupon_code = NULL, coupon_applied_at = NULL, coupon_expires_at = NULL,
         discount_pct = NULL, final_price_inr = NULL, status = 'started'
   WHERE ei.id = p_intent_id
     AND ei.status = 'coupon_applied'
     AND ei.coupon_expires_at IS NOT NULL AND ei.coupon_expires_at < now();

  RETURN QUERY
    SELECT ei.id, ei.tier, ei.name, ei.email, ei.phone, ei.base_price_inr,
           ei.coupon_code, ei.discount_pct, ei.coupon_expires_at, ei.status,
           ei.final_price_inr, ei.razorpay_order_id
      FROM public.enrolment_intents ei WHERE ei.id = p_intent_id;
END; $function$;