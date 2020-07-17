const pollController = require('./polls');
const messageController = require('./messages');
const adminOnBoardingController = require('./admin');
const { userController, userOnBoardingController } = require('./user');
const slamBookController = require('./slamBook');

module.exports = {
  pollController,
  messageController,
  userController,
  userOnBoardingController,
  adminOnBoardingController,
  slamBookController,
};
