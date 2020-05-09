CREATE TABLE gameMemberData(
    "gameId"      INTEGER REFERENCES game(id),
    "itemId"     INTEGER NOT NULL,
    "accountId"   INTEGER REFERENCES account(id),
    "positionId"  INTEGER NOT NULL,
    PRIMARY KEY ("gameId", "itemId", "accountId"),
    FOREIGN KEY ("gameId", "itemId") REFERENCES gameValue("gameId", "itemId")
);
