const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const Vote = mongoose.model(
  'Vote',
  new mongoose.Schema({
    titleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  }),
);

// exports.Vote = Vote;
module.exports = Vote;
