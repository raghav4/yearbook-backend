/* eslint-disable no-console */
const config = require('config');
const mongoose = require('mongoose');

module.exports = () => {
  try {
    mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected to MongoDB..');
  } catch (ex) {
    console.log(ex);
  }
};
