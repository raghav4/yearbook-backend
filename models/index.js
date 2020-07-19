const User = require('./user');
const Poll = require('./poll');
const Vote = require('./vote');
const Admin = require('./admin');
const Message = require('./message');
const OTP = require('./otpVerification');
const UserAccess = require('./grantUserAcess');
const SlamBookAnswer = require('./slamBookAnswer');
const SlamBookQuestion = require('./slamBookQuestion');

module.exports = {
  OTP,
  User,
  Poll,
  Vote,
  Admin,
  Message,
  UserAccess,
  SlamBookAnswer,
  SlamBookQuestion,
};
