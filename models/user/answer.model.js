const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Answer',
  new mongoose.Schema({
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answer: {
      type: String,
    },
  }),
);
