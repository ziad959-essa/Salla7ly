-- Run this script in Supabase SQL Editor. It is safe to run again.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  phone text,
  full_name text,
  national_id text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists full_name text;
alter table public.profiles add column if not exists national_id text;

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, phone, full_name, national_id)
  values (
    new.id,
    coalesce(new.email, ''),
    new.phone,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'national_id'
  )
  on conflict (id) do update set
    email = excluded.email,
    phone = excluded.phone,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    national_id = coalesce(excluded.national_id, public.profiles.national_id);
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
  tracking_token uuid not null default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  trade text not null,
  services jsonb not null default '[]'::jsonb,
  governorate text not null,
  area text not null,
  address text not null,
  details text not null default '',
  payment_method text check (payment_method in ('instapay', 'vodafone_cash', 'cash')),
  payment_receipt_path text,
  transaction_id text,
  deposit_status text not null default 'غير مدفوع'
    check (deposit_status in ('غير مدفوع', 'تم الدفع', 'بانتظار المراجعة')),
  final_payment_receipt_path text,
  final_transaction_id text,
  final_payment_status text not null default 'غير مدفوع'
    check (final_payment_status in ('غير مدفوع', 'تم الدفع')),
  cash_location_details text,
  area_size_sqm numeric(10, 2) check (area_size_sqm is null or area_size_sqm > 0),
  status text not null default 'قيد المراجعة',
  payment_status text not null default 'غير مدفوع',
  total_amount numeric(12, 2) check (total_amount is null or total_amount >= 0),
  admin_commission numeric(12, 2) generated always as (
    case when payment_status = 'مدفوع' and total_amount is not null
      then round(total_amount * 0.20, 2)
      else 0
    end
  ) stored,
  professional_net numeric(12, 2) generated always as (
    case when payment_status = 'مدفوع' and total_amount is not null
      then round(total_amount * 0.80, 2)
      else 0
    end
  ) stored,
  accepted_professional_id uuid,
  estimated_arrival_minutes integer check (estimated_arrival_minutes is null or estimated_arrival_minutes > 0),
  created_at timestamptz not null default now()
);

alter table public.service_orders add column if not exists tracking_token uuid not null default gen_random_uuid();
alter table public.service_orders add column if not exists payment_receipt_path text;
alter table public.service_orders add column if not exists transaction_id text;
alter table public.service_orders add column if not exists deposit_status text not null default 'غير مدفوع';
alter table public.service_orders add column if not exists final_payment_receipt_path text;
alter table public.service_orders add column if not exists final_transaction_id text;
alter table public.service_orders add column if not exists final_payment_status text not null default 'غير مدفوع';
alter table public.service_orders add column if not exists cash_location_details text;
alter table public.service_orders add column if not exists area_size_sqm numeric(10, 2);
alter table public.service_orders add column if not exists professional_net numeric(12, 2) generated always as (
  case when payment_status = 'مدفوع' and total_amount is not null
    then round(total_amount * 0.80, 2)
    else 0
  end
) stored;
alter table public.service_orders add column if not exists accepted_professional_id uuid;
alter table public.service_orders add column if not exists estimated_arrival_minutes integer;
alter table public.service_orders drop constraint if exists service_orders_payment_method_check;
alter table public.service_orders add constraint service_orders_payment_method_check
  check (payment_method in ('instapay', 'vodafone_cash', 'cash'));
alter table public.service_orders drop constraint if exists service_orders_area_size_sqm_check;
alter table public.service_orders add constraint service_orders_area_size_sqm_check
  check (area_size_sqm is null or area_size_sqm > 0);
alter table public.service_orders drop constraint if exists service_orders_estimated_arrival_minutes_check;
alter table public.service_orders add constraint service_orders_estimated_arrival_minutes_check
  check (estimated_arrival_minutes is null or estimated_arrival_minutes between 1 and 1440);
alter table public.service_orders drop constraint if exists service_orders_deposit_status_check;
alter table public.service_orders add constraint service_orders_deposit_status_check
  check (deposit_status in ('غير مدفوع', 'تم الدفع', 'بانتظار المراجعة'));
