const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const answerSchema = new mongoose.Schema({
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
});

const Answer = mongoose.model('Answer', answerSchema);

function validateAnswer(answer) {
  const schema = Joi.object({
    answer: Joi.string(),
    questionId: Joi.objectId().required(),
    userId: Joi.objectId().required(),
  });
  return schema.validate(answer);
}

exports.Answer = Answer;
exports.validate = validateAnswer;
