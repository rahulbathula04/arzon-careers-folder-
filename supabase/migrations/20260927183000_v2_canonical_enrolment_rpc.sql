-- Arzon Careers V2: remove the obsolete 9-argument enrolment RPC overload.
-- The 10-argument version is canonical and keeps p_course_slug optional via a default.
-- This avoids ambiguous RPC resolution in preview environments and ensures the
-- service role grant targets the function actually called by the application.

drop function if exists public.create_enrolment_intent(
  text,text,text,text,text,text,uuid,text,text
);

revoke all on function public.create_enrolment_intent(
  text,text,text,text,text,text,uuid,text,text,text
) from public, anon, authenticated;

grant execute on function public.create_enrolment_intent(
  text,text,text,text,text,text,uuid,text,text,text
) to service_role;
