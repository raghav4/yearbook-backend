const Joi = require('@hapi/joi');

module.exports = (user) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    phoneNumber: Joi.string().length(10),
    dp: Joi.string().uri(),
    department: Joi.string().length(3),
    section: Joi.string().length(1),
    bio: Joi.string(),
    whatsappNo: Joi.string().min(10),
    facebook: Joi.string().uri(),
    linkedin: Joi.string().uri(),
    Instagram: Joi.string(),
  });

  return schema.validate(user);
};
