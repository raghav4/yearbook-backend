const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  isSuperAdmin : {
    type : Boolean,
    default : false,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

exports.Admin = Admin;
