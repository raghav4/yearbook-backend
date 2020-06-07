require('express-async-errors');
const morgan = require('morgan');
const winston = require('winston');
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

module.exports = (app) => {
  if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
  }
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.DailyRotateFile({
      name: 'file',
      datePattern: '.yyyy-MM-ddTHH',
      filename: './logs/custom_%DATE%.log',
    }),
  );
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
};
