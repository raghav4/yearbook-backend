const Joi = require('@hapi/joi');

const validateRegisteration = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(30).label('Name').required(),
    phoneNumber: Joi.string().length(10).label('Phone Number').required(),
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().min(7).label('Password').required(),
  });
  return schema.validate(user);
};
const validateOTPRegisteration = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(30).label('Name').required(),
    otp: Joi.string().label('OTP').required(),
    phoneNumber: Joi.string().length(10).label('Phone Number').required(),
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().min(7).label('Password').required(),
  });
  return schema.validate(user);
};

exports.validateRegisteration = validateRegisteration;
exports.validateOTP = validateOTPRegisteration;
