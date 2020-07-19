const mongoose = require('mongoose');
require('mongoose-type-email');

const UserAcessSchema = new mongoose.Schema({
  name : {
    type : String,
    required : false,
  },
  email : {
    type : mongoose.SchemaTypes.Email,
    unique : true,
    required : true,
  },
  isVerified : {
    type : Boolean,
    default : false,
  },
  registered : {
    type : Boolean,
    default : false,
  },
});

module.exports = mongoose.model('UserAccess', UserAcessSchema);
