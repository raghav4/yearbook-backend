const debug = require('debug')('app:db');
const config = require('config');
const mongoose = require('mongoose');

module.exports = () => {
  try {
    mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser : true,
      useUnifiedTopology : true,
      useCreateIndex : true,
      useFindAndModify : false,
    });
    debug('Connected to MongoDB..');
  } catch (ex) {
    debug(ex);
  }
};
