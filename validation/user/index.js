const { validateUserInfo } = require('./info');
const { validateUserAnswer } = require('./answer');
const { validateQuestion } = require('./question');
const { validateMessage } = require('./message');

module.exports = {
  validateUserInfo,
  validateUserAnswer,
  validateQuestion,
  validateMessage,
};
