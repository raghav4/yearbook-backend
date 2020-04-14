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

const UserPoll = mongoose.model('UserPoll', userPollsSchema);

function validateUserPolls(userPoll) {
  const schema = Joi.object({
    questionId: Joi.objectId().required(),
    userId: Joi.objectId().required(),
    votedForId: Joi.objectId().required(),
  });

  return schema.validate(userPoll);
}

exports.UserPoll = UserPoll;
exports.validate = validateUserPolls;
