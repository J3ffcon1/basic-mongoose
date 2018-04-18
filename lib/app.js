const express = require('express');
const app = express();
const mmorpg = require('./routes/videogame-route');

app.use(express.json());

app.use('/videogames', mmorpg);

module.exports = app;