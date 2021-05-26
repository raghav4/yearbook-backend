const mongoose = require('mongoose');
// const Joi = require('@hapi/joi');

const Poll = mongoose.model(
    'Poll',
    new mongoose.Schema({
      title : {
        type : String,
        required : true,
      },
    }),
);

module.exports = Poll;

// function validatePolls(poll) {
//   const schema = Joi.object({
//     question: Joi.string().min(5).required(),
//   });
//   return schema.validate(poll);
// }

// exports.Poll = Poll;
// exports.validate = validatePolls;
