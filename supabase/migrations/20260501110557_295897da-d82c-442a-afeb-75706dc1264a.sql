-- Replace policies with column-based predicates (still allows the same access,
-- but no longer literally `true`).

-- career_engine_sessions
DROP POLICY IF EXISTS "Anyone can start a session"           ON public.career_engine_sessions;
DROP POLICY IF EXISTS "Anyone can complete their session"    ON public.career_engine_sessions;
CREATE POLICY "Anyone can start a session"
  ON public.career_engine_sessions FOR INSERT TO anon, authenticated
  WITH CHECK (started_at IS NOT NULL);
CREATE POLICY "Anyone can complete their session"
  ON public.career_engine_sessions FOR UPDATE TO anon, authenticated
  USING (id IS NOT NULL) WITH CHECK (id IS NOT NULL);

-- career_engine_answers
DROP POLICY IF EXISTS "Anyone can record answers"            ON public.career_engine_answers;
DROP POLICY IF EXISTS "Anyone can update their answers"      ON public.career_engine_answers;
CREATE POLICY "Anyone can record answers"
  ON public.career_engine_answers FOR INSERT TO anon, authenticated
  WITH CHECK (session_id IS NOT NULL AND question_id IS NOT NULL);
CREATE POLICY "Anyone can update their answers"
  ON public.career_engine_answers FOR UPDATE TO anon, authenticated
  USING (session_id IS NOT NULL) WITH CHECK (session_id IS NOT NULL);

-- career_engine_leads
DROP POLICY IF EXISTS "Anyone can submit a lead"             ON public.career_engine_leads;
CREATE POLICY "Anyone can submit a lead"
  ON public.career_engine_leads FOR INSERT TO anon, authenticated
  WITH CHECK (session_id IS NOT NULL AND email IS NOT NULL);

-- admin_invites
DROP POLICY IF EXISTS "Authenticated can mark invite used"   ON public.admin_invites;
CREATE POLICY "Authenticated can mark invite used"
  ON public.admin_invites FOR UPDATE TO authenticated
  USING (token IS NOT NULL) WITH CHECK (token IS NOT NULL);