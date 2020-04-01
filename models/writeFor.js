const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const writingSchema = new mongoose.Schema({
  authorId: {
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

const WritingContent = mongoose.model('WrittingContent', writingSchema);

function validateContent(content) {
  const schema = Joi.object({
    authorId: Joi.objectId().required(),
    userId: Joi.objectId().required(),
    message: Joi.string(), // check if it has to be made required or not
  });
  return schema.validate(content);
}

exports.validate = validateContent;
exports.WritingContent = WritingContent;
