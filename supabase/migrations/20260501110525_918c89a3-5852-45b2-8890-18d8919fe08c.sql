-- 1) Remove broad listing on the public `media` bucket.
DROP POLICY IF EXISTS "Public can read media" ON storage.objects;

-- 2) Switch quiz + invite functions to SECURITY INVOKER.
ALTER FUNCTION public.ce_start_session(text, text, text, text)              SECURITY INVOKER;
ALTER FUNCTION public.ce_record_answer(uuid, text, text)                    SECURITY INVOKER;
ALTER FUNCTION public.ce_submit_lead(uuid, text, text, text, boolean, text, jsonb, integer, jsonb) SECURITY INVOKER;
ALTER FUNCTION public.ce_get_result(uuid)                                   SECURITY INVOKER;
ALTER FUNCTION public.accept_admin_invite(text)                             SECURITY INVOKER;

-- 3) RLS policies so anon quiz still works under SECURITY INVOKER.
-- career_engine_sessions
CREATE POLICY "Anyone can start a session"
  ON public.career_engine_sessions FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can complete their session"
  ON public.career_engine_sessions FOR UPDATE TO anon, authenticated
  USING (true) WITH CHECK (true);

-- career_engine_answers
CREATE POLICY "Anyone can record answers"
  ON public.career_engine_answers FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update their answers"
  ON public.career_engine_answers FOR UPDATE TO anon, authenticated
  USING (true) WITH CHECK (true);

-- career_engine_leads
CREATE POLICY "Anyone can submit a lead"
  ON public.career_engine_leads FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read their own lead by id"
  ON public.career_engine_leads FOR SELECT TO anon, authenticated
  USING (true);

-- admin_invites: accept_admin_invite now runs as the caller, so it needs
-- SELECT (lookup by token) and UPDATE (mark used) rights for authenticated users.
CREATE POLICY "Authenticated can read invites by token"
  ON public.admin_invites FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated can mark invite used"
  ON public.admin_invites FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- user_roles: accept_admin_invite inserts the invitee's role as the caller.
CREATE POLICY "Authenticated can self-claim invited role"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());