const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
});

const Question = mongoose.model('Question', questionSchema);

exports.Question = Question;
