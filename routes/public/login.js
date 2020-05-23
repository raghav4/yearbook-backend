const express = require('express');
const userController = require('../../controllers/user/user.controller');
const { validator } = require('../../middlewares');
const { LogInValidation } = require('../../utils/common');

const router = express.Router();

// Route to login a user
router.post('/', validator(LogInValidation), userController.loginUser);

module.exports = router;
