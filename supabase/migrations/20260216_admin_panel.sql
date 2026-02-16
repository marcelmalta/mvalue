-- Supabase migration: Admin painel + ingestao de produtos

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  enabled boolean not null default true,
  config_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.import_rules (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  name text not null,
  query text not null,
  category text,
  tags text[] not null default '{}'::text[],
  enabled boolean not null default true,
  schedule_minutes integer not null default 60 check (schedule_minutes >= 1),
  last_run_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  external_id text not null,
  title text not null,
  price numeric(12,2) not null,
  currency text not null default 'BRL',
  image_url text,
  product_url text,
  category text,
  tags text[] not null default '{}'::text[],
  rating numeric(3,2),
  updated_at timestamptz not null default now(),
  raw_json jsonb not null default '{}'::jsonb,
  unique(provider, external_id)
);

create table if not exists public.product_overrides (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null unique references public.products(id) on delete cascade,
  custom_title text,
  custom_price numeric(12,2),
  custom_image_url text,
  custom_url text,
  pinned boolean not null default false,
  hidden boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.import_runs (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  rule_id uuid references public.import_rules(id) on delete set null,
  status text not null check (status in ('running', 'success', 'error', 'skipped')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  items_fetched integer not null default 0,
  items_upserted integer not null default 0,
  error text
);

create table if not exists public.admin_settings (
  key text primary key,
  value_json jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists import_rules_provider_idx on public.import_rules(provider_id);
create index if not exists import_rules_enabled_idx on public.import_rules(enabled);
create index if not exists products_provider_idx on public.products(provider);
create index if not exists products_category_idx on public.products(category);
create index if not exists products_tags_gin_idx on public.products using gin(tags);
create index if not exists product_overrides_hidden_idx on public.product_overrides(hidden);
create index if not exists product_overrides_pinned_idx on public.product_overrides(pinned);
create index if not exists import_runs_provider_idx on public.import_runs(provider_id, started_at desc);
create index if not exists import_runs_rule_idx on public.import_runs(rule_id, started_at desc);

create or replace function public.set_row_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
before update on public.products
for each row execute function public.set_row_updated_at();

drop trigger if exists trg_product_overrides_updated_at on public.product_overrides;
create trigger trg_product_overrides_updated_at
before update on public.product_overrides
for each row execute function public.set_row_updated_at();

drop trigger if exists trg_admin_settings_updated_at on public.admin_settings;
create trigger trg_admin_settings_updated_at
before update on public.admin_settings
for each row execute function public.set_row_updated_at();

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.handle_new_user_profile();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

alter table public.profiles enable row level security;
alter table public.providers enable row level security;
alter table public.import_rules enable row level security;
alter table public.products enable row level security;
alter table public.product_overrides enable row level security;
alter table public.import_runs enable row level security;
alter table public.admin_settings enable row level security;

-- profiles policies

drop policy if exists profiles_select_self on public.profiles;
create policy profiles_select_self
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists profiles_admin_all on public.profiles;
create policy profiles_admin_all
on public.profiles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- admin-only tables policies

drop policy if exists providers_admin_all on public.providers;
create policy providers_admin_all
on public.providers
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists import_rules_admin_all on public.import_rules;
create policy import_rules_admin_all
on public.import_rules
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists products_admin_all on public.products;
create policy products_admin_all
on public.products
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists product_overrides_admin_all on public.product_overrides;
create policy product_overrides_admin_all
on public.product_overrides
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists import_runs_admin_all on public.import_runs;
create policy import_runs_admin_all
on public.import_runs
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists admin_settings_admin_all on public.admin_settings;
create policy admin_settings_admin_all
on public.admin_settings
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create or replace view public.public_products as
select
  p.id,
  p.provider,
  p.external_id,
  coalesce(o.custom_title, p.title) as title,
  coalesce(o.custom_price, p.price) as price,
  p.currency,
  coalesce(o.custom_image_url, p.image_url) as image_url,
  coalesce(o.custom_url, p.product_url) as product_url,
  p.category,
  p.tags,
  p.rating,
  coalesce(o.pinned, false) as pinned,
  p.updated_at
from public.products p
left join public.product_overrides o
  on o.product_id = p.id
where coalesce(o.hidden, false) = false;

revoke all on public.providers from anon;
revoke all on public.import_rules from anon;
revoke all on public.products from anon;
revoke all on public.product_overrides from anon;
revoke all on public.import_runs from anon;
revoke all on public.admin_settings from anon;

grant select on public.public_products to anon, authenticated;

insert into public.providers (name, enabled, config_json)
values
  ('mercadolivre', true, '{}'::jsonb),
  ('amazon', false, '{}'::jsonb),
  ('shopee', false, '{}'::jsonb),
  ('magalu', false, '{}'::jsonb)
on conflict (name) do nothing;
