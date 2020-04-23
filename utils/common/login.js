const Joi = require('@hapi/joi');

const LogInValidation = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

exports.LogInValidation = LogInValidation;
