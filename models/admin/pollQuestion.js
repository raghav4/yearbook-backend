const mongoose = require('mongoose');

const PollQuestion = mongoose.model(
  'PollQuestion',
  new mongoose.Schema({
    question: {
      type: String,
      required: true,
    },
  }),
);

exports.PollQuestion = PollQuestion;
