-- Run this script in Supabase SQL Editor. It is safe to run again.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, coalesce(new.email, ''))
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists create_profile_after_signup on auth.users;
create trigger create_profile_after_signup
after insert on auth.users
for each row execute function public.create_profile_for_new_user();

insert into public.profiles (id, email)
select id, coalesce(email, '') from auth.users
on conflict (id) do update set email = excluded.email;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

create table if not exists public.service_orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  trade text not null,
  services jsonb not null default '[]'::jsonb,
  governorate text not null,
  area text not null,
  address text not null,
  details text not null default '',
  payment_method text check (payment_method in ('instapay', 'vodafone_cash')),
  status text not null default 'قيد المراجعة',
  payment_status text not null default 'غير مدفوع',
  total_amount numeric(12, 2) check (total_amount is null or total_amount >= 0),
  admin_commission numeric(12, 2) generated always as (
    case when payment_status = 'مدفوع' and total_amount is not null
      then round(total_amount * 0.20, 2)
      else 0
    end
  ) stored,
  created_at timestamptz not null default now()
);

create table if not exists public.professionals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  trade text not null,
  experience text not null,
  governorate text not null,
  area text not null,
  address text not null,
  id_image_path text not null,
  status text not null default 'قيد المراجعة',
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace view public.available_professionals
with (security_invoker = true)
as
select id, name, phone, trade, governorate, area
from public.professionals
where status = 'مقبول';

grant select on public.available_professionals to anon, authenticated;
grant select on public.profiles to authenticated;
grant select, insert, update, delete on public.service_orders to authenticated;
grant insert on public.service_orders to anon;
grant select, insert, update, delete on public.professionals to authenticated;
grant insert on public.professionals to anon;
grant select (id, name, phone, trade, governorate, area, status) on table public.professionals to anon;
grant select, insert, update, delete on public.site_settings to authenticated;
grant select on public.site_settings to anon;

alter table public.profiles enable row level security;
alter table public.service_orders enable row level security;
alter table public.professionals enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile" on public.profiles
  for select to authenticated using (id = (select auth.uid()) or (select public.is_admin()));
drop policy if exists "Admins manage profiles" on public.profiles;
create policy "Admins manage profiles" on public.profiles
  for all to authenticated using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Anyone submits service orders" on public.service_orders;
create policy "Anyone submits service orders" on public.service_orders
  for insert to anon, authenticated
  with check (
    status = 'قيد المراجعة'
    and payment_status = 'غير مدفوع'
    and total_amount is null
  );
drop policy if exists "Admins manage service orders" on public.service_orders;
create policy "Admins manage service orders" on public.service_orders
  for all to authenticated using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Anyone submits professional applications" on public.professionals;
create policy "Anyone submits professional applications" on public.professionals
  for insert to anon, authenticated
  with check (status = 'قيد المراجعة');
drop policy if exists "Admins manage professionals" on public.professionals;
create policy "Admins manage professionals" on public.professionals
  for all to authenticated using ((select public.is_admin()))
  with check ((select public.is_admin()));
drop policy if exists "Public reads approved professional profiles" on public.professionals;
create policy "Public reads approved professional profiles" on public.professionals
  for select to anon, authenticated using (status = 'مقبول');

drop policy if exists "Public reads payment account settings" on public.site_settings;
create policy "Public reads payment account settings" on public.site_settings
  for select to anon, authenticated using (key = 'payment_accounts');
drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings" on public.site_settings
  for all to authenticated using ((select public.is_admin()))
  with check ((select public.is_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('professional-ids', 'professional-ids', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

drop policy if exists "Anyone uploads professional ID images" on storage.objects;
create policy "Anyone uploads professional ID images" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'professional-ids');
drop policy if exists "Admins read professional ID images" on storage.objects;
create policy "Admins read professional ID images" on storage.objects
  for select to authenticated
  using (bucket_id = 'professional-ids' and (select public.is_admin()));
drop policy if exists "Admins delete professional ID images" on storage.objects;
create policy "Admins delete professional ID images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'professional-ids' and (select public.is_admin()));

grant insert on storage.objects to anon, authenticated;
grant select, delete on storage.objects to authenticated;

create index if not exists service_orders_created_at_idx on public.service_orders (created_at desc);
create index if not exists service_orders_status_idx on public.service_orders (status);
create index if not exists professionals_created_at_idx on public.professionals (created_at desc);
create index if not exists professionals_status_idx on public.professionals (status);

-- After registering an administrator from admin.html, promote that account here.
-- Use a real email address: Supabase Auth requires a valid email address.
-- update public.profiles set role = 'admin' where email = 'admin@example.com';
