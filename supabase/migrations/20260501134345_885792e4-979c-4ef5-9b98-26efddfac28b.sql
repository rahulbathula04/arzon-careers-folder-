ALTER TABLE public.career_engine_leads
  ADD COLUMN IF NOT EXISTS cohort_id text;

CREATE OR REPLACE FUNCTION public.ce_set_cohort(p_lead_id uuid, p_cohort_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_cohort text := lower(trim(coalesce(p_cohort_id, '')));
BEGIN
  IF p_lead_id IS NULL THEN RAISE EXCEPTION 'lead_id required'; END IF;
  IF v_cohort NOT IN ('may-2026','aug-2026','nov-2026') THEN
    RAISE EXCEPTION 'invalid cohort_id';
  END IF;

  UPDATE public.career_engine_leads
     SET cohort_id = v_cohort
   WHERE id = p_lead_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'lead not found';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.ce_set_cohort(uuid, text) FROM public;
GRANT EXECUTE ON FUNCTION public.ce_set_cohort(uuid, text) TO anon, authenticated;