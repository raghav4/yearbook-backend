const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers');
const validator = require('../../middlewares/validator.js');
const { validateUserInfo } = require('../../utils/user');

const router = express.Router();

// Route to get the logged in user.
router.get('/', auth, userController.getUser);

router.get('/class/all', auth, userController.getClassUsers);

router.get('/all', auth, userController.allUsers);
// Route to update the logged in user.
// TODO: #16 Fix validation
// validator(validateUserInfo)
router.put('/', [auth], userController.updateUser);

module.exports = router;
