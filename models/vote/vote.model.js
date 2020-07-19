const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Vote',
    new mongoose.Schema({
      pollId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Poll',
        required : true,
      },
      userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
      },
      votedForId : {
        ref : 'User',
        type : mongoose.Schema.Types.ObjectId,
        required : true,
      },
    }),
);
