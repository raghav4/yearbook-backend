const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.validateMessage = (content) => {
  const schema = Joi.object({
    sendTo: Joi.objectId().label('SendTo ID').required(),
    message: Joi.string().label('Message').required(),
  });
  return schema.validate(content);
};
