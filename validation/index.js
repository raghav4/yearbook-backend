const validatePoll = require('./poll');
const validateVote = require('./vote');
const validateMessage = require('./message');
const validateUserDetails = require('./user');
const validateSlamBookAnswer = require('./slamBookAnswer');
const validateSlamBookQuestion = require('./slamBookQuestion');
const { validateOTP, validateLogIn, validateSignUp } = require('./onBoarding');

module.exports = {
  validateOTP,
  validatePoll,
  validateVote,
  validateLogIn,
  validateSignUp,
  validateMessage,
  validateUserDetails,
  validateSlamBookAnswer,
  validateSlamBookQuestion,
};
