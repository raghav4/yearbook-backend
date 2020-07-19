const mongoose = require('mongoose');

module.exports = mongoose.model(
  'slamBookQuestion',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
  }),
);
