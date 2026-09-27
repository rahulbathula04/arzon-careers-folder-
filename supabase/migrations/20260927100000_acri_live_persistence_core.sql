-- Live ACRI persistence schema. All browser access is blocked; server functions use service role.
create table if not exists public.acri_cohorts (
 id text primary key, name text not null, track text not null default 'pharmacovigilance',
 capacity integer not null default 100 check (capacity > 0), claimed_count integer not null default 0 check (claimed_count >= 0),
 status text not null default 'active' check (status in ('active','full','completed')),
 starts_at timestamptz, ends_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.acri_candidates (
 id uuid primary key default gen_random_uuid(), full_name text not null, email text not null, mobile text not null,
 highest_qualification text not null, college_university text not null, currently_working text not null default 'no',
 cohort_id text references public.acri_cohorts(id) on delete set null, invite_code text,
 status text not null default 'registered' check (status in ('registered','pending_review','invite_issued','in_assessment','completed')),
 utm_source text, utm_medium text, utm_campaign text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create unique index if not exists acri_candidates_email_uq on public.acri_candidates(lower(email));
create table if not exists public.acri_invitations (
 id uuid primary key default gen_random_uuid(), code text not null unique, candidate_id uuid not null references public.acri_candidates(id) on delete cascade,
 cohort_id text references public.acri_cohorts(id) on delete set null, track text not null default 'pharmacovigilance',
 status text not null default 'active' check (status in ('active','used','expired','revoked')), single_use boolean not null default true,
 issued_at timestamptz not null default now(), expires_at timestamptz not null default (now()+interval '7 days'), used_at timestamptz
);
create table if not exists public.acri_assessments (
 id text primary key, name text not null, track text not null, duration_minutes integer not null default 25,
 competency_count integer not null default 9, status text not null default 'published' check (status in ('draft','review','published','retired')),
 current_version text not null default 'v1.0', created_at timestamptz not null default now()
);
create table if not exists public.acri_assessment_versions (
 id uuid primary key default gen_random_uuid(), assessment_id text not null references public.acri_assessments(id) on delete cascade,
 version text not null, passing_score integer not null default 80, status text not null default 'published' check (status in ('draft','review','published','retired')),
 created_at timestamptz not null default now(), unique(assessment_id,version)
);
create table if not exists public.acri_sessions (
 id uuid primary key default gen_random_uuid(), session_token text not null unique, candidate_id uuid references public.acri_candidates(id) on delete cascade,
 invite_id uuid references public.acri_invitations(id) on delete set null, assessment_id text not null references public.acri_assessments(id),
 version text not null default 'v1.0', started_at timestamptz not null default now(), expires_at timestamptz not null,
 status text not null default 'in_progress' check (status in ('in_progress','submitted','expired','abandoned')),
 current_question_index integer not null default 0, autosaved_responses jsonb not null default '{}'::jsonb, completed_at timestamptz, created_at timestamptz not null default now()
);
create index if not exists acri_sessions_candidate_idx on public.acri_sessions(candidate_id);
create table if not exists public.acri_results (
 id text primary key, session_id uuid references public.acri_sessions(id) on delete set null, candidate_id uuid references public.acri_candidates(id) on delete set null,
 candidate_name text not null, candidate_email text, qualification text, college text, score integer not null check(score between 0 and 100),
 percentile integer not null default 50 check(percentile between 1 and 99), readiness_level text not null,
 passed_gates boolean not null default false, summary text, dimension_scores jsonb not null default '{}'::jsonb,
 completed_at timestamptz not null default now(), created_at timestamptz not null default now()
);
create table if not exists public.acri_competency_scores (
 id uuid primary key default gen_random_uuid(), result_id text not null references public.acri_results(id) on delete cascade,
 competency_id text not null, competency_name text not null, score integer not null check(score between 0 and 100),
 benchmark integer not null default 80, status text not null, created_at timestamptz not null default now()
);
create table if not exists public.acri_credentials (
 credential_id text primary key, result_id text not null references public.acri_results(id) on delete cascade,
 candidate_id uuid references public.acri_candidates(id) on delete set null, candidate_name text not null,
 track text not null default 'Pharmacovigilance Associate', score integer not null check(score between 0 and 100),
 readiness_level text not null, institution text, issued_at timestamptz not null default now(), is_verified boolean not null default true, verification_url text
);
create table if not exists public.acri_leaderboard_entries (
 id uuid primary key default gen_random_uuid(), candidate_id uuid references public.acri_candidates(id) on delete cascade,
 display_name text not null, score integer not null check(score between 0 and 100), college text not null, qualification text, rank integer,
 consent_public boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists public.acri_events (
 id uuid primary key default gen_random_uuid(), event_name text not null, candidate_id uuid, invite_code text, session_id uuid,
 payload jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);
insert into public.acri_cohorts(id,name,track,capacity,claimed_count,status)
values('ACRI-PV-2026-01','Launch Cohort · September 2026','pharmacovigilance',100,0,'active')
on conflict(id) do nothing;
insert into public.acri_assessments(id,name,track,duration_minutes,competency_count,status,current_version)
values('ACRI-PV','ACRI Pharmacovigilance Certification','pharmacovigilance',25,9,'published','v1.0')
on conflict(id) do nothing;
insert into public.acri_assessment_versions(assessment_id,version,passing_score,status)
values('ACRI-PV','v1.0',80,'published')
on conflict(assessment_id,version) do nothing;
alter table public.acri_cohorts enable row level security;
alter table public.acri_candidates enable row level security;
alter table public.acri_invitations enable row level security;
alter table public.acri_assessments enable row level security;
alter table public.acri_assessment_versions enable row level security;
alter table public.acri_sessions enable row level security;
alter table public.acri_results enable row level security;
alter table public.acri_competency_scores enable row level security;
alter table public.acri_credentials enable row level security;
alter table public.acri_leaderboard_entries enable row level security;
alter table public.acri_events enable row level security;
revoke all on public.acri_cohorts,public.acri_candidates,public.acri_invitations,public.acri_assessments,public.acri_assessment_versions,public.acri_sessions,public.acri_results,public.acri_competency_scores,public.acri_credentials,public.acri_leaderboard_entries,public.acri_events from anon,authenticated;