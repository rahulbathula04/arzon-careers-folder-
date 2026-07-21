
-- 1. has_any_role helper (SECURITY DEFINER, locked down)
CREATE OR REPLACE FUNCTION public.has_any_role(_user_id uuid, _roles app_role[])
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = ANY(_roles)
  );
$$;

REVOKE EXECUTE ON FUNCTION public.has_any_role(uuid, app_role[]) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_any_role(uuid, app_role[]) FROM anon;
GRANT  EXECUTE ON FUNCTION public.has_any_role(uuid, app_role[]) TO authenticated;

-- 2. RLS on Career Engine tables (RLS already enabled, just adding policies)
DROP POLICY IF EXISTS "Staff can view sessions" ON public.career_engine_sessions;
DROP POLICY IF EXISTS "Staff can view answers"  ON public.career_engine_answers;
DROP POLICY IF EXISTS "Staff can view leads"    ON public.career_engine_leads;

CREATE POLICY "Staff can view sessions"
  ON public.career_engine_sessions FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','reviewer','support']::app_role[]));

CREATE POLICY "Staff can view answers"
  ON public.career_engine_answers FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','reviewer','support']::app_role[]));

CREATE POLICY "Staff can view leads"
  ON public.career_engine_leads FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','reviewer','support']::app_role[]));

-- 3. Lock down SECURITY DEFINER function execute grants
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;
GRANT  EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.touch_thumbnail_override() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.touch_thumbnail_override() FROM anon;
REVOKE EXECUTE ON FUNCTION public.touch_thumbnail_override() FROM authenticated;

REVOKE EXECUTE ON FUNCTION public.ce_start_session(text, text, text, text) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.ce_start_session(text, text, text, text) TO anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.ce_record_answer(uuid, text, text) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.ce_record_answer(uuid, text, text) TO anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.ce_submit_lead(uuid, text, text, text, boolean, text, jsonb, integer, jsonb) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.ce_submit_lead(uuid, text, text, text, boolean, text, jsonb, integer, jsonb) TO anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.ce_get_result(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.ce_get_result(uuid) FROM anon;
GRANT  EXECUTE ON FUNCTION public.ce_get_result(uuid) TO authenticated;

-- 4. Storage: stop bucket listing.
-- The bucket is marked public, so direct image URLs (CDN endpoint) keep working.
-- We only remove the SELECT policy on storage.objects that enabled enumeration.
DROP POLICY IF EXISTS "Public can view course thumbnails" ON storage.objects;
