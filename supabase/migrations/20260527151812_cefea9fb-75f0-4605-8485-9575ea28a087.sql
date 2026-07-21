-- Restrict public exposure of referral_codes: only safe columns readable by anon/authenticated.
REVOKE SELECT ON public.referral_codes FROM anon, authenticated;
GRANT SELECT (code, referee_discount_inr, active) ON public.referral_codes TO anon, authenticated;
GRANT ALL ON public.referral_codes TO service_role;