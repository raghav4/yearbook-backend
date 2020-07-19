const validateUserInfo = require('./details.validate');
const validateMessage = require('../message/message.validate');
const validateUserAnswer = require('../slamBookAnswer/answer.validate');
const validateQuestion = require('../slamBookQuestion/question.validate');

module.exports = {
  validateUserInfo,
  validateUserAnswer,
  validateQuestion,
  validateMessage,
};
