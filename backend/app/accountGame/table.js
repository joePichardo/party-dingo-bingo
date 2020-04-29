const pool = require('../../databasePool');

class AccountGameTable {

  static getAccountGames({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, birthdate, nickname, "isPublic", "buyValue", "potValue", "ownerId"
        FROM game
        WHERE "ownerId" = $1`,
        [accountId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve(response.rows);
        }
      )
    });
  }

}

module.exports = AccountGameTable;