alter table public.service_orders drop constraint if exists service_orders_final_payment_status_check;
alter table public.service_orders add constraint service_orders_final_payment_status_check
  check (final_payment_status in ('غير مدفوع', 'تم الدفع'));

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
  portfolio_paths text[] not null default '{}',
  payout_method text check (payout_method in ('vodafone_cash', 'instapay', 'cash')),
  user_id uuid unique references auth.users (id) on delete set null,
  status text not null default 'قيد المراجعة',
  created_at timestamptz not null default now()
);

alter table public.professionals add column if not exists portfolio_paths text[] not null default '{}';
alter table public.professionals add column if not exists payout_method text;
alter table public.professionals add column if not exists user_id uuid unique references auth.users (id) on delete set null;
alter table public.professionals drop constraint if exists professionals_payout_method_check;
alter table public.professionals add constraint professionals_payout_method_check
  check (payout_method is null or payout_method in ('vodafone_cash', 'instapay', 'cash'));

create table if not exists public.service_order_matches (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.service_orders (id) on delete cascade,
  professional_id uuid not null references public.professionals (id) on delete cascade,
  status text not null default 'matched' check (status in ('matched', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  unique (order_id, professional_id)
);

create or replace function public.match_service_order()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status <> 'قيد المراجعة' then
    return new;
  end if;
  insert into public.service_order_matches (order_id, professional_id)
  select new.id, p.id
  from public.professionals p
  where p.status = 'مقبول'
    and p.trade = new.trade
    and p.governorate = new.governorate
    and p.area = new.area
  on conflict (order_id, professional_id) do nothing;
  return new;
end;
$$;

drop trigger if exists match_professionals_after_order_insert on public.service_orders;
create trigger match_professionals_after_order_insert
after insert on public.service_orders
for each row execute function public.match_service_order();

create or replace function public.record_order_deposit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.payment_receipt_path is not null
     and split_part(new.payment_receipt_path, '/', 1) = new.tracking_token::text
     and exists (
       select 1 from storage.objects o
       where o.bucket_id = 'payment-receipts'
         and o.name = new.payment_receipt_path
     ) then
    update public.service_orders
    set deposit_status = 'تم الدفع',
        payment_status = 'عربون مدفوع',
        status = 'تم دفع العربون - قيد التنفيذ'
    where id = new.id;
  elsif new.transaction_id is not null then
    update public.service_orders
    set deposit_status = 'بانتظار المراجعة',
        status = 'بانتظار مراجعة العربون'
    where id = new.id;
  elsif new.payment_method = 'cash' then
    update public.service_orders
    set deposit_status = 'بانتظار المراجعة',
        status = 'بانتظار مراجعة العربون النقدي'
    where id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists record_order_deposit_after_insert on public.service_orders;
create trigger record_order_deposit_after_insert
after insert on public.service_orders
for each row execute function public.record_order_deposit();

create or replace function public.match_pending_orders_for_professional()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status = 'مقبول' and old.status is distinct from new.status then
    insert into public.service_order_matches (order_id, professional_id)
    select o.id, new.id
    from public.service_orders o
    where o.status = 'قيد المراجعة'
      and o.trade = new.trade
      and o.governorate = new.governorate
      and o.area = new.area
      and o.accepted_professional_id is null
    on conflict (order_id, professional_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists match_pending_orders_after_professional_approval on public.professionals;
create trigger match_pending_orders_after_professional_approval
after update of status on public.professionals
for each row execute function public.match_pending_orders_for_professional();

create or replace function public.claim_professional_account()
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  professional_is_approved boolean;
begin
  if auth.uid() is null then
    return false;
  end if;
  select exists (
    select 1
    from public.professionals
    where user_id = auth.uid() and status = 'مقبول'
  ) into professional_is_approved;
  return professional_is_approved;
end;
$$;

create or replace function public.accept_service_order(match_id uuid, arrival_minutes integer)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  professional uuid;
  selected_order uuid;
begin
  if arrival_minutes is null or arrival_minutes < 1 or arrival_minutes > 1440 then
    raise exception 'Estimated arrival must be between 1 and 1440 minutes.';
  end if;
  select p.id into professional
  from public.professionals p
  where p.user_id = auth.uid() and p.status = 'مقبول';
  if professional is null then
    raise exception 'No approved professional account is linked.';
  end if;

  update public.service_order_matches
  set status = 'accepted', accepted_at = now()
  where id = match_id and professional_id = professional and status = 'matched'
  returning order_id into selected_order;
  if selected_order is null then
    raise exception 'This order is no longer available.';
  end if;

  update public.service_orders
  set accepted_professional_id = professional,
      estimated_arrival_minutes = arrival_minutes,
      status = case when deposit_status = 'تم الدفع'
        then 'تم دفع العربون - قيد التنفيذ'
        else 'تم التأكيد'
      end
  where id = selected_order and accepted_professional_id is null
  returning id into selected_order;
  if selected_order is null then
    raise exception 'Another professional has already accepted this order.';
  end if;

  update public.service_order_matches
  set status = 'declined'
  where order_id = selected_order and id <> match_id and status = 'matched';
end;
$$;

create or replace function public.complete_service_order(match_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  professional uuid;
  selected_order uuid;
begin
  select p.id into professional
  from public.professionals p
  where p.user_id = auth.uid() and p.status = 'مقبول';
  if professional is null then
    raise exception 'No approved professional account is linked.';
  end if;

  select m.order_id into selected_order
  from public.service_order_matches m
  where m.id = match_id
    and m.status = 'accepted'
    and m.professional_id = professional
  for update;
  if selected_order is null then
    raise exception 'This service order is not assigned to this professional.';
  end if;

  update public.service_orders
  set status = 'بانتظار تأكيد العميل'
  where id = selected_order
    and accepted_professional_id = professional
    and deposit_status = 'تم الدفع'
    and status = 'تم دفع العربون - قيد التنفيذ';
  if not found then
    raise exception 'The deposit must be recorded before completing this service.';
  end if;
end;
$$;

create or replace function public.submit_order_deposit(
  p_tracking_token uuid,
  p_receipt_path text default null,
  p_transaction_id text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  receipt_is_valid boolean := p_receipt_path is not null
    and split_part(p_receipt_path, '/', 1) = p_tracking_token::text
    and split_part(p_receipt_path, '/', 2) = 'deposit'
    and exists (
      select 1 from storage.objects o
      where o.bucket_id = 'payment-receipts'
        and o.name = p_receipt_path
    );
  transaction_value text := nullif(trim(coalesce(p_transaction_id, '')), '');
begin
  if not receipt_is_valid and transaction_value is null then
    raise exception 'Upload a deposit receipt or enter a transaction ID.';
  end if;

  update public.service_orders
  set payment_receipt_path = case when receipt_is_valid then p_receipt_path else null end,
      transaction_id = transaction_value,
      deposit_status = case when receipt_is_valid then 'تم الدفع' else 'بانتظار المراجعة' end,
      payment_status = case when receipt_is_valid then 'عربون مدفوع' else 'غير مدفوع' end,
      status = case when receipt_is_valid
        then 'تم دفع العربون - قيد التنفيذ'
        else 'بانتظار مراجعة العربون'
      end
  where tracking_token = p_tracking_token
    and total_amount is not null
    and payment_method in ('instapay', 'vodafone_cash')
    and deposit_status = 'غير مدفوع';

  if not found then
    raise exception 'This order is not awaiting a deposit.';
  end if;
end;
$$;

create or replace function public.confirm_order_delivery(
  p_tracking_token uuid,
  p_final_receipt_path text default null,
  p_final_transaction_id text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.service_orders
  set final_payment_receipt_path = p_final_receipt_path,
      final_transaction_id = nullif(trim(coalesce(p_final_transaction_id, '')), ''),
      final_payment_status = 'تم الدفع',
      payment_status = 'مدفوع',
      status = 'مكتمل نهائياً'
  where tracking_token = p_tracking_token
    and status = 'بانتظار تأكيد العميل'
    and deposit_status = 'تم الدفع'
    and total_amount is not null
    and (
      payment_method = 'cash'
      or (
        p_final_receipt_path is not null
        and split_part(p_final_receipt_path, '/', 1) = tracking_token::text
        and split_part(p_final_receipt_path, '/', 2) = 'final'
        and exists (
          select 1 from storage.objects o
          where o.bucket_id = 'payment-receipts'
            and o.name = p_final_receipt_path
        )
      )
      or nullif(trim(coalesce(p_final_transaction_id, '')), '') is not null
    );

  if not found then
    raise exception 'The final payment proof or an eligible order is missing.';
  end if;
end;
$$;

create or replace function public.get_order_tracking(p_tracking_token uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'status', status,
    'estimated_arrival_minutes', estimated_arrival_minutes,
    'payment_status', payment_status,
    'deposit_status', deposit_status,
    'final_payment_status', final_payment_status,
    'total_amount', total_amount,
    'deposit_amount', case when total_amount is null then null else round(total_amount * 0.50, 2) end,
    'remaining_amount', case when total_amount is null then null else round(total_amount * 0.50, 2) end,
    'payment_method', payment_method
  )
  from public.service_orders
  where tracking_token = p_tracking_token;
$$;

revoke all on function public.get_order_tracking(uuid) from public;
grant execute on function public.get_order_tracking(uuid) to anon, authenticated;

create or replace function public.broadcast_order_tracking_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.estimated_arrival_minutes is distinct from old.estimated_arrival_minutes
     or new.status is distinct from old.status
     or new.total_amount is distinct from old.total_amount
     or new.deposit_status is distinct from old.deposit_status
     or new.payment_status is distinct from old.payment_status
     or new.final_payment_status is distinct from old.final_payment_status then
    perform realtime.send(
      jsonb_build_object(
        'status', new.status,
        'estimated_arrival_minutes', new.estimated_arrival_minutes
      ),
      'order_updated',
      'order-tracking:' || new.tracking_token::text,
      false
    );
  end if;
  return new;
end;
$$;

drop trigger if exists broadcast_service_order_tracking_update on public.service_orders;
create trigger broadcast_service_order_tracking_update
after update on public.service_orders
for each row execute function public.broadcast_order_tracking_update();

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
grant select, update on public.service_order_matches to authenticated;
revoke all on function public.claim_professional_account() from public;
revoke all on function public.accept_service_order(uuid, integer) from public;
revoke all on function public.complete_service_order(uuid) from public;
revoke all on function public.submit_order_deposit(uuid, text, text) from public;
revoke all on function public.confirm_order_delivery(uuid, text, text) from public;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.claim_professional_account() to authenticated;
grant execute on function public.accept_service_order(uuid, integer) to authenticated;
grant execute on function public.complete_service_order(uuid) to authenticated;
grant execute on function public.submit_order_deposit(uuid, text, text) to anon, authenticated;
grant execute on function public.confirm_order_delivery(uuid, text, text) to anon, authenticated;
grant select, insert, update, delete on public.site_settings to authenticated;
grant select on public.site_settings to anon;

alter table public.profiles enable row level security;
alter table public.service_orders enable row level security;
alter table public.professionals enable row level security;
alter table public.site_settings enable row level security;
alter table public.service_order_matches enable row level security;

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
drop policy if exists "Matched professionals read service orders" on public.service_orders;
create policy "Matched professionals read service orders" on public.service_orders
  for select to authenticated using (
    exists (
      select 1
      from public.service_order_matches m
      join public.professionals p on p.id = m.professional_id
      where m.order_id = service_orders.id
        and p.user_id = (select auth.uid())
        and p.status = 'مقبول'
    )
  );

drop policy if exists "Anyone submits professional applications" on public.professionals;
create policy "Anyone submits professional applications" on public.professionals
  for insert to anon, authenticated
  with check (
    status = 'قيد المراجعة'
    and (user_id is null or user_id = (select auth.uid()))
  );
drop policy if exists "Admins manage professionals" on public.professionals;
create policy "Admins manage professionals" on public.professionals
  for all to authenticated using ((select public.is_admin()))
  with check ((select public.is_admin()));
drop policy if exists "Professionals read own profile" on public.professionals;
create policy "Professionals read own profile" on public.professionals
  for select to authenticated using (user_id = (select auth.uid()));
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

drop policy if exists "Matched professionals read own matches" on public.service_order_matches;
create policy "Matched professionals read own matches" on public.service_order_matches
  for select to authenticated using (
    exists (
      select 1 from public.professionals p
      where p.id = professional_id and p.user_id = (select auth.uid()) and p.status = 'مقبول'
    )
  );
drop policy if exists "Admins manage order matches" on public.service_order_matches;
create policy "Admins manage order matches" on public.service_order_matches
  for all to authenticated using ((select public.is_admin()))
  with check ((select public.is_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('professional-ids', 'professional-ids', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('professional-portfolio', 'professional-portfolio', false, 20971520, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = false,
  file_size_limit = 20971520,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('payment-receipts', 'payment-receipts', false, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

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

drop policy if exists "Anyone uploads professional portfolio images" on storage.objects;
create policy "Anyone uploads professional portfolio images" on storage.objects
  for insert to anon, authenticated with check (bucket_id = 'professional-portfolio');
drop policy if exists "Admins read professional portfolio images" on storage.objects;
create policy "Admins read professional portfolio images" on storage.objects
  for select to authenticated using (bucket_id = 'professional-portfolio' and (select public.is_admin()));
drop policy if exists "Anyone uploads payment receipts" on storage.objects;
create policy "Anyone uploads payment receipts" on storage.objects
  for insert to anon, authenticated with check (bucket_id = 'payment-receipts');
drop policy if exists "Admins read payment receipts" on storage.objects;
create policy "Admins read payment receipts" on storage.objects
  for select to authenticated using (bucket_id = 'payment-receipts' and (select public.is_admin()));
drop policy if exists "Admins delete payment receipts" on storage.objects;
create policy "Admins delete payment receipts" on storage.objects
  for delete to authenticated using (bucket_id = 'payment-receipts' and (select public.is_admin()));

grant insert on storage.objects to anon, authenticated;
grant select, delete on storage.objects to authenticated;

create index if not exists service_orders_created_at_idx on public.service_orders (created_at desc);
create index if not exists service_orders_status_idx on public.service_orders (status);
create index if not exists service_orders_pending_match_idx
  on public.service_orders (trade, governorate, area)
  where status = 'قيد المراجعة' and accepted_professional_id is null;
create unique index if not exists service_orders_tracking_token_idx on public.service_orders (tracking_token);
create index if not exists professionals_created_at_idx on public.professionals (created_at desc);
create index if not exists professionals_status_idx on public.professionals (status);
create index if not exists professionals_matching_idx on public.professionals (trade, governorate, area, status);
create index if not exists service_order_matches_professional_idx on public.service_order_matches (professional_id, status);

do $$
begin
  alter publication supabase_realtime add table public.service_order_matches;
exception
  when duplicate_object then null;
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.service_orders;
exception
  when duplicate_object then null;
end;
$$;

insert into public.site_settings (key, value)
values ('payment_accounts', '{"instapay":"01063459472","vodafone_cash":"01063459472"}'::jsonb)
on conflict (key) do update set
  value = jsonb_build_object(
    'instapay', coalesce(public.site_settings.value ->> 'instapay', '01063459472'),
    'vodafone_cash', coalesce(public.site_settings.value ->> 'vodafone_cash', '01063459472')
  ),
  updated_at = now();

-- After registering an administrator from admin.html, promote that account here.
-- Use a real email address: Supabase Auth requires a valid email address.
-- update public.profiles set role = 'admin' where email = 'admin@example.com';
