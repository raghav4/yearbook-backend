const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.ObjectId(),
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
  });
  return schema.validate(answer);
}

exports.Answer = Answer;
exports.validate = validateAnswer;
