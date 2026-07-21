-- Restrict public SELECT on verification_audit; expose narrow RPC instead.
-- The prior policy allowed anonymous enumeration of candidate_ref + viewer_org_tag pairs.
DROP POLICY IF EXISTS "Public can read de-identified audit" ON public.verification_audit;

-- Staff (admin) may read the full audit trail directly.
CREATE POLICY "Staff can read verification audit"
  ON public.verification_audit
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Public callers may only look up audit rows for a specific candidate_ref
-- they already possess (the ref is printed on the candidate's own artifact),
-- through a SECURITY DEFINER RPC that enforces input shape and row cap.
CREATE OR REPLACE FUNCTION public.get_verification_audit(_candidate_ref text)
RETURNS TABLE (
  id uuid,
  candidate_ref text,
  event_type text,
  viewer_org_tag text,
  occurred_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ref text;
BEGIN
  v_ref := upper(btrim(coalesce(_candidate_ref, '')));
  IF v_ref !~ '^[A-Z0-9-]{3,64}$' THEN
    RETURN;
  END IF;
  RETURN QUERY
    SELECT va.id, va.candidate_ref, va.event_type, va.viewer_org_tag, va.occurred_at
    FROM public.verification_audit va
    WHERE va.candidate_ref = v_ref
    ORDER BY va.occurred_at DESC
    LIMIT 50;
END;
$$;

REVOKE ALL ON FUNCTION public.get_verification_audit(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_verification_audit(text) TO anon, authenticated;

-- Direct table SELECT is no longer needed by anon; keep INSERT for logging.
REVOKE SELECT ON public.verification_audit FROM anon;