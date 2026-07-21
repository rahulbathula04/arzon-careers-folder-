-- Remove unrestricted public SELECT on assessment_shares.
-- All reads now flow exclusively through the getShareCard server function
-- (slug-keyed lookup, service-role client). This prevents anonymous bulk
-- enumeration of share cards via PostgREST.
DROP POLICY IF EXISTS "Anyone can view share cards" ON public.assessment_shares;

REVOKE SELECT ON public.assessment_shares FROM anon;
REVOKE SELECT ON public.assessment_shares FROM authenticated;
GRANT  SELECT ON public.assessment_shares TO service_role;