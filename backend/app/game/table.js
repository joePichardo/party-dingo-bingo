const pool = require('../../databasePool');

class GameTable {
  static storeGame(game) {
    const { birthdate, nickname, isPublic, buyValue, potValue, ownerId } = game;

    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO game(birthdate, nickname, "isPublic", "buyValue", "potValue", "ownerId") 
        VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
        [birthdate, nickname, isPublic, buyValue, potValue, ownerId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve(response.rows[0]);
        }
      )
    });
  }

  static getGame({ gameId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, birthdate, nickname, "isPublic", "buyValue", "potValue", "ownerId"
        FROM game
        WHERE game.id = $1`,
        [gameId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          if (response.rows.length === 0) {
            return reject(new Error('no game'));
          }

          resolve(response.rows[0]);
        }
      )
    });
  }

  static getGameOwner({ ownerId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT username
        FROM account
        WHERE account.id = $1`,
        [ownerId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          if (response.rows.length === 0) {
            return reject(new Error('no account found'));
          }

          resolve(response.rows[0]);
        }
      )
    });
  }

  static getOwnerGames({ ownerId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, birthdate, nickname, "isPublic", "buyValue", "potValue"
        FROM game
        WHERE "ownderId" = $1`,
        [ownerId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          if (response.rows.length === 0) {
            return reject(new Error('no game'));
          }

          resolve(response.rows[0]);
        }
      )
    });
  }

  static updateGame({ gameId, nickname, isPublic, buyValue, ownerId }) {
    const settingsMap = { nickname, isPublic, buyValue, ownerId };

    const validQueries = Object.entries(settingsMap).filter(([settingKey, settingValue]) => {
      // console.log('settingKey', settingKey, 'settingValue', settingValue);

      if (settingValue !== undefined) {
        return new Promise((resolve, reject) => {
          pool.query(
            `UPDATE game SET "${settingKey}" = $1 WHERE id = $2`,
            [settingValue, gameId],
            (error, response) => {
              if (error) {
                return reject(error);
              }

              resolve();
            }
          );
        });
      }
    });

    return Promise.all(validQueries);
  }

  static updatePotValue({ gameId, value }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE game SET "potValue" = "potValue" + $1 WHERE id = $2',
        [value, gameId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve();
        }
      )
    });
  }
}

module.exports = GameTable;