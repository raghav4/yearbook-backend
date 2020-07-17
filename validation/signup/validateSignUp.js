const Joi = require('@hapi/joi');

module.exports = (email) => {
  const schema = Joi.object({
    email : Joi.string().email().label('Email').required(),
  });

  return schema.validate(email);
};
