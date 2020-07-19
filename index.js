require('dotenv').config();
const debug = require('debug')('app:startup');
const config = require('config');
const express = require('express');

const app = express();

if (!config.get('jwtPrivateKey')) {
  debug('jwtPrivateKey is not defined');
  process.exit(1);
}
require('./startup/logging')(app);
require('./startup/db')();
require('./startup/routes')(app);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => debug(`Listening on PORT ${PORT}...`));

module.exports = server;
