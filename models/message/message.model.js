const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Message',
  new mongoose.Schema({
    sendTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    friendShipRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
      // required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }),
);
