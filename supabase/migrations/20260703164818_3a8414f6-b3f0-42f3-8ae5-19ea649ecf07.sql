
CREATE OR REPLACE FUNCTION public.mark_prereg_initiated(
  p_intent_id uuid,
  p_intent_token text,
  p_amount integer,
  p_balance integer
)
RETURNS TABLE(
  id uuid,
  pre_registration_initiated_at timestamptz,
  pre_registration_amount_inr integer,
  balance_due_inr integer,
  balance_due_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_due timestamptz := now() + interval '7 days';
  v_row public.enrolment_intents%ROWTYPE;
  v_active_total integer;
BEGIN
  PERFORM public.ei_assert_owner(p_intent_id, p_intent_token);

  IF p_amount IS NULL OR p_amount <= 0 OR p_amount > 100000 THEN
    RAISE EXCEPTION 'invalid prereg amount';
  END IF;
  IF p_balance IS NULL OR p_balance < 0 OR p_balance > 10000000 THEN
    RAISE EXCEPTION 'invalid balance';
  END IF;

  SELECT * INTO v_row FROM public.enrolment_intents WHERE id = p_intent_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'intent not found';
  END IF;

  -- Active total at lock time: final (coupon) price if present, else base.
  v_active_total := COALESCE(v_row.final_price_inr, v_row.base_price_inr);

  IF v_row.pre_registration_initiated_at IS NULL THEN
    -- FIRST LOCK: amount + balance must reconcile with the intent's
    -- active price. Rejects tampered / stale client payloads.
    IF (p_amount + p_balance) <> v_active_total THEN
      RAISE EXCEPTION
        'prereg amount (%) + balance (%) must equal active total (%)',
        p_amount, p_balance, v_active_total;
    END IF;

    UPDATE public.enrolment_intents
       SET pre_registration_initiated_at = now(),
           pre_registration_amount_inr   = p_amount,
           balance_due_inr               = p_balance,
           balance_due_at                = v_due,
           updated_at                    = now()
     WHERE enrolment_intents.id = p_intent_id;
  ELSE
    -- ALREADY LOCKED: idempotent. Do NOT overwrite amount / balance /
    -- due date. Only bump updated_at so callers see the round-trip.
    UPDATE public.enrolment_intents
       SET updated_at = now()
     WHERE enrolment_intents.id = p_intent_id;
  END IF;

  RETURN QUERY
    SELECT ei.id,
           ei.pre_registration_initiated_at,
           ei.pre_registration_amount_inr,
           ei.balance_due_inr,
           ei.balance_due_at
      FROM public.enrolment_intents ei
     WHERE ei.id = p_intent_id;
END;
$function$;
