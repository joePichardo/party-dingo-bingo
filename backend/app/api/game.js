const { Router } = require('express');
const Game = require('../game/index');
const GameTable = require('../game/table');
const GameMemberTable = require('../gameMember/table');
const AccountTable = require('../account/table');
const { authenticatedAccount } = require('./helper');
const { getPublicGames } = require('../game/helper');

const router = new Router();

router.get('/new', (req, res, next) => {
  let accountId, game;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      accountId = account.id;

      game = new Game({ ownerId: accountId });

      return GameTable.storeGame(game);
    })
    .then(() => res.json({ game }))
    .catch(error => next(error));

});

router.put('/update', (req, res, next) => {
  let accountId;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      accountId = account.id;

      const { gameId } = req.body;

      return GameTable.getGame({ gameId });
    })
    .then(game => {

      if (accountId !== game.ownerId) {
        throw new Error("You don't own this game.");
      }

      const { gameId, nickname, isPublic, buyValue } = req.body;

      return GameTable.updateGame({ gameId, nickname, isPublic, buyValue });
    })
    .then(() => res.json({ message: 'successfully updated game' }))
    .catch(error => next(error));
});

router.get('/public-games', (req, res, next) => {
  getPublicGames()
    .then(({ games }) => res.json({ games }))
    .catch(error => next(error));
});

router.get('/:id/owner', (req, res, next) => {
  const ownerId = req.params.id;

  GameTable.getGameOwner({ ownerId })
    .then(({ username }) => res.json({ username }))
    .catch(error => next(error));
});

router.post('/buy', (req, res, next) => {
  const { gameId, buyValue } = req.body;
  let buyerId;

  GameTable.getGame({ gameId })
    .then(game => {
      if (game.buyValue !== buyValue) {
        throw new Error('Buy value is not correct');
      }

      if (!game.isPublic) {
        throw new Error('Game must be public');
      }

      return authenticatedAccount({ sessionString: req.cookies.sessionString });
    })
    .then(({ account, authenticated }) => {
      if (!authenticated) {
        throw new Error('Unauthenticated');
      }

      if (buyValue > account.balance) {
        throw new Error('Buy value exceeds balance');
      }

      buyerId = account.id;

      return GameMemberTable.getGameMember({ gameId, accountId: buyerId });
    })
    .then(({ accountId }) => {
      if (accountId === buyerId) {
        throw new Error('Cannot buy into game again!');
      }

      return Promise.all([
        AccountTable.updateBalance({
          accountId: buyerId,
          value: -buyValue
        }),
        GameTable.updatePotValue({
          gameId: gameId,
          value: buyValue
        }),
        GameMemberTable.storeGameMember({
          gameId,
          accountId: buyerId
        })
      ])
    })
    .then(() => res.json({ message: 'success!' }))
    .catch(error => next(error));
});


module.exports = router;