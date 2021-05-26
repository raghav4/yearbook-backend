const mongoose = require('mongoose');

const Answer = mongoose.model(
    'Answer',
    new mongoose.Schema({
      titleId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Question',
        required : true,
      },
      userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
      },
      content : {
        type : String,
        required : true,
      },
    }),
);

module.exports = Answer;
