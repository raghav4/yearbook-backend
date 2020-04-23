const Joi = require('@hapi/joi');

const validateSignUp = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
    phoneNumber: Joi.string().length(10).label('Phone Number').required(),
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().min(7).label('Password').required(),
    department: Joi.string().length(2).label('Department').required(),
    section: Joi.string().length(1).label('Section'),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
};
const validateOTP = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
    otp: Joi.string().label('OTP').required(),
    phoneNumber: Joi.string().length(10).label('Phone Number').required(),
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().min(7).label('Password').required(),
    department: Joi.string().length(2).label('Department').required(),
    section: Joi.string().length(1).label('Section'),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
};

exports.validateSignUp = validateSignUp;
exports.validateOTP = validateOTP;
