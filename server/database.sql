CREATE DATABASE pern_jwt;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- set extension
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- insert fake users
INSERT INTO
    users (username, user_email, password)
VALUES
    ('sammy', 'samm@gmail.com', '$2b$10');