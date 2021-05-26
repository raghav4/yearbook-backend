require('dotenv').config();
const mongoose = require('mongoose');
require('mongoose-type-url');
const jwt = require('jsonwebtoken');

const Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: '',
    },
    profilePicture: {
      type: mongoose.SchemaTypes.Url,
      default: 'https://i.imgur.com/rhLiM4Dm.png',
    },
    department: {
      type: String,
      enum: {
        values: ['CSE', 'IT', 'MAE', 'ECE', 'EEE'],
        message: 'The allowed departments are CSE, IT, MAE, ECE, EEE.',
      },
      uppercase: true,
      required: true,
    },
    section: {
      type: String,
      enum: {
        values: ['A', 'B', 'C'],
        message: 'Allowed Sections are A, B & C',
      },
      uppercase: true,
      required: true,
    },
    socialHandles: {
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      snapchat: { type: String, default: '' },
    },
  },
  {
    collection: 'User',
  },
);

// eslint-disable-next-line func-names
Schema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.jwtPrivateKey);
};

module.exports = mongoose.model('User', Schema);
