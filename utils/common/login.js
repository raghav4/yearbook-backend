const Joi = require('@hapi/joi');

const LogInValidation = (user) => {
  const schema = Joi.object({
    email : Joi.string().email().label('Email').required(),
    password : Joi.string().label('Password').required(),
  });
  return schema.validate(user);
};

exports.LogInValidation = LogInValidation;
