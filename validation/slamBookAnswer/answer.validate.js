const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = (user) => {
  const schema = Joi.object({
    answer : Joi.string().label('Answer'),
    questionId : Joi.objectId().label('Question ID').required(),
  });

  return schema.validate(user);
};
