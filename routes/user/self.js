const express = require('express');
const userController = require('../../controllers/user/users.controller');
const { userSelfController } = require('../../controllers/user');
const { validator } = require('../../middlewares');
const { auth } = require('../../middlewares/user');
const { user } = require('../routes.json');
// const { validateUserInfo } = require('../../validation/user/info');

const router = express.Router();

router.get(user.self, auth, userSelfController.getUser);

router.get(user.classStudents, auth, userSelfController.getClassUsers);

router.get(user.all, auth, userController.getAllUsers);

router.post(user.profilePicture, auth, userSelfController.updateUserProfilePicture);
// Route to update the logged in user.
// TODO: #16 Fix validation
// validator(validateUserInfo)
router.put(user.updateSelf, [auth], userSelfController.updateUser);

module.exports = router;
