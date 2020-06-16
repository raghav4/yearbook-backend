const validateUserInfo = require('./info.validate');
const validateMessage = require('./message.validate');
const validateUserAnswer = require('./answer.validate');
const validateQuestion = require('./question.validate');

module.exports = {
  validateUserInfo,
  validateUserAnswer,
  validateQuestion,
  validateMessage,
};
