const mongoose = require('mongoose');

const Poll = mongoose.model(
  'Poll',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
  }),
);

exports.Poll = Poll;
