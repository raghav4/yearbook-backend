require('dotenv').config();
const mongoose = require('mongoose');
require('mongoose-type-url');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  credentials: {
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // username: { type: String, required: true },
  },
  info: {
    bio: { type: String, default: '' },
    profilePicture: {
      type: mongoose.SchemaTypes.Url,
      default: 'https://i.imgur.com/rhLiM4Dm.png',
    },
  },
  deptSection: {
    department: {
      type: String,
      enum: {
        values: ['CSE', 'IT', 'MAE', 'ECE', 'EEE'],
        message: 'The allowed departments are CSE, IT, MAE, ECE, EEE.',
      },
      required: true,
    },
    section: {
      type: String,
      enum: {
        values: ['A', 'B', 'C'],
        message: 'Allowed Sections are A, B & C',
      },
      required: true,
    },
  },
  socialHandles: {
    contactEmail: { type: String, default: '' },
    contactNo: { type: String, default: '' },
    whatsappNo: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    snapchat: { type: String, default: '' },
  },
});

// eslint-disable-next-line func-names
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.jwtPrivateKey);
};
const User = mongoose.model('User', userSchema);

exports.User = User;
