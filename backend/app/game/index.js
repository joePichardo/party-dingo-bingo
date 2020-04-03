
const DEFAULT_PROPERTIES = {
  gameId: undefined,
  nickname: 'unnamed',
  isPublic: false,
  buyValue: 0,
  potValue: 0,
  ownerId: undefined,
  get birthdate() {
    return new Date()
  }
};

class Game {
  constructor({
                gameId,
                birthdate,
                nickname,
                isPublic,
                buyValue,
                potValue,
                ownerId
              } = {}) {
    this.gameId = gameId || DEFAULT_PROPERTIES.gameId;
    this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.isPublic = isPublic || DEFAULT_PROPERTIES.isPublic;
    this.buyValue = buyValue || DEFAULT_PROPERTIES.buyValue;
    this.potValue = potValue || DEFAULT_PROPERTIES.potValue;
    this.ownerId = ownerId || DEFAULT_PROPERTIES.ownerId;
  }
}

module.exports = Game;