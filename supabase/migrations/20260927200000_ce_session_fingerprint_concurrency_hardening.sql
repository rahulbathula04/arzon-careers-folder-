-- Production hardening: isolate Career Engine session resume state per browser fingerprint.
-- Prevents concurrent visitors sharing a session during high-traffic bursts.

begin;

alter table public.career_engine_sessions
  add column if not exists client_fp text;

create index if not exists idx_ce_sessions_client_fp
  on public.career_engine_sessions(client_fp)
  where client_fp is not null and completed_at is null;

create unique index if not exists ce_sessions_active_client_fp_uq
  on public.career_engine_sessions(client_fp)
  where client_fp is not null and completed_at is null;

create or replace function public.ce_start_session(
  p_stream text default null,
  p_device text default null,
  p_utm_source text default null,
  p_user_agent text default null,
  p_honeypot text default null,
  p_client_fp text default null
)
returns table(session_id uuid, session_token text)
language plpgsql
security definer
set search_path=public
as $function$
declare
  v_id uuid;
  v_token text;
  v_fp text := nullif(left(coalesce(p_client_fp,''),64),'');
begin
  if p_honeypot is not null and length(trim(p_honeypot)) > 0 then
    perform public.ce_log_server_event('ce_server_session_rejected',null,null,
      jsonb_build_object('reason','honeypot'));
    raise exception 'request rejected: hidden field filled by browser autofill';
  end if;

  if v_fp is not null then
    select s.id,s.session_token into v_id,v_token
      from public.career_engine_sessions s
     where s.completed_at is null
       and s.started_at > now() - interval '5 minutes'
       and s.client_fp = v_fp
     order by s.started_at desc
     limit 1;
    if v_id is not null then
      perform public.ce_log_server_event('ce_server_session_resumed',v_id,null,
        jsonb_build_object('fp_present',true,'utm_source',p_utm_source,'device',p_device));
      return query select v_id,v_token;
      return;
    end if;
  end if;

  if v_fp is not null and public.ce_rate_hit('ce_start:'||v_fp,20,3600) then
    perform public.ce_log_server_event('ce_server_session_rate_limited',null,null,
      jsonb_build_object('fp_present',true));
    raise exception 'rate limit exceeded - please wait a few minutes before starting a new test';
  end if;

  begin
    insert into public.career_engine_sessions(stream,device,utm_source,user_agent,client_fp)
    values(
      nullif(left(coalesce(p_stream,''),32),''),
      nullif(left(coalesce(p_device,''),32),''),
      nullif(left(coalesce(p_utm_source,''),64),''),
      nullif(left(coalesce(p_user_agent,''),256),''),
      v_fp
    )
    returning id,career_engine_sessions.session_token into v_id,v_token;
  exception when unique_violation then
    if v_fp is not null then
      select s.id,s.session_token into v_id,v_token
        from public.career_engine_sessions s
       where s.completed_at is null and s.client_fp=v_fp
       order by s.started_at desc limit 1;
      if v_id is not null then
        return query select v_id,v_token;
        return;
      end if;
    end if;
    raise;
  end;

  perform public.ce_log_server_event('ce_server_session_started',v_id,null,
    jsonb_build_object('stream',p_stream,'device',p_device,'utm_source',p_utm_source,'fp_present',v_fp is not null));

  return query select v_id,v_token;
end;
$function$;

revoke all on function public.ce_start_session(text,text,text,text,text,text) from public,authenticated;
grant execute on function public.ce_start_session(text,text,text,text,text,text) to anon,authenticated;

commit;
