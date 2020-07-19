const Joi = require('@hapi/joi');

module.exports = (user) => {
  const schema = Joi.object().keys({
    info: Joi.object({
      bio: Joi.string().label('Bio'),
    }),
    socialHandles: Joi.object({
      contactEmail: Joi.string().email().label('Contact Email'),
      contactNo: Joi.string().length(10).label('Contact Number'),
      whatsappNo: Joi.string().length(10).label('Whatsapp Number'),
      snapchat: Joi.string().label('Snapchat Username'),
      instagram: Joi.string().label('Instagram Username'),
      facebook: Joi.string().label('Facebook Profile URL'),
      linkedin: Joi.string().label('Linkedin Profile URL'),
    }),
  });

  return schema.validate(user);
};