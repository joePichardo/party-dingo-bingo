const pool = require('../../databasePool');

class GameMemberTable {
  static storeGameMember({ gameId, accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO gameMember("gameId", "accountId") VALUES($1, $2)',
        [gameId, accountId],
        (error, response) => {
          if (error) {
            return error
          }

          resolve();
        }
      );
    })
  }

  static getGameMember({ gameId, accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT "accountId" FROM gameMember WHERE "gameId" = $1 AND "accountId" = $2',
        [gameId, accountId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve({ accountId: response.rows[0].accountId });
        }
      )
    })
  }

  static getGameMembers({ gameId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT "accountId" FROM gameMember WHERE "gameId" = $1',
        [gameId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve({ gameMembers: response.rows });
        }
      )
    })
  }

  static getMemberGames({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT "gameId" FROM gameMember WHERE "accountId" = $1',
        [accountId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve({ games: response.rows });
        }
      )
    })
  }

}

module.exports = GameMemberTable;