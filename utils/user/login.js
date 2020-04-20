const Joi = require('@hapi/joi');

const validateCredentials = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

exports.validateCredentials = validateCredentials;
