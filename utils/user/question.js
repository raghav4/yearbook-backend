const Joi = require('@hapi/joi');

exports.validateQuestion = (question) => {
  const schema = Joi.object({
    question: Joi.string().min(2).label('Question').required(),
  });

  return schema.validate(question);
};
