const mongoose = require('mongoose');

const AllowedUsers = mongoose.model(
  'AllowedUsers',
  new mongoose.Schema({
    phoneNumber: {
      type: String,
      required: true,
    },
  }),
);

exports.AllowedUsers = AllowedUsers;
