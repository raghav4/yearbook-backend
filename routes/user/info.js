const _ = require('lodash');
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers');

const router = express.Router();

// Route to get the logged in user.
router.get('/', auth, userController.getUser);

// Route to update the logged in user.
router.put('/', auth, userController.updateUser);

module.exports = router;
