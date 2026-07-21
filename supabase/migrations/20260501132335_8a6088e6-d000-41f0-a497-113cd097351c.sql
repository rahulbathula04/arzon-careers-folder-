-- ─────────────────────────────────────────────────────────────
-- 1. Storage: replace broad SELECT policies with non-listable ones
-- ─────────────────────────────────────────────────────────────

-- Certificates bucket: keep direct URL access, block bucket listing.
DROP POLICY IF EXISTS "Public can read certificate files" ON storage.objects;
CREATE POLICY "Public can read certificate files (no list)"
  ON storage.objects
  FOR SELECT
  TO public
  USING (
    bucket_id = 'certificates'
    AND name IS NOT NULL
    AND length(name) > 0
    AND position('/' in name) > 0
  );

-- Course thumbnails: explicit non-listable public read policy
-- (bucket is public; this stops anonymous LIST while allowing GET by URL).
DROP POLICY IF EXISTS "Public can read course thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Public can read course thumbnails (no list)" ON storage.objects;
CREATE POLICY "Public can read course thumbnails (no list)"
  ON storage.objects
  FOR SELECT
  TO public
  USING (
    bucket_id = 'course-thumbnails'
    AND name IS NOT NULL
    AND length(name) > 0
  );

-- Media bucket: same pattern.
DROP POLICY IF EXISTS "Public can read media" ON storage.objects;
DROP POLICY IF EXISTS "Public can read media (no list)" ON storage.objects;
CREATE POLICY "Public can read media (no list)"
  ON storage.objects
  FOR SELECT
  TO public
  USING (
    bucket_id = 'media'
    AND name IS NOT NULL
    AND length(name) > 0
  );

-- ─────────────────────────────────────────────────────────────
-- 2. Revoke EXECUTE on internal SECURITY DEFINER helpers
--    (these are only meant to be called by triggers / RLS, not the JS client)
-- ─────────────────────────────────────────────────────────────

REVOKE EXECUTE ON FUNCTION public.bootstrap_super_admin()                 FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_application_status_change()         FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_applications_updated_at()         FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_certificates_updated_at()         FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_thumbnail_override()              FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role)         FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_any_role(uuid, public.app_role[])   FROM anon, authenticated;