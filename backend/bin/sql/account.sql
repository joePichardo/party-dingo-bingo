CREATE TABLE account(
    id             SERIAL PRIMARY KEY,
    username       VARCHAR(25),
    "usernameHash" CHARACTER(64),
    "passwordHash" CHARACTER(64),
    "sessionId"    CHARACTER(36),
    email          VARCHAR(70),
    "firstName"    VARCHAR(50),
    "lastName"     VARCHAR(50),
    balance        INTEGER NOT NULL
);