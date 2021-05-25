/* eslint-disable no-console */
require('dotenv').config();
const config = require('config');
const express = require('express');

const app = express();

if (!config.get('jwtPrivateKey')) {
  console.log('jwtPrivateKey is not defined');
  process.exit(1);
}
require('./startup/logging')(app);
require('./startup/db')();
require('./startup/routes')(app);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));

module.exports = server;
 