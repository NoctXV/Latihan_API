CREATE database latihanapi;

CREATE table events (
    id bigserial primary key,
    event_name varchar(255) not null,
    organizer_name varchar(255) not null,
    event_date varchar(255) not null,
    is_registered boolean not null
);