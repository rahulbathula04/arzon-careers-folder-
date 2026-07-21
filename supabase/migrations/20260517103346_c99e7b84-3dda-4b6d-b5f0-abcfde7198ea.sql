
CREATE OR REPLACE FUNCTION public.mark_enrolment_paid_with_payment(
  p_intent_id uuid, p_payment_id text, p_order_id text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_existing record;
BEGIN
  IF p_intent_id IS NULL OR p_payment_id IS NULL OR length(p_payment_id) = 0 OR length(p_payment_id) > 64 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;
  IF p_order_id IS NULL OR length(p_order_id) = 0 OR length(p_order_id) > 64 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;

  SELECT id, status, razorpay_order_id, razorpay_payment_id
    INTO v_existing
    FROM public.enrolment_intents
   WHERE id = p_intent_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'intent not found';
  END IF;

  IF v_existing.razorpay_order_id IS DISTINCT FROM p_order_id THEN
    RAISE EXCEPTION 'order/intent mismatch';
  END IF;

  IF v_existing.status = 'paid' AND v_existing.razorpay_payment_id IS NOT NULL THEN
    RETURN;
  END IF;

  UPDATE public.enrolment_intents
     SET status = 'paid',
         paid_at = COALESCE(paid_at, now()),
         razorpay_payment_id = p_payment_id,
         failure_reason = NULL
   WHERE id = p_intent_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.mark_enrolment_failed(
  p_intent_id uuid,
  p_order_id text,
  p_payment_id text,
  p_reason text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_existing record;
BEGIN
  IF p_intent_id IS NULL THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;
  IF p_order_id IS NOT NULL AND length(p_order_id) > 64 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;
  IF p_payment_id IS NOT NULL AND length(p_payment_id) > 64 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;

  SELECT id, status, razorpay_order_id
    INTO v_existing
    FROM public.enrolment_intents
   WHERE id = p_intent_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'intent not found';
  END IF;

  IF v_existing.status = 'paid' THEN
    RETURN;
  END IF;

  IF p_order_id IS NOT NULL
     AND v_existing.razorpay_order_id IS NOT NULL
     AND v_existing.razorpay_order_id <> p_order_id THEN
    RAISE EXCEPTION 'order/intent mismatch';
  END IF;

  UPDATE public.enrolment_intents
     SET status = 'failed',
         failure_reason = nullif(left(coalesce(p_reason, ''), 240), ''),
         razorpay_payment_id = COALESCE(razorpay_payment_id, p_payment_id)
   WHERE id = p_intent_id;
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.mark_enrolment_failed(uuid, text, text, text) FROM PUBLIC, anon, authenticated;
