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
  },
  info: {
    type: [
      {
        bio: { type: String, default: '' },
        profilePicture: { type: mongoose.SchemaTypes.Url },
      },
    ],
  },
  deptSection: {
    type: [
      {
        department: { type: String, required: true },
        section: { type: String, required: true },
      },
    ],
  },
  socialHandles: {
    type: [
      {
        email: { type: String },
        contactNo: { type: String },
        whatsappNo: { type: String },
        linkedin: { type: String },
        instagram: { type: String },
        facebook: { type: String },
        snapchat: { type: String },
      },
    ],
  },
});

// eslint-disable-next-line func-names
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.jwtPrivateKey);
};
const User = mongoose.model('User', userSchema);

exports.User = User;
