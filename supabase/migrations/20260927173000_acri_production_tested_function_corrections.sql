-- Phase 2 final corrections: pin production-tested ACRI registration and session functions.
begin;

create or replace function public.acri_register_candidate(
  p_full_name text,p_email text,p_mobile text,p_highest_qualification text,
  p_college_university text,p_currently_working text,
  p_utm_source text default null,p_utm_medium text default null,p_utm_campaign text default null
)
returns table(
  candidate_id uuid,acri_candidate_id uuid,cohort_id text,cohort_name text,
  cohort_capacity integer,cohort_claimed_count integer,cohort_starts_at timestamptz,
  cohort_ends_at timestamptz,status text,existing_candidate boolean
)
language plpgsql security definer set search_path=public
as $$
declare
  v_email text:=lower(trim(coalesce(p_email,'')));
  v_name text:=trim(coalesce(p_full_name,''));
  v_mobile text:=regexp_replace(coalesce(p_mobile,''),'\D','','g');
  v_candidate_id uuid; v_acri_id uuid; v_existing boolean:=false;
  v_cohort public.acri_cohorts%rowtype;
begin
  if length(v_name)<2 or length(v_name)>120 then raise exception 'invalid name'; end if;
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_email)>120 then raise exception 'invalid email'; end if;
  if length(v_mobile)<10 or length(v_mobile)>15 then raise exception 'invalid mobile'; end if;
  if p_currently_working not in ('yes','no') then raise exception 'invalid employment status'; end if;

  select ac.* into v_cohort from public.acri_cohorts ac
   where ac.track='pharmacovigilance' and ac.status='active'
   order by ac.starts_at nulls first limit 1 for share;
  if not found then raise exception 'No active ACRI cohort is currently available.'; end if;

  select c.id into v_candidate_id from public.candidates c
   where c.deleted_at is null and lower(trim(c.email))=v_email
   order by c.created_at limit 1 for update;

  if v_candidate_id is null then
    begin
      insert into public.candidates(email,phone,full_name,whatsapp_optin,first_seen_at,last_seen_at)
      values(v_email,v_mobile,v_name,true,now(),now()) returning id into v_candidate_id;
    exception when unique_violation then
      select c.id into v_candidate_id from public.candidates c
       where c.deleted_at is null and lower(trim(c.email))=v_email
       order by c.created_at limit 1 for update;
    end;
  else
    v_existing:=true;
    update public.candidates c set phone=coalesce(nullif(v_mobile,''),c.phone),
      full_name=coalesce(nullif(v_name,''),c.full_name),last_seen_at=now(),updated_at=now()
     where c.id=v_candidate_id;
  end if;

  select ac.id into v_acri_id from public.acri_candidates ac
   where ac.candidate_id=v_candidate_id limit 1 for update;

  if v_acri_id is null then
    if v_cohort.claimed_count>=v_cohort.capacity then raise exception 'The active ACRI cohort is currently full.'; end if;
    insert into public.acri_candidates(
      candidate_id,full_name,email,mobile,highest_qualification,college_university,
      currently_working,cohort_id,status,utm_source,utm_medium,utm_campaign
    ) values (
      v_candidate_id,v_name,v_email,v_mobile,p_highest_qualification,p_college_university,
      p_currently_working,v_cohort.id,'REGISTERED',
      nullif(left(coalesce(p_utm_source,''),80),''),
      nullif(left(coalesce(p_utm_medium,''),80),''),
      nullif(left(coalesce(p_utm_campaign,''),80),'')
    ) returning id into v_acri_id;
    update public.acri_candidates ac set status='PENDING_REVIEW',updated_at=now() where ac.id=v_acri_id;
    insert into public.acri_events(event_name,candidate_id,payload)
    values('candidate_application_logged',v_acri_id,jsonb_build_object(
      'canonical_candidate_id',v_candidate_id,'status','PENDING_REVIEW',
      'qualification',p_highest_qualification,'college',p_college_university
    ));
  end if;

  select ac.* into v_cohort from public.acri_cohorts ac
   where ac.id=(select ac2.cohort_id from public.acri_candidates ac2 where ac2.id=v_acri_id);

  return query
  select v_candidate_id,v_acri_id,v_cohort.id,v_cohort.name,v_cohort.capacity,
    v_cohort.claimed_count,v_cohort.starts_at,v_cohort.ends_at,
    (select ac3.status from public.acri_candidates ac3 where ac3.id=v_acri_id),v_existing;
