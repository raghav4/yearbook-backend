require('dotenv').config();
const express = require('express');

const app = express();
const winston = require('winston');

if (!process.env.jwtPrivateKey) {
  // eslint-disable-next-line no-console
  console.error('jwtPrivateKey is not defined');
  process.exit(1);
}
require('./startup/logging')(app);
require('./startup/db')();
require('./startup/cloudinary')();
require('./startup/routes')(app);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => winston.info(`Listening on PORT ${PORT}...`));

module.exports = server;
