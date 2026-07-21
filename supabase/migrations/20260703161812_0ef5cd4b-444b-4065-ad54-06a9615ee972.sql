
ALTER TABLE public.enrolment_intents
  ADD COLUMN IF NOT EXISTS pre_registration_initiated_at timestamptz,
  ADD COLUMN IF NOT EXISTS pre_registration_amount_inr integer,
  ADD COLUMN IF NOT EXISTS balance_due_inr integer,
  ADD COLUMN IF NOT EXISTS balance_due_at timestamptz,
  ADD COLUMN IF NOT EXISTS balance_paid_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_enrolment_intents_prereg_pending
  ON public.enrolment_intents (balance_due_at)
  WHERE pre_registration_initiated_at IS NOT NULL
    AND balance_paid_at IS NULL
    AND paid_at IS NULL;

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
AS $$
DECLARE
  v_due timestamptz := now() + interval '7 days';
BEGIN
  PERFORM public.ei_assert_owner(p_intent_id, p_intent_token);
  IF p_amount IS NULL OR p_amount <= 0 OR p_amount > 100000 THEN
    RAISE EXCEPTION 'invalid prereg amount';
  END IF;
  IF p_balance IS NULL OR p_balance < 0 OR p_balance > 10000000 THEN
    RAISE EXCEPTION 'invalid balance';
  END IF;

  UPDATE public.enrolment_intents
     SET pre_registration_initiated_at = COALESCE(pre_registration_initiated_at, now()),
         pre_registration_amount_inr   = p_amount,
         balance_due_inr               = p_balance,
         balance_due_at                = COALESCE(balance_due_at, v_due),
         updated_at                    = now()
   WHERE enrolment_intents.id = p_intent_id;

  RETURN QUERY
    SELECT ei.id,
           ei.pre_registration_initiated_at,
           ei.pre_registration_amount_inr,
           ei.balance_due_inr,
           ei.balance_due_at
      FROM public.enrolment_intents ei
     WHERE ei.id = p_intent_id;
END; $$;

REVOKE EXECUTE ON FUNCTION public.mark_prereg_initiated(uuid, text, integer, integer) FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.mark_prereg_initiated(uuid, text, integer, integer) TO service_role;
