const Joi = require('@hapi/joi');

const validateUserPolls = (user) => {
  const schema = Joi.object({
    questionId : Joi.objectId().required(),
    userId : Joi.objectId().required(),
    votedForId : Joi.objectId().required(),
  });

  return schema.validate(user);
};

exports.validateUserPolls = validateUserPolls;
