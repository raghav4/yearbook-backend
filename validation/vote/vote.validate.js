const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = (vote) => {
  const schema = Joi.object({
    userId: Joi.objectId().label('Voted By ID').required(),
    pollId: Joi.objectId().label('Poll ID').required(),
    votedForId: Joi.objectId().label('Voted for (ID)').required(),
  });

  return schema.validate(vote);
};
