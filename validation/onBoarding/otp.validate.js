const Joi = require('@hapi/joi');

module.exports = (user) => {
  const schema = Joi.object({
    email : Joi.string().email().label('Email').required(),
    otp : Joi.string().label('OTP').required(),
  });

  return schema.validate(user);
};
