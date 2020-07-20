/**
 * Routes to handle the Profile Related details of the user
 */

const express = require('express');
const { user } = require('../routes.json');
const { userController } = require('../../controllers');
const { validator, auth } = require('../../middlewares');
const { validateUserDetails } = require('../../validation');

const router = express.Router();

router.post(user.profilePicture, auth, userController.updateProfilePicture);

router.put(
  user.updateSelf,
  [auth, validator(validateUserDetails)],
  userController.updateDetails,
);

router.post(user.resetPassword, auth, userController.resetPassword);

module.exports = router;
