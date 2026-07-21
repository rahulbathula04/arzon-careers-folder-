-- Remove three permissive RLS policies flagged by the Supabase linter.

-- 1. service_role bypasses RLS automatically; the ALL/true policies are redundant.
DROP POLICY IF EXISTS "Service role manages snapshots" ON public.ce_percentile_snapshots;
DROP POLICY IF EXISTS "Service role manages RLS incidents" ON public.rls_incidents;

-- 2. Replace the anonymous rls_incidents INSERT policy with a column-predicate
--    check so it is no longer WITH CHECK (true). Anonymous self-reporting is
--    still allowed, but writers must supply required fields and cannot forge
--    another user's id or an observed_at far in the future/past.
DROP POLICY IF EXISTS "Anyone can report an RLS incident" ON public.rls_incidents;

CREATE POLICY "Anyone can report an RLS incident"
  ON public.rls_incidents
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(function_name) BETWEEN 1 AND 200
    AND char_length(message) BETWEEN 1 AND 2000
    AND observed_at >= now() - interval '1 hour'
    AND observed_at <= now() + interval '5 minutes'
    AND (user_id IS NULL OR user_id = auth.uid())
  );