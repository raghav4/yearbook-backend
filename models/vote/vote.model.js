const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Vote',
  new mongoose.Schema({
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    votedForId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  }),
);
