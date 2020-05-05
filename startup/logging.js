#!/usr/bin/env node

require('dotenv').config();
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const morgan = require('morgan');

module.exports = (app) => {
  app.use(morgan('tiny'));
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
  );
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  winston.add(
    new winston.transports.MongoDB({
      db: 'mongodb://localhost/vidly',
      level: 'error',
      useNewUrlParser: true,
    }),
  );
};
