-- 1. referral_codes: revoke column access to referrer PII for public roles
REVOKE SELECT ON public.referral_codes FROM anon, authenticated;
GRANT SELECT (id, code, referee_discount_inr, active, created_at, uses) ON public.referral_codes TO anon, authenticated;
-- staff already select via has_role / service_role bypass

-- 2. referral_attributions: drop public read policy, replace with staff-only
DROP POLICY IF EXISTS "Anyone can read attributions" ON public.referral_attributions;
CREATE POLICY "Staff can read attributions"
  ON public.referral_attributions
  FOR SELECT
  TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin'::app_role, 'reviewer'::app_role, 'support'::app_role]));

-- 3. mark_enrolment_paid_with_payment: bind payment to its own intent's order
CREATE OR REPLACE FUNCTION public.mark_enrolment_paid_with_payment(p_intent_id uuid, p_payment_id text, p_order_id text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_rows integer;
BEGIN
  IF p_intent_id IS NULL OR p_payment_id IS NULL OR length(p_payment_id) = 0 OR length(p_payment_id) > 64 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;
  IF p_order_id IS NULL OR length(p_order_id) = 0 OR length(p_order_id) > 64 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;
  UPDATE public.enrolment_intents
     SET status = 'paid',
         paid_at = COALESCE(paid_at, now()),
         razorpay_payment_id = p_payment_id
   WHERE id = p_intent_id
     AND razorpay_order_id = p_order_id
     AND (status <> 'paid' OR razorpay_payment_id IS NULL);
  GET DIAGNOSTICS v_rows = ROW_COUNT;
  IF v_rows = 0 THEN
    RAISE EXCEPTION 'order/intent mismatch or already paid';
  END IF;
END; $function$;