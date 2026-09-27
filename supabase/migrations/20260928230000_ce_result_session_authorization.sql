begin;

-- Candidate result reports are session-owned. A lead UUID is an identifier,
-- not an authorization credential.
revoke execute on function public.ce_get_result(uuid) from public, anon, authenticated;

create or replace function public.ce_get_result(
  p_lead_id uuid,
  p_session_token text
)
returns table (
  archetype text,
  top_paths jsonb,
  fit_score integer,
  result_payload jsonb,
  created_at timestamptz
)
language sql
security definer
set search_path = public
as $function$
  select l.archetype,
         l.top_paths,
         l.fit_score,
         l.result_payload,
         l.created_at
    from public.career_engine_leads l
    join public.career_engine_sessions s
      on s.id = l.session_id
   where l.id = p_lead_id
     and p_session_token is not null
     and length(p_session_token) >= 16
     and s.session_token = p_session_token;
$function$;

revoke execute on function public.ce_get_result(uuid, text) from public;
grant execute on function public.ce_get_result(uuid, text) to anon, authenticated;

commit;
