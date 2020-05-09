const Joi = require('@hapi/joi');

const validateUserInfo = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(30).label('Name'),
    email: Joi.string().email().label('Email'),
    password: Joi.string().min(5).label('Password'),
    bio: Joi.string().min(5).label('Bio'),
    profilePicture: Joi.string().uri().label('Profile PIcture'),
    contactEmail: Joi.string().email(),
    contactNo: Joi.string().length(10).label('Contact Number'),
    whatsappNo: Joi.string().length(10).label('Whatsapp Number'),
    snapchat: Joi.string().label('Snapchat Username'),
    instagram: Joi.string().label('Instagram Username'),
    facebook: Joi.string().uri().label('Facebook Profile URL'),
    linkedin: Joi.string().uri().label('Linkedin Profile URL'),
  });

  return schema.validate(user);
};

exports.validateUserInfo = validateUserInfo;
