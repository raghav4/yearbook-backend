const express = require('express');
const { user } = require('../routes.json');
const { validator } = require('../../middlewares');
const { publicUserController } = require('../../controllers/user');
const { LogInValidation, validateSignUp } = require('../../validation/common');

const router = express.Router();

router.post(user.login, validator(LogInValidation), publicUserController.loginUser);

router.post(
  user.signup,
  validator(validateSignUp),
  publicUserController.validateSignUpAccess,
);

router.post(
  user.verify,
  [validator(validateSignUp, true)],
  publicUserController.verifySignUp,
);

module.exports = router;
