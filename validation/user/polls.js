const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const validateUserPolls = (user) => {
  const schema = Joi.object({
    userId: Joi.objectId().label('Voted By ID').required(),
    questionId: Joi.objectId().label('Question ID').required(),
    votedForId: Joi.objectId().label('ID of Voted Person').required(),
  });

  return schema.validate(user);
};

exports.validateUserPolls = validateUserPolls;
