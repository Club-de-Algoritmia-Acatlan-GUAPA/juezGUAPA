-- Add migration script here
create extension if not exists "uuid-ossp";

create table users(
    user_id       uuid primary key default uuid_generate_v1mc(),
    username      text  unique not null,
    email         text  unique not null,
    password_hash text not null,
    is_validated boolean not null default false,
    created_at    timestamptz  not null default now(),
);

