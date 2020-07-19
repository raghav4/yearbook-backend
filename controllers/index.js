const pollController = require('./polls');
const messageController = require('./messages');
const slamBookController = require('./slamBook');
const adminOnBoardingController = require('./admin');
const userAccessController = require('./grantUserAccess');
const { userController, userOnBoardingController } = require('./user');

module.exports = {
  userController,
  pollController,
  messageController,
  slamBookController,
  userAccessController,
  userOnBoardingController,
  adminOnBoardingController,
};
