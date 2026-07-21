-- Lock down referral_codes: remove public PII exposure
DROP POLICY IF EXISTS "referral_codes public read active" ON public.referral_codes;
REVOKE SELECT ON public.referral_codes FROM anon;

-- Staff can read full rows
CREATE POLICY "Staff can read referral_codes"
ON public.referral_codes
FOR SELECT
TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','reviewer','support']::app_role[]));

-- Safe public lookup: returns only checkout-relevant fields by exact code
CREATE OR REPLACE FUNCTION public.lookup_referral_code(p_code text)
RETURNS TABLE(code text, referee_discount_inr integer, active boolean)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT rc.code, rc.referee_discount_inr, rc.active
    FROM public.referral_codes rc
   WHERE rc.active = true
     AND p_code IS NOT NULL
     AND length(p_code) BETWEEN 3 AND 64
     AND upper(rc.code) = upper(trim(p_code))
   LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.lookup_referral_code(text) TO anon, authenticated;