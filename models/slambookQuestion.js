const mongoose = require('mongoose');

const Question = mongoose.model(
    'Question',
    new mongoose.Schema({
      title : {
        type : String,
        trim : true,
        required : true,
      },
    }),
);

module.exports = Question;
