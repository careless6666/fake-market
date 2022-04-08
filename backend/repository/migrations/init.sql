create table "user"
(
    id         bigserial
        constraint user_pk
            primary key,
    first_name text,
    last_name  text,
    password   text not null,
    email      text not null
);

create unique index user_email_uindex
    on "user" (email);

create unique index user_id_uindex
    on "user" (id);

