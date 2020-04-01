CREATE TABLE gameMember(
    "gameId"      INTEGER REFERENCES game(id),
    "accountId"   INTEGER REFERENCES account(id),
    PRIMARY KEY ("gameId", "accountId")
);