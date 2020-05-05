const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const writingSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
  },
});

const Message = mongoose.model('WrittingContent', writingSchema);
// receiverId != userId
function validateContent(content) {
  const schema = Joi.object({
    receiverId: Joi.objectId().required(),
    userId: Joi.objectId().required(),
    message: Joi.string(), // check if it has to be made required or not
  });
  return schema.validate(content);
}

exports.Message = Message;
