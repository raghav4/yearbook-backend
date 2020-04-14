const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const PollsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
});

const Poll = mongoose.model('Poll', PollsSchema);

function validatePolls(poll) {
  const schema = Joi.object({
    question: Joi.string().min(5).required(),
  });
  return schema.validate(poll);
}

exports.Poll = Poll;
exports.validate = validatePolls;
