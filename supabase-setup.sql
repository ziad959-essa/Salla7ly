-- Run this script in Supabase SQL Editor. It is safe to run again.
DROP VIEW IF EXISTS public.artisan_orders CASCADE;
DROP VIEW IF EXISTS public.artisan_profiles CASCADE;
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
    coalesce(new.phone, new.raw_user_meta_data ->> 'phone'),
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
  customer_user_id uuid references auth.users (id) on delete set null,
  tracking_token uuid not null default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  trade text not null,
  services jsonb not null default '[]'::jsonb,
  governorate text not null,
  area text not null,
  address text not null,
  location_latitude numeric(10, 7) check (location_latitude is null or location_latitude between -90 and 90),
  location_longitude numeric(10, 7) check (location_longitude is null or location_longitude between -180 and 180),
  matching_radius_meters integer not null default 10000 check (matching_radius_meters between 1 and 10000),
  details text not null default '',
  proposed_price numeric(12, 2) check (proposed_price is null or proposed_price > 0),
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
  service_base_amount numeric(12, 2) check (service_base_amount is null or service_base_amount >= 0),
  total_amount numeric(12, 2) generated always as (
    case when service_base_amount is null then null
      else round(service_base_amount * 1.10, 2)
    end
  ) stored,
  customer_service_fee numeric(12, 2) generated always as (
    case when service_base_amount is null then 0
      else round(service_base_amount * 0.10, 2)
    end
  ) stored,
  admin_commission numeric(12, 2) generated always as (
    case when payment_status = 'مدفوع' and service_base_amount is not null
      then round(service_base_amount * 0.10, 2)
      else 0
    end
  ) stored,
  professional_net numeric(12, 2) generated always as (
    case when payment_status = 'مدفوع' and service_base_amount is not null
      then round(service_base_amount * 0.90, 2)
      else 0
    end
  ) stored,
  accepted_professional_id uuid,
  estimated_arrival_minutes integer check (estimated_arrival_minutes is null or estimated_arrival_minutes > 0),
  created_at timestamptz not null default now()
);

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'service_orders' and column_name = 'total_amount'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'service_orders' and column_name = 'service_base_amount'
  ) then
    alter table public.service_orders drop column if exists admin_commission;
    alter table public.service_orders drop column if exists professional_net;
    alter table public.service_orders rename column total_amount to service_base_amount;
  end if;
end;
$$;

alter table public.service_orders add column if not exists service_base_amount numeric(12, 2);
alter table public.service_orders drop constraint if exists service_orders_service_base_amount_check;
alter table public.service_orders add constraint service_orders_service_base_amount_check
  check (service_base_amount is null or service_base_amount >= 0);
alter table public.service_orders add column if not exists total_amount numeric(12, 2)
  generated always as (
    case when service_base_amount is null then null
      else round(service_base_amount * 1.10, 2)
    end
  ) stored;
alter table public.service_orders add column if not exists customer_service_fee numeric(12, 2)
  generated always as (
    case when service_base_amount is null then 0
      else round(service_base_amount * 0.10, 2)
    end
  ) stored;
alter table public.service_orders add column if not exists admin_commission numeric(12, 2)
  generated always as (
    case when payment_status = 'مدفوع' and service_base_amount is not null
      then round(service_base_amount * 0.10, 2)
      else 0
    end
  ) stored;
alter table public.service_orders add column if not exists professional_net numeric(12, 2)
  generated always as (
    case when payment_status = 'مدفوع' and service_base_amount is not null
      then round(service_base_amount * 0.90, 2)
      else 0
    end
  ) stored;

