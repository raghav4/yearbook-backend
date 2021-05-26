const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    // TODO: #35 Remove This Property
    type: Boolean,
    default: true,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
});

// eslint-disable-next-line func-names
Schema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      isSuperAdmin: this.isSuperAdmin,
      isAdmin: this.isAdmin,
    },
    config.get('jwtPrivateKey'),
  );
};

const Admin = mongoose.model('Admin', Schema);

module.exports = Admin;
