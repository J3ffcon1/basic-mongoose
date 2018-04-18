
/* eslint no-console: off */
const http = require('http');
const app = require('./lib/app')
;const connect = require('./lib/connect');

//env name "PORT" utilized by heroku
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'MONGODB_URI=mongodb://localhost:27017/videogames-test';

connect(MONGODB_URI);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('server is running on', server.address().port);
});