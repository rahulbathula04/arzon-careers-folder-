-- Drop overly permissive policies; switch to SECURITY DEFINER RPCs.
drop policy if exists "anon can start a session" on public.career_engine_sessions;
drop policy if exists "anon can update own session by id" on public.career_engine_sessions;
drop policy if exists "anon can record answers" on public.career_engine_answers;
drop policy if exists "anon can update answers" on public.career_engine_answers;
drop policy if exists "anon can submit a lead" on public.career_engine_leads;

-- Lock down direct table access. Only service_role can read; nobody can write directly.
revoke all on public.career_engine_sessions from anon, authenticated;
revoke all on public.career_engine_answers  from anon, authenticated;
revoke all on public.career_engine_leads    from anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- ce_start_session: returns a new session id
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.ce_start_session(
  p_stream text default null,
  p_device text default null,
  p_utm_source text default null,
  p_user_agent text default null
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  insert into public.career_engine_sessions (stream, device, utm_source, user_agent)
  values (
    nullif(left(coalesce(p_stream, ''), 32), ''),
    nullif(left(coalesce(p_device, ''), 32), ''),
    nullif(left(coalesce(p_utm_source, ''), 64), ''),
    nullif(left(coalesce(p_user_agent, ''), 256), '')
  )
  returning id into v_id;
  return v_id;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- ce_record_answer: upsert a single answer for a session
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.ce_record_answer(
  p_session_id uuid,
  p_question_id text,
  p_answer text
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_session_id is null then raise exception 'session_id required'; end if;
  if p_question_id is null or length(p_question_id) = 0 or length(p_question_id) > 64 then
    raise exception 'invalid question_id';
  end if;
  if p_answer is null or length(p_answer) > 512 then
    raise exception 'invalid answer';
  end if;

  insert into public.career_engine_answers (session_id, question_id, answer)
  values (p_session_id, p_question_id, p_answer)
  on conflict (session_id, question_id)
    do update set answer = excluded.answer, asked_at = now();

  -- Capture stream answer onto the session row for analytics.
  if p_question_id = 'stream' then
    update public.career_engine_sessions
       set stream = nullif(left(p_answer, 32), '')
     where id = p_session_id;
  end if;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- ce_submit_lead: validate + store lead, mark session complete, return lead id
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.ce_submit_lead(
  p_session_id uuid,
  p_name text,
  p_phone text,
  p_email text,
  p_whatsapp_optin boolean,
  p_archetype text,
  p_top_paths jsonb,
  p_fit_score integer,
  p_result_payload jsonb
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lead_id uuid;
  v_name text := trim(coalesce(p_name, ''));
  v_phone text := regexp_replace(coalesce(p_phone, ''), '\D', '', 'g');
  v_email text := lower(trim(coalesce(p_email, '')));
begin
  if p_session_id is null then raise exception 'session_id required'; end if;
  if length(v_name) < 2 or length(v_name) > 80 then raise exception 'invalid name'; end if;
  if length(v_phone) < 10 or length(v_phone) > 15 then raise exception 'invalid phone'; end if;
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_email) > 120 then
    raise exception 'invalid email';
  end if;

  insert into public.career_engine_leads (
    session_id, name, phone, email, whatsapp_optin,
    archetype, top_paths, fit_score, result_payload
  ) values (
    p_session_id, v_name, v_phone, v_email, coalesce(p_whatsapp_optin, true),
    nullif(left(coalesce(p_archetype, ''), 64), ''),
    p_top_paths,
    p_fit_score,
    p_result_payload
  )
  returning id into v_lead_id;

  update public.career_engine_sessions
     set completed_at = now()
   where id = p_session_id;

  return v_lead_id;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- ce_get_result: return the public, non-PII portion of a result by lead id
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.ce_get_result(p_lead_id uuid)
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
as $$
  select archetype, top_paths, fit_score, result_payload, created_at
    from public.career_engine_leads
   where id = p_lead_id;
$$;

-- Grants: only the four RPCs are exposed to the browser.
grant execute on function public.ce_start_session(text, text, text, text) to anon, authenticated;
grant execute on function public.ce_record_answer(uuid, text, text)        to anon, authenticated;
grant execute on function public.ce_submit_lead(uuid, text, text, text, boolean, text, jsonb, integer, jsonb) to anon, authenticated;
grant execute on function public.ce_get_result(uuid)                       to anon, authenticated;