require('express-async-errors');
const path = require('path');
const morgan = require('morgan');
const winston = require('winston');
const rfs = require('rotating-file-stream');
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

module.exports = (app) => {
  if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
  }
  const accessLogStream = rfs.createStream('access.log', {
    interval : '1d',
    path : path.join(__dirname, '../logs/api_hits'),
  });
  app.use(morgan('combined', {stream : accessLogStream}));

  winston.exceptions.handle(
      new winston.transports.Console({colorize : true, prettyPrint : true}),
      new winston.transports.DailyRotateFile({
        name : 'file',
        datePattern : '.yyyy-MM-ddTHH',
        filename : './logs/custom_%DATE%.log',
      }),
  );
  process.on('unhandledRejection', (ex) => { throw ex; });
};
