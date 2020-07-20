const express = require('express');
const { onboarding } = require('../routes.json');
const { auth, adminAuth, validator } = require('../../middlewares');
const { validateOTP, validateLogIn, validateSignUp } = require('../../validation');
const {
  userAccessController,
  onBoardingController,
  adminOnBoardingController,
} = require('../../controllers');

const router = express.Router();

const { user, admin } = onboarding;

// !! Admin Specific

router.post(admin.login, adminOnBoardingController.logInAdmin);

router.post(admin.grantAccess, [auth, adminAuth], userAccessController.grantAccess);

// !! User Specific

router.post(user.login, validator(validateLogIn), onBoardingController.loginUser);

router.post(
  onboarding.validateAccess,
  // TODO : fix this
  // validator(validateAccess),
  onBoardingController.validateSignUpAccess,
);

router.post(
  onboarding.verifySignUpOTP,
  validator(validateOTP),
  onBoardingController.verifySignUpOTP,
);

router.post(
  user.signup,
  [validator(validateSignUp)],
  onBoardingController.registerUser,
);

module.exports = router;
