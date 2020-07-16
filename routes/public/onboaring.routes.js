const express = require('express');
const { onboarding } = require('../routes.json');
const { validator } = require('../../middlewares');
const { onboardingController } = require('../../controllers');
const { validateAccess, validateOTP } = require('../../validation/signup');
const { validateLogin, validateSignUp } = require('../../validation/common');

const router = express.Router();

router.post(
  onboarding.login,
  validator(validateLogin),
  onboardingController.loginUser,
);

router.post(
  onboarding.validateAccess,
  validator(validateAccess),
  onboardingController.validateSignUpAccess,
);

router.post(
  onboarding.verifySignUpOTP,
  validator(validateOTP),
  onboardingController.verifySignUpOTP,
);

router.post(
  onboarding.signup,
  [validator(validateSignUp)],
  onboardingController.registerUser,
);

module.exports = router;
