const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Message',
    new mongoose.Schema({
      sendTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
      },
      sentBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
      },
      message : {
        type : String,
      },
    }),
);
