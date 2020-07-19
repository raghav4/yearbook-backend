const Joi = require('@hapi/joi');

module.exports = (poll) => {
  const schema = Joi.object({
    title: Joi.string().min(5).label('Poll Title').required(),
  });

  return schema.validate(poll);
};
