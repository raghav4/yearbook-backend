const express = require('express');
const {user} = require('../routes.json');
const {validator} = require('../../middlewares');
const auth = require('../../middlewares/user/auth');
const {userController} = require('../../controllers');
const {validateUserDetails} = require('../../validation');

const router = express.Router();

router.get(user.self, auth, userController.getUser);

router.get(user.classStudents, auth, userController.getClassUsers);

router.get(user.all, auth, userController.getAllUsers);

router.post(user.profilePicture, auth, userController.updateUserProfilePicture);

router.put(
    user.updateSelf,
    [ auth, validator(validateUserDetails) ],
    userController.updateUserDetails,
);

router.post(user.resetPassword, auth, userController.resetPassword);

module.exports = router;