alter table public.service_orders add column if not exists tracking_token uuid not null default gen_random_uuid();
alter table public.service_orders add column if not exists customer_user_id uuid references auth.users (id) on delete set null;
alter table public.service_orders add column if not exists payment_receipt_path text;
alter table public.service_orders add column if not exists transaction_id text;
alter table public.service_orders add column if not exists deposit_status text not null default 'غير مدفوع';
alter table public.service_orders add column if not exists final_payment_receipt_path text;
alter table public.service_orders add column if not exists final_transaction_id text;
alter table public.service_orders add column if not exists final_payment_status text not null default 'غير مدفوع';
alter table public.service_orders add column if not exists cash_location_details text;
alter table public.service_orders add column if not exists location_latitude numeric(10, 7);
alter table public.service_orders add column if not exists location_longitude numeric(10, 7);
alter table public.service_orders add column if not exists matching_radius_meters integer not null default 10000;
alter table public.service_orders add column if not exists proposed_price numeric(12, 2);
alter table public.service_orders add column if not exists area_size_sqm numeric(10, 2);
alter table public.service_orders add column if not exists accepted_professional_id uuid;
alter table public.service_orders add column if not exists estimated_arrival_minutes integer;
alter table public.service_orders drop constraint if exists service_orders_payment_method_check;
alter table public.service_orders add constraint service_orders_payment_method_check
  check (payment_method in ('instapay', 'vodafone_cash', 'cash'));
alter table public.service_orders drop constraint if exists service_orders_location_latitude_check;
alter table public.service_orders add constraint service_orders_location_latitude_check
  check (location_latitude is null or location_latitude between -90 and 90);
alter table public.service_orders drop constraint if exists service_orders_location_longitude_check;
alter table public.service_orders add constraint service_orders_location_longitude_check
  check (location_longitude is null or location_longitude between -180 and 180);
alter table public.service_orders drop constraint if exists service_orders_proposed_price_check;
alter table public.service_orders add constraint service_orders_proposed_price_check
  check (proposed_price is null or proposed_price > 0);
alter table public.service_orders drop constraint if exists service_orders_location_coordinates_pair_check;
alter table public.service_orders add constraint service_orders_location_coordinates_pair_check
  check ((location_latitude is null) = (location_longitude is null));
alter table public.service_orders drop constraint if exists service_orders_matching_radius_meters_check;
alter table public.service_orders add constraint service_orders_matching_radius_meters_check
  check (matching_radius_meters between 1 and 10000);
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
  location_latitude numeric(10, 7) check (location_latitude is null or location_latitude between -90 and 90),
  location_longitude numeric(10, 7) check (location_longitude is null or location_longitude between -180 and 180),
  id_image_path text not null,
  portfolio_paths text[] not null default '{}',
  payout_method text check (payout_method in ('vodafone_cash', 'instapay', 'cash')),
  payout_account text,
  presence_updated_at timestamptz,
  user_id uuid unique references auth.users (id) on delete set null,
  status text not null default 'قيد المراجعة',
  created_at timestamptz not null default now()
);

alter table public.professionals add column if not exists portfolio_paths text[] not null default '{}';
alter table public.professionals add column if not exists payout_method text;
alter table public.professionals add column if not exists payout_account text;
alter table public.professionals add column if not exists presence_updated_at timestamptz;
alter table public.professionals add column if not exists user_id uuid unique references auth.users (id) on delete set null;
alter table public.professionals add column if not exists location_latitude numeric(10, 7);
alter table public.professionals add column if not exists location_longitude numeric(10, 7);
alter table public.professionals drop constraint if exists professionals_location_latitude_check;
alter table public.professionals add constraint professionals_location_latitude_check
  check (location_latitude is null or location_latitude between -90 and 90);
alter table public.professionals drop constraint if exists professionals_location_longitude_check;
alter table public.professionals add constraint professionals_location_longitude_check
  check (location_longitude is null or location_longitude between -180 and 180);
alter table public.professionals drop constraint if exists professionals_location_pair_check;
alter table public.professionals add constraint professionals_location_pair_check
  check ((location_latitude is null) = (location_longitude is null));
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

create or replace function public.set_professional_presence(p_online boolean)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.professionals
  set presence_updated_at = case when p_online then now() else null end
  where user_id = auth.uid() and status = 'مقبول';
  return found;
end;
$$;

create table if not exists public.service_inquiry_messages (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.service_orders (id) on delete cascade,
  match_id uuid not null references public.service_order_matches (id) on delete cascade,
  sender_role text not null check (sender_role in ('customer', 'professional')),
  sender_user_id uuid references auth.users (id) on delete set null,
  message text not null check (char_length(message) between 1 and 1500),
  created_at timestamptz not null default now()
);

