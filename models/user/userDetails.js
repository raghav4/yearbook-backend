const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dp: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  department: {
    type: String,
    default: '',
    required: true,
  },
  section: {
    type: String,
    default: '',
    required: true,
  },
  whatsappNo: {
    type: String,
    default: '',
    min: 10,
  },
  facebook: {
    type: String,
    default: '',
  },
  linkedin: {
    type: String,
    default: '',
  },
  phoneNumber: {
    type: String,
    min: 10,
  },
  Instagram: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
});

const User = mongoose.model('User', userSchema);

function validatePost(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    department: Joi.string().length(3).required(),
    section: Joi.string().length(1).required(),
    phoneNumber: Joi.string().min(10).max(11).required(),
  });
  return schema.validate(user);
}
function validatePut(user) {
  const schema = Joi.object({
    name: Joi.string(),
    bio: Joi.string(),
    department: Joi.string().length(3),
    section: Joi.string().length(1),
    whatsappNo: Joi.string().min(10),
    facebook: Joi.string().uri(),
    linkedin: Joi.string().uri(),
    phoneNumber: Joi.string().min(10),
    Instagram: Joi.string(),
    email: Joi.string().email(),
    dp: Joi.string().uri(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validatePut = validatePut;
exports.validatePost = validatePost;
