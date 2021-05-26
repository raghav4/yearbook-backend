const mongoose = require('mongoose');

const Question = mongoose.model('Question', new mongoose.Schema({
  title: {
    type: String,
  },
}));

module.exports = Question;
