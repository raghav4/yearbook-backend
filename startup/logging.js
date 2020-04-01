const morgan = require('morgan');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function(app) {
  app.use(morgan('tiny'));
  // winston.handleExceptions(
  //   new winston.transports.Console({
  //     colorize: true,
  //     prettyPrint: true,
  //   }),
  //   new winston.transports.File({
  //     filename: 'uncaughtExceptions.log',
  //   })
  // );
  // process.on('unhandledRejection', ex => {
  //   throw ex;
  // });

  // winston.add(winston.transports.File, {
  //   filename: 'logfile.log',
  // });
  // winston.add(winston.transports.MongoDB, {
  //   db: 'mongodb://localhost/yearbook',
  //   level: 'info',
  // });
};
