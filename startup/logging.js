const morgan = require('morgan');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = (app) => {
  app.use(morgan('tiny'));
};
