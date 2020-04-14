const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
});

const Question = mongoose.model('Question', questionSchema);

function validateQuestion(question) {
  const schema = Joi.object({
    question: Joi.string()
      .min(2)
      .required(),
  });

  return schema.validate(question);
}

exports.Question = Question;
exports.validate = validateQuestion;
