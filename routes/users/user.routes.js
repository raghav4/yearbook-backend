/**
 * Routes to Get all the User Related Details
 */
const express = require('express');
const { user } = require('../routes.json');
const { auth, validator } = require('../../middlewares');
const { userController } = require('../../controllers');
const { validateUserDetails } = require('../../validation');

const router = express.Router();

router.get(user.loggedInUser, auth, userController.loggedInUser);

router.get(user.getClassStudents, auth, userController.getClassUsers);

router.get(user.all, auth, userController.getAllUsers);

router.post(user.updateProfilePicture, auth, userController.updateProfilePicture);

router.put(
  user.updateSelf,
  [auth, validator(validateUserDetails)],
  userController.updateDetails,
);

router.post(user.resetPassword, auth, userController.resetPassword);

module.exports = router;
