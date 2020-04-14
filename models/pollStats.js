const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const PollStatsSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  votedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  votedFor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  voteCountsByPerson: {
    type: Number,
    required: true,
  },
});

const PollStats = mongoose.model('PollStats', PollStatsSchema);

function validatePollStats(poll) {
  const schema = Joi.object({
    questionId: Joi.objectId().required(),
    votedBy: Joi.objectId().required(),
    votedFor: Joi.objectId().required(),
    voteCountsByPerson: Joi.number(),
  });

  return schema.validate(poll);
}

exports.PollStats = PollStats;
exports.validate = validatePollStats;
