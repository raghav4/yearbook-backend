const express = require('express');
const userController = require('../../controllers/user/user.controller');
// const { validator } = require('../../middlewares');
// const { auth } = require('../../middlewares/user');
// const { validateUserInfo } = require('../../utils/user/info');

const router = express.Router();

// Route to get the logged in user.
router.get('/', userController.getUser);

// router.get('/class/all', userController.getClassUsers);

// router.get('/all', userController.allUsers);

router.post('/pic', userController.updateUserProfilePicture);
// Route to update the logged in user.
// TODO: #16 Fix validation
// validator(validateUserInfo)
// router.put('/', [auth], userController.updateUser);

module.exports = router;
