const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
});

adminSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isSuperAdmin: this.isSuperAdmin },
    process.env.jwtPrivateKey,
  );
};

const Admin = mongoose.model('Admin', adminSchema);

exports.Admin = Admin;
