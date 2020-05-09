const express = require('express');
const validator = require('../middlewares/validator');
const { validateReset } = require('../utils/user/reset');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/', validator(validateReset), userController.resetPassword);

module.exports = router;
