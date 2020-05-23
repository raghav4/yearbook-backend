const Joi = require('@hapi/joi');

const validateSignUp = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(30).label('Name').required(),
    phoneNo: Joi.string().length(10).label('Phone Number').required(),
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().min(7).label('Password').required(),
    department: Joi.string().min(2).max(3).label('Department').required(),
    section: Joi.string().length(1).label('Section'),
    otp: Joi.string().label('OTP').when('isOTP', {
      is: true,
      then: Joi.string().required(),
    }),
  });
  return schema.validate(user);
};

exports.validateSignUp = validateSignUp;
