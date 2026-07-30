-- Internal helpers - only callable inside the database (RLS, triggers).
revoke execute on function public.has_role(uuid, app_role) from anon, authenticated, public;
revoke execute on function public.has_any_role(uuid, app_role[]) from anon, authenticated, public;

-- Trigger functions - never invoked via API.
revoke execute on function public.touch_thumbnail_override() from anon, authenticated, public;
revoke execute on function public.touch_applications_updated_at() from anon, authenticated, public;
revoke execute on function public.log_application_status_change() from anon, authenticated, public;
revoke execute on function public.bootstrap_super_admin() from anon, authenticated, public;

-- Server-only functions - invoked exclusively via service-role key from server functions.
revoke execute on function public.track_event(text, uuid, uuid, uuid, uuid, uuid, text, text, text, text, text, jsonb, text, text) from anon, authenticated, public;
revoke execute on function public.submit_application(text, text, text, text, text, boolean, uuid, text, text) from anon, authenticated, public;
revoke execute on function public.lookup_admin_invite(text) from anon, authenticated, public;

-- Admin invite acceptance - must be signed in.
revoke execute on function public.accept_admin_invite(text) from anon, public;
grant execute on function public.accept_admin_invite(text) to authenticated;

-- Quiz / career-engine RPCs are intentionally anonymous (public quiz).
-- Make the grant explicit so future role changes don't break them.
grant execute on function public.ce_start_session(text, text, text, text) to anon, authenticated;
grant execute on function public.ce_record_answer(uuid, text, text) to anon, authenticated;
grant execute on function public.ce_submit_lead(uuid, text, text, text, boolean, text, jsonb, integer, jsonb) to anon, authenticated;
grant execute on function public.ce_get_result(uuid) to anon, authenticated;