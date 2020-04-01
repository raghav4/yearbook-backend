const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dp: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  whatsappNo: {
    type: String,
    min: 10,
  },
  facebook: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  phoneNumber: {
    type: String,
    min: 10,
  },
  email: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    department: Joi.string().required(),
    section: Joi.string().required(),
    whatsappNo: Joi.string().min(10),
    facebook: Joi.string().uri(),
    linkedin: Joi.string().uri(),
    phoneNumber: Joi.string().min(10),
    email: Joi.string().email(),
    dp: Joi.string().uri(),
  });

  return schema.validate(user);
}

function validateUserPut(user) {
  const schema = Joi.object({
    name: Joi.string(),
    department: Joi.string(),
    section: Joi.string(),
    whatsappNo: Joi.string().min(10),
    facebook: Joi.string().uri(),
    linkedin: Joi.string().uri(),
    phoneNumber: Joi.string().min(10),
    email: Joi.string().email(),
    dp: Joi.string().uri(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
exports.putValidate = validateUserPut;
