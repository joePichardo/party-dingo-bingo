const pool = require('../../databasePool');

class GameMemberDataTable {
  static storeGameMemberData({ gameId, itemId, accountId, positionId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO gameMemberData("gameId", "itemId", "accountId", "positionId") VALUES($1, $2)',
        [gameId, itemId, accountId, positionId],
        (error, response) => {
          if (error) {
            return error
          }

          resolve();
        }
      );
    })
  }

  static getGameMemberData({ gameId, accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT "itemId", "positionId" FROM gameMemberData WHERE "gameId" = $1 AND "accountId" = $2',
        [gameId, accountId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve({ gameMemberData: response.rows });
        }
      )
    })
  }

  static updateGameMemberData({ gameId, itemId, accountId, positionId }) {
    const settingsMap = { positionId };

    const validQueries = Object.entries(settingsMap).filter(([settingKey, settingValue]) => {
      // console.log('settingKey', settingKey, 'settingValue', settingValue);

      if (settingValue !== undefined) {
        return new Promise((resolve, reject) => {
          pool.query(
            `UPDATE gameMemberData SET "${settingKey}" = $1 WHERE "gameId" = $2 AND "itemId" = $3 AND "accountId" = $4;`,
            [settingValue, gameId, itemId, accountId],
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

module.exports = GameMemberDataTable;