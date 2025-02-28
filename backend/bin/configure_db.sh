#!/bin/bash

export PGPASSWORD='node_password'

echo "Configuring dragonstackdb"

dropdb -U node_user dragonstackdb
createdb -U node_user dragonstackdb

psql -U node_user dragonstackdb < ./bin/sql/account.sql
psql -U node_user dragonstackdb < ./bin/sql/game.sql
psql -U node_user dragonstackdb < ./bin/sql/gameValue.sql
psql -U node_user dragonstackdb < ./bin/sql/gameMember.sql
psql -U node_user dragonstackdb < ./bin/sql/gameMemberData.sql

#node ./bin/insertTraits.js

echo "dragonstackdb configured"


