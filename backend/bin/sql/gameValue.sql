CREATE TABLE gameValue(
    "gameId"    INTEGER REFERENCES game(id),
    "itemId"   INTEGER NOT NULL,
    "textValue" VARCHAR(140),
    PRIMARY KEY ("gameId", "itemId")
);
