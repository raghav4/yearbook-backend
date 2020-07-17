const Joi = require('@hapi/joi');

module.exports = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().label('Password').required(),
  });
  return schema.validate(user);
};
