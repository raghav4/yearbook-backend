const userController = require('./users.controller');
const userSelfController = require('./self.controller');
const publicUserController = require('./public.controller');
const userAnswerController = require('./answers.controller');
const userMessageController = require('./messages.controllers');

module.exports = {
  userController,
  userSelfController,
  userAnswerController,
  publicUserController,
  userMessageController,
};
