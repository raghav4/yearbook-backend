const pollController = require('./polls');
const userController = require('./user');
const messageController = require('./messages');
const slamBookController = require('./slamBook');
const onBoardingController = require('./onboarding');
const adminOnBoardingController = require('./admin');
const userAccessController = require('./grantUserAccess');

module.exports = {
  userController,
  pollController,
  messageController,
  slamBookController,
  userAccessController,
  onBoardingController,
  adminOnBoardingController,
};
