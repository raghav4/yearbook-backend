const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const PollStatsSchema = new mongoose.Schema({
  questionId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
  },
  votedBy : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
  },
  votedFor : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
  },
  voteCountsByPerson : {
    type : Number,
    required : true,
  },
});

const PollStats = mongoose.model('PollStats', PollStatsSchema);

exports.PollStats = PollStats;
