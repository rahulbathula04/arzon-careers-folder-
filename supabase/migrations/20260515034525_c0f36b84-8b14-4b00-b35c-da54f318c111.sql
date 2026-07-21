-- Replace permissive INSERT policy on referral_attributions with a scoped
-- predicate: the referral_code must reference an active referral_codes row.
DROP POLICY IF EXISTS "Anyone can record an attribution" ON public.referral_attributions;

CREATE POLICY "Anyone can record an attribution for an active code"
ON public.referral_attributions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.referral_codes rc
    WHERE rc.code = referral_attributions.referral_code
      AND rc.active = true
  )
);