create table if not exists public.service_price_offers (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.service_orders (id) on delete cascade,
  match_id uuid not null unique references public.service_order_matches (id) on delete cascade,
  service_base_amount numeric(12, 2) not null check (service_base_amount > 0),
  arrival_minutes integer not null check (arrival_minutes between 1 and 1440),
  note text not null default '',
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists service_inquiry_messages_order_created_idx
  on public.service_inquiry_messages (order_id, created_at);
create index if not exists service_inquiry_messages_match_created_idx
  on public.service_inquiry_messages (match_id, created_at);
create index if not exists service_price_offers_order_status_idx
  on public.service_price_offers (order_id, status);

alter table public.service_inquiry_messages enable row level security;
alter table public.service_price_offers enable row level security;
revoke all on public.service_inquiry_messages from anon, authenticated;
revoke all on public.service_price_offers from anon, authenticated;

create or replace function public.filter_inquiry_message(p_message text)
returns text
language plpgsql
immutable
set search_path = ''
as $$
declare
  filtered text := trim(coalesce(p_message, ''));
  offensive_terms text[] := array[
    'شرموط', 'شرموطة', 'متناك', 'متناكة', 'خول', 'كس', 'طيز', 'عرص',
    'fuck', 'shit', 'bitch', 'asshole', 'motherfucker'
  ];
  term text;
begin
  filtered := translate(
    filtered,
    '٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹',
    '01234567890123456789'
  );
  if char_length(filtered) < 1 or char_length(filtered) > 1500 then
    raise exception 'Message must contain between 1 and 1500 characters.';
  end if;
  if filtered ~* '(https?://|ftp://|www\.|[[:alnum:]-]+(\.[[:alnum:]-]+)*\.([[:alpha:]]{2,}|xn--[[:alnum:]-]+)(/|[:space:]]|$))' then
    raise exception 'External links are not allowed in service inquiries.';
  end if;
  if filtered ~ '[0-9][0-9[:space:]().+-]{5,}[0-9]' then
    raise exception 'Phone numbers and digit sequences are not allowed in service inquiries.';
  end if;
  foreach term in array offensive_terms loop
    filtered := regexp_replace(
      filtered,
      '(^|[^[:alnum:]ء-ي])' || term || '($|[^[:alnum:]ء-ي])',
      '\1' || repeat('*', char_length(term)) || '\2',
      'gi'
    );
  end loop;
  return filtered;
end;
$$;

create or replace function public.get_service_inquiry(p_tracking_token uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'order_id', o.id,
    'status', o.status,
    'service_base_amount', o.service_base_amount,
    'total_amount', o.total_amount,
    'customer_service_fee', o.customer_service_fee,
    'matches', coalesce((
      select jsonb_agg(jsonb_build_object(
        'match_id', m.id,
        'professional_name', p.name,
        'professional_trade', p.trade,
        'match_status', m.status,
        'offer', case when offer.id is null then null else jsonb_build_object(
          'id', offer.id,
          'service_base_amount', offer.service_base_amount,
          'arrival_minutes', offer.arrival_minutes,
          'note', offer.note,
          'status', offer.status,
          'total_amount', round(offer.service_base_amount * 1.10, 2),
          'customer_service_fee', round(offer.service_base_amount * 0.10, 2)
        ) end,
        'messages', coalesce((
          select jsonb_agg(jsonb_build_object(
            'sender_role', msg.sender_role,
            'message', msg.message,
            'created_at', msg.created_at
          ) order by msg.created_at)
          from public.service_inquiry_messages msg
          where msg.match_id = m.id
        ), '[]'::jsonb)
      ) order by m.created_at)
      from public.service_order_matches m
      join public.professionals p on p.id = m.professional_id
      left join public.service_price_offers offer on offer.match_id = m.id
      where m.order_id = o.id
    ), '[]'::jsonb)
  )
  from public.service_orders o
  where o.tracking_token = p_tracking_token;
$$;

create or replace function public.get_professional_inquiry(p_match_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'order_id', o.id,
    'status', o.status,
    'match_status', m.status,
    'offer', (
      select jsonb_build_object(
        'id', offer.id,
        'service_base_amount', offer.service_base_amount,
        'arrival_minutes', offer.arrival_minutes,
        'note', offer.note,
        'status', offer.status,
        'total_amount', round(offer.service_base_amount * 1.10, 2),
        'professional_fee', round(offer.service_base_amount * 0.10, 2),
        'professional_net', round(offer.service_base_amount * 0.90, 2)
      )
      from public.service_price_offers offer
      where offer.match_id = m.id
    ),
    'messages', coalesce((
      select jsonb_agg(jsonb_build_object(
        'sender_role', msg.sender_role,
        'message', msg.message,
        'created_at', msg.created_at
      ) order by msg.created_at)
      from public.service_inquiry_messages msg
      where msg.match_id = m.id
    ), '[]'::jsonb)
  )
  from public.service_order_matches m
  join public.service_orders o on o.id = m.order_id
  join public.professionals p on p.id = m.professional_id
  where m.id = p_match_id
    and p.user_id = auth.uid()
    and p.status = 'مقبول';
$$;

create or replace function public.send_customer_inquiry_message(
  p_tracking_token uuid,
  p_match_id uuid,
  p_message text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  selected_order uuid;
begin
  select o.id into selected_order
  from public.service_orders o
  join public.service_order_matches m on m.order_id = o.id
  where o.tracking_token = p_tracking_token
    and m.id = p_match_id
    and m.status in ('matched', 'accepted')
    and (o.accepted_professional_id is null or o.accepted_professional_id = m.professional_id)
    and o.status <> 'ملغي';
  if selected_order is null then
    raise exception 'This service inquiry is no longer available.';
  end if;
  insert into public.service_inquiry_messages (order_id, match_id, sender_role, message)
  values (selected_order, p_match_id, 'customer', public.filter_inquiry_message(p_message));
end;
$$;

create or replace function public.send_professional_inquiry_message(
  p_match_id uuid,
  p_message text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  selected_order uuid;
begin
  select o.id into selected_order
  from public.service_order_matches m
  join public.service_orders o on o.id = m.order_id
  join public.professionals p on p.id = m.professional_id
  where m.id = p_match_id
    and m.status in ('matched', 'accepted')
    and p.user_id = auth.uid()
    and p.status = 'مقبول'
    and (o.accepted_professional_id is null or o.accepted_professional_id = p.id)
    and o.status <> 'ملغي';
  if selected_order is null then
    raise exception 'This service inquiry is no longer available.';
  end if;
  insert into public.service_inquiry_messages (order_id, match_id, sender_role, sender_user_id, message)
  values (selected_order, p_match_id, 'professional', auth.uid(), public.filter_inquiry_message(p_message));
end;
$$;

create or replace function public.submit_service_price_offer(
  p_match_id uuid,
  p_service_base_amount numeric,
  p_arrival_minutes integer,
  p_note text default ''
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  selected_order uuid;
  filtered_note text;
begin
  if p_service_base_amount is null or p_service_base_amount <= 0 then
    raise exception 'Enter a service price greater than zero.';
  end if;
  if p_arrival_minutes is null or p_arrival_minutes < 1 or p_arrival_minutes > 1440 then
    raise exception 'Estimated arrival must be between 1 and 1440 minutes.';
  end if;
  select o.id into selected_order
  from public.service_order_matches m
  join public.service_orders o on o.id = m.order_id
  join public.professionals p on p.id = m.professional_id
  where m.id = p_match_id
    and m.status = 'matched'
    and p.user_id = auth.uid()
    and p.status = 'مقبول'
    and o.accepted_professional_id is null
    and o.status = 'قيد المراجعة';
  if selected_order is null then
    raise exception 'This service inquiry is no longer accepting offers.';
  end if;
  filtered_note := case when trim(coalesce(p_note, '')) = '' then ''
    else public.filter_inquiry_message(p_note)
  end;
  insert into public.service_price_offers (
    order_id, match_id, service_base_amount, arrival_minutes, note
  ) values (
    selected_order, p_match_id, p_service_base_amount, p_arrival_minutes, filtered_note
  )
  on conflict (match_id) do update set
    service_base_amount = excluded.service_base_amount,
    arrival_minutes = excluded.arrival_minutes,
    note = excluded.note,
    status = 'pending',
    updated_at = now()
  where public.service_price_offers.status = 'pending';
  if not found then
    raise exception 'An accepted or closed offer cannot be changed.';
  end if;
end;
$$;

create or replace function public.accept_service_price_offer(
  p_tracking_token uuid,
  p_offer_id uuid
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  selected_order uuid;
  selected_match uuid;
  selected_professional uuid;
  arrival integer;
  base_amount numeric(12, 2);
begin
  select o.id, m.id, m.professional_id, offer.arrival_minutes, offer.service_base_amount
  into selected_order, selected_match, selected_professional, arrival, base_amount
  from public.service_orders o
  join public.service_price_offers offer on offer.order_id = o.id
  join public.service_order_matches m on m.id = offer.match_id
  where o.tracking_token = p_tracking_token
    and offer.id = p_offer_id
    and offer.status = 'pending'
    and m.status = 'matched'
    and o.accepted_professional_id is null
    and o.status = 'قيد المراجعة'
  for update of o, offer;
  if selected_order is null then
    raise exception 'This price offer is no longer available.';
  end if;

  update public.service_orders
  set accepted_professional_id = selected_professional,
      service_base_amount = base_amount,
      estimated_arrival_minutes = arrival,
      status = 'تم التأكيد'
  where id = selected_order and accepted_professional_id is null;
  if not found then
    raise exception 'Another offer has already been accepted.';
  end if;

  update public.service_price_offers
  set status = case when id = p_offer_id then 'accepted' else 'declined' end,
      updated_at = now()
  where order_id = selected_order and status = 'pending';
  update public.service_order_matches
  set status = case when id = selected_match then 'accepted' else 'declined' end,
      accepted_at = case when id = selected_match then now() else accepted_at end
  where order_id = selected_order and status = 'matched';
end;
$$;

create or replace function public.coordinates_within_radius_meters(
  p_latitude_one numeric,
  p_longitude_one numeric,
  p_latitude_two numeric,
  p_longitude_two numeric,
  p_radius_meters integer
)
returns boolean
language sql
immutable
strict
set search_path = ''
as $$
  select p_radius_meters between 1 and 10000
    and 2 * 6371000 * asin(sqrt(least(
      1.0,
      power(sin(radians((p_latitude_two - p_latitude_one)::double precision / 2)), 2)
      + cos(radians(p_latitude_one::double precision))
      * cos(radians(p_latitude_two::double precision))
      * power(sin(radians((p_longitude_two - p_longitude_one)::double precision / 2)), 2)
    ))) <= p_radius_meters;
$$;

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
    and (
      (
        new.location_latitude is not null
        and p.location_latitude is not null
        and public.coordinates_within_radius_meters(
          new.location_latitude,
          new.location_longitude,
          p.location_latitude,
          p.location_longitude,
          new.matching_radius_meters
        )
      )
      or (
        (new.location_latitude is null or p.location_latitude is null)
        and p.governorate = new.governorate
        and p.area = new.area
      )
    )
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
      and o.accepted_professional_id is null
      and (
        (
          o.location_latitude is not null
          and new.location_latitude is not null
          and public.coordinates_within_radius_meters(
            o.location_latitude,
            o.location_longitude,
            new.location_latitude,
            new.location_longitude,
            o.matching_radius_meters
          )
        )
        or (
          (o.location_latitude is null or new.location_latitude is null)
          and o.governorate = new.governorate
          and o.area = new.area
        )
      )
    on conflict (order_id, professional_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists match_pending_orders_after_professional_approval on public.professionals;
create trigger match_pending_orders_after_professional_approval
after update of status on public.professionals
for each row execute function public.match_pending_orders_for_professional();

insert into public.service_order_matches (order_id, professional_id)
select o.id, p.id
from public.service_orders o
join public.professionals p
  on p.trade = o.trade
where o.status = 'قيد المراجعة'
  and o.accepted_professional_id is null
  and p.status = 'مقبول'
  and (
    (
      o.location_latitude is not null
      and p.location_latitude is not null
      and public.coordinates_within_radius_meters(
        o.location_latitude,
        o.location_longitude,
        p.location_latitude,
        p.location_longitude,
        o.matching_radius_meters
      )
    )
    or (
      (o.location_latitude is null or p.location_latitude is null)
      and p.governorate = o.governorate
      and p.area = o.area
    )
  )
on conflict (order_id, professional_id) do nothing;

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
begin
  raise exception 'A service booking can only be confirmed by accepting a customer-approved price offer.';
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
    and status in ('تم دفع العربون - قيد التنفيذ', 'الحرفي في الطريق');
  if not found then
    raise exception 'The deposit must be recorded before completing this service.';
  end if;
end;
$$;

create or replace function public.start_service_order_travel(p_match_id uuid)
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

  select o.id into selected_order
  from public.service_order_matches m
  join public.service_orders o on o.id = m.order_id
  where m.id = p_match_id
    and m.status = 'accepted'
    and m.professional_id = professional
    and o.accepted_professional_id = professional
    and o.deposit_status = 'تم الدفع'
    and o.status = 'تم دفع العربون - قيد التنفيذ'
  for update of o;
  if selected_order is null then
    raise exception 'This service order cannot be marked as en route.';
  end if;

  update public.service_orders
  set status = 'الحرفي في الطريق'
  where id = selected_order
    and accepted_professional_id = professional
    and deposit_status = 'تم الدفع'
    and status = 'تم دفع العربون - قيد التنفيذ';
  if not found then
    raise exception 'This service order is no longer ready for travel.';
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
      deposit_status = 'بانتظار المراجعة',
      payment_status = 'غير مدفوع',
      status = 'بانتظار مراجعة العربون'
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
    'order_id', id,
    'status', status,
    'estimated_arrival_minutes', estimated_arrival_minutes,
    'payment_status', payment_status,
    'deposit_status', deposit_status,
    'final_payment_status', final_payment_status,
    'total_amount', total_amount,
    'service_base_amount', service_base_amount,
    'customer_service_fee', customer_service_fee,
    'deposit_amount', case when total_amount is null then null else round(total_amount * 0.50, 2) end,
    'remaining_amount', case when total_amount is null then null else round(total_amount * 0.50, 2) end,
    'payment_method', payment_method,
    'customer_phone', case when accepted_professional_id is not null and status <> 'ملغي' then phone end,
    'professional_phone', case when accepted_professional_id is not null and status <> 'ملغي' then (
      select p.phone from public.professionals p where p.id = accepted_professional_id
    ) end,
    'payout_method', case when accepted_professional_id is not null and status <> 'ملغي' then (
      select p.payout_method from public.professionals p where p.id = accepted_professional_id
    ) end,
    'payout_account', case when accepted_professional_id is not null and status <> 'ملغي' then (
      select p.payout_account from public.professionals p where p.id = accepted_professional_id
    ) end,
    'professional_net', case when service_base_amount is null then null else round(service_base_amount * 0.90, 2) end,
    'professional_fee', case when service_base_amount is null then null else round(service_base_amount * 0.10, 2) end
  )
  from public.service_orders
  where tracking_token = p_tracking_token;
$$;

revoke all on function public.get_order_tracking(uuid) from public;
grant execute on function public.get_order_tracking(uuid) to anon, authenticated;

create or replace function public.get_customer_orders()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  with customer_identity as (
    select
      auth.uid() as user_id,
      right(regexp_replace(
        coalesce(
          (select p.phone from public.profiles p where p.id = auth.uid()),
          auth.jwt() ->> 'phone',
          split_part(coalesce(auth.jwt() ->> 'email', ''), '@', 1)
        ),
        '[^0-9]', '', 'g'
      ), 10) as phone_suffix
  )
  select coalesce(jsonb_agg(jsonb_build_object(
    'tracking_token', o.tracking_token,
    'trade', o.trade,
    'services', o.services,
    'governorate', o.governorate,
    'area', o.area,
    'address', o.address,
    'status', o.status,
    'created_at', o.created_at,
    'service_base_amount', o.service_base_amount,
    'total_amount', o.total_amount
  ) order by o.created_at desc), '[]'::jsonb)
  from public.service_orders o
  cross join customer_identity customer
  where customer.user_id is not null
    and (
      o.customer_user_id = customer.user_id
      or (
        length(customer.phone_suffix) = 10
        and right(regexp_replace(coalesce(o.phone, ''), '[^0-9]', '', 'g'), 10) = customer.phone_suffix
      )
    );
$$;

revoke all on function public.get_customer_orders() from public;
grant execute on function public.get_customer_orders() to authenticated;

create or replace function public.get_accepted_order_contact(p_match_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
select jsonb_build_object(
  'customer_phone', o.phone
)
  from public.service_order_matches m
  join public.service_orders o on o.id = m.order_id
  join public.professionals p on p.id = m.professional_id
  where m.id = p_match_id
    and m.status = 'accepted'
    and o.accepted_professional_id = p.id
    and p.user_id = auth.uid()
    and p.status = 'مقبول';
$$;

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
     or new.service_base_amount is distinct from old.service_base_amount
     or new.deposit_status is distinct from old.deposit_status
     or new.payment_status is distinct from old.payment_status
     or new.final_payment_status is distinct from old.final_payment_status then
    perform realtime.send(
      jsonb_build_object(
        'status', new.status,
        'estimated_arrival_minutes', new.estimated_arrival_minutes,
        'order_id', new.id,
        'deposit_status', new.deposit_status,
        'payment_status', new.payment_status
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

create or replace function public.broadcast_service_inquiry_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  selected_order uuid;
begin
  selected_order := coalesce(new.order_id, old.order_id);
  perform realtime.send(
    jsonb_build_object('order_id', selected_order),
    'inquiry_updated',
    'service-inquiry:' || selected_order::text,
    false
  );
  return new;
end;
$$;

drop trigger if exists broadcast_service_inquiry_message on public.service_inquiry_messages;
create trigger broadcast_service_inquiry_message
after insert on public.service_inquiry_messages
for each row execute function public.broadcast_service_inquiry_update();

drop trigger if exists broadcast_service_price_offer on public.service_price_offers;
create trigger broadcast_service_price_offer
after insert or update on public.service_price_offers
for each row execute function public.broadcast_service_inquiry_update();

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.get_available_professionals_for_order(p_tracking_token uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(
    jsonb_build_object('id', p.id, 'name', p.name, 'trade', p.trade)
    order by p.name
  ), '[]'::jsonb)
  from public.service_orders o
  join public.service_order_matches m on m.order_id = o.id
  join public.professionals p on p.id = m.professional_id
  where o.tracking_token = p_tracking_token
    and o.status = 'قيد المراجعة'
    and p.status = 'مقبول'
    and p.presence_updated_at > now() - interval '75 seconds';
$$;

drop view if exists public.available_professionals;
create view public.available_professionals
with (security_invoker = true)
as
select id, name, trade, governorate, area
from public.professionals
where status = 'مقبول'
  and presence_updated_at > now() - interval '75 seconds';

create or replace function public.get_admin_service_orders()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(
    to_jsonb(o) || jsonb_build_object('professional_name', professional.name)
    order by o.created_at desc
  ), '[]'::jsonb)
  from public.service_orders o
  left join public.professionals professional
    on professional.id = coalesce(
      o.accepted_professional_id,
      (
        select accepted_match.professional_id
        from public.service_order_matches accepted_match
        where accepted_match.order_id = o.id and accepted_match.status = 'accepted'
        order by accepted_match.accepted_at desc nulls last
        limit 1
      )
    )
  where public.is_admin();
$$;

create or replace function public.get_admin_professionals()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(to_jsonb(p) order by p.created_at desc), '[]'::jsonb)
  from public.professionals p
  where public.is_admin();
$$;

create or replace function public.get_admin_chat_logs()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(to_jsonb(log) order by log.created_at desc), '[]'::jsonb)
  from (
    select
      msg.order_id,
      o.customer_name,
      o.trade || ' — ' || coalesce(o.services::text, '') as service,
      p.name as professional_name,
      msg.sender_role,
      msg.message,
      msg.created_at
    from public.service_inquiry_messages msg
    join public.service_orders o on o.id = msg.order_id
    join public.service_order_matches m on m.id = msg.match_id
    join public.professionals p on p.id = m.professional_id
    where public.is_admin()
    order by msg.created_at desc
    limit 500
  ) log;
$$;

grant select on public.available_professionals to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
revoke select on public.service_orders from anon, authenticated;
grant select (
  id, tracking_token, customer_name, trade, services, governorate, area, address,
  location_latitude, location_longitude, proposed_price, details, payment_method, payment_receipt_path, transaction_id, deposit_status,
  final_payment_receipt_path, final_transaction_id, final_payment_status,
  cash_location_details, area_size_sqm, status, payment_status, total_amount,
  service_base_amount, customer_service_fee, admin_commission, professional_net, accepted_professional_id,
  estimated_arrival_minutes, created_at
) on public.service_orders to authenticated;
grant insert, update, delete on public.service_orders to authenticated;
grant insert on public.service_orders to anon;
revoke select on public.professionals from anon, authenticated;
revoke select (phone, payout_account) on public.professionals from anon, authenticated;
grant select (id, name, trade, experience, governorate, area, user_id, status, created_at)
  on public.professionals to authenticated;
grant insert, update, delete on public.professionals to authenticated;
grant insert on public.professionals to anon;
grant select (id, name, trade, governorate, area, status) on table public.professionals to anon;
grant select (id, name, trade, governorate, area, status, presence_updated_at) on table public.professionals to anon, authenticated;
grant select, update on public.service_order_matches to authenticated;
revoke all on function public.claim_professional_account() from public;
revoke all on function public.accept_service_order(uuid, integer) from public;
revoke all on function public.accept_service_order(uuid, integer) from anon, authenticated;
revoke all on function public.complete_service_order(uuid) from public;
revoke all on function public.start_service_order_travel(uuid) from public;
revoke all on function public.submit_order_deposit(uuid, text, text) from public;
revoke all on function public.confirm_order_delivery(uuid, text, text) from public;
revoke all on function public.get_accepted_order_contact(uuid) from public;
revoke all on function public.get_admin_service_orders() from public;
revoke all on function public.get_admin_professionals() from public;
revoke all on function public.get_admin_chat_logs() from public;
revoke all on function public.get_service_inquiry(uuid) from public;
revoke all on function public.get_available_professionals_for_order(uuid) from public;
revoke all on function public.coordinates_within_radius_meters(numeric, numeric, numeric, numeric, integer) from public, anon, authenticated;
revoke all on function public.get_professional_inquiry(uuid) from public;
revoke all on function public.filter_inquiry_message(text) from public;
revoke all on function public.set_professional_presence(boolean) from public;
revoke all on function public.send_customer_inquiry_message(uuid, uuid, text) from public;
revoke all on function public.send_professional_inquiry_message(uuid, text) from public;
revoke all on function public.submit_service_price_offer(uuid, numeric, integer, text) from public;
revoke all on function public.accept_service_price_offer(uuid, uuid) from public;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.claim_professional_account() to authenticated;
grant execute on function public.complete_service_order(uuid) to authenticated;
grant execute on function public.start_service_order_travel(uuid) to authenticated;
grant execute on function public.submit_order_deposit(uuid, text, text) to anon, authenticated;
grant execute on function public.confirm_order_delivery(uuid, text, text) to anon, authenticated;
grant execute on function public.get_accepted_order_contact(uuid) to authenticated;
grant execute on function public.get_admin_service_orders() to authenticated;
grant execute on function public.get_admin_professionals() to authenticated;
grant execute on function public.get_admin_chat_logs() to authenticated;
grant execute on function public.get_service_inquiry(uuid) to anon, authenticated;
grant execute on function public.get_available_professionals_for_order(uuid) to anon, authenticated;
grant execute on function public.get_professional_inquiry(uuid) to authenticated;
grant execute on function public.set_professional_presence(boolean) to authenticated;
grant execute on function public.send_customer_inquiry_message(uuid, uuid, text) to anon, authenticated;
grant execute on function public.send_professional_inquiry_message(uuid, text) to authenticated;
grant execute on function public.submit_service_price_offer(uuid, numeric, integer, text) to authenticated;
grant execute on function public.accept_service_price_offer(uuid, uuid) to anon, authenticated;
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
drop policy if exists "Users insert own profile" on public.profiles;
create policy "Users insert own profile" on public.profiles
  for insert to authenticated
  with check (id = (select auth.uid()));
drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));
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
    and (customer_user_id is null or customer_user_id = (select auth.uid()))
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
create index if not exists professionals_presence_updated_at_idx on public.professionals (presence_updated_at desc)
  where status = 'مقبول';
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

do $$
begin
  alter publication supabase_realtime add table public.professionals;
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

-- Customer and professional accounts use a phone-derived internal email alias for password auth;
-- disable Supabase email confirmations because the @app.local alias cannot receive mail.
-- Password recovery by SMS still requires a configured phone provider and a verified Auth phone.
