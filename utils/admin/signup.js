const Joi = require('@hapi/joi');

const validateRegisteration = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
    phoneNumber: Joi.string().length(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).label('Password').required(),
  });
  return schema.validate(user);
};

exports.validateRegisteration = validateRegisteration;
