require('dotenv').config();
require('mongoose-type-url');
require('mongoose-type-email');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const debug = require('debug')('app:userModel');
const {jwtExpiration} = require('../../constants.json');

const userSchema = new mongoose.Schema({
  credentials : {
    name : {
      type : String,
      required : true,
    },
    email : {
      type : mongoose.SchemaTypes.Email,
      required : true,
    },
    password : {
      type : String,
      required : true,
    },
    // username: { type: String, required: true },
  },
  info : {
    bio : {
      type : String,
      default : '',
    },
    profilePicture : {
      type : mongoose.SchemaTypes.Url,
      default : 'https://i.imgur.com/rhLiM4Dm.png',
    },
  },
  deptSection : {
    department : {
      type : String,
      enum : {
        values : [ 'CSE', 'IT', 'MAE', 'ECE', 'EEE' ],
        message : 'The allowed departments are CSE, IT, MAE, ECE, EEE.',
      },
      required : true,
    },
    section : {
      type : String,
      enum : {
        values : [ 'A', 'B', 'C' ],
        message : 'Allowed Sections are A, B & C',
      },
      required : true,
    },
  },
  socialHandles : {
    contactEmail : {
      type : String,
      default : '',
    },
    contactNo : {
      type : String,
      default : '',
    },
    whatsappNo : {
      type : String,
      default : '',
    },
    linkedin : {
      type : String,
      default : '',
    },
    instagram : {
      type : String,
      default : '',
    },
    facebook : {
      type : String,
      default : '',
    },
    snapchat : {
      type : String,
      default : '',
    },
  },
});

// eslint-disable-next-line func-names
userSchema.methods.generateAuthToken = function() {
  debug('Generating user authentication token...');
  return jwt.sign(
      {
        _id : this._id,
        department : this.deptSection.department,
        section : this.deptSection.section,
        authType : 'user',
      },
      config.get('jwtPrivateKey'),
      {
        expiresIn : jwtExpiration,
      },
  );
};

module.exports = mongoose.model('User', userSchema);
