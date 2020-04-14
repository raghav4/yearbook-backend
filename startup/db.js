#!/usr/bin/env node

require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {
  const dbURI =
    'mongodb+srv://sample_user:sampleuser123@cluster0-daqug.mongodb.net/test?retryWrites=true&w=majority';
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to MongoDB, URL = ${dbURI}...`))
    .catch(err => console.error('Failed to connect to MongoDB...'));
};