end;
$$;

create or replace function public.acri_start_session(p_invite_code text)
returns table(
  session_id uuid,session_token text,expires_at timestamptz,
  acri_candidate_id uuid,candidate_id uuid,full_name text,email text,
  qualification text,college text,assessment_id text,version text
)
language plpgsql security definer set search_path=public
as $$
declare
  v_inv public.acri_invitations%rowtype;
  v_candidate public.acri_candidates%rowtype;
  v_assessment public.acri_assessments%rowtype;
  v_version public.acri_assessment_versions%rowtype;
  v_existing public.acri_sessions%rowtype;
  v_session_id uuid; v_token text; v_expiry timestamptz;
begin
  select i.* into v_inv from public.acri_invitations i
   where i.code=upper(trim(p_invite_code)) for update;
  if not found or v_inv.status<>'active' then raise exception 'Invitation code is invalid, expired, or already used.'; end if;

  if v_inv.expires_at<=now() then
    update public.acri_invitations i set status='expired' where i.id=v_inv.id and i.status='active';
    raise exception 'Invitation code is invalid, expired, or already used.';
  end if;

  select ac.* into v_candidate from public.acri_candidates ac where ac.id=v_inv.candidate_id for update;
  if not found then raise exception 'Candidate record could not be loaded.'; end if;

  if v_candidate.status='STARTED' then
    select s.* into v_existing from public.acri_sessions s
     where s.invite_id=v_inv.id and s.candidate_id=v_candidate.id
       and s.status='in_progress' and s.expires_at>now()
     order by s.started_at desc limit 1 for update;
    if found then
      return query select v_existing.id,v_existing.session_token,v_existing.expires_at,
        v_candidate.id,v_candidate.candidate_id,v_candidate.full_name,v_candidate.email,
        v_candidate.highest_qualification,v_candidate.college_university,
        v_existing.assessment_id,v_existing.version;
      return;
    end if;
  elsif v_candidate.status<>'INVITED' then
    raise exception 'ACRI candidate is not authorized to start an assessment.';
  end if;

  select a.* into v_assessment from public.acri_assessments a
   where a.id='ACRI-PV' and a.status='published' limit 1;
  if not found then raise exception 'ACRI assessment is unavailable.'; end if;

  select av.* into v_version from public.acri_assessment_versions av
   where av.assessment_id=v_assessment.id and av.version=v_assessment.current_version
     and av.status='published' limit 1;
  if not found then raise exception 'ACRI assessment version is unavailable.'; end if;

  v_session_id:=gen_random_uuid();
  v_token:=md5(gen_random_uuid()::text)||md5(clock_timestamp()::text);
  v_expiry:=least(v_inv.expires_at,now()+make_interval(mins=>v_assessment.duration_minutes));

  insert into public.acri_sessions(
    id,session_token,candidate_id,invite_id,assessment_id,version,expires_at,status
  ) values(v_session_id,v_token,v_candidate.id,v_inv.id,v_assessment.id,v_version.version,v_expiry,'in_progress');

  update public.acri_candidates ac set status='STARTED',updated_at=now() where ac.id=v_candidate.id;

  insert into public.acri_events(event_name,candidate_id,invite_code,session_id,payload)
  values('assessment_started',v_candidate.id,v_inv.code,v_session_id,jsonb_build_object(
    'canonical_candidate_id',v_candidate.candidate_id,
    'assessment_id',v_assessment.id,'version',v_version.version
  ));

  return query select v_session_id,v_token,v_expiry,v_candidate.id,v_candidate.candidate_id,
    v_candidate.full_name,v_candidate.email,v_candidate.highest_qualification,
    v_candidate.college_university,v_assessment.id,v_version.version;
end;
$$;

revoke all on function public.acri_register_candidate(text,text,text,text,text,text,text,text,text) from public,anon,authenticated;
revoke all on function public.acri_start_session(text) from public,anon,authenticated;
grant execute on function public.acri_register_candidate(text,text,text,text,text,text,text,text,text) to service_role;
grant execute on function public.acri_start_session(text) to service_role;

commit;
