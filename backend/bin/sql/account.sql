CREATE TABLE account(
    id             SERIAL PRIMARY KEY,
    "usernameHash" CHARACTER(64),
    "passwordHash" CHARACTER(64),
    "sessionId"    CHARACTER(36),
    email          CHARACTER(70),
    "firstName"    CHARACTER(50),
    "lastName"     CHARACTER(50),
    balance        INTEGER NOT NULL
);