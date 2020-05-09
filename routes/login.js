const express = require('express');
const userController = require('../controllers');
const validator = require('../middlewares/validator');
const {LogInValidation} = require('../utils/common/login');

const router = express.Router();

// Route to login a user
router.post('/', validator(LogInValidation), userController.loginUser);

module.exports = router;
