CREATE OR REPLACE FUNCTION public.mark_readiness_paid_by_lead(
  _lead_id uuid,
  _amount_inr integer DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF _lead_id IS NULL THEN
    RAISE EXCEPTION 'invalid lead_id';
  END IF;

  UPDATE public.readiness_journey
     SET paid_at = COALESCE(paid_at, now()),
         amount_inr = COALESCE(_amount_inr, amount_inr)
   WHERE lead_id = _lead_id;
END $$;

REVOKE ALL ON FUNCTION public.mark_readiness_paid_by_lead(uuid, integer) FROM public;
GRANT EXECUTE ON FUNCTION public.mark_readiness_paid_by_lead(uuid, integer) TO service_role;