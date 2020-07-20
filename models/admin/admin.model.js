/* eslint-disable func-names */
require('dotenv').config();
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const debug = require('debug')('app:adminModel');

const adminSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
});

adminSchema.methods.generateAuthToken = function() {
  debug('Generating admin authentication token..');
  return jwt.sign({_id : this._id, authType : 'admin'},
                  config.get('jwtPrivateKey'));
};

module.exports = mongoose.model('Admin', adminSchema);
