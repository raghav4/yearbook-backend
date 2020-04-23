const Joi = require('@hapi/joi');

const validateUserInfo = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(4).label('Name').required(),
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().min(5).label('Passowrd').required(),
    phoneNumber: Joi.string().length(10).label('Phone Number').required(),
    department: Joi.string().length(3).label('Department').required(),
    section: Joi.string().label('Section').length(1),
    dp: Joi.string().uri(),
    bio: Joi.string().label('Bio'),
    whatsappNo: Joi.string().length(10).label('WhatsApp No.'),
    facebook: Joi.string().uri().label('Facebook'),
    linkedin: Joi.string().uri().label('LinkedIn'),
    Instagram: Joi.string().label('Instagram'),
  });

  return schema.validate(user);
};

exports.validateUserInfo = validateUserInfo;
