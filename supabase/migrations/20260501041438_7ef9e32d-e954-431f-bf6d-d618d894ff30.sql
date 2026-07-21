-- Career Engine: sessions, answers, leads
create table public.career_engine_sessions (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  stream text,
  device text,
  utm_source text,
  user_agent text
);

create table public.career_engine_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.career_engine_sessions(id) on delete cascade,
  question_id text not null,
  answer text not null,
  asked_at timestamptz not null default now(),
  unique (session_id, question_id)
);

create index career_engine_answers_session_idx on public.career_engine_answers(session_id);

create table public.career_engine_leads (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null unique references public.career_engine_sessions(id) on delete cascade,
  name text not null,
  phone text not null,
  email text not null,
  whatsapp_optin boolean not null default true,
  archetype text,
  top_paths jsonb,
  fit_score integer,
  result_payload jsonb,
  created_at timestamptz not null default now()
);

alter table public.career_engine_sessions enable row level security;
alter table public.career_engine_answers  enable row level security;
alter table public.career_engine_leads    enable row level security;

-- Public funnel: anyone (anon) can insert. Nobody can read via PostgREST.
create policy "anon can start a session"
  on public.career_engine_sessions for insert to anon, authenticated
  with check (true);

create policy "anon can update own session by id"
  on public.career_engine_sessions for update to anon, authenticated
  using (true) with check (true);

create policy "anon can record answers"
  on public.career_engine_answers for insert to anon, authenticated
  with check (true);

create policy "anon can update answers"
  on public.career_engine_answers for update to anon, authenticated
  using (true) with check (true);

create policy "anon can submit a lead"
  on public.career_engine_leads for insert to anon, authenticated
  with check (true);

-- No SELECT policies on any table → reads only via service role.