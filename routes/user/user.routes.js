const express = require('express');
const { userSelfController } = require('../../controllers');
const { validator } = require('../../middlewares');
const auth = require('../../middlewares/user/auth');
const { user } = require('../routes.json');
// const { validateUserInfo } = require('../../validation/user/info');

const router = express.Router();

router.get(user.self, auth, userSelfController.getUser);

router.get(user.classStudents, auth, userSelfController.getClassUsers);

router.get(user.all, auth, userSelfController.getAllUsers);

router.post(user.profilePicture, auth, userSelfController.updateUserProfilePicture);

// Route to update the logged in user.
// TODO: #16 Fix validation
// validator(validateUserInfo)
router.put(user.updateSelf, [auth], userSelfController.updateUser);

router.post(user.resetPassword, auth, userSelfController.resetPassword);

module.exports = router;
