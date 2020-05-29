const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const userPollsSchema = new mongoose.Schema({
  questionId: {
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
});

const Vote = mongoose.model('Vote', userPollsSchema);

module.exports = Vote;
