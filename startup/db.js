#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {
  const dbURI = process.env.DB_URI;
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(() => console.error('Failed to connect to MongoDB..'));
};
