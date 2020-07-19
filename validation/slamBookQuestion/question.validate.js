const Joi = require('@hapi/joi');

module.exports = (question) => {
  const schema = Joi.object({
    question : Joi.string().min(10).label('Question').required(),
  });

  return schema.validate(question);
};
