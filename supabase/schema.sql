create extension if not exists "uuid-ossp";

create table if not exists public.fitnexis_states (
  user_id text primary key,
  payload jsonb not null,
  updated_at timestamptz default timezone('utc', now())
);

alter table public.fitnexis_states enable row level security;

create policy "Usuário acessa seu próprio estado"
  on public.fitnexis_states
  for all
  using (auth.uid()::text = user_id)
  with check (auth.uid()::text = user_id);
