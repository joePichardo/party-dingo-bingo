const pool = require('../../databasePool');

class GameTable {
  static storeGame(game) {
    const { birthdate, nickname, isPublic, buyValue, ownerId } = game;

    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO game(birthdate, nickname, "isPublic", "buyValue", "ownerId") 
        VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
        [birthdate, nickname, isPublic, buyValue, ownerId],
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
        `SELECT birthdate, nickname, "isPublic", "buyValue", "ownerId"
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

  static getOwnerGames({ ownerId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, birthdate, nickname, "isPublic", "buyValue"
        FROM game
        WHERE "ownderId" = $1`,
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
}

module.exports = GameTable;