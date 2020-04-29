CREATE TABLE gameValue(
    "gameId"    INTEGER NOT NULL,
    "itemId"   INTEGER NOT NULL,
    "textValue" VARCHAR(140),
    PRIMARY KEY ("gameId", "itemId"),
    FOREIGN KEY ("gameId") REFERENCES game(id) ON DELETE CASCADE
);
