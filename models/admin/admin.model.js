/* eslint-disable func-names */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const adminSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  isAdmin : {
    type : Boolean,
    default : true,
  },
});

adminSchema.methods.generateAuthToken = function() {
  return jwt.sign(
      {_id : this._id, isAdmin : this.isAdmin},
      config.get('jwtPrivateKey'),
  );
};

module.exports = mongoose.model('Admin', adminSchema);
