const Joi = require('@hapi/joi');

module.exports = (pollQuestion) => {
  const schema = Joi.object({
    question: Joi.string().min(5).label('Poll Question').required(),
  });
  return schema.validate(pollQuestion);
};

// const schema = Joi.object({
//   questionId: Joi.objectId().label('Question ID').required(),
//   votedBy: Joi.objectId().label('Voted By').required(),
//   votedFor: Joi.objectId().label('Voted For').required(),
//   voteCountsByPerson: Joi.label('Total Votes').number().required(),
// });
