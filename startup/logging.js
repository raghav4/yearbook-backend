#!/usr/bin/env node

require('dotenv').config();
require('express-async-errors');
const winston = require('winston');
const morgan = require('morgan');

module.exports = (app) => {
  app.use(morgan('tiny'));
  winston.exceptions.handle(
      new winston.transports.Console({colorize : true, prettyPrint : true}),
      new winston.transports.File({filename : 'uncaughtExceptions.log'}),
  );
  process.on('unhandledRejection', (ex) => { throw ex; });
};
