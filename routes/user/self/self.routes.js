const express = require('express');
const { user } = require('../../routes.json');
const { validator } = require('../../../middlewares');
const auth = require('../../../middlewares/user/auth');
const { userSelfController } = require('../../../controllers');
const { validateUserInfo } = require('../../../validation/user');

const router = express.Router();

router.get(user.self, auth, userSelfController.getUser);

router.get(user.classStudents, auth, userSelfController.getClassUsers);

router.get(user.all, auth, userSelfController.getAllUsers);

router.post(user.profilePicture, auth, userSelfController.updateUserProfilePicture);

router.put(
  user.updateSelf,
  [auth, validator(validateUserInfo)],
  userSelfController.updateUserDetails,
);

router.post(user.resetPassword, auth, userSelfController.resetPassword);

module.exports = router;
