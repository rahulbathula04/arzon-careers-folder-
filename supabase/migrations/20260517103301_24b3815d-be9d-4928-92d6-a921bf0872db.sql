
ALTER TABLE public.enrolment_intents
  ADD COLUMN IF NOT EXISTS failure_reason text;

DROP FUNCTION IF EXISTS public.get_enrolment_intent(uuid);

CREATE FUNCTION public.get_enrolment_intent(p_intent_id uuid)
RETURNS TABLE(
  id uuid, tier text, name text, email text, phone text,
  base_price_inr integer, coupon_code text, discount_pct integer,
  coupon_expires_at timestamp with time zone, status text,
  final_price_inr integer, razorpay_order_id text,
  razorpay_payment_id text, failure_reason text, paid_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT id, tier, name, email, phone, base_price_inr, coupon_code, discount_pct,
         coupon_expires_at, status, final_price_inr, razorpay_order_id,
         razorpay_payment_id, failure_reason, paid_at
    FROM public.enrolment_intents
   WHERE id = p_intent_id;
$function$;
