const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.validateMessage = (content) => {
  const schema = Joi.object({
    sendTo : Joi.objectId().required(),
    message : Joi.string().required(),
  });
  return schema.validate(content);
};
