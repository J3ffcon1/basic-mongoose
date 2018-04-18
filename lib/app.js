const express = require('express');
const app = express();
const mmorpg = require('./routes/videogame-route');

app.use(express.json());

app.use('/pirates', mmorpg);

module.exports = app;