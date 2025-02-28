# party-dingo-bingo

###Add request function
- Request feature
- Bug Fix request
>Add account ID, get email in account table

### Add email to account table
- Use Firebase to authenticate account

### On GameValues on Account Games
- Show thumbs up or down if update was successful
- Same thing with delete button

## Fix List
- Fix saving game on account games, going home, then going back to account games. Currently doesn't show correct updated game

##To Debug Node.js
- Use command in terminal `node --inspect bin/server.js ` to run the backend in debug mode
- Run the front end

## On lightsail server production

Root folder `/opt/bitnami/apps/firstapp`

This is to change port 80 (http) to something else - changed to port 8080 so we can run app on port 80
> vim /opt/bitnami/apache2/conf/httpd.conf


This is to change port 80 (http) to something else - changed to port 8080 so we can run app on port 80
> vim /opt/bitnami/apache2/conf/bitnami/bitnami.conf


This is to restart after updating server settings
> sudo /opt/bitnami/ctlscript.sh restart apache

On NPM 
> npm install -g parcel
>
> npm install -g nodemon
>
> npm install -g foreman

Procfile
> frontend: parcel ./frontend/src/index.html --port 80

On Frontend
- Update `/frontend/src/config.js`
```js
const BACKEND = {
  ADDRESS: 'http://web.address.here:3000'
};

export { BACKEND };
```

On Backend
- Add `/secrets/` folder with `databaseConfiguration.js`

```js
module.exports = {
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5432
};
``` 

and `index.js` 

```js
const APP_SECRET = 'secretString';

module.exports = { APP_SECRET };
```

- Inside `backend/app/index.js` change url `localhost:1234` to frontend address url
```js
app.use(cors({ origin: 'http://web.address.here', credentials: true }));
```

- Make sure you deploy `.sql` queries on database, using `pgAdmin`

- Use `npm run start` on root to start server

- For local database, run `psql -U node_user dragonstackdb` to login

- `/backend/app/api/helper.js` update with secure uncommented

```js
const setSessionCookie = ({ sessionString, res}) => {
  res.cookie('sessionString', sessionString, {
    expire: Date.now() + 3600000,
    httpOnly: true,
    secure: true // use with https
  });
};
```

- `/frontend/src/config.js` add https to url

- `/backend/app/index.js` add https to url

- Use frontend port 443 for https

On backend file

- `/backend/bin/server.js`

```js
const app = require('../app');
var fs = require('fs');
var https = require('https');

const port = 3000;

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(port, () => console.log(`listen on port ${port}`));
```

### To run the frontend
- Use command `sudo pm2 start npm --name frontend -- run frontend` based on `pm2 start npm --name "{app_name}" -- run {script_name}`

#### If running backend/frontend on separate servers
- Run on port 80 on their respective servers 