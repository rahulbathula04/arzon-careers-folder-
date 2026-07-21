
CREATE OR REPLACE FUNCTION public.expire_enrolment_coupon(p_intent_id uuid)
RETURNS TABLE(id uuid, tier text, name text, email text, phone text, base_price_inr integer, coupon_code text, discount_pct integer, coupon_expires_at timestamp with time zone, status text, final_price_inr integer, razorpay_order_id text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.enrolment_intents
     SET coupon_code = NULL,
         coupon_applied_at = NULL,
         coupon_expires_at = NULL,
         discount_pct = NULL,
         final_price_inr = NULL,
         status = 'started'
   WHERE enrolment_intents.id = p_intent_id
     AND status = 'coupon_applied'
     AND coupon_expires_at IS NOT NULL
     AND coupon_expires_at < now();

  RETURN QUERY
    SELECT ei.id, ei.tier, ei.name, ei.email, ei.phone, ei.base_price_inr,
           ei.coupon_code, ei.discount_pct, ei.coupon_expires_at, ei.status,
           ei.final_price_inr, ei.razorpay_order_id
      FROM public.enrolment_intents ei
     WHERE ei.id = p_intent_id;
END;
$$;

CREATE EXTENSION IF NOT EXISTS pg_cron;

DO $$
BEGIN
  PERFORM cron.unschedule('sweep-expired-enrolment-coupons');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

SELECT cron.schedule(
  'sweep-expired-enrolment-coupons',
  '* * * * *',
  $$
  UPDATE public.enrolment_intents
     SET coupon_code = NULL,
         coupon_applied_at = NULL,
         coupon_expires_at = NULL,
         discount_pct = NULL,
         final_price_inr = NULL,
         status = 'started'
   WHERE status = 'coupon_applied'
     AND coupon_expires_at IS NOT NULL
     AND coupon_expires_at < now();
  $$
);
