-- Drop the definer view (Supabase linter treats it as ERROR).
DROP VIEW IF EXISTS public.verified_placements_public;

-- Public reader for the /placements page. Returns only non-PII columns.
CREATE OR REPLACE FUNCTION public.list_verified_placements(_limit integer DEFAULT 200)
RETURNS TABLE (
  id                uuid,
  employer_name     text,
  employer_slug     text,
  employer_logo_url text,
  candidate_ref     text,
  role_title        text,
  city              text,
  month_start       date,
  salary_band_inr   text,
  evidence_source   public.placement_evidence,
  verified_at       timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  SELECT
    p.id,
    e.name        AS employer_name,
    e.slug        AS employer_slug,
    e.logo_url    AS employer_logo_url,
    p.candidate_ref,
    p.role_title,
    p.city,
    p.month_start,
    p.salary_band_inr,
    p.evidence_source,
    p.verified_at
  FROM public.placements p
  JOIN public.employers e ON e.id = p.employer_id
  WHERE p.published = true
    AND p.retracted_at IS NULL
  ORDER BY p.month_start DESC, p.verified_at DESC
  LIMIT GREATEST(1, LEAST(COALESCE(_limit, 200), 500));
$fn$;

-- The function is safe for anon: it only returns non-PII columns.
REVOKE ALL ON FUNCTION public.list_verified_placements(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_verified_placements(integer) TO anon, authenticated, service_role;
