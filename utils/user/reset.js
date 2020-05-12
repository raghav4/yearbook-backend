const Joi = require('@hapi/joi');

const validateEmail = (email) => {
  const schema = Joi.object({
    email: Joi.string().email().label('Email').required(),
  });
  return schema.validate(email);
};

const validatePhoneNo = (email) => {
  const schema = Joi.object({
    phoneNo: Joi.string().length(10).label('Phone Number').required(),
  });
  return schema.validate(email);
};

const validateReset = (user) => {
  let isEmail = true;
  const checkEmail = user.input.indexOf('@');
  const isNumber = (value) => !Number.isNaN(Number(value));

  if (checkEmail === -1) isEmail = false;

  // Check if email by '@'
  if (isEmail) return validateEmail({ email: user.input });

  // Check for number
  if (isNumber(user.input)) {
    return validatePhoneNo({ phoneNo: user.input });
  }

  // TODO #15: Only String
};

exports.validateReset = validateReset;
