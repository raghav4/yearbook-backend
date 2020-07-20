/**
 * Routes to Get all the User Related Details
 */
const express = require('express');
const {user} = require('../routes.json');
const {auth} = require('../../middlewares');
const {userController} = require('../../controllers');

const router = express.Router();

router.get(user.loggedInUser, auth, userController.loggedInUser);

router.get(user.classStudents, auth, userController.getClassUsers);

router.get(user.all, auth, userController.getAllUsers);

module.exports = router;
