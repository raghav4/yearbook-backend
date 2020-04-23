require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
    min: 10,
    max: 10,
  },
  password: {
    type: String,
  },
  department: {
    type: String,
    default: '',
  },
  section: {
    type: String,
    default: '',
  },
  dp: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  whatsappNo: {
    type: String,
    default: '',
    min: 10,
    max: 10,
  },
  facebook: {
    type: String,
    default: '',
  },
  linkedin: {
    type: String,
    default: '',
  },
  Instagram: {
    type: String,
    default: '',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// eslint-disable-next-line func-names
userSchema.methods.generateAuthToken = function () {
  // eslint-disable-next-line no-underscore-dangle
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.jwtPrivateKey,
  );
};
const User = mongoose.model('User', userSchema);

exports.User = User;
