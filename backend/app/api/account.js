const { Router } = require('express');
const AccountTable = require('../account/table');
const AccountDragonTable = require('../accountDragon/table');
const Session = require('../account/session');
const { hash } = require('../account/helper');
const { setSession, authenticatedAccount } = require('./helper');
const { getDragonWithTraits } = require('../dragon/helper');

const router = new Router();

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  var minNumberofChars = 8;
  var maxNumberofChars = 16;
  console.log(password);
  var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

  // (?=.*\d)           // should contain at least one digit
  // (?=.*[!@#$%^&*])   // should contain at least one special character
  // (?=.*[a-z])        // should contain at least one lower case
  // (?=.*[A-Z])        // should contain at least one upper case
  // .{8,16}  // should contain at least 8-16 from the mentioned characters

  if(password.length < minNumberofChars || password.length > maxNumberofChars){
    const error = new Error('Password must have 8-16 characters');
    error.statusCode = 409;
    throw error;
  }

  if(!regularExpression.test(password)) {
    const error = new Error('Password should contain at least one digit, one lowercase character, one uppercase character, and one special character (!@#$%^&*)');
    error.statusCode = 409;
    throw error;
  }

  const usernameHash = hash(username);
  const passwordHash = hash(password);

  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      if (!account) {
        return AccountTable.storeAccount({ usernameHash, passwordHash });
      } else {
        const error = new Error('This username has already been taken');

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      return setSession({ username, res });
    })
    .then(({ message }) => {
      res.json({ message })
    })
    .catch(error => next(error));
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  AccountTable.getAccount({ usernameHash: hash(username) })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        const { sessionId } = account;

        return setSession({ username, res, sessionId });
      } else {
        const error = new Error('Incorrect username/password');

        error.statusCode = 409;

        throw error;
      }
    })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch(error => next(error));
});

router.get('/logout', (req, res, next) => {
  const { username } = Session.parse(req.cookies.sessionString);

  AccountTable.updateSessionId({
    sessionId: null,
    usernameHash: hash(username)
  })
    .then(() => {
      res.clearCookie('sessionString');

      res.json({ message: 'Successful logout' })
    })
    .catch(error => next(error));
});

router.get('/authenticated', (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ authenticated }) => res.json({ authenticated }))
    .catch(error => next(error));
});

router.get('/dragons', (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      return AccountDragonTable.getAccountDragons({
        accountId: account.id
      })
    })
    .then(({ accountDragons }) => {
      return Promise.all(
        accountDragons.map(accountDragon => {
          return getDragonWithTraits({ dragonId: accountDragon.dragonId })
        })
      );
    })
    .then(dragons => {
      res.json({ dragons });
    })
    .catch(error => next(error));
});

router.get('/info', (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account, username }) => {
      res.json({ info: { balance: account.balance, username } });
    })
    .catch(error => next(error));
});

module.exports = router;