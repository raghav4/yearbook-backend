const express = require('express');
const { onboarding } = require('../routes.json');
const { validator } = require('../../middlewares');
const { userOnBoardingController } = require('../../controllers');
const { validateOTP, validateLogIn, validateSignUp } = require('../../validation');

const router = express.Router();

router.post(
  onboarding.login,
  validator(validateLogIn),
  userOnBoardingController.loginUser,
);

router.post(
  onboarding.validateAccess,
  // TODO : fix this
  // validator(validateAccess),
  userOnBoardingController.validateSignUpAccess,
);

router.post(
  onboarding.verifySignUpOTP,
  validator(validateOTP),
  userOnBoardingController.verifySignUpOTP,
);

router.post(
  onboarding.signup,
  [validator(validateSignUp)],
  userOnBoardingController.registerUser,
);

module.exports = router;
