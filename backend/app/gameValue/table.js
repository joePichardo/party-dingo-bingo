const pool = require('../../databasePool');

class GameValueTable {
  static storeGameValue(gameValue) {
    const { gameId, itemId, textValue } = gameValue;

    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO gameValue("gameId", "itemId", "textValue") 
        VALUES($1, $2, $3) RETURNING id`,
        [gameId, itemId, textValue],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve(response.rows[0]);
        }
      )
    });
  }

  static getGameValues({ gameId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT "itemId", "textValue"
        FROM gameValue
        WHERE "gameId" = $1`,
        [gameId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          if (response.rows.length === 0) {
            return reject(new Error('no game values'));
          }

          resolve(response.rows);
        }
      )
    });
  }

  static updateGameValue({ gameId, itemId, textValue }) {
    const settingsMap = { textValue };

    const validQueries = Object.entries(settingsMap).filter(([settingKey, settingValue]) => {
      // console.log('settingKey', settingKey, 'settingValue', settingValue);

      if (settingValue !== undefined) {
        return new Promise((resolve, reject) => {
          pool.query(
            `UPDATE game SET "${settingKey}" = $1 WHERE "gameId" = $2 AND "itemId" = $3;`,
            [settingValue, gameId, itemId],
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

module.exports = GameValueTable;