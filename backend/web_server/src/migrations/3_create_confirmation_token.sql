create table confirmation_tokens(
   confirmation_token text not null,
   user_id uuid not null references users (user_id),
   primary key (confirmation_tokens)
);
