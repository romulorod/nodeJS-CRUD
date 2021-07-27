create schema blog
create table blog.post (
    id serial primary key,
    title NOT NULL,
    content text NOT NULL,
    date timestamp default now(),
)