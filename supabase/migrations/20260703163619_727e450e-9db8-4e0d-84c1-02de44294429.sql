DROP FUNCTION IF EXISTS public.get_enrolment_intent(uuid, text);
CREATE OR REPLACE FUNCTION public.get_enrolment_intent(p_intent_id uuid, p_intent_token text)
RETURNS TABLE(
  id uuid, tier text, name text, email text, phone text,
  base_price_inr integer, coupon_code text, discount_pct integer,
  coupon_expires_at timestamptz, status text, final_price_inr integer,
  razorpay_order_id text, razorpay_payment_id text, failure_reason text, paid_at timestamptz,
  pre_registration_initiated_at timestamptz,
  pre_registration_amount_inr integer,
  balance_due_inr integer,
  balance_due_at timestamptz,
  balance_paid_at timestamptz
)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  PERFORM public.ei_assert_owner(p_intent_id, p_intent_token);
  RETURN QUERY
    SELECT ei.id, ei.tier, ei.name, ei.email, ei.phone, ei.base_price_inr, ei.coupon_code,
           ei.discount_pct, ei.coupon_expires_at, ei.status, ei.final_price_inr,
           ei.razorpay_order_id, ei.razorpay_payment_id, ei.failure_reason, ei.paid_at,
           ei.pre_registration_initiated_at,
           ei.pre_registration_amount_inr,
           ei.balance_due_inr,
           ei.balance_due_at,
           ei.balance_paid_at
      FROM public.enrolment_intents ei WHERE ei.id = p_intent_id;
END; $$;
REVOKE EXECUTE ON FUNCTION public.get_enrolment_intent(uuid, text) FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.get_enrolment_intent(uuid, text) TO service_role;