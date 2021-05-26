const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const Schema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
});

// eslint-disable-next-line func-names
Schema.methods.generateAuthToken = function() {
  return jwt.sign(
      {
        _id : this._id,
        isAdmin : true,
      },
      config.get('jwtPrivateKey'),
  );
};

module.exports = mongoose.model('Admin', Schema);
