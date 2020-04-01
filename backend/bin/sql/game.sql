CREATE TABLE game(
    id              SERIAL PRIMARY KEY,
    birthdate       TIMESTAMP NOT NULL,
    nickname        VARCHAR(64),
    "isPublic"      BOOLEAN NOT NULL,
    "buyValue"      INTEGER NOT NULL,
    "ownerId"       INTEGER,
    FOREIGN KEY ("ownerId") REFERENCES account(id)
);