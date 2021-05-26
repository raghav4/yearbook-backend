// const Joi = require('@hapi/joi');

// const validateUserInfo = (user) => {
//   const schema = Joi.object().keys({
//     info: Joi.object({
//       bio: Joi.string().label('Bio'),
//     }),
//     socialHandles: Joi.object({
//       contactEmail: Joi.string().email().label('Contact Email'),
//       contactNo: Joi.string().length(10).label('Contact Number'),
//       whatsappNo: Joi.string().length(10).label('Whatsapp Number'),
//       snapchat: Joi.string().label('Snapchat Username'),
//       instagram: Joi.string().label('Instagram Username'),
//       facebook: Joi.string().uri().label('Facebook Profile URL'),
//       linkedin: Joi.string().uri().label('Linkedin Profile URL'),
//     }),
//   });

//   return schema.validate(user);
// };

// exports.validateUserInfo = validateUserInfo;
