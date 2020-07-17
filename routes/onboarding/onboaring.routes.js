const express = require('express');
const {onboarding} = require('../routes.json');
const {validator} = require('../../middlewares');
const {userOnBoardingController} = require('../../controllers');
const {validateAccess, validateOTP} = require('../../validation/signup');
const {validateLogin, validateSignUp} = require('../../validation/common');

const router = express.Router();

router.post(
    onboarding.login,
    validator(validateLogin),
    userOnBoardingController.loginUser,
);

router.post(
    onboarding.validateAccess,
    validator(validateAccess),
    userOnBoardingController.validateSignUpAccess,
);

router.post(
    onboarding.verifySignUpOTP,
    validator(validateOTP),
    userOnBoardingController.verifySignUpOTP,
);

router.post(
    onboarding.signup,
    [ validator(validateSignUp) ],
    userOnBoardingController.registerUser,
);

module.exports = router;
