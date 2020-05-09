const Joi = require('@hapi/joi');

const validateUserAnswer = (user) => {
  const schema = Joi.object({
    answer: Joi.string(),
    questionId: Joi.objectId().required(),
  });
  return schema.validate(user);
};

exports.validateUserAnswer = validateUserAnswer